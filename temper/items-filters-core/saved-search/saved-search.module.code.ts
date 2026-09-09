import type { ActiveFilterValues } from "../search-filter-set/search-filter-set.module.code.ts"
import type {
  AnyTemperFilter,
  FilterId,
  FilterValue,
  SavedFilterValue,
} from "../search-filter-types/search-filter-types.module.code.ts"

export interface SavedSearch {
  readonly version: 1
  readonly name: string
  readonly filters: { readonly [id: string]: SavedFilterValue }
  readonly sort?: { readonly field: string; readonly order: "asc" | "desc" }
  readonly guildScope?: "current" | "all"
}

export interface SavedSearchStore {
  readonly searches: readonly SavedSearch[]
  readonly activeIndex?: number
}

export function serializeSavedSearch(
  name: string,
  active: ActiveFilterValues,
  index: ReadonlyMap<FilterId, AnyTemperFilter>,
  opts?: { sort?: SavedSearch["sort"]; guildScope?: SavedSearch["guildScope"] }
): SavedSearch {
  const filters: { [id: string]: SavedFilterValue } = {}
  for (const [id, filter] of index) {
    const value = active.get(id)
    if (value === undefined) continue
    filters[id] = filter.serialize(value)
  }
  const saved: SavedSearch = { version: 1, name, filters }
  if (opts === undefined) return saved
  return { ...saved, sort: opts.sort, guildScope: opts.guildScope }
}

export function deserializeSavedSearch(
  saved: SavedSearch,
  index: ReadonlyMap<FilterId, AnyTemperFilter>
): ActiveFilterValues {
  const active = new Map<FilterId, FilterValue>()
  for (const [id, raw] of Object.entries(saved.filters)) {
    const filter = index.get(id)
    if (filter === undefined) continue
    const value = filter.deserialize(raw)
    if (value === undefined) continue
    active.set(id, value)
  }
  return active
}
