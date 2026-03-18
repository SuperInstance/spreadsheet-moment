/**
 * Monitoring Middleware - Request/Response Monitoring
 *
 * Middleware for monitoring HTTP requests and WebSocket connections:
 * - Request/response logging
 * - Performance metrics collection
 * - Error tracking
 * - Request tracing
 *
 * @packageDocumentation
 * @version 1.0.0 - Week 4: Production Deployment
 */
import { MetricsCollector } from '../monitoring/MetricsCollector';
/**
 * Request metadata for tracking
 */
export interface RequestMetadata {
    /** Request ID for tracing */
    requestId: string;
    /** Timestamp when request started */
    startTime: number;
    /** HTTP method */
    method: string;
    /** Request endpoint/path */
    endpoint: string;
    /** Request headers (sanitized) */
    headers: Record<string, string>;
    /** Request body size */
    bodySize?: number;
    /** Custom tags */
    tags?: Record<string, string>;
}
/**
 * Response metadata for tracking
 */
export interface ResponseMetadata {
    /** Response status code */
    statusCode: number;
    /** Response body size */
    bodySize?: number;
    /** Response headers */
    headers: Record<string, string>;
    /** Custom tags */
    tags?: Record<string, string>;
}
/**
 * Error metadata for tracking
 */
export interface ErrorMetadata {
    /** Error type */
    errorType: string;
    /** Error message */
    errorMessage: string;
    /** Error stack trace */
    stackTrace?: string;
    /** Custom tags */
    tags?: Record<string, string>;
}
/**
 * Monitoring middleware configuration
 */
export interface MonitoringMiddlewareConfig {
    /** Metrics collector instance */
    metricsCollector?: MetricsCollector;
    /** Enable request logging */
    logRequests?: boolean;
    /** Enable response logging */
    logResponses?: boolean;
    /** Enable error logging */
    logErrors?: boolean;
    /** Enable performance tracking */
    trackPerformance?: boolean;
    /** Sanitize headers (remove sensitive data) */
    sanitizeHeaders?: boolean;
    /** Headers to sanitize */
    sensitiveHeaders?: string[];
    /** Enable debug logging */
    debug?: boolean;
}
/**
 * Monitoring middleware for HTTP/WebSocket monitoring
 *
 * Usage:
 * ```typescript
 * const middleware = new MonitoringMiddleware({
 *   logRequests: true,
 *   logResponses: true,
 *   trackPerformance: true
 * });
 *
 * // Monitor fetch request
 * const response = await middleware.monitorFetch({
 *   url: 'https://api.example.com/claws',
 *   method: 'POST',
 *   headers: { 'Authorization': 'Bearer token' },
 *   body: JSON.stringify(data)
 * });
 * ```
 */
export declare class MonitoringMiddleware {
    private config;
    private metricsCollector;
    private activeRequests;
    constructor(config?: MonitoringMiddlewareConfig);
    /**
     * Monitor an HTTP fetch request
     */
    monitorFetch(input: RequestInfo | URL, init?: RequestInit & {
        tags?: Record<string, string>;
    }): Promise<Response>;
    /**
     * Monitor WebSocket message
     */
    monitorWebSocketMessage(messageType: string, latencyMs: number, tags?: Record<string, string>): void;
    /**
     * Monitor WebSocket connection
     */
    monitorWebSocketConnection(connected: boolean, tags?: Record<string, string>): void;
    /**
     * Monitor WebSocket error
     */
    monitorWebSocketError(error: Error, tags?: Record<string, string>): void;
    /**
     * Log request
     */
    private logRequest;
    /**
     * Log response
     */
    private logResponse;
    /**
     * Log error
     */
    private logError;
    /**
     * Generate unique request ID
     */
    private generateRequestId;
    /**
     * Extract endpoint from URL
     */
    private extractEndpoint;
    /**
     * Sanitize headers (remove sensitive data)
     */
    private sanitizeHeaders;
    /**
     * Check if header should be sanitized
     */
    private shouldSanitizeHeader;
    /**
     * Calculate body size
     */
    private calculateBodySize;
    /**
     * Get active requests
     */
    getActiveRequests(): RequestMetadata[];
    /**
     * Debug logging
     */
    private debugLog;
}
/**
 * Create monitoring middleware with default configuration
 */
export declare function createMonitoringMiddleware(config?: MonitoringMiddlewareConfig): MonitoringMiddleware;
export declare function getMonitoringMiddleware(config?: MonitoringMiddlewareConfig): MonitoringMiddleware;
/**
 * Reset global monitoring middleware
 */
export declare function resetMonitoringMiddleware(): void;
export default MonitoringMiddleware;
//# sourceMappingURL=monitoringMiddleware.d.ts.map