import type { companionRoles } from "./generated/temper-companion-role.generated"

export interface CompanionRoleTemplate {
  id: string
  name: string
}

export type CompanionRoleId = (typeof companionRoles.ids)[number]
