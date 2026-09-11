import type { TemperCompanionBaseRole } from "akasha/temper/catalog/temper-companions/temper-companion-base-roles/temper-companion-base-role.page-type.types.ts"

export const support = {
  id: "01a05fce-c49b-727b-849d-73e52fac2adc",
  type: "temper-companion-base-role",
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
