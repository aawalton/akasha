import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const esoItemTypeNumber = {
  id: "01a0e108-f720-7bf0-bc8b-e78338167169",
  type: "page-type/number-property",
  slug: "eso-item-type-number",
  propertySlug: "eso-item-type-number",
  definition: "the number The Elder Scrolls Online gives a sort of item",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
