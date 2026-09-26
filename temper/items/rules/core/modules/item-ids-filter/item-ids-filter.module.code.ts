import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryRuleFilter } from "akasha/temper/items/rules/core/modules/rule-filter-types/rule-filter-types.module.code.ts"

const read = (c: CategoryRule["conditions"]) => c?.itemIds

export const ITEM_IDS_FILTER: InventoryRuleFilter = {
  id: "item-ids",
  label: "Item Ids",
  priority: 1,
  isEligible: () => true,
  offered: false,
  mutuallyExclusive: [],
  isPresent: (c) => (read(c)?.length ?? 0) > 0,
  fingerprint: (c) => {
    const v = read(c)
    if (v === undefined || v.length === 0) return undefined
    return v.join(",")
  },
  applyDefault: () => ({}),
  clear: () => ({ itemIds: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v === undefined ? {} : { itemIds: v }
  },
}
