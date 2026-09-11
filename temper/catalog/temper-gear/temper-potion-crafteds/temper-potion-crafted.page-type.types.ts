import type { Description } from "akasha/pages/properties/description.text-property.types.ts"
import type { ItemLevel } from "akasha/temper/catalog/temper-gear/properties/item-level.text-property.types.ts"
import type { PotionSeconds } from "akasha/temper/catalog/temper-gear/properties/potion-seconds.number-property.types.ts"
import type { Recipes } from "akasha/temper/catalog/temper-gear/properties/recipes.record-property.ts"
import type { TemperGearThing } from "akasha/temper/catalog/temper-gear/things/temper-gear-thing.page-type.types.ts"
import type { Icon } from "akasha/temper/things/properties/icon.text-property.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperPotionCrafted = TemperGearThing & {
  key: Key
  description: Description
  icon: Icon
  level: ItemLevel
  seconds: PotionSeconds
  reagents: Recipes
}
