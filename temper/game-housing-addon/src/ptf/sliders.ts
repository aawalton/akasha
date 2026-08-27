import { PortToFriend } from "./state"

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

function AdjustLibrarySlider(this: void): undefined {
  const currentDataCount = PortToFriend.GetFilteredLibraryData().length
  let size =
    25 * currentDataCount +
    25 -
    (PortToFriend.config.size.height -
      PortToFriend.config.size.headerHeightOffset -
      PortToFriend.config.size.headerHeight -
      PortToFriend.config.size.gap -
      100)
  if (size < 0) {
    size = 0
  }

  const library = asPanelControls(PortToFriend.controls.library)
  const slide = (size / 100) * library.slider.GetValue()

  library.scrollPanel.SetSimpleAnchor(library.scrollControl, 0, -slide)
}
PortToFriend.AdjustLibrarySlider = AdjustLibrarySlider

function AdjustSlider(this: void): undefined {
  if (PortToFriend.savedVars !== undefined && PortToFriend.savedVars.favorites !== undefined) {
    let size =
      25 * PortToFriend.savedVars.favorites.length +
      25 -
      (PortToFriend.config.size.height -
        PortToFriend.config.size.headerHeightOffset -
        PortToFriend.config.size.headerHeight -
        PortToFriend.config.size.gap -
        80)
    if (size < 0) {
      size = 0
    }

    const house = asPanelControls(PortToFriend.controls.house)
    const slide = (size / 100) * house.slider.GetValue()

    house.scrollPanel.SetSimpleAnchor(house.scrollControl, 0, -slide)
  }
}
PortToFriend.AdjustSlider = AdjustSlider

function AdjustLibrarySliderSize(this: void): undefined {
  const currentDataCount = PortToFriend.GetFilteredLibraryData().length
  const totalSize = 25 * currentDataCount + 25
  const screenSize =
    PortToFriend.config.size.height -
    PortToFriend.config.size.headerHeightOffset -
    PortToFriend.config.size.headerHeight -
    PortToFriend.config.size.gap -
    100

  const library = asPanelControls(PortToFriend.controls.library)
  if (totalSize <= screenSize) {
    if (PortToFriend.addonState.isScrollable === true) {
      library.slider.SetValue(0)
    }
    library.slider.SetHidden(true)
    PortToFriend.addonState.isScrollable = false
  } else {
    library.slider.SetHidden(false)
    PortToFriend.addonState.isScrollable = true
  }
}
PortToFriend.AdjustLibrarySliderSize = AdjustLibrarySliderSize

function AdjustMyHousesSliderSize(this: void): undefined {
  const currentDataCount = PortToFriend.GetNumPurchasedHouses()
  const totalSize = 25 * currentDataCount + 25
  const screenSize =
    PortToFriend.config.size.height -
    PortToFriend.config.size.headerHeightOffset -
    PortToFriend.config.size.headerHeight -
    PortToFriend.config.size.gap -
    40

  const myHouses = asPanelControls(PortToFriend.controls.myHouses)
  if (totalSize <= screenSize) {
    if (PortToFriend.addonState.isMyHousesScrollable === true) {
      myHouses.slider.SetValue(0)
    }
    myHouses.slider.SetHidden(true)
    PortToFriend.addonState.isMyHousesScrollable = false
  } else {
    myHouses.slider.SetHidden(false)
    PortToFriend.addonState.isMyHousesScrollable = true
  }
}
PortToFriend.AdjustMyHousesSliderSize = AdjustMyHousesSliderSize

function AdjustSliderSize(this: void): undefined {
  const favoriteCount =
    PortToFriend.savedVars !== undefined ? PortToFriend.savedVars.favorites.length : 0
  const totalSize = 25 * favoriteCount + 25
  const screenSize =
    PortToFriend.config.size.height -
    PortToFriend.config.size.headerHeightOffset -
    PortToFriend.config.size.headerHeight -
    PortToFriend.config.size.gap -
    80

  const house = asPanelControls(PortToFriend.controls.house)
  if (totalSize <= screenSize) {
    if (PortToFriend.addonState.isScrollable === true) {
      house.slider.SetValue(0)
    }
    house.slider.SetHidden(true)
    PortToFriend.addonState.isScrollable = false
  } else {
    house.slider.SetHidden(false)
    PortToFriend.addonState.isScrollable = true
  }
}
PortToFriend.AdjustSliderSize = AdjustSliderSize
