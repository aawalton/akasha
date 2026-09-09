import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryHaPower = {
  id: "019e2fcd-59aa-7e6c-b083-7907f66050cf",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-ha-power",
  title: "HA Power",
  nodeId: "ha-power",
  nodeType: "subcategory",
  displayOrder: 0,
  parent: "subcategory-heavy-attacks",
} as const satisfies TemperMetricTree
