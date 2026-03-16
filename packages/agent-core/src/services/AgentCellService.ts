/**
 * Agent Cell Service
 *
 * Service layer for managing agent cells within Univer:
 * - Create and update agent cells
 * - Integrate with Univer's cell model
 * - Handle agent-specific operations
 *
 * @packageDocumentation
 */

import { Injectable, Inject } from '@univerjs/core';
import {
  ICellModel,
  ICellData,
} from '@univerjs/engine-render';

import {
  IAgentCellData,
  AgentCellType,
  AgentCellState,
  IAgentConfig,
} from '../index';
import {
  ITraceProtocol,
  IStateManager,
  IAgentHandshakeProtocol,
} from '../plugins/AgentCorePlugin';

/**
 * Agent Cell Creation Options
 */
export interface ICreateAgentCellOptions {
  /** Type of agent cell to create */
  cellType: AgentCellType;

  /** Initial value (optional) */
  value?: string | number;

  /** Formula (optional) */
  formula?: string;

  /** AI provider to use */
  provider?: 'cloudflare' | 'deepseek' | 'openai' | 'anthropic';

  /** Maximum reasoning steps */
  maxReasoningSteps?: number;

  /** Timeout in milliseconds */
  timeout?: number;

  /** Whether to enable agent handshake */
  enableHandshake?: boolean;

  /** Initial configuration */
  config?: IAgentConfig;
}

/**
 * Agent Cell Service
 *
 * Provides methods to create, update, and manage agent cells
 */
@Injectable()
export class AgentCellService {
  constructor(
    @Inject(ITraceProtocol) private readonly _traceProtocol: any,
    @Inject(IStateManager) private readonly _stateManager: any,
    @Inject(IAgentHandshakeProtocol) private readonly _handshakeProtocol: any
  ) {}

  /**
   * Create a new agent cell
   */
  createAgentCell(options: ICreateAgentCellOptions): IAgentCellData {
    const originId = this._generateOriginId();

    const agentCell: IAgentCellData = {
      v: options.value,
      f: options.formula,
      origin_id: originId,
      cell_type: options.cellType,
      state: AgentCellState.DORMANT,
      reasoning: [],
      memory: [],
      requires_approval: true,
      config: {
        provider: options.provider || 'cloudflare',
        max_reasoning_steps: options.maxReasoningSteps || 10,
        timeout: options.timeout || 30000,
        enable_handshake: options.enableHandshake !== false,
        ...options.config
      },
      updated_at: Date.now()
    };

    return agentCell;
  }

  /**
   * Activate an agent cell (start processing)
   */
  activateAgentCell(cellData: IAgentCellData): IAgentCellData {
    if (!cellData.origin_id) {
      throw new Error('Cannot activate cell without origin_id');
    }

    // Generate trace ID for this operation
    const traceId = this._traceProtocol.generate(cellData.origin_id);
    cellData.trace_id = traceId;

    // Transition to THINKING state
    const updated = this._stateManager.transition(cellData, AgentCellState.THINKING);

    return updated;
  }

  /**
   * Update agent cell with reasoning step
   */
  addReasoningStep(cellData: IAgentCellData, step: string): IAgentCellData {
    const reasoning = cellData.reasoning || [];
    reasoning.push(step);

    return {
      ...cellData,
      reasoning,
      updated_at: Date.now()
    };
  }

  /**
   * Add to agent cell memory
   */
  addToMemory(cellData: IAgentCellData, memory: string): IAgentCellData {
    const mem = cellData.memory || [];
    mem.push(memory);

    // Keep only last 100 memory entries
    if (mem.length > 100) {
      mem.splice(0, mem.length - 100);
    }

    return {
      ...cellData,
      memory: mem,
      updated_at: Date.now()
    };
  }

  /**
   * Mark agent cell as needing review
   */
  requestReview(cellData: IAgentCellData): IAgentCellData {
    return this._stateManager.requestReview(cellData);
  }

  /**
   * Approve agent cell action
   */
  approve(cellData: IAgentCellData): IAgentCellData {
    const approved = this._stateManager.approve(cellData);

    // Complete the trace
    if (approved.trace_id) {
      this._traceProtocol.complete(approved.trace_id);
      approved.trace_id = undefined;
    }

    return approved;
  }

  /**
   * Reject agent cell action
   */
  reject(cellData: IAgentCellData): IAgentCellData {
    return this._stateManager.reject(cellData);
  }

  /**
   * Reset agent cell to dormant state
   */
  reset(cellData: IAgentCellData): IAgentCellData {
    return this._stateManager.reset(cellData);
  }

  /**
   * Check if cell value is from another agent
   */
  isAgentGenerated(value: any): boolean {
    return this._handshakeProtocol.isAgentGenerated(value);
  }

  /**
   * Get agent confidence score for value
   */
  getAgentConfidence(value: any): number {
    return this._handshakeProtocol.getAgentConfidence(value);
  }

  /**
   * Validate agent cell data
   */
  validateAgentCell(cellData: IAgentCellData): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!cellData.origin_id) {
      errors.push('origin_id is required');
    }

    if (!cellData.cell_type) {
      errors.push('cell_type is required');
    } else if (!Object.values(AgentCellType).includes(cellData.cell_type)) {
      errors.push('cell_type must be a valid AgentCellType');
    }

    if (cellData.state && !Object.values(AgentCellState).includes(cellData.state)) {
      errors.push('state must be a valid AgentCellState');
    }

    if (cellData.config) {
      if (cellData.config.max_reasoning_steps !== undefined && cellData.config.max_reasoning_steps < 1) {
        errors.push('max_reasoning_steps must be at least 1');
      }

      if (cellData.config.timeout !== undefined && cellData.config.timeout < 1000) {
        errors.push('timeout must be at least 1000ms');
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Generate unique origin ID for agent cell
   */
  private _generateOriginId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 10);
    return `origin_${timestamp}_${random}`;
  }
}

export default AgentCellService;
