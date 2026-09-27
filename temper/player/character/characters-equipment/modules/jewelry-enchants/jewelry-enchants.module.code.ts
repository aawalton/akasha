import {
  minQuality,
  resolveQuality,
} from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import type { JewelryEnchantId as JewelryEnchantPageSlug } from "akasha/temper/catalog/gear/equipment/kind/modules/gear-kind-ids/gear-kind-ids.data-table.code.ts"
import {
  enchantEffectsAt,
  enchantTable,
} from "akasha/temper/catalog/gear/equipment/modules/enchant-reading/enchant-reading.module.code.ts"
import { getInfusedJewelryBonus } from "akasha/temper/catalog/gear/equipment/modules/jewelry-traits/jewelry-traits.module.code.ts"
import type { JewelryItem } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import type { MetricEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import { updateEffectValue } from "akasha/temper/player/character/formula-framework/modules/effect-value-update/effect-value-update.module.code.ts"

export type JewelryEnchantId = JewelryEnchantPageSlug

export const jewelryEnchants = enchantTable<JewelryEnchantId>("jewelry")

export function getJewelryEnchantmentEffects(jewelry: JewelryItem): readonly MetricEffect[] {
  if (!jewelryEnchants.has(jewelry.enchantment)) return []

  const itemQuality = resolveQuality(jewelry.quality)
  const enchantQuality = minQuality(jewelry.enchantmentQuality ?? "legendary", itemQuality)
  const effects = enchantEffectsAt("jewelry", jewelry.enchantment, enchantQuality)

  if (jewelry.trait === "infused") {
    const infusedBonus = getInfusedJewelryBonus(itemQuality)
    return effects.map((effect) =>
      updateEffectValue(effect, (value) => value + Math.floor(value * infusedBonus))
    )
  }

  return effects
}
