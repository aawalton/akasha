import type { ComparisonOpId } from "akasha/temper/items/rules/core/modules/comparison-op-data/comparison-op-data.module.code.ts"
import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryRuleFilter } from "akasha/temper/items/rules/core/modules/rule-filter-types/rule-filter-types.module.code.ts"
import { checkAncestorRoots } from "akasha/temper/items/rules/core/modules/rule-filter-utils/rule-filter-utils.module.code.ts"

const LEVEL_ELIGIBLE_ROOTS = new Set(["equipment"])

interface LevelOption {
  value: string
  phraseKey: "level-option" | "champion-option"
  level: number
}

function levelOptionOf(combined: number): LevelOption {
  const value = String(combined)
  if (combined <= 50) return { value, phraseKey: "level-option", level: combined }
  return { value, phraseKey: "champion-option", level: (combined - 50) * 10 }
}

export const LEVEL_OPTIONS: readonly LevelOption[] = [
  ...[10, 20, 30, 40, 50],
  ...Array.from({ length: 16 }, (_, i) => 51 + i),
].map(levelOptionOf)

const read = (c: CategoryRule["conditions"]) => c?.maxLevel
const readOp = (c: CategoryRule["conditions"]): ComparisonOpId | undefined => c?.levelOp

export const LEVEL_FILTER: InventoryRuleFilter = {
  id: "level",
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
