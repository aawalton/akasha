import { checkNumeric } from "@akasha/temper-items-rules-eval/check-numeric"
import { runChecker } from "../search-eval-adapter/search-eval-adapter.module.code.ts"
import type { FilterRangeValue } from "../search-filter-types/search-filter-types.module.code.ts"
import { defineFilter } from "../search-filter-types/search-filter-types.module.code.ts"
import { parseRangeValue } from "../search-range-value-parse/search-range-value-parse.module.code.ts"
import { thresholdToServerBand } from "../search-server-narrowing/search-server-narrowing.module.code.ts"

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
