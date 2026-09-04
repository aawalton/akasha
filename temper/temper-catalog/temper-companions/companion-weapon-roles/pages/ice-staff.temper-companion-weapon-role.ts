import type { TemperCompanionWeaponRole } from "../temper-companion-weapon-role.page-type.ts"

export const iceStaff = {
  id: "01a05fcd-ea71-71e9-9633-bee687d43205",
  pageTypeSlug: "temper-companion-weapon-role",
  slug: "ice-staff",
  key: "ice-staff",
  title: "Ice Staff",
  weaponSkillLineId: "weapon-destruction-staff",
  validMainHandWeaponTypes: ["ice-staff"],
} as const satisfies TemperCompanionWeaponRole
