import {
  type EquipmentQualityOptionId,
  equipmentQualities,
} from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import type { ComparisonOpId } from "akasha/temper/items/rules/core/modules/comparison-op-data/comparison-op-data.module.code.ts"
import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "akasha/temper/items/rules/core/modules/rule-filter-types/rule-filter-types.module.code.ts"

interface QualityOption extends FilterOption {
  variant: Exclude<EquipmentQualityOptionId, "no-quality">
}

export function qualityOptions(): QualityOption[] {
  return equipmentQualities().list.flatMap((quality) =>
    quality.available && quality.id !== "no-quality"
      ? [{ value: String(quality.esoDisplayQuality), label: quality.name, variant: quality.id }]
      : []
  )
}

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
