/**
 * Claw Formula Plugin for Univer
 *
 * Registers Claw formula functions with the Univer formula engine
 *
 * @module agent-formulas/plugins
 */

import { Injectable, Autowired } from '@univerjs/core';
import type { IFunctionService } from '@univerjs/engine-formula';
import { CLAW_NEW } from '../functions/CLAW_NEW';
import { CLAW_EQUIP } from '../functions/CLAW_EQUIP';
import { CLAW_TRIGGER } from '../functions/CLAW_TRIGGER';
import { CLAW_RELATE } from '../functions/CLAW_RELATE';

const PLUGIN_NAME = 'CLAW_FORMULA_PLUGIN';

@Injectable()
export class ClawFormulaPlugin {
  constructor(
    @IFunctionService private readonly _functionService: IFunctionService
  ) {}

  /**
   * Plugin initialization
   */
  initialize(): void {
    this._registerFunctions();
  }

  /**
   * Register all Claw formula functions
   */
  private _registerFunctions(): void {
    // Register CLAW_NEW
    this._functionService.registerFunction(CLAW_NEW);

    // Register CLAW_EQUIP
    this._functionService.registerFunction(CLAW_EQUIP);

    // Register CLAW_TRIGGER
    this._functionService.registerFunction(CLAW_TRIGGER);

    // Register CLAW_RELATE
    this._functionService.registerFunction(CLAW_RELATE);

    console.log(`[${PLUGIN_NAME}] Registered 4 Claw formula functions:`);
    console.log(`  - CLAW_NEW (id: ${CLAW_NEW.id})`);
    console.log(`  - CLAW_EQUIP (id: ${CLAW_EQUIP.id})`);
    console.log(`  - CLAW_TRIGGER (id: ${CLAW_TRIGGER.id})`);
    console.log(`  - CLAW_RELATE (id: ${CLAW_RELATE.id})`);
  }

  /**
   * Plugin cleanup
   */
  dispose(): void {
    // Unregister functions if needed
    console.log(`[${PLUGIN_NAME}] Disposed`);
  }
}

export default ClawFormulaPlugin;
