import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { skillLines } from "akasha/temper/character-skill-line/modules/skill-lines/skill-lines.module.code.ts"
import type { CharacterKnowledge } from "akasha/temper/command/modules/inventory-characters-reading/inventory-characters-reading.module.code.ts"
import {
  computeBankStock,
  computeItemStock,
} from "akasha/temper/items-core/modules/compute-item-stock/compute-item-stock.module.code.ts"
import { findCooldownGroup } from "akasha/temper/items-core/modules/cooldown-groups/cooldown-groups.module.code.ts"
import { isCraftingRankBelowCap } from "akasha/temper/items-core/modules/crafting-passive-ranks/crafting-passive-ranks.module.code.ts"
import { signatureMatchesItem } from "akasha/temper/items-core/modules/equipment-signature-matcher/equipment-signature-matcher.module.code.ts"
import type { InventoryDatabase } from "akasha/temper/items-core/modules/inventory-types/inventory-types.module.code.ts"
import { STYLE_TO_CHAPTERS } from "akasha/temper/items-core/modules/motif-chapter-set/motif-chapter-set.module.code.ts"
import type {
  WantedCompanionEquipmentSignature,
  WantedEquipmentSignature,
} from "akasha/temper/items-rules-core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import { TOTAL_SCRIPT_COUNT } from "akasha/temper/items-rules-core/modules/scribing-total-script-count/scribing-total-script-count.module.code.ts"
import type { ItemKey } from "akasha/temper/items-rules-core/modules/use-destination-types/use-destination-types.module.code.ts"
import type { EvalEnv } from "akasha/temper/items-rules-eval/modules/eval-env/eval-env.module.code.ts"
import { luaStringsOrEmpty } from "akasha/temper/saved-variable/modules/lua-array/lua-array.module.code.ts"

export interface CliEvalEnvDeps {
  readonly charactersById: ReadonlyMap<string, CharacterKnowledge>
  readonly characterPriority: ReadonlyArray<string>
  readonly wantedConsumables: Record<string, unknown>
  readonly wantedEquipment?: ReadonlyArray<WantedEquipmentSignature>
  readonly wantedCompanionEquipment?: ReadonlyArray<WantedCompanionEquipmentSignature>
  readonly db?: InventoryDatabase
}

function chaptersOfStyle(styleId: number): readonly number[] | undefined {
  return STYLE_TO_CHAPTERS[styleId]
}

const UNKNOWN = "unknown"

export function buildCliEvalEnv(deps: CliEvalEnvDeps): EvalEnv {
  const {
    charactersById,
    characterPriority,
    wantedConsumables,
    wantedEquipment,
    wantedCompanionEquipment,
    db,
  } = deps
  const itemIdToCooldownGroup = compileItemIdToCooldownGroup(db)
  const consumableWanters = compileConsumableWanters(wantedConsumables)
  const consumableStock = computeItemStock(db ?? null, new Set(consumableWanters.keys()))
  const bankStock = computeBankStock(db ?? null)
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
    getKnownChapterCountForStyle: (charId, styleId) => {
      const held = charactersById.get(charId)
      if (held === undefined) return 0
      const knownChapters =
        held.motifKnowledgeByStyle.get(styleId) ?? held.motifChaptersByStyle.get(styleId)
      if (knownChapters === undefined) return 0
      return knownChapters.size
    },

    getConsumableWanters: (itemId) => consumableWanters.get(itemId) ?? [],
    getConsumableStock: (itemId, charId) => {
      if (db === undefined) return UNKNOWN
      return consumableStock.get(itemId)?.byChar.get(charId) ?? 0
    },
    getBankStock: (itemId) => {
      if (db === undefined) return UNKNOWN
      return bankStock.get(itemId) ?? 0
    },

    getKnownScripts: (charId) => {
      const held = charactersById.get(charId)
      if (held === undefined) return new Set<number>()
      return held.unlockedScriptIds
    },
    getTotalScriptCount: () => TOTAL_SCRIPT_COUNT,

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

    isTraitResearched: (charId, craftingType, traitName) => {
      const byCraftingType = charactersById.get(charId)?.researchedTraitsByCraftingType
      if (byCraftingType === undefined) return UNKNOWN
      const researched = byCraftingType.get(craftingType)
      if (researched === undefined) return UNKNOWN
      return researched.get(traitName.toLowerCase()) ?? UNKNOWN
    },
    matchesWantedEquipment: (facts) => {
      if (wantedEquipment === undefined) return UNKNOWN
      return wantedEquipment.some((one) => signatureMatchesItem(one, facts))
    },
    matchesWantedCompanionEquipment: (facts) => {
      if (wantedCompanionEquipment === undefined) return UNKNOWN
      return wantedCompanionEquipment.some((one) => signatureMatchesItem(one, facts))
    },
    isCompanionWornSlotFilled: () => UNKNOWN,
    findCharacterForWantedEquipment: (facts) => {
      if (wantedEquipment === undefined) return UNKNOWN
      return wantedEquipment.find((one) => signatureMatchesItem(one, facts))?.esoCharId
    },
    findCompanionForWantedEquipment: (facts) => {
      if (wantedCompanionEquipment === undefined) return UNKNOWN
      return wantedCompanionEquipment.find((one) => signatureMatchesItem(one, facts))?.companionName
    },
  }
}

function compileConsumableWanters(
  wanted: Record<string, unknown>
): ReadonlyMap<number, readonly string[]> {
  const result = new Map<number, readonly string[]>()
  for (const [itemIdKey, value] of Object.entries(wanted)) {
    const itemId = Number(itemIdKey)
    if (!Number.isFinite(itemId)) continue
    const named = luaStringsOrEmpty(value)
    if (named.length > 0) result.set(itemId, named)
  }
  return result
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
