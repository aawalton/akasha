import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import type { AnyTemperFilter, FilterId, FilterValue } from "./filter-types"

export type ActiveFilterValues = ReadonlyMap<FilterId, FilterValue>

export function itemPassesFilters(
  index: ReadonlyMap<FilterId, AnyTemperFilter>,
  active: ActiveFilterValues,
  facts: ItemFacts
): boolean {
  for (const [id, value] of active) {
    const filter = index.get(id)
    if (filter === undefined) continue
    if (!filter.matches(facts, value)) return false
  }
  return true
}
