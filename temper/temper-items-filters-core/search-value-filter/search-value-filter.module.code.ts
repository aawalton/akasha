import { checkNumeric } from "@akasha/temper-items-rules-eval/check-numeric"
import { runChecker } from "../search-eval-adapter/search-eval-adapter.module.code.ts"
import type { FilterRangeValue } from "../search-filter-types/search-filter-types.module.code.ts"
import { defineFilter } from "../search-filter-types/search-filter-types.module.code.ts"
import { parseRangeValue } from "../search-range-value-parse/search-range-value-parse.module.code.ts"

export const VALUE_FILTER = defineFilter<FilterRangeValue>({
  id: "value",
  label: "Value",
  group: "value",
  editor: { kind: "range", min: 0, max: 1000000, ops: ["<=", "<", ">=", ">", "=", "!="] },
  matches(facts, range) {
    return runChecker(checkNumeric, facts, { value: range.value, valueOp: range.op ?? "<=" })
  },
  serialize(value) {
    return { value: value.value, op: value.op ?? "<=" }
  },
  deserialize(raw) {
    return parseRangeValue(raw)
  },
})
