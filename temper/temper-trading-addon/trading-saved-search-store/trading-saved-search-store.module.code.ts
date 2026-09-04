import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-02"
import type { SavedSearch, SavedSearchStore } from "@akasha/temper-items-filters-core/saved-search"
import { getSavedVariables } from "../trading-saved-variables/trading-saved-variables.module.code.ts"

export function getSavedSearches(this: void): SavedSearchStore {
  const sv = getSavedVariables()
  const store = readSavedSearchStore(sv.savedSearches)
  if (store === undefined) {
    const fresh: SavedSearchStore = { searches: [] }
    sv.savedSearches = fresh
    return fresh
  }
  return store
}

function readSavedSearchStore(this: void, raw: unknown): SavedSearchStore | undefined {
  if (typeof raw !== "object" || raw === null) return undefined
  const candidate: { readonly searches?: unknown; readonly activeIndex?: unknown } = raw
  const rawSearches = candidate.searches
  if (!Array.isArray(rawSearches)) return undefined
  const searches: SavedSearch[] = []
  for (const entry of rawSearches) {
    if (!isSavedSearch(entry)) return undefined
    searches.push(entry)
  }
  const activeIndex = typeof candidate.activeIndex === "number" ? candidate.activeIndex : undefined
  return { searches, activeIndex }
}

function isSavedSearch(this: void, raw: unknown): raw is SavedSearch {
  if (typeof raw !== "object" || raw === null) return false
  const candidate: {
    readonly version?: unknown
    readonly name?: unknown
    readonly filters?: unknown
  } = raw
  if (candidate.version !== 1) return false
  if (typeof candidate.name !== "string") return false
  if (typeof candidate.filters !== "object" || candidate.filters === null) return false
  return true
}

export function addSavedSearch(this: void, search: SavedSearch): undefined {
  const store = getSavedSearches()
  const next: SavedSearch[] = []
  for (const existing of store.searches) next.push(existing)
  next.push(search)
  writeStore({ searches: next, activeIndex: next.length - 1 })
}

export function removeSavedSearch(this: void, index: number): undefined {
  const store = getSavedSearches()
  if (index < 0 || index >= store.searches.length) return
  const next: SavedSearch[] = []
  for (let i = 0; i < store.searches.length; i++) {
    if (i === index) continue
    const entry = store.searches[i]
    if (entry !== undefined) next.push(entry)
  }
  writeStore({ searches: next, activeIndex: shiftActiveOnRemove(store.activeIndex, index) })
}

export function renameSavedSearch(this: void, index: number, name: string): undefined {
  const store = getSavedSearches()
  if (index < 0 || index >= store.searches.length) return
  const next: SavedSearch[] = []
  for (let i = 0; i < store.searches.length; i++) {
    const entry = store.searches[i]
    if (entry === undefined) continue
    next.push(i === index ? { ...entry, name } : entry)
  }
  writeStore({ searches: next, activeIndex: store.activeIndex })
}

export function setActiveSavedSearchIndex(this: void, index: number | undefined): undefined {
  const store = getSavedSearches()
  writeStore({ searches: store.searches, activeIndex: index })
}

function writeStore(this: void, store: SavedSearchStore): undefined {
  getSavedVariables().savedSearches = store
}

function shiftActiveOnRemove(
  this: void,
  active: number | undefined,
  removed: number
): number | undefined {
  if (active === undefined) return undefined
  if (active === removed) return undefined
  if (active > removed) return active - 1
  return active
}
