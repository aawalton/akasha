import {
  type EquipmentQualityId,
  resolveQuality,
} from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import { armorTraitWorth } from "akasha/temper/catalog/gear/equipment/modules/armor-traits/armor-traits.module.code.ts"
import { traitEffectsAt } from "akasha/temper/catalog/gear/equipment/modules/trait-reading/trait-reading.module.code.ts"
import type { ArmorItem } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import type { MetricEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"

const THOUSANDTHS = 1000

function inThousandths(value: number): number {
  return Math.round(value * THOUSANDTHS)
}

function divinesThousandths(armorItems: readonly ArmorItem[]): number {
  let units = 0
  for (const piece of armorItems) {
    if (piece.trait === "divines") {
      units += inThousandths(armorTraitWorth("divines", resolveQuality(piece.quality)))
    }
  }
  return units
}

export function calculateDivinesValue(
  baseValue: number,
  armorItems: readonly ArmorItem[],
  scale = 1
): number {
  const grown = Math.floor(
    (baseValue * (THOUSANDTHS + divinesThousandths(armorItems))) / THOUSANDTHS
  )
  return Math.floor((inThousandths(scale) * grown) / THOUSANDTHS)
}

export function getArmorTraitEffects(armor: ArmorItem): readonly MetricEffect[] {
  if (armor.trait === "no-trait" || armor.weight === "no-weight") {
    return []
  }
  return traitEffectsAt("armor", armor.trait, resolveQuality(armor.quality))
}

export function calculateReinforcedValue(
  baseValue: number,
  quality: EquipmentQualityId = "legendary"
): number {
  const bonus = armorTraitWorth("reinforced", quality)
  return baseValue + Math.floor(baseValue * bonus)
}

export function calculateNirnhonedValue(
  baseValue: number,
  quality: EquipmentQualityId = "legendary"
): number {
  return baseValue + armorTraitWorth("nirnhoned", quality)
}
