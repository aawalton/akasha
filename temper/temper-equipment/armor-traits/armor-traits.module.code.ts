import type { EquipmentQualityId } from "@akasha/temper-equipment-kinds/equipment-qualities"
import type { MetricEffect } from "@akasha/temper-formula-framework/effect"
import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export type ArmorTraitQualityValues = Record<EquipmentQualityId, number>

export interface ArmorTraitTemplate {
  id: string
  name: string
  esoTraitConstantName: string
  material: string
  effect: string
  effects: readonly MetricEffect[]
}

const ARMOR_TRAIT_DATA = {
  "no-trait": {
    id: "no-trait" as const,
    name: "No Trait",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_NONE",
    material: "",
    effect: "",
    effects: [],
  },
  "divines": {
    id: "divines" as const,
    name: "Divines",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_DIVINES",
    material: "Sapphire",
    effect: "Increases Mundus Stone effect",
    effects: [],
  },
  "impenetrable": {
    id: "impenetrable" as const,
    name: "Impenetrable",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_IMPENETRABLE",
    material: "Diamond",
    effect: "Increases Critical Resistance",
    effects: [
      { metricId: "resistance-critical" as const, effectType: "integer", effectValue: 127 },
    ],
  },
  "infused": {
    id: "infused" as const,
    name: "Infused",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_INFUSED",
    material: "Bloodstone",
    effect: "Increases Armor Enchantment effect",
    effects: [],
  },
  "invigorating": {
    id: "invigorating" as const,
    name: "Invigorating",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_PROLIFIC",
    material: "Garnet",
    effect: "Increases Health, Magicka, and Stamina Recovery",
    effects: [
      { metricId: "health-recovery" as const, effectType: "integer", effectValue: 16 },
      { metricId: "magicka-recovery" as const, effectType: "integer", effectValue: 16 },
      { metricId: "stamina-recovery" as const, effectType: "integer", effectValue: 16 },
    ],
  },
  "nirnhoned": {
    id: "nirnhoned" as const,
    name: "Nirnhoned",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_NIRNHONED",
    material: "Fortified Nirncrux",
    effect: "Increases Physical and Spell Resistance",
    effects: [],
  },
  "reinforced": {
    id: "reinforced" as const,
    name: "Reinforced",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_REINFORCED",
    material: "Sardonyx",
    effect: "Increases Armor value",
    effects: [],
  },
  "sturdy": {
    id: "sturdy" as const,
    name: "Sturdy",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_STURDY",
    material: "Quartz",
    effect: "Reduces Block cost",
    effects: [
      {
        metricId: "stamina-block-cost" as const,
        effectType: "fractional-change",
        effectValue: -0.04,
      },
    ],
  },
  "training": {
    id: "training" as const,
    name: "Training",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_TRAINING",
    material: "Emerald",
    effect: "Increases Experience gained from kills",
    effects: [
      { metricId: "experience-gain" as const, effectType: "fractional-change", effectValue: 0.11 },
    ],
  },
  "well-fitted": {
    id: "well-fitted" as const,
    name: "Well-Fitted",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_WELL_FITTED",
    material: "Almandine",
    effect: "Reduces Roll Dodge and Sprint cost",
    effects: [
      {
        metricId: "stamina-sprint-cost" as const,
        effectType: "fractional-change",
        effectValue: -0.06,
      },
      {
        metricId: "stamina-dodge-cost" as const,
        effectType: "fractional-change",
        effectValue: -0.06,
      },
    ],
  },
  "ornate": {
    id: "ornate" as const,
    name: "Ornate",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_ORNATE",
    material: "",
    effect: "Increases sell price",
    effects: [],
  },
  "intricate": {
    id: "intricate" as const,
    name: "Intricate",
    esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_INTRICATE",
    material: "",
    effect: "Increases Inspiration from deconstruction",
    effects: [],
  },
} satisfies Record<string, ArmorTraitTemplate>

export const armorTraits = createDataFile<ArmorTraitTemplate>()(ARMOR_TRAIT_DATA)

export type ArmorTraitId = (typeof armorTraits.ids)[number]

const NON_BUILD_ARMOR_TRAITS = new Set(["ornate", "intricate"])

export const armorTraitsBuildList = armorTraits.list.filter(
  (one) => !NON_BUILD_ARMOR_TRAITS.has(one.id)
)

export const ARMOR_TRAIT_QUALITY_VALUES = {
  "divines": { normal: 0.051, fine: 0.061, superior: 0.071, epic: 0.0806, legendary: 0.091 },
  "impenetrable": { normal: 116, fine: 118, superior: 121, epic: 124, legendary: 127 },
  "infused": { normal: 0.09, fine: 0.13, superior: 0.17, epic: 0.21, legendary: 0.25 },
  "invigorating": { normal: 8, fine: 10, superior: 12, epic: 14, legendary: 16 },
  "nirnhoned": { normal: 220, fine: 228, superior: 236, epic: 244, legendary: 253 },
  "reinforced": { normal: 0.12, fine: 0.13, superior: 0.14, epic: 0.15, legendary: 0.16 },
  "sturdy": { normal: 0.02, fine: 0.025, superior: 0.03, epic: 0.035, legendary: 0.04 },
  "training": { normal: 0.07, fine: 0.08, superior: 0.09, epic: 0.1, legendary: 0.11 },
  "well-fitted": { normal: 0.012, fine: 0.024, superior: 0.036, epic: 0.048, legendary: 0.06 },
} satisfies Record<string, ArmorTraitQualityValues>

export function getInfusedArmorBonus(quality: EquipmentQualityId = "legendary"): number {
  return ARMOR_TRAIT_QUALITY_VALUES.infused[quality]
}
