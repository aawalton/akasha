import type { TemperCompanionBaseRole } from "../temper-companion-base-role.page-type.ts"

export const support = {
  id: "01a05fce-c49b-727b-849d-73e52fac2adc",
  pageTypeSlug: "temper-companion-base-role",
  slug: "support",
  key: "support",
  title: "Support",
  description: "Focused on buffing allies through offensive and defensive buffs and debuffs",
  abbreviation: "S",
  displayOrder: 3,
  validArmorWeights: ["light"],
  validTraitIds: ["quickened"],
  validWeaponRoleIds: ["restoration-staff"],
} as const satisfies TemperCompanionBaseRole
