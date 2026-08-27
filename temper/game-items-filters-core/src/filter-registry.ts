import type { AnyTemperFilter, FilterId } from "./filter-types"
import { armorWeightFilter } from "./filters/armor-weight-filter"
import { bopTradeableFilter } from "./filters/bop-tradeable-filter"
import { boundFilter } from "./filters/bound-filter"
import { craftedFilter } from "./filters/crafted-filter"
import { equipSlotFilter } from "./filters/equip-slot-filter"
import { itemNameFilter } from "./filters/item-name-filter"
import { itemTypeFilter } from "./filters/item-type-filter"
import { knowledgeFilter } from "./filters/knowledge-filter"
import { levelFilter } from "./filters/level-filter"
import { lockedFilter } from "./filters/locked-filter"
import { marketValueFilter } from "./filters/market-value-filter"
import { merchantValueFilter } from "./filters/merchant-value-filter"
import { potionEffectsFilter } from "./filters/potion-effects-filter"
import { qualityFilter } from "./filters/quality-filter"
import { recipeSubtypeFilter } from "./filters/recipe-subtype-filter"
import { reconstructedFilter } from "./filters/reconstructed-filter"
import { setFilter } from "./filters/set-filter"
import { stackFullnessFilter } from "./filters/stack-fullness-filter"
import { stolenFilter } from "./filters/stolen-filter"
import { stylePageFilter } from "./filters/style-page-filter"
import { surveyFilter } from "./filters/survey-filter"
import { traitFilter } from "./filters/trait-filter"
import { transmutedFilter } from "./filters/transmuted-filter"
import { treasureMapFilter } from "./filters/treasure-map-filter"
import { valueFilter } from "./filters/value-filter"
import { weaponTypeFilter } from "./filters/weapon-type-filter"

export const TEMPER_FILTERS: readonly AnyTemperFilter[] = [
  qualityFilter,
  traitFilter,
  itemTypeFilter,
  equipSlotFilter,
  armorWeightFilter,
  weaponTypeFilter,
  setFilter,
  levelFilter,
  valueFilter,
  marketValueFilter,
  merchantValueFilter,
  stolenFilter,
  craftedFilter,
  boundFilter,
  bopTradeableFilter,
  lockedFilter,
  reconstructedFilter,
  transmutedFilter,
  stackFullnessFilter,
  knowledgeFilter,
  recipeSubtypeFilter,
  stylePageFilter,
  surveyFilter,
  treasureMapFilter,
  potionEffectsFilter,
  itemNameFilter,
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
