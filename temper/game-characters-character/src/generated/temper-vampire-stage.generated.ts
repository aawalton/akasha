/**
 * Temper Vampire Stages (Generated)
 *
 * ESO vampire stages sourced from the universal pages table (page type:
 * temper-vampire-stage).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { VampireStage } from "../vampire-stages-data"

export const TEMPER_VAMPIRE_STAGES = [
  { id: "stage-0", name: "No Vampirism", stage: 0, esoVampireStageId: 0, description: "Not a vampire. No bonuses or penalties." },
  { id: "stage-1", name: "Stage 1", stage: 1, esoVampireStageId: 135397, description: "Health Recovery: -10%, Flame Damage Taken: +5%, Regular Ability Costs: +3%, Vampire Ability Costs: -6%" },
  { id: "stage-2", name: "Stage 2", stage: 2, esoVampireStageId: 135399, description: "Health Recovery: -30%, Flame Damage Taken: +8%, Regular Ability Costs: +5%, Vampire Ability Costs: -10%" },
  { id: "stage-3", name: "Stage 3", stage: 3, esoVampireStageId: 135400, description: "Health Recovery: -60%, Flame Damage Taken: +13%, Regular Ability Costs: +8%, Vampire Ability Costs: -16%" },
  { id: "stage-4", name: "Stage 4", stage: 4, esoVampireStageId: 135402, description: "Health Recovery: -100%, Flame Damage Taken: +20%, Regular Ability Costs: +12%, Vampire Ability Costs: -24%" },
] as const satisfies readonly VampireStage[]

/**
 * Keyed-by-id view of TEMPER_VAMPIRE_STAGES. Preserved as a literal
 * object so the resulting Record type carries the same string-literal
 * keys (`stage-0` … `stage-4`) the engine needs for its VampireStageId
 * union, with no runtime conversion and no `as` cast required.
 */
export const VAMPIRE_STAGE_DATA = {
  "stage-0": { id: "stage-0", name: "No Vampirism", stage: 0, esoVampireStageId: 0, description: "Not a vampire. No bonuses or penalties." },
  "stage-1": { id: "stage-1", name: "Stage 1", stage: 1, esoVampireStageId: 135397, description: "Health Recovery: -10%, Flame Damage Taken: +5%, Regular Ability Costs: +3%, Vampire Ability Costs: -6%" },
  "stage-2": { id: "stage-2", name: "Stage 2", stage: 2, esoVampireStageId: 135399, description: "Health Recovery: -30%, Flame Damage Taken: +8%, Regular Ability Costs: +5%, Vampire Ability Costs: -10%" },
  "stage-3": { id: "stage-3", name: "Stage 3", stage: 3, esoVampireStageId: 135400, description: "Health Recovery: -60%, Flame Damage Taken: +13%, Regular Ability Costs: +8%, Vampire Ability Costs: -16%" },
  "stage-4": { id: "stage-4", name: "Stage 4", stage: 4, esoVampireStageId: 135402, description: "Health Recovery: -100%, Flame Damage Taken: +20%, Regular Ability Costs: +12%, Vampire Ability Costs: -24%" },
} as const satisfies Record<string, VampireStage>
