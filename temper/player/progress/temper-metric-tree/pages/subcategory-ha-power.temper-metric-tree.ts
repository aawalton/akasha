import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryHaPower = {
  id: "019e2fcd-59aa-7e6c-b083-7907f66050cf",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-ha-power",
  title: "HA Power",
  nodeId: "ha-power",
  nodeType: "subcategory",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-heavy-attacks",
} as const satisfies TemperMetricTree
