import { runChecker } from "akasha/temper/items-filters-core/search-eval-adapter/search-eval-adapter.module.code.ts"
import type { FilterRangeValue } from "akasha/temper/items-filters-core/search-filter-types/search-filter-types.module.code.ts"
import { defineFilter } from "akasha/temper/items-filters-core/search-filter-types/search-filter-types.module.code.ts"
import { parseRangeValue } from "akasha/temper/items-filters-core/search-range-value-parse/search-range-value-parse.module.code.ts"
import { thresholdToServerBand } from "akasha/temper/items-filters-core/search-server-narrowing/search-server-narrowing.module.code.ts"
import { checkNumeric } from "akasha/temper/items-rules-eval/modules/check-numeric/check-numeric.module.code.ts"

export const LEVEL_FILTER = defineFilter<FilterRangeValue>({
  id: "level",
  label: "Level",
  group: "level",
  editor: { kind: "range", min: 1, max: 66, ops: ["<=", "<", ">=", ">", "=", "!="] },
  matches(facts, range) {
    return runChecker(checkNumeric, facts, { maxLevel: range.value, levelOp: range.op ?? "<=" })
  },
  applyToSearch(req, range) {
    const band = thresholdToServerBand(range)
    if (band === undefined) return
    req.setRange("level", band[0], band[1])
  },
  serialize(value) {
    return { value: value.value, op: value.op ?? "<=" }
  },
  deserialize(raw) {
    return parseRangeValue(raw)
  },
})
