import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-14"
import "@akasha/temper-eso-types/eso-event-manager"
import "@akasha/temper-eso-types/eso-events"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-03"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/eso-functions-09"
import "@akasha/temper-eso-types/eso-globals"
import { buildFilterIndex } from "@akasha/temper-items-filters-core/search-filter-registry"
import {
  type ActiveFilterValues,
  itemPassesFilters,
} from "@akasha/temper-items-filters-core/search-filter-set"
import { createSearchRequestCollector } from "@akasha/temper-items-filters-core/search-filter-types"
import type { ItemFacts } from "@akasha/temper-items-rules-eval/item-facts"
import {
  type BrowseListing,
  mergeListings,
  sortByUnitPriceDesc,
} from "@akasha/temper-trading-listings/browse-listings"
import {
  type BrowseAction,
  type BrowseEvent,
  type BrowseState,
  decideBrowseNext,
  INITIAL_BROWSE_STATE,
} from "@akasha/temper-trading-listings/browse-state"
import { readResultListing } from "../trading-listing-facts/trading-listing-facts.module.code.ts"
import { applyCollectorToNativeSearch } from "../trading-search-request-native/trading-search-request-native.module.code.ts"

const TRADING_HOUSE_SORT_SALE_PRICE_PER_UNIT = 3
const TRADING_HOUSE_RESULT_SEARCH_PENDING = 14
const TRADING_HOUSE_RESULT_SUCCESS = 0

export type BrowseResultListing = BrowseListing<ItemFacts>

export interface BrowseEngineConfig {
  readonly guildIds?: readonly number[]
  readonly sortField?: number
  readonly onComplete?: (this: void, listings: readonly BrowseResultListing[]) => void
}

export interface BrowseEngine {
  start: (this: void, active: ActiveFilterValues) => undefined
  setActive: (this: void, active: ActiveFilterValues) => undefined
  stop: (this: void) => undefined
  cancel: (this: void) => undefined
  getResults: (this: void) => readonly BrowseResultListing[]
  getState: (this: void) => BrowseState
}

export function createBrowseEngine(config: BrowseEngineConfig): BrowseEngine {
  const ns = `TemperListingsBrowse`
  const sortField = config.sortField ?? TRADING_HOUSE_SORT_SALE_PRICE_PER_UNIT
  const filterIndex = buildFilterIndex()

  let state: BrowseState = INITIAL_BROWSE_STATE
  let accumulator: readonly BrowseResultListing[] = []
  let activeValues: ActiveFilterValues = new Map()
  let registered = false

  function dispatch(event: BrowseEvent): undefined {
    const decision = decideBrowseNext(state, event)
    state = decision.state
    for (const action of decision.actions) {
      perform(action)
    }
  }

  function perform(action: BrowseAction): undefined {
    switch (action.kind) {
      case "executeSearch":
        ExecuteTradingHouseSearch(action.page, sortField, false, false)
        dispatch({ kind: "searchExecuted" })
        return
      case "selectGuild":
        SelectTradingHouseGuildId(action.guildId)
        return
      case "complete":
        if (config.onComplete !== undefined) config.onComplete(accumulator)
        return
      case "noop":
        return
      default:
        return
    }
  }

  function resolveGuildIds(): readonly number[] {
    if (config.guildIds !== undefined) return config.guildIds
    const ids: number[] = []
    const count = GetNumTradingHouseGuilds()
    for (let i = 1; i <= count; i++) {
      const [guildId] = GetTradingHouseGuildDetails(i)
      if (guildId !== undefined && guildId !== 0) ids.push(guildId)
    }
    return ids
  }

  function onResponseReceived(
    this: void,
    _eventCode: number,
    responseType: number,
    result: number
  ): undefined {
    if (responseType !== TRADING_HOUSE_RESULT_SEARCH_PENDING) return
    if (result !== TRADING_HOUSE_RESULT_SUCCESS) return

    const [numItemsOnPage, currentPage, hasMorePages] = GetTradingHouseSearchResultsInfo()

    const page: BrowseResultListing[] = []
    for (let index = 1; index <= numItemsOnPage; index++) {
      const listing = readResultListing(index)
      if (listing !== undefined) page.push(listing)
    }
    accumulator = mergeListings(accumulator, page)

    const guildId = GetSelectedTradingHouseGuildId() ?? 0
    dispatch({ kind: "pageReceived", guildId, currentPage, hasMorePages })
  }

  function onCooldownUpdate(
    this: void,
    _eventCode: number,
    cooldownMilliseconds: number
  ): undefined {
    if (cooldownMilliseconds === 0) dispatch({ kind: "cooldownReady" })
  }

  function onError(this: void, _eventCode: number, errorCode: number): undefined {
    dispatch({ kind: "searchError", code: `${errorCode}` })
  }

  function registerEvents(): undefined {
    if (registered) return
    EVENT_MANAGER.RegisterForEvent(
      `${ns}_Response`,
      EVENT_TRADING_HOUSE_RESPONSE_RECEIVED,
      onResponseReceived
    )
    EVENT_MANAGER.RegisterForEvent(
      `${ns}_Cooldown`,
      EVENT_TRADING_HOUSE_SEARCH_COOLDOWN_UPDATE,
      onCooldownUpdate
    )
    EVENT_MANAGER.RegisterForEvent(`${ns}_Error`, EVENT_TRADING_HOUSE_ERROR, onError)
    registered = true
  }

  function unregisterEvents(): undefined {
    if (!registered) return
    EVENT_MANAGER.UnregisterForEvent(`${ns}_Response`, EVENT_TRADING_HOUSE_RESPONSE_RECEIVED)
    EVENT_MANAGER.UnregisterForEvent(`${ns}_Cooldown`, EVENT_TRADING_HOUSE_SEARCH_COOLDOWN_UPDATE)
    EVENT_MANAGER.UnregisterForEvent(`${ns}_Error`, EVENT_TRADING_HOUSE_ERROR)
    registered = false
  }

  function start(active: ActiveFilterValues): undefined {
    activeValues = active

    const collector = createSearchRequestCollector()
    for (const [id, value] of active) {
      const filter = filterIndex.get(id)
      if (filter === undefined) continue
      if (filter.applyToSearch !== undefined) filter.applyToSearch(collector, value)
    }
    applyCollectorToNativeSearch(collector)

    accumulator = []
    state = INITIAL_BROWSE_STATE
    registerEvents()

    dispatch({ kind: "start", guildIds: resolveGuildIds() })
  }

  function setActive(active: ActiveFilterValues): undefined {
    activeValues = active
  }

  function stop(): undefined {
    unregisterEvents()
    dispatch({ kind: "cancel" })
  }

  function getResults(): readonly BrowseResultListing[] {
    const kept: BrowseResultListing[] = []
    for (const listing of accumulator) {
      if (itemPassesFilters(filterIndex, activeValues, listing.facts)) {
        kept.push(listing)
      }
    }
    return sortByUnitPriceDesc(kept)
  }

  return {
    start,
    setActive,
    stop,
    cancel: stop,
    getResults,
    getState(): BrowseState {
      return state
    },
  }
}
