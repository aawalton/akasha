import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-objects-01"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/tstl-eso-sandbox"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"

const wm = WINDOW_MANAGER

interface SearchResultControl extends Control {
  searchResult: string
  SetText: (this: SearchResultControl, text: string) => void
  SetFont: (this: SearchResultControl, font: string) => void
  SetNormalFontColor: (
    this: SearchResultControl,
    r: number,
    g: number,
    b: number,
    a: number
  ) => void
  SetHorizontalAlignment: (this: SearchResultControl, alignment: number) => void
}

interface SearchResultBackdrop extends Control {
  SetCenterColor: (this: SearchResultBackdrop, r: number, g: number, b: number, a?: number) => void
  SetEdgeColor: (
    this: SearchResultBackdrop,
    r: number,
    g: number,
    b: number,
    a?: number,
    edgeSize?: number
  ) => void
}

interface SearchSliderView extends Control {
  GetValue: (this: SearchSliderView) => number
  SetValue: (this: SearchSliderView, value: number) => void
}

interface SearchBoxControlView extends Control {
  backdrop: Control
  scrollControl: Control
  bodyControl: Control
  slider: SearchSliderView
}

interface HouseControls {
  editbox: EditControl
  searchBox: SearchBoxControlView
}

function asSearchResultControl(value: unknown): SearchResultControl {
  return value as SearchResultControl
}
function asSearchResultBackdrop(value: unknown): SearchResultBackdrop {
  return value as SearchResultBackdrop
}
function asHouseControls(value: unknown): HouseControls {
  return value as HouseControls
}

type StringKeyedNames = Record<string, string>
function asStringKeyedNames(value: unknown): StringKeyedNames {
  return value as StringKeyedNames
}
type SearchResultList = SearchResultControl[]
function asSearchResultList(value: unknown): SearchResultList {
  return value as SearchResultList
}
type SearchResultBackdropList = SearchResultBackdrop[]
function asSearchResultBackdropList(value: unknown): SearchResultBackdropList {
  return value as SearchResultBackdropList
}
function getSearchResults(this: void): SearchResultControl[] {
  return asSearchResultList(portToFriend.controls.searchResults)
}
function getSearchResultsBackdrop(this: void): SearchResultBackdrop[] {
  return asSearchResultBackdropList(portToFriend.controls.searchResultsBackdrop)
}

function clearNameList(this: void): undefined {
  portToFriend.addonState.names = []
}
portToFriend.ClearNameList = clearNameList

function stringStartsWith(this: void, theString: string, startsWith: string): boolean {
  return string.sub(theString, 1, string.len(startsWith)) === startsWith
}
portToFriend.StringStartsWith = stringStartsWith

function searchEntryOnClicked(this: void, id: number): undefined {
  const searchResults = getSearchResults()
  const entry = searchResults[id]
  if (
    id !== undefined &&
    id >= 0 &&
    id < searchResults.length !== undefined &&
    entry !== undefined
  ) {
    portToFriend.addonState.searchResultClicked = true
    const house = asHouseControls(portToFriend.controls.house)
    house.editbox.SetText(entry.searchResult)
  }
}
portToFriend.SearchEntryOnClicked = searchEntryOnClicked

function searchEntryOnMouseEnter(this: void, id: number): undefined {
  const backdrops = getSearchResultsBackdrop()
  const backdrop = backdrops[id]
  if (id !== undefined && id >= 0 && id < backdrops.length && backdrop !== undefined) {
    backdrop.SetCenterColor(
      portToFriend.config.color.backDropLine.R,
      portToFriend.config.color.backDropLine.G,
      portToFriend.config.color.backDropLine.B,
      portToFriend.config.color.backDropLine.A
    )
  }
}
portToFriend.SearchEntryOnMouseEnter = searchEntryOnMouseEnter

function searchEntryOnMouseExit(this: void, id: number): undefined {
  const backdrops = getSearchResultsBackdrop()
  const backdrop = backdrops[id]
  if (id !== undefined && id >= 0 && id < backdrops.length && backdrop !== undefined) {
    backdrop.SetCenterColor(
      portToFriend.config.color.backDropLine.R,
      portToFriend.config.color.backDropLine.G,
      portToFriend.config.color.backDropLine.B,
      0.0
    )
  }
}
portToFriend.SearchEntryOnMouseExit = searchEntryOnMouseExit

