import type { Icon } from "../../../things/properties/icon.text-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { ItemId } from "../../things/properties/item-id.number-property.types.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"
import type { AlchemyEffects } from "../properties/alchemy-effects.text-property.types.ts"

export type TemperReagent = TemperCatalogThing & {
  key: Key
  icon: Icon
  itemId: ItemId
  alchemyEffects: AlchemyEffects
}
