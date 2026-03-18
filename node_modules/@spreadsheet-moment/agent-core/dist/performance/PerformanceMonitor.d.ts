/**
 * Performance Monitor
 *
 * Monitors and tracks application performance metrics
 */
import { PerformanceMetrics, PerformanceReport, CellUpdateMetrics, PerformanceThresholds } from './types';
/**
 * Performance Monitor Class
 */
export declare class PerformanceMonitor {
    private _metrics;
    private _cellUpdates;
    private _thresholds;
    private _isMonitoring;
    private _monitoringInterval;
    private _maxMetrics;
    constructor(thresholds?: Partial<PerformanceThresholds>);
    /**
     * Start monitoring performance
     */
    startMonitoring(interval?: number): void;
    /**
     * Stop monitoring performance
     */
    stopMonitoring(): void;
    /**
     * Collect current performance metrics
     */
    private collectMetrics;
    /**
     * Record cell update metrics
     */
    recordCellUpdate(metrics: CellUpdateMetrics): void;
    /**
     * Get average cell update latency
     */
    private getAverageCellUpdateLatency;
    /**
     * Measure frame rate
     */
    private measureFrameRate;
    /**
     * Measure memory usage
     */
    private measureMemoryUsage;
    /**
     * Measure CPU usage (approximation)
     */
    private measureCpuUsage;
    /**
     * Measure network latency
     */
    private measureNetworkLatency;
    /**
     * Measure bundle size
     */
    private measureBundleSize;
    /**
     * Get current metrics
     */
    getCurrentMetrics(): PerformanceMetrics | null;
    /**
     * Get performance report
     */
    getReport(timeWindow?: number): PerformanceReport;
    /**
     * Calculate average metrics
     */
    private calculateAverages;
    /**
     * Calculate peak metrics
     */
    private calculatePeaks;
    /**
     * Calculate P95 metrics
     */
    private calculateP95;
    /**
     * Detect performance issues
     */
    private detectIssues;
    /**
     * Generate optimization recommendations
     */
    private generateRecommendations;
    /**
     * Create empty report
     */
    private createEmptyReport;
    /**
     * Clear all metrics
     */
    clearMetrics(): void;
    /**
     * Dispose of monitor
     */
    dispose(): void;
}
/**
 * Create a performance monitor instance
 */
export declare function createPerformanceMonitor(thresholds?: Partial<PerformanceThresholds>): PerformanceMonitor;
/**
 * Get global performance monitor instance
 */
export declare function getPerformanceMonitor(): PerformanceMonitor;
/**
 * Reset global performance monitor
 */
export declare function resetPerformanceMonitor(): void;
//# sourceMappingURL=PerformanceMonitor.d.ts.map