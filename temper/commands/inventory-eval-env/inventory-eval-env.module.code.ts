import type { CharacterKnowledge } from "akasha/temper/commands/inventory-characters-reading/inventory-characters-reading.module.code.ts"
import { findCooldownGroup } from "akasha/temper/items-core/cooldown-groups/cooldown-groups.module.code.ts"
import { isCraftingRankBelowCap } from "akasha/temper/items-core/crafting-passive-ranks/crafting-passive-ranks.module.code.ts"
import type { InventoryDatabase } from "akasha/temper/items-core/inventory-types/inventory-types.module.code.ts"
import { STYLE_TO_CHAPTERS } from "akasha/temper/items-core/motif-chapter-set/motif-chapter-set.module.code.ts"
import type { ItemKey } from "akasha/temper/items-rules-core/use-destination-types/use-destination-types.module.code.ts"
import type { EvalEnv } from "akasha/temper/items-rules-eval/eval-env/eval-env.module.code.ts"
import { skillLines } from "akasha/temper/skill-lines/skill-lines/skill-lines.module.code.ts"
import { assertNever } from "akasha/utils/narrow/modules/assert-never/assert-never.module.code.ts"

export interface CliEvalEnvDeps {
  readonly charactersById: ReadonlyMap<string, CharacterKnowledge>
  readonly characterPriority: ReadonlyArray<string>
  readonly wantedConsumables: Record<string, unknown>
  readonly db?: InventoryDatabase
}

function chaptersOfStyle(styleId: number): readonly number[] | undefined {
  return STYLE_TO_CHAPTERS[styleId]
}

const UNKNOWN = "unknown"

export function buildCliEvalEnv(deps: CliEvalEnvDeps): EvalEnv {
  const { charactersById, characterPriority, wantedConsumables, db } = deps
  const itemIdToCooldownGroup = compileItemIdToCooldownGroup(db)
  return {
    isKnownByCharacter: (itemKey, charId) => knowsItemForChar(charactersById, charId, itemKey),
    isKnownByAnyCharacter: (itemKey) => {
      for (const charId of charactersById.keys()) {
        if (knowsItemForChar(charactersById, charId, itemKey)) return true
      }
      return false
    },

    getCharacterPriority: () => characterPriority,
    getCurrentCharacter: () => UNKNOWN,
    getAllCharacters: () => Array.from(charactersById.keys()),

    getCharacterSkillLineRanks: (charId, skillLineId) => {
      if (!skillLines.has(skillLineId)) return undefined
      const template = skillLines.data[skillLineId]
      if (template.esoSkillLineId <= 0) return undefined
      const currentRank = charactersById
        .get(charId)
        ?.skillLineRanksByEsoLineId.get(template.esoSkillLineId)
      if (currentRank === undefined) return undefined
      return { currentRank, maxRank: template.maxRank }
    },
    getCharacterCurseState: (charId) => charactersById.get(charId)?.curseState,
    getCharacterCanLevelMorphs: () => UNKNOWN,

    getConsumableWanters: (itemId) => {
      if (
        Object.hasOwn(wantedConsumables, String(itemId)) ||
        Object.hasOwn(wantedConsumables, itemId.toString())
      ) {
        return []
      }
      return []
    },
    getConsumableStock: () => UNKNOWN,
    getBankStock: () => UNKNOWN,

    getKnownScripts: (charId) => {
      const held = charactersById.get(charId)
      if (held === undefined) return new Set<number>()
      return held.unlockedScriptIds
    },
    getTotalScriptCount: () => UNKNOWN,

    isCraftingRankBelowCap: (charId, craftingType) => {
      const ranks = db?.craftingLevels?.[charId]
      if (ranks === undefined) return UNKNOWN
      const rank = ranks[craftingType]
      if (rank === undefined) return UNKNOWN
      return isCraftingRankBelowCap(rank, craftingType)
    },

    getCooldownGroup: (itemId) => itemIdToCooldownGroup.get(itemId) ?? null,
    isCooldownExpired: (groupKey) => {
      const expiresAt = db?.openCooldowns?.[groupKey]
      if (expiresAt === undefined) return true
      return Date.now() >= expiresAt
    },
    getTransmuteCrystalAmount: () => db?.transmuteCrystalAmount ?? UNKNOWN,
    getTransmuteCrystalCap: () => db?.transmuteCrystalCap ?? UNKNOWN,

    isTraitResearched: () => UNKNOWN,
    matchesWantedEquipment: () => UNKNOWN,
    matchesWantedCompanionEquipment: () => UNKNOWN,
    isCompanionWornSlotFilled: () => UNKNOWN,
    findCharacterForWantedEquipment: () => UNKNOWN,
    findCompanionForWantedEquipment: () => UNKNOWN,
  }
}

function compileItemIdToCooldownGroup(
  db: InventoryDatabase | undefined
): ReadonlyMap<number, string> {
  const result = new Map<number, string>()
  if (db === undefined) return result
  for (const location of Object.values(db.locations)) {
    for (const slots of Object.values(location.bags)) {
      for (const item of Object.values(slots)) {
        if (item.isContainer !== true) continue
        if (result.has(item.itemId)) continue
        const group = findCooldownGroup({ itemName: item.itemName })
        if (group !== undefined) result.set(item.itemId, group.key)
      }
    }
  }
  return result
}

function knowsItemForChar(
  charactersById: ReadonlyMap<string, CharacterKnowledge>,
  charId: string,
  itemKey: ItemKey
): boolean {
  const held = charactersById.get(charId)
  if (held === undefined) return false
  switch (itemKey.kind) {
    case "recipe":
      return held.recipeResultItemIds.has(itemKey.resultItemId)
    case "motif": {
      const knownChapters =
        held.motifKnowledgeByStyle.get(itemKey.styleId) ??
        held.motifChaptersByStyle.get(itemKey.styleId)
      if (knownChapters === undefined) return false
      if (itemKey.chapterId === null) {
        const styleChapters = chaptersOfStyle(itemKey.styleId)
        if (styleChapters === undefined || styleChapters.length === 0) return false
        return knownChapters.size === styleChapters.length
      }
      return knownChapters.has(itemKey.chapterId)
    }
    case "script":
      return held.unlockedScriptIds.has(itemKey.scriptId)
    case "consumable":
      return false
    default:
      return assertNever(itemKey)
  }
}
