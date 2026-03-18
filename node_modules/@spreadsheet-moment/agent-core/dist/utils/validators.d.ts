/**
 * Agent Cell Validators
 *
 * Utility functions for validating agent cells:
 * - Type checking for agent cells
 * - State validation
 * - Configuration validation
 * - Data integrity checks
 *
 * @packageDocumentation
 */
import { IAgentCellData, AgentCellType, AgentCellState, IAgentConfig } from '../index';
/**
 * Validation error
 */
export declare class ValidationError extends Error {
    readonly field?: string | undefined;
    readonly code?: string | undefined;
    constructor(message: string, field?: string | undefined, code?: string | undefined);
}
/**
 * Validation result
 */
export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
    warnings: string[];
}
/**
 * Check if a value is an agent cell
 */
export declare function isAgentCell(value: any): value is IAgentCellData;
/**
 * Check if agent cell is of a specific type
 */
export declare function isAgentCellType(cellData: IAgentCellData, type: AgentCellType): boolean;
/**
 * Check if agent cell is in a specific state
 */
export declare function isAgentCellState(cellData: IAgentCellData, state: AgentCellState): boolean;
/**
 * Validate agent cell data
 */
export declare function validateAgentCell(cellData: IAgentCellData): ValidationResult;
/**
 * Validate agent configuration
 */
export declare function validateAgentConfig(config: IAgentConfig): ValidationError[];
/**
 * Get agent cell type display name
 */
export declare function getAgentCellTypeName(type: AgentCellType): string;
/**
 * Get agent cell state display name
 */
export declare function getAgentCellStateName(state: AgentCellState): string;
/**
 * Check if agent cell is active (not dormant or archived)
 */
export declare function isAgentCellActive(cellData: IAgentCellData): boolean;
/**
 * Check if agent cell can be activated
 */
export declare function canActivateAgentCell(cellData: IAgentCellData): boolean;
/**
 * Get agent cell color based on state
 */
export declare function getAgentCellStateColor(state: AgentCellState): string;
//# sourceMappingURL=validators.d.ts.map