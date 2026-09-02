import { assertNever } from "@akasha/utils-narrow/assert-never"
import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { MetricEffect } from "@akasha/temper-formula-framework/effect"
import { updateEffectValue } from "@akasha/temper-formula-framework/effect-value-update"
import { isLargeArmorEnchantSlot } from "@akasha/temper-equipment-kinds/armor-types"
import type { ArmorItem } from "../item-composites"
import { type EquipmentQualityId, minQuality, resolveQuality } from "@akasha/temper-equipment-kinds/equipment-qualities"
import { getInfusedArmorBonus } from "../traits/armor-traits-data"
import {
  TEMPER_ARMOR_ENCHANT_QUALITY_VALUES,
  TEMPER_ARMOR_ENCHANTS_BY_ID,
} from "./generated/temper-armor-enchant.generated"

export type ArmorEnchantQualityValues = Record<EquipmentQualityId, number>

export type ArmorEnchantQualityComponents = Readonly<Record<string, ArmorEnchantQualityValues>>

export interface ArmorEnchantTemplate {
  id: string
  name: string
  glyphName: string
  essenceRune: string
  effect: string
  effects: readonly MetricEffect[]
  esoEnchantConstantName: string
}

export const armorEnchants = createDataFile<ArmorEnchantTemplate>()(TEMPER_ARMOR_ENCHANTS_BY_ID)

export type ArmorEnchantId = (typeof armorEnchants.ids)[number]

const SMALL_PIECE_MULTIPLIER = 0.4045

function scaleIntegerEffectValue(value: number, isLarge: boolean): number {
  return isLarge ? value : Math.round(value * SMALL_PIECE_MULTIPLIER)
}

export function getArmorEnchantmentEffects(armor: ArmorItem): readonly MetricEffect[] {
  const enchantConfig = armorEnchants.data[armor.enchantment]
  if (!enchantConfig) {
    return []
  }

  const isLarge = isLargeArmorEnchantSlot(armor.type)

  const itemQuality = resolveQuality(armor.quality)
  const enchantQuality = minQuality(armor.enchantmentQuality ?? "legendary", itemQuality)

  let effects: MetricEffect[]

  switch (armor.enchantment) {
    case "health": {
      const largeValue = TEMPER_ARMOR_ENCHANT_QUALITY_VALUES.health.health[enchantQuality]
      const value = scaleIntegerEffectValue(largeValue, isLarge)
      effects = [
        {
          metricId: "health-maximum" as const,
          effectType: "integer" as const,
          effectValue: value,
        },
      ]
      break
    }

    case "magicka": {
      const largeValue = TEMPER_ARMOR_ENCHANT_QUALITY_VALUES.magicka.magicka[enchantQuality]
      const value = scaleIntegerEffectValue(largeValue, isLarge)
      effects = [
        {
          metricId: "magicka-maximum" as const,
          effectType: "integer" as const,
          effectValue: value,
        },
      ]
      break
    }

    case "stamina": {
      const largeValue = TEMPER_ARMOR_ENCHANT_QUALITY_VALUES.stamina.stamina[enchantQuality]
      const value = scaleIntegerEffectValue(largeValue, isLarge)
      effects = [
        {
          metricId: "stamina-maximum" as const,
          effectType: "integer" as const,
          effectValue: value,
        },
      ]
      break
    }

    case "prismatic-defense": {
      const prismaticComponents = TEMPER_ARMOR_ENCHANT_QUALITY_VALUES["prismatic-defense"]
      const healthLarge = prismaticComponents["prismatic-health"][enchantQuality]
      const resourceLarge = prismaticComponents["prismatic-resource"][enchantQuality]
      const healthValue = scaleIntegerEffectValue(healthLarge, isLarge)
      const resourceValue = scaleIntegerEffectValue(resourceLarge, isLarge)
      effects = [
        {
          metricId: "health-maximum" as const,
          effectType: "integer" as const,
          effectValue: healthValue,
        },
        {
          metricId: "magicka-maximum" as const,
          effectType: "integer" as const,
          effectValue: resourceValue,
        },
        {
          metricId: "stamina-maximum" as const,
          effectType: "integer" as const,
          effectValue: resourceValue,
        },
      ]
      break
    }

    case "no-enchant":
      effects = enchantConfig.effects.map((effect) => {
        if (!isLarge && effect.effectType === "integer") {
          return {
            ...effect,
            effectValue: Math.round(effect.effectValue * SMALL_PIECE_MULTIPLIER),
          }
        }
        return effect
      })
      break

    default:
      assertNever(armor.enchantment)
  }

  if (armor.trait === "infused") {
    const infusedBonus = getInfusedArmorBonus(itemQuality)
    return effects.map((effect) =>
      updateEffectValue(effect, (value) => value + Math.floor(value * infusedBonus))
    )
  }

  return effects
}
