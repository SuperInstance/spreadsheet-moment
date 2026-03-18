/**
 * Claw API Type Definitions
 *
 * Production-ready type definitions for Claw API integration with
 * comprehensive validation using Zod schemas.
 *
 * @packageDocumentation
 */
import { z } from 'zod';
/**
 * Claw agent states matching the Claw engine specification
 */
export declare enum ClawState {
    DORMANT = "DORMANT",
    THINKING = "THINKING",
    NEEDS_REVIEW = "NEEDS_REVIEW",
    POSTED = "POSTED",
    ARCHIVED = "ARCHIVED",
    ERROR = "ERROR"
}
/**
 * Claw agent types matching the Claw engine specification
 */
export declare enum ClawType {
    SENSOR = "SENSOR",
    ANALYZER = "ANALYZER",
    CONTROLLER = "CONTROLLER",
    ORCHESTRATOR = "ORCHESTRATOR"
}
/**
 * Model providers supported by Claw
 */
export declare enum ModelProvider {
    OPENAI = "openai",
    ANTHROPIC = "anthropic",
    DEEPSEEK = "deepseek",
    CLOUDFLARE = "cloudflare"
}
/**
 * Equipment slots available for Claw agents
 */
export declare enum EquipmentSlot {
    MEMORY = "MEMORY",
    REASONING = "REASONING",
    LEARNING = "LEARNING",
    PERCEPTION = "PERCEPTION",
    ACTION = "ACTION",
    COMMUNICATION = "COMMUNICATION"
}
/**
 * Relationship types between Claw agents
 */
export declare enum RelationshipType {
    SLAVE = "slave",
    COWORKER = "coworker",
    PEER = "peer",
    DELEGATE = "delegate",
    OBSERVER = "observer"
}
/**
 * Trigger condition types
 */
export declare enum TriggerType {
    CELL_CHANGE = "cell_change",
    FORMULA = "formula",
    TIME = "time",
    EXTERNAL = "external",
    MANUAL = "manual"
}
/**
 * Learning strategies for Claw agents
 */
export declare enum LearningStrategy {
    REINFORCEMENT = "reinforcement",
    SUPERVISED = "supervised",
    UNSUPERVISED = "unsupervised"
}
/**
 * WebSocket message types for Claw communication
 */
export declare enum WebSocketMessageType {
    SUBSCRIBE = "subscribe",
    UNSUBSCRIBE = "unsubscribe",
    TRIGGER = "trigger",
    APPROVE = "approve",
    REJECT = "reject",
    CANCEL = "cancel",
    QUERY = "query",
    CELL_UPDATE = "cell_update",
    REASONING_STEP = "reasoning_step",
    STATE_CHANGE = "state_change",
    APPROVAL_REQUIRED = "approval_required",
    ACTION_COMPLETED = "action_completed",
    ERROR = "error",
    CONNECTED = "connected",
    DISCONNECTED = "disconnected"
}
/**
 * Claw cell configuration
 */
export interface ClawCellConfig {
    /** Unique identifier for the claw */
    id: string;
    /** Type of claw agent */
    type: ClawType;
    /** Position in spreadsheet [row, col] */
    position: [number, number];
    /** Model configuration */
    model: {
        provider: ModelProvider;
        model: string;
        apiKey?: string;
        baseUrl?: string;
    };
    /** Seed configuration for learning */
    seed: {
        purpose: string;
        trigger: TriggerCondition;
        learningStrategy: LearningStrategy;
    };
    /** Equipment slots */
    equipment: EquipmentSlot[];
    /** Relationships to other claws */
    relationships: Relationship[];
    /** Current state */
    state: ClawState;
    /** Confidence level (0-1) */
    confidence: number;
    /** Maximum reasoning steps */
    maxReasoningSteps?: number;
    /** Timeout in milliseconds */
    timeout?: number;
    /** Whether to enable agent handshake */
    enableHandshake?: boolean;
}
/**
 * Trigger condition for claw activation
 */
export interface TriggerCondition {
    type: TriggerType;
    cellId?: string;
    threshold?: number;
    interval?: number;
    expression?: string;
    cronExpression?: string;
}
/**
 * Relationship between claws
 */
