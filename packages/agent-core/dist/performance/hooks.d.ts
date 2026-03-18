/**
 * Performance Hooks
 *
 * React hooks for performance optimization
 */
/**
 * Use Performance Monitor Hook
 *
 * Monitors component performance
 */
export declare function usePerformanceMonitor(interval?: number): import("./types").PerformanceMetrics | null;
/**
 * Use Cell Update Optimization Hook
 *
 * Optimizes cell update performance
 */
export declare function useCellUpdateOptimization(): {
    scheduleUpdate: (location: string, value: any) => void;
    getMetrics: () => import("./types").CellUpdateMetrics[];
    getAverageDuration: () => number;
};
/**
 * Use Lazy Load Hook
 *
 * Lazy loads components on demand
 */
export declare function useLazyLoad<T>(loader: () => Promise<T>, dependencies?: any[]): {
    data: T | null;
    loading: boolean;
    error: Error | null;
};
/**
 * Use Debounce Hook
 *
 * Debounces a function call
 */
export declare function useDebounce<T extends (...args: any[]) => any>(func: T, delay: number): T;
/**
 * Use Throttle Hook
 *
 * Throttles a function call
 */
export declare function useThrottle<T extends (...args: any[]) => any>(func: T, delay: number): T;
/**
 * Use Memoized Callback Hook
 *
 * Memoizes a callback with dependencies
 */
export declare function useMemoizedCallback<T extends (...args: any[]) => any>(func: T, dependencies: any[]): T;
/**
 * Use Memoized Value Hook
 *
 * Memoizes a value with dependencies
 */
export declare function useMemoizedValue<T>(factory: () => T, dependencies: any[]): T;
/**
 * Use Previous Value Hook
 *
 * Gets the previous value of a state or prop
 */
export declare function usePrevious<T>(value: T): T | undefined;
/**
 * Use Intersection Observer Hook
 *
 * Observes when an element enters the viewport
 */
export declare function useIntersectionObserver(ref: React.RefObject<Element>, options?: IntersectionObserverInit): boolean;
/**
 * Use Async State Hook
 *
 * Manages async state with loading and error states
 */
export declare function useAsyncState<T>(asyncFunction: () => Promise<T>, immediate?: boolean): {
    data: T | null;
    loading: boolean;
    error: Error | null;
    execute: () => Promise<void>;
};
/**
 * Use Local Storage Hook
 *
 * Syncs state with localStorage
 */
export declare function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void];
//# sourceMappingURL=hooks.d.ts.map