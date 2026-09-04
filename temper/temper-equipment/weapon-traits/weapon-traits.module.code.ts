import type { EquipmentQualityId } from "@akasha/temper-equipment-kinds/equipment-qualities"
import type { MetricEffect } from "@akasha/temper-formula-framework/effect"
import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export type WeaponTraitQualityValues = Record<EquipmentQualityId, number>

export interface WeaponTraitTemplate {
  id: string
  name: string
  material: string
  effect: string
  effects: readonly MetricEffect[]
  esoTraitConstantName: string
}

const WEAPON_TRAIT_DATA = {
  "no-trait": {
    id: "no-trait" as const,
    name: "No Trait",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_NONE",
    material: "",
    effect: "",
    effects: [],
  },
  "charged": {
    id: "charged" as const,
    name: "Charged",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_CHARGED",
    material: "Amethyst",
    effect: "Increases Status Effect Chance",
    effects: [
      {
        metricId: "status-effect-chance" as const,
        effectType: "fractional-change",
        effectValue: 1.175,
      },
    ],
  },
  "decisive": {
    id: "decisive" as const,
    name: "Decisive",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_DECISIVE",
    material: "Citrine",
    effect: "Increases Ultimate Gain",
    effects: [],
  },
  "defending": {
    id: "defending" as const,
    name: "Defending",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_DEFENDING",
    material: "Turquoise",
    effect: "Increases Physical and Spell Resistance",
    effects: [
      { metricId: "resistance-physical" as const, effectType: "integer", effectValue: 1638 },
      { metricId: "resistance-spell" as const, effectType: "integer", effectValue: 1638 },
    ],
  },
  "infused": {
    id: "infused" as const,
    name: "Infused",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_INFUSED",
    material: "Jade",
    effect: "Increases Enchantment Effectiveness",
    effects: [],
  },
  "nirnhoned": {
    id: "nirnhoned" as const,
    name: "Nirnhoned",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_NIRNHONED",
    material: "Fortified Nirncrux",
    effect: "Increases Weapon and Spell Damage",
    effects: [],
  },
  "powered": {
    id: "powered" as const,
    name: "Powered",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_POWERED",
    material: "Chysolite",
    effect: "Increases Healing Done",
    effects: [
      {
        metricId: "healing-done-base" as const,
        effectType: "fractional-change",
        effectValue: 0.045,
      },
    ],
  },
  "precise": {
    id: "precise" as const,
    name: "Precise",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_PRECISE",
    material: "Ruby",
    effect: "Increases Weapon and Spell Critical",
    effects: [{ metricId: "critical-rating" as const, effectType: "integer", effectValue: 789 }],
  },
  "sharpened": {
    id: "sharpened" as const,
    name: "Sharpened",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_SHARPENED",
    material: "Fire Opal",
    effect: "Increases Physical and Spell Penetration",
    effects: [
      { metricId: "penetration-physical" as const, effectType: "integer", effectValue: 1638 },
      { metricId: "penetration-spell" as const, effectType: "integer", effectValue: 1638 },
    ],
  },
  "training": {
    id: "training" as const,
    name: "Training",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_TRAINING",
    material: "Carnelian",
    effect: "Increases Experience Gain (No Combat Effect)",
    effects: [
      { metricId: "experience-gain" as const, effectType: "fractional-change", effectValue: 0.045 },
    ],
  },
  "ornate": {
    id: "ornate" as const,
    name: "Ornate",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_ORNATE",
    material: "",
    effect: "Increases sell price",
    effects: [],
  },
  "intricate": {
    id: "intricate" as const,
    name: "Intricate",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_INTRICATE",
    material: "",
    effect: "Increases Inspiration from deconstruction",
    effects: [],
  },
} satisfies Record<string, WeaponTraitTemplate>

export const weaponTraits = createDataFile<WeaponTraitTemplate>()(WEAPON_TRAIT_DATA)

export type WeaponTraitId = (typeof weaponTraits.ids)[number]

const NON_BUILD_WEAPON_TRAITS = new Set(["ornate", "intricate"])

export const weaponTraitsBuildList = weaponTraits.list.filter(
  (one) => !NON_BUILD_WEAPON_TRAITS.has(one.id)
)

export const WEAPON_TRAIT_QUALITY_VALUES = {
  "charged": { normal: 0.975, fine: 1.025, superior: 1.075, epic: 1.125, legendary: 1.175 },
  "decisive": { normal: 0.191, fine: 0.212, superior: 0.232, epic: 0.254, legendary: 0.275 },
  "defending": { normal: 1428, fine: 1485, superior: 1542, epic: 1580, legendary: 1638 },
  "infused": { normal: 0.1, fine: 0.15, superior: 0.2, epic: 0.25, legendary: 0.3 },
  "nirnhoned": { normal: 0.12, fine: 0.13, superior: 0.13, epic: 0.14, legendary: 0.15 },
  "powered": { normal: 0.025, fine: 0.03, superior: 0.035, epic: 0.04, legendary: 0.045 },
  "precise": { normal: 350, fine: 460, superior: 569, epic: 679, legendary: 789 },
  "sharpened": { normal: 1428, fine: 1485, superior: 1542, epic: 1580, legendary: 1638 },
  "training": { normal: 0.025, fine: 0.03, superior: 0.035, epic: 0.04, legendary: 0.045 },
} satisfies Record<string, WeaponTraitQualityValues>

export function getNirnhonedWeaponBonus(quality: EquipmentQualityId = "legendary"): number {
  return WEAPON_TRAIT_QUALITY_VALUES.nirnhoned[quality]
}

export function getInfusedWeaponBonus(quality: EquipmentQualityId = "legendary"): number {
  return WEAPON_TRAIT_QUALITY_VALUES.infused[quality]
}
