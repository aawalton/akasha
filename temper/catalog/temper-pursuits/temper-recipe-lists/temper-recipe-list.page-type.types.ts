import type { TemperPursuitThing } from "akasha/temper/catalog/temper-pursuits/temper-pursuit-things/temper-pursuit-thing.page-type.types.ts"
import type { Recipes } from "akasha/temper/catalog/temper-pursuits/temper-recipe-lists/properties/recipes.page-property-entry.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"

export type TemperRecipeList = TemperPursuitThing & {
  displayOrder: DisplayOrder
  recipes: Recipes
}
