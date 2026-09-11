import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"
import type { ReagentNames } from "akasha/temper/catalog/temper-gear/properties/reagent-names.text-property.types.ts"

export type Recipes = List<{
  names: ReagentNames
}>
