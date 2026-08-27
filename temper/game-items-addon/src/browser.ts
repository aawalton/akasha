import { buildBrowserRows, collectLocationOptions } from "./browser-data"
import { filterRows, sortRows } from "./browser-filter"
import { type BrowserFilterBarHandle, createBrowserFilterBar } from "./browser-filterbar"
import { registerBrowserScene } from "./browser-scene"
import {
  BROWSER_QUALITY_ANY,
  type BrowserFilterState,
  type LocationViewOption,
} from "./browser-types"
import { type BrowserWindowHandle, createBrowserWindow } from "./browser-window"

interface BrowserState {
  window: BrowserWindowHandle
  filterBar: BrowserFilterBarHandle
  filter: BrowserFilterState
}

let browser: BrowserState | undefined

function currentCharId(): string {
  return tostring(GetCurrentCharacterId())
}

function defaultFilterState(locationOptions: readonly LocationViewOption[]): BrowserFilterState {
  let allOption: LocationViewOption = { label: "All", kind: "fixed", fixedId: "all" }
  for (const option of locationOptions) {
    if (option.kind === "fixed" && option.fixedId === "all") {
      allOption = option
      break
    }
  }
  return {
    category: "All",
    subfilterTypes: [],
    quality: BROWSER_QUALITY_ANY,
    locationOption: allOption,
    searchText: "",
    searchMode: "name",
    sortKey: "name",
    sortAscending: true,
  }
}

export function refreshBrowser(): undefined {
  if (browser === undefined) return
  const charId = currentCharId()
  const rows = buildBrowserRows()
  const filtered = filterRows(rows, browser.filter, charId)
  const sorted = sortRows(filtered, browser.filter.sortKey, browser.filter.sortAscending)
  browser.window.setRows(sorted, browser.filter.locationOption, charId)
}

function onFilterChange(next: BrowserFilterState): undefined {
  if (browser === undefined) return
  browser.filter = next
  refreshBrowser()
}

export function InitializeInventoryBrowser(): undefined {
  if (browser !== undefined) return

  const window = createBrowserWindow()
  const locationOptions = collectLocationOptions()
  const filter = defaultFilterState(locationOptions)
  const filterBar = createBrowserFilterBar({
    toolbar: window.toolbar,
    searchBar: window.searchBar,
    state: filter,
    locationOptions,
    onChange: onFilterChange,
  })

  browser = { window, filterBar, filter }
  registerBrowserScene(window, refreshBrowser)
}

export function ToggleInventoryBrowser(): undefined {
  if (browser === undefined) return
  if (browser.window.isHidden()) {
    browser.filterBar.setLocationOptions(collectLocationOptions())
    refreshBrowser()
    browser.window.showFloating()
  } else {
    browser.window.hide()
  }
}
