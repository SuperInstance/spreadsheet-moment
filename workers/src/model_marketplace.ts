/**
 * Spreadsheet Moment - AI Model Marketplace
 * Round 7: Advanced AI Integration
 *
 * Marketplace for community-contributed AI models:
 * - Model upload and versioning
 * - Performance benchmarking
 * - A/B testing framework
 * - Model discovery and search
 * - Community ratings and reviews
 * - Monetization and licensing
 */

interface ModelMetadata {
  modelId: string;
  name: string;
  description: string;
  author: string;
  version: string;
  category: 'formula-generation' | 'data-analysis' | 'vision' | 'nlp' | 'custom';
  tags: string[];
  uploaded: Date;
  updated: Date;
  downloads: number;
  rating: number;
  numRatings: number;
  license: 'mit' | 'apache' | 'gpl' | 'proprietary';
  pricing: {
    type: 'free' | 'paid' | 'subscription';
    price?: number;
    currency?: string;
  };
}

interface ModelSpec {
  metadata: ModelMetadata;
  architecture: {
    type: 'transformer' | 'cnn' | 'rnn' | 'hybrid';
    layers: number[];
    parameters: number;
    fileSize: number;  // bytes
  };
  performance: {
    accuracy: number;
    latency: number;  // milliseconds
    throughput: number;  // predictions/second
    memoryUsage: number;  // MB
  };
  requirements: {
    gpu: boolean;
    minMemory: number;  // MB
    frameworks: string[];
  };
  files: {
    model: string;  // URL to model file
    config: string;  // URL to config
    readme: string;  // URL to documentation
  };
}

interface BenchmarkResult {
  modelId: string;
  benchmarkId: string;
  timestamp: Date;
  metrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    latency: number;
    throughput: number;
  };
  environment: {
    gpu: string;
    cpu: string;
    memory: number;
    framework: string;
  };
}

interface ABTestConfig {
  testId: string;
  name: string;
  description: string;
  modelA: string;  // Model ID
  modelB: string;  // Model ID
  trafficSplit: number;  // 0-1, fraction for model A
  startDate: Date;
  endDate?: Date;
  status: 'running' | 'completed' | 'paused';
  metrics: Array<{
    name: string;
    modelAValue: number;
    modelBValue: number;
    significance: number;
    winner: 'A' | 'B' | 'tie' | 'inconclusive';
  }>;
}

/**
 * Model Registry and Storage
 */
class ModelRegistry {
  private models: Map<string, ModelSpec> = new Map();
  private byCategory: Map<string, string[]> = new Map();
  private byAuthor: Map<string, string[]> = new Map();
  private byTag: Map<string, string[]> = new Map();

  /**
   * Register a new model
   */
  async registerModel(model: ModelSpec): Promise<string> {
    // Validate model
    this.validateModel(model);

    // Generate unique ID if not provided
    if (!model.metadata.modelId) {
      model.metadata.modelId = this.generateModelId(model.metadata.name, model.metadata.author);
    }

    // Store model
    this.models.set(model.metadata.modelId, model);

    // Update indexes
    this.updateIndexes(model.metadata.modelId, model.metadata);

    // Record upload event
    console.log(`Model registered: ${model.metadata.modelId} - ${model.metadata.name}`);

    return model.metadata.modelId;
  }

  /**
   * Get model by ID
   */
  getModel(modelId: string): ModelSpec | null {
    return this.models.get(modelId) || null;
  }

