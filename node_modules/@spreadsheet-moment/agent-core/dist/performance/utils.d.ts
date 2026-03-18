/**
 * Performance Utilities
 *
 * Helper functions for performance measurement and optimization
 */
import { PerformanceMetrics } from './types';
/**
 * Measure performance of a function
 */
export declare function measurePerformance<T>(name: string, fn: () => Promise<T>): Promise<T>;
/**
 * Create a performance marker
 */
export declare function createPerformanceMarker(name: string): {
    start: () => void;
    end: () => number;
};
/**
 * Wrap a function with performance monitoring
 */
export declare function withPerformanceMonitoring<T extends (...args: any[]) => any>(fn: T, name: string): T;
/**
 * Format duration for display
 */
export declare function formatDuration(ms: number): string;
/**
 * Format bytes for display
 */
export declare function formatBytes(bytes: number): string;
/**
 * Calculate performance score (0-100)
 */
export declare function calculatePerformanceScore(metrics: PerformanceMetrics): number;
/**
 * Get performance grade
 */
export declare function getPerformanceGrade(score: number): {
    grade: string;
    color: string;
    label: string;
};
/**
 * Debounce a function
 */
export declare function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void;
/**
 * Throttle a function
 */
export declare function throttle<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void;
/**
 * Create a memoized function
 */
export declare function memoize<T extends (...args: any[]) => any>(fn: T): T;
/**
 * Create a request animation frame throttle
 */
export declare function rafThrottle<T extends (...args: any[]) => any>(fn: T): T;
/**
 * Create an idle callback
 */
export declare function whenIdle(callback: () => void, timeout?: number): void;
/**
 * Create a microtask
 */
export declare function createMicrotask(callback: () => void): void;
//# sourceMappingURL=utils.d.ts.map