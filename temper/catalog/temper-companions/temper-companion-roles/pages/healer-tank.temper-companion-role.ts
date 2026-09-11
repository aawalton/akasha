import type { TemperCompanionRole } from "akasha/temper/catalog/temper-companions/temper-companion-roles/temper-companion-role.page-type.types.ts"

export const healerTank = {
  id: "01a05fcd-70ff-7fd5-83bd-c878ab858c95",
  type: "temper-companion-role",
  slug: "healer-tank",
  key: "healer+tank",
  title: "Healer + Tank",
} as const satisfies TemperCompanionRole
