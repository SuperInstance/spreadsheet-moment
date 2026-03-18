/**
 * Performance Optimization Module
 *
 * Utilities and hooks for optimizing cell update latency and overall performance
 *
 * @packageDocumentation
 */
import { PerformanceMonitor as PMClass } from './PerformanceMonitor';
import { CellUpdateOptimizer as CUOClass } from './CellUpdateOptimizer';
export { PMClass as PerformanceMonitor };
export { CUOClass as CellUpdateOptimizer };
export { lazyLoad, createLazyLoaderWithTimeout, preloadResource, preloadImage, lazyLoadImages, createBundleLoader } from './LazyLoader';
export { codeSplit, dynamicImport, measureBundleSize, getBundleAnalysis, preloadCriticalBundles, createBundleRouter } from './BundleOptimizer';
export type { PerformanceMetrics, PerformanceReport, CellUpdateMetrics, PerformanceIssue, OptimizationRecommendation, PerformanceThresholds, OptimizationStrategy } from './types';
export { measurePerformance, createPerformanceMarker, withPerformanceMonitoring, formatDuration, formatBytes, calculatePerformanceScore, getPerformanceGrade, debounce, throttle, memoize, rafThrottle, whenIdle, createMicrotask } from './utils';
export { usePerformanceMonitor } from './hooks';
export { useCellUpdateOptimization } from './hooks';
export { useLazyLoad } from './hooks';
export { useDebounce } from './hooks';
export { useThrottle } from './hooks';
/**
 * Create a performance monitor instance
 */
export declare function createPerformanceMonitor(): PMClass;
/**
 * Get global performance monitor instance
 */
export declare function getPerformanceMonitor(): PMClass;
/**
 * Reset global performance monitor
 */
export declare function resetPerformanceMonitor(): void;
/**
 * Create a cell update optimizer instance
 */
export declare function createCellUpdateOptimizer(): CUOClass;
/**
 * Get global cell update optimizer instance
 */
export declare function getCellUpdateOptimizer(): CUOClass;
/**
 * Reset global cell update optimizer
 */
export declare function resetCellUpdateOptimizer(): void;
//# sourceMappingURL=index.d.ts.map