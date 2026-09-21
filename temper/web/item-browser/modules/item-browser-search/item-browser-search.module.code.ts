import { getSetBonuses } from "akasha/temper/web/item-browser/modules/item-browser-item-link/item-browser-item-link.module.code.ts"
import type {
  EntryData,
  ItemBrowserListInstance,
} from "akasha/temper/web/item-browser/modules/item-browser-types/item-browser-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-item-browser-port/eso-item-browser-port.type-declaration.d.ts"

export function orderedSearch(
  this: ItemBrowserListInstance,
  haystack: string,
  needles: string
): boolean {
  const lowerHaystack = string.lower(haystack)
  const lowerNeedles = string.lower(needles)

  let i = 0
  for (const [needle] of string.gmatch(lowerNeedles, "%S+")) {
    if (needle === undefined) {
      continue
    }
    const found = string.find(lowerHaystack, needle, i + 1, true)[0]
    if (found === undefined) {
      return false
    }
    i = found
  }

  return true
}

export function searchSetBonuses(
  this: ItemBrowserListInstance,
  bonuses: string[],
  searchInput: string
): boolean {
  let curpos = 1
  let delim = 0
  let exclude = false

  do {
    let found = false

    const foundDelim = string.find(searchInput, "[+,-]", curpos)[0]
    delim = foundDelim ?? 0

    const searchQuery = string.sub(searchInput, curpos, delim - 1)

    if (string.find(searchQuery, "%S+")[0] !== undefined) {
      for (const bonus of bonuses) {
        if (this.OrderedSearch(bonus, searchQuery)) {
          found = true
          break
        }
      }

      if (found === exclude) {
        return false
      }
    }

    curpos = delim + 1
    if (delim !== 0) {
      exclude = string.sub(searchInput, delim, delim) === "-"
    }
  } while (delim !== 0)

  return true
}

export function checkForMatch(
  this: ItemBrowserListInstance,
  data: EntryData,
  searchInput: string
): boolean {
  let curpos = 1
  let delim = 0

  do {
    const foundDelim = string.find(searchInput, "|", curpos)[0]
    delim = foundDelim ?? 0

    const searchFragment = string.sub(searchInput, curpos, delim - 1)

    if (string.find(searchFragment, "%S+")[0] !== undefined || (curpos === 1 && delim === 0)) {
      if (this.searchType === 1) {
        if (this.search.IsMatch(searchFragment, data)) {
          return true
        }
      } else if (this.searchType === 2) {
        if (typeof data.bonuses === "number") {
          data.bonuses = getSetBonuses(data.itemLink, data.bonuses)
        }
        if (this.SearchSetBonuses(data.bonuses, searchFragment)) {
          return true
        }
      }
    }

    curpos = delim + 1
  } while (delim !== 0)

  return false
}

export function processItemEntry(
  this: ItemBrowserListInstance,
  _stringSearch: object,
  data: EntryData,
  searchTerm: string,
  _cache?: unknown
): boolean {
  if (searchTerm === "+") {
    return data.setSize === data.setFound
  }
  if (searchTerm === "-") {
    return data.setSize > data.setFound
  }

  return (
    zo_plainstrfind(string.lower(data.name), searchTerm) ||
    zo_plainstrfind(string.lower(data.subname), searchTerm) ||
    zo_plainstrfind(string.lower(data.itemType), searchTerm) ||
    zo_plainstrfind(string.lower(data.source), searchTerm)
  )
}
