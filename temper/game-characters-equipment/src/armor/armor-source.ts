import type { EffectSourceInterface } from "@temper/shared-formula-framework/effect-source"
import type { Effect, MetricEffect } from "@temper/shared-formula-framework/effects-types"
import { type ArmorEnchantId, getArmorEnchantmentEffects } from "../enchants/armor-enchants-data"
import type { ArmorItem } from "../item-composites"
import type { ArmorTraitId } from "../traits/armor-traits-data"
import { getArmorTraitEffects } from "../traits/armor-traits-data"
import type { ArmorTypeId } from "./armor-types-data"
import type { ArmorWeightId } from "./armor-weights-data"
import { getArmorEffects } from "./armor-weights-data"

interface ArmorItemSource extends EffectSourceInterface<"armor", Effect> {
  categoryId: "armor"
  type: ArmorTypeId
  weight: ArmorWeightId | null
  trait: ArmorTraitId | null
  enchantment: ArmorEnchantId | null
}

export function createArmorSource(armor: ArmorItem): ArmorItemSource {
  const effects: MetricEffect[] = [
    ...getArmorEffects(armor),
    ...getArmorTraitEffects(armor),
    ...getArmorEnchantmentEffects(armor),
  ]

  return {
    id: `armor-${armor.type}` as const,
    categoryId: "armor" as const,
    type: armor.type,
    weight: armor.weight,
    trait: armor.trait,
    enchantment: armor.enchantment,
    effects,
  }
}
