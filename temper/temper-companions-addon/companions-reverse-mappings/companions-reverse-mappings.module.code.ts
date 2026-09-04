import "@akasha/temper-eso-types/tstl-eso-sandbox"
import {
  ARMOR_TRAIT_TO_INDEX,
  ARMOR_TYPE_TO_INDEX,
  JEWELRY_TRAIT_TO_INDEX,
  QUALITY_TO_INDEX,
  WEAPON_TRAIT_TO_INDEX,
  WEAPON_TYPE_TO_INDEX,
} from "@akasha/temper-bit-codec/equipment-mappings"
import { SKILL_ABILITY_ID_TO_INDEX } from "../companions-skill-map/companions-skill-map.module.code.ts"

export const INDEX_TO_ARMOR_WEIGHT: string[] = ["", "Light", "Medium", "Heavy"]

export const INDEX_TO_TRAIT: string[] = [
  "No Trait",
  "Aggressive",
  "Augmented",
  "Bolstered",
  "Focused",
  "Prolific",
  "Quickened",
  "Shattering",
  "Soothing",
  "Vigorous",
]

export const INDEX_TO_WEAPON_TYPE: string[] = [
  "",
  "Sword",
  "Axe",
  "Mace",
  "Dagger",
  "Greatsword",
  "Battleaxe",
  "Maul",
  "Bow",
  "Inferno Staff",
  "Ice Staff",
  "Lightning Staff",
  "Restoration Staff",
  "Shield",
]

export const INDEX_TO_QUALITY_COLOR: [number, number, number][] = [
  [0.5, 0.5, 0.5],
  [1, 1, 1],
  [0.12, 0.76, 0.12],
  [0.24, 0.49, 0.92],
  [0.65, 0.28, 0.86],
  [0.98, 0.86, 0.24],
]

export const INDEX_TO_SKILL_ABILITY_ID: number[] = []

for (const [abilityIdStr, skillIndex] of Object.entries(SKILL_ABILITY_ID_TO_INDEX)) {
  const abilityId = tonumber(abilityIdStr)
  if (abilityId !== undefined) {
    INDEX_TO_SKILL_ABILITY_ID[skillIndex] = abilityId
  }
}

export const INDEX_TO_ARMOR_TYPE_CONST: number[] = []
for (const [esoConstStr, idx] of Object.entries(ARMOR_TYPE_TO_INDEX)) {
  const esoConst = tonumber(esoConstStr)
  if (esoConst !== undefined) {
    INDEX_TO_ARMOR_TYPE_CONST[idx] = esoConst
  }
}

export const INDEX_TO_ARMOR_TRAIT: number[] = []
for (const [esoConstStr, idx] of Object.entries(ARMOR_TRAIT_TO_INDEX)) {
  const esoConst = tonumber(esoConstStr)
  if (esoConst !== undefined) {
    INDEX_TO_ARMOR_TRAIT[idx] = esoConst
  }
}

export const INDEX_TO_JEWELRY_TRAIT: number[] = []
for (const [esoConstStr, idx] of Object.entries(JEWELRY_TRAIT_TO_INDEX)) {
  const esoConst = tonumber(esoConstStr)
  if (esoConst !== undefined) {
    INDEX_TO_JEWELRY_TRAIT[idx] = esoConst
  }
}

export const INDEX_TO_WEAPON_TRAIT: number[] = []
for (const [esoConstStr, idx] of Object.entries(WEAPON_TRAIT_TO_INDEX)) {
  const esoConst = tonumber(esoConstStr)
  if (esoConst !== undefined) {
    INDEX_TO_WEAPON_TRAIT[idx] = esoConst
  }
}

export const INDEX_TO_WEAPON_TYPE_CONST: number[] = []
for (const [esoConstStr, idx] of Object.entries(WEAPON_TYPE_TO_INDEX)) {
  const esoConst = tonumber(esoConstStr)
  if (esoConst !== undefined) {
    INDEX_TO_WEAPON_TYPE_CONST[idx] = esoConst
  }
}

export const INDEX_TO_QUALITY: number[] = []
for (const [esoConstStr, idx] of Object.entries(QUALITY_TO_INDEX)) {
  const esoConst = tonumber(esoConstStr)
  if (esoConst !== undefined) {
    INDEX_TO_QUALITY[idx] = esoConst
  }
}

export function getArmorTypeFromIndex(idx: number): number {
  return INDEX_TO_ARMOR_TYPE_CONST[idx] ?? ARMORTYPE_NONE
}

export function getArmorTraitFromIndex(idx: number): number {
  return INDEX_TO_ARMOR_TRAIT[idx] ?? ITEM_TRAIT_TYPE_NONE
}

export function getJewelryTraitFromIndex(idx: number): number {
  return INDEX_TO_JEWELRY_TRAIT[idx] ?? ITEM_TRAIT_TYPE_NONE
}

export function getWeaponTraitFromIndex(idx: number): number {
  return INDEX_TO_WEAPON_TRAIT[idx] ?? ITEM_TRAIT_TYPE_NONE
}

export function getWeaponTypeFromIndex(idx: number): number {
  return INDEX_TO_WEAPON_TYPE_CONST[idx] ?? WEAPONTYPE_NONE
}

export function getQualityFromIndex(idx: number): number {
  return INDEX_TO_QUALITY[idx] ?? ITEM_DISPLAY_QUALITY_TRASH
}

export function formatArmorFromIndices(
  isEmpty: boolean,
  weightIndex: number,
  traitIndex: number
): string {
  if (isEmpty) return "Empty"

  const parts: string[] = []
  const weight = INDEX_TO_ARMOR_WEIGHT[weightIndex]
  if (weight !== undefined && weight !== "") parts.push(weight)
  const trait = INDEX_TO_TRAIT[traitIndex]
  if (trait !== undefined && traitIndex !== 0) parts.push(trait)

  return parts.length > 0 ? table.concat(parts, ", ") : "Unknown"
}

export function formatJewelryFromIndices(isEmpty: boolean, traitIndex: number): string {
  if (isEmpty) return "Empty"

  const trait = INDEX_TO_TRAIT[traitIndex]
  if (trait !== undefined && traitIndex !== 0) return trait

  return "No Trait"
}

export function formatWeaponFromIndices(
  isEmpty: boolean,
  typeIndex: number,
  traitIndex: number
): string {
  if (isEmpty) return "Empty"

  const parts: string[] = []
  const typeName = INDEX_TO_WEAPON_TYPE[typeIndex]
  if (typeName !== undefined && typeName !== "") parts.push(typeName)
  const trait = INDEX_TO_TRAIT[traitIndex]
  if (trait !== undefined && traitIndex !== 0) parts.push(trait)

  return parts.length > 0 ? table.concat(parts, ", ") : "Unknown"
}

export function getQualityColorFromIndex(qualityIndex: number): [number, number, number] {
  return INDEX_TO_QUALITY_COLOR[qualityIndex] ?? [1, 1, 1]
}

export function getAbilityIdFromSkillIndex(skillIndex: number): number {
  return INDEX_TO_SKILL_ABILITY_ID[skillIndex] ?? 0
}

export function isWeaponIndexTwoHanded(typeIndex: number): boolean {
  return typeIndex >= 5 && typeIndex <= 12
}
