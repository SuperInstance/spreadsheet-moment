/**
 * Agent Cell Service
 *
 * Service layer for managing agent cells within Univer:
 * - Create and update agent cells
 * - Integrate with Univer's cell model
 * - Handle agent-specific operations
 *
 * @packageDocumentation
 */
import { IAgentCellData, AgentCellType, IAgentConfig } from '../index';
/**
 * Agent Cell Creation Options
 */
export interface ICreateAgentCellOptions {
    /** Type of agent cell to create */
    cellType: AgentCellType;
    /** Initial value (optional) */
    value?: string | number;
    /** Formula (optional) */
    formula?: string;
    /** AI provider to use */
    provider?: 'cloudflare' | 'deepseek' | 'openai' | 'anthropic';
    /** Maximum reasoning steps */
    maxReasoningSteps?: number;
    /** Timeout in milliseconds */
    timeout?: number;
    /** Whether to enable agent handshake */
    enableHandshake?: boolean;
    /** Initial configuration */
    config?: IAgentConfig;
}
/**
 * Agent Cell Service
 *
 * Provides methods to create, update, and manage agent cells
 */
export declare class AgentCellService {
    private readonly _traceProtocol;
    private readonly _stateManager;
    private readonly _handshakeProtocol;
    constructor(_traceProtocol: any, _stateManager: any, _handshakeProtocol: any);
    /**
     * Create a new agent cell
     */
    createAgentCell(options: ICreateAgentCellOptions): IAgentCellData;
    /**
     * Activate an agent cell (start processing)
     */
    activateAgentCell(cellData: IAgentCellData): IAgentCellData;
    /**
     * Update agent cell with reasoning step
     */
    addReasoningStep(cellData: IAgentCellData, step: string): IAgentCellData;
    /**
     * Add to agent cell memory
     */
    addToMemory(cellData: IAgentCellData, memory: string): IAgentCellData;
    /**
     * Mark agent cell as needing review
     */
    requestReview(cellData: IAgentCellData): IAgentCellData;
    /**
     * Approve agent cell action
     */
    approve(cellData: IAgentCellData): IAgentCellData;
    /**
     * Reject agent cell action
     */
    reject(cellData: IAgentCellData): IAgentCellData;
    /**
     * Reset agent cell to dormant state
     */
    reset(cellData: IAgentCellData): IAgentCellData;
    /**
     * Check if cell value is from another agent
     */
    isAgentGenerated(value: any): boolean;
    /**
     * Get agent confidence score for value
     */
    getAgentConfidence(value: any): number;
    /**
     * Validate agent cell data
     */
    validateAgentCell(cellData: IAgentCellData): {
        valid: boolean;
        errors: string[];
    };
    /**
     * Generate unique origin ID for agent cell
     */
    private _generateOriginId;
}
export default AgentCellService;
//# sourceMappingURL=AgentCellService.d.ts.map