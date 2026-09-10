import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type SpecializedItemTypes = List<number>

export const specializedItemTypes = {
  id: "01a05fcb-fd31-75e2-a639-16f22bd626ed",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "specialized-item-types",
  propertySlug: "specialized-item-types",
  definition: "a specialized item type The Elder Scrolls Online numbers",
  max: null,
} as const satisfies NumberProperty
