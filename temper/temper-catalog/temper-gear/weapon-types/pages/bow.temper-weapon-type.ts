import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const bow = {
  id: "019e46b6-4093-7b67-baf3-46ba92124202",
  pageTypeSlug: "temper-weapon-type",
  slug: "bow",
  title: "Bow",
  key: "bow",
  enchantmentMultiplier: 1,
  esoWeaponType: "WEAPONTYPE_BOW",
  isTwoHanded: true,
  weaponPower: 1335,
  validSlots: ["main-hand"],
  skillLineId: "weapon-bow",
} as const satisfies TemperWeaponType
