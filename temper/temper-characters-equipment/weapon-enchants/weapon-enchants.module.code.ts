import { getInfusedWeaponBonus } from "@akasha/temper-equipment/weapon-traits"
import {
  type EquipmentQualityId,
  minQuality,
  resolveQuality,
} from "@akasha/temper-equipment-kinds/equipment-qualities"
import type { MetricEffect } from "@akasha/temper-formula-framework/effect"
import { updateEffectValue } from "@akasha/temper-formula-framework/effect-value-update"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { WeaponItem } from "../item-composites/item-composites.module.code.ts"
import { weaponTypes } from "../weapon-types-data/weapon-types-data.module.code.ts"
export const TEMPER_WEAPON_ENCHANTS_BY_ID = {
  "no-enchant": {
    id: "no-enchant" as const,
    name: "No Enchant",
    glyphName: "",
    essenceRune: "",
    effect: "",
    effects: [],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_NONE",
  },
  "weapon-damage": {
    id: "weapon-damage" as const,
    name: "Weapon Damage",
    glyphName: "Glyph of Weapon Damage",
    essenceRune: "Okori",
    effect: "Increases Weapon and Spell Damage",
    effects: [
      { metricId: "power-weapon" as const, effectType: "integer" as const, effectValue: 174 },
      { metricId: "power-spell" as const, effectType: "integer" as const, effectValue: 174 },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_BERSERKER",
  },
  "absorb-health": {
    id: "absorb-health" as const,
    name: "Absorb Health",
    glyphName: "Glyph of Absorb Health",
    essenceRune: "Okoma",
    effect: "Deals damage over time and returns health (proc-based)",
    effects: [],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_ABSORB_HEALTH",
  },
  "absorb-magicka": {
    id: "absorb-magicka" as const,
    name: "Absorb Magicka",
    glyphName: "Glyph of Absorb Magicka",
    essenceRune: "Makkoma",
    effect: "Deals damage and returns magicka (proc-based)",
    effects: [],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_ABSORB_MAGICKA",
  },
  "absorb-stamina": {
    id: "absorb-stamina" as const,
    name: "Absorb Stamina",
    glyphName: "Glyph of Absorb Stamina",
    essenceRune: "Deni",
    effect: "Deals damage and returns stamina (proc-based)",
    effects: [],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_ABSORB_STAMINA",
  },
  "crushing": {
    id: "crushing" as const,
    name: "Crushing",
    glyphName: "Glyph of Crushing",
    essenceRune: "Derado",
    effect: "Reduces target armor for 5 seconds (proc-based with ~50% uptime)",
    effects: [
      {
        metricId: "penetration-physical" as const,
        effectType: "integer" as const,
        effectValue: 2108,
      },
      { metricId: "penetration-spell" as const, effectType: "integer" as const, effectValue: 2108 },
    ],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_ARMOR",
  },
  "decrease-health": {
    id: "decrease-health" as const,
    name: "Decrease Health",
    glyphName: "Glyph of Decrease Health",
    essenceRune: "Okoma",
    effect: "Deals instant damage on proc",
    effects: [],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_DAMAGE_HEALTH",
  },
  "flame": {
    id: "flame" as const,
    name: "Flame",
    glyphName: "Glyph of Flame",
    essenceRune: "Rakeipa",
    effect: "Deals fire damage on proc",
    effects: [],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_FIERY_WEAPON",
  },
  "frost": {
    id: "frost" as const,
    name: "Frost",
    glyphName: "Glyph of Frost",
    essenceRune: "Dekeipa",
    effect: "Deals frost damage on proc",
    effects: [],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_FROZEN_WEAPON",
  },
  "shock": {
    id: "shock" as const,
    name: "Shock",
    glyphName: "Glyph of Shock",
    essenceRune: "Meip",
    effect: "Deals shock damage on proc",
    effects: [],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_CHARGED_WEAPON",
  },
  "poison": {
    id: "poison" as const,
    name: "Poison",
    glyphName: "Glyph of Poison",
    essenceRune: "Kuoko",
    effect: "Deals poison damage on proc",
    effects: [],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_POISONED_WEAPON",
  },
  "weakening": {
    id: "weakening" as const,
    name: "Weakening",
    glyphName: "Glyph of Weakening",
    essenceRune: "Okori",
    effect: "Reduces target weapon and spell damage on proc",
    effects: [],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_POWER",
  },
  "hardening": {
    id: "hardening" as const,
    name: "Hardening",
    glyphName: "Glyph of Hardening",
    essenceRune: "Derado",
    effect: "Grants a damage shield on proc",
    effects: [],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_DAMAGE_SHIELD",
  },
  "foulness": {
    id: "foulness" as const,
    name: "Foulness",
    glyphName: "Glyph of Foulness",
    essenceRune: "Haoko",
    effect: "Deals disease damage on proc",
    effects: [],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_BEFOULED_WEAPON",
  },
  "prismatic-onslaught": {
    id: "prismatic-onslaught" as const,
    name: "Prismatic Onslaught",
    glyphName: "Glyph of Prismatic Onslaught",
    essenceRune: "Hakeijo",
    effect: "Deals multi-element damage on proc",
    effects: [],
    esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_ONSLAUGHT",
  },
} as const satisfies Record<string, WeaponEnchantTemplate>

export const TEMPER_WEAPON_ENCHANT_QUALITY_VALUES = {
  "weapon-damage": {
    "weapon-damage": { normal: 134, fine: 141, superior: 153, epic: 160, legendary: 174 },
  },
  "crushing": {
    "crushing": { normal: 1621, fine: 1692, superior: 1830, epic: 1947, legendary: 2108 },
  },
} as const satisfies Record<string, WeaponEnchantQualityComponents>

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
