/**
 * Temper Weapon Enchants (Generated)
 *
 * ESO weapon enchantments (glyphs) — the 14 functional enchants plus
 * the no-enchant sentinel, sourced from the universal pages table
 * (page type: temper-weapon-enchant).
 *
 * Row order matches the legacy `weaponEnchants.ids` iteration order,
 * which the character codec uses as an append-only index map.
 * Reordering rows would invalidate every existing shared build URL.
 *
 * `TEMPER_WEAPON_ENCHANT_QUALITY_VALUES` is a per-enchant
 * `Record<componentKey, QualityValues>` map. Only `weapon-damage`
 * and `crushing` carry a quality table — they are the only two
 * enchants whose effects flow through the metric system; proc-based
 * enchants (absorb-*, decrease-health, flame, frost, shock, poison,
 * weakening, hardening, foulness, prismatic-onslaught) and
 * `no-enchant` are omitted because they have no metric-system
 * quality scaling.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type {
  WeaponEnchantQualityComponents,
  WeaponEnchantTemplate,
} from "../weapon-enchants-data"

/**
 * Keyed record. The literal-id keys flow into `createDataFile`'s
 * `weaponEnchants.ids` so `(typeof weaponEnchants.ids)[number]`
 * stays a literal-union typed for callers (codec, schema, UI).
 */
export const TEMPER_WEAPON_ENCHANTS_BY_ID = {
  "no-enchant": { id: "no-enchant" as const, name: "No Enchant", glyphName: "", essenceRune: "", effect: "", effects: [], esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_NONE" },
  "weapon-damage": { id: "weapon-damage" as const, name: "Weapon Damage", glyphName: "Glyph of Weapon Damage", essenceRune: "Okori", effect: "Increases Weapon and Spell Damage", effects: [{ metricId: "power-weapon" as const, effectType: "integer" as const, effectValue: 174 }, { metricId: "power-spell" as const, effectType: "integer" as const, effectValue: 174 }], esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_BERSERKER" },
  "absorb-health": { id: "absorb-health" as const, name: "Absorb Health", glyphName: "Glyph of Absorb Health", essenceRune: "Okoma", effect: "Deals damage over time and returns health (proc-based)", effects: [], esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_ABSORB_HEALTH" },
  "absorb-magicka": { id: "absorb-magicka" as const, name: "Absorb Magicka", glyphName: "Glyph of Absorb Magicka", essenceRune: "Makkoma", effect: "Deals damage and returns magicka (proc-based)", effects: [], esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_ABSORB_MAGICKA" },
  "absorb-stamina": { id: "absorb-stamina" as const, name: "Absorb Stamina", glyphName: "Glyph of Absorb Stamina", essenceRune: "Deni", effect: "Deals damage and returns stamina (proc-based)", effects: [], esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_ABSORB_STAMINA" },
  "crushing": { id: "crushing" as const, name: "Crushing", glyphName: "Glyph of Crushing", essenceRune: "Derado", effect: "Reduces target armor for 5 seconds (proc-based with ~50% uptime)", effects: [{ metricId: "penetration-physical" as const, effectType: "integer" as const, effectValue: 2108 }, { metricId: "penetration-spell" as const, effectType: "integer" as const, effectValue: 2108 }], esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_ARMOR" },
  "decrease-health": { id: "decrease-health" as const, name: "Decrease Health", glyphName: "Glyph of Decrease Health", essenceRune: "Okoma", effect: "Deals instant damage on proc", effects: [], esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_DAMAGE_HEALTH" },
  "flame": { id: "flame" as const, name: "Flame", glyphName: "Glyph of Flame", essenceRune: "Rakeipa", effect: "Deals fire damage on proc", effects: [], esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_FIERY_WEAPON" },
  "frost": { id: "frost" as const, name: "Frost", glyphName: "Glyph of Frost", essenceRune: "Dekeipa", effect: "Deals frost damage on proc", effects: [], esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_FROZEN_WEAPON" },
  "shock": { id: "shock" as const, name: "Shock", glyphName: "Glyph of Shock", essenceRune: "Meip", effect: "Deals shock damage on proc", effects: [], esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_CHARGED_WEAPON" },
  "poison": { id: "poison" as const, name: "Poison", glyphName: "Glyph of Poison", essenceRune: "Kuoko", effect: "Deals poison damage on proc", effects: [], esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_POISONED_WEAPON" },
  "weakening": { id: "weakening" as const, name: "Weakening", glyphName: "Glyph of Weakening", essenceRune: "Okori", effect: "Reduces target weapon and spell damage on proc", effects: [], esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_POWER" },
  "hardening": { id: "hardening" as const, name: "Hardening", glyphName: "Glyph of Hardening", essenceRune: "Derado", effect: "Grants a damage shield on proc", effects: [], esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_DAMAGE_SHIELD" },
  "foulness": { id: "foulness" as const, name: "Foulness", glyphName: "Glyph of Foulness", essenceRune: "Haoko", effect: "Deals disease damage on proc", effects: [], esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_BEFOULED_WEAPON" },
  "prismatic-onslaught": { id: "prismatic-onslaught" as const, name: "Prismatic Onslaught", glyphName: "Glyph of Prismatic Onslaught", essenceRune: "Hakeijo", effect: "Deals multi-element damage on proc", effects: [], esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_ONSLAUGHT" },
} as const satisfies Record<string, WeaponEnchantTemplate>

/**
 * Per-enchant, per-component, per-quality numeric values. Only
 * `weapon-damage` and `crushing` carry an entry because the other
 * enchants are proc-based and have no metric-system quality scaling.
 */
export const TEMPER_WEAPON_ENCHANT_QUALITY_VALUES = {
  "weapon-damage": { "weapon-damage": { normal: 134, fine: 141, superior: 153, epic: 160, legendary: 174 } },
  "crushing": { "crushing": { normal: 1621, fine: 1692, superior: 1830, epic: 1947, legendary: 2108 } },
} as const satisfies Record<string, WeaponEnchantQualityComponents>
