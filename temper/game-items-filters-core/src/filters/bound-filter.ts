import { checkFlags } from "@temper/game-items-rules-eval/conditions/check-flags"
import { runChecker } from "../eval-adapter"
import type { FilterToggleValue } from "../filter-types"
import { defineFilter } from "../filter-types"

function parseToggle(raw: unknown): FilterToggleValue | undefined {
  return raw === "include" || raw === "exclude" ? raw : undefined
}

export const boundFilter = defineFilter<FilterToggleValue>({
  id: "bound",
  label: "Bound",
  group: "state",
  editor: { kind: "toggle" },
  matches(facts, value) {
    return runChecker(checkFlags, facts, { bound: value === "include" ? "bound" : "not-bound" })
  },
  serialize(value) {
    return value
  },
  deserialize(raw) {
    return parseToggle(raw)
  },
})
