import type { CategoryRule } from "../inventory-rule-types"
import type { ComparisonOpId } from "./comparison-op-data"
import type { InventoryRuleFilter } from "./filter-types"
import { renderThresholdLabel } from "./filter-utils"

const read = (c: CategoryRule["conditions"]) => c?.marketValue ?? c?.maxValue ?? c?.minValue
const readOp = (c: CategoryRule["conditions"]): ComparisonOpId | undefined => {
  if (c?.marketValueOp != null) return c.marketValueOp
  if (c?.minValue !== undefined && c?.marketValue === undefined) return ">="
  return undefined
}

export const marketValueFilter: InventoryRuleFilter = {
  id: "market-value",
  label: "Market Value",
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
  applyDefault: () => ({ marketValue: 500, maxValue: undefined, minValue: undefined }),
  clear: () => ({
    marketValue: undefined,
    maxValue: undefined,
    minValue: undefined,
    marketValueOp: undefined,
  }),
  transferToCategory: (c) => {
    const v = read(c)
    if (v === undefined) return {}
    const op = readOp(c)
    return op !== undefined
      ? { marketValue: v, marketValueOp: op, maxValue: undefined, minValue: undefined }
      : { marketValue: v, maxValue: undefined, minValue: undefined }
  },
}
