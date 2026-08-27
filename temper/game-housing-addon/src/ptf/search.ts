import { PortToFriend } from "./state"

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
  return asSearchResultList(PortToFriend.controls.searchResults)
}
function getSearchResultsBackdrop(this: void): SearchResultBackdrop[] {
  return asSearchResultBackdropList(PortToFriend.controls.searchResultsBackdrop)
}

function ClearNameList(this: void): undefined {
  PortToFriend.addonState.names = []
}
PortToFriend.ClearNameList = ClearNameList

function StringStartsWith(this: void, theString: string, startsWith: string): boolean {
  return string.sub(theString, 1, string.len(startsWith)) === startsWith
}
PortToFriend.StringStartsWith = StringStartsWith

function SearchEntryOnClicked(this: void, id: number): undefined {
  const searchResults = getSearchResults()
  const entry = searchResults[id]
  if (
    id !== undefined &&
    id >= 0 &&
    id < searchResults.length !== undefined &&
    entry !== undefined
  ) {
    PortToFriend.addonState.searchResultClicked = true
    const house = asHouseControls(PortToFriend.controls.house)
    house.editbox.SetText(entry.searchResult)
  }
}
PortToFriend.SearchEntryOnClicked = SearchEntryOnClicked

function SearchEntryOnMouseEnter(this: void, id: number): undefined {
  const backdrops = getSearchResultsBackdrop()
  const backdrop = backdrops[id]
  if (id !== undefined && id >= 0 && id < backdrops.length && backdrop !== undefined) {
    backdrop.SetCenterColor(
      PortToFriend.config.color.backDropLine.R,
      PortToFriend.config.color.backDropLine.G,
      PortToFriend.config.color.backDropLine.B,
      PortToFriend.config.color.backDropLine.A
    )
  }
}
PortToFriend.SearchEntryOnMouseEnter = SearchEntryOnMouseEnter

function SearchEntryOnMouseExit(this: void, id: number): undefined {
  const backdrops = getSearchResultsBackdrop()
  const backdrop = backdrops[id]
  if (id !== undefined && id >= 0 && id < backdrops.length && backdrop !== undefined) {
    backdrop.SetCenterColor(
      PortToFriend.config.color.backDropLine.R,
      PortToFriend.config.color.backDropLine.G,
      PortToFriend.config.color.backDropLine.B,
      0.0
    )
  }
}
PortToFriend.SearchEntryOnMouseExit = SearchEntryOnMouseExit

