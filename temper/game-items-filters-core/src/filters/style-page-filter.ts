import type { FilterToggleValue } from "../filter-types"
import { defineFilter } from "../filter-types"

const SPECIALIZED_ITEMTYPE_COLLECTIBLE_STYLE_PAGE = 82

function parseToggle(raw: unknown): FilterToggleValue | undefined {
  return raw === "include" || raw === "exclude" ? raw : undefined
}

export const stylePageFilter = defineFilter<FilterToggleValue>({
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
