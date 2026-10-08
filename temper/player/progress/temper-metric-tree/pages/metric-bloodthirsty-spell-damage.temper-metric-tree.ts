import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricBloodthirstySpellDamage = {
  id: "019e2fcd-59ec-7e2b-a73f-1c44fafcf76a",
  type: "page-type/temper-metric-tree",
  slug: "metric-bloodthirsty-spell-damage",
  title: "Bloodthirsty Spell Damage",
  nodeId: "bloodthirsty-spell-damage",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-bloodthirsty",
  createdAt: "2026-05-16T08:00:47.596Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
