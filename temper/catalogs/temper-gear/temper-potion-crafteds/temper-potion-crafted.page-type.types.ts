import type { Description } from "../../../../pages/properties/description.text-property.ts"
import type { Icon } from "../../../things/properties/icon.text-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { ItemLevel } from "../properties/item-level.text-property.ts"
import type { PotionSeconds } from "../properties/potion-seconds.number-property.ts"
import type { Recipes } from "../properties/recipes.record-property.ts"
import type { TemperGearThing } from "../temper-gear-things/temper-gear-thing.page-type.types.ts"

export type TemperPotionCrafted = TemperGearThing & {
  key: Key
  description: Description
  icon: Icon
  level: ItemLevel
  seconds: PotionSeconds
  reagents: Recipes
}
