/**
 * Lazy Loader
 *
 * Utilities for lazy loading components and resources
 */
/**
 * Lazy load a component
 */
export declare function lazyLoad<T>(loader: () => Promise<T>, fallback?: React.ComponentType): React.LazyExoticComponent<React.ComponentType<any>>;
/**
 * Create a lazy loading wrapper with timeout
 */
export declare function createLazyLoaderWithTimeout<T>(loader: () => Promise<T>, timeout: number): () => Promise<T>;
/**
 * Preload a resource
 */
export declare function preloadResource(url: string): Promise<void>;
/**
 * Preload an image
 */
export declare function preloadImage(src: string): Promise<HTMLImageElement>;
/**
 * Lazy load images with Intersection Observer
 */
export declare function lazyLoadImages(selector?: string, options?: IntersectionObserverInit): void;
/**
 * Create a bundle loader
 */
export declare function createBundleLoader(bundles: Record<string, () => Promise<any>>): {
    /**
     * Load a bundle by name
     */
    load: (name: string) => Promise<any>;
    /**
     * Preload multiple bundles
     */
    preloadMultiple: (names: string[]) => Promise<void>;
    /**
     * Check if a bundle is loaded
     */
    isLoaded: (name: string) => boolean;
};
//# sourceMappingURL=LazyLoader.d.ts.map