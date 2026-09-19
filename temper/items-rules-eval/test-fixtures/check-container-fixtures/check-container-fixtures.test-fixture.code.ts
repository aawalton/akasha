import type {
  EvalContext,
  EvalEnv,
} from "akasha/temper/items-rules-eval/modules/eval-env/eval-env.module.code.ts"

const STUB_ENV: EvalEnv = {
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
  getCharacterSkillLineRanks: () => "unknown",
  getCharacterCurseState: () => "unknown",
  getCharacterCanLevelMorphs: () => "unknown",
  getKnownChapterCountForStyle: () => "unknown",
}

export function ctxWith(overrides: Partial<EvalEnv>): EvalContext {
  return { env: { ...STUB_ENV, ...overrides } }
}
