import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const noType = {
  id: "019e46b6-407f-7bfa-a955-49524e837b1b",
  pageTypeSlug: "temper-weapon-type",
  slug: "no-type",
  title: "No Type",
  key: "no-type",
  enchantmentMultiplier: 0,
  esoWeaponType: "WEAPONTYPE_NONE",
  isTwoHanded: false,
  weaponPower: 0,
  validSlots: ["main-hand"],
} as const satisfies TemperWeaponType