function setSearchResults(this: void, names: string[] | undefined): string[] | undefined {
  const house = asHouseControls(portToFriend.controls.house)
  if (names === undefined || names.length === 0) {
    house.searchBox.SetHidden(true)
    return
  }
  if (portToFriend.addonState.searchResultClicked === true) {
    house.searchBox.SetHidden(true)
    portToFriend.addonState.searchResultClicked = false
    return
  }

  house.searchBox.SetHidden(false)
  let height = 10
  for (let i = 1; i <= names.length; i += 1) {
    height = height + portToFriend.config.search.height
  }
  let dimensionWidth = portToFriend.config.search.width - 22
  if (height > portToFriend.config.search.max * portToFriend.config.search.height + 10) {
    height = portToFriend.config.search.max * portToFriend.config.search.height + 10
    house.searchBox.slider.SetHidden(false)
  } else {
    house.searchBox.slider.SetHidden(true)
    dimensionWidth = portToFriend.config.search.width - 4
  }

  const searchResults = getSearchResults()
  const backdrops = getSearchResultsBackdrop()
  const color = portToFriend.config.color
  for (let i = 0; i < names.length; i += 1) {
    const name = names[i] ?? ""
    let backdrop = backdrops[i]
    if (backdrop === undefined) {
      backdrop = asSearchResultBackdrop(
        wm.CreateControl("", house.searchBox.bodyControl, CT_BACKDROP)
      )
      backdrops[i] = backdrop
    }
    backdrop.SetHidden(false)
    backdrop.SetDimensions(dimensionWidth, portToFriend.config.search.height)
    backdrop.ClearAnchors()
    backdrop.SetAnchor(
      TOPLEFT,
      house.searchBox.bodyControl,
      TOPLEFT,
      0,
      portToFriend.config.search.height * i
    )
    backdrop.SetCenterColor(color.backDropLine.R, color.backDropLine.G, color.backDropLine.B, 0.0)
    backdrop.SetEdgeColor(color.backDropLine.R, color.backDropLine.G, color.backDropLine.B, 0.0, 0)
    backdrop.SetDrawLayer(3)

    let result = searchResults[i]
    if (result === undefined) {
      result = asSearchResultControl(wm.CreateControl("", house.searchBox.bodyControl, CT_BUTTON))
      searchResults[i] = result
    }
    result.SetHidden(false)
    result.SetMouseEnabled(true)
    result.SetDimensions(dimensionWidth, portToFriend.config.search.height)
    result.ClearAnchors()
    result.SetAnchor(
      TOPLEFT,
      house.searchBox.bodyControl,
      TOPLEFT,
      0,
      portToFriend.config.search.height * i
    )
    result.SetHandler("OnClicked", () => portToFriend.SearchEntryOnClicked(i))
    result.SetHandler("OnMouseEnter", () => portToFriend.SearchEntryOnMouseEnter(i))
    result.SetHandler("OnMouseExit", () => portToFriend.SearchEntryOnMouseExit(i))
    result.SetText(name)
    result.searchResult = name
    result.SetFont(portToFriend.config.fonts.header)
    result.SetNormalFontColor(color.default.R, color.default.G, color.default.B, 1.0)
    result.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    result.SetDrawLayer(3)
  }

  if (searchResults.length > names.length) {
    for (let i = names.length; i < searchResults.length; i += 1) {
      const backdrop = backdrops[i]
      if (backdrop !== undefined) {
        backdrop.SetHidden(true)
        backdrop.SetAnchor(TOPLEFT, house.searchBox.bodyControl, TOPLEFT, 0, 0)
        backdrop.SetDimensions(0, 0)
      }

      const result = searchResults[i]
      if (result !== undefined) {
        result.SetHidden(true)
        result.SetAnchor(TOPLEFT, house.searchBox.bodyControl, TOPLEFT, 0, 0)
        result.SetDimensions(0, 0)
        result.SetText("")
      }
    }
  }

  house.searchBox.SetDimensions(portToFriend.config.search.width, height)
  house.searchBox.scrollControl.SetDimensions(dimensionWidth, height - 8)
  house.searchBox.bodyControl.SetDimensions(dimensionWidth, height - 8)
  house.searchBox.slider.SetDimensions(25, height)
  house.searchBox.slider.SetValue(0)
  house.searchBox.backdrop.SetDimensions(dimensionWidth, height)
}
portToFriend.SetSearchResults = setSearchResults

function searchTextChanged(this: void): undefined {
  const house = asHouseControls(portToFriend.controls.house)
  const searchTerm = house.editbox.GetText()
  let names: string[] | undefined
  if (searchTerm !== undefined && string.len(searchTerm) >= portToFriend.config.search.minChars) {
    names = portToFriend.SearchNames(searchTerm)
  }
  portToFriend.addonState.searchResult = names
  portToFriend.SetSearchResults(names)
}
portToFriend.SearchTextChanged = searchTextChanged

