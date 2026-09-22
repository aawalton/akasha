import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryHaDamage = {
  id: "019e2fcd-59b9-70c5-bfa3-9aee915a5d68",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-ha-damage",
  title: "HA Damage",
  nodeId: "ha-damage",
  nodeType: "subcategory",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-heavy-attacks",
} as const satisfies TemperMetricTree
