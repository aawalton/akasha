import { getPtfSavedVars, PortToFriend } from "./state"
import type { PurchasedHouse } from "./types"

interface ListSlider {
  IsHidden: (this: ListSlider) => boolean
  GetValue: (this: ListSlider) => number
  SetValue: (this: ListSlider, value: number) => void
}
interface ListPanel {
  slider: ListSlider
}
function asListPanel(value: unknown): ListPanel {
  return value as ListPanel
}

function CreateHouseList(this: void): Record<number, string> {
  const data = ZO_COLLECTIBLE_DATA_MANAGER.GetAllCollectibleDataObjects()
  const retHouses: Record<number, string> = {}
  PortToFriend.purchasedHouses = {}
  for (const collectible of data) {
    if (collectible.IsHouse() === true) {
      retHouses[collectible.GetReferenceId()] = collectible.GetFormattedName()
      if (collectible.IsLocked() === false) {
        const refId = collectible.GetReferenceId()
        const purchased: PurchasedHouse = {
          name: collectible.GetFormattedName(),
          location: zo_strformat("<<C:1>>", collectible.GetHouseLocation()),
        }
        PortToFriend.purchasedHouses[refId] = purchased
      }
    }
  }
  return retHouses
}
PortToFriend.CreateHouseList = CreateHouseList

function GetNumPurchasedHouses(this: void): number {
  let ret = 0
  for (const _key in PortToFriend.purchasedHouses) {
    ret = ret + 1
  }
  return ret
}
PortToFriend.GetNumPurchasedHouses = GetNumPurchasedHouses

function LibraryPanelOnMouseWheel(this: void, _control: Control, delta: number): undefined {
  const library = asListPanel(PortToFriend.controls.library)
  if (library.slider.IsHidden() === false) {
    const size = 100 / PortToFriend.libData.currentData.length
    let position = -delta * size * 2 + library.slider.GetValue()

    if (position < 0) {
      position = 0
    }
    if (position > 100) {
      position = 100
    }
    library.slider.SetValue(position)
  }
}
PortToFriend.LibraryPanelOnMouseWheel = LibraryPanelOnMouseWheel

function FavoritePanelOnMouseWheel(this: void, _control: Control, delta: number): undefined {
  const house = asListPanel(PortToFriend.controls.house)
  if (house.slider.IsHidden() === false) {
    const savedVars = getPtfSavedVars()
    let size = 100 / savedVars.favorites.length
    if (size < 1) {
      size = 1
    }
    let position = -delta * size * 2 + house.slider.GetValue()

    if (position < 0) {
      position = 0
    }
    if (position > 100) {
      position = 100
    }
    house.slider.SetValue(position)
  }
}
PortToFriend.FavoritePanelOnMouseWheel = FavoritePanelOnMouseWheel
