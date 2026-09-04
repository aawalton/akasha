import type { NumberProperty } from "@akasha/pages-system/number-property"

export type LineRankNeeded = number

export const lineRankNeeded = {
  id: "01a05fca-cb84-7e88-808a-4423fe0f9913",
  pageTypeSlug: "number-property",
  slug: "line-rank-needed",
  propertySlug: "line-rank-needed",
  definition: "the skill line rank a skill is learned from",
  max: null,
} as const satisfies NumberProperty
