/**
 * Univer Plugin: Agent Core
 *
 * Integrates SpreadsheetMoment's agentic capabilities with Univer:
 * - Trace Protocol for recursive loop detection
 * - Agent Cell Model extensions
 * - State Manager integration
 * - Dependency injection setup
 *
 * @packageDocumentation
 */
import { Plugin, Injector, IUniverInstanceService, ICommandService } from '@univerjs/core';
/**
 * Agent Core Plugin Configuration
 */
export interface IAgentCorePluginConfig {
    /** Enable trace protocol (default: true) */
    enableTrace?: boolean;
    /** Enable state management (default: true) */
    enableStateManagement?: boolean;
    /** Enable agent handshake (default: true) */
    enableHandshake?: boolean;
    /** Maximum trace history (default: 1000) */
    maxTraceHistory?: number;
    /** Trace cleanup interval in milliseconds (default: 3600000 = 1 hour) */
    traceCleanupInterval?: number;
}
/**
 * Service token for Trace Protocol
 */
export declare const ITraceProtocol: unique symbol;
/**
 * Service token for State Manager
 */
export declare const IStateManager: unique symbol;
/**
 * Service token for Agent Handshake Protocol
 */
export declare const IAgentHandshakeProtocol: unique symbol;
/**
 * Agent Core Plugin
 *
 * Main plugin that integrates all agentic functionality with Univer
 */
export declare class AgentCorePlugin extends Plugin {
    private readonly _univerInstanceService;
    private readonly _commandService;
    private readonly _injector;
    private _traceProtocol?;
    private _stateManager?;
    private _handshakeProtocol?;
    constructor(config: IAgentCorePluginConfig | undefined, _univerInstanceService: IUniverInstanceService, _commandService: ICommandService, _injector: Injector);
    /**
     * Initialize plugin services
     */
    onStarting(): void;
    /**
     * Register command interceptors
     */
    onRendered(): void;
    /**
     * Handle cell operation with trace protocol
     */
    private _handleCellOperation;
    /**
     * Extract agent data from cell
     */
    private _extractAgentData;
    /**
     * Update agent cell in model
     */
    private _updateAgentCell;
    /**
     * Clean up on disposal
     */
    dispose(): void;
}
/**
 * Factory function to create the plugin with config
 */
export declare function createAgentCorePlugin(config?: IAgentCorePluginConfig): AgentCorePlugin;
//# sourceMappingURL=AgentCorePlugin.d.ts.map