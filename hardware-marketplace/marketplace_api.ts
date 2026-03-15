/**
 * Hardware Marketplace API - Spreadsheet Moment
 * ==============================================
 *
 * Marketplace for hardware acceleration integration.
 *
 * Features:
 * - Hardware catalog and discovery
 * - Vendor onboarding and management
 * - Hardware compatibility verification
 * - Purchase/integration workflows
 * - Performance benchmarking
 * - Driver download and installation
 *
 * Supported Hardware:
 * - NVIDIA GPUs (CUDA)
 * - AMD GPUs (ROCm)
 * - Intel NPUs
 * - Google TPUs (Cloud)
 * - Lucineer Custom Chips
 * - Various NPUs and accelerators
 *
 * Author: SuperInstance Evolution Team
 * Date: 2026-03-14
 * Status: Round 5 Implementation
 */

interface HardwareListing {
  id: string;
  name: string;
  vendor: VendorInfo;
  category: HardwareCategory;
  specifications: HardwareSpecs;
  pricing: PricingInfo;
  compatibility: CompatibilityInfo;
  performance: BenchmarkResults;
  availability: 'available' | 'backorder' | 'discontinued';
  documentation: string;
  drivers: DriverInfo[];
  rating: number;
  reviewCount: number;
}

interface VendorInfo {
  id: string;
  name: string;
  logo: string;
  website: string;
  verified: boolean;
  tier: 'premium' | 'standard' | 'community';
}

interface HardwareCategory {
  type: 'gpu' | 'npu' | 'tpu' | 'fpga' | 'asic' | 'custom';
  useCase: string[];
}

interface HardwareSpecs {
  memory: number; // GB
  bandwidth: number; // GB/s
  compute: number; // TFLOPS
  power: number; // Watts
  interface: 'PCIe' | 'NVLink' | 'Custom';
  formFactor: 'card' | 'module' | 'chip';
  dimensions: { length: number; width: number; height: number }; // mm
}

interface PricingInfo {
  purchasePrice: number;
  rentalPrice?: number; // For cloud
  currency: string;
  includes: string[]; // Drivers, support, etc.
}

interface CompatibilityInfo {
  platforms: ('windows' | 'linux' | 'macos')[];
  minimumRequirements: { cpu: string; ram: number; storage: number };
  supportedSoftware: string[]; // TensorFlow, PyTorch, etc.
  spreadsheetMoment: { version: string; features: string[] };
}

interface BenchmarkResults {
  overallScore: number;
  metrics: {
    operation: string;
    score: number;
    unit: string;
  }[];
}

interface DriverInfo {
  version: string;
  platform: string;
  downloadUrl: string;
  size: number; // MB
  checksum: string;
}

interface MarketplaceQuery {
  category?: HardwareCategory['type'][];
  vendor?: string[];
  priceRange?: [number, number];
  minPerformance?: number;
  platforms?: ('windows' | 'linux' | 'macos')[];
  search?: string;
}

/**
 * Hardware marketplace service
 */
export class HardwareMarketplace {
  private listings: Map<string, HardwareListing> = new Map();
  private vendors: Map<string, VendorInfo> = new Map();
  private purchases: Map<string, HardwarePurchase> = new Map();

  constructor() {
    this.initializeMarketplace();
  }

  /**
   * Initialize marketplace with hardware listings
   */
  private initializeMarketplace(): void {
    // NVIDIA GPUs
    this.addHardware({
      id: 'nvidia-rtx4090',
      name: 'NVIDIA RTX 4090',
      vendor: this.getVendor('nvidia'),
      category: { type: 'gpu', useCase: ['inference', 'training', 'visualization'] },
      specifications: {
        memory: 24,
        bandwidth: 1008,
        compute: 83,
        power: 450,
        interface: 'PCIe',
        formFactor: 'card',
        dimensions: { length: 304, width: 137, height: 50 },
      },
      pricing: { purchasePrice: 1599, currency: 'USD', includes: ['drivers', 'support'] },
      compatibility: {
        platforms: ['windows', 'linux'],
        minimumRequirements: { cpu: 'Intel i7', ram: 32, storage: 50 },
        supportedSoftware: ['TensorFlow', 'PyTorch', 'JAX'],
        spreadsheetMoment: { version: '1.0+', features: ['tensor-ops', 'nlp', 'visualization'] },
      },
      performance: {
        overallScore: 95,
        metrics: [
          { operation: 'matmul', score: 82, unit: 'TFLOPS' },
          { operation: 'memory-bandwidth', score: 1008, unit: 'GB/s' },
          { operation: 'inference', score: 95, unit: 'score' },
        ],
      },
      availability: 'available',
      documentation: 'https://docs.nvidia.com/rtx4090',
      drivers: [
        {
          version: '535.104.05',
          platform: 'linux',
          downloadUrl: 'https://download.nvidia.com/XFree86/Linux-x86_64/535.104.05/',
          size: 350,
          checksum: 'sha256:abc123...',
        },
      ],
      rating: 4.8,
      reviewCount: 1250,
    });

    // AMD GPU
    this.addHardware({
      id: 'amd-mi300x',
      name: 'AMD MI300X',
      vendor: this.getVendor('amd'),
      category: { type: 'gpu', useCase: ['training', 'hpc'] },
      specifications: {
        memory: 192,
        bandwidth: 5300,
        compute: 166,
        power: 750,
        interface: 'PCIe',
        formFactor: 'card',
        dimensions: { length: 267, width: 114, height: 15 },
      },
      pricing: { purchasePrice: 15000, currency: 'USD', includes: ['drivers', 'support', 'rocftware'] },
      compatibility: {
        platforms: ['linux'],
        minimumRequirements: { cpu: 'AMD EPYC', ram: 64, storage: 100 },
        supportedSoftware: ['PyTorch', 'TensorFlow', 'ROCm'],
        spreadsheetMoment: { version: '1.0+', features: ['tensor-ops', 'distributed'] },
      },
      performance: {
        overallScore: 92,
        metrics: [
          { operation: 'matmul', score: 166, unit: 'TFLOPS' },
          { operation: 'memory-bandwidth', score: 5300, unit: 'GB/s' },
          { operation: 'training', score: 90, unit: 'score' },
        ],
      },
      availability: 'available',
      documentation: 'https://www.amd.com/en/products/accelerators/mi300x',
      drivers: [
        {
          version: '6.0.0',
          platform: 'linux',
          downloadUrl: 'https://github.com/RadeonOpenCompute/ROCm/releases',
          size: 500,
          checksum: 'sha256:def456...',
        },
      ],
      rating: 4.6,
      reviewCount: 320,
    });

    // Intel NPU
    this.addHardware({
      id: 'intel-npu-gaudi2',
      name: 'Intel Gaudi 2',
      vendor: this.getVendor('intel'),
      category: { type: 'npu', useCase: ['training', 'inference'] },
      specifications: {
        memory: 96,
        bandwidth: 2500,
        compute: 67,
        power: 600,
        interface: 'PCIe',
        formFactor: 'card',
        dimensions: { length: 267, width: 112, height: 40 },
      },
      pricing: { purchasePrice: 12000, currency: 'USD', includes: ['drivers', 'support'] },
      compatibility: {
        platforms: ['linux'],
        minimumRequirements: { cpu: 'Intel Xeon', ram: 64, storage: 100 },
        supportedSoftware: ['PyTorch', 'TensorFlow', 'Habana'],
        spreadsheetMoment: { version: '1.1+', features: ['tensor-ops', 'training'] },
      },
      performance: {
        overallScore: 88,
        metrics: [
          { operation: 'matmul', score: 67, unit: 'TFLOPS' },
          { operation: 'memory-bandwidth', score: 2500, unit: 'GB/s' },
          { operation: 'training', score: 85, unit: 'score' },
        ],
      },
      availability: 'available',
      documentation: 'https://www.habana.ai/documentation/gaudi2/',
      drivers: [
        {
          version: '1.12.0',
          platform: 'linux',
          downloadUrl: 'https://www.habana.ai/downloads/',
          size: 250,
          checksum: 'sha256:ghi789...',
        },
      ],
      rating: 4.4,
      reviewCount: 180,
    });

    // Lucineer Custom Chips
    this.addHardware({
      id: 'lucineer-m1',
      name: 'Lucineer M1 (Mask-Locked)',
      vendor: this.getVendor('lucineer'),
      category: { type: 'asic', useCase: ['inference', 'edge'] },
      specifications: {
        memory: 4,
        bandwidth: 100,
        compute: 100,
        power: 5,
        interface: 'Custom',
        formFactor: 'module',
        dimensions: { length: 30, width: 20, height: 3 },
      },
      pricing: { purchasePrice: 99, currency: 'USD', includes: ['drivers', 'sdk'] },
      compatibility: {
        platforms: ['windows', 'linux'],
        minimumRequirements: { cpu: 'Any', ram: 8, storage: 1 },
        supportedSoftware: ['Spreadsheet Moment', 'Custom'],
        spreadsheetMoment: { version: '1.0+', features: ['mask-locked', 'ternary-inference'] },
      },
      performance: {
        overallScore: 75,
        metrics: [
          { operation: 'ternary-matmul', score: 100, unit: 'TOPS' },
          { operation: 'energy-efficiency', score: 50, unit: 'TOPS/W' },
          { operation: 'inference', score: 85, unit: 'score' },
        ],
      },
      availability: 'available',
      documentation: 'https://docs.superinstance.ai/lucineer-m1',
      drivers: [
        {
          version: '1.0.0',
          platform: 'linux',
          downloadUrl: 'https://github.com/SuperInstance/lucineer-drivers/releases',
          size: 5,
          checksum: 'sha256:jkl012...',
        },
      ],
      rating: 4.9,
      reviewCount: 45,
    });

    this.addHardware({
      id: 'lucineer-t1',
      name: 'Lucineer T1 (Thermal)',
      vendor: this.getVendor('lucineer'),
      category: { type: 'asic', useCase: ['inference', 'neuromorphic'] },
      specifications: {
        memory: 0.5,
        bandwidth: 10,
        compute: 0.1,
        power: 0.1,
        interface: 'Custom',
        formFactor: 'chip',
        dimensions: { length: 10, width: 10, height: 1 },
      },
      pricing: { purchasePrice: 49, currency: 'USD', includes: ['sdk', 'examples'] },
      compatibility: {
        platforms: ['windows', 'linux'],
        minimumRequirements: { cpu: 'Any', ram: 4, storage: 0.5 },
        supportedSoftware: ['Spreadsheet Moment', 'Custom'],
        spreadsheetMoment: { version: '1.0+', features: ['thermal-computing', 'energy-efficient'] },
      },
      performance: {
        overallScore: 65,
        metrics: [
          { operation: 'thermal-inference', score: 0.1, unit: 'TFLOPS' },
          { operation: 'energy-efficiency', score: 1000, unit: 'TOPS/W' },
          { operation: 'noise-tolerance', score: 90, unit: 'score' },
        ],
      },
      availability: 'available',
      documentation: 'https://docs.superinstance.ai/lucineer-t1',
      drivers: [],
      rating: 4.7,
      reviewCount: 28,
    });

    // Google TPU (Cloud)
    this.addHardware({
      id: 'google-tpuv5',
      name: 'Google TPU v5 Pod',
      vendor: this.getVendor('google'),
      category: { type: 'tpu', useCase: ['training', 'inference'] },
      specifications: {
        memory: 512,
        bandwidth: 4800,
        compute: 275,
        power: 290,
        interface: 'Custom',
        formFactor: 'module',
        dimensions: { length: 100, width: 100, height: 20 },
      },
      pricing: {
        purchasePrice: 0,
        rentalPrice: 4.99,
        currency: 'USD',
        includes: ['cloud-access', 'support', 'maintenance'],
      },
      compatibility: {
        platforms: ['linux'],
        minimumRequirements: { cpu: 'Any', ram: 0, storage: 0 },
        supportedSoftware: ['JAX', 'TensorFlow', 'PyTorch'],
        spreadsheetMoment: { version: '1.0+', features: ['cloud-acceleration', 'distributed'] },
      },
      performance: {
        overallScore: 98,
        metrics: [
          { operation: 'matmul', score: 275, unit: 'TFLOPS' },
          { operation: 'interconnect', score: 4800, unit: 'GB/s' },
          { operation: 'scaling', score: 99, unit: 'efficiency' },
        ],
      },
      availability: 'available',
      documentation: 'https://cloud.google.com/tpu/docs',
      drivers: [],
      rating: 4.9,
      reviewCount: 2500,
    });
  }

  /**
   * Get vendor info
   */
  private getVendor(vendorId: string): VendorInfo {
    const vendors: Record<string, VendorInfo> = {
      nvidia: {
        id: 'nvidia',
        name: 'NVIDIA',
        logo: '/assets/vendors/nvidia.png',
        website: 'https://www.nvidia.com',
        verified: true,
        tier: 'premium',
      },
      amd: {
        id: 'amd',
        name: 'AMD',
        logo: '/assets/vendors/amd.png',
        website: 'https://www.amd.com',
        verified: true,
        tier: 'premium',
      },
      intel: {
        id: 'intel',
        name: 'Intel',
        logo: '/assets/vendors/intel.png',
        website: 'https://www.intel.com',
        verified: true,
        tier: 'premium',
      },
      google: {
        id: 'google',
        name: 'Google',
        logo: '/assets/vendors/google.png',
        website: 'https://cloud.google.com',
        verified: true,
        tier: 'premium',
      },
      lucineer: {
        id: 'lucineer',
        name: 'Lucineer',
        logo: '/assets/vendors/lucineer.png',
        website: 'https://lucineer.superinstance.ai',
        verified: true,
        tier: 'premium',
      },
    };

    return vendors[vendorId] || {
      id: vendorId,
      name: vendorId,
      logo: '',
      website: '',
      verified: false,
      tier: 'community',
    };
  }

