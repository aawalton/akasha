import { checkStackFullness } from "@temper/game-items-rules-eval/conditions/check-stack-fullness"
import { runChecker } from "../eval-adapter"
import type { FilterToggleValue } from "../filter-types"
import { defineFilter } from "../filter-types"

function parseToggle(raw: unknown): FilterToggleValue | undefined {
  return raw === "include" || raw === "exclude" ? raw : undefined
}

export const stackFullnessFilter = defineFilter<FilterToggleValue>({
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