export interface Relationship {
    type: RelationshipType;
    targetCell: string;
    strategy?: 'PARALLEL' | 'SEQUENTIAL' | 'CONSENSUS';
    bidirectional?: boolean;
}
/**
 * Reasoning step from claw processing
 */
export interface ReasoningStep {
    stepNumber: number;
    content: string;
    timestamp: number;
    confidence: number;
    metadata?: Record<string, any>;
}
/**
 * Claw action result
 */
export interface ClawAction {
    type: 'update_cell' | 'send_message' | 'trigger_claw' | 'custom';
    target?: string;
    data: any;
    confidence: number;
}
/**
 * Claw state information
 */
export interface ClawStateInfo {
    clawId: string;
    state: ClawState;
    reasoning: ReasoningStep[];
    memory: string[];
    confidence: number;
    error?: string;
    lastUpdated: number;
}
/**
 * WebSocket message base interface
 */
export interface WebSocketMessage {
    type: WebSocketMessageType;
    traceId: string;
    timestamp: number;
    payload: any;
}
/**
 * Subscribe message payload
 */
export interface SubscribePayload {
    cellId: string;
    sheetId: string;
    clawId?: string;
}
/**
 * Reasoning step message payload
 */
export interface ReasoningStepPayload {
    clawId: string;
    cellId: string;
    step: ReasoningStep;
    isFinal: boolean;
}
/**
 * Approval required payload
 */
export interface ApprovalRequiredPayload {
    clawId: string;
    cellId: string;
    traceId: string;
    action: ClawAction;
    reasoning: string;
    confidence: number;
    timeout: number;
}
/**
 * Claw creation request
 */
export interface CreateClawRequest {
    config: ClawCellConfig;
    context?: {
        sheetId: string;
        userId?: string;
        sessionId?: string;
    };
}
/**
 * Claw creation response
 */
export interface CreateClawResponse {
    clawId: string;
    status: 'created' | 'pending' | 'error';
    message?: string;
    config: ClawCellConfig;
}
/**
 * Claw query request
 */
export interface QueryClawRequest {
    clawId: string;
    includeReasoning?: boolean;
    includeMemory?: boolean;
    includeRelationships?: boolean;
}
/**
 * Claw query response
 */
export interface QueryClawResponse {
    clawId: string;
    state: ClawStateInfo;
    reasoning?: ReasoningStep[];
    memory?: string[];
    relationships?: Relationship[];
    exists: boolean;
}
/**
 * Claw trigger request
 */
export interface TriggerClawRequest {
    clawId: string;
    data?: any;
    traceId?: string;
    force?: boolean;
}
/**
 * Claw trigger response
 */
export interface TriggerClawResponse {
    clawId: string;
    traceId: string;
    status: 'triggered' | 'already_running' | 'error';
    message?: string;
}
/**
 * Claw cancel request
 */
export interface CancelClawRequest {
    clawId: string;
    reason?: string;
}
/**
 * Claw cancel response
 */
export interface CancelClawResponse {
    clawId: string;
    status: 'cancelled' | 'not_running' | 'error';
    message?: string;
}
/**
 * Claw approval request
 */
export interface ApproveClawRequest {
    clawId: string;
    traceId: string;
    approved: boolean;
    reason?: string;
}
/**
 * Claw approval response
 */
export interface ApproveClawResponse {
    clawId: string;
    traceId: string;
    status: 'approved' | 'rejected' | 'not_found' | 'error';
    message?: string;
}
/**
 * Zod schema for ClawCellConfig
 */