  /**
   * Add hardware to marketplace
   */
  private addHardware(listing: HardwareListing): void {
    this.listings.set(listing.id, listing);
    this.vendors.set(listing.vendor.id, listing.vendor);
  }

  /**
   * Search marketplace
   */
  search(query: MarketplaceQuery): HardwareListing[] {
    let results = Array.from(this.listings.values());

    // Filter by category
    if (query.category && query.category.length > 0) {
      results = results.filter((h) => query.category!.includes(h.category.type));
    }

    // Filter by vendor
    if (query.vendor && query.vendor.length > 0) {
      results = results.filter((h) => query.vendor!.includes(h.vendor.id));
    }

    // Filter by price range
    if (query.priceRange) {
      results = results.filter(
        (h) =>
          h.pricing.purchasePrice >= query.priceRange![0] &&
          h.pricing.purchasePrice <= query.priceRange![1]
      );
    }

    // Filter by minimum performance
    if (query.minPerformance) {
      results = results.filter((h) => h.performance.overallScore >= query.minPerformance!);
    }

    // Filter by platform compatibility
    if (query.platforms && query.platforms.length > 0) {
      results = results.filter((h) =>
        query.platforms!.some((p) => h.compatibility.platforms.includes(p))
      );
    }

    // Text search
    if (query.search) {
      const searchLower = query.search.toLowerCase();
      results = results.filter(
        (h) =>
          h.name.toLowerCase().includes(searchLower) ||
          h.vendor.name.toLowerCase().includes(searchLower) ||
          h.category.useCase.some((uc) => uc.toLowerCase().includes(searchLower))
      );
    }

    // Sort by rating
    results.sort((a, b) => b.rating - a.rating);

    return results;
  }

  /**
   * Get hardware by ID
   */
  getHardware(id: string): HardwareListing | undefined {
    return this.listings.get(id);
  }

  /**
   * Verify hardware compatibility
   */
  verifyCompatibility(hardwareId: string, systemSpec: SystemSpec): CompatibilityReport {
    const hardware = this.listings.get(hardwareId);
    if (!hardware) {
      return { compatible: false, issues: ['Hardware not found'] };
    }

    const issues: string[] = [];

    // Check platform compatibility
    if (!hardware.compatibility.platforms.includes(systemSpec.platform)) {
      issues.push(`Platform ${systemSpec.platform} not supported`);
    }

    // Check minimum requirements
    const minReq = hardware.compatibility.minimumRequirements;
    if (systemSpec.ram < minReq.ram) {
      issues.push(`Insufficient RAM: have ${systemSpec.ram}GB, need ${minReq.ram}GB`);
    }
    if (systemSpec.storage < minReq.storage) {
      issues.push(`Insufficient storage: have ${systemSpec.storage}GB, need ${minReq.storage}GB`);
    }

    // Check Spreadsheet Moment version
    const smVersion = systemSpec.spreadsheetMomentVersion;
    if (!smVersion.startsWith('1')) {
      issues.push(`Spreadsheet Moment version ${smVersion} not supported (requires 1.0+)`);
    }

    return {
      compatible: issues.length === 0,
      issues,
      features: hardware.compatibility.spreadsheetMoment.features,
      drivers: hardware.drivers,
    };
  }

  /**
   * Purchase hardware
   */
  purchaseHardware(hardwareId: string, buyer: BuyerInfo): PurchaseResult {
    const hardware = this.listings.get(hardwareId);
    if (!hardware) {
      return { success: false, error: 'Hardware not found' };
    }

    if (hardware.availability === 'discontinued') {
      return { success: false, error: 'Hardware discontinued' };
    }

    // Create purchase order
    const purchase: HardwarePurchase = {
      id: `purchase-${Date.now()}`,
      hardwareId,
      buyer,
      status: 'pending',
      createdAt: Date.now(),
    };

    this.purchases.set(purchase.id, purchase);

    // In production, would integrate with payment processor
    return {
      success: true,
      purchaseId: purchase.id,
      estimatedDelivery: this.estimateDelivery(hardware),
      downloadUrl: hardware.pricing.rentalPrice ? undefined : this.generateDownloadUrl(hardwareId),
    };
  }

  /**
   * Get purchase status
   */
  getPurchaseStatus(purchaseId: string): HardwarePurchase | undefined {
    return this.purchases.get(purchaseId);
  }

