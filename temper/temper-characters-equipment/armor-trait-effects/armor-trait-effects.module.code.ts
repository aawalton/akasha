import { ARMOR_TRAIT_QUALITY_VALUES, armorTraits } from "@akasha/temper-equipment/armor-traits"
import {
  type EquipmentQualityId,
  resolveQuality,
} from "@akasha/temper-equipment-kinds/equipment-qualities"
import type { MetricEffect } from "@akasha/temper-formula-framework/effect"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { ArmorItem } from "../item-composites/item-composites.module.code.ts"

export function calculateDivinesValue(baseValue: number, armorItems: readonly ArmorItem[]): number {
  let totalDivinesBonus = 0

  for (const piece of armorItems) {
    if (piece.trait === "divines") {
      const quality = resolveQuality(piece.quality)
      totalDivinesBonus += Math.floor(baseValue * ARMOR_TRAIT_QUALITY_VALUES.divines[quality])
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
          effectValue: ARMOR_TRAIT_QUALITY_VALUES.impenetrable[quality],
        },
      ]

    case "invigorating": {
      const value = ARMOR_TRAIT_QUALITY_VALUES.invigorating[quality]
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
          effectValue: -ARMOR_TRAIT_QUALITY_VALUES.sturdy[quality],
        },
      ]

    case "training":
      return [
        {
          metricId: "experience-gain" as const,
          effectType: "fractional-change",
          effectValue: ARMOR_TRAIT_QUALITY_VALUES.training[quality],
        },
      ]

    case "well-fitted": {
      const value = -ARMOR_TRAIT_QUALITY_VALUES["well-fitted"][quality]
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

export function calculateReinforcedValue(
  baseValue: number,
  quality: EquipmentQualityId = "legendary"
): number {
  const bonus = ARMOR_TRAIT_QUALITY_VALUES.reinforced[quality]
  return baseValue + Math.floor(baseValue * bonus)
}

export function calculateNirnhonedValue(
  baseValue: number,
  quality: EquipmentQualityId = "legendary"
): number {
  return baseValue + ARMOR_TRAIT_QUALITY_VALUES.nirnhoned[quality]
}