function SetSearchResults(this: void, names: string[] | undefined): string[] | undefined {
  const house = asHouseControls(PortToFriend.controls.house)
  if (names === undefined || names.length === 0) {
    house.searchBox.SetHidden(true)
    return
  }
  if (PortToFriend.addonState.searchResultClicked === true) {
    house.searchBox.SetHidden(true)
    PortToFriend.addonState.searchResultClicked = false
    return
  }

  house.searchBox.SetHidden(false)
  let height = 10
  for (let i = 1; i <= names.length; i += 1) {
    height = height + PortToFriend.config.search.height
  }
  let dimensionWidth = PortToFriend.config.search.width - 22
  if (height > PortToFriend.config.search.max * PortToFriend.config.search.height + 10) {
    height = PortToFriend.config.search.max * PortToFriend.config.search.height + 10
    house.searchBox.slider.SetHidden(false)
  } else {
    house.searchBox.slider.SetHidden(true)
    dimensionWidth = PortToFriend.config.search.width - 4
  }

  const searchResults = getSearchResults()
  const backdrops = getSearchResultsBackdrop()
  const color = PortToFriend.config.color
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
    backdrop.SetDimensions(dimensionWidth, PortToFriend.config.search.height)
    backdrop.ClearAnchors()
    backdrop.SetAnchor(
      TOPLEFT,
      house.searchBox.bodyControl,
      TOPLEFT,
      0,
      PortToFriend.config.search.height * i
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
    result.SetDimensions(dimensionWidth, PortToFriend.config.search.height)
    result.ClearAnchors()
    result.SetAnchor(
      TOPLEFT,
      house.searchBox.bodyControl,
      TOPLEFT,
      0,
      PortToFriend.config.search.height * i
    )
    result.SetHandler("OnClicked", () => PortToFriend.SearchEntryOnClicked(i))
    result.SetHandler("OnMouseEnter", () => PortToFriend.SearchEntryOnMouseEnter(i))
    result.SetHandler("OnMouseExit", () => PortToFriend.SearchEntryOnMouseExit(i))
    result.SetText(name)
    result.searchResult = name
    result.SetFont(PortToFriend.config.fonts.header)
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

  house.searchBox.SetDimensions(PortToFriend.config.search.width, height)
  house.searchBox.scrollControl.SetDimensions(dimensionWidth, height - 8)
  house.searchBox.bodyControl.SetDimensions(dimensionWidth, height - 8)
  house.searchBox.slider.SetDimensions(25, height)
  house.searchBox.slider.SetValue(0)
  house.searchBox.backdrop.SetDimensions(dimensionWidth, height)
}
PortToFriend.SetSearchResults = SetSearchResults

function SearchTextChanged(this: void): undefined {
  const house = asHouseControls(PortToFriend.controls.house)
  const searchTerm = house.editbox.GetText()
  let names: string[] | undefined
  if (searchTerm !== undefined && string.len(searchTerm) >= PortToFriend.config.search.minChars) {
    names = PortToFriend.SearchNames(searchTerm)
  }
  PortToFriend.addonState.searchResult = names
  PortToFriend.SetSearchResults(names)
}
PortToFriend.SearchTextChanged = SearchTextChanged

type SparseNames = (string | undefined)[]
function asSparseNames(value: unknown): SparseNames {
  return value as SparseNames
}
type DenseNames = string[]
function asDenseNames(value: (string | undefined)[]): DenseNames {
  return value as DenseNames
}

function SortPairs(this: void, names: Record<number, string> | undefined): string[] | undefined {
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
PortToFriend.SortPairs = SortPairs

function SortSearchNames(this: void, names: string[] | undefined): string[] | undefined {
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
PortToFriend.SortSearchNames = SortSearchNames

function SearchNames(this: void, name: string): string[] | undefined {
  const retNames: string[] = []
  const names = PortToFriend.addonState.names
  if (names !== undefined && name !== undefined) {
    for (let i = 0; i < names.length; i += 1) {
      const candidate = names[i]
      if (
        candidate !== undefined &&
        PortToFriend.StringStartsWith(string.lower(candidate), string.lower(name))
      ) {
        retNames.push(candidate)
      }
    }
  }
  return PortToFriend.SortSearchNames(retNames)
}
PortToFriend.SearchNames = SearchNames

function AddNameToNameList(this: void, name: string): undefined {
  if (PortToFriend.addonState.names !== undefined && name !== undefined) {
    let entryIdentified = false
    for (let i = 0; i < PortToFriend.addonState.names.length; i += 1) {
      if (PortToFriend.addonState.names[i] === name) {
        entryIdentified = true
        break
      }
    }
    if (entryIdentified === false) {
      PortToFriend.addonState.names.push(name)
    }
  }
}
PortToFriend.AddNameToNameList = AddNameToNameList

type UndefinedName = string
function asUndefinedName(value: unknown): UndefinedName {
  return value as UndefinedName
}

function CreateGuildAndFriendList(this: void): undefined {
  PortToFriend.ClearNameList()
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
      PortToFriend.AddNameToNameList(charName)
      PortToFriend.AddNameToNameList(name)
    }
  }
  for (let friendIndex = 1; friendIndex <= GetNumFriends(); friendIndex += 1) {
    const [_displayName] = GetFriendInfo(friendIndex)
    const [, characterNameRaw] = GetFriendCharacterInfo(friendIndex)
    let characterName = characterNameRaw
    const [charIndex] = string.find(characterName, "^", undefined, true)
    if (charIndex !== undefined) {
      characterName = string.sub(characterName, 1, charIndex - 1)
    }
    PortToFriend.AddNameToNameList(characterName)
    PortToFriend.AddNameToNameList(asUndefinedName(undefined))
  }
}
PortToFriend.CreateGuildAndFriendList = CreateGuildAndFriendList
