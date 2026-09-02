import type { ItemKey } from "@akasha/temper-items-rules-core/use-destination-types"
import type { EvalEnv } from "@akasha/temper-items-rules-eval/eval-env"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { styleToChapters } from "./game-code.ts"
import type { CharacterKnowledge } from "./parse-temper-characters.ts"

export interface CliEvalEnvDeps {
  readonly charactersById: ReadonlyMap<string, CharacterKnowledge>
  readonly characterPriority: ReadonlyArray<string>
  readonly wantedConsumables: Record<string, unknown>
}

export function buildCliEvalEnv(deps: CliEvalEnvDeps): EvalEnv {
  const { charactersById, characterPriority, wantedConsumables } = deps
  return {
    isKnownByCharacter: (itemKey, charId) => knowsItemForChar(charactersById, charId, itemKey),
    isKnownByAnyCharacter: (itemKey) => {
      for (const charId of charactersById.keys()) {
        if (knowsItemForChar(charactersById, charId, itemKey)) return true
      }
      return false
    },

    getCharacterPriority: () => characterPriority,
    getCurrentCharacter: () => "unknown",
    getAllCharacters: () => Array.from(charactersById.keys()),

    getConsumableWanters: (itemId) => {
      if (
        Object.hasOwn(wantedConsumables, String(itemId)) ||
        Object.hasOwn(wantedConsumables, itemId.toString())
      ) {
        return []
      }
      return []
    },
    getConsumableStock: () => "unknown",
    getBankStock: () => "unknown",

    getKnownScripts: (charId) => {
      const c = charactersById.get(charId)
      if (c === undefined) return new Set<number>()
      return c.unlockedScriptIds
    },
    getTotalScriptCount: () => "unknown",

    isTraitResearched: () => "unknown",
    isCraftingRankBelowCap: () => "unknown",
    matchesWantedEquipment: () => "unknown",
    matchesWantedCompanionEquipment: () => "unknown",
    isCompanionWornSlotFilled: () => "unknown",
    findCharacterForWantedEquipment: () => "unknown",
    findCompanionForWantedEquipment: () => "unknown",
    getCooldownGroup: () => "unknown",
    isCooldownExpired: () => "unknown",
    getTransmuteCrystalAmount: () => "unknown",
    getTransmuteCrystalCap: () => "unknown",
  }
}

function knowsItemForChar(
  charactersById: ReadonlyMap<string, CharacterKnowledge>,
  charId: string,
  itemKey: ItemKey
): boolean {
  const c = charactersById.get(charId)
  if (c === undefined) return false
  switch (itemKey.kind) {
    case "recipe":
      return c.recipeResultItemIds.has(itemKey.resultItemId)
    case "motif": {
      const knownChapters =
        c.motifKnowledgeByStyle.get(itemKey.styleId) ?? c.motifChaptersByStyle.get(itemKey.styleId)
      if (knownChapters === undefined) return false
      if (itemKey.chapterId === null) {
        const styleChapters = styleToChapters(itemKey.styleId)
        if (styleChapters === undefined || styleChapters.length === 0) return false
        return knownChapters.size === styleChapters.length
      }
      return knownChapters.has(itemKey.chapterId)
    }
    case "script":
      return c.unlockedScriptIds.has(itemKey.scriptId)
    case "consumable":
      return false
    default:
      return assertNever(itemKey)
  }
}
