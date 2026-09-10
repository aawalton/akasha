import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { TemperPursuitThing } from "../temper-pursuit-things/temper-pursuit-thing.page-type.types.ts"
import type { Recipes } from "./properties/recipes.page-property-entry.ts"

export type TemperRecipeList = TemperPursuitThing & {
  displayOrder: DisplayOrder
  recipes: Recipes
}
