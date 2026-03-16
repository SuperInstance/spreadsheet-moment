/**
 * CLAW_RELATE Formula Function
 *
 * Creates a relationship between two Claw agents
 *
 * @syntax =CLAW_RELATE(from_claw_id, to_claw_id, relationship_type, [strategy])
 * @param from_claw_id - ID of the source claw
 * @param to_claw_id - ID of the target claw
 * @param relationship_type - Type of relationship (slave, coworker, peer, delegate, observer)
 * @param strategy - Optional coordination strategy (PARALLEL, SEQUENTIAL, CONSENSUS, MAJORITY_VOTE, WEIGHTED)
 * @returns Success status (TRUE) or error message
 *
 * @example
 * =CLAW_RELATE("claw_master", "claw_worker1", "slave", "PARALLEL")
 * =CLAW_RELATE(A1, A2, "coworker", "SEQUENTIAL")
 * =CLAW_RELATE("claw_orchestrator", "claw_analyzer", "delegate")
 */

import { FunctionType } from '@univerjs/core';
import type { Nullable, InterpreterValue } from '@univerjs/core';
import type { ClawFunctionType, RelationshipType, CoordinationStrategy } from '../types';

/**
 * Valid relationship types
 */
const VALID_RELATIONSHIPS: RelationshipType[] = ['slave', 'coworker', 'peer', 'delegate', 'observer'];

/**
 * Valid coordination strategies
 */
const VALID_STRATEGIES: CoordinationStrategy[] = [
  'PARALLEL',
  'SEQUENTIAL',
  'CONSENSUS',
  'MAJORITY_VOTE',
  'WEIGHTED'
];

/**
 * Validate relationship type
 */
function isValidRelationship(type: string): type is RelationshipType {
  return VALID_RELATIONSHIPS.includes(type.toLowerCase() as RelationshipType);
}

/**
 * Validate coordination strategy
 */
function isValidStrategy(strategy: string): strategy is CoordinationStrategy {
  return VALID_STRATEGIES.includes(strategy.toUpperCase() as CoordinationStrategy);
}

/**
 * Default strategy by relationship type
 */
function getDefaultStrategy(relationshipType: RelationshipType): CoordinationStrategy {
  switch (relationshipType) {
    case 'slave':
      return 'PARALLEL';
    case 'coworker':
      return 'SEQUENTIAL';
    case 'peer':
      return 'CONSENSUS';
    case 'delegate':
      return 'SEQUENTIAL';
    case 'observer':
      return 'PARALLEL';
    default:
      return 'PARALLEL';
  }
}

/**
 * CLAW_RELATE formula function implementation
 */
export const CLAW_RELATE: ClawFunctionType = {
  id: 10004,
  type: FunctionType.Function,
  name: 'CLAW_RELATE',
  description: 'Create a relationship between two Claw agents',
  minParams: 3,
  maxParams: 4,

  parameters: [
    {
      name: 'from_claw_id',
      description: 'ID of the source claw',
      type: 'string',
      required: true
    },
    {
      name: 'to_claw_id',
      description: 'ID of the target claw',
      type: 'string',
      required: true
    },
    {
      name: 'relationship_type',
      description: 'Type of relationship (slave, coworker, peer, delegate, observer)',
      type: 'string',
      required: true
    },
    {
      name: 'strategy',
      description: 'Optional coordination strategy (PARALLEL, SEQUENTIAL, CONSENSUS, MAJORITY_VOTE, WEIGHTED)',
      type: 'string',
      required: false
    }
  ],

  returns: {
    type: 'boolean',
    description: 'Success status (TRUE) or error message'
  },

  execute: async function (
    this: any,
    fromClawId: string,
    toClawId: string,
    relationshipType: string,
    strategy?: string
  ): Promise<Nullable<InterpreterValue>> {
    try {
      // Validate inputs
      if (!fromClawId || typeof fromClawId !== 'string' || fromClawId.trim() === '') {
        throw new Error('CLAW_RELATE: From claw ID is required and must be a non-empty string');
      }

      if (!toClawId || typeof toClawId !== 'string' || toClawId.trim() === '') {
        throw new Error('CLAW_RELATE: To claw ID is required and must be a non-empty string');
      }

      if (!relationshipType || typeof relationshipType !== 'string' || relationshipType.trim() === '') {
        throw new Error('CLAW_RELATE: Relationship type is required and must be a non-empty string');
      }

      // Validate relationship type
      const relType = relationshipType.toLowerCase() as RelationshipType;
      if (!isValidRelationship(relType)) {
        throw new Error(
          `CLAW_RELATE: Invalid relationship type "${relationshipType}". ` +
          `Must be one of: ${VALID_RELATIONSHIPS.join(', ')}`
        );
      }

      // Validate or default strategy
      let coordStrategy: CoordinationStrategy;
      if (strategy && strategy.trim() !== '') {
        if (!isValidStrategy(strategy)) {
          throw new Error(
            `CLAW_RELATE: Invalid strategy "${strategy}". ` +
            `Must be one of: ${VALID_STRATEGIES.join(', ')}`
          );
        }
        coordStrategy = strategy.toUpperCase() as CoordinationStrategy;
      } else {
        coordStrategy = getDefaultStrategy(relType);
      }

      // Call API to create relationship
      if (typeof fetch !== 'undefined') {
        try {
          const apiUrl = process.env.CLAW_API_URL || '/api/claws';
          const response = await fetch(`${apiUrl}/${encodeURIComponent(fromClawId.trim())}/relationships`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.CLAW_API_KEY || ''}`
            },
            body: JSON.stringify({
              target: toClawId.trim(),
              type: relType,
              strategy: coordStrategy
            })
          });

          if (response.ok) {
            return true; // Success
          } else {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create relationship');
          }
        } catch (error) {
          console.warn('CLAW_RELATE: Backend API unavailable:', error);
          throw new Error('Backend API unavailable');
        }
      }

      // No fetch available (server-side rendering)
      throw new Error('Fetch API not available');

    } catch (error) {
      console.error('CLAW_RELATE Error:', error);
      return `#ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }
};

export default CLAW_RELATE;
