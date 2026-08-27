import type { CategoryRule } from "../inventory-rule-types"
import type { ComparisonOpId } from "./comparison-op-data"
import type { InventoryRuleFilter } from "./filter-types"
import { renderThresholdLabel } from "./filter-utils"

const read = (c: CategoryRule["conditions"]) => c?.value
const readOp = (c: CategoryRule["conditions"]): ComparisonOpId | undefined => c?.valueOp

export const valueFilter: InventoryRuleFilter = {
  id: "value",
  label: "Value",
  priority: 7,
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
  applyDefault: () => ({ value: 500 }),
  clear: () => ({ value: undefined, valueOp: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    if (v === undefined) return {}
    const op = readOp(c)
    return op !== undefined ? { value: v, valueOp: op } : { value: v }
  },
}
