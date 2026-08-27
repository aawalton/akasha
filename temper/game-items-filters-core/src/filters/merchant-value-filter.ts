import { checkNumeric } from "@temper/game-items-rules-eval/conditions/check-numeric"
import { runChecker } from "../eval-adapter"
import type { FilterRangeValue } from "../filter-types"
import { defineFilter } from "../filter-types"
import { parseRangeValue } from "../range-value-parse"

export const merchantValueFilter = defineFilter<FilterRangeValue>({
  id: "merchant-value",
  label: "Merchant Value",
  group: "value",
  editor: { kind: "range", min: 0, max: 1000000, ops: ["<=", "<", ">=", ">", "=", "!="] },
  matches(facts, range) {
    return runChecker(checkNumeric, facts, {
      merchantValue: range.value,
      merchantValueOp: range.op ?? "<=",
    })
  },
  serialize(value) {
    return { value: value.value, op: value.op ?? "<=" }
  },
  deserialize(raw) {
    return parseRangeValue(raw)
  },
})
