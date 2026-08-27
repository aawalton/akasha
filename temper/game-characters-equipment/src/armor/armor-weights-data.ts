import { assertNever } from "../../../../shared/utils-narrow/src/assert-never"
import { createDataFile } from "@shared/utils-narrow/create-data-file"
import type { MetricEffect } from "@temper/shared-formula-framework/effects-types"
import type { ArmorItem, ItemLevel } from "../item-composites"
import { getArmorBaseValueForLevel } from "../level-scaling"
import { type EquipmentQualityId, resolveQuality } from "../quality-data"
import { calculateNirnhonedValue, calculateReinforcedValue } from "../traits/armor-traits-data"
import { type ArmorTypeId, getArmorMultiplier } from "./armor-types-data"
import {
  STANDARD_TEMPER_ARMOR_WEIGHTS_BY_ID,
  TEMPER_ARMOR_WEIGHTS_BY_ID,
} from "./generated/temper-armor-weight.generated"

export interface ArmorWeightTemplate {
  id: string
  name: string
  baseValue: number
  skillLineId:
    | "no-skill-line"
    | "armor-light-armor"
    | "armor-medium-armor"
    | "armor-heavy-armor"
    | "weapon-one-hand-and-shield"
  isStandard: boolean
}

export const armorWeights = createDataFile<ArmorWeightTemplate>()(TEMPER_ARMOR_WEIGHTS_BY_ID)

export const standardArmorWeights = createDataFile<ArmorWeightTemplate>()(
  STANDARD_TEMPER_ARMOR_WEIGHTS_BY_ID
)

export type ArmorWeightId = (typeof armorWeights.ids)[number]

export type StandardArmorWeightId = (typeof standardArmorWeights.ids)[number]

const BASE_ARMOR_QUALITY_VALUES: Record<ArmorWeightId, Record<EquipmentQualityId, number>> = {
  "no-weight": { normal: 0, fine: 0, superior: 0, epic: 0, legendary: 0 },
  light: { normal: 158.5, fine: 164.5, superior: 164.5, epic: 168.5, legendary: 174.5 },
  medium: { normal: 236.5, fine: 245.5, superior: 245.5, epic: 251.5, legendary: 260.5 },
  heavy: { normal: 314.5, fine: 326.5, superior: 326.5, epic: 334.5, legendary: 346.5 },
  shield: { normal: 1560, fine: 1620, superior: 1620, epic: 1660, legendary: 1720 },
}

function getArmorValue(
  type: ArmorTypeId,
  weight: ArmorWeightId,
  quality: EquipmentQualityId = "legendary",
  level?: ItemLevel
): number {
  let baseValue: number
  if (
    level !== undefined &&
    (weight === "light" || weight === "medium" || weight === "heavy" || weight === "shield")
  ) {
    baseValue = getArmorBaseValueForLevel(level, weight, quality)
  } else {
    baseValue = BASE_ARMOR_QUALITY_VALUES[weight][quality]
  }

  const multiplier = getArmorMultiplier(type)

  return Math.floor(baseValue * multiplier)
}

export function getArmorEffects(armor: ArmorItem): readonly MetricEffect[] {
  if (armor.weight === "no-weight") {
    return []
  }

  const quality = resolveQuality(armor.quality)

  const armorValue = getArmorValue(armor.type, armor.weight, quality, armor.level)

  let totalArmorValue = armorValue

  switch (armor.trait) {
    case "reinforced":
      totalArmorValue = calculateReinforcedValue(armorValue, quality)
      break
    case "nirnhoned":
      totalArmorValue = calculateNirnhonedValue(armorValue, quality)
      break
    case "no-trait":
    case "divines":
    case "impenetrable":
    case "infused":
    case "invigorating":
    case "sturdy":
    case "training":
    case "well-fitted":
    case "ornate":
    case "intricate":
      break
    default:
      assertNever(armor.trait)
  }

  return [
    {
      metricId: "resistance" as const,
      effectType: "integer" as const,
      effectValue: totalArmorValue,
    },
  ]
}
