import type { CategoryRule } from "../inventory-rule-types"
import type { ComparisonOpId } from "./comparison-op-data"
import type { InventoryRuleFilter } from "./filter-types"
import { renderThresholdLabel } from "./filter-utils"

const read = (c: CategoryRule["conditions"]) => c?.merchantValue
const readOp = (c: CategoryRule["conditions"]): ComparisonOpId | undefined => c?.merchantValueOp

export const merchantValueFilter: InventoryRuleFilter = {
  id: "merchant-value",
  label: "Merchant Value",
  priority: 8,
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
  applyDefault: () => ({ merchantValue: 50 }),
  clear: () => ({ merchantValue: undefined, merchantValueOp: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    if (v === undefined) return {}
    const op = readOp(c)
    return op !== undefined ? { merchantValue: v, merchantValueOp: op } : { merchantValue: v }
  },
}
