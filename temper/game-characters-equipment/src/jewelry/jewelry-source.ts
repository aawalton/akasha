import type { EffectSourceInterface } from "@temper/shared-formula-framework/effect-source"
import type { Effect, MetricEffect } from "@temper/shared-formula-framework/effects-types"
import {
  getJewelryEnchantmentEffects,
  type JewelryEnchantId,
} from "../enchants/jewelry-enchants-data"
import type { JewelryItem } from "../item-composites"
import { getJewelryTraitEffects, type JewelryTraitId } from "../traits/jewelry-traits-data"
import type { JewelryTypeId } from "./jewelry-types-data"

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
