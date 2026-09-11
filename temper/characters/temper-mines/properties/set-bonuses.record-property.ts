import type { Description } from "akasha/pages/properties/description.text-property.types.ts"
import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"
import type { IsPerfected } from "akasha/temper/characters/temper-mines/properties/is-perfected.boolean-property.types.ts"
import type { NumRequired } from "akasha/temper/characters/temper-mines/properties/num-required.number-property.types.ts"

export type SetBonus = {
  description: Description
  isPerfected: IsPerfected
  numRequired: NumRequired
}

export const setBonuses = {
  id: "01a05fcd-f554-73bf-83df-72e8cb8357e3",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "set-bonuses",
  propertySlug: "set-bonuses",
  definition: "what a set gives at each number of pieces worn",
  properties: [
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "boolean-property/is-perfected", required: true, many: false },
    { pageProperty: "number-property/num-required", required: true, many: false },
  ],
  types: "ts",
} as const satisfies RecordProperty
