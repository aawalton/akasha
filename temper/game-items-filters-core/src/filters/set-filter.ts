import type { FilterToggleValue } from "../filter-types"
import { defineFilter } from "../filter-types"

function parseToggle(raw: unknown): FilterToggleValue | undefined {
  return raw === "include" || raw === "exclude" ? raw : undefined
}

export const setFilter = defineFilter<FilterToggleValue>({
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
