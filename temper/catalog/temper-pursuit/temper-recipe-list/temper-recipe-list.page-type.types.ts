import type { Recipes } from "akasha/temper/catalog/temper-pursuit/temper-recipe-list/properties/recipes.page-property-entry.types.ts"
import type { TemperPursuitThing } from "akasha/temper/catalog/temper-pursuit/thing/temper-pursuit-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"

export type TemperRecipeList = TemperPursuitThing & {
  displayOrder: DisplayOrder
  recipes: Recipes
}
