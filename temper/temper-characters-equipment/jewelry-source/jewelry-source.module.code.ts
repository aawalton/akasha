import type { JewelryTraitId } from "@akasha/temper-equipment/jewelry-traits"
import type { JewelryTypeId } from "@akasha/temper-equipment-kinds/jewelry-types"
import type { Effect, MetricEffect } from "@akasha/temper-formula-framework/effect"
import type { EffectSourceInterface } from "@akasha/temper-formula-framework/effect-source"
import type { JewelryItem } from "../item-composites/item-composites.module.code.ts"
import {
  getJewelryEnchantmentEffects,
  type JewelryEnchantId,
} from "../jewelry-enchants/jewelry-enchants.module.code.ts"
import { getJewelryTraitEffects } from "../jewelry-trait-effects/jewelry-trait-effects.module.code.ts"

interface JewelryItemSource extends EffectSourceInterface<"jewelry", Effect> {
  categoryId: "jewelry"
  type: JewelryTypeId
  trait: JewelryTraitId | null
  enchantment: JewelryEnchantId | null
}

export function createJewelrySource(
  jewelry: JewelryItem,
  targetHealth?: number
): JewelryItemSource {
  const effects: MetricEffect[] = [
    ...getJewelryTraitEffects(jewelry, targetHealth),
    ...getJewelryEnchantmentEffects(jewelry),
  ]

  return {
    id: `jewelry-${jewelry.type}` as const,
    categoryId: "jewelry" as const,
    type: jewelry.type,
    trait: jewelry.trait,
    enchantment: jewelry.enchantment,
    effects,
  }
}