export declare const ClawCellConfigSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodNativeEnum<typeof ClawType>;
    position: z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>;
    model: z.ZodObject<{
        provider: z.ZodNativeEnum<typeof ModelProvider>;
        model: z.ZodString;
        apiKey: z.ZodOptional<z.ZodString>;
        baseUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        model: string;
        provider: ModelProvider;
        baseUrl?: string | undefined;
        apiKey?: string | undefined;
    }, {
        model: string;
        provider: ModelProvider;
        baseUrl?: string | undefined;
        apiKey?: string | undefined;
    }>;
    seed: z.ZodObject<{
        purpose: z.ZodString;
        trigger: z.ZodObject<{
            type: z.ZodNativeEnum<typeof TriggerType>;
            cellId: z.ZodOptional<z.ZodString>;
            threshold: z.ZodOptional<z.ZodNumber>;
            interval: z.ZodOptional<z.ZodNumber>;
            expression: z.ZodOptional<z.ZodString>;
            cronExpression: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: TriggerType;
            cellId?: string | undefined;
            threshold?: number | undefined;
            interval?: number | undefined;
            expression?: string | undefined;
            cronExpression?: string | undefined;
        }, {
            type: TriggerType;
            cellId?: string | undefined;
            threshold?: number | undefined;
            interval?: number | undefined;
            expression?: string | undefined;
            cronExpression?: string | undefined;
        }>;
        learningStrategy: z.ZodNativeEnum<typeof LearningStrategy>;
    }, "strip", z.ZodTypeAny, {
        purpose: string;
        trigger: {
            type: TriggerType;
            cellId?: string | undefined;
            threshold?: number | undefined;
            interval?: number | undefined;
            expression?: string | undefined;
            cronExpression?: string | undefined;
        };
        learningStrategy: LearningStrategy;
    }, {
        purpose: string;
        trigger: {
            type: TriggerType;
            cellId?: string | undefined;
            threshold?: number | undefined;
            interval?: number | undefined;
            expression?: string | undefined;
            cronExpression?: string | undefined;
        };
        learningStrategy: LearningStrategy;
    }>;
    equipment: z.ZodArray<z.ZodNativeEnum<typeof EquipmentSlot>, "many">;
    relationships: z.ZodArray<z.ZodObject<{
        type: z.ZodNativeEnum<typeof RelationshipType>;
        targetCell: z.ZodString;
        strategy: z.ZodOptional<z.ZodEnum<["PARALLEL", "SEQUENTIAL", "CONSENSUS"]>>;
        bidirectional: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: RelationshipType;
        targetCell: string;
        strategy?: "PARALLEL" | "SEQUENTIAL" | "CONSENSUS" | undefined;
        bidirectional?: boolean | undefined;
    }, {
        type: RelationshipType;
        targetCell: string;
        strategy?: "PARALLEL" | "SEQUENTIAL" | "CONSENSUS" | undefined;
        bidirectional?: boolean | undefined;
    }>, "many">;
    state: z.ZodNativeEnum<typeof ClawState>;
    confidence: z.ZodNumber;
    maxReasoningSteps: z.ZodOptional<z.ZodNumber>;
    timeout: z.ZodOptional<z.ZodNumber>;
    enableHandshake: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: ClawType;
    position: [number, number];
    model: {
        model: string;
        provider: ModelProvider;
        baseUrl?: string | undefined;
        apiKey?: string | undefined;
    };
    seed: {
        purpose: string;
        trigger: {
            type: TriggerType;
            cellId?: string | undefined;
            threshold?: number | undefined;
            interval?: number | undefined;
            expression?: string | undefined;
            cronExpression?: string | undefined;
        };
        learningStrategy: LearningStrategy;
    };
    equipment: EquipmentSlot[];
    relationships: {
        type: RelationshipType;
        targetCell: string;
        strategy?: "PARALLEL" | "SEQUENTIAL" | "CONSENSUS" | undefined;
        bidirectional?: boolean | undefined;
    }[];
    state: ClawState;
    confidence: number;
    timeout?: number | undefined;
    maxReasoningSteps?: number | undefined;
    enableHandshake?: boolean | undefined;
}, {
    id: string;
    type: ClawType;
    position: [number, number];
    model: {
        model: string;
        provider: ModelProvider;
        baseUrl?: string | undefined;
        apiKey?: string | undefined;
    };
    seed: {
        purpose: string;
        trigger: {
            type: TriggerType;
            cellId?: string | undefined;
            threshold?: number | undefined;
            interval?: number | undefined;
            expression?: string | undefined;
            cronExpression?: string | undefined;
        };
        learningStrategy: LearningStrategy;
    };
    equipment: EquipmentSlot[];
    relationships: {
        type: RelationshipType;
        targetCell: string;
        strategy?: "PARALLEL" | "SEQUENTIAL" | "CONSENSUS" | undefined;
        bidirectional?: boolean | undefined;
    }[];
    state: ClawState;
    confidence: number;
    timeout?: number | undefined;
    maxReasoningSteps?: number | undefined;
    enableHandshake?: boolean | undefined;
}>;
/**
 * Zod schema for WebSocket messages
 */
