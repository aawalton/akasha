import { resolveQuality } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import { jewelryTraitWorth } from "akasha/temper/catalog/gear/equipment/modules/jewelry-traits/jewelry-traits.module.code.ts"
import { traitEffectsAt } from "akasha/temper/catalog/gear/equipment/modules/trait-reading/trait-reading.module.code.ts"
import type { JewelryItem } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import type { MetricEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"

const FULL_POWER_ABOVE = 0.9

function calculateBloodthirstyValue(maxValue: number, targetHealth: number): number {
  const clampedHealth = Math.max(0, Math.min(1, targetHealth))

  if (clampedHealth >= FULL_POWER_ABOVE) {
    return 0
  }

  const scalingFactor = (FULL_POWER_ABOVE - clampedHealth) / FULL_POWER_ABOVE
  return Math.floor(maxValue * scalingFactor)
}

function calculateBloodthirstyEffects(
  targetHealth: number,
  maxPower: number
): readonly MetricEffect[] {
  const value = calculateBloodthirstyValue(maxPower, targetHealth)
  return [
    { metricId: "power-weapon" as const, effectType: "integer" as const, effectValue: value },
    { metricId: "power-spell" as const, effectType: "integer" as const, effectValue: value },
  ]
}

export function getJewelryTraitEffects(
  jewelry: JewelryItem,
  targetHealth: number = 1
): readonly MetricEffect[] {
  if (jewelry.trait === "no-trait") {
    return []
  }

  const quality = resolveQuality(jewelry.quality)

  if (jewelry.trait === "bloodthirsty") {
    return calculateBloodthirstyEffects(targetHealth, jewelryTraitWorth("bloodthirsty", quality))
  }

  return traitEffectsAt("jewelry", jewelry.trait, quality)
}