type SparseNames = (string | undefined)[]
function asSparseNames(value: unknown): SparseNames {
  return value as SparseNames
}
type DenseNames = string[]
function asDenseNames(value: (string | undefined)[]): DenseNames {
  return value as DenseNames
}

function sortPairs(this: void, names: Record<number, string> | undefined): string[] | undefined {
  if (names !== undefined) {
    const indexes: string[] = []
    const values: (string | undefined)[] = []
    let index = 0
    const namesByKey = asStringKeyedNames(names)
    for (const key in namesByKey) {
      const value = namesByKey[key]
      indexes[index] = key
      values[index] = value
      index = index + 1
    }

    let itemCount = indexes.length
    let hasChanged: boolean
    do {
      hasChanged = false
      itemCount = itemCount - 1
      for (let i = 0; i < itemCount; i += 1) {
        const a = values[i]
        const b = values[i + 1]
        if ((a !== undefined && b !== undefined && a > b) || a === undefined) {
          values[i] = b
          values[i + 1] = a
          hasChanged = true
        }
      }
    } while (hasChanged !== false)
    return asDenseNames(values)
  }
  return names
}
portToFriend.SortPairs = sortPairs

function sortSearchNames(this: void, names: string[] | undefined): string[] | undefined {
  if (names !== undefined) {
    const work = asSparseNames(names)
    let itemCount = work.length
    let hasChanged: boolean
    do {
      hasChanged = false
      itemCount = itemCount - 1
      for (let i = 0; i < itemCount; i += 1) {
        const a = work[i]
        const b = work[i + 1]
        if ((a !== undefined && b !== undefined && a > b) || a === undefined) {
          work[i] = b
          work[i + 1] = a
          hasChanged = true
        }
      }
    } while (hasChanged !== false)
    return asDenseNames(work)
  }
  return undefined
}
portToFriend.SortSearchNames = sortSearchNames

function searchNames(this: void, name: string): string[] | undefined {
  const retNames: string[] = []
  const names = portToFriend.addonState.names
  if (names !== undefined && name !== undefined) {
    for (let i = 0; i < names.length; i += 1) {
      const candidate = names[i]
      if (
        candidate !== undefined &&
        portToFriend.StringStartsWith(string.lower(candidate), string.lower(name))
      ) {
        retNames.push(candidate)
      }
    }
  }
  return portToFriend.SortSearchNames(retNames)
}
portToFriend.SearchNames = searchNames

function addNameToNameList(this: void, name: string): undefined {
  if (portToFriend.addonState.names !== undefined && name !== undefined) {
    let entryIdentified = false
    for (let i = 0; i < portToFriend.addonState.names.length; i += 1) {
      if (portToFriend.addonState.names[i] === name) {
        entryIdentified = true
        break
      }
    }
    if (entryIdentified === false) {
      portToFriend.addonState.names.push(name)
    }
  }
}
portToFriend.AddNameToNameList = addNameToNameList

type UndefinedName = string
function asUndefinedName(value: unknown): UndefinedName {
  return value as UndefinedName
}

function createGuildAndFriendList(this: void): undefined {
  portToFriend.ClearNameList()
  for (let guildIndex = 1; guildIndex <= GetNumGuilds(); guildIndex += 1) {
    const guildId = GetGuildId(guildIndex)
    for (let memberId = 1; memberId <= GetNumGuildMembers(guildId); memberId += 1) {
      const [, charNameRaw] = GetGuildMemberCharacterInfo(guildId, memberId)
      const [name] = GetGuildMemberInfo(guildId, memberId)
      let charName = charNameRaw
      const [charIndex] = string.find(charName, "^", undefined, true)
      if (charIndex !== undefined) {
        charName = string.sub(charName, 1, charIndex - 1)
      }
      portToFriend.AddNameToNameList(charName)
      portToFriend.AddNameToNameList(name)
    }
  }
  for (let friendIndex = 1; friendIndex <= GetNumFriends(); friendIndex += 1) {
    const [, characterNameRaw] = GetFriendCharacterInfo(friendIndex)
    let characterName = characterNameRaw
    const [charIndex] = string.find(characterName, "^", undefined, true)
    if (charIndex !== undefined) {
      characterName = string.sub(characterName, 1, charIndex - 1)
    }
    portToFriend.AddNameToNameList(characterName)
    portToFriend.AddNameToNameList(asUndefinedName(undefined))
  }
}
portToFriend.CreateGuildAndFriendList = createGuildAndFriendList
