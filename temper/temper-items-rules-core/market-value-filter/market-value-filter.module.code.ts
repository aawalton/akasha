import type { ComparisonOpId } from "../comparison-op-data/comparison-op-data.module.code.ts"
import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryRuleFilter } from "../rule-filter-types/rule-filter-types.module.code.ts"
import { renderThresholdLabel } from "../rule-filter-utils/rule-filter-utils.module.code.ts"

const read = (c: CategoryRule["conditions"]) => c?.marketValue ?? c?.maxValue ?? c?.minValue
const readOp = (c: CategoryRule["conditions"]): ComparisonOpId | undefined => {
  if (c?.marketValueOp != null) return c.marketValueOp
  if (c?.minValue !== undefined && c?.marketValue === undefined) return ">="
  return undefined
}

export const MARKET_VALUE_FILTER: InventoryRuleFilter = {
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