  /**
   * Download driver
   */
  downloadDriver(hardwareId: string, platform: string): DriverDownload {
    const hardware = this.listings.get(hardwareId);
    if (!hardware) {
      throw new Error('Hardware not found');
    }

    const driver = hardware.drivers.find((d) => d.platform === platform);
    if (!driver) {
      throw new Error(`No driver available for platform: ${platform}`);
    }

    return {
      driver,
      downloadUrl: driver.downloadUrl,
      instructions: this.generateInstallInstructions(hardware, driver),
    };
  }

  /**
   * Benchmark hardware
   */
  async benchmarkHardware(hardwareId: string): Promise<BenchmarkResults> {
    const hardware = this.listings.get(hardwareId);
    if (!hardware) {
      throw new Error('Hardware not found');
    }

    // In production, would run actual benchmarks
    // For now, return cached results
    return hardware.performance;
  }

  /**
   * Get vendor info
   */
  getVendorInfo(vendorId: string): VendorInfo | undefined {
    return this.vendors.get(vendorId);
  }

  /**
   * List all vendors
   */
  listVendors(): VendorInfo[] {
    return Array.from(this.vendors.values());
  }

  // Helper methods

  private estimateDelivery(hardware: HardwareListing): string {
    if (hardware.availability === 'available') {
      return '2-3 business days';
    } else if (hardware.availability === 'backorder') {
      return '2-4 weeks';
    }
    return 'Contact support';
  }

  private generateDownloadUrl(hardwareId: string): string {
    return `https://marketplace.superinstance.ai/download/${hardwareId}`;
  }

  private generateInstallInstructions(hardware: HardwareListing, driver: DriverInfo): string[] {
    return [
      `1. Download the driver package (${driver.size}MB)`,
      '2. Verify the checksum: ' + driver.checksum,
      '3. Install the package according to platform instructions',
      '4. Restart Spreadsheet Moment',
      '5. Hardware will be automatically detected',
      '6. Run benchmark to verify installation',
    ];
  }
}

// Type definitions
interface SystemSpec {
  platform: 'windows' | 'linux' | 'macos';
  cpu: string;
  ram: number; // GB
  storage: number; // GB
  spreadsheetMomentVersion: string;
}

interface CompatibilityReport {
  compatible: boolean;
  issues: string[];
  features?: string[];
  drivers?: DriverInfo[];
}

interface BuyerInfo {
  name: string;
  email: string;
  address?: string;
  organization?: string;
}

interface HardwarePurchase {
  id: string;
  hardwareId: string;
  buyer: BuyerInfo;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: number;
  shippedAt?: number;
  deliveredAt?: number;
}

interface PurchaseResult {
  success: boolean;
  purchaseId?: string;
  error?: string;
  estimatedDelivery?: string;
  downloadUrl?: string;
}

interface DriverDownload {
  driver: DriverInfo;
  downloadUrl: string;
  instructions: string[];
}

// Global instance
let marketplaceInstance: HardwareMarketplace | null = null;

export function getHardwareMarketplace(): HardwareMarketplace {
  if (!marketplaceInstance) {
    marketplaceInstance = new HardwareMarketplace();
  }
  return marketplaceInstance;
}

/**
 * Cloudflare Worker export for marketplace API
 */
export interface Env {
  MARKETPLACE_ENABLED?: boolean;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (!env.MARKETPLACE_ENABLED) {
      return new Response(
        JSON.stringify({ error: 'Hardware marketplace not enabled' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const url = new URL(request.url);
    const marketplace = getHardwareMarketplace();

    try {
      // Route handling
      if (url.pathname === '/search') {
        const query = await request.json() as MarketplaceQuery;
        const results = marketplace.search(query);
        return new Response(JSON.stringify(results), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (url.pathname.startsWith('/hardware/')) {
        const hardwareId = url.pathname.split('/')[2];
        const hardware = marketplace.getHardware(hardwareId);

        if (!hardware) {
          return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(hardware), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (url.pathname === '/verify' && request.method === 'POST') {
        const { hardwareId, systemSpec } = await request.json();
        const report = marketplace.verifyCompatibility(hardwareId, systemSpec);
        return new Response(JSON.stringify(report), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (url.pathname === '/purchase' && request.method === 'POST') {
        const { hardwareId, buyer } = await request.json();
        const result = marketplace.purchaseHardware(hardwareId, buyer);
        return new Response(JSON.stringify(result), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (url.pathname === '/drivers' && request.method === 'POST') {
        const { hardwareId, platform } = await request.json();
        const download = marketplace.downloadDriver(hardwareId, platform);
        return new Response(JSON.stringify(download), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  },
};
