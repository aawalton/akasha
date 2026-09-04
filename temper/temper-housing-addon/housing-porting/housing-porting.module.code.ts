import "@akasha/temper-eso-types/eso-extra"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/eso-functions-09"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/tstl-eso-sandbox"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"

interface EditboxControl {
  GetText: (this: EditboxControl) => string
}
function asEditboxControl(value: unknown): EditboxControl {
  return value as EditboxControl
}

interface HouseControls {
  editbox: unknown
}
function asHouseControls(value: unknown): HouseControls {
  return value as HouseControls
}

interface TlwControl {
  IsHidden: (this: TlwControl) => boolean
  SetHidden: (this: TlwControl, hidden: boolean) => void
}
function asTlwControl(value: unknown): TlwControl {
  return value as TlwControl
}

function portToFavoriteBinding(this: void, favId: number): boolean {
  const favorites = portToFriend.savedVars?.favorites
  if (favorites !== undefined && favId > 0 && favId <= 10) {
    for (let i = 0; i < favorites.length; i = i + 1) {
      const favorite = favorites[i]
      if (favorite === undefined) {
        continue
      }
      if (favorite.id !== undefined && favorite.id === favId) {
        portToFriend.JumpToHouse(favorite.name, favorite.houseId)
        return true
      }
    }
  }
  d(portToFriend.constants.INVALID_FAVORITE_ID ?? "")
  return false
}
portToFriend.PortToFavoriteBinding = portToFavoriteBinding

function portToMyHouseBinding(this: void, id: number, portType: number): boolean {
  const favorites = portToFriend.savedVars?.myHousesFavorites[portType]
  if (favorites !== undefined && id > 0 && id <= 10) {
    let portOutside = false
    if (portType === portToFriend.constants.PORT_TYPE_OUTSIDE) {
      portOutside = true
    }
    if (favorites[id] !== undefined) {
      portToFriend.PortToMyHousesById(favorites[id], portOutside)
    }
    return true
  }
  d(portToFriend.constants.INVALID_FAVORITE_ID ?? "")
  return false
}
portToFriend.PortToMyHouseBinding = portToMyHouseBinding

function jumpToHouse(this: void, name: string, id: number): undefined {
  if (name !== "" && id !== undefined && id > 0) {
    if (name === GetDisplayName() || zo_strtrim(name) === "") {
      RequestJumpToHouse(id)
    } else {
      JumpToSpecificHouse(name, id)
    }
  }
}
portToFriend.JumpToHouse = jumpToHouse

function version12NameFix(this: void, id: number): undefined {
  const favorites = portToFriend.savedVars?.favorites
  if (favorites === undefined) {
    return
  }
  const favorite = favorites[id - 1]
  if (favorite === undefined) {
    return
  }
  if (
    favorite.name.toLowerCase() === GetUnitName("player").toLowerCase() ||
    favorite.name.toLowerCase() === GetDisplayName().toLowerCase()
  ) {
    favorite.name = GetDisplayName()
  }
}
portToFriend.Version12NameFix = version12NameFix

function portToLibraryEntry(this: void, id: number): undefined {
  const entries = portToFriend.GetFilteredLibraryData()
  if (id !== undefined && id > 0) {
    const entry = entries[id - 1]
    if (entry === undefined) {
      return
    }
    portToFriend.JumpToHouse(entry.name, entry.houseId)
    if (portToFriend.savedVars?.port_mode === portToFriend.constants.PORT_MODE_ON_CLICK) {
      portToFriend.CloseWindow()
    }
  }
}
portToFriend.PortToLibraryEntry = portToLibraryEntry

function portToFavorite(this: void, id: number): undefined {
  const favorites = portToFriend.savedVars?.favorites
  if (favorites !== undefined && id !== undefined && id > 0) {
    const favorite = favorites[id - 1]
    if (favorite === undefined) {
      return
    }
    portToFriend.JumpToHouse(favorite.name, favorite.houseId)
    if (portToFriend.savedVars?.port_mode === portToFriend.constants.PORT_MODE_ON_CLICK) {
      portToFriend.CloseWindow()
    }
  }
}
portToFriend.PortToFavorite = portToFavorite

