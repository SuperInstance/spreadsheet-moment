/**
 * ClawClient - Production-Ready Claw API Client
 *
 * Comprehensive HTTP and WebSocket client for Claw API integration with:
 * - Retry logic with exponential backoff
 * - Error recovery and fallback mechanisms
 * - Request/response validation with Zod schemas
 * - Connection health monitoring
 * - Real-time streaming support
 * - WebSocket authentication
 * - Message validation
 *
 * @packageDocumentation
 * @version 3.0.0 - Phase 3: Security & Architecture Improvements
 */
import { EventEmitter } from 'events';
import { ClawStateInfo, CreateClawRequest, CreateClawResponse, QueryClawRequest, QueryClawResponse, TriggerClawRequest, TriggerClawResponse, CancelClawRequest, CancelClawResponse, ApproveClawRequest, ApproveClawResponse, WebSocketMessage } from './types';
/**
 * ClawClient configuration options
 */
export interface ClawClientConfig {
    /** Base URL for Claw HTTP API */
    baseUrl: string;
    /** WebSocket URL for Claw real-time updates */
    wsUrl?: string;
    /** API key for authentication */
    apiKey?: string;
    /** Request timeout in milliseconds (default: 30000) */
    timeout?: number;
    /** Maximum retry attempts (default: 3) */
    maxRetries?: number;
    /** Initial retry delay in milliseconds (default: 1000) */
    initialRetryDelay?: number;
    /** Maximum retry delay in milliseconds (default: 30000) */
    maxRetryDelay?: number;
    /** Retry backoff multiplier (default: 2) */
    retryBackoffMultiplier?: number;
    /** Enable request/response validation (default: true) */
    enableValidation?: boolean;
    /** Enable WebSocket connection (default: true) */
    enableWebSocket?: boolean;
    /** WebSocket reconnection interval in milliseconds (default: 5000) */
    wsReconnectInterval?: number;
    /** Maximum WebSocket reconnection delay in milliseconds (default: 60000) */
    maxWsReconnectDelay?: number;
    /** Maximum WebSocket reconnection attempts (default: 10) */
    maxWsReconnectAttempts?: number;
    /** Connection health check interval in milliseconds (default: 60000) */
    healthCheckInterval?: number;
    /** Enable debug logging (default: false) */
    debug?: boolean;
}
/**
 * ClawClient - Production-ready Claw API client
 *
 * Phase 3 improvements:
 * - WebSocket authentication with Bearer token
 * - Message validation with Zod schemas
 * - Exponential backoff for reconnection
 * - Proper disposal mechanism
 * - API key validation
 */
export declare class ClawClient extends EventEmitter {
    private config;
    private ws;
    private wsConnected;
    private wsReconnectAttempts;
    private wsReconnectTimer;
    private healthCheckTimer;
    private isDisposed;
    constructor(config: ClawClientConfig);
    /**
     * Create a new Claw agent
     */
    createClaw(request: CreateClawRequest): Promise<CreateClawResponse>;
    /**
     * Query Claw agent state
     */
    queryClaw(request: QueryClawRequest): Promise<QueryClawResponse>;
    /**
     * Trigger a Claw agent
     */
    triggerClaw(request: TriggerClawRequest): Promise<TriggerClawResponse>;
    /**
     * Cancel a running Claw agent
     */
    cancelClaw(request: CancelClawRequest): Promise<CancelClawResponse>;
    /**
     * Approve or reject a Claw action
     */
    approveClaw(request: ApproveClawRequest): Promise<ApproveClawResponse>;
    /**
     * Delete a Claw agent
     */
    deleteClaw(clawId: string): Promise<void>;
    /**
     * Get Claw agent history
     */
    getClawHistory(clawId: string, limit?: number): Promise<ClawStateInfo[]>;
    /**
     * Make HTTP request with retry logic and error recovery
     */
    private httpRequest;
    /**
     * Calculate retry delay with exponential backoff
     */
    private calculateRetryDelay;
    /**
     * Handle HTTP error response
     */
    private handleHttpError;
    /**
     * Determine if error should trigger retry
     */
    private shouldRetry;
    /**
     * Normalize error to ClawAPIError
     */
    private normalizeError;
    /**
     * Get error code from HTTP status
     */
    private getErrorCodeFromStatus;
    /**
     * Connect to WebSocket server with authentication
     *
     * Phase 3 improvements:
     * - Adds Bearer token authentication
     * - Implements exponential backoff with jitter
     * - Validates all incoming messages
     */
    private connectWebSocket;
    /**
     * Calculate reconnection delay with exponential backoff and jitter
     *
     * Phase 3: Changed from linear to exponential backoff
     */
    private calculateReconnectDelay;
    /**
     * Handle incoming WebSocket message with validation
     *
     * Phase 3: Added Zod schema validation for all messages
     */
    private handleWebSocketMessage;
    /**
     * Disconnect WebSocket
     */
    disconnectWebSocket(): void;
    /**
     * Send WebSocket message
     */
    sendWebSocketMessage(message: WebSocketMessage): void;
    /**
     * Subscribe to claw updates
     */
    subscribeToClaw(clawId: string, cellId: string, sheetId: string): void;
    /**
     * Unsubscribe from claw updates
     */
    unsubscribeFromClaw(clawId: string, cellId: string, sheetId: string): void;
    /**
     * Start health check timer
     */
    private startHealthCheck;
    /**
     * Check connection health
     */
    private checkHealth;
    /**
     * Get connection status
     */
    getConnectionStatus(): {
        http: boolean;
        websocket: boolean;
        healthy: boolean;
        disposed: boolean;
    };
    /**
     * Check if client is disposed
     */
    private checkDisposed;
    /**
     * Dispose of client resources
     *
     * Phase 3: Enhanced disposal mechanism for singleton pattern
     */
    dispose(): void;
    /**
     * Check if client is disposed
     */
    isDisposedClient(): boolean;
    /**
     * Generate unique trace ID
     */
    private generateTraceId;
    /**
     * Sleep for specified milliseconds
     */
    private sleep;
    /**
     * Debug logging (sanitized to prevent leaking sensitive data)
     */
    private debugLog;
}
/**
 * Create a configured ClawClient instance
 */
export declare function createClawClient(config: ClawClientConfig): ClawClient;
export default ClawClient;
//# sourceMappingURL=ClawClient.d.ts.map