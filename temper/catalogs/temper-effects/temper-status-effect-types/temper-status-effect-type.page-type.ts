import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"

export type TemperStatusEffectType = TemperCatalogThing

export const temperStatusEffectType = {
  id: "01a05fc5-94d1-7ae2-b16f-ba2a9dd2c0a7",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-status-effect-type",
  definition: "a kind of condition a hit leaves on its target",
  pluralSlug: "temper-status-effect-types",
  extends: ["page-type/temper-catalog-thing"],
  properties: [{ pageProperty: "text-property/key", required: true, many: false }],
} as const satisfies PageType
