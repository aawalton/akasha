import {
  type EquipmentQualityId,
  resolveQuality,
} from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import { armorTraitWorth } from "akasha/temper/catalog/gear/equipment/modules/armor-traits/armor-traits.module.code.ts"
import { traitEffectsAt } from "akasha/temper/catalog/gear/equipment/modules/trait-reading/trait-reading.module.code.ts"
import type { ArmorItem } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import type { MetricEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"

const SHARE_UNITS = 100_000

function divinesTenths(armorItems: readonly ArmorItem[]): number {
  let units = 0
  for (const piece of armorItems) {
    if (piece.trait === "divines") {
      const share = armorTraitWorth("divines", resolveQuality(piece.quality), true)
      units += Math.round(share * SHARE_UNITS)
    }
  }
  return Math.round(units / 100)
}

export function calculateDivinesValue(baseValue: number, armorItems: readonly ArmorItem[]): number {
  return Math.floor((baseValue * (1000 + divinesTenths(armorItems))) / 1000)
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
