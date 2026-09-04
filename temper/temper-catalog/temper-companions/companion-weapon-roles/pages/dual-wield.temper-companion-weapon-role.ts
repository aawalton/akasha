import type { TemperCompanionWeaponRole } from "../temper-companion-weapon-role.page-type.ts"

export const dualWield = {
  id: "01a05fcd-ea70-79c4-aaa6-56e61e68b51a",
  pageTypeSlug: "temper-companion-weapon-role",
  slug: "dual-wield",
  key: "dual-wield",
  title: "Dual Wield",
  weaponSkillLineId: "weapon-dual-wield",
  validMainHandWeaponTypes: ["sword", "axe", "mace", "dagger"],
  validOffHandWeaponTypes: ["sword", "axe", "mace", "dagger"],
} as const satisfies TemperCompanionWeaponRole
