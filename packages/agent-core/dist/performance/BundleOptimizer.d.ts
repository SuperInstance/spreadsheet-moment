/**
 * Bundle Optimizer
 *
 * Utilities for optimizing bundle size and loading
 */
/**
 * Code split point marker
 */
export declare function codeSplit<T>(loader: () => Promise<T>): () => Promise<T>;
/**
 * Create a dynamic import with chunk name
 */
export declare function dynamicImport(chunkName: string, importer: () => Promise<any>): Promise<any>;
/**
 * Measure bundle size
 */
export declare function measureBundleSize(): Promise<number>;
/**
 * Get bundle analysis
 */
export declare function getBundleAnalysis(): Promise<{
    totalSize: number;
    chunks: Array<{
        name: string;
        size: number;
        url: string;
    }>;
    recommendations: string[];
}>;
/**
 * Preload critical bundles
 */
export declare function preloadCriticalBundles(bundles: string[]): void;
/**
 * Create a bundle router for code splitting
 */
export declare function createBundleRouter(routes: Record<string, () => Promise<any>>): {
    /**
     * Get a route loader
     */
    getRouteLoader: (path: string) => () => Promise<void>;
    /**
     * Preload a route
     */
    preloadRoute: (path: string) => Promise<void>;
    /**
     * Preload multiple routes
     */
    preloadRoutes: (paths: string[]) => Promise<void>;
    /**
     * Check if route is loaded
     */
    isRouteLoaded: (path: string) => boolean;
};
//# sourceMappingURL=BundleOptimizer.d.ts.map