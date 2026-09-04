import type { StandardArmorWeightId } from "@akasha/temper-equipment/armor-weight-ids"
import type { EquipmentPattern } from "@akasha/temper-equipment/set-patterns"
import type { SetTemplate } from "@akasha/temper-equipment/set-template"
import type { WeaponTypeId } from "@akasha/temper-equipment/weapon-type-ids"
import type { ArmorSlotId } from "@akasha/temper-equipment-kinds/armor-slots"
import type { JewelrySlotId } from "@akasha/temper-equipment-kinds/jewelry-slots"
import type { WeaponSlot } from "@akasha/temper-equipment-kinds/weapon-slots"
import {
  type EquipmentType,
  isJewelryType,
  isStandardArmorType,
  isWeaponType,
} from "../set-equipment-types/set-equipment-types.module.code.ts"

function matchesEquipmentPattern(
  pattern: EquipmentPattern,
  slot: ArmorSlotId | JewelrySlotId | WeaponSlot,
  type: EquipmentType | null,
  weight?: StandardArmorWeightId | null
): boolean {
  if (pattern === "*") {
    return true
  }

  if (pattern === "monster") {
    return slot === "head" || slot === "shoulders"
  }

  if (pattern.startsWith("*:")) {
    const patternWeight = pattern.slice(2)
    if (type != null && isStandardArmorType(type)) {
      return weight === patternWeight
    }
    return true
  }

  if (pattern === "armor:*") {
    return type !== null && isStandardArmorType(type)
  }

  if (pattern.startsWith("armor:")) {
    const patternWeight = pattern.slice(6)
    return type !== null && isStandardArmorType(type) && weight === patternWeight
  }

  if (pattern === "weapon:*") {
    return (type !== null && isWeaponType(type)) || type === "shield"
  }

  if (pattern === "jewelry:*") {
    return type !== null && isJewelryType(type)
  }

  if (pattern.includes(":") && !pattern.startsWith("armor:") && !pattern.startsWith("*:")) {
    const [slotPart, weightPart] = pattern.split(":")

    if (slotPart !== undefined && isStandardArmorType(slotPart)) {
      if (weightPart === "*") {
        return type === slotPart
      }
      return type === slotPart && weight === weightPart
    }
  }

  if (type === pattern) {
    return true
  }

  if (pattern === "ring" && (slot === "ring-1" || slot === "ring-2")) {
    return true
  }

  return false
}

export function isSetValidForSlot(
  set: SetTemplate,
  slot: ArmorSlotId | JewelrySlotId | WeaponSlot,
  type: EquipmentType | null,
  weight?: StandardArmorWeightId | null
): boolean {
  return set.valid.some((pattern) => matchesEquipmentPattern(pattern, slot, type, weight))
}

export function getValidSetsForSlot(
  sets: readonly SetTemplate[],
  slot: ArmorSlotId | JewelrySlotId | WeaponSlot,
  type: EquipmentType | null,
  weight?: StandardArmorWeightId | null
): readonly SetTemplate[] {
  return sets.filter((set) => isSetValidForSlot(set, slot, type, weight))
}

export function isSetValidForArmorSlot(set: SetTemplate, slot: ArmorSlotId): boolean {
  return (
    isSetValidForSlot(set, slot, slot, null) ||
    isSetValidForSlot(set, slot, slot, "light") ||
    isSetValidForSlot(set, slot, slot, "medium") ||
    isSetValidForSlot(set, slot, slot, "heavy")
  )
}

export function getValidSetsForArmorSlot(
  sets: readonly SetTemplate[],
  slot: ArmorSlotId
): readonly SetTemplate[] {
  return sets.filter((set) => isSetValidForArmorSlot(set, slot))
}

export function getValidWeightsForSet(
  set: SetTemplate,
  slot: ArmorSlotId
): readonly StandardArmorWeightId[] {
  const allWeights: StandardArmorWeightId[] = ["light", "medium", "heavy"]
  const validWeights: StandardArmorWeightId[] = []

  for (const weight of allWeights) {
    if (isSetValidForSlot(set, slot, slot, weight)) {
      validWeights.push(weight)
    }
  }

  return validWeights
}

export function getValidTypesForSet(set: SetTemplate, slot: WeaponSlot): readonly WeaponTypeId[] {
  const allWeaponTypes: WeaponTypeId[] = [
    "sword",
    "axe",
    "mace",
    "dagger",
    "greatsword",
    "battleaxe",
    "maul",
    "bow",
    "inferno-staff",
    "ice-staff",
    "lightning-staff",
    "restoration-staff",
  ]

  const validTypes: WeaponTypeId[] = []

  for (const weaponType of allWeaponTypes) {
    if (isSetValidForSlot(set, slot, weaponType, null)) {
      validTypes.push(weaponType)
    }
  }

  return validTypes
}

export function isShieldValidForSet(set: SetTemplate): boolean {
  return isSetValidForSlot(set, "off-hand", "shield", null)
}
