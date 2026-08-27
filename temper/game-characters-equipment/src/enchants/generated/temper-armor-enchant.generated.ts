/**
 * Temper Armor Enchants (Generated)
 *
 * ESO armor enchantments (glyphs) — the 4 functional enchants (health,
 * magicka, stamina, prismatic-defense) plus the no-enchant sentinel,
 * sourced from the universal pages table (page type:
 * temper-armor-enchant).
 *
 * Row order matches the legacy `armorEnchants.ids` iteration order,
 * which the character codec uses as an append-only index map.
 * Reordering rows would invalidate every existing shared build URL.
 *
 * `TEMPER_ARMOR_ENCHANT_QUALITY_VALUES` is a per-enchant
 * `Record<componentKey, QualityValues>` map. For most enchants the
 * single component key equals the enchant id; `prismatic-defense` has
 * two component sub-tables, `prismatic-health` and
 * `prismatic-resource`. `no-enchant` is omitted because it has no
 * quality scaling.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type {
  ArmorEnchantQualityComponents,
  ArmorEnchantTemplate,
} from "../armor-enchants-data"

/**
 * Keyed record. The literal-id keys flow into `createDataFile`'s
 * `armorEnchants.ids` so `(typeof armorEnchants.ids)[number]` stays
 * a literal-union typed for callers (codec, schema, UI).
 */
export const TEMPER_ARMOR_ENCHANTS_BY_ID = {
  "no-enchant": { id: "no-enchant" as const, name: "No Enchant", glyphName: "", essenceRune: "", effect: "", effects: [], esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_NONE" },
  "health": { id: "health" as const, name: "Health", glyphName: "Glyph of Health", essenceRune: "Oko", effect: "Increases Maximum Health", effects: [{ metricId: "health-maximum" as const, effectType: "integer" as const, effectValue: 954 }], esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_HEALTH" },
  "magicka": { id: "magicka" as const, name: "Magicka", glyphName: "Glyph of Magicka", essenceRune: "Makko", effect: "Increases Maximum Magicka", effects: [{ metricId: "magicka-maximum" as const, effectType: "integer" as const, effectValue: 868 }], esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_MAGICKA" },
  "stamina": { id: "stamina" as const, name: "Stamina", glyphName: "Glyph of Stamina", essenceRune: "Deni", effect: "Increases Maximum Stamina", effects: [{ metricId: "stamina-maximum" as const, effectType: "integer" as const, effectValue: 868 }], esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_STAMINA" },
  "prismatic-defense": { id: "prismatic-defense" as const, name: "Prismatic Defense", glyphName: "Glyph of Prismatic Defense", essenceRune: "Hakeijo", effect: "Increases Maximum Health, Magicka, and Stamina", effects: [{ metricId: "health-maximum" as const, effectType: "integer" as const, effectValue: 477 }, { metricId: "magicka-maximum" as const, effectType: "integer" as const, effectValue: 434 }, { metricId: "stamina-maximum" as const, effectType: "integer" as const, effectValue: 434 }], esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_DEFENSE" },
} as const satisfies Record<string, ArmorEnchantTemplate>

/**
 * Per-enchant, per-component, per-quality numeric values. The
 * no-enchant sentinel is omitted because it has no quality table.
 */
export const TEMPER_ARMOR_ENCHANT_QUALITY_VALUES = {
  "health": { "health": { normal: 734, fine: 774, superior: 839, epic: 882, legendary: 954 } },
  "magicka": { "magicka": { normal: 668, fine: 704, superior: 763, epic: 802, legendary: 868 } },
  "stamina": { "stamina": { normal: 668, fine: 704, superior: 763, epic: 802, legendary: 868 } },
  "prismatic-defense": { "prismatic-health": { normal: 381, fine: 405, superior: 429, epic: 453, legendary: 477 }, "prismatic-resource": { normal: 347, fine: 368, superior: 390, epic: 412, legendary: 434 } },
} as const satisfies Record<string, ArmorEnchantQualityComponents>