function portToMyHousesById(this: void, id: number, outside: boolean): undefined {
  RequestJumpToHouse(id, outside)
  if (portToFriend.savedVars?.port_mode === portToFriend.constants.PORT_MODE_ON_CLICK) {
    portToFriend.CloseWindow()
  }
}
portToFriend.PortToMyHousesById = portToMyHousesById

function removeFavorite(this: void, id: number): undefined {
  if (id !== undefined && id > 0) {
    const favorites = portToFriend.savedVars?.favorites
    if (favorites !== undefined) {
      favorites.splice(id - 1, 1)
    }
    portToFriend.CreateFavorites()
    portToFriend.BdOnMouseEnter(id)
  }
}
portToFriend.RemoveFavorite = removeFavorite

function entryExists(this: void, name: string, houseId: number): boolean {
  const favorites = portToFriend.savedVars?.favorites
  if (favorites !== undefined) {
    for (let i = 0; i < favorites.length; i = i + 1) {
      const favorite = favorites[i]
      if (favorite === undefined) {
        continue
      }
      if (favorite.name === name && favorite.houseId === houseId) {
        return true
      }
    }
  }
  return false
}
portToFriend.EntryExists = entryExists

function addFavorite(this: void, name: string, houseId: number): undefined {
  if (houseId > 0) {
    name = zo_strtrim(name)
    if (
      name.toLowerCase() === GetUnitName("player").toLowerCase() ||
      name.toLowerCase() === GetDisplayName().toLowerCase() ||
      name === ""
    ) {
      name = GetDisplayName()
    }
    if (portToFriend.EntryExists(name, houseId) === false) {
      const favorites = portToFriend.savedVars?.favorites
      if (favorites !== undefined) {
        favorites[favorites.length] = { name: "", houseId: 0 }
        const added = favorites[favorites.length - 1]
        if (added === undefined) {
          return
        }
        added.name = name
        added.houseId = houseId
      }
      portToFriend.CreateFavorites()
    }
  }
}
portToFriend.AddFavorite = addFavorite

function addToFavorite(this: void): undefined {
  const house = asHouseControls(portToFriend.controls.house)
  const name = asEditboxControl(house.editbox).GetText()
  const houseId = portToFriend.addonState.houseId
  portToFriend.AddFavorite(name, houseId)
}
portToFriend.AddToFavorite = addToFavorite

function openWindowKeyBinding(this: void): undefined {
  const tlw = asTlwControl(portToFriend.controls.TLW)
  tlw.SetHidden(!tlw.IsHidden())
  SetGameCameraUIMode(!tlw.IsHidden())
  if (tlw.IsHidden() === false) {
    portToFriend.CreateGuildAndFriendList()
  }
  if (tlw.IsHidden() === true) {
    const callback = portToFriend.addonState.windowCallback
    if (callback !== undefined && type(callback) === "function") {
      portToFriend.addonState.windowCallback = undefined
      callback()
    }
  }
}
portToFriend.OpenWindowKeyBinding = openWindowKeyBinding

function portToFriendHouseTab(this: void): undefined {
  if (portToFriend.addonState.houseId > 0) {
    const house = asHouseControls(portToFriend.controls.house)
    let name = asEditboxControl(house.editbox).GetText()
    if (
      name.toLowerCase() === GetUnitName("player").toLowerCase() ||
      name.toLowerCase() === GetDisplayName().toLowerCase() ||
      zo_strtrim(name) === ""
    ) {
      name = GetDisplayName()
    }
    portToFriend.JumpToHouse(name, portToFriend.addonState.houseId)
  }
}
portToFriend.PortToFriend = portToFriendHouseTab

function getIdFromName(this: void, name: string): number {
  let id = 0
  for (const [key] of pairs(portToFriend.HOUSES)) {
    if (name === portToFriend.HOUSES[key]) {
      id = key
      break
    }
  }
  return id
}
portToFriend.GetIdFromName = getIdFromName