  /**
   * Search models
   */
  searchModels(query: {
    category?: string;
    author?: string;
    tags?: string[];
    minRating?: number;
    license?: string;
    free?: boolean;
  }): ModelSpec[] {
    let results = Array.from(this.models.values());

    if (query.category) {
      results = results.filter(m => m.metadata.category === query.category);
    }

    if (query.author) {
      results = results.filter(m => m.metadata.author === query.author);
    }

    if (query.tags && query.tags.length > 0) {
      results = results.filter(m =>
        query.tags!.some(tag => m.metadata.tags.includes(tag))
      );
    }

    if (query.minRating) {
      results = results.filter(m => m.metadata.rating >= query.minRating!);
    }

    if (query.license) {
      results = results.filter(m => m.metadata.license === query.license);
    }

    if (query.free) {
      results = results.filter(m => m.metadata.pricing.type === 'free');
    }

    // Sort by rating and downloads
    results.sort((a, b) => {
      const scoreA = a.metadata.rating * Math.log10(a.metadata.downloads + 1);
      const scoreB = b.metadata.rating * Math.log10(b.metadata.downloads + 1);
      return scoreB - scoreA;
    });

    return results;
  }

  /**
   * Update model version
   */
  async updateModel(modelId: string, updates: Partial<ModelSpec>): Promise<boolean> {
    const existing = this.models.get(modelId);
    if (!existing) return false;

    const updated = { ...existing, ...updates };
    updated.metadata.updated = new Date();

    this.models.set(modelId, updated);
    return true;
  }

  /**
   * Rate model
   */
  async rateModel(modelId: string, rating: number, userId: string): Promise<boolean> {
    const model = this.models.get(modelId);
    if (!model) return false;

    // Update rating (simplified - would need user tracking)
    const newRating = (
      (model.metadata.rating * model.metadata.numRatings + rating) /
      (model.metadata.numRatings + 1)
    );

    model.metadata.rating = newRating;
    model.metadata.numRatings++;

    this.models.set(modelId, model);
    return true;
  }

  /**
   * Increment download count
   */
  async incrementDownloads(modelId: string): Promise<void> {
    const model = this.models.get(modelId);
    if (model) {
      model.metadata.downloads++;
      this.models.set(modelId, model);
    }
  }

  /**
   * Get trending models
   */
  getTrendingModels(limit: number = 10): ModelSpec[] {
    const now = Date.now();
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;

    return Array.from(this.models.values())
      .filter(m => m.metadata.updated.getTime() > weekAgo)
      .sort((a, b) => {
        const scoreA = a.metadata.downloads * a.metadata.rating;
        const scoreB = b.metadata.downloads * b.metadata.rating;
        return scoreB - scoreA;
      })
      .slice(0, limit);
  }

  private validateModel(model: ModelSpec): void {
    if (!model.metadata.name || model.metadata.name.length === 0) {
      throw new Error('Model name is required');
    }

    if (!model.metadata.author) {
      throw new Error('Model author is required');
    }

    if (!model.files.model || !model.files.config) {
      throw new Error('Model files are required');
    }

    if (model.performance.accuracy < 0 || model.performance.accuracy > 1) {
      throw new Error('Accuracy must be between 0 and 1');
    }
  }

  private generateModelId(name: string, author: string): string {
    const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const authorNormalized = author.toLowerCase().replace(/[^a-z0-9]/g, '');
    const timestamp = Date.now().toString(36);
    return `${authorNormalized}-${normalized}-${timestamp}`;
  }

  private updateIndexes(modelId: string, metadata: ModelMetadata): void {
    // Category index
    if (!this.byCategory.has(metadata.category)) {
      this.byCategory.set(metadata.category, []);
    }
    this.byCategory.get(metadata.category)!.push(modelId);

    // Author index
    if (!this.byAuthor.has(metadata.author)) {
      this.byAuthor.set(metadata.author, []);
    }
    this.byAuthor.get(metadata.author)!.push(modelId);

    // Tag index
    for (const tag of metadata.tags) {
      if (!this.byTag.has(tag)) {
        this.byTag.set(tag, []);
      }
      this.byTag.get(tag)!.push(modelId);
    }
  }
}

/**
 * Model Benchmarking Service
 */
class ModelBenchmarkService {
  private registry: ModelRegistry;
  private benchmarks: Map<string, BenchmarkResult[]> = new Map();

  constructor(registry: ModelRegistry) {
    this.registry = registry;
  }

