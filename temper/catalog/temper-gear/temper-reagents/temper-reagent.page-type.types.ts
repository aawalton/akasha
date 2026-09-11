import type { AlchemyEffects } from "akasha/temper/catalog/temper-gear/properties/alchemy-effects.text-property.types.ts"
import type { ItemId } from "akasha/temper/catalog/things/properties/item-id.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Icon } from "akasha/temper/things/properties/icon.text-property.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperReagent = TemperCatalogThing & {
  key: Key
  icon: Icon
  itemId: ItemId
  alchemyEffects: AlchemyEffects
}
