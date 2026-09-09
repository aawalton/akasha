import type { FilterToggleValue } from "../search-filter-types/search-filter-types.module.code.ts"
import { defineFilter } from "../search-filter-types/search-filter-types.module.code.ts"
import { parseToggle } from "../search-toggle-value-parse/search-toggle-value-parse.module.code.ts"

export const SET_FILTER = defineFilter<FilterToggleValue>({
  id: "set",
  label: "Set",
  group: "set",
  editor: { kind: "toggle", includeLabel: "In set", excludeLabel: "Not in set" },
  matches(facts, toggle) {
    if (facts.setId === undefined) return false
    return toggle === "include" ? facts.setId > 0 : facts.setId === 0
  },
  serialize(value) {
    return value
  },
  deserialize(raw) {
    return parseToggle(raw)
  },
})
