import type { ComparisonOpId } from "../comparison-op-data/comparison-op-data.module.code.ts"
import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "../rule-filter-types/rule-filter-types.module.code.ts"

export interface QualityOption extends FilterOption {
  variant: "normal" | "fine" | "superior" | "epic" | "legendary"
}

export const QUALITY_OPTIONS: QualityOption[] = [
  { value: "1", label: "Normal", variant: "normal" },
  { value: "2", label: "Fine", variant: "fine" },
  { value: "3", label: "Superior", variant: "superior" },
  { value: "4", label: "Epic", variant: "epic" },
  { value: "5", label: "Legendary", variant: "legendary" },
]

const read = (c: CategoryRule["conditions"]) => c?.maxQuality
const readOp = (c: CategoryRule["conditions"]): ComparisonOpId | undefined => c?.qualityOp

export const QUALITY_FILTER: InventoryRuleFilter = {
  id: "quality",
  label: "Quality",
  priority: 5,
  isEligible: () => true,
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => {
    const v = read(c)
    if (v === undefined) return undefined
    const op = readOp(c)
    const opSuffix = op != null && op !== "<=" ? `(${op})` : ""
    return `${v}${opSuffix}`
  },
  applyDefault: () => ({ maxQuality: 1 }),
  clear: () => ({ maxQuality: undefined, qualityOp: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    if (v === undefined) return {}
    const op = readOp(c)
    return op !== undefined ? { maxQuality: v, qualityOp: op } : { maxQuality: v }
  },
}
