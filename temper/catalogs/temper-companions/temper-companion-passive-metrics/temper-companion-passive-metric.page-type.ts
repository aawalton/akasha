import type { PageType } from "@akasha/pages/page-type"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.types.ts"

export type TemperCompanionPassiveMetric = TemperCompanionThing

export const temperCompanionPassiveMetric = {
  id: "01a05fcd-41a8-7a56-ac2f-218a9b9953da",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-companion-passive-metric",
  definition: "a number a companion passive moves",
  pluralSlug: "temper-companion-passive-metrics",
  extends: ["page-type/temper-companion-thing"],
  properties: [{ pageProperty: "text-property/key", required: true, many: false }],
} as const satisfies PageType
