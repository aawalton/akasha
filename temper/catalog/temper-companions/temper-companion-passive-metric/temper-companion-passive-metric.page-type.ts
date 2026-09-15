import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompanionPassiveMetric = {
  id: "01a05fcd-41a8-7a56-ac2f-218a9b9953da",
  type: "page-type",
  slug: "temper-companion-passive-metric",
  definition: "a number a companion passive moves",
  extends: ["page-type/temper-companion-thing"],
  properties: [{ pageProperty: "text-property/key", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
