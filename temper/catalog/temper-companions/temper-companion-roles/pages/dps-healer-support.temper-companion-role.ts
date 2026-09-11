import type { TemperCompanionRole } from "akasha/temper/catalog/temper-companions/temper-companion-roles/temper-companion-role.page-type.types.ts"

export const dpsHealerSupport = {
  id: "01a05fcd-70fc-7679-a2b6-85d765ff717e",
  type: "temper-companion-role",
  slug: "dps-healer-support",
  key: "dps+healer+support",
  title: "DPS + Healer + Support",
} as const satisfies TemperCompanionRole
