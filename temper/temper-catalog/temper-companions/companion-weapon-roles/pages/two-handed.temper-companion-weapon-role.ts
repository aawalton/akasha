import type { TemperCompanionWeaponRole } from "../temper-companion-weapon-role.page-type.ts"

export const twoHanded = {
  id: "01a05fcd-ea72-7afa-bd37-52049414a82e",
  pageTypeSlug: "temper-companion-weapon-role",
  slug: "two-handed",
  key: "two-handed",
  title: "Two Handed",
  weaponSkillLineId: "weapon-two-handed",
  validMainHandWeaponTypes: ["greatsword", "battleaxe", "maul"],
} as const satisfies TemperCompanionWeaponRole
