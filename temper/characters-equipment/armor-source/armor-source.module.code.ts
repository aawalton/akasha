import {
  type ArmorEnchantId,
  getArmorEnchantmentEffects,
} from "akasha/temper/characters-equipment/armor-enchants/armor-enchants.module.code.ts"
import { getArmorTraitEffects } from "akasha/temper/characters-equipment/armor-trait-effects/armor-trait-effects.module.code.ts"
import { getArmorEffects } from "akasha/temper/characters-equipment/armor-weights/armor-weights.module.code.ts"
import type { ArmorItem } from "akasha/temper/characters-equipment/item-composites/item-composites.module.code.ts"
import type { ArmorTraitId } from "akasha/temper/equipment/armor-traits/armor-traits.module.code.ts"
import type { ArmorWeightId } from "akasha/temper/equipment/armor-weight-ids/armor-weight-ids.module.code.ts"
import type { ArmorTypeId } from "akasha/temper/equipment-kinds/armor-types/armor-types.module.code.ts"
import type {
  Effect,
  MetricEffect,
} from "akasha/temper/formula-framework/effect/effect.module.code.ts"
import type { EffectSourceInterface } from "akasha/temper/formula-framework/effect-source/effect-source.module.code.ts"

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
