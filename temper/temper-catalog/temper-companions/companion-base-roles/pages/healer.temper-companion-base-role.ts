import type { TemperCompanionBaseRole } from "../temper-companion-base-role.page-type.ts"

export const healer = {
  id: "01a05fce-c49b-75a1-9fc2-ec3182e2d2e2",
  pageTypeSlug: "temper-companion-base-role",
  slug: "healer",
  key: "healer",
  title: "Healer",
  description: "Focused on healing and supporting allies",
  abbreviation: "H",
  displayOrder: 2,
  validArmorWeights: ["light"],
  validTraitIds: ["soothing", "quickened", "focused"],
  validWeaponRoleIds: ["restoration-staff"],
} as const satisfies TemperCompanionBaseRole
