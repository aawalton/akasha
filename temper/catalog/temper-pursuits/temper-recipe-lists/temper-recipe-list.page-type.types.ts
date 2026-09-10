import type { DisplayOrder } from "../../../things/properties/display-order.number-property.types.ts"
import type { TemperPursuitThing } from "../temper-pursuit-things/temper-pursuit-thing.page-type.types.ts"
import type { Recipes } from "./properties/recipes.page-property-entry.types.ts"

export type TemperRecipeList = TemperPursuitThing & {
  displayOrder: DisplayOrder
  recipes: Recipes
}
