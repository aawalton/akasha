import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryLaPower = {
  id: "019e2fcd-598f-7464-ab98-9bc7d37aedd1",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-la-power",
  title: "LA Power",
  nodeId: "la-power",
  nodeType: "subcategory",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-light-attacks",
} as const satisfies TemperMetricTree
