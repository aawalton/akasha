import { assertNever } from "@akasha/utils-narrow/assert-never"
import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { MetricEffect } from "@akasha/temper-formula-framework/effect"
import type { WeaponItem } from "../item-composites"
import { type EquipmentQualityId, resolveQuality } from "../quality-data"
import { weaponTypes } from "../weapons/weapon-types-data"
import {
  TEMPER_WEAPON_TRAIT_QUALITY_VALUES,
  TEMPER_WEAPON_TRAITS_BY_ID,
} from "./generated/temper-weapon-trait.generated"

export type WeaponTraitQualityValues = Record<EquipmentQualityId, number>

export interface WeaponTraitTemplate {
  id: string
  name: string
  material: string
  effect: string
  effects: readonly MetricEffect[]
  esoTraitConstantName: string
}

function rawTraitQualityValues(
  normal: number,
  legendary: number
): Record<EquipmentQualityId, number> {
  const range = legendary - normal
  return {
    normal,
    fine: normal + (3 / 11) * range,
    superior: normal + (6 / 11) * range,
    epic: normal + (8 / 11) * range,
    legendary,
  }
}

const DEFENDING_RAW_VALUES = rawTraitQualityValues(
  TEMPER_WEAPON_TRAIT_QUALITY_VALUES.defending.normal,
  TEMPER_WEAPON_TRAIT_QUALITY_VALUES.defending.legendary
)
const SHARPENED_RAW_VALUES = rawTraitQualityValues(
  TEMPER_WEAPON_TRAIT_QUALITY_VALUES.sharpened.normal,
  TEMPER_WEAPON_TRAIT_QUALITY_VALUES.sharpened.legendary
)

export const weaponTraits = createDataFile<WeaponTraitTemplate>()(TEMPER_WEAPON_TRAITS_BY_ID)

export type WeaponTraitId = (typeof weaponTraits.ids)[number]

const NON_BUILD_WEAPON_TRAITS = new Set(["ornate", "intricate"])
export const weaponTraitsBuildList = weaponTraits.list.filter(
  (t) => !NON_BUILD_WEAPON_TRAITS.has(t.id)
)

export function getNirnhonedWeaponBonus(quality: EquipmentQualityId = "legendary"): number {
  return TEMPER_WEAPON_TRAIT_QUALITY_VALUES.nirnhoned[quality]
}

export function getInfusedWeaponBonus(quality: EquipmentQualityId = "legendary"): number {
  return TEMPER_WEAPON_TRAIT_QUALITY_VALUES.infused[quality]
}

function calculateDecisiveEffects(weapon: WeaponItem): readonly MetricEffect[] {
  const is2H = weaponTypes.data[weapon.type].isTwoHanded
  const quality = resolveQuality(weapon.quality)

  const baseChance = TEMPER_WEAPON_TRAIT_QUALITY_VALUES.decisive[quality]
  const chanceValue = is2H ? baseChance * 2 : baseChance

  return [
    {
      metricId: "ultimate-generation" as const,
      effectType: "conditional-chance" as const,
      effectValue: {
        chance: chanceValue,
        trigger: "on-ultimate-gain",
        value: 1,
      },
    },
  ]
}

export function getWeaponTraitEffects(weapon: WeaponItem): readonly MetricEffect[] {
  if (weapon.type === "no-type") return []

  const traitConfig = weaponTraits.data[weapon.trait]
  if (!traitConfig) return []

  const is2H = weaponTypes.data[weapon.type].isTwoHanded
  const quality = resolveQuality(weapon.quality)

  if (traitConfig.id === "decisive") {
    return calculateDecisiveEffects(weapon)
  }

  if (traitConfig.id === "infused" || traitConfig.id === "nirnhoned") {
    return []
  }

  switch (weapon.trait) {
    case "charged": {
      const baseValue = TEMPER_WEAPON_TRAIT_QUALITY_VALUES.charged[quality]
      return [
        {
          metricId: "status-effect-chance" as const,
          effectType: "fractional-change" as const,
          effectValue: is2H ? baseValue * 2 : baseValue,
        },
      ]
    }

    case "defending": {
      const rawValue = DEFENDING_RAW_VALUES[quality]
      const value = Math.floor(is2H ? rawValue * 2 : rawValue)
      return [
        {
          metricId: "resistance-physical" as const,
          effectType: "integer" as const,
          effectValue: value,
        },
        {
          metricId: "resistance-spell" as const,
          effectType: "integer" as const,
          effectValue: value,
        },
      ]
    }

    case "powered": {
      const baseValue = TEMPER_WEAPON_TRAIT_QUALITY_VALUES.powered[quality]
      return [
        {
          metricId: "healing-done-base" as const,
          effectType: "fractional-change" as const,
          effectValue: is2H ? baseValue * 2 : baseValue,
        },
      ]
    }

    case "precise": {
      const baseValue = TEMPER_WEAPON_TRAIT_QUALITY_VALUES.precise[quality]
      return [
        {
          metricId: "critical-rating" as const,
          effectType: "integer" as const,
          effectValue: is2H ? baseValue * 2 : baseValue,
        },
      ]
    }

    case "sharpened": {
      const rawValue = SHARPENED_RAW_VALUES[quality]
      const value = Math.floor(is2H ? rawValue * 2 : rawValue)
      return [
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
    }

    case "training": {
      const baseValue = TEMPER_WEAPON_TRAIT_QUALITY_VALUES.training[quality]
      return [
        {
          metricId: "experience-gain" as const,
          effectType: "fractional-change" as const,
          effectValue: baseValue,
        },
      ]
    }

    case "no-trait":
    case "infused":
    case "nirnhoned":
    case "ornate":
    case "intricate":
    case "decisive":
      return traitConfig.effects

    default:
      return assertNever(weapon.trait)
  }
}
