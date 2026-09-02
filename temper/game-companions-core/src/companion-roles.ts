import type { companionRoles } from "@akasha/temper-companions-core/companion-roles"

export interface CompanionRoleTemplate {
  id: string
  name: string
}

export type CompanionRoleId = (typeof companionRoles.ids)[number]
