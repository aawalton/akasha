import { checkNumeric } from "@temper/game-items-rules-eval/conditions/check-numeric"
import { runChecker } from "../eval-adapter"
import type { FilterRangeValue } from "../filter-types"
import { defineFilter } from "../filter-types"
import { parseRangeValue } from "../range-value-parse"
import { thresholdToServerBand } from "../server-narrowing"

export const levelFilter = defineFilter<FilterRangeValue>({
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
