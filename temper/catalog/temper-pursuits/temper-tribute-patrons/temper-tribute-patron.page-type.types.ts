import type { Category } from "../../../things/properties/category.text-property.types.ts"
import type { EsoCollectibleId } from "../temper-pursuit-things/properties/eso-collectible-id.number-property.types.ts"
import type { TemperPursuitThing } from "../temper-pursuit-things/temper-pursuit-thing.page-type.types.ts"
import type { Cards } from "./properties/cards.page-property-entry.types.ts"
import type { EsoPatronId } from "./properties/eso-patron-id.number-property.types.ts"

export type TemperTributePatron = TemperPursuitThing & {
  category: Category
  esoPatronId: EsoPatronId
  esoCollectibleId: EsoCollectibleId
  cards: Cards
}
