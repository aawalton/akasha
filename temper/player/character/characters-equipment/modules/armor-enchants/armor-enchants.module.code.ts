import { armorEnchantShare } from "akasha/temper/catalog/gear/equipment/kind/modules/armor-types/armor-types.module.code.ts"
import {
  minQuality,
  resolveQuality,
} from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import type { ArmorEnchantId as ArmorEnchantPageSlug } from "akasha/temper/catalog/gear/equipment/kind/modules/gear-kind-ids/gear-kind-ids.data-table.code.ts"
import { getInfusedArmorBonus } from "akasha/temper/catalog/gear/equipment/modules/armor-traits/armor-traits.module.code.ts"
import {
  enchantEffectsAt,
  enchantTable,
} from "akasha/temper/catalog/gear/equipment/modules/enchant-reading/enchant-reading.module.code.ts"
import type { ArmorItem } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import type { MetricEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import { updateEffectValue } from "akasha/temper/player/character/formula-framework/modules/effect-value-update/effect-value-update.module.code.ts"

export type ArmorEnchantId = ArmorEnchantPageSlug

export const armorEnchants = enchantTable<ArmorEnchantId>("armor")

function onPiece(effect: MetricEffect, share: number): MetricEffect {
  if (effect.effectType !== "integer") return effect
  return { ...effect, effectValue: Math.round(effect.effectValue * share) }
}

export function getArmorEnchantmentEffects(armor: ArmorItem): readonly MetricEffect[] {
  if (!armorEnchants.has(armor.enchantment)) return []

  const itemQuality = resolveQuality(armor.quality)
  const enchantQuality = minQuality(armor.enchantmentQuality ?? "legendary", itemQuality)
  const graded = enchantEffectsAt("armor", armor.enchantment, enchantQuality)
  const share = armorEnchantShare(armor.type)
  const effects = graded.map((effect) => onPiece(effect, share))

  if (armor.trait === "infused") {
    const infusedBonus = getInfusedArmorBonus(itemQuality)
    return effects.map((effect) =>
      updateEffectValue(effect, (value) => value + Math.floor(value * infusedBonus))
    )
  }

  return effects
}