  /**
   * Benchmark a model on standard dataset
   */
  async benchmarkModel(
    modelId: string,
    testData: any[],
    metrics: string[] = ['accuracy', 'latency', 'throughput']
  ): Promise<BenchmarkResult> {
    const model = this.registry.getModel(modelId);
    if (!model) {
      throw new Error(`Model not found: ${modelId}`);
    }

    const benchmarkId = this.generateBenchmarkId();

    // Run benchmarks
    const results = await this.runBenchmarks(model, testData, metrics);

    const benchmarkResult: BenchmarkResult = {
      modelId,
      benchmarkId,
      timestamp: new Date(),
      metrics: results,
      environment: {
        gpu: 'NVIDIA RTX 4090',  // Would detect actual hardware
        cpu: 'Intel Core Ultra',
        memory: 32000,
        framework: model.requirements.frameworks[0] || 'unknown'
      }
    };

    // Store result
    if (!this.benchmarks.has(modelId)) {
      this.benchmarks.set(modelId, []);
    }
    this.benchmarks.get(modelId)!.push(benchmarkResult);

    return benchmarkResult;
  }

  /**
   * Compare multiple models
   */
  async compareModels(modelIds: string[]): Promise<Map<string, BenchmarkResult>> {
    const results = new Map<string, BenchmarkResult>();

    for (const modelId of modelIds) {
      const modelBenchmarks = this.benchmarks.get(modelId);
      if (modelBenchmarks && modelBenchmarks.length > 0) {
        // Get most recent benchmark
        results.set(modelId, modelBenchmarks[modelBenchmarks.length - 1]);
      }
    }

    return results;
  }

  /**
   * Get leaderboard for category
   */
  getLeaderboard(category: string, sortBy: 'accuracy' | 'latency' | 'throughput' = 'accuracy'): Array<{
    modelId: string;
    modelName: string;
    score: number;
  }> {
    const models = this.registry.searchModels({ category });
    const leaderboard: Array<{ modelId: string; modelName: string; score: number }> = [];

    for (const model of models) {
      const benchmarks = this.benchmarks.get(model.metadata.modelId);
      if (benchmarks && benchmarks.length > 0) {
        const latest = benchmarks[benchmarks.length - 1];
        let score: number;

        switch (sortBy) {
          case 'accuracy':
            score = latest.metrics.accuracy;
            break;
          case 'latency':
            score = -latest.metrics.latency;  // Lower is better
            break;
          case 'throughput':
            score = latest.metrics.throughput;
            break;
        }

        leaderboard.push({
          modelId: model.metadata.modelId,
          modelName: model.metadata.name,
          score
        });
      }
    }

    // Sort by score
    leaderboard.sort((a, b) => b.score - a.score);

    return leaderboard;
  }

  private async runBenchmarks(
    model: ModelSpec,
    testData: any[],
    metrics: string[]
  ): Promise<{
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    latency: number;
    throughput: number;
  }> {
    // Simulated benchmark results
    // In production, would actually run inference

    const start = Date.now();

    // Simulate inference
    let correct = 0;
    for (const sample of testData) {
      // Simulate prediction
      const predicted = Math.random() > 0.5;
      const actual = sample.label;
      if (predicted === actual) correct++;
    }

    const latency = Date.now() - start;
    const accuracy = correct / testData.length;

    return {
      accuracy,
      precision: accuracy * 0.95,
      recall: accuracy * 0.93,
      f1Score: accuracy * 0.94,
      latency: latency / testData.length,
      throughput: 1000 / latency
    };
  }

