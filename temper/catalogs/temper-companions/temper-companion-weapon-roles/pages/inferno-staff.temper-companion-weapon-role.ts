import type { TemperCompanionWeaponRole } from "../temper-companion-weapon-role.page-type.ts"

export const infernoStaff = {
  id: "01a05fcd-ea71-79ef-b6e3-e8e7c17c5a23",
  pageTypeSlug: "temper-companion-weapon-role",
  slug: "inferno-staff",
  key: "inferno-staff",
  title: "Inferno Staff",
  weaponSkillLineId: "weapon-destruction-staff",
  validMainHandWeaponTypes: ["inferno-staff"],
} as const satisfies TemperCompanionWeaponRole
