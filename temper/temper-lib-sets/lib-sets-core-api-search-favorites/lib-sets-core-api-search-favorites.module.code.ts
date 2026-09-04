import { asPresent } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import { asLibSlots } from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"

const lib = LibSets

const MAJOR = "LibSets"

const customContextMenuErrorPrefixStr =
  "[" + MAJOR + "]:registerCustomSetSearchResultsListContextMenu ERROR - addon: %q"
const customContextMenuSetSearchParamErrorStr =
  customContextMenuErrorPrefixStr +
  " - parameter 'headerName' must be nil or a String. Parameter 'submenuName' must be nil or a String. Parameter 'submenuEntries' (%s) must be a table of submenu entries (See library 'LibScrollableMenu', and the addon name must be a string. Parameter visibleFunc must be nil or a function with 1st parameter 'rowControl' of the menu parent and 2nd optinonal parameter 'setId', returning a boolean."
const customContextMenuSetSearchExistsAlreadyErrorStr =
  customContextMenuErrorPrefixStr + " was already registered!"

type CustomContextMenuEntry = {
  headerName: string | undefined
  name: string
  entries: object
  visible: ((this: void, ...args: unknown[]) => unknown) | undefined
}

type CustomContextMenuRegistry = { [addon: string]: CustomContextMenuEntry | undefined }
function asCustomContextMenuRegistry(value: unknown): CustomContextMenuRegistry {
  return value as CustomContextMenuRegistry
}

function registerCustomSetSearchResultsListContextMenu(
  this: void,
  addonName: string | undefined,
  headerName: string | undefined,
  submenuName: string | undefined,
  submenuEntries: object | undefined,
  visibleFunc: ((this: void, ...args: unknown[]) => unknown) | undefined
): undefined {
  assert(
    type(addonName) === "string" &&
      (headerName === undefined || type(headerName) === "string") &&
      (submenuName === undefined || type(submenuName) === "string") &&
      type(submenuEntries) === "table" &&
      (visibleFunc === undefined || type(visibleFunc) === "function"),
    string.format(
      customContextMenuSetSearchParamErrorStr,
      tostring(addonName),
      tostring(submenuName),
      tostring(submenuEntries)
    )
  )
  const customContextMenuEntriesSetSearch = asCustomContextMenuRegistry(
    lib.customContextMenuEntries
  )
  assert(
    customContextMenuEntriesSetSearch[asPresent(addonName)] === undefined,
    string.format(customContextMenuSetSearchExistsAlreadyErrorStr, tostring(addonName))
  )

  customContextMenuEntriesSetSearch[asPresent(addonName)] = {
    headerName: headerName,
    name: submenuName ?? asPresent(addonName),
    entries: asPresent(submenuEntries),
    visible: visibleFunc,
  }
}
lib.RegisterCustomSetSearchResultsListContextMenu = registerCustomSetSearchResultsListContextMenu

type SetSearchFavoriteCategoryData = {
  category: string
  categoryName: unknown
  texture: string
}

function getSetSearchFavoriteCategories(this: void): SetSearchFavoriteCategoryData[] {
  return lib.possibleSetSearchFavoriteCategories
}
lib.GetSetSearchFavoriteCategories = getSetSearchFavoriteCategories

function getSetSearchFavoriteCategoryData(
  this: void,
  category: string | undefined
): SetSearchFavoriteCategoryData | undefined {
  for (const [, setSearchFavoriteCategoryData] of ipairs(lib.possibleSetSearchFavoriteCategories)) {
    if (
      setSearchFavoriteCategoryData.category !== undefined &&
      setSearchFavoriteCategoryData.category === category
    ) {
      return setSearchFavoriteCategoryData
    }
  }
  return undefined
}
lib.GetSetSearchFavoriteCategoryData = getSetSearchFavoriteCategoryData

asLibSlots(lib)["_libSets_GetSetSearchFavoriteCategoryData"] = getSetSearchFavoriteCategoryData
const libSets_GetSetSearchFavoriteCategoryData = getSetSearchFavoriteCategoryData

function getSetSearchFavoritesCategoriesForSetId(
  this: void,
  _setId: number | undefined
): (SetSearchFavoriteCategoryData | undefined)[] | undefined {
  const setSearchFavoriteCategoriesOfSetId = LibSets_SearchUI_Shared.GetAllFavoritesCategories(
    LibSets_SearchUI_Shared.setId
  )
  if (ZO_IsTableEmpty(setSearchFavoriteCategoriesOfSetId)) {
    return undefined
  }
  const retTab: (SetSearchFavoriteCategoryData | undefined)[] = []
  for (const [, category] of ipairs(setSearchFavoriteCategoriesOfSetId)) {
    const categoryData = libSets_GetSetSearchFavoriteCategoryData(category)
    retTab[retTab.length] = categoryData
  }
  return retTab
}
lib.GetSetSearchFavoritesCategoriesForSetId = getSetSearchFavoritesCategoriesForSetId
