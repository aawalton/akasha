/**
 * Temper Armor Types (Generated)
 *
 * ESO equipment types that use armor traits and enchantments — the 7
 * armor pieces plus Shield, sourced from the universal pages table
 * (page type: temper-armor-type).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ArmorTypeTemplate } from "../armor-types-data"

/**
 * Keyed record. The literal-id keys flow into `createDataFile`'s
 * `armorTypes.ids` so `(typeof armorTypes.ids)[number]` stays a
 * literal-union typed for callers.
 */
export const TEMPER_ARMOR_TYPES_BY_ID = {
  "chest": { id: "chest" as const, name: "Chest", armorMultiplier: 8, isLargeEnchantSlot: true, validSlots: ["chest"] as const },
  "feet": { id: "feet" as const, name: "Feet", armorMultiplier: 7, isLargeEnchantSlot: false, validSlots: ["feet"] as const },
  "hands": { id: "hands" as const, name: "Hands", armorMultiplier: 4, isLargeEnchantSlot: false, validSlots: ["hands"] as const },
  "head": { id: "head" as const, name: "Head", armorMultiplier: 7, isLargeEnchantSlot: true, validSlots: ["head"] as const },
  "legs": { id: "legs" as const, name: "Legs", armorMultiplier: 7, isLargeEnchantSlot: true, validSlots: ["legs"] as const },
  "shield": { id: "shield" as const, name: "Shield", armorMultiplier: 1, isLargeEnchantSlot: true, validSlots: ["off-hand"] as const },
  "shoulders": { id: "shoulders" as const, name: "Shoulders", armorMultiplier: 7, isLargeEnchantSlot: false, validSlots: ["shoulders"] as const },
  "waist": { id: "waist" as const, name: "Waist", armorMultiplier: 3, isLargeEnchantSlot: false, validSlots: ["waist"] as const },
} as const satisfies Record<string, ArmorTypeTemplate>
