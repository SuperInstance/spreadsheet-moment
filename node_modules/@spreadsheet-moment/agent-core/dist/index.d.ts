/**
 * SpreadsheetMoment Agent Core Package
 *
 * This package provides the core agentic functionality for SpreadsheetMoment:
 * - Agent Cell Model: Extended cell data structure with agentic properties
 * - Agent Cell Types: SENSOR, ANALYZER, CONTROLLER, ORCHESTRATOR
 * - Agent Cell States: DORMANT, THINKING, NEEDS_REVIEW, POSTED, ARCHIVED, ERROR
 * - Trace Protocol: Recursive loop detection and prevention
 * - State Manager: State transition logic and validation
 * - Claw API: Production-ready Claw API integration
 * - Monitoring: Comprehensive metrics and health checking
 *
 * @packageDocumentation
 */
/**
 * Agent cell types determine the behavior and purpose of each agent cell
 */
export declare enum AgentCellType {
    /** SENSOR cells observe and collect data from other cells or external sources */
    SENSOR = "SENSOR",
    /** ANALYZER cells process data and generate insights */
    ANALYZER = "ANALYZER",
    /** CONTROLLER cells take actions and modify other cells */
    CONTROLLER = "CONTROLLER",
    /** ORCHESTRATOR cells coordinate multiple agents and manage complex workflows */
    ORCHESTRATOR = "ORCHESTRATOR"
}
/**
 * Agent cell states track the lifecycle and status of agent operations
 */
export declare enum AgentCellState {
    /** Cell is dormant and awaiting activation */
    DORMANT = "DORMANT",
    /** Cell is actively processing and reasoning */
    THINKING = "THINKING",
    /** Cell has completed reasoning and awaits human approval */
    NEEDS_REVIEW = "NEEDS_REVIEW",
    /** Cell's action has been approved and executed */
    POSTED = "POSTED",
    /** Cell is archived and no longer active */
    ARCHIVED = "ARCHIVED",
    /** Cell encountered an error during execution */
    ERROR = "ERROR"
}
/**
 * Extended cell data interface for agent cells
 * Builds upon Univer's ICellData with agentic properties
 */
export interface IAgentCellData {
    v?: string | number;
    f?: string;
    s?: any;
    /** Unique origin identifier for Origin-Centric Design */
    origin_id?: string;
    /** Current trace ID for operation tracking */
    trace_id?: string;
    /** Type of agent cell */
    cell_type?: AgentCellType;
    /** Current state of the agent */
    state?: AgentCellState;
    /** Step-by-step reasoning history */
    reasoning?: string[];
    /** Persistent memory for learning and context */
    memory?: string[];
    /** Whether this action requires human approval before execution */
    requires_approval?: boolean;
    /** Agent-specific configuration */
    config?: IAgentConfig;
    /** Error message if state is ERROR */
    error?: string;
    /** Timestamp of last state change */
    updated_at?: number;
}
/**
 * Agent configuration interface
 */
export interface IAgentConfig {
    /** AI provider to use for this agent */
    provider?: 'cloudflare' | 'deepseek' | 'openai' | 'anthropic';
    /** Maximum reasoning steps allowed */
    max_reasoning_steps?: number;
    /** Timeout in milliseconds */
    timeout?: number;
    /** Additional provider-specific options */
    options?: Record<string, any>;
    /** Whether this agent participates in agent handshaking */
    enable_handshake?: boolean;
}
/**
 * Trace Protocol for recursive loop detection and prevention
 *
 * Implements Origin-Centric Design by tracking operation paths
 * from their origin and detecting when we revisit a cell.
 */
export declare class TraceProtocol {
    private _traces;
    private _cleanup_interval;
    private _cleanup_timer;
    constructor();
    /**
     * Generate a new trace ID for an operation
     * @param originId - The origin cell identifier
     * @returns Unique trace ID
     */
    generate(originId: string): string;
    /**
     * Check for collision (recursive loop) at current cell
     * @param traceId - The trace ID to check
     * @param currentCell - Current cell identifier
     * @returns true if collision detected (recursive loop found)
     */
    checkCollision(traceId: string, currentCell: string): boolean;
    /**
     * Get the path for a trace
     * @param traceId - The trace ID
     * @returns Array of cell identifiers in the path
     */
    getPath(traceId: string): string[];
    /**
     * Complete a trace and mark it for cleanup
     * @param traceId - The trace ID to complete
     */
    complete(traceId: string): void;
    /**
     * Clean up old traces
     */
    private cleanup;
    /**
     * Start periodic cleanup
     */
    private startCleanup;
    /**
     * Stop cleanup timer and clear all traces
     */
    dispose(): void;
    /**
     * Get current trace statistics
     */
    getStats(): {
        active: number;
        totalPaths: number;
    };
}
/**
 * State Manager for agent cell state transitions
 *
 * Validates and executes state transitions according to business rules
 */
export declare class StateManager {
    /**
     * Check if a state transition is valid
     * @param from - Current state
     * @param to - Target state
     * @returns true if transition is allowed
     */
    canTransition(from: AgentCellState, to: AgentCellState): boolean;
    /**
     * Execute a state transition
     * @param cellData - Agent cell data
     * @param newState - Target state
     * @param error - Optional error message if transitioning to ERROR state
     * @returns Updated cell data
     * @throws Error if transition is invalid
     */
    transition(cellData: IAgentCellData, newState: AgentCellState, error?: string): IAgentCellData;
    /**
     * Reset a cell to DORMANT state
     * @param cellData - Agent cell data
     * @returns Updated cell data
     */
    reset(cellData: IAgentCellData): IAgentCellData;
    /**
     * Mark a cell as requiring review
     * @param cellData - Agent cell data
     * @returns Updated cell data
     */
    requestReview(cellData: IAgentCellData): IAgentCellData;
    /**
     * Approve and post a cell's action
     * @param cellData - Agent cell data
     * @returns Updated cell data
     */
    approve(cellData: IAgentCellData): IAgentCellData;
    /**
     * Reject a cell's action and return to thinking
     * @param cellData - Agent cell data
     * @returns Updated cell data
     */
    reject(cellData: IAgentCellData): IAgentCellData;
}
/**
 * Agent Handshake Protocol for bot-to-bot interaction detection
 *
 * Detects when agents are interacting with other agents to prevent
 * recursive bot conversations and filter out bot-generated content.
 */
