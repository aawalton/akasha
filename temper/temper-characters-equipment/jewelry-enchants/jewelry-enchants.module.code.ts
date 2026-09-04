import { getInfusedJewelryBonus } from "@akasha/temper-equipment/jewelry-traits"
import {
  type EquipmentQualityId,
  minQuality,
  resolveQuality,
} from "@akasha/temper-equipment-kinds/equipment-qualities"
import type { MetricEffect } from "@akasha/temper-formula-framework/effect"
import { updateEffectValue } from "@akasha/temper-formula-framework/effect-value-update"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { JewelryItem } from "../item-composites/item-composites.module.code.ts"
import {
  TEMPER_JEWELRY_ENCHANT_QUALITY_VALUES,
  TEMPER_JEWELRY_ENCHANTS_BY_ID,
} from "../jewelry-enchants-data/jewelry-enchants-data.module.code.ts"

export type JewelryEnchantQualityValues = Record<EquipmentQualityId, number>

export type JewelryEnchantQualityComponents = Readonly<Record<string, JewelryEnchantQualityValues>>

export interface JewelryEnchantTemplate {
  id: string
  name: string
  glyphName: string
  essenceRune: string
  effect: string
  effects: readonly MetricEffect[]
  esoEnchantConstantName: string
}

export const jewelryEnchants = createDataFile<JewelryEnchantTemplate>()(
  TEMPER_JEWELRY_ENCHANTS_BY_ID
)

export type JewelryEnchantId = (typeof jewelryEnchants.ids)[number]

export function getJewelryEnchantmentEffects(jewelry: JewelryItem): readonly MetricEffect[] {
  const enchantConfig = jewelryEnchants.data[jewelry.enchantment]
  if (!enchantConfig) {
    return []
  }

  const itemQuality = resolveQuality(jewelry.quality)
  const enchantQuality = minQuality(jewelry.enchantmentQuality ?? "legendary", itemQuality)

  let effects: MetricEffect[]

  switch (jewelry.enchantment) {
    case "increase-physical-harm":
    case "increase-magical-harm": {
      const harmValue =
        TEMPER_JEWELRY_ENCHANT_QUALITY_VALUES[jewelry.enchantment].harm[enchantQuality]
      effects = [
        {
          metricId: "power-weapon" as const,
          effectType: "integer" as const,
          effectValue: harmValue,
        },
        {
          metricId: "power-spell" as const,
          effectType: "integer" as const,
          effectValue: harmValue,
        },
      ]
      break
    }

    case "magicka-recovery":
      effects = [
        {
          metricId: "magicka-recovery" as const,
          effectType: "integer" as const,
          effectValue:
            TEMPER_JEWELRY_ENCHANT_QUALITY_VALUES["magicka-recovery"].recovery[enchantQuality],
        },
      ]
      break

    case "stamina-recovery":
      effects = [
        {
          metricId: "stamina-recovery" as const,
          effectType: "integer" as const,
          effectValue:
            TEMPER_JEWELRY_ENCHANT_QUALITY_VALUES["stamina-recovery"].recovery[enchantQuality],
        },
      ]
      break

    case "health-recovery":
      effects = [
        {
          metricId: "health-recovery" as const,
          effectType: "integer" as const,
          effectValue:
            TEMPER_JEWELRY_ENCHANT_QUALITY_VALUES["health-recovery"].recovery[enchantQuality],
        },
      ]
      break

    case "prismatic-recovery": {
      const value =
        TEMPER_JEWELRY_ENCHANT_QUALITY_VALUES["prismatic-recovery"]["prismatic-recovery"][
          enchantQuality
        ]
      effects = [
        {
          metricId: "health-recovery" as const,
          effectType: "integer" as const,
          effectValue: value,
        },
        {
          metricId: "magicka-recovery" as const,
          effectType: "integer" as const,
          effectValue: value,
        },
        {
          metricId: "stamina-recovery" as const,
          effectType: "integer" as const,
          effectValue: value,
        },
      ]
      break
    }

    case "reduce-spell-cost":
      effects = [
        {
          metricId: "magicka-ability-cost" as const,
          effectType: "integer" as const,
          effectValue:
            -TEMPER_JEWELRY_ENCHANT_QUALITY_VALUES["reduce-spell-cost"]["reduce-cost"][
              enchantQuality
            ],
        },
      ]
      break

    case "reduce-feat-cost":
      effects = [
        {
          metricId: "stamina-ability-cost" as const,
          effectType: "integer" as const,
          effectValue:
            -TEMPER_JEWELRY_ENCHANT_QUALITY_VALUES["reduce-feat-cost"]["reduce-cost"][
              enchantQuality
            ],
        },
      ]
      break

    case "reduce-skill-cost": {
      const value =
        -TEMPER_JEWELRY_ENCHANT_QUALITY_VALUES["reduce-skill-cost"]["reduce-skill-cost"][
          enchantQuality
        ]
      effects = [
        {
          metricId: "magicka-ability-cost" as const,
          effectType: "integer" as const,
          effectValue: value,
        },
        {
          metricId: "stamina-ability-cost" as const,
          effectType: "integer" as const,
          effectValue: value,
        },
      ]
      break
    }

    case "flame-resist":
    case "frost-resist":
    case "shock-resist":
    case "poison-resist":
    case "disease-resist":
    case "decrease-physical-harm":
    case "decrease-spell-harm": {
      const value =
        TEMPER_JEWELRY_ENCHANT_QUALITY_VALUES[jewelry.enchantment].resistance[enchantQuality]
      effects = enchantConfig.effects.map((effect) => ({
        ...effect,
        effectValue: value,
      }))
      break
    }

    case "bashing":
      effects = [
        {
          metricId: "bash-damage" as const,
          effectType: "integer" as const,
          effectValue: TEMPER_JEWELRY_ENCHANT_QUALITY_VALUES.bashing.bashing[enchantQuality],
        },
      ]
      break

    case "bracing":
      effects = [
        {
          metricId: "stamina-block-cost" as const,
          effectType: "integer" as const,
          effectValue: TEMPER_JEWELRY_ENCHANT_QUALITY_VALUES.bracing.bracing[enchantQuality],
        },
      ]
      break

    case "potion-boost":
      effects = [
        {
          metricId: "potion-duration" as const,
          effectType: "integer" as const,
          effectValue:
            TEMPER_JEWELRY_ENCHANT_QUALITY_VALUES["potion-boost"]["potion-boost"][enchantQuality],
        },
      ]
      break

    case "potion-speed":
      effects = [
        {
          metricId: "potion-cooldown" as const,
          effectType: "integer" as const,
          effectValue:
            TEMPER_JEWELRY_ENCHANT_QUALITY_VALUES["potion-speed"]["potion-speed"][enchantQuality],
        },
      ]
      break

    case "no-enchant":
      effects = enchantConfig.effects.map((effect) => ({ ...effect }))
      break

    default:
      assertNever(jewelry.enchantment)
  }

  if (jewelry.trait === "infused") {
    const infusedBonus = getInfusedJewelryBonus(itemQuality)
    return effects.map((effect) =>
      updateEffectValue(effect, (value) => value + Math.floor(value * infusedBonus))
    )
  }

  return effects
}
