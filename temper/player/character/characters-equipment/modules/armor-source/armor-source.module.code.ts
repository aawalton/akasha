import type { ArmorTypeId } from "akasha/temper/catalog/gear/equipment/kind/modules/armor-types/armor-types.module.code.ts"
import type { ArmorTraitId } from "akasha/temper/catalog/gear/equipment/modules/armor-traits/armor-traits.module.code.ts"
import type { ArmorWeightId } from "akasha/temper/catalog/gear/equipment/modules/armor-weight-ids/armor-weight-ids.module.code.ts"
import {
  type ArmorEnchantId,
  getArmorEnchantmentEffects,
} from "akasha/temper/player/character/characters-equipment/modules/armor-enchants/armor-enchants.module.code.ts"
import { getArmorTraitEffects } from "akasha/temper/player/character/characters-equipment/modules/armor-trait-effects/armor-trait-effects.module.code.ts"
import { getArmorEffects } from "akasha/temper/player/character/characters-equipment/modules/armor-weights/armor-weights.module.code.ts"
import type { ArmorItem } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import type {
  Effect,
  MetricEffect,
} from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import type { EffectSourceInterface } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"

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
