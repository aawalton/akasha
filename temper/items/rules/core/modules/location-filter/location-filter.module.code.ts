import { temperBag } from "akasha/temper/catalog/world/temper-bag/temper-bag.page-type.ts"
import { temperLocationType } from "akasha/temper/catalog/world/temper-location-type/temper-location-type.page-type.ts"
import {
  heldKeyedTitles,
  titleOf,
} from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import type { InventoryLocationConditionId } from "akasha/temper/items/core/modules/location-condition/location-condition.module.code.ts"
import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "akasha/temper/items/rules/core/modules/rule-filter-types/rule-filter-types.module.code.ts"

const LOCATION_TITLED_BY: readonly {
  value: InventoryLocationConditionId
  pageTypeSlug: string
}[] = [
  { value: "worn", pageTypeSlug: temperBag.slug },
  { value: "backpack", pageTypeSlug: temperBag.slug },
  { value: "bank", pageTypeSlug: temperLocationType.slug },
  { value: "craftbag", pageTypeSlug: temperLocationType.slug },
  { value: "housing-storage", pageTypeSlug: temperLocationType.slug },
  { value: "house", pageTypeSlug: temperLocationType.slug },
  { value: "companion", pageTypeSlug: temperLocationType.slug },
  { value: "guild", pageTypeSlug: temperLocationType.slug },
]

export const LOCATION_VALUES: readonly InventoryLocationConditionId[] = LOCATION_TITLED_BY.map(
  (one) => one.value
)

export function locationOptions(): readonly FilterOption[] {
  return LOCATION_TITLED_BY.map(({ value, pageTypeSlug }) => {
    const titles = heldKeyedTitles(pageTypeSlug)
    return { value, label: titles === null ? value : titleOf(titles, value) }
  })
}

const read = (c: CategoryRule["conditions"]) =>
  c?.location && c.location.length > 0 ? c.location : undefined

export const LOCATION_FILTER: InventoryRuleFilter = {
  id: "location",
  label: "Location",
  priority: 4,
  isEligible: () => true,
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => {
    const v = read(c)
    return v !== undefined ? [...v].sort().join(",") : undefined
  },
  applyDefault: () => ({}),
  clear: () => ({ location: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { location: v } : {}
  },
}
