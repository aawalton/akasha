import type { Cards } from "akasha/temper/catalog/temper-pursuit/temper-tribute-patron/properties/cards.page-property-entry.types.ts"
import type { EsoPatronId } from "akasha/temper/catalog/temper-pursuit/temper-tribute-patron/properties/eso-patron-id.number-property.types.ts"
import type { EsoCollectibleId } from "akasha/temper/catalog/temper-pursuit/thing/properties/eso-collectible-id.number-property.types.ts"
import type { TemperPursuitThing } from "akasha/temper/catalog/temper-pursuit/thing/temper-pursuit-thing.page-type.types.ts"
import type { Category } from "akasha/temper/thing/properties/category.text-property.types.ts"

export type TemperTributePatron = TemperPursuitThing & {
  category: Category
  esoPatronId: EsoPatronId
  esoCollectibleId: EsoCollectibleId
  cards: Cards
}
