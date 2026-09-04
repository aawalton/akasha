import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const iceStaff = {
  id: "019e46b6-4096-7618-a107-04208bd01142",
  pageTypeSlug: "temper-weapon-type",
  slug: "ice-staff",
  title: "Ice Staff",
  key: "ice-staff",
  enchantmentMultiplier: 1,
  esoWeaponType: "WEAPONTYPE_FROST_STAFF",
  isTwoHanded: true,
  weaponPower: 1335,
  validSlots: ["main-hand"],
  skillLineId: "weapon-destruction-staff",
} as const satisfies TemperWeaponType
