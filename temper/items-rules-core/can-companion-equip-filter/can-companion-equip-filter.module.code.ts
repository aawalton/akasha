import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "../rule-filter-types/rule-filter-types.module.code.ts"
import { checkAncestorRoots } from "../rule-filter-utils/rule-filter-utils.module.code.ts"

const CAN_COMPANION_EQUIP_ELIGIBLE_ROOTS = new Set(["equipment"])

export const CAN_COMPANION_EQUIP_OPTIONS: FilterOption[] = [
  { value: "can-companion-equip", label: "Can Companion Equip" },
  { value: "cannot-companion-equip", label: "Cannot Companion Equip" },
]

const read = (c: CategoryRule["conditions"]) => c?.canCompanionEquip

export const CAN_COMPANION_EQUIP_FILTER: InventoryRuleFilter = {
  id: "can-companion-equip",
  label: "Can Companion Equip",
  priority: 0,
  isEligible: (categoryId, categories) =>
    checkAncestorRoots(categoryId, CAN_COMPANION_EQUIP_ELIGIBLE_ROOTS, "opt-in", categories),
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ canCompanionEquip: "can-companion-equip" }),
  clear: () => ({ canCompanionEquip: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { canCompanionEquip: v } : {}
  },
}
