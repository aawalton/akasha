import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionRoleGroupOverall = {
  id: "01a0df21-8c4e-785e-b1f3-af122ff79fad",
  type: "page-type/temper-metric-tree",
  slug: "companion-role-group-overall",
  title: "Overall",
  nodeId: "overall",
  nodeType: "companion-role-group",
  displayOrder: 0,
  parent: "temper-metric-tree/companion-stats",
} as const satisfies TemperMetricTree