export declare const WebSocketMessageSchema: z.ZodObject<{
    type: z.ZodNativeEnum<typeof WebSocketMessageType>;
    traceId: z.ZodString;
    timestamp: z.ZodNumber;
    payload: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    type: WebSocketMessageType;
    traceId: string;
    timestamp: number;
    payload?: any;
}, {
    type: WebSocketMessageType;
    traceId: string;
    timestamp: number;
    payload?: any;
}>;
/**
 * Zod schema for CreateClawRequest
 */
export declare const CreateClawRequestSchema: z.ZodObject<{
    config: z.ZodObject<{
        id: z.ZodString;
        type: z.ZodNativeEnum<typeof ClawType>;
        position: z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>;
        model: z.ZodObject<{
            provider: z.ZodNativeEnum<typeof ModelProvider>;
            model: z.ZodString;
            apiKey: z.ZodOptional<z.ZodString>;
            baseUrl: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            model: string;
            provider: ModelProvider;
            baseUrl?: string | undefined;
            apiKey?: string | undefined;
        }, {
            model: string;
            provider: ModelProvider;
            baseUrl?: string | undefined;
            apiKey?: string | undefined;
        }>;
        seed: z.ZodObject<{
            purpose: z.ZodString;
            trigger: z.ZodObject<{
                type: z.ZodNativeEnum<typeof TriggerType>;
                cellId: z.ZodOptional<z.ZodString>;
                threshold: z.ZodOptional<z.ZodNumber>;
                interval: z.ZodOptional<z.ZodNumber>;
                expression: z.ZodOptional<z.ZodString>;
                cronExpression: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                type: TriggerType;
                cellId?: string | undefined;
                threshold?: number | undefined;
                interval?: number | undefined;
                expression?: string | undefined;
                cronExpression?: string | undefined;
            }, {
                type: TriggerType;
                cellId?: string | undefined;
                threshold?: number | undefined;
                interval?: number | undefined;
                expression?: string | undefined;
                cronExpression?: string | undefined;
            }>;
            learningStrategy: z.ZodNativeEnum<typeof LearningStrategy>;
        }, "strip", z.ZodTypeAny, {
            purpose: string;
            trigger: {
                type: TriggerType;
                cellId?: string | undefined;
                threshold?: number | undefined;
                interval?: number | undefined;
                expression?: string | undefined;
                cronExpression?: string | undefined;
            };
            learningStrategy: LearningStrategy;
        }, {
            purpose: string;
            trigger: {
                type: TriggerType;
                cellId?: string | undefined;
                threshold?: number | undefined;
                interval?: number | undefined;
                expression?: string | undefined;
                cronExpression?: string | undefined;
            };
            learningStrategy: LearningStrategy;
        }>;
        equipment: z.ZodArray<z.ZodNativeEnum<typeof EquipmentSlot>, "many">;
        relationships: z.ZodArray<z.ZodObject<{
            type: z.ZodNativeEnum<typeof RelationshipType>;
            targetCell: z.ZodString;
            strategy: z.ZodOptional<z.ZodEnum<["PARALLEL", "SEQUENTIAL", "CONSENSUS"]>>;
            bidirectional: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            type: RelationshipType;
            targetCell: string;
            strategy?: "PARALLEL" | "SEQUENTIAL" | "CONSENSUS" | undefined;
            bidirectional?: boolean | undefined;
        }, {
            type: RelationshipType;
            targetCell: string;
            strategy?: "PARALLEL" | "SEQUENTIAL" | "CONSENSUS" | undefined;
            bidirectional?: boolean | undefined;
        }>, "many">;
        state: z.ZodNativeEnum<typeof ClawState>;
        confidence: z.ZodNumber;
        maxReasoningSteps: z.ZodOptional<z.ZodNumber>;
        timeout: z.ZodOptional<z.ZodNumber>;
        enableHandshake: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: ClawType;
        position: [number, number];
        model: {
            model: string;
            provider: ModelProvider;
            baseUrl?: string | undefined;
            apiKey?: string | undefined;
        };
        seed: {
            purpose: string;
            trigger: {
                type: TriggerType;
                cellId?: string | undefined;
                threshold?: number | undefined;
                interval?: number | undefined;
                expression?: string | undefined;
                cronExpression?: string | undefined;
            };
            learningStrategy: LearningStrategy;
        };
        equipment: EquipmentSlot[];
        relationships: {
            type: RelationshipType;
            targetCell: string;
            strategy?: "PARALLEL" | "SEQUENTIAL" | "CONSENSUS" | undefined;
            bidirectional?: boolean | undefined;
        }[];
        state: ClawState;
        confidence: number;
        timeout?: number | undefined;
        maxReasoningSteps?: number | undefined;
        enableHandshake?: boolean | undefined;
    }, {
        id: string;
        type: ClawType;
        position: [number, number];
        model: {
            model: string;
            provider: ModelProvider;
            baseUrl?: string | undefined;
            apiKey?: string | undefined;
        };
        seed: {
            purpose: string;
            trigger: {
                type: TriggerType;
                cellId?: string | undefined;
                threshold?: number | undefined;
                interval?: number | undefined;
                expression?: string | undefined;
                cronExpression?: string | undefined;
            };
            learningStrategy: LearningStrategy;
        };
        equipment: EquipmentSlot[];
        relationships: {
            type: RelationshipType;
            targetCell: string;
            strategy?: "PARALLEL" | "SEQUENTIAL" | "CONSENSUS" | undefined;
            bidirectional?: boolean | undefined;
        }[];
        state: ClawState;
        confidence: number;
        timeout?: number | undefined;
        maxReasoningSteps?: number | undefined;
        enableHandshake?: boolean | undefined;
    }>;
    context: z.ZodOptional<z.ZodObject<{
        sheetId: z.ZodString;
        userId: z.ZodOptional<z.ZodString>;
        sessionId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        sheetId: string;
        userId?: string | undefined;
        sessionId?: string | undefined;
    }, {
        sheetId: string;
        userId?: string | undefined;
        sessionId?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    config: {
        id: string;
        type: ClawType;
        position: [number, number];
        model: {
            model: string;
            provider: ModelProvider;
            baseUrl?: string | undefined;
            apiKey?: string | undefined;
        };
        seed: {
            purpose: string;
            trigger: {
                type: TriggerType;
                cellId?: string | undefined;
                threshold?: number | undefined;
                interval?: number | undefined;
                expression?: string | undefined;
                cronExpression?: string | undefined;
            };
            learningStrategy: LearningStrategy;
        };
        equipment: EquipmentSlot[];
        relationships: {
            type: RelationshipType;
            targetCell: string;
            strategy?: "PARALLEL" | "SEQUENTIAL" | "CONSENSUS" | undefined;
            bidirectional?: boolean | undefined;
        }[];
        state: ClawState;
        confidence: number;
        timeout?: number | undefined;
        maxReasoningSteps?: number | undefined;
        enableHandshake?: boolean | undefined;
    };
    context?: {
        sheetId: string;
        userId?: string | undefined;
        sessionId?: string | undefined;
    } | undefined;
}, {
    config: {
        id: string;
        type: ClawType;
        position: [number, number];
        model: {
            model: string;
            provider: ModelProvider;
            baseUrl?: string | undefined;
            apiKey?: string | undefined;
        };
        seed: {
            purpose: string;
            trigger: {
                type: TriggerType;
                cellId?: string | undefined;
                threshold?: number | undefined;
                interval?: number | undefined;
                expression?: string | undefined;
                cronExpression?: string | undefined;
            };
            learningStrategy: LearningStrategy;
        };
        equipment: EquipmentSlot[];
        relationships: {
            type: RelationshipType;
            targetCell: string;
            strategy?: "PARALLEL" | "SEQUENTIAL" | "CONSENSUS" | undefined;
            bidirectional?: boolean | undefined;
        }[];
        state: ClawState;
        confidence: number;
        timeout?: number | undefined;
        maxReasoningSteps?: number | undefined;
        enableHandshake?: boolean | undefined;
    };
    context?: {
        sheetId: string;
        userId?: string | undefined;
        sessionId?: string | undefined;
    } | undefined;
}>;
/**
 * Zod schema for TriggerClawRequest
 */
export declare const TriggerClawRequestSchema: z.ZodObject<{
    clawId: z.ZodString;
    data: z.ZodOptional<z.ZodAny>;
    traceId: z.ZodOptional<z.ZodString>;
    force: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    clawId: string;
    data?: any;
    traceId?: string | undefined;
    force?: boolean | undefined;
}, {
    clawId: string;
    data?: any;
    traceId?: string | undefined;
    force?: boolean | undefined;
}>;
/**
 * Zod schema for ApproveClawRequest
 */
export declare const ApproveClawRequestSchema: z.ZodObject<{
    clawId: z.ZodString;
    traceId: z.ZodString;
    approved: z.ZodBoolean;
    reason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    clawId: string;
    traceId: string;
    approved: boolean;
    reason?: string | undefined;
}, {
    clawId: string;
    traceId: string;
    approved: boolean;
    reason?: string | undefined;
}>;
/**
 * Zod schema for QueryClawRequest
 */
export declare const QueryClawRequestSchema: z.ZodObject<{
    clawId: z.ZodString;
    includeReasoning: z.ZodOptional<z.ZodBoolean>;
    includeMemory: z.ZodOptional<z.ZodBoolean>;
    includeRelationships: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    clawId: string;
    includeReasoning?: boolean | undefined;
    includeMemory?: boolean | undefined;
    includeRelationships?: boolean | undefined;
}, {
    clawId: string;
    includeReasoning?: boolean | undefined;
    includeMemory?: boolean | undefined;
    includeRelationships?: boolean | undefined;
}>;
/**
 * Zod schema for CancelClawRequest
 */
export declare const CancelClawRequestSchema: z.ZodObject<{
    clawId: z.ZodString;
    reason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    clawId: string;
    reason?: string | undefined;
}, {
    clawId: string;
    reason?: string | undefined;
}>;
/**
 * Claw API error codes
 */
export declare enum ClawErrorCode {
    NETWORK_ERROR = "NETWORK_ERROR",
    VALIDATION_ERROR = "VALIDATION_ERROR",
    NOT_FOUND = "NOT_FOUND",
    ALREADY_EXISTS = "ALREADY_EXISTS",
    TIMEOUT = "TIMEOUT",
    UNAUTHORIZED = "UNAUTHORIZED",
    RATE_LIMITED = "RATE_LIMITED",
    INTERNAL_ERROR = "INTERNAL_ERROR",
    INVALID_STATE = "INVALID_STATE",
    RECURSIVE_LOOP = "RECURSIVE_LOOP"
}
/**
 * Claw API error
 */
export declare class ClawAPIError extends Error {
    code: ClawErrorCode;
    details?: any | undefined;
    clawId?: string | undefined;
    constructor(code: ClawErrorCode, message: string, details?: any | undefined, clawId?: string | undefined);
    toJSON(): {
        name: string;
        code: ClawErrorCode;
        message: string;
        details: any;
        clawId: string | undefined;
    };
}
/**
 * Type guard for ClawCellConfig
 */
export declare function isClawCellConfig(obj: any): obj is ClawCellConfig;
/**
 * Type guard for WebSocket message
 */
export declare function isWebSocketMessage(obj: any): obj is WebSocketMessage;
/**
 * Type guard for ClawAPIError
 */
export declare function isClawAPIError(obj: any): obj is ClawAPIError;
//# sourceMappingURL=types.d.ts.map