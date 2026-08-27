import { assertNever } from "../../../../shared/utils-narrow/src/assert-never"
import { createDataFile } from "@shared/utils-narrow/create-data-file"
import type { MetricEffect } from "@temper/shared-formula-framework/effects-types"
import type { ArmorItem } from "../item-composites"
import { type EquipmentQualityId, resolveQuality } from "../quality-data"
import {
  TEMPER_ARMOR_TRAIT_QUALITY_VALUES,
  TEMPER_ARMOR_TRAITS_BY_ID,
} from "./generated/temper-armor-trait.generated"

export type ArmorTraitQualityValues = Record<EquipmentQualityId, number>

export interface ArmorTraitTemplate {
  id: string
  name: string
  esoTraitConstantName: string
  material: string
  effect: string
  effects: readonly MetricEffect[]
}

export const armorTraits = createDataFile<ArmorTraitTemplate>()(TEMPER_ARMOR_TRAITS_BY_ID)

export type ArmorTraitId = (typeof armorTraits.ids)[number]

const NON_BUILD_ARMOR_TRAITS = new Set(["ornate", "intricate"])
export const armorTraitsBuildList = armorTraits.list.filter(
  (t) => !NON_BUILD_ARMOR_TRAITS.has(t.id)
)

export function calculateDivinesValue(baseValue: number, armorItems: readonly ArmorItem[]): number {
  let totalDivinesBonus = 0

  for (const piece of armorItems) {
    if (piece.trait === "divines") {
      const quality = resolveQuality(piece.quality)
      totalDivinesBonus += Math.floor(
        baseValue * TEMPER_ARMOR_TRAIT_QUALITY_VALUES.divines[quality]
      )
    }
  }

  return baseValue + totalDivinesBonus
}

export function getArmorTraitEffects(armor: ArmorItem): readonly MetricEffect[] {
  if (armor.trait === "no-trait" || armor.weight === "no-weight") {
    return []
  }

  const quality = resolveQuality(armor.quality)
  const traitConfig = armorTraits.data[armor.trait]
  if (!traitConfig) return []

  switch (armor.trait) {
    case "impenetrable":
      return [
        {
          metricId: "resistance-critical" as const,
          effectType: "integer",
          effectValue: TEMPER_ARMOR_TRAIT_QUALITY_VALUES.impenetrable[quality],
        },
      ]

    case "invigorating": {
      const value = TEMPER_ARMOR_TRAIT_QUALITY_VALUES.invigorating[quality]
      return [
        { metricId: "health-recovery" as const, effectType: "integer", effectValue: value },
        { metricId: "magicka-recovery" as const, effectType: "integer", effectValue: value },
        { metricId: "stamina-recovery" as const, effectType: "integer", effectValue: value },
      ]
    }

    case "sturdy":
      return [
        {
          metricId: "stamina-block-cost" as const,
          effectType: "fractional-change",
          effectValue: -TEMPER_ARMOR_TRAIT_QUALITY_VALUES.sturdy[quality],
        },
      ]

    case "training":
      return [
        {
          metricId: "experience-gain" as const,
          effectType: "fractional-change",
          effectValue: TEMPER_ARMOR_TRAIT_QUALITY_VALUES.training[quality],
        },
      ]

    case "well-fitted": {
      const value = -TEMPER_ARMOR_TRAIT_QUALITY_VALUES["well-fitted"][quality]
      return [
        {
          metricId: "stamina-sprint-cost" as const,
          effectType: "fractional-change",
          effectValue: value,
        },
        {
          metricId: "stamina-dodge-cost" as const,
          effectType: "fractional-change",
          effectValue: value,
        },
      ]
    }

    case "divines":
    case "infused":
    case "nirnhoned":
    case "reinforced":
    case "ornate":
    case "intricate":
      return traitConfig.effects

    default:
      return assertNever(armor.trait)
  }
}

export function getInfusedArmorBonus(quality: EquipmentQualityId = "legendary"): number {
  return TEMPER_ARMOR_TRAIT_QUALITY_VALUES.infused[quality]
}

export function calculateReinforcedValue(
  baseValue: number,
  quality: EquipmentQualityId = "legendary"
): number {
  const bonus = TEMPER_ARMOR_TRAIT_QUALITY_VALUES.reinforced[quality]
  return baseValue + Math.floor(baseValue * bonus)
}

export function calculateNirnhonedValue(
  baseValue: number,
  quality: EquipmentQualityId = "legendary"
): number {
  return baseValue + TEMPER_ARMOR_TRAIT_QUALITY_VALUES.nirnhoned[quality]
}
