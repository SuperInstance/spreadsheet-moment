/**
 * Cell Update Optimizer
 *
 * Optimizes cell update performance through batching, debouncing, and throttling
 */
import { CellUpdateMetrics } from './types';
/**
 * Cell Update Batch Configuration
 */
export interface BatchConfig {
    /** Maximum batch size (number of cells) */
    maxBatchSize: number;
    /** Maximum batch duration in milliseconds */
    maxBatchDuration: number;
    /** Minimum batch size before flushing */
    minBatchSize: number;
}
/**
 * Cell Update Optimizer Class
 */
export declare class CellUpdateOptimizer {
    private _batchQueue;
    private _batchConfig;
    private _batchTimer;
    private _updateCallbacks;
    private _updateMetrics;
    constructor(batchConfig?: Partial<BatchConfig>);
    /**
     * Schedule a cell update (with batching)
     */
    scheduleUpdate(location: string, value: any): void;
    /**
     * Flush the batch queue
     */
    private flushBatch;
    /**
     * Register an update callback for a cell
     */
    registerCallback(location: string, callback: (value: any) => void): void;
    /**
     * Unregister an update callback for a cell
     */
    unregisterCallback(location: string): void;
    /**
     * Get update metrics
     */
    getMetrics(): CellUpdateMetrics[];
    /**
     * Get average update duration
     */
    getAverageDuration(): number;
    /**
     * Get P95 update duration
     */
    getP95Duration(): number;
    /**
     * Clear metrics
     */
    clearMetrics(): void;
    /**
     * Dispose of optimizer
     */
    dispose(): void;
}
/**
 * Create a cell update optimizer instance
 */
export declare function createCellUpdateOptimizer(config?: Partial<BatchConfig>): CellUpdateOptimizer;
/**
 * Get global cell update optimizer instance
 */
export declare function getCellUpdateOptimizer(): CellUpdateOptimizer;
/**
 * Reset global cell update optimizer
 */
export declare function resetCellUpdateOptimizer(): void;
//# sourceMappingURL=CellUpdateOptimizer.d.ts.map