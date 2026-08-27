import type { CategoryRule } from "../inventory-rule-types"
import type { ComparisonOpId } from "./comparison-op-data"
import type { FilterOption, InventoryRuleFilter } from "./filter-types"
import { checkAncestorRoots } from "./filter-utils"

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

export const levelFilter: InventoryRuleFilter = {
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
