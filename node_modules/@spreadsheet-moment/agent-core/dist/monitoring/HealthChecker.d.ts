/**
 * HealthChecker - System Health Monitoring
 *
 * Comprehensive health checking for Claw API integration including:
 * - HTTP endpoint health
 * - WebSocket connection health
 * - Performance degradation detection
 * - Resource usage monitoring
 * - Dependency health checks
 *
 * @packageDocumentation
 * @version 1.0.0 - Week 4: Production Deployment
 */
import { EventEmitter } from 'events';
import { MetricsCollector } from './MetricsCollector';
/**
 * Health status levels
 */
export declare enum HealthStatus {
    HEALTHY = "healthy",
    DEGRADED = "degraded",
    UNHEALTHY = "unhealthy",
    UNKNOWN = "unknown"
}
/**
 * Health check result
 */
export interface HealthCheckResult {
    status: HealthStatus;
    checks: CheckResult[];
    timestamp: number;
    summary: string;
}
/**
 * Individual check result
 */
export interface CheckResult {
    name: string;
    status: HealthStatus;
    message: string;
    duration: number;
    metadata?: Record<string, any>;
}
/**
 * Health check configuration
 */
export interface HealthCheckConfig {
    /** Check name */
    name: string;
    /** Check interval in milliseconds */
    interval?: number;
    /** Timeout in milliseconds */
    timeout?: number;
    /** Failure threshold before marking unhealthy */
    failureThreshold?: number;
    /** Check function */
    check: () => Promise<CheckResult>;
}
/**
 * HTTP endpoint health check
 */
export interface HTTPHealthCheckConfig {
    /** Endpoint URL */
    url: string;
    /** Expected status code (default: 200) */
    expectedStatus?: number;
    /** Request timeout (default: 5000ms) */
    timeout?: number;
    /** Headers to include */
    headers?: Record<string, string>;
}
/**
 * WebSocket health check
 */
export interface WebSocketHealthCheckConfig {
    /** WebSocket URL */
    url: string;
    /** Connection timeout (default: 5000ms) */
    timeout?: number;
    /** Expected connection state */
    expectConnected?: boolean;
}
/**
 * Resource usage thresholds
 */
export interface ResourceThresholds {
    /** Maximum heap size in MB */
    maxHeapMB?: number;
    /** Maximum heap usage percentage */
    maxHeapUsagePercent?: number;
    /** Maximum event loop delay in ms */
    maxEventLoopDelay?: number;
}
/**
 * HealthChecker configuration
 */
export interface HealthCheckerConfig {
    /** Metrics collector for tracking health metrics */
    metricsCollector?: MetricsCollector;
    /** Default check interval (default: 60000ms) */
    defaultInterval?: number;
    /** Default timeout (default: 5000ms) */
    defaultTimeout?: number;
    /** Default failure threshold (default: 3) */
    defaultFailureThreshold?: number;
    /** Enable debug logging */
    debug?: boolean;
}
/**
 * HealthChecker - System health monitoring
 *
 * Monitors system health including:
 * - API endpoints
 * - WebSocket connections
 * - Resource usage
 * - Custom health checks
 *
 * Usage:
 * ```typescript
 * const checker = new HealthChecker({
 *   debug: true
 * });
 *
 * // Add HTTP health check
 * checker.addHTTPCheck('api', 'https://api.example.com/health');
 *
 * // Add resource check
 * checker.addResourceCheck({
 *   maxHeapMB: 512,
 *   maxHeapUsagePercent: 80
 * });
 *
 * // Start monitoring
 * checker.start();
 *
 * // Get current health
 * const health = await checker.checkHealth();
 * ```
 */
export declare class HealthChecker extends EventEmitter {
    private config;
    private checks;
    private checkTimers;
    private failureCounts;
    private lastResults;
    private isRunning;
    private metricsCollector?;
    constructor(config?: HealthCheckerConfig);
    /**
     * Add a custom health check
     */
    addHealthCheck(config: HealthCheckConfig): void;
    /**
     * Add HTTP endpoint health check
     */
    addHTTPCheck(name: string, config: HTTPHealthCheckConfig): void;
    /**
     * Add WebSocket health check
     */
    addWebSocketCheck(name: string, config: WebSocketHealthCheckConfig, webSocketRef?: {
        ws: WebSocket | null;
        connected: boolean;
    }): void;
    /**
     * Add resource usage health check
     */
    addResourceCheck(name: string, thresholds: ResourceThresholds): void;
    /**
     * Run all health checks
     */
    checkHealth(): Promise<HealthCheckResult>;
    /**
     * Run a single health check
     */
    private runCheck;
    /**
     * Calculate overall health status
     */
    private calculateOverallStatus;
    /**
     * Generate health summary
     */
    private generateSummary;
    /**
     * Start health check monitoring
     */
    start(): void;
    /**
     * Stop health check monitoring
     */
    stop(): void;
    /**
     * Schedule a health check
     */
    private scheduleCheck;
    /**
     * Remove a health check
     */
    removeHealthCheck(name: string): void;
    /**
     * Setup resource monitoring
     */
    private setupResourceMonitoring;
    /**
     * Get last check result
     */
    getLastResult(name: string): CheckResult | undefined;
    /**
     * Get all registered health checks
     */
    getHealthChecks(): string[];
    /**
     * Check if health checker is running
     */
    isActive(): boolean;
    /**
     * Debug logging
     */
    private debugLog;
    /**
     * Dispose of health checker
     */
    dispose(): void;
}
/**
 * Get or create global health checker
 */
export declare function getHealthChecker(config?: HealthCheckerConfig): HealthChecker;
/**
 * Reset global health checker
 */
export declare function resetHealthChecker(): void;
export default HealthChecker;
//# sourceMappingURL=HealthChecker.d.ts.map