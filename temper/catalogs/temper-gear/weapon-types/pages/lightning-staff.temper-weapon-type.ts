import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const lightningStaff = {
  id: "019e46b6-4097-7ac7-8bc9-adecad7a9a43",
  pageTypeSlug: "temper-weapon-type",
  slug: "lightning-staff",
  title: "Lightning Staff",
  key: "lightning-staff",
  enchantmentMultiplier: 1,
  esoWeaponType: "WEAPONTYPE_LIGHTNING_STAFF",
  isTwoHanded: true,
  weaponPower: 1335,
  validSlots: ["main-hand"],
  skillLineId: "weapon-destruction-staff",
} as const satisfies TemperWeaponType
