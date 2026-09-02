import type { EffectSourceInterface } from "@akasha/temper-formula-framework/effect-source"
import type { Effect, MetricEffect } from "@akasha/temper-formula-framework/effect"
import { type ArmorEnchantId, getArmorEnchantmentEffects } from "../enchants/armor-enchants-data"
import type { ArmorItem } from "../item-composites"
import type { ArmorTraitId } from "../traits/armor-traits-data"
import { getArmorTraitEffects } from "../traits/armor-traits-data"
import type { ArmorTypeId } from "@akasha/temper-equipment-kinds/armor-types"
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
