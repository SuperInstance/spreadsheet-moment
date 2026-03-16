/**
 * Agent Formulas Type Definitions
 *
 * @module agent-formulas/types
 */

import type { FunctionType } from '@univerjs/core';
import type { Nullable, InterpreterValue } from '@univerjs/core';

/**
 * Claw agent cell types
 */
export enum ClawAgentType {
  SENSOR = 'SENSOR',
  ANALYZER = 'ANALYZER',
  CONTROLLER = 'CONTROLLER',
  ORCHESTRATOR = 'ORCHESTRATOR'
}

/**
 * Model providers
 */
export enum ModelProvider {
  DEEPSEEK = 'deepseek',
  CLOUDFLARE = 'cloudflare',
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic'
}

/**
 * Equipment slots
 */
export enum EquipmentSlot {
  MEMORY = 'MEMORY',
  REASONING = 'REASONING',
  CONSENSUS = 'CONSENSUS',
  SPREADSHEET = 'SPREADSHEET',
  DISTILLATION = 'DISTILLATION',
  COORDINATION = 'COORDINATION'
}

/**
 * Relationship types between claws
 */
export enum RelationshipType {
  SLAVE = 'slave',
  COWORKER = 'coworker',
  PEER = 'peer',
  DELEGATE = 'delegate',
  OBSERVER = 'observer'
}

/**
 * Coordination strategies
 */
export enum CoordinationStrategy {
  PARALLEL = 'PARALLEL',
  SEQUENTIAL = 'SEQUENTIAL',
  CONSENSUS = 'CONSENSUS',
  MAJORITY_VOTE = 'MAJORITY_VOTE',
  WEIGHTED = 'WEIGHTED'
}

/**
 * Claw cell configuration
 */
export interface ClawCellConfig {
  id: string;
  type: ClawAgentType;
  position: [number, number]; // [row, col]

  // Model configuration
  model: {
    provider: ModelProvider;
    model: string;
    apiKey?: string;
  };

  // Seed configuration
  seed: {
    purpose: string;
    trigger: TriggerCondition;
    learningStrategy: 'reinforcement' | 'supervised' | 'unsupervised';
  };

  // Equipment
  equipment: EquipmentSlot[];

  // Social
  relationships: Relationship[];

  // State
  state: string;
  confidence: number;
}

/**
 * Trigger condition
 */
export interface TriggerCondition {
  type: 'cell_change' | 'formula' | 'time' | 'external' | 'manual';
  cellId?: string;
  threshold?: number;
  interval?: number;
  expression?: string;
}

/**
 * Relationship between claws
 */
export interface Relationship {
  type: RelationshipType;
  targetCell: string;
  strategy?: CoordinationStrategy;
}

/**
 * Claw formula function signature
 */
export interface ClawFunctionType extends FunctionType {
  id: number;
  type: FunctionType.Function;
  name: string;
  description: string;
  minParams: number;
  maxParams: number;
  parameters: Array<{
    name: string;
    description: string;
    type: string;
    required: boolean;
  }>;
  returns: {
    type: string;
    description: string;
  };
  execute: (...args: any[]) => Promise<Nullable<InterpreterValue>>;
}

/**
 * API response for claw operations
 */
export interface ClawApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  clawId?: string;
}

/**
 * Formula execution context
 */
export interface FormulaContext {
  sheetId: string;
  cellId: string;
  workbook: any;
  timestamp: number;
}
