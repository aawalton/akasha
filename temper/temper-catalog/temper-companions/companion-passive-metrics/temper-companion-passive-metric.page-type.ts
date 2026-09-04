import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.ts"

export type TemperCompanionPassiveMetric = TemperCompanionThing

export const temperCompanionPassiveMetric = {
  id: "01a05fcd-41a8-7a56-ac2f-218a9b9953da",
  pageTypeSlug: "page-type",
  slug: "temper-companion-passive-metric",
  definition: "a number a companion passive moves",
  pluralSlug: "temper-companion-passive-metrics",
  extendsSlug: ["page-type/temper-companion-thing"],
  properties: [{ pagePropertySlug: "key", required: true, many: false }],
} as const satisfies PageType