  private generateBenchmarkId(): string {
    return `bench-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * A/B Testing Framework
 */
export class ABTestingFramework {
  private registry: ModelRegistry;
  private tests: Map<string, ABTestConfig> = new Map();
  private testResults: Map<string, Map<string, number[]>> = new Map();

  constructor(registry: ModelRegistry) {
    this.registry = registry;
  }

  /**
   * Create new A/B test
   */
  async createTest(config: Omit<ABTestConfig, 'testId' | 'status' | 'metrics'>): Promise<string> {
    const testId = this.generateTestId();

    const test: ABTestConfig = {
      ...config,
      testId,
      status: 'running',
      metrics: []
    };

    this.tests.set(testId, test);
    this.testResults.set(testId, new Map());

    console.log(`Created A/B test: ${testId} - ${config.name}`);

    return testId;
  }

  /**
   * Record prediction result
   */
  async recordResult(
    testId: string,
    model: 'A' | 'B',
    metric: string,
    value: number
  ): Promise<void> {
    const results = this.testResults.get(testId);
    if (!results) return;

    const modelKey = model === 'A' ?
      this.tests.get(testId)!.modelA :
      this.tests.get(testId)!.modelB;

    if (!results.has(modelKey)) {
      results.set(modelKey, []);
    }
    results.get(modelKey)!.push(value);
  }

  /**
   * Analyze test results and determine winner
   */
  async analyzeTest(testId: string): Promise<ABTestConfig> {
    const test = this.tests.get(testId);
    if (!test) {
      throw new Error(`Test not found: ${testId}`);
    }

    const results = this.testResults.get(testId);
    if (!results || results.size === 0) {
      throw new Error(`No results for test: ${testId}`);
    }

    const metrics: ABTestConfig['metrics'] = [];

    // Analyze each metric
    const modelAResults = results.get(test.modelA) || [];
    const modelBResults = results.get(test.modelB) || [];

    const metricNames = new Set([
      ...modelAResults.flatMap(() => ['accuracy', 'latency']),
      ...modelBResults.flatMap(() => ['accuracy', 'latency'])
    ]);

    for (const metricName of metricNames) {
      const valuesA = modelAResults;
      const valuesB = modelBResults;

      const meanA = this.mean(valuesA);
      const meanB = this.mean(valuesB);

      const significance = this.tTest(valuesA, valuesB);

      let winner: 'A' | 'B' | 'tie' | 'inconclusive';

      if (significance < 0.05) {
        // Significant difference
        const betterFor = metricName === 'latency' ?
          (meanA < meanB ? 'A' : 'B') :
          (meanA > meanB ? 'A' : 'B');
        winner = betterFor as 'A' | 'B';
      } else if (Math.abs(meanA - meanB) < 0.01) {
        winner = 'tie';
      } else {
        winner = 'inconclusive';
      }

      metrics.push({
        name: metricName,
        modelAValue: meanA,
        modelBValue: meanB,
        significance,
        winner
      });
    }

    test.metrics = metrics;
    this.tests.set(testId, test);

    return test;
  }

  /**
   * Get test configuration and results
   */
  getTest(testId: string): ABTestConfig | null {
    return this.tests.get(testId) || null;
  }

  /**
   * List all tests
   */
  listTests(): ABTestConfig[] {
    return Array.from(this.tests.values());
  }

  /**
   * Stop test
   */
  async stopTest(testId: string): Promise<boolean> {
    const test = this.tests.get(testId);
    if (!test) return false;

    test.status = 'completed';
    test.endDate = new Date();
    this.tests.set(testId, test);

    return true;
  }

  private mean(values: number[]): number {
    if (values.length === 0) return 0;
    return values.reduce((sum, v) => sum + v, 0) / values.length;
  }

  private tTest(valuesA: number[], valuesB: number[]): number {
    // Simplified t-test for significance
    // Returns p-value

    if (valuesA.length < 2 || valuesB.length < 2) return 1;

    const meanA = this.mean(valuesA);
    const meanB = this.mean(valuesB);

    const varA = valuesA.reduce((sum, v) => sum + (v - meanA) ** 2, 0) / (valuesA.length - 1);
    const varB = valuesB.reduce((sum, v) => sum + (v - meanB) ** 2, 0) / (valuesB.length - 1);

    const pooledSE = Math.sqrt(varA / valuesA.length + varB / valuesB.length);
    const tStatistic = (meanA - meanB) / pooledSE;

    // Simplified p-value (would use t-distribution in production)
    const pValue = 2 * (1 - this.normalCDF(Math.abs(tStatistic)));

    return Math.max(0, Math.min(1, pValue));
  }

  private normalCDF(x: number): number {
    // Approximation of normal CDF
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x) / Math.sqrt(2);

    const t = 1 / (1 + p * x);
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return 0.5 * (1 + sign * y);
  }

  private generateTestId(): string {
    return `test-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Main Marketplace API
 */
export class ModelMarketplace {
  private registry: ModelRegistry;
  private benchmarkService: ModelBenchmarkService;
  private abTesting: ABTestingFramework;

  constructor() {
    this.registry = new ModelRegistry();
    this.benchmarkService = new ModelBenchmarkService(this.registry);
    this.abTesting = new ABTestingFramework(this.registry);
  }

  /**
   * Publish model to marketplace
   */
  async publishModel(model: ModelSpec): Promise<string> {
    // Run benchmarks on published model
    const testData = this.generateTestData();
    await this.benchmarkService.benchmarkModel(model.metadata.modelId, testData);

    // Register in marketplace
    return await this.registry.registerModel(model);
  }

  /**
   * Search for models
   */
  searchModels(query: {
    category?: string;
    author?: string;
    tags?: string[];
    minRating?: number;
    license?: string;
    free?: boolean;
  }): ModelSpec[] {
    return this.registry.searchModels(query);
  }

  /**
   * Download model
   */
  async downloadModel(modelId: string): Promise<ModelSpec | null> {
    const model = this.registry.getModel(modelId);
    if (model) {
      await this.registry.incrementDownloads(modelId);
    }
    return model;
  }

  /**
   * Rate model
   */
  async rateModel(modelId: string, rating: number, userId: string): Promise<boolean> {
    return await this.registry.rateModel(modelId, rating, userId);
  }

  /**
   * Get trending models
   */
  getTrendingModels(limit: number = 10): ModelSpec[] {
    return this.registry.getTrendingModels(limit);
  }

  /**
   * Get leaderboard
   */
  getLeaderboard(category: string, sortBy: 'accuracy' | 'latency' | 'throughput' = 'accuracy'): Array<{
    modelId: string;
    modelName: string;
    score: number;
  }> {
    return this.benchmarkService.getLeaderboard(category, sortBy);
  }

  /**
   * Create A/B test
   */
  async createABTest(config: Omit<ABTestConfig, 'testId' | 'status' | 'metrics'>): Promise<string> {
    return await this.abTesting.createTest(config);
  }

  /**
   * Record A/B test result
   */
  async recordABTestResult(
    testId: string,
    model: 'A' | 'B',
    metric: string,
    value: number
  ): Promise<void> {
    await this.abTesting.recordResult(testId, model, metric, value);
  }

  /**
   * Analyze A/B test
   */
  async analyzeABTest(testId: string): Promise<ABTestConfig> {
    return await this.abTesting.analyzeTest(testId);
  }

  private generateTestData(): any[] {
    // Generate synthetic test data
    return Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      features: Array.from({ length: 10 }, () => Math.random()),
      label: Math.random() > 0.5
    }));
  }

  /**
   * Get marketplace statistics
   */
  getStatistics(): {
    totalModels: number;
    totalDownloads: number;
    modelsByCategory: Record<string, number>;
    averageRating: number;
  } {
    const models = Array.from(
      (this.registry as any).models.values()
    );

    const byCategory: Record<string, number> = {};
    let totalDownloads = 0;
    let totalRating = 0;

    for (const model of models) {
      byCategory[model.metadata.category] =
        (byCategory[model.metadata.category] || 0) + 1;
      totalDownloads += model.metadata.downloads;
      totalRating += model.metadata.rating;
    }

    return {
      totalModels: models.length,
      totalDownloads,
      modelsByCategory: byCategory,
      averageRating: models.length > 0 ? totalRating / models.length : 0
    };
  }
}
