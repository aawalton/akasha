import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const sword = {
  id: "019e46b6-4083-7d4e-826d-2779d0f0ae3a",
  pageTypeSlug: "temper-weapon-type",
  slug: "sword",
  title: "Sword",
  key: "sword",
  enchantmentMultiplier: 0.5,
  esoWeaponType: "WEAPONTYPE_SWORD",
  isTwoHanded: false,
  weaponPower: 1335,
  validSlots: ["main-hand"],
  skillLineId: "weapon-one-hand",
} as const satisfies TemperWeaponType
