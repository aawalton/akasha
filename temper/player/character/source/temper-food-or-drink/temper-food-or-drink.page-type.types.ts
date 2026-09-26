import type { AbilityId } from "akasha/temper/catalog/companion/skill/properties/ability-id.number-property.types.ts"
import type { HashPlace } from "akasha/temper/catalog/companion/trait/properties/hash-place.number-property.types.ts"
import type { ItemLevel } from "akasha/temper/catalog/gear/thing/properties/item-level.text-property.types.ts"
import type { ItemId } from "akasha/temper/catalog/thing/properties/item-id.number-property.types.ts"
import type { ConsumableSeconds } from "akasha/temper/player/character/source/temper-food-or-drink/properties/consumable-seconds.number-property.types.ts"
import type { FoodOrDrinkKind } from "akasha/temper/player/character/source/temper-food-or-drink/properties/food-or-drink-kind.text-property.types.ts"
import type { SourceEffects } from "akasha/temper/player/character/source/temper-target/properties/source-effects.record-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperFoodOrDrink = TemperThing & {
  foodOrDrinkKind: FoodOrDrinkKind
  itemId: ItemId
  abilityId: AbilityId
  seconds: ConsumableSeconds
  level?: ItemLevel
  effects?: SourceEffects
  hashPlace: HashPlace
}
