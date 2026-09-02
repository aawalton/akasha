import { assertNever } from "@akasha/utils-narrow/assert-never"
import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { MetricEffect } from "@akasha/temper-formula-framework/effect"
import { updateEffectValue } from "@akasha/temper-formula-framework/effect-value-update"
import type { WeaponItem } from "../item-composites"
import { type EquipmentQualityId, minQuality, resolveQuality } from "../quality-data"
import { getInfusedWeaponBonus } from "../traits/weapon-traits-data"
import { weaponTypes } from "../weapons/weapon-types-data"
import {
  TEMPER_WEAPON_ENCHANT_QUALITY_VALUES,
  TEMPER_WEAPON_ENCHANTS_BY_ID,
} from "./generated/temper-weapon-enchant.generated"

export type WeaponEnchantQualityValues = Record<EquipmentQualityId, number>

export type WeaponEnchantQualityComponents = Readonly<Record<string, WeaponEnchantQualityValues>>

export interface WeaponEnchantTemplate {
  id: string
  name: string
  glyphName: string
  essenceRune: string
  effect: string
  effects: readonly MetricEffect[]
  esoEnchantConstantName: string
}

export const weaponEnchantments = createDataFile<WeaponEnchantTemplate>()(
  TEMPER_WEAPON_ENCHANTS_BY_ID
)

export type WeaponEnchantmentId = (typeof weaponEnchantments.ids)[number]

function calculateInfusedValue(effect: MetricEffect, infusedBonus: number): MetricEffect {
  return updateEffectValue(effect, (value) => value + Math.floor(value * infusedBonus))
}

export function getWeaponEnchantmentEffects(weapon: WeaponItem): readonly MetricEffect[] {
  if (weapon.type === "no-type") return []

  if (!weaponEnchantments.has(weapon.enchantment)) return []

  const enchantConfig = weaponEnchantments.data[weapon.enchantment]
  if (!enchantConfig) return []

  const is2H = weaponTypes.data[weapon.type].isTwoHanded

  const itemQuality = resolveQuality(weapon.quality)
  const enchantQuality = minQuality(weapon.enchantmentQuality ?? "legendary", itemQuality)

  let effects: MetricEffect[]

  switch (weapon.enchantment) {
    case "weapon-damage": {
      const baseValue =
        TEMPER_WEAPON_ENCHANT_QUALITY_VALUES["weapon-damage"]["weapon-damage"][enchantQuality]
      const value = is2H ? baseValue * 2 : baseValue
      effects = [
        { metricId: "power-weapon" as const, effectType: "integer" as const, effectValue: value },
        { metricId: "power-spell" as const, effectType: "integer" as const, effectValue: value },
      ]
      break
    }

    case "crushing": {
      const baseValue = TEMPER_WEAPON_ENCHANT_QUALITY_VALUES.crushing.crushing[enchantQuality]
      const value = is2H ? baseValue * 2 : baseValue
      effects = [
        {
          metricId: "penetration-physical" as const,
          effectType: "integer" as const,
          effectValue: value,
        },
        {
          metricId: "penetration-spell" as const,
          effectType: "integer" as const,
          effectValue: value,
        },
      ]
      break
    }

    case "no-enchant":
    case "absorb-health":
    case "absorb-magicka":
    case "absorb-stamina":
    case "decrease-health":
    case "flame":
    case "frost":
    case "shock":
    case "poison":
    case "weakening":
    case "hardening":
    case "foulness":
    case "prismatic-onslaught":
      effects = enchantConfig.effects.map((effect) => {
        if (is2H && effect.effectType === "integer") {
          return {
            ...effect,
            effectValue: effect.effectValue * 2,
          }
        }
        return effect
      })
      break

    default:
      assertNever(weapon.enchantment)
  }

  if (weapon.trait === "infused") {
    const infusedBonus = getInfusedWeaponBonus(itemQuality)
    return effects.map((effect) => calculateInfusedValue(effect, infusedBonus))
  }

  return effects
}
