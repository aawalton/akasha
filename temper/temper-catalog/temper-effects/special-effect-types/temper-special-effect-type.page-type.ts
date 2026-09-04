import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperSpecialEffectType = TemperCatalogThing

export const temperSpecialEffectType = {
  id: "01a05fc5-94d0-79b4-82e2-3a1a42663ad8",
  pageTypeSlug: "page-type",
  slug: "temper-special-effect-type",
  definition: "a kind of effect written as an act rather than as a number",
  pluralSlug: "temper-special-effect-types",
  extendsSlug: ["page-type/temper-catalog-thing"],
  properties: [{ pagePropertySlug: "key", required: true, many: false }],
} as const satisfies PageType
