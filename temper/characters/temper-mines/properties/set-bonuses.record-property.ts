import type { List } from "@akasha/pages/page-property"
import type { RecordProperty } from "@akasha/pages/record-property"
import type { Description } from "../../../../pages/properties/description.text-property.ts"
import type { IsPerfected } from "./is-perfected.boolean-property.ts"
import type { NumRequired } from "./num-required.number-property.ts"

export type SetBonus = {
  description: Description
  isPerfected: IsPerfected
  numRequired: NumRequired
}

export type SetBonuses = List<SetBonus>

export const setBonuses = {
  id: "01a05fcd-f554-73bf-83df-72e8cb8357e3",
  pageTypeSlug: "record-property",
  slug: "set-bonuses",
  propertySlug: "set-bonuses",
  definition: "what a set gives at each number of pieces worn",
  properties: [
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "boolean-property/is-perfected", required: true, many: false },
    { pageProperty: "number-property/num-required", required: true, many: false },
  ],
} as const satisfies RecordProperty
