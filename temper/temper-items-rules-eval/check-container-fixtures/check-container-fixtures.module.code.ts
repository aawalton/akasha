import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type { EvalContext, EvalEnv } from "../eval-env/eval-env.module.code.ts"
import type { ItemFacts } from "../item-facts/item-facts.module.code.ts"

export const STUB_ENV: EvalEnv = {
  isKnownByCharacter: () => "unknown",
  isKnownByAnyCharacter: () => "unknown",
  isTraitResearched: () => "unknown",
  isCraftingRankBelowCap: () => "unknown",
  matchesWantedEquipment: () => "unknown",
  matchesWantedCompanionEquipment: () => "unknown",
  isCompanionWornSlotFilled: () => "unknown",
  findCharacterForWantedEquipment: () => "unknown",
  findCompanionForWantedEquipment: () => "unknown",
  getConsumableStock: () => "unknown",
  getConsumableWanters: () => "unknown",
  getBankStock: () => "unknown",
  getCooldownGroup: () => "unknown",
  isCooldownExpired: () => "unknown",
  getTransmuteCrystalAmount: () => "unknown",
  getTransmuteCrystalCap: () => "unknown",
  getKnownScripts: () => "unknown",
  getTotalScriptCount: () => "unknown",
  getCharacterPriority: () => "unknown",
  getCurrentCharacter: () => "unknown",
  getAllCharacters: () => "unknown",
}

export function ctxWith(overrides: Partial<EvalEnv>): EvalContext {
  return { env: { ...STUB_ENV, ...overrides } }
}

export const BASE_FACTS: ItemFacts = {
  itemId: 100,
  itemName: "Sample Container",
  itemLink: "|H1:item:100:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
}

export const CONTAINER_FACTS: ItemFacts = { ...BASE_FACTS, isContainer: true }
export const NON_CONTAINER_FACTS: ItemFacts = { ...BASE_FACTS, isContainer: false }

export const NO_CONDITIONS_RULE: CompiledOrderedRule = { categoryId: "all", action: "nothing" }
export const CAN_OPEN_RULE: CompiledOrderedRule = {
  categoryId: "all",
  action: "nothing",
  canOpen: "can-open",
}
export const CAN_GIVE_MAX_REWARDS_RULE: CompiledOrderedRule = {
  categoryId: "all",
  action: "nothing",
  canGiveMaxRewards: "can-give-max-rewards",
}
export const BOTH_RULE: CompiledOrderedRule = {
  categoryId: "all",
  action: "nothing",
  canOpen: "can-open",
  canGiveMaxRewards: "can-give-max-rewards",
}
