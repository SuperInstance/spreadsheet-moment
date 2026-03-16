/**
 * DeepSeek AI Provider
 *
 * Provides access to DeepSeek's API for cost-effective reasoning
 *
 * Models:
 * - deepseek-chat (General purpose)
 * - deepseek-coder (Code specialized)
 *
 * Pricing (as of 2024):
 * - Input: $0.14 / 1M tokens
 * - Output: $0.28 / 1M tokens
 *
 * @module agent-ai/providers
 */

import type {
  IAIProvider,
  ModelConfig,
  CompletionRequest,
  CompletionResponse,
  StreamingChunk,
  ProviderMetadata,
  ChatMessage
} from '../types';

/**
 * DeepSeek AI Provider
 */
export class DeepSeekProvider implements IAIProvider {
  private readonly baseUrl = 'https://api.deepseek.com/v1';
  private readonly defaultModel = 'deepseek-chat';

  /**
   * Get provider metadata
   */
  getMetadata(): ProviderMetadata {
    return {
      name: 'DeepSeek',
      provider: 'deepseek' as any,
      capabilities: {
        streaming: true,
        functionCalling: true,
        vision: false,
        maxTokens: 4096
      },
      costs: {
        input: 0.14,
        output: 0.28,
        currency: 'USD'
      },
      defaultModel: this.defaultModel,
      availableModels: [
        'deepseek-chat',
        'deepseek-coder'
      ]
    };
  }

  /**
   * Check if provider is available
   */
  isAvailable(): boolean {
    return typeof process !== 'undefined' &&
           process.env.DEEPSEEK_API_KEY !== undefined;
  }

  /**
   * Validate configuration
   */
  async validateConfig(config: ModelConfig): Promise<boolean> {
    if (!config.apiKey) {
      return false;
    }

    // Test API with a simple request
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Get completion (non-streaming)
   */
  async getCompletion(request: CompletionRequest): Promise<CompletionResponse> {
    const apiKey = request.config.apiKey || process.env.DEEPSEEK_API_KEY || '';
    const model = request.config.model || this.defaultModel;

    if (!apiKey) {
      throw new Error('DeepSeek API key is required');
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages: request.messages,
          stream: false,
          max_tokens: request.config.parameters?.maxTokens || 4096,
          temperature: request.config.parameters?.temperature || 0.7,
          top_p: request.config.parameters?.topP || 1.0,
          frequency_penalty: request.config.parameters?.frequencyPenalty || 0,
          presence_penalty: request.config.parameters?.presencePenalty || 0,
          stop: request.config.parameters?.stop
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`DeepSeek API error: ${response.status} - ${error}`);
      }

      const data = await response.json();
      const choice = data.choices?.[0];

      return {
        content: choice?.message?.content || '',
        finishReason: choice?.finish_reason || 'stop',
        usage: {
          promptTokens: data.usage?.prompt_tokens || 0,
          completionTokens: data.usage?.completion_tokens || 0,
          totalTokens: data.usage?.total_tokens || 0
        },
        model
      };
    } catch (error) {
      throw new Error(`DeepSeek provider error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get completion (streaming)
   */
  async streamCompletion(
    request: CompletionRequest,
    onChunk: (chunk: StreamingChunk) => void
  ): Promise<CompletionResponse> {
    const apiKey = request.config.apiKey || process.env.DEEPSEEK_API_KEY || '';
    const model = request.config.model || this.defaultModel;

    if (!apiKey) {
      throw new Error('DeepSeek API key is required');
    }

    let fullContent = '';

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages: request.messages,
          stream: true,
          max_tokens: request.config.parameters?.maxTokens || 4096,
          temperature: request.config.parameters?.temperature || 0.7,
          top_p: request.config.parameters?.topP || 1.0,
          frequency_penalty: request.config.parameters?.frequencyPenalty || 0,
          presence_penalty: request.config.parameters?.presencePenalty || 0,
          stop: request.config.parameters?.stop
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`DeepSeek API error: ${response.status} - ${error}`);
      }

      // Process streaming response
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is not readable');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process lines
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim() === '' || line.startsWith(':')) {
            continue; // Skip empty lines and comments
          }

          try {
            const jsonStr = line.replace(/^data: /, '').trim();
            if (jsonStr === '[DONE]') {
              onChunk({ content: '', done: true });
              break;
            }

            const data = JSON.parse(jsonStr);
            const content = data.choices?.[0]?.delta?.content || '';

            if (content) {
              fullContent += content;
              onChunk({ content, done: false });
            }
          } catch (e) {
            // Ignore parse errors for non-JSON lines
          }
        }
      }

      return {
        content: fullContent,
        finishReason: 'stop',
        usage: {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0
        },
        model
      };
    } catch (error) {
      throw new Error(`DeepSeek provider streaming error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export default DeepSeekProvider;
