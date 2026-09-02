/**
 * Temper Weapon Types (Generated)
 *
 * ESO equipment types that use weapon traits and enchantments — 12
 * weapon types (4 one-handed melee, 3 two-handed melee, 1 bow, 3
 * destruction staves, 1 restoration staff) plus the `no-type`
 * empty-state sentinel. Sourced from the universal pages table
 * (page type: temper-weapon-type).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { WeaponTypeTemplate } from "../weapon-types-data"

/**
 * Keyed record. `WeaponTypeId` is declared in
 * `@akasha/temper-equipment/weapon-type-ids`, and `weaponTypes` is
 * annotated against that union, so a key here the union does not name
 * is a type error rather than a silent widening.
 */
export const TEMPER_WEAPON_TYPES_BY_ID = {
  "axe": { id: "axe" as const, name: "Axe", esoWeaponType: "WEAPONTYPE_AXE", validSlots: ["main-hand"] as const, weaponPower: 1335, isTwoHanded: false, enchantmentMultiplier: 0.5, skillLineId: "weapon-one-hand" },
  "battleaxe": { id: "battleaxe" as const, name: "Battleaxe", esoWeaponType: "WEAPONTYPE_TWO_HANDED_AXE", validSlots: ["main-hand"] as const, weaponPower: 1571, isTwoHanded: true, enchantmentMultiplier: 1, skillLineId: "weapon-two-handed" },
  "bow": { id: "bow" as const, name: "Bow", esoWeaponType: "WEAPONTYPE_BOW", validSlots: ["main-hand"] as const, weaponPower: 1335, isTwoHanded: true, enchantmentMultiplier: 1, skillLineId: "weapon-bow" },
  "dagger": { id: "dagger" as const, name: "Dagger", esoWeaponType: "WEAPONTYPE_DAGGER", validSlots: ["main-hand"] as const, weaponPower: 1335, isTwoHanded: false, enchantmentMultiplier: 0.5, skillLineId: "weapon-one-hand" },
  "greatsword": { id: "greatsword" as const, name: "Greatsword", esoWeaponType: "WEAPONTYPE_TWO_HANDED_SWORD", validSlots: ["main-hand"] as const, weaponPower: 1571, isTwoHanded: true, enchantmentMultiplier: 1, skillLineId: "weapon-two-handed" },
  "ice-staff": { id: "ice-staff" as const, name: "Ice Staff", esoWeaponType: "WEAPONTYPE_FROST_STAFF", validSlots: ["main-hand"] as const, weaponPower: 1335, isTwoHanded: true, enchantmentMultiplier: 1, skillLineId: "weapon-destruction-staff" },
  "inferno-staff": { id: "inferno-staff" as const, name: "Inferno Staff", esoWeaponType: "WEAPONTYPE_FIRE_STAFF", validSlots: ["main-hand"] as const, weaponPower: 1335, isTwoHanded: true, enchantmentMultiplier: 1, skillLineId: "weapon-destruction-staff" },
  "lightning-staff": { id: "lightning-staff" as const, name: "Lightning Staff", esoWeaponType: "WEAPONTYPE_LIGHTNING_STAFF", validSlots: ["main-hand"] as const, weaponPower: 1335, isTwoHanded: true, enchantmentMultiplier: 1, skillLineId: "weapon-destruction-staff" },
  "mace": { id: "mace" as const, name: "Mace", esoWeaponType: "WEAPONTYPE_HAMMER", validSlots: ["main-hand"] as const, weaponPower: 1335, isTwoHanded: false, enchantmentMultiplier: 0.5, skillLineId: "weapon-one-hand" },
  "maul": { id: "maul" as const, name: "Maul", esoWeaponType: "WEAPONTYPE_TWO_HANDED_HAMMER", validSlots: ["main-hand"] as const, weaponPower: 1571, isTwoHanded: true, enchantmentMultiplier: 1, skillLineId: "weapon-two-handed" },
  "no-type": { id: "no-type" as const, name: "No Type", esoWeaponType: "WEAPONTYPE_NONE", validSlots: ["main-hand"] as const, weaponPower: 0, isTwoHanded: false, enchantmentMultiplier: 0, skillLineId: "" },
  "restoration-staff": { id: "restoration-staff" as const, name: "Restoration Staff", esoWeaponType: "WEAPONTYPE_HEALING_STAFF", validSlots: ["main-hand"] as const, weaponPower: 1335, isTwoHanded: true, enchantmentMultiplier: 1, skillLineId: "weapon-restoration-staff" },
  "sword": { id: "sword" as const, name: "Sword", esoWeaponType: "WEAPONTYPE_SWORD", validSlots: ["main-hand"] as const, weaponPower: 1335, isTwoHanded: false, enchantmentMultiplier: 0.5, skillLineId: "weapon-one-hand" },
} as const satisfies Record<string, WeaponTypeTemplate>
