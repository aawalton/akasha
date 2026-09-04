import type { PageType } from "@akasha/pages-system/page-type"
import type { EffectType } from "../../temper-catalog-things/properties/effect-type.text-property.ts"
import type { MetricId } from "../../temper-catalog-things/properties/metric-id.text-property.ts"
import type { IsReduction } from "../temper-companion-things/properties/is-reduction.boolean-property.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.ts"

export type TemperCompanionTrait = TemperCompanionThing & {
  isReduction: IsReduction
  metricId?: MetricId
  type?: EffectType
}

export const temperCompanionTrait = {
  id: "01a05fce-1854-7c89-a767-43b54ae4cefa",
  pageTypeSlug: "page-type",
  slug: "temper-companion-trait",
  definition: "a property a piece of companion equipment is worked with",
  pluralSlug: "temper-companion-traits",
  extendsSlug: ["page-type/temper-companion-thing"],
  partSlugs: [
    "boolean-property/is-reduction",
    "text-property/effect-type",
    "text-property/metric-id",
  ],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "metric-id", required: false, many: false },
    { pagePropertySlug: "effect-type", required: false, many: false },
    { pagePropertySlug: "is-reduction", required: true, many: false },
  ],
} as const satisfies PageType
