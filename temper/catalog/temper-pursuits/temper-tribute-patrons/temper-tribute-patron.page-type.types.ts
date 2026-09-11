import type { EsoCollectibleId } from "akasha/temper/catalog/temper-pursuits/temper-pursuit-things/properties/eso-collectible-id.number-property.types.ts"
import type { TemperPursuitThing } from "akasha/temper/catalog/temper-pursuits/temper-pursuit-things/temper-pursuit-thing.page-type.types.ts"
import type { Cards } from "akasha/temper/catalog/temper-pursuits/temper-tribute-patrons/properties/cards.page-property-entry.types.ts"
import type { EsoPatronId } from "akasha/temper/catalog/temper-pursuits/temper-tribute-patrons/properties/eso-patron-id.number-property.types.ts"
import type { Category } from "akasha/temper/things/properties/category.text-property.types.ts"

export type TemperTributePatron = TemperPursuitThing & {
  category: Category
  esoPatronId: EsoPatronId
  esoCollectibleId: EsoCollectibleId
  cards: Cards
}
