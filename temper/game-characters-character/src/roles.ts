import { roles } from "./generated/temper-character-role.generated"

export interface RoleTemplate {
  id: string
  name: string
}

export type RoleId = (typeof roles.ids)[number]

export function getRoleName(roleIds: readonly RoleId[]): string {
  const filtered = roleIds.filter((id) => id !== "no-role")
  if (filtered.length === 0) return "No Role"
  return filtered.map((id) => roles.data[id].name).join(" + ")
}
