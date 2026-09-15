import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { ReagentNames } from "akasha/temper/catalog/temper-gear/properties/reagent-names.text-property.types.ts"

export type Recipes = List<{
  names: ReagentNames
}>
