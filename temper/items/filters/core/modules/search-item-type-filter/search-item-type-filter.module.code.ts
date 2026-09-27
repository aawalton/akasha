import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import { temperItemType } from "akasha/temper/catalog/temper-item-type/temper-item-type.page-type.ts"
import type { TemperItemType } from "akasha/temper/catalog/temper-item-type/temper-item-type.page-type.types.ts"
import { defineFilter } from "akasha/temper/items/filters/core/modules/search-filter-types/search-filter-types.module.code.ts"
import { numberedOptions } from "akasha/temper/items/filters/core/modules/search-page-options/search-page-options.module.code.ts"
import { selectedIdsToServerTerms } from "akasha/temper/items/filters/core/modules/search-server-narrowing/search-server-narrowing.module.code.ts"
import { parseStringArray } from "akasha/temper/items/filters/core/modules/search-string-array-parse/search-string-array-parse.module.code.ts"

type ItemTypeRow = Pick<TemperItemType, "title" | "esoItemTypeNumber">

const ITEM_TYPE_OPTIONS = numberedOptions(
  $pagesOfType<ItemTypeRow>(temperItemType),
  (row) => row.esoItemTypeNumber
)

export const ITEM_TYPE_FILTER = defineFilter<readonly string[]>({
  id: "item-type",
  label: "Item Type",
  group: "type",
  editor: { kind: "multiselect", options: ITEM_TYPE_OPTIONS },
  matches(facts, selected) {
    if (selected.length === 0) return true
    if (facts.itemType === undefined) return false
    return selected.includes(String(facts.itemType))
  },
  applyToSearch(req, selected) {
    req.addExactTerms("item-type", selectedIdsToServerTerms(selected))
  },
  serialize(value) {
    return [...value]
  },
  deserialize(raw) {
    return parseStringArray(raw)
  },
})
