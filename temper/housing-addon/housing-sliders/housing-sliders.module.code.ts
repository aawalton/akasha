import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"

interface SliderControl extends Control {
  GetValue: (this: SliderControl) => number
  SetValue: (this: SliderControl, value: number) => void
}

interface ScrollPanelControl extends Control {
  SetSimpleAnchor: (
    this: ScrollPanelControl,
    control: Control,
    offsetX: number,
    offsetY: number
  ) => void
}

interface PanelControls {
  slider: SliderControl
  scrollPanel: ScrollPanelControl
  scrollControl: Control
}

function asPanelControls(value: unknown): PanelControls {
  return value as PanelControls
}

function adjustLibrarySlider(this: void): undefined {
  const currentDataCount = portToFriend.GetFilteredLibraryData().length
  let size =
    25 * currentDataCount +
    25 -
    (portToFriend.config.size.height -
      portToFriend.config.size.headerHeightOffset -
      portToFriend.config.size.headerHeight -
      portToFriend.config.size.gap -
      100)
  if (size < 0) {
    size = 0
  }

  const library = asPanelControls(portToFriend.controls.library)
  const slide = (size / 100) * library.slider.GetValue()

  library.scrollPanel.SetSimpleAnchor(library.scrollControl, 0, -slide)
}
portToFriend.AdjustLibrarySlider = adjustLibrarySlider

function adjustSlider(this: void): undefined {
  if (portToFriend.savedVars !== undefined && portToFriend.savedVars.favorites !== undefined) {
    let size =
      25 * portToFriend.savedVars.favorites.length +
      25 -
      (portToFriend.config.size.height -
        portToFriend.config.size.headerHeightOffset -
        portToFriend.config.size.headerHeight -
        portToFriend.config.size.gap -
        80)
    if (size < 0) {
      size = 0
    }

    const house = asPanelControls(portToFriend.controls.house)
    const slide = (size / 100) * house.slider.GetValue()

    house.scrollPanel.SetSimpleAnchor(house.scrollControl, 0, -slide)
  }
}
portToFriend.AdjustSlider = adjustSlider

function adjustLibrarySliderSize(this: void): undefined {
  const currentDataCount = portToFriend.GetFilteredLibraryData().length
  const totalSize = 25 * currentDataCount + 25
  const screenSize =
    portToFriend.config.size.height -
    portToFriend.config.size.headerHeightOffset -
    portToFriend.config.size.headerHeight -
    portToFriend.config.size.gap -
    100

  const library = asPanelControls(portToFriend.controls.library)
  if (totalSize <= screenSize) {
    if (portToFriend.addonState.isScrollable === true) {
      library.slider.SetValue(0)
    }
    library.slider.SetHidden(true)
    portToFriend.addonState.isScrollable = false
  } else {
    library.slider.SetHidden(false)
    portToFriend.addonState.isScrollable = true
  }
}
portToFriend.AdjustLibrarySliderSize = adjustLibrarySliderSize

function adjustMyHousesSliderSize(this: void): undefined {
  const currentDataCount = portToFriend.GetNumPurchasedHouses()
  const totalSize = 25 * currentDataCount + 25
  const screenSize =
    portToFriend.config.size.height -
    portToFriend.config.size.headerHeightOffset -
    portToFriend.config.size.headerHeight -
    portToFriend.config.size.gap -
    40

  const myHouses = asPanelControls(portToFriend.controls.myHouses)
  if (totalSize <= screenSize) {
    if (portToFriend.addonState.isMyHousesScrollable === true) {
      myHouses.slider.SetValue(0)
    }
    myHouses.slider.SetHidden(true)
    portToFriend.addonState.isMyHousesScrollable = false
  } else {
    myHouses.slider.SetHidden(false)
    portToFriend.addonState.isMyHousesScrollable = true
  }
}
portToFriend.AdjustMyHousesSliderSize = adjustMyHousesSliderSize

function adjustSliderSize(this: void): undefined {
  const favoriteCount =
    portToFriend.savedVars !== undefined ? portToFriend.savedVars.favorites.length : 0
  const totalSize = 25 * favoriteCount + 25
  const screenSize =
    portToFriend.config.size.height -
    portToFriend.config.size.headerHeightOffset -
    portToFriend.config.size.headerHeight -
    portToFriend.config.size.gap -
    80

  const house = asPanelControls(portToFriend.controls.house)
  if (totalSize <= screenSize) {
    if (portToFriend.addonState.isScrollable === true) {
      house.slider.SetValue(0)
    }
    house.slider.SetHidden(true)
    portToFriend.addonState.isScrollable = false
  } else {
    house.slider.SetHidden(false)
    portToFriend.addonState.isScrollable = true
  }
}
portToFriend.AdjustSliderSize = adjustSliderSize
