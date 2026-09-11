import type { TemperCompanionBaseRole } from "akasha/temper/catalog/temper-companions/temper-companion-base-roles/temper-companion-base-role.page-type.types.ts"

export const tank = {
  id: "01a05fce-c49c-7f82-966a-54778069c10a",
  type: "temper-companion-base-role",
  slug: "tank",
  key: "tank",
  title: "Tank",
  description: "Focused on absorbing damage and controlling enemies",
  abbreviation: "T",
  displayOrder: 1,
  validArmorWeights: ["heavy"],
  validTraitIds: ["vigorous", "soothing", "quickened", "focused"],
  validWeaponRoleIds: ["one-hand-and-shield", "ice-staff", "restoration-staff"],
} as const satisfies TemperCompanionBaseRole
