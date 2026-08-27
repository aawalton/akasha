import type { CategoryRule } from "../inventory-rule-types"
import type { ComparisonOpId } from "./comparison-op-data"
import type { InventoryRuleFilter } from "./filter-types"
import { renderThresholdLabel } from "./filter-utils"

const read = (c: CategoryRule["conditions"]) => c?.replacementValue
const readOp = (c: CategoryRule["conditions"]): ComparisonOpId | undefined => c?.replacementValueOp

export const replacementValueFilter: InventoryRuleFilter = {
  id: "replacement-value",
  label: "Replacement Value",
  priority: 10,
  isEligible: () => true,
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => {
    const v = read(c)
    if (v === undefined) return undefined
    const op = readOp(c)
    const opSuffix = op != null && op !== "<=" ? `(${op})` : ""
    return `${renderThresholdLabel(v)}${opSuffix}`
  },
  applyDefault: () => ({ replacementValue: 500 }),
  clear: () => ({ replacementValue: undefined, replacementValueOp: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    if (v === undefined) return {}
    const op = readOp(c)
    return op !== undefined
      ? { replacementValue: v, replacementValueOp: op }
      : { replacementValue: v }
  },
}
