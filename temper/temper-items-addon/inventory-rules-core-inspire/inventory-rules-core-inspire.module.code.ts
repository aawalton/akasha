import { isCraftingRankBelowCap } from "@akasha/temper-items-core/crafting-passive-ranks"
import type { CharacterScope } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import { asObjectRecord } from "@akasha/utils-narrow/as-object-record"
import { getSavedVariables } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import { getTemperCharactersData } from "../inventory-temper-characters-data/inventory-temper-characters-data.module.code.ts"
export const KNOWN_DECON_CRAFT_TYPES = new LuaSet<number>()
KNOWN_DECON_CRAFT_TYPES.add(CRAFTING_TYPE_BLACKSMITHING)
KNOWN_DECON_CRAFT_TYPES.add(CRAFTING_TYPE_CLOTHIER)
KNOWN_DECON_CRAFT_TYPES.add(CRAFTING_TYPE_ENCHANTING)
KNOWN_DECON_CRAFT_TYPES.add(CRAFTING_TYPE_WOODWORKING)
KNOWN_DECON_CRAFT_TYPES.add(CRAFTING_TYPE_JEWELRYCRAFTING)

export function inferDeconCraftingType(itemLink: string): number {
  const craftingType = GetItemLinkCraftingSkillType(itemLink)
  if (KNOWN_DECON_CRAFT_TYPES.has(craftingType)) return craftingType

  const [filterType1, filterType2] = GetItemLinkFilterTypeInfo(itemLink)
  if (filterType1 === ITEMFILTERTYPE_JEWELRY || filterType2 === ITEMFILTERTYPE_JEWELRY) {
    return CRAFTING_TYPE_JEWELRYCRAFTING
  }

  const armorType = GetItemLinkArmorType(itemLink)
  if (armorType === ARMORTYPE_HEAVY) return CRAFTING_TYPE_BLACKSMITHING
  if (armorType === ARMORTYPE_LIGHT || armorType === ARMORTYPE_MEDIUM) return CRAFTING_TYPE_CLOTHIER

  const weaponType = GetItemLinkWeaponType(itemLink)
  if (weaponType !== WEAPONTYPE_NONE) {
    if (
      weaponType === WEAPONTYPE_BOW ||
      weaponType === WEAPONTYPE_SHIELD ||
      weaponType === WEAPONTYPE_FIRE_STAFF ||
      weaponType === WEAPONTYPE_FROST_STAFF ||
      weaponType === WEAPONTYPE_LIGHTNING_STAFF ||
      weaponType === WEAPONTYPE_HEALING_STAFF
    ) {
      return CRAFTING_TYPE_WOODWORKING
    }
    return CRAFTING_TYPE_BLACKSMITHING
  }

  return CRAFTING_TYPE_INVALID
}

export const DECON_CRAFT_TYPES = [
  CRAFTING_TYPE_BLACKSMITHING,
  CRAFTING_TYPE_CLOTHIER,
  CRAFTING_TYPE_WOODWORKING,
  CRAFTING_TYPE_ENCHANTING,
  CRAFTING_TYPE_JEWELRYCRAFTING,
]

export const CRAFT_TYPE_TO_NON_COMBAT_BONUS = new LuaMap<number, number>()
CRAFT_TYPE_TO_NON_COMBAT_BONUS.set(
  CRAFTING_TYPE_BLACKSMITHING,
  NON_COMBAT_BONUS_BLACKSMITHING_LEVEL
)
CRAFT_TYPE_TO_NON_COMBAT_BONUS.set(CRAFTING_TYPE_CLOTHIER, NON_COMBAT_BONUS_CLOTHIER_LEVEL)
CRAFT_TYPE_TO_NON_COMBAT_BONUS.set(CRAFTING_TYPE_WOODWORKING, NON_COMBAT_BONUS_WOODWORKING_LEVEL)
CRAFT_TYPE_TO_NON_COMBAT_BONUS.set(CRAFTING_TYPE_ENCHANTING, NON_COMBAT_BONUS_ENCHANTING_LEVEL)
CRAFT_TYPE_TO_NON_COMBAT_BONUS.set(
  CRAFTING_TYPE_JEWELRYCRAFTING,
  NON_COMBAT_BONUS_JEWELRYCRAFTING_LEVEL
)

export function captureCraftingLevels(): undefined {
  const sv = getSavedVariables()
  if (!sv.craftingLevels) sv.craftingLevels = {}
  const charId = GetCurrentCharacterId()
  const levels: Record<number, number> = {}
  for (const craftType of DECON_CRAFT_TYPES) {
    const nonCombatType = CRAFT_TYPE_TO_NON_COMBAT_BONUS.get(craftType)
    if (nonCombatType === undefined) continue
    const level = GetNonCombatBonus(nonCombatType)
    levels[craftType] = level
  }
  sv.craftingLevels[charId] = levels
}

export function isDeconUsefulForCurrent(craftingType: number): boolean {
  const sv = getSavedVariables()
  if (!sv.craftingLevels) return false
  const charId = GetCurrentCharacterId()
  const levels = sv.craftingLevels[charId]
  if (!levels) return false
  const level = levels[craftingType]
  if (level === undefined) return false
  return isCraftingRankBelowCap(level, craftingType)
}

export function isDeconUsefulForAny(craftingType: number): boolean {
  const sv = getSavedVariables()
  if (!sv.craftingLevels) return false
  for (const [, levels] of Object.entries(sv.craftingLevels)) {
    const level = levels[craftingType]
    if (level !== undefined && isCraftingRankBelowCap(level, craftingType)) return true
  }
  return false
}

export function isDeconUsefulForCharacter(craftingType: number, charId: string): boolean {
  const sv = getSavedVariables()
  if (!sv.craftingLevels) return false
  const levels = sv.craftingLevels[charId]
  if (!levels) return false
  const level = levels[craftingType]
  if (level === undefined) return false
  return isCraftingRankBelowCap(level, craftingType)
}

export function characterNeedsTrait(
  charData: Record<string, unknown>,
  craftingType: number,
  traitName: string
): boolean {
  const traitResearch = asObjectRecord(charData["traitResearch"])
  if (!traitResearch) return false
  const craftData = asObjectRecord(traitResearch[craftingType])
  if (!craftData) return false
  const lines = asObjectRecord(craftData["lines"])
  if (!lines) return false
  for (const lineData of Object.values(lines)) {
    const line = asObjectRecord(lineData)
    if (!line) continue
    const traits = asObjectRecord(line["traits"])
    if (!traits) continue
    for (const traitData of Object.values(traits)) {
      const trait = asObjectRecord(traitData)
      if (!trait) continue
      if (trait["name"] === traitName && !trait["known"]) return true
    }
  }
  return false
}

export function isItemResearchable(itemLink: string, scope?: CharacterScope): boolean {
  if (scope == null || scope === "current-character") {
    return CanItemLinkBeTraitResearched(itemLink)
  }

  if (scope.substring(0, 10) === "character:") {
    const charId = scope.substring(10)
    const currentId = tostring(GetCurrentCharacterId())
    if (charId === currentId) return CanItemLinkBeTraitResearched(itemLink)

    const characters = getTemperCharactersData()
    if (!characters) return CanItemLinkBeTraitResearched(itemLink)

    const charData = asObjectRecord(characters[charId])
    if (!charData) return false

    const traitType = GetItemLinkTraitType(itemLink)
    if (traitType === 0) return false
    const craftingType = GetItemLinkCraftingSkillType(itemLink)
    if (craftingType === 0) return false
    const traitName = GetString("SI_ITEMTRAITTYPE", traitType)

    return characterNeedsTrait(charData, craftingType, traitName)
  }

  const characters = getTemperCharactersData()
  if (!characters) {
    return CanItemLinkBeTraitResearched(itemLink)
  }

  const traitType = GetItemLinkTraitType(itemLink)
  if (traitType === 0) return false

  const craftingType = GetItemLinkCraftingSkillType(itemLink)
  if (craftingType === 0) return false

  const traitName = GetString("SI_ITEMTRAITTYPE", traitType)

  for (const charData of Object.values(characters)) {
    const char = asObjectRecord(charData)
    if (!char) continue
    if (characterNeedsTrait(char, craftingType, traitName)) return true
  }
  return false
}
