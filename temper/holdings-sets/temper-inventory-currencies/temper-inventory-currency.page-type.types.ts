import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"
import type { TemperThing } from "akasha/temper/things/temper-thing.page-type.types.ts"

export type TemperInventoryCurrency = TemperThing & {
  key: Key
  displayOrder: DisplayOrder
}
