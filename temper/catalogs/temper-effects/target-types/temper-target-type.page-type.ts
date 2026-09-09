import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.ts"

export type TemperTargetType = TemperCatalogThing

export const temperTargetType = {
  id: "01a05fc5-94d2-7f4f-9b3c-6c27e1c09266",
  pageTypeSlug: "page-type",
  slug: "temper-target-type",
  definition: "who or what an ability is aimed at",
  pluralSlug: "temper-target-types",
  extends: ["page-type/temper-catalog-thing"],
  properties: [{ pageProperty: "text-property/key", required: true, many: false }],
} as const satisfies PageType
