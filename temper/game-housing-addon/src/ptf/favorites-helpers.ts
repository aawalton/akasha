import { PortToFriend } from "./state"
import type { Favorite } from "./types"

interface ScrollPanelHolder {
  scrollPanel: Control
}

function asScrollPanelHolder(value: unknown): ScrollPanelHolder {
  return value as ScrollPanelHolder
}

interface LibraryEntryControls {
  backDrop: Control
  name: Control
  house: Control
  category: Control
  portButton: Control
}

function asLibraryEntryControls(value: unknown): LibraryEntryControls {
  return value as LibraryEntryControls
}

interface FavoriteEntryControls {
  backDrop: Control
  name: Control
  house: Control
  portButton: Control
  removeButton: Control
}

function asFavoriteEntryControls(value: unknown): FavoriteEntryControls {
  return value as FavoriteEntryControls
}

function SortFriends(this: void): Favorite[] | undefined {
  if (PortToFriend.savedVars !== undefined && PortToFriend.savedVars.favorites !== undefined) {
    const favorites = PortToFriend.savedVars.favorites
    let itemCount = favorites.length
    let hasChanged = false
    do {
      hasChanged = false
      itemCount = itemCount - 1
      for (let i = 0; i < itemCount; i = i + 1) {
        const current = favorites[i]
        const next = favorites[i + 1]
        if (current === undefined || next === undefined) {
          continue
        }
        if (current.name > next.name) {
          favorites[i] = next
          favorites[i + 1] = current
          hasChanged = true
        } else if (current.name === next.name) {
          const currentHouse = PortToFriend.HOUSES[current.houseId]
          const nextHouse = PortToFriend.HOUSES[next.houseId]
          if (currentHouse === undefined || nextHouse === undefined) {
            continue
          }
          if (currentHouse > nextHouse) {
            favorites[i] = next
            favorites[i + 1] = current
            hasChanged = true
          }
        }
      }
    } while (hasChanged !== false)
    return undefined
  }
  return undefined
}
PortToFriend.SortFriends = SortFriends

function GetFavorites(this: void): Favorite[] | undefined {
  if (PortToFriend.savedVars === undefined) {
    return undefined
  }
  return PortToFriend.savedVars.favorites
}
PortToFriend.GetFavorites = GetFavorites

function ClearLibraryControls(this: void, index: number): undefined {
  const libraryEntries = PortToFriend.controls.libraryEntries
  if (libraryEntries !== undefined && index !== undefined && index < libraryEntries.length) {
    const library = asScrollPanelHolder(PortToFriend.controls.library)
    for (let i = index; i < libraryEntries.length; i = i + 1) {
      const entry = asLibraryEntryControls(libraryEntries[i])
      entry.backDrop.SetHidden(true)
      entry.backDrop.ClearAnchors()
      entry.backDrop.SetAnchor(TOPLEFT, library.scrollPanel, TOPLEFT, 0, 0)
      entry.name.SetHidden(true)
      entry.name.ClearAnchors()
      entry.name.SetAnchor(TOPLEFT, entry.backDrop, TOPLEFT, 0, 0)
      entry.house.SetHidden(true)
      entry.house.ClearAnchors()
      entry.house.SetAnchor(TOPLEFT, entry.backDrop, TOPLEFT, 0, 0)
      entry.category.SetHidden(true)
      entry.category.ClearAnchors()
      entry.category.SetAnchor(TOPLEFT, entry.backDrop, TOPLEFT, 0, 0)
      entry.portButton.SetHidden(true)
      entry.portButton.ClearAnchors()
      entry.portButton.SetAnchor(TOPLEFT, entry.backDrop, TOPLEFT, 0, 0)
    }
  }
}
PortToFriend.ClearLibraryControls = ClearLibraryControls

function ClearFavoriteControls(this: void, index: number): undefined {
  const favorites = PortToFriend.controls.favorites
  if (favorites !== undefined && index !== undefined && index < favorites.length) {
    const house = asScrollPanelHolder(PortToFriend.controls.house)
    for (let i = index; i < favorites.length; i = i + 1) {
      const entry = asFavoriteEntryControls(favorites[i])
      entry.backDrop.SetHidden(true)
      entry.backDrop.ClearAnchors()
      entry.backDrop.SetAnchor(TOPLEFT, house.scrollPanel, TOPLEFT, 0, 0)
      entry.name.SetHidden(true)
      entry.name.ClearAnchors()
      entry.name.SetAnchor(TOPLEFT, entry.backDrop, TOPLEFT, 0, 0)
      entry.house.SetHidden(true)
      entry.house.ClearAnchors()
      entry.house.SetAnchor(TOPLEFT, entry.backDrop, TOPLEFT, 0, 0)
      entry.portButton.SetHidden(true)
      entry.portButton.ClearAnchors()
      entry.portButton.SetAnchor(TOPLEFT, entry.backDrop, TOPLEFT, 0, 0)
      entry.removeButton.SetHidden(true)
      entry.removeButton.ClearAnchors()
      entry.removeButton.SetAnchor(TOPLEFT, entry.backDrop, TOPLEFT, 0, 0)
    }
  }
}
PortToFriend.ClearFavoriteControls = ClearFavoriteControls
