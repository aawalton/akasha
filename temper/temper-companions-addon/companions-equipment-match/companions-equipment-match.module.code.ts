import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-12"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-08"
import type { CompanionBuildData } from "../companions-codec/companions-codec.module.code.ts"

export type EquipmentDimension = "presence" | "weight" | "type" | "trait" | "quality"

export type EquipmentSlotGroup = "armor" | "jewelry" | "weapons"

export interface SlotMismatch {
  group: EquipmentSlotGroup
  indexInGroup: number
  dimensions: EquipmentDimension[]
}

export interface EquipmentMatch {
  matchedCount: number
  mismatches: SlotMismatch[]
}

export const EQUIPMENT_SLOT_COUNT = 12

const ARMOR_SLOT_COUNT = 7
const JEWELRY_SLOT_COUNT = 3
const WEAPON_SLOT_COUNT = 2

function isBelowTargetQuality(currentIndex: number, targetIndex: number): boolean {
  return currentIndex < targetIndex
}

export function describeMismatch(slotLabel: string, dimensions: EquipmentDimension[]): string {
  return `${slotLabel}: ${dimensions.join(", ")}`
}

export function evaluateEquipmentMatch(
  current: CompanionBuildData,
  optimal: CompanionBuildData
): EquipmentMatch {
  const mismatches: SlotMismatch[] = []
  let matchedCount = 0

  for (let i = 0; i < ARMOR_SLOT_COUNT; i++) {
    const c = current.armor[i]
    const o = optimal.armor[i]
    const dimensions: EquipmentDimension[] = []
    if (c === undefined || o === undefined) {
      dimensions.push("presence")
    } else if (c.isEmpty !== o.isEmpty) {
      dimensions.push("presence")
    } else if (!c.isEmpty && !o.isEmpty) {
      if (c.weightIndex !== o.weightIndex) dimensions.push("weight")
      if (c.traitIndex !== o.traitIndex) dimensions.push("trait")
      if (isBelowTargetQuality(c.qualityIndex, o.qualityIndex)) dimensions.push("quality")
    }
    if (dimensions.length === 0) matchedCount++
    else mismatches.push({ group: "armor", indexInGroup: i, dimensions })
  }

  for (let i = 0; i < JEWELRY_SLOT_COUNT; i++) {
    const c = current.jewelry[i]
    const o = optimal.jewelry[i]
    const dimensions: EquipmentDimension[] = []
    if (c === undefined || o === undefined) {
      dimensions.push("presence")
    } else if (c.isEmpty !== o.isEmpty) {
      dimensions.push("presence")
    } else if (!c.isEmpty && !o.isEmpty) {
      if (c.traitIndex !== o.traitIndex) dimensions.push("trait")
      if (isBelowTargetQuality(c.qualityIndex, o.qualityIndex)) dimensions.push("quality")
    }
    if (dimensions.length === 0) matchedCount++
    else mismatches.push({ group: "jewelry", indexInGroup: i, dimensions })
  }

  for (let i = 0; i < WEAPON_SLOT_COUNT; i++) {
    const c = current.weapons[i]
    const o = optimal.weapons[i]
    const dimensions: EquipmentDimension[] = []
    if (c === undefined || o === undefined) {
      dimensions.push("presence")
    } else if (c.isEmpty !== o.isEmpty) {
      dimensions.push("presence")
    } else if (!c.isEmpty && !o.isEmpty) {
      if (c.typeIndex !== o.typeIndex) dimensions.push("type")
      if (c.traitIndex !== o.traitIndex) dimensions.push("trait")
      if (isBelowTargetQuality(c.qualityIndex, o.qualityIndex)) dimensions.push("quality")
    }
    if (dimensions.length === 0) matchedCount++
    else mismatches.push({ group: "weapons", indexInGroup: i, dimensions })
  }

  return { matchedCount, mismatches }
}
