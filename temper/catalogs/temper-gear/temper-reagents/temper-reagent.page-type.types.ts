import type { ItemId } from "../../../catalog/things/properties/item-id.number-property.ts"
import type { TemperCatalogThing } from "../../../catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Icon } from "../../../things/properties/icon.text-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { AlchemyEffects } from "../properties/alchemy-effects.text-property.ts"

export type TemperReagent = TemperCatalogThing & {
  key: Key
  icon: Icon
  itemId: ItemId
  alchemyEffects: AlchemyEffects
}
