import { ARMOR_WEIGHT_FILTER } from "akasha/temper/items-filters-core/search-armor-weight-filter/search-armor-weight-filter.module.code.ts"
import { BOP_TRADEABLE_FILTER } from "akasha/temper/items-filters-core/search-bop-tradeable-filter/search-bop-tradeable-filter.module.code.ts"
import { BOUND_FILTER } from "akasha/temper/items-filters-core/search-bound-filter/search-bound-filter.module.code.ts"
import { CRAFTED_FILTER } from "akasha/temper/items-filters-core/search-crafted-filter/search-crafted-filter.module.code.ts"
import { EQUIP_SLOT_FILTER } from "akasha/temper/items-filters-core/search-equip-slot-filter/search-equip-slot-filter.module.code.ts"
import type {
  AnyTemperFilter,
  FilterId,
} from "akasha/temper/items-filters-core/search-filter-types/search-filter-types.module.code.ts"
import { ITEM_NAME_FILTER } from "akasha/temper/items-filters-core/search-item-name-filter/search-item-name-filter.module.code.ts"
import { ITEM_TYPE_FILTER } from "akasha/temper/items-filters-core/search-item-type-filter/search-item-type-filter.module.code.ts"
import { KNOWLEDGE_FILTER } from "akasha/temper/items-filters-core/search-knowledge-filter/search-knowledge-filter.module.code.ts"
import { LEVEL_FILTER } from "akasha/temper/items-filters-core/search-level-filter/search-level-filter.module.code.ts"
import { LOCKED_FILTER } from "akasha/temper/items-filters-core/search-locked-filter/search-locked-filter.module.code.ts"
import { MARKET_VALUE_FILTER } from "akasha/temper/items-filters-core/search-market-value-filter/search-market-value-filter.module.code.ts"
import { MERCHANT_VALUE_FILTER } from "akasha/temper/items-filters-core/search-merchant-value-filter/search-merchant-value-filter.module.code.ts"
import { POTION_EFFECTS_FILTER } from "akasha/temper/items-filters-core/search-potion-effects-filter/search-potion-effects-filter.module.code.ts"
import { QUALITY_FILTER } from "akasha/temper/items-filters-core/search-quality-filter/search-quality-filter.module.code.ts"
import { RECIPE_SUBTYPE_FILTER } from "akasha/temper/items-filters-core/search-recipe-subtype-filter/search-recipe-subtype-filter.module.code.ts"
import { RECONSTRUCTED_FILTER } from "akasha/temper/items-filters-core/search-reconstructed-filter/search-reconstructed-filter.module.code.ts"
import { SET_FILTER } from "akasha/temper/items-filters-core/search-set-filter/search-set-filter.module.code.ts"
import { STACK_FULLNESS_FILTER } from "akasha/temper/items-filters-core/search-stack-fullness-filter/search-stack-fullness-filter.module.code.ts"
import { STOLEN_FILTER } from "akasha/temper/items-filters-core/search-stolen-filter/search-stolen-filter.module.code.ts"
import { STYLE_PAGE_FILTER } from "akasha/temper/items-filters-core/search-style-page-filter/search-style-page-filter.module.code.ts"
import { SURVEY_FILTER } from "akasha/temper/items-filters-core/search-survey-filter/search-survey-filter.module.code.ts"
import { TRAIT_FILTER } from "akasha/temper/items-filters-core/search-trait-filter/search-trait-filter.module.code.ts"
import { TRANSMUTED_FILTER } from "akasha/temper/items-filters-core/search-transmuted-filter/search-transmuted-filter.module.code.ts"
import { TREASURE_MAP_FILTER } from "akasha/temper/items-filters-core/search-treasure-map-filter/search-treasure-map-filter.module.code.ts"
import { VALUE_FILTER } from "akasha/temper/items-filters-core/search-value-filter/search-value-filter.module.code.ts"
import { WEAPON_TYPE_FILTER } from "akasha/temper/items-filters-core/search-weapon-type-filter/search-weapon-type-filter.module.code.ts"

export const TEMPER_FILTERS: readonly AnyTemperFilter[] = [
  QUALITY_FILTER,
  TRAIT_FILTER,
  ITEM_TYPE_FILTER,
  EQUIP_SLOT_FILTER,
  ARMOR_WEIGHT_FILTER,
  WEAPON_TYPE_FILTER,
  SET_FILTER,
  LEVEL_FILTER,
  VALUE_FILTER,
  MARKET_VALUE_FILTER,
  MERCHANT_VALUE_FILTER,
  STOLEN_FILTER,
  CRAFTED_FILTER,
  BOUND_FILTER,
  BOP_TRADEABLE_FILTER,
  LOCKED_FILTER,
  RECONSTRUCTED_FILTER,
  TRANSMUTED_FILTER,
  STACK_FULLNESS_FILTER,
  KNOWLEDGE_FILTER,
  RECIPE_SUBTYPE_FILTER,
  STYLE_PAGE_FILTER,
  SURVEY_FILTER,
  TREASURE_MAP_FILTER,
  POTION_EFFECTS_FILTER,
  ITEM_NAME_FILTER,
]

export function buildFilterIndex(
  filters: readonly AnyTemperFilter[] = TEMPER_FILTERS
): ReadonlyMap<FilterId, AnyTemperFilter> {
  const index = new Map<FilterId, AnyTemperFilter>()
  for (const filter of filters) {
    if (index.has(filter.id)) {
      throw new Error(`Duplicate TemperFilter id: ${filter.id}`)
    }
    index.set(filter.id, filter)
  }
  return index
}
