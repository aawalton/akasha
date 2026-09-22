import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryEffectiveHealing = {
  id: "019e2fcd-5a5a-7feb-927e-e4535bbe99eb",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-effective-healing",
  title: "Effective Healing Power",
  nodeId: "effective-healing",
  nodeType: "subcategory",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-healing-power",
} as const satisfies TemperMetricTree
