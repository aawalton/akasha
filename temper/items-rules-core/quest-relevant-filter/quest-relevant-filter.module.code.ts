import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "../rule-filter-types/rule-filter-types.module.code.ts"

export const QUEST_RELEVANT_OPTIONS: FilterOption[] = [
  { value: "quest-relevant", label: "Is Quest-Relevant" },
  { value: "not-quest-relevant", label: "Is Not Quest-Relevant" },
]

const read = (c: CategoryRule["conditions"]) => c?.questRelevant

export const QUEST_RELEVANT_FILTER: InventoryRuleFilter = {
  id: "quest-relevant",
  label: "Quest-Relevant Status",
  priority: 0,
  isEligible: () => true,
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ questRelevant: "quest-relevant" }),
  clear: () => ({ questRelevant: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { questRelevant: v } : {}
  },
}
