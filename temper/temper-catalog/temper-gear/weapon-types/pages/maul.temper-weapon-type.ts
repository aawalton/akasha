import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const maul = {
  id: "019e46b6-4092-7487-901f-b23ac746b0b1",
  pageTypeSlug: "temper-weapon-type",
  slug: "maul",
  title: "Maul",
  key: "maul",
  enchantmentMultiplier: 1,
  esoWeaponType: "WEAPONTYPE_TWO_HANDED_HAMMER",
  isTwoHanded: true,
  weaponPower: 1571,
  validSlots: ["main-hand"],
  skillLineId: "weapon-two-handed",
} as const satisfies TemperWeaponType
