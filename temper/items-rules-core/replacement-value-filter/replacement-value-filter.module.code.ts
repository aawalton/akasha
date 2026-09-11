import type { ComparisonOpId } from "akasha/temper/items-rules-core/comparison-op-data/comparison-op-data.module.code.ts"
import type { CategoryRule } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryRuleFilter } from "akasha/temper/items-rules-core/rule-filter-types/rule-filter-types.module.code.ts"
import { renderThresholdLabel } from "akasha/temper/items-rules-core/rule-filter-utils/rule-filter-utils.module.code.ts"

const read = (c: CategoryRule["conditions"]) => c?.replacementValue
const readOp = (c: CategoryRule["conditions"]): ComparisonOpId | undefined => c?.replacementValueOp

export const REPLACEMENT_VALUE_FILTER: InventoryRuleFilter = {
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
