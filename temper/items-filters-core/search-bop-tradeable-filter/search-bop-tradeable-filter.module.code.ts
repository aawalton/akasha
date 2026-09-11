import { runChecker } from "akasha/temper/items-filters-core/search-eval-adapter/search-eval-adapter.module.code.ts"
import type { FilterToggleValue } from "akasha/temper/items-filters-core/search-filter-types/search-filter-types.module.code.ts"
import { defineFilter } from "akasha/temper/items-filters-core/search-filter-types/search-filter-types.module.code.ts"
import { parseToggle } from "akasha/temper/items-filters-core/search-toggle-value-parse/search-toggle-value-parse.module.code.ts"
import { checkFlags } from "akasha/temper/items-rules-eval/check-flags/check-flags.module.code.ts"

export const BOP_TRADEABLE_FILTER = defineFilter<FilterToggleValue>({
  id: "bop-tradeable",
  label: "BoP-Tradeable",
  group: "state",
  editor: { kind: "toggle" },
  matches(facts, value) {
    return runChecker(checkFlags, facts, {
      bopTradeable: value === "include" ? "bop-tradeable" : "not-bop-tradeable",
    })
  },
  serialize(value) {
    return value
  },
  deserialize(raw) {
    return parseToggle(raw)
  },
})
