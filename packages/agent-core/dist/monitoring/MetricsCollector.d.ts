/**
 * MetricsCollector - Production Metrics Collection System
 *
 * Comprehensive metrics collection for Claw API operations including:
 * - Request/response metrics
 * - WebSocket connection metrics
 * - Error tracking
 * - Performance monitoring
 * - Custom business metrics
 *
 * @packageDocumentation
 * @version 1.0.0 - Week 4: Production Deployment
 */
import { EventEmitter } from 'events';
/**
 * Metric types supported by the collector
 */
export declare enum MetricType {
    COUNTER = "counter",
    GAUGE = "gauge",
    HISTOGRAM = "histogram",
    SUMMARY = "summary"
}
/**
 * Metric category for organization
 */
export declare enum MetricCategory {
    HTTP = "http",
    WEBSOCKET = "websocket",
    ERROR = "error",
    PERFORMANCE = "performance",
    BUSINESS = "business",
    SYSTEM = "system"
}
/**
 * Base metric interface
 */
export interface Metric {
    name: string;
    type: MetricType;
    category: MetricCategory;
    description: string;
    labels?: Record<string, string>;
    timestamp: number;
}
/**
 * Counter metric (monotonically increasing)
 */
export interface CounterMetric extends Metric {
    type: MetricType.COUNTER;
    value: number;
}
/**
 * Gauge metric (can go up or down)
 */
export interface GaugeMetric extends Metric {
    type: MetricType.GAUGE;
    value: number;
}
/**
 * Histogram metric (distribution of values)
 */
export interface HistogramMetric extends Metric {
    type: MetricType.HISTOGRAM;
    value: number;
    buckets?: number[];
}
/**
 * Summary metric (statistical summary)
 */
export interface SummaryMetric extends Metric {
    type: MetricType.SUMMARY;
    count: number;
    sum: number;
    avg: number;
    min?: number;
    max?: number;
    p50?: number;
    p95?: number;
    p99?: number;
}
/**
 * Metric storage interface
 */
interface MetricStorage {
    push(metric: Metric): void;
    get(category?: MetricCategory, since?: number): Metric[];
    clear(category?: MetricCategory): void;
    getStats(): StorageStats;
}
/**
 * Storage statistics
 */
interface StorageStats {
    totalMetrics: number;
    metricsByCategory: Record<MetricCategory, number>;
    oldestMetric?: number;
    newestMetric?: number;
}
/**
 * MetricsCollector configuration
 */
export interface MetricsCollectorConfig {
    /** Storage implementation (default: in-memory) */
    storage?: MetricStorage;
    /** Enable debug logging */
    debug?: boolean;
    /** Custom tags to add to all metrics */
    globalTags?: Record<string, string>;
    /** Sampling rate (0-1, default: 1) */
    samplingRate?: number;
}
/**
 * MetricsCollector - Production metrics collection
 *
 * Collects and aggregates metrics for:
 * - HTTP requests (latency, success rate, error rate)
 * - WebSocket connections (connection count, message rate)
 * - Errors (error count by type, error rate)
 * - Performance (operation latencies, throughput)
 * - Business metrics (claw creation rate, trigger rate)
 *
 * Usage:
 * ```typescript
 * const collector = new MetricsCollector({
 *   debug: true,
 *   globalTags: { environment: 'production' }
 * });
 *
 * // Record HTTP request
 * collector.recordHttpRequest('POST', '/api/claws', 200, 150);
 *
 * // Record WebSocket message
 * collector.recordWebSocketMessage('reasoningStep', 25);
 *
 * // Record error
 * collector.recordError('validation_error', 'Invalid request');
 *
 * // Get metrics
 * const httpMetrics = collector.getMetrics(MetricCategory.HTTP);
 * ```
 */
export declare class MetricsCollector extends EventEmitter {
    private config;
    private storage;
    private histograms;
    private readonly latencyBuckets;
    constructor(config?: MetricsCollectorConfig);
    /**
     * Record HTTP request metric
     */
    recordHttpRequest(method: string, endpoint: string, statusCode: number, latencyMs: number, labels?: Record<string, string>): void;
    /**
     * Record HTTP error
     */
    recordHttpError(method: string, endpoint: string, error: string, statusCode?: number, labels?: Record<string, string>): void;
    /**
     * Record WebSocket connection
     */
    recordWebSocketConnection(labels?: Record<string, string>): void;
    /**
     * Record WebSocket disconnection
     */
    recordWebSocketDisconnection(reason: string, labels?: Record<string, string>): void;
    /**
     * Record WebSocket message
     */
    recordWebSocketMessage(messageType: string, latencyMs: number, labels?: Record<string, string>): void;
    /**
     * Record error
     */
    recordError(errorType: string, errorMessage: string, labels?: Record<string, string>): void;
    /**
     * Record claw creation
     */
    recordClawCreation(labels?: Record<string, string>): void;
    /**
     * Record claw trigger
     */
    recordClawTrigger(labels?: Record<string, string>): void;
    /**
     * Record claw completion
     */
    recordClawCompletion(success: boolean, durationMs: number, labels?: Record<string, string>): void;
    /**
     * Record operation duration
     */
    recordOperationDuration(operation: string, durationMs: number, labels?: Record<string, string>): void;
    /**
     * Record memory usage
     */
    recordMemoryUsage(): void;
    /**
     * Record latency histogram
     */
    private recordLatencyHistogram;
    /**
     * Calculate histogram buckets
     */
    private calculateBuckets;
    /**
     * Get metrics by category
     */
    getMetrics(category?: MetricCategory, since?: number): Metric[];
    /**
     * Get metric statistics
     */
    getStats(): StorageStats;
    /**
     * Export metrics in Prometheus format
     */
    exportPrometheus(): string;
    /**
     * Export metrics as JSON
     */
    exportJSON(): string;
    /**
     * Clear all metrics
     */
    clear(category?: MetricCategory): void;
    /**
     * Record a metric
     */
    private recordMetric;
    /**
     * Check if should sample based on sampling rate
     */
    private shouldSample;
    /**
     * Debug logging
     */
    private debugLog;
    /**
     * Start periodic cleanup
     */
    private startPeriodicCleanup;
    /**
     * Dispose of collector
     */
    dispose(): void;
}
/**
 * Get or create global metrics collector
 */
export declare function getMetricsCollector(config?: MetricsCollectorConfig): MetricsCollector;
/**
 * Reset global metrics collector
 */
export declare function resetMetricsCollector(): void;
export default MetricsCollector;
//# sourceMappingURL=MetricsCollector.d.ts.map