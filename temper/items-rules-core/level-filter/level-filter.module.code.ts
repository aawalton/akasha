import type { ComparisonOpId } from "akasha/temper/items-rules-core/comparison-op-data/comparison-op-data.module.code.ts"
import type { CategoryRule } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "akasha/temper/items-rules-core/rule-filter-types/rule-filter-types.module.code.ts"
import { checkAncestorRoots } from "akasha/temper/items-rules-core/rule-filter-utils/rule-filter-utils.module.code.ts"

const LEVEL_ELIGIBLE_ROOTS = new Set(["equipment"])

function formatLevelLabel(value: number): string {
  if (value <= 50) return `Lv ${value}`
  return `CP ${(value - 50) * 10}`
}

export const LEVEL_OPTIONS: FilterOption[] = [
  ...[10, 20, 30, 40, 50].map((lv) => ({
    value: String(lv),
    label: formatLevelLabel(lv),
  })),
  ...Array.from({ length: 16 }, (_, i) => {
    const combined = 51 + i
    return { value: String(combined), label: formatLevelLabel(combined) }
  }),
]

const read = (c: CategoryRule["conditions"]) => c?.maxLevel
const readOp = (c: CategoryRule["conditions"]): ComparisonOpId | undefined => c?.levelOp

export const LEVEL_FILTER: InventoryRuleFilter = {
  id: "level",
  label: "Level",
  priority: 6,
  isEligible: (categoryId, categories) =>
    checkAncestorRoots(categoryId, LEVEL_ELIGIBLE_ROOTS, "opt-in", categories),
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => {
    const v = read(c)
    if (v === undefined) return undefined
    const op = readOp(c)
    const opSuffix = op != null && op !== "<=" ? `(${op})` : ""
    return `${v}${opSuffix}`
  },
  applyDefault: () => ({ maxLevel: 65 }),
  clear: () => ({ maxLevel: undefined, levelOp: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    if (v === undefined) return {}
    const op = readOp(c)
    return op !== undefined ? { maxLevel: v, levelOp: op } : { maxLevel: v }
  },
}
