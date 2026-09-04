import { compareStrings } from "@akasha/temper-items-core/item-centric-inventory"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { matchCategory } from "../inventory-browser-categories/inventory-browser-categories.module.code.ts"
import { matchLocationView } from "../inventory-browser-locations/inventory-browser-locations.module.code.ts"
import type {
  BrowserFilterState,
  BrowserRow,
  BrowserSearchMode,
  BrowserSortKey,
} from "../inventory-browser-types/inventory-browser-types.module.code.ts"
import { BROWSER_QUALITY_ANY } from "../inventory-browser-types/inventory-browser-types.module.code.ts"

const ASCII_UPPER_A = 65
const ASCII_UPPER_Z = 90
const ASCII_CASE_SHIFT = 32

function toLowerAscii(value: string): string {
  let result = ""
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i)
    if (code >= ASCII_UPPER_A && code <= ASCII_UPPER_Z) {
      result += String.fromCharCode(code + ASCII_CASE_SHIFT)
    } else {
      result += value.charAt(i)
    }
  }
  return result
}

function containsSubstring(haystack: string, needle: string): boolean {
  if (needle.length === 0) return true
  if (needle.length > haystack.length) return false
  const last = haystack.length - needle.length
  for (let start = 0; start <= last; start++) {
    let matched = true
    for (let j = 0; j < needle.length; j++) {
      if (haystack.charCodeAt(start + j) !== needle.charCodeAt(j)) {
        matched = false
        break
      }
    }
    if (matched) return true
  }
  return false
}

export function matchQuality(row: BrowserRow, quality: number): boolean {
  return quality === BROWSER_QUALITY_ANY || row.quality === quality
}

export function matchSearch(
  row: BrowserRow,
  searchLower: string,
  mode: BrowserSearchMode
): boolean {
  if (searchLower === "") return true
  const nameHit = containsSubstring(toLowerAscii(row.itemName), searchLower)
  const setHit = containsSubstring(toLowerAscii(row.setName), searchLower)
  switch (mode) {
    case "name":
      return nameHit
    case "set":
      return setHit
    case "both":
      return nameHit || setHit
    default:
      return assertNever(mode)
  }
}

export function filterRows(
  rows: readonly BrowserRow[],
  state: BrowserFilterState,
  currentCharId: string
): BrowserRow[] {
  const searchLower = toLowerAscii(state.searchText)
  const result: BrowserRow[] = []
  for (const row of rows) {
    if (row.aggregatedQty <= 0) continue
    if (!matchLocationView(row.locations, state.locationOption, currentCharId)) continue
    if (!matchCategory(row, state.category, state.subfilterTypes)) continue
    if (!matchQuality(row, state.quality)) continue
    if (state.searchText !== "" && !matchSearch(row, searchLower, state.searchMode)) continue
    result.push(row)
  }
  return result
}

export function sortRows(
  rows: readonly BrowserRow[],
  sortKey: BrowserSortKey,
  ascending: boolean
): BrowserRow[] {
  const copy: BrowserRow[] = []
  for (const row of rows) copy.push(row)
  const direction = ascending ? 1 : -1
  copy.sort((a, b) => {
    let base: number
    switch (sortKey) {
      case "quality":
        base = a.quality - b.quality
        break
      case "name":
        base = compareStrings(a.itemName, b.itemName)
        break
      default:
        return assertNever(sortKey)
    }
    return base * direction
  })
  return copy
}
