import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricExperienceGain = {
  id: "019e2fcd-5ab9-7dfd-b617-33ea833048ed",
  type: "page-type/temper-metric-tree",
  slug: "metric-experience-gain",
  title: "Experience Gain",
  nodeId: "experience-gain",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/category-other",
} as const satisfies TemperMetricTree
