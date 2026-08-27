/**
 * Temper Armor Traits (Generated)
 *
 * ESO armor traits — the 9 functional traits (sturdy, impenetrable,
 * reinforced, well-fitted, training, infused, invigorating, divines,
 * nirnhoned) plus the no-trait sentinel and the two decorative traits
 * (ornate, intricate), sourced from the universal pages table (page
 * type: temper-armor-trait).
 *
 * Row order matches the legacy `armorTraits.ids` iteration order, which
 * the character codec uses as an append-only index map. Reordering rows
 * would invalidate every existing shared build URL.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ArmorTraitTemplate, ArmorTraitQualityValues } from "../armor-traits-data"

/**
 * Keyed record. The literal-id keys flow into `createDataFile`'s
 * `armorTraits.ids` so `(typeof armorTraits.ids)[number]` stays a
 * literal-union typed for callers (codec, schema, build engine, UI).
 */
export const TEMPER_ARMOR_TRAITS_BY_ID = {
  "no-trait": { id: "no-trait" as const, name: "No Trait", esoTraitConstantName: "ITEM_TRAIT_TYPE_NONE", material: "", effect: "", effects: [] },
  "divines": { id: "divines" as const, name: "Divines", esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_DIVINES", material: "Sapphire", effect: "Increases Mundus Stone effect", effects: [] },
  "impenetrable": { id: "impenetrable" as const, name: "Impenetrable", esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_IMPENETRABLE", material: "Diamond", effect: "Increases Critical Resistance", effects: [{ metricId: "resistance-critical" as const, effectType: "integer", effectValue: 127 }] },
  "infused": { id: "infused" as const, name: "Infused", esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_INFUSED", material: "Bloodstone", effect: "Increases Armor Enchantment effect", effects: [] },
  "invigorating": { id: "invigorating" as const, name: "Invigorating", esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_PROLIFIC", material: "Garnet", effect: "Increases Health, Magicka, and Stamina Recovery", effects: [{ metricId: "health-recovery" as const, effectType: "integer", effectValue: 16 }, { metricId: "magicka-recovery" as const, effectType: "integer", effectValue: 16 }, { metricId: "stamina-recovery" as const, effectType: "integer", effectValue: 16 }] },
  "nirnhoned": { id: "nirnhoned" as const, name: "Nirnhoned", esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_NIRNHONED", material: "Fortified Nirncrux", effect: "Increases Physical and Spell Resistance", effects: [] },
  "reinforced": { id: "reinforced" as const, name: "Reinforced", esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_REINFORCED", material: "Sardonyx", effect: "Increases Armor value", effects: [] },
  "sturdy": { id: "sturdy" as const, name: "Sturdy", esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_STURDY", material: "Quartz", effect: "Reduces Block cost", effects: [{ metricId: "stamina-block-cost" as const, effectType: "fractional-change", effectValue: -0.04 }] },
  "training": { id: "training" as const, name: "Training", esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_TRAINING", material: "Emerald", effect: "Increases Experience gained from kills", effects: [{ metricId: "experience-gain" as const, effectType: "fractional-change", effectValue: 0.11 }] },
  "well-fitted": { id: "well-fitted" as const, name: "Well-Fitted", esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_WELL_FITTED", material: "Almandine", effect: "Reduces Roll Dodge and Sprint cost", effects: [{ metricId: "stamina-sprint-cost" as const, effectType: "fractional-change", effectValue: -0.06 }, { metricId: "stamina-dodge-cost" as const, effectType: "fractional-change", effectValue: -0.06 }] },
  "ornate": { id: "ornate" as const, name: "Ornate", esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_ORNATE", material: "", effect: "Increases sell price", effects: [] },
  "intricate": { id: "intricate" as const, name: "Intricate", esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_INTRICATE", material: "", effect: "Increases Inspiration from deconstruction", effects: [] },
} as const satisfies Record<string, ArmorTraitTemplate>

/**
 * Per-quality numeric values for the 9 functional armor traits. The
 * no-trait sentinel and the two decorative traits (ornate, intricate)
 * are omitted because they have no quality-keyed value table in the
 * legacy data file.
 */
export const TEMPER_ARMOR_TRAIT_QUALITY_VALUES = {
  "divines": { normal: 0.051, fine: 0.061, superior: 0.071, epic: 0.0806, legendary: 0.091 },
  "impenetrable": { normal: 116, fine: 118, superior: 121, epic: 124, legendary: 127 },
  "infused": { normal: 0.09, fine: 0.13, superior: 0.17, epic: 0.21, legendary: 0.25 },
  "invigorating": { normal: 8, fine: 10, superior: 12, epic: 14, legendary: 16 },
  "nirnhoned": { normal: 220, fine: 228, superior: 236, epic: 244, legendary: 253 },
  "reinforced": { normal: 0.12, fine: 0.13, superior: 0.14, epic: 0.15, legendary: 0.16 },
  "sturdy": { normal: 0.02, fine: 0.025, superior: 0.03, epic: 0.035, legendary: 0.04 },
  "training": { normal: 0.07, fine: 0.08, superior: 0.09, epic: 0.1, legendary: 0.11 },
  "well-fitted": { normal: 0.012, fine: 0.024, superior: 0.036, epic: 0.048, legendary: 0.06 },
} as const satisfies Record<string, ArmorTraitQualityValues>
