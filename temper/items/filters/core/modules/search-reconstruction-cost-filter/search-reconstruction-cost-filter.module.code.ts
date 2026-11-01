import type { FilterRangeValue } from "akasha/temper/items/filters/core/modules/search-filter-types/search-filter-types.module.code.ts"
import { defineFilter } from "akasha/temper/items/filters/core/modules/search-filter-types/search-filter-types.module.code.ts"
import { parseRangeValue } from "akasha/temper/items/filters/core/modules/search-range-value-parse/search-range-value-parse.module.code.ts"

export const RECONSTRUCTION_COST_FILTER = defineFilter<FilterRangeValue>({
  id: "reconstruction-cost",
  label: "Reconstruction cost",
  group: "set",
  editor: { kind: "range", min: 0, max: 1000, ops: ["<="] },
  matches(facts, range) {
    const cost = facts.reconstructionCost
    return cost !== undefined && cost <= range.value
  },
  serialize(value) {
    return { value: value.value, op: "<=" }
  },
  deserialize(raw) {
    return parseRangeValue(raw)
  },
})
