import { PortToFriend } from "./state"

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

function PortToFavoriteBinding(this: void, favId: number): boolean {
  const favorites = PortToFriend.savedVars?.favorites
  if (favorites !== undefined && favId > 0 && favId <= 10) {
    for (let i = 0; i < favorites.length; i = i + 1) {
      const favorite = favorites[i]
      if (favorite === undefined) {
        continue
      }
      if (favorite.id !== undefined && favorite.id === favId) {
        PortToFriend.JumpToHouse(favorite.name, favorite.houseId)
        return true
      }
    }
  }
  d(PortToFriend.constants.INVALID_FAVORITE_ID ?? "")
  return false
}
PortToFriend.PortToFavoriteBinding = PortToFavoriteBinding

function PortToMyHouseBinding(this: void, id: number, portType: number): boolean {
  const favorites = PortToFriend.savedVars?.myHousesFavorites[portType]
  if (favorites !== undefined && id > 0 && id <= 10) {
    let portOutside = false
    if (portType === PortToFriend.constants.PORT_TYPE_OUTSIDE) {
      portOutside = true
    }
    if (favorites[id] !== undefined) {
      PortToFriend.PortToMyHousesById(favorites[id], portOutside)
    }
    return true
  }
  d(PortToFriend.constants.INVALID_FAVORITE_ID ?? "")
  return false
}
PortToFriend.PortToMyHouseBinding = PortToMyHouseBinding

function JumpToHouse(this: void, name: string, id: number): undefined {
  if (name !== "" && id !== undefined && id > 0) {
    if (name === GetDisplayName() || zo_strtrim(name) === "") {
      RequestJumpToHouse(id)
    } else {
      JumpToSpecificHouse(name, id)
    }
  }
}
PortToFriend.JumpToHouse = JumpToHouse

function Version12NameFix(this: void, id: number): undefined {
  const favorites = PortToFriend.savedVars?.favorites
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
PortToFriend.Version12NameFix = Version12NameFix

function PortToLibraryEntry(this: void, id: number): undefined {
  const entries = PortToFriend.GetFilteredLibraryData()
  if (id !== undefined && id > 0) {
    const entry = entries[id - 1]
    if (entry === undefined) {
      return
    }
    PortToFriend.JumpToHouse(entry.name, entry.houseId)
    if (PortToFriend.savedVars?.port_mode === PortToFriend.constants.PORT_MODE_ON_CLICK) {
      PortToFriend.CloseWindow()
    }
  }
}
PortToFriend.PortToLibraryEntry = PortToLibraryEntry

function PortToFavorite(this: void, id: number): undefined {
  const favorites = PortToFriend.savedVars?.favorites
  if (favorites !== undefined && id !== undefined && id > 0) {
    const favorite = favorites[id - 1]
    if (favorite === undefined) {
      return
    }
    PortToFriend.JumpToHouse(favorite.name, favorite.houseId)
    if (PortToFriend.savedVars?.port_mode === PortToFriend.constants.PORT_MODE_ON_CLICK) {
      PortToFriend.CloseWindow()
    }
  }
}
PortToFriend.PortToFavorite = PortToFavorite

function PortToMyHousesById(this: void, id: number, outside: boolean): undefined {
  RequestJumpToHouse(id, outside)
  if (PortToFriend.savedVars?.port_mode === PortToFriend.constants.PORT_MODE_ON_CLICK) {
    PortToFriend.CloseWindow()
  }
}
PortToFriend.PortToMyHousesById = PortToMyHousesById

function RemoveFavorite(this: void, id: number): undefined {
  if (id !== undefined && id > 0) {
    const favorites = PortToFriend.savedVars?.favorites
    if (favorites !== undefined) {
      favorites.splice(id - 1, 1)
    }
    PortToFriend.CreateFavorites()
    PortToFriend.BdOnMouseEnter(id)
  }
}
PortToFriend.RemoveFavorite = RemoveFavorite

function EntryExists(this: void, name: string, houseId: number): boolean {
  const favorites = PortToFriend.savedVars?.favorites
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
PortToFriend.EntryExists = EntryExists

function AddFavorite(this: void, name: string, houseId: number): undefined {
  if (houseId > 0) {
    name = zo_strtrim(name)
    if (
      name.toLowerCase() === GetUnitName("player").toLowerCase() ||
      name.toLowerCase() === GetDisplayName().toLowerCase() ||
      name === ""
    ) {
      name = GetDisplayName()
    }
    if (PortToFriend.EntryExists(name, houseId) === false) {
      const favorites = PortToFriend.savedVars?.favorites
      if (favorites !== undefined) {
        favorites[favorites.length] = { name: "", houseId: 0 }
        const added = favorites[favorites.length - 1]
        if (added === undefined) {
          return
        }
        added.name = name
        added.houseId = houseId
      }
      PortToFriend.CreateFavorites()
    }
  }
}
PortToFriend.AddFavorite = AddFavorite

function AddToFavorite(this: void): undefined {
  const house = asHouseControls(PortToFriend.controls.house)
  const name = asEditboxControl(house.editbox).GetText()
  const houseId = PortToFriend.addonState.houseId
  PortToFriend.AddFavorite(name, houseId)
}
PortToFriend.AddToFavorite = AddToFavorite

function OpenWindowKeyBinding(this: void): undefined {
  const tlw = asTlwControl(PortToFriend.controls.TLW)
  tlw.SetHidden(!tlw.IsHidden())
  SetGameCameraUIMode(!tlw.IsHidden())
  if (tlw.IsHidden() === false) {
    PortToFriend.CreateGuildAndFriendList()
  }
  if (tlw.IsHidden() === true) {
    const callback = PortToFriend.addonState.windowCallback
    if (callback !== undefined && type(callback) === "function") {
      PortToFriend.addonState.windowCallback = undefined
      callback()
    }
  }
}
PortToFriend.OpenWindowKeyBinding = OpenWindowKeyBinding

function PortToFriendHouseTab(this: void): undefined {
  if (PortToFriend.addonState.houseId > 0) {
    const house = asHouseControls(PortToFriend.controls.house)
    let name = asEditboxControl(house.editbox).GetText()
    if (
      name.toLowerCase() === GetUnitName("player").toLowerCase() ||
      name.toLowerCase() === GetDisplayName().toLowerCase() ||
      zo_strtrim(name) === ""
    ) {
      name = GetDisplayName()
    }
    PortToFriend.JumpToHouse(name, PortToFriend.addonState.houseId)
  }
}
PortToFriend.PortToFriend = PortToFriendHouseTab

function GetIdFromName(this: void, name: string): number {
  let id = 0
  for (const [key] of pairs(PortToFriend.HOUSES)) {
    if (name === PortToFriend.HOUSES[key]) {
      id = key
      break
    }
  }
  return id
}
PortToFriend.GetIdFromName = GetIdFromName
