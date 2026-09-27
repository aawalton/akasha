import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import { temperSpecializedItemType } from "akasha/temper/catalog/temper-specialized-item-type/temper-specialized-item-type.page-type.ts"
import type { TemperSpecializedItemType } from "akasha/temper/catalog/temper-specialized-item-type/temper-specialized-item-type.page-type.types.ts"
import { defineFilter } from "akasha/temper/items/filters/core/modules/search-filter-types/search-filter-types.module.code.ts"
import { numberedOptions } from "akasha/temper/items/filters/core/modules/search-page-options/search-page-options.module.code.ts"
import { parseStringArray } from "akasha/temper/items/filters/core/modules/search-string-array-parse/search-string-array-parse.module.code.ts"

type RecipeSubtypeRow = Pick<TemperSpecializedItemType, "title" | "esoSpecializedItemTypeNumber">

const RECIPE_SUBTYPE_OPTIONS = numberedOptions(
  $pagesOfType<RecipeSubtypeRow>(temperSpecializedItemType),
  (row) => row.esoSpecializedItemTypeNumber
)

export const RECIPE_SUBTYPE_FILTER = defineFilter<readonly string[]>({
  id: "recipe-subtype",
  label: "Recipe Subtype",
  group: "knowledge",
  editor: { kind: "multiselect", options: RECIPE_SUBTYPE_OPTIONS },
  matches(facts, selected) {
    if (selected.length === 0) return true
    if (facts.specializedItemType === undefined) return false
    return selected.includes(String(facts.specializedItemType))
  },
  serialize(value) {
    return [...value]
  },
  deserialize(raw) {
    return parseStringArray(raw)
  },
})
