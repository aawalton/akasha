import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperStatusEffectType = TemperCatalogThing

export const temperStatusEffectType = {
  id: "01a05fc5-94d1-7ae2-b16f-ba2a9dd2c0a7",
  pageTypeSlug: "page-type",
  slug: "temper-status-effect-type",
  definition: "a kind of condition a hit leaves on its target",
  pluralSlug: "temper-status-effect-types",
  extendsSlug: ["page-type/temper-catalog-thing"],
  properties: [{ pagePropertySlug: "key", required: true, many: false }],
} as const satisfies PageType
