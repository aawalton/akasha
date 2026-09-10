import type { Key } from "../../../things/properties/key.text-property.ts"
import type { ItemId } from "../../things/properties/item-id.number-property.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"
import type { UespId } from "../properties/uesp-id.number-property.ts"

export type TemperScribingThing = TemperCatalogThing & {
  key: Key
  itemId: ItemId
  uespId: UespId
}
