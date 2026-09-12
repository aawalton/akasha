import { runChecker } from "akasha/temper/items-filters-core/search-eval-adapter/search-eval-adapter.module.code.ts"
import type { FilterToggleValue } from "akasha/temper/items-filters-core/search-filter-types/search-filter-types.module.code.ts"
import { defineFilter } from "akasha/temper/items-filters-core/search-filter-types/search-filter-types.module.code.ts"
import { parseToggle } from "akasha/temper/items-filters-core/search-toggle-value-parse/search-toggle-value-parse.module.code.ts"
import { checkStackFullness } from "akasha/temper/items-rules-eval/modules/check-stack-fullness/check-stack-fullness.module.code.ts"

export const STACK_FULLNESS_FILTER = defineFilter<FilterToggleValue>({
  id: "stack-fullness",
  label: "Stack Fullness",
  group: "state",
  editor: { kind: "toggle" },
  matches(facts, toggle) {
    const stackFullness = toggle === "include" ? "full" : "partial"
    return runChecker(checkStackFullness, facts, { stackFullness })
  },
  serialize(value) {
    return value
  },
  deserialize(raw) {
    return parseToggle(raw)
  },
})
