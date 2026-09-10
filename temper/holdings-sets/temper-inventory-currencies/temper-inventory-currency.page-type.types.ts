import type { DisplayOrder } from "../../things/properties/display-order.number-property.ts"
import type { Key } from "../../things/properties/key.text-property.ts"
import type { TemperThing } from "../../things/temper-thing.page-type.types.ts"

export type TemperInventoryCurrency = TemperThing & {
  key: Key
  displayOrder: DisplayOrder
}
