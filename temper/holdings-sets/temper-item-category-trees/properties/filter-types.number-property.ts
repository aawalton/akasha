import type { List } from "@akasha/pages/page-property"
import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type FilterTypes = List<number>

export const filterTypes = {
  id: "01a05fcb-fd30-7932-a064-b223a00b2859",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "filter-types",
  propertySlug: "filter-types",
  definition: "an inventory filter The Elder Scrolls Online numbers",
  max: null,
} as const satisfies NumberProperty
