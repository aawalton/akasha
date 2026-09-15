import type { UespId } from "akasha/temper/catalog/temper-skill/properties/uesp-id.number-property.types.ts"
import type { ItemId } from "akasha/temper/catalog/thing/properties/item-id.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperScribingThing = TemperCatalogThing & {
  key: Key
  itemId: ItemId
  uespId: UespId
}
