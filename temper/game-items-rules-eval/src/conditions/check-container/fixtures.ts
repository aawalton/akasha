import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import type { EvalContext, EvalEnv } from "../../eval-env"
import type { ItemFacts } from "../../item-facts"

export const stubEnv: EvalEnv = {
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
  return { env: { ...stubEnv, ...overrides } }
}

export const baseFacts: ItemFacts = {
  itemId: 100,
  itemName: "Sample Container",
  itemLink: "|H1:item:100:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
}

export const containerFacts: ItemFacts = { ...baseFacts, isContainer: true }
export const nonContainerFacts: ItemFacts = { ...baseFacts, isContainer: false }

export const noConditionsRule: CompiledOrderedRule = { categoryId: "all", action: "nothing" }
export const canOpenRule: CompiledOrderedRule = {
  categoryId: "all",
  action: "nothing",
  canOpen: "can-open",
}
export const canGiveMaxRewardsRule: CompiledOrderedRule = {
  categoryId: "all",
  action: "nothing",
  canGiveMaxRewards: "can-give-max-rewards",
}
export const bothRule: CompiledOrderedRule = {
  categoryId: "all",
  action: "nothing",
  canOpen: "can-open",
  canGiveMaxRewards: "can-give-max-rewards",
}
