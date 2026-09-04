import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperTargetScope = TemperCatalogThing

export const temperTargetScope = {
  id: "01a05fc5-94d1-7137-9597-c8f6faef3147",
  pageTypeSlug: "page-type",
  slug: "temper-target-scope",
  definition: "the shape of ground an ability reaches over",
  pluralSlug: "temper-target-scopes",
  extendsSlug: "page-type/temper-catalog-thing",
  properties: [{ pagePropertySlug: "key", required: true, many: false }],
} as const satisfies PageType
