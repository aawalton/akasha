/**
 * Temper Jewelry Traits (Generated)
 *
 * ESO jewelry traits — the 9 functional traits (arcane, bloodthirsty,
 * harmony, healthy, infused, protective, robust, swift, triune) plus
 * the no-trait sentinel and the two decorative traits (ornate,
 * intricate), sourced from the universal pages table (page type:
 * temper-jewelry-trait).
 *
 * Row order matches the legacy `jewelryTraits.ids` iteration order,
 * which the character codec uses as an append-only index map.
 * Reordering rows would invalidate every existing shared build URL.
 *
 * Triune's two parallel quality tables are unpacked back into the
 * synthetic `"triune-health"` / `"triune-resource"` keys the legacy
 * consumer expects.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { JewelryTraitQualityValues, JewelryTraitTemplate } from "../jewelry-traits-data"

/**
 * Keyed record. The literal-id keys flow into `createDataFile`'s
 * `jewelryTraits.ids` so `(typeof jewelryTraits.ids)[number]` stays a
 * literal-union typed for callers (codec, schema, build engine, UI).
 */
export const TEMPER_JEWELRY_TRAITS_BY_ID = {
  "no-trait": { id: "no-trait" as const, name: "No Trait", material: "", effect: "", effects: [], esoTraitConstantName: "ITEM_TRAIT_TYPE_NONE" },
  "arcane": { id: "arcane" as const, name: "Arcane", material: "Cobalt", effect: "Increases Maximum Magicka", effects: [{ metricId: "magicka-maximum" as const, effectType: "integer", effectValue: 877 }], esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_ARCANE" },
  "bloodthirsty": { id: "bloodthirsty" as const, name: "Bloodthirsty", material: "Slaughterstone", effect: "Increases Weapon and Spell Damage against enemies under 90% Health (scales with missing health)", effects: [], esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_BLOODTHIRSTY" },
  "harmony": { id: "harmony" as const, name: "Harmony", material: "Dibellium", effect: "Activating a synergy restores 880 Health, Magicka, and Stamina", effects: [], esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_HARMONY" },
  "healthy": { id: "healthy" as const, name: "Healthy", material: "Antimony", effect: "Increases Maximum Health", effects: [{ metricId: "health-maximum" as const, effectType: "integer", effectValue: 965 }], esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_HEALTHY" },
  "infused": { id: "infused" as const, name: "Infused", material: "Aurbic Amber", effect: "Increases Jewelry Enchantment effect", effects: [], esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_INFUSED" },
  "protective": { id: "protective" as const, name: "Protective", material: "Titanium", effect: "Increases Physical and Spell Resistance", effects: [{ metricId: "resistance" as const, effectType: "integer", effectValue: 1844 }], esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_PROTECTIVE" },
  "robust": { id: "robust" as const, name: "Robust", material: "Zinc", effect: "Increases Maximum Stamina", effects: [{ metricId: "stamina-maximum" as const, effectType: "integer", effectValue: 877 }], esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_ROBUST" },
  "swift": { id: "swift" as const, name: "Swift", material: "Gilding Wax", effect: "Increases Movement Speed", effects: [{ metricId: "movement-speed" as const, effectType: "fractional-change", effectValue: 0.07 }], esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_SWIFT" },
  "triune": { id: "triune" as const, name: "Triune", material: "Dawn-Prism", effect: "Increases Maximum Health, Magicka, and Stamina", effects: [{ metricId: "health-maximum" as const, effectType: "integer", effectValue: 482 }, { metricId: "magicka-maximum" as const, effectType: "integer", effectValue: 439 }, { metricId: "stamina-maximum" as const, effectType: "integer", effectValue: 439 }], esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_TRIUNE" },
  "ornate": { id: "ornate" as const, name: "Ornate", material: "", effect: "Increases sell price", effects: [], esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_ORNATE" },
  "intricate": { id: "intricate" as const, name: "Intricate", material: "", effect: "Increases Inspiration from deconstruction", effects: [], esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_INTRICATE" },
} as const satisfies Record<string, JewelryTraitTemplate>

/**
 * Per-quality numeric values for the 8 jewelry traits that have a
 * quality-keyed value table (arcane, bloodthirsty, harmony, healthy,
 * infused, protective, robust, swift) plus the two Triune sub-values
 * ("triune-health" and "triune-resource"). The no-trait sentinel and
 * the two decorative traits (ornate, intricate) are omitted because
 * they have no quality-keyed value table in the legacy data file.
 */
export const TEMPER_JEWELRY_TRAIT_QUALITY_VALUES = {
  "arcane": { normal: 767, fine: 797, superior: 827, epic: 847, legendary: 877 },
  "bloodthirsty": { normal: 280, fine: 297, superior: 315, epic: 332, legendary: 350 },
  "harmony": { normal: 704, fine: 748, superior: 792, epic: 836, legendary: 880 },
  "healthy": { normal: 844, fine: 877, superior: 910, epic: 932, legendary: 965 },
  "infused": { normal: 0.24, fine: 0.33, superior: 0.42, epic: 0.51, legendary: 0.6 },
  "protective": { normal: 1624, fine: 1664, superior: 1744, epic: 1804, legendary: 1844 },
  "robust": { normal: 767, fine: 797, superior: 827, epic: 847, legendary: 877 },
  "swift": { normal: 0.03, fine: 0.04, superior: 0.05, epic: 0.06, legendary: 0.07 },
  "triune-health": { normal: 386, fine: 410, superior: 434, epic: 458, legendary: 482 },
  "triune-resource": { normal: 351, fine: 373, superior: 395, epic: 417, legendary: 439 },
} as const satisfies Record<string, JewelryTraitQualityValues>
