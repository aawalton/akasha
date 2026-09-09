import type { FilterToggleValue } from "../search-filter-types/search-filter-types.module.code.ts"
import { defineFilter } from "../search-filter-types/search-filter-types.module.code.ts"
import { parseToggle } from "../search-toggle-value-parse/search-toggle-value-parse.module.code.ts"

const SPECIALIZED_ITEMTYPE_COLLECTIBLE_STYLE_PAGE = 82

export const STYLE_PAGE_FILTER = defineFilter<FilterToggleValue>({
  id: "style-page",
  label: "Style Page",
  group: "knowledge",
  editor: { kind: "toggle" },
  matches(facts, value) {
    if (facts.specializedItemType === undefined) return false
    const isStylePage = facts.specializedItemType === SPECIALIZED_ITEMTYPE_COLLECTIBLE_STYLE_PAGE
    return value === "include" ? isStylePage : !isStylePage
  },
  serialize(value) {
    return value
  },
  deserialize(raw) {
    return parseToggle(raw)
  },
})
