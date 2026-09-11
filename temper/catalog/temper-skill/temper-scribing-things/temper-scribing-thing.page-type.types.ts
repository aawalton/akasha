import type { Key } from "../../../things/properties/key.text-property.types.ts"
import type { ItemId } from "../../things/properties/item-id.number-property.types.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"
import type { UespId } from "../properties/uesp-id.number-property.types.ts"

export type TemperScribingThing = TemperCatalogThing & {
  key: Key
  itemId: ItemId
  uespId: UespId
}
