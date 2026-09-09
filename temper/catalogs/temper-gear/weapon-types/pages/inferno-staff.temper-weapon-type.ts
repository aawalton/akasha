import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const infernoStaff = {
  id: "019e46b6-4095-718f-8cbf-783b175896ca",
  pageTypeSlug: "temper-weapon-type",
  slug: "inferno-staff",
  title: "Inferno Staff",
  key: "inferno-staff",
  enchantmentMultiplier: 1,
  esoWeaponType: "WEAPONTYPE_FIRE_STAFF",
  isTwoHanded: true,
  weaponPower: 1335,
  validSlots: ["main-hand"],
  skillLineId: "weapon-destruction-staff",
} as const satisfies TemperWeaponType
