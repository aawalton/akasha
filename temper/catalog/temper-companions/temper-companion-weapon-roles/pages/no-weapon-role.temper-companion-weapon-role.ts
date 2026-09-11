import type { TemperCompanionWeaponRole } from "akasha/temper/catalog/temper-companions/temper-companion-weapon-roles/temper-companion-weapon-role.page-type.types.ts"

export const noWeaponRole = {
  id: "01a05fcd-ea71-7f28-9148-440317da7854",
  type: "temper-companion-weapon-role",
  slug: "no-weapon-role",
  key: "no-weapon-role",
  title: "No Weapon Role",
  weaponSkillLineId: "no-skill-line",
} as const satisfies TemperCompanionWeaponRole