export declare class AgentHandshakeProtocol {
    private readonly _agentSignature;
    private readonly _agentMetadata;
    /**
     * Check if data contains agent signature
     * @param data - Data to check
     * @returns true if data appears to be from another agent
     */
    isAgentGenerated(data: any): boolean;
    /**
     * Calculate confidence score for agent detection
     * @param data - Data to analyze
     * @returns Confidence score (0-1)
     */
    getAgentConfidence(data: any): number;
    /**
     * Add agent signature to data
     * @param data - Data to sign
     * @param originId - Origin identifier
     * @returns Signed data
     */
    signAsAgent(data: any, originId: string): any;
    /**
     * Check if data looks like agent-generated JSON
     * @param data - Data to check
     * @returns true if data has agent-like characteristics
     */
    private _looksLikeAgentJSON;
}
export { AgentCorePlugin, createAgentCorePlugin, ITraceProtocol, IStateManager, IAgentHandshakeProtocol, } from './plugins/AgentCorePlugin';
export type { IAgentCorePluginConfig, } from './plugins/AgentCorePlugin';
export { AgentCellService, } from './services/AgentCellService';
export type { ICreateAgentCellOptions, } from './services/AgentCellService';
export { isAgentCell, isAgentCellType, isAgentCellState, validateAgentCell, validateAgentConfig, getAgentCellTypeName, getAgentCellStateName, isAgentCellActive, canActivateAgentCell, getAgentCellStateColor, } from './utils/validators';
export { ValidationError, } from './utils/validators';
export type { ValidationResult, } from './utils/validators';
export { ClawState, ClawType, ModelProvider, EquipmentSlot, RelationshipType, TriggerType, LearningStrategy, WebSocketMessageType, ClawErrorCode, ClawCellConfig, TriggerCondition, Relationship, ReasoningStep, ClawAction, ClawStateInfo, WebSocketMessage, SubscribePayload, ReasoningStepPayload, ApprovalRequiredPayload, CreateClawRequest, CreateClawResponse, QueryClawRequest, QueryClawResponse, TriggerClawRequest, TriggerClawResponse, CancelClawRequest, CancelClawResponse, ApproveClawRequest, ApproveClawResponse, ClawClientConfig, ClawCellConfigSchema, WebSocketMessageSchema, CreateClawRequestSchema, TriggerClawRequestSchema, ApproveClawRequestSchema, QueryClawRequestSchema, CancelClawRequestSchema, ClawAPIError, isClawCellConfig, isWebSocketMessage, isClawAPIError, ClawClient, createClawClient, } from './api';
export { MetricsCollector, MetricType, MetricCategory, getMetricsCollector, resetMetricsCollector } from './monitoring';
export { HealthChecker, HealthStatus, HealthCheckResult, CheckResult, HealthCheckConfig, HTTPHealthCheckConfig, WebSocketHealthCheckConfig, ResourceThresholds, getHealthChecker, resetHealthChecker } from './monitoring';
export type { Metric, CounterMetric, GaugeMetric, HistogramMetric, SummaryMetric } from './monitoring';
export { MonitoringMiddleware, createMonitoringMiddleware, getMonitoringMiddleware, resetMonitoringMiddleware } from './middleware';
export type { RequestMetadata, ResponseMetadata, ErrorMetadata, MonitoringMiddlewareConfig } from './middleware';
export { PerformanceMonitor, CellUpdateOptimizer, createPerformanceMonitor, getPerformanceMonitor, resetPerformanceMonitor, createCellUpdateOptimizer, getCellUpdateOptimizer, resetCellUpdateOptimizer } from './performance';
export type { PerformanceMetrics, PerformanceReport, CellUpdateMetrics, PerformanceIssue, OptimizationRecommendation, PerformanceThresholds, OptimizationStrategy } from './performance';
export { measurePerformance, createPerformanceMarker, withPerformanceMonitoring, formatDuration, formatBytes, calculatePerformanceScore, getPerformanceGrade, debounce, throttle, memoize, rafThrottle, whenIdle, createMicrotask } from './performance';
declare const _default: {
    AgentCellType: typeof AgentCellType;
    AgentCellState: typeof AgentCellState;
    IAgentCellData: any;
    IAgentConfig: any;
    TraceProtocol: typeof TraceProtocol;
    StateManager: typeof StateManager;
    AgentHandshakeProtocol: typeof AgentHandshakeProtocol;
    AgentCorePlugin: any;
    AgentCellService: any;
    ValidationError: any;
    validators: {
        isAgentCell: any;
        isAgentCellType: any;
        isAgentCellState: any;
        validateAgentCell: any;
        validateAgentConfig: any;
        getAgentCellTypeName: any;
        getAgentCellStateName: any;
        isAgentCellActive: any;
        canActivateAgentCell: any;
        getAgentCellStateColor: any;
    };
    ClawClient: any;
    ClawAPIError: any;
    MetricsCollector: any;
    HealthChecker: any;
    MonitoringMiddleware: any;
    PerformanceMonitor: any;
    CellUpdateOptimizer: any;
};
export default _default;
//# sourceMappingURL=index.d.ts.map