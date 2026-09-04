import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import "@akasha/temper-eso-types/tstl-eso-sandbox"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"
import type { SortedMyHouse } from "../housing-types/housing-types.module.code.ts"

interface TlwView {
  IsHidden: (this: TlwView) => boolean
}
function asTlwView(value: unknown): TlwView {
  return value as TlwView
}

interface ScrollPanelView {
  SetDimensions: (this: ScrollPanelView, width: number, height: number) => void
  SetSimpleAnchor: (
    this: ScrollPanelView,
    relativeTo: unknown,
    offsetX: number,
    offsetY: number
  ) => void
}
interface SliderView {
  IsHidden: (this: SliderView) => boolean
  GetValue: (this: SliderView) => number
  SetValue: (this: SliderView, value: number) => void
}
interface MyHousesControlsView {
  scrollPanel: ScrollPanelView
  slider: SliderView
  scrollControl: unknown
}
function asMyHousesControlsView(value: unknown): MyHousesControlsView {
  return value as MyHousesControlsView
}

interface RowBackdropView {
  SetDimensions: (this: RowBackdropView, width: number, height: number) => void
  SetHidden: (this: RowBackdropView, hidden: boolean) => void
  ClearAnchors: (this: RowBackdropView) => void
  SetAnchor: (
    this: RowBackdropView,
    point: number,
    relativeTo: unknown,
    relativePoint: number,
    offsetX: number,
    offsetY: number
  ) => void
  SetCenterColor: (this: RowBackdropView, r: number, g: number, b: number, a: number) => void
  SetEdgeColor: (
    this: RowBackdropView,
    r: number,
    g: number,
    b: number,
    a: number,
    weight: number
  ) => void
  SetAlpha: (this: RowBackdropView, alpha: number) => void
}
interface RowLabelView {
  SetDimensions: (this: RowLabelView, width: number, height: number) => void
  SetHidden: (this: RowLabelView, hidden: boolean) => void
  ClearAnchors: (this: RowLabelView) => void
  SetAnchor: (
    this: RowLabelView,
    point: number,
    relativeTo: unknown,
    relativePoint: number,
    offsetX: number,
    offsetY: number
  ) => void
  SetText: (this: RowLabelView, text: string) => void
  SetFont: (this: RowLabelView, font: string) => void
  SetColor: (this: RowLabelView, r: number, g: number, b: number) => void
  SetMouseEnabled: (this: RowLabelView, enabled: boolean) => void
  SetHandler: (this: RowLabelView, event: string, handler: (this: void) => void) => void
}
interface RowButtonView {
  SetHidden: (this: RowButtonView, hidden: boolean) => void
  ClearAnchors: (this: RowButtonView) => void
  SetAnchor: (
    this: RowButtonView,
    point: number,
    relativeTo: unknown,
    relativePoint: number,
    offsetX: number,
    offsetY: number
  ) => void
  SetDimensions: (this: RowButtonView, width: number, height: number) => void
  SetText: (this: RowButtonView, text: string) => void
  SetClickSound: (this: RowButtonView, sound: string) => void
  SetHandler: (this: RowButtonView, event: string, handler: (this: void) => void) => void
}
interface PurchasedHouseRowView {
  backDrop?: RowBackdropView
  name?: RowLabelView
  location?: RowLabelView
  VCButton?: RowButtonView
  portInsideButton?: RowButtonView
  portOutsideButton?: RowButtonView
}
function asPurchasedHouseRowView(value: unknown): PurchasedHouseRowView {
  return value as PurchasedHouseRowView
}

function asRowBackdropView(value: unknown): RowBackdropView {
  return value as RowBackdropView
}
function asRowLabelView(value: unknown): RowLabelView {
  return value as RowLabelView
}
function asRowButtonView(value: unknown): RowButtonView {
  return value as RowButtonView
}
function asControl(value: unknown): Control {
  return value as Control
}

interface VirtualControlFactory {
  CreateControlFromVirtual: (
    this: VirtualControlFactory,
    name: string | undefined,
    parent: Control | undefined,
    virtualName: string
  ) => Control
}
function asVirtualControlFactory(value: unknown): VirtualControlFactory {
  return value as VirtualControlFactory
}

type HouseId = number
function asHouseId(value: unknown): HouseId {
  return value as HouseId
}

function onPlayerDeactivated(this: void): undefined {
  const savedVars = portToFriend.savedVars
  if (
    savedVars !== undefined &&
    savedVars.port_mode === portToFriend.constants.PORT_MODE_ON_DEACTIVATE &&
    asTlwView(portToFriend.controls.TLW).IsHidden() === false
  ) {
    portToFriend.CloseWindow()
  }
}
portToFriend.OnPlayerDeactivated = onPlayerDeactivated

function sortMyHousesByHouse(this: void, houseA: SortedMyHouse, houseB: SortedMyHouse): boolean {
  if (houseA.houseName === undefined && houseB.houseName === undefined) {
    return true
  } else if (houseA.houseName !== undefined && houseB.houseName === undefined) {
    return true
  } else if (houseA.houseName === undefined && houseB.houseName !== undefined) {
    return false
  }
  return houseA.houseName < houseB.houseName
}
portToFriend.SortMyHousesByHouse = sortMyHousesByHouse

function sortMyHousesByLocation(this: void, houseA: SortedMyHouse, houseB: SortedMyHouse): boolean {
  if (houseA.location === undefined && houseB.location === undefined) {
    return true
  } else if (houseA.location !== undefined && houseB.location === undefined) {
    return true
  } else if (houseA.location === undefined && houseB.location !== undefined) {
    return false
  }
  if (houseA.location < houseB.location) {
    return true
  } else if (houseA.location > houseB.location) {
    return false
  } else {
    return portToFriend.SortMyHousesByHouse(houseA, houseB)
  }
}
portToFriend.SortMyHousesByLocation = sortMyHousesByLocation

function getSortedMyHousesList(this: void): SortedMyHouse[] {
  let sortFunction: (this: void, houseA: SortedMyHouse, houseB: SortedMyHouse) => boolean
  if (portToFriend.addonState.selectedMyHousesSort === portToFriend.constants.SORT_ID_HOUSE) {
    sortFunction = portToFriend.SortMyHousesByHouse
  } else {
    sortFunction = portToFriend.SortMyHousesByLocation
  }
  const purchasedHouses: SortedMyHouse[] = []
  if (portToFriend.purchasedHouses !== undefined) {
    let currentIndex = 0
    for (const key in portToFriend.purchasedHouses) {
      const refId = asHouseId(key)
      const source = portToFriend.purchasedHouses[refId]
      if (source === undefined) {
        continue
      }
      purchasedHouses[currentIndex] = {
        houseId: refId,
        houseName: source.name,
        location: source.location,
      }
      currentIndex = currentIndex + 1
    }
    table.sort(purchasedHouses, sortFunction)
  }
  return purchasedHouses
}
portToFriend.GetSortedMyHousesList = getSortedMyHousesList

function updateMyHouses(this: void): undefined {
  const sortedMyHousesList = portToFriend.GetSortedMyHousesList()
  const myHouses = asMyHousesControlsView(portToFriend.controls.myHouses)

  for (let i = 0; i < sortedMyHousesList.length; i = i + 1) {
    const rowId = i + 1
    const entry = sortedMyHousesList[i]
    if (entry === undefined) {
      continue
    }
    if (portToFriend.controls.purchasedHouses[rowId] === undefined) {
      portToFriend.controls.purchasedHouses[rowId] = {}
    }
    const row = asPurchasedHouseRowView(portToFriend.controls.purchasedHouses[rowId])

    if (row.backDrop === undefined) {
      row.backDrop = asRowBackdropView(
        WINDOW_MANAGER.CreateControl(undefined, asControl(myHouses.scrollPanel), CT_BACKDROP)
      )
    }
    const backDrop = row.backDrop
    backDrop.SetDimensions(portToFriend.config.size.width - 30, 25)
    backDrop.SetHidden(false)
    backDrop.ClearAnchors()
    backDrop.SetAnchor(TOPLEFT, myHouses.scrollPanel, TOPLEFT, 5, 25 * i + 15)
    backDrop.SetCenterColor(
      portToFriend.config.color.backDropLine.R,
      portToFriend.config.color.backDropLine.G,
      portToFriend.config.color.backDropLine.B,
      0.0
    )
    backDrop.SetEdgeColor(
      portToFriend.config.color.backDropLine.R,
      portToFriend.config.color.backDropLine.G,
      portToFriend.config.color.backDropLine.B,
      0.0,
      0
    )
    backDrop.SetAlpha(1)

    if (row.name === undefined) {
      row.name = asRowLabelView(
        WINDOW_MANAGER.CreateControl(undefined, asControl(backDrop), CT_LABEL)
      )
    }
    const nameLabel = row.name
    nameLabel.SetDimensions(235, 25)
    nameLabel.SetHidden(false)
    nameLabel.ClearAnchors()
    nameLabel.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 0, 0)
    nameLabel.SetText(entry.houseName)
    nameLabel.SetFont(portToFriend.config.fonts.header)
    nameLabel.SetColor(
      portToFriend.config.color.default.R,
      portToFriend.config.color.default.G,
      portToFriend.config.color.default.B
    )
    nameLabel.SetMouseEnabled(true)
    nameLabel.SetHandler("OnMouseEnter", () => portToFriend.BdMyHousesOnMouseEnter(rowId))
    nameLabel.SetHandler("OnMouseExit", () => portToFriend.BdMyHousesOnMouseExit(rowId))

    if (row.location === undefined) {
      row.location = asRowLabelView(
        WINDOW_MANAGER.CreateControl(undefined, asControl(backDrop), CT_LABEL)
      )
    }
    const locationLabel = row.location
    locationLabel.SetDimensions(155, 25)
    locationLabel.SetHidden(false)
    locationLabel.ClearAnchors()
    locationLabel.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 235, 0)
    locationLabel.SetText(entry.location)
    locationLabel.SetFont(portToFriend.config.fonts.header)
    locationLabel.SetColor(
      portToFriend.config.color.default.R,
      portToFriend.config.color.default.G,
      portToFriend.config.color.default.B
    )
    locationLabel.SetMouseEnabled(true)
    locationLabel.SetHandler("OnMouseEnter", () => portToFriend.BdMyHousesOnMouseEnter(rowId))
    locationLabel.SetHandler("OnMouseExit", () => portToFriend.BdMyHousesOnMouseExit(rowId))

    if (row.VCButton === undefined) {
      row.VCButton = asRowButtonView(
        asVirtualControlFactory(WINDOW_MANAGER).CreateControlFromVirtual(
          undefined,
          asControl(backDrop),
          "ZO_DefaultButton"
        )
      )
    }
    const vcButton = row.VCButton
    vcButton.SetHidden(false)
    vcButton.ClearAnchors()
    vcButton.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 390, 0)
    vcButton.SetDimensions(50, 25)
    vcButton.SetText(portToFriend.constants.BUTTON_VC ?? "")
    vcButton.SetClickSound("Click")
    vcButton.SetHandler("OnClicked", () => portToFriend.MyHousesToVC(entry.houseId))
    vcButton.SetHandler("OnMouseEnter", () => portToFriend.BdMyHousesOnMouseEnter(rowId))
    vcButton.SetHandler("OnMouseExit", () => portToFriend.BdMyHousesOnMouseExit(rowId))

    let value = portToFriend.GetFavoriteIdFromMyHouseId(
      entry.houseId,
      portToFriend.constants.PORT_TYPE_INSIDE
    )
    portToFriend.CreatePortMyHouseFavorite(
      rowId,
      60,
      25,
      440,
      asControl(backDrop),
      value,
      portToFriend.constants.PORT_TYPE_INSIDE,
      entry.houseId
    )
    if (row.portInsideButton === undefined) {
      row.portInsideButton = asRowButtonView(
        asVirtualControlFactory(WINDOW_MANAGER).CreateControlFromVirtual(
          undefined,
          asControl(backDrop),
          "ZO_DefaultButton"
        )
      )
    }
    const portInsideButton = row.portInsideButton
    portInsideButton.SetHidden(false)
    portInsideButton.ClearAnchors()
    portInsideButton.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 500, 0)
    portInsideButton.SetDimensions(105, 25)
    portInsideButton.SetText(portToFriend.constants.MYHOUSES_PORT_INSIDE ?? "")
    portInsideButton.SetClickSound("Click")
    portInsideButton.SetHandler("OnClicked", () =>
      portToFriend.PortToMyHousesById(entry.houseId, false)
    )
    portInsideButton.SetHandler("OnMouseEnter", () => portToFriend.BdMyHousesOnMouseEnter(rowId))
    portInsideButton.SetHandler("OnMouseExit", () => portToFriend.BdMyHousesOnMouseExit(rowId))

    value = portToFriend.GetFavoriteIdFromMyHouseId(
      entry.houseId,
      portToFriend.constants.PORT_TYPE_OUTSIDE
    )
    portToFriend.CreatePortMyHouseFavorite(
      rowId,
      60,
      25,
      605,
      asControl(backDrop),
      value,
      portToFriend.constants.PORT_TYPE_OUTSIDE,
      entry.houseId
    )
    if (row.portOutsideButton === undefined) {
      row.portOutsideButton = asRowButtonView(
        asVirtualControlFactory(WINDOW_MANAGER).CreateControlFromVirtual(
          undefined,
          asControl(backDrop),
          "ZO_DefaultButton"
        )
      )
    }
    const portOutsideButton = row.portOutsideButton
    portOutsideButton.SetHidden(false)
    portOutsideButton.ClearAnchors()
    portOutsideButton.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 665, 0)
    portOutsideButton.SetDimensions(105, 25)
    portOutsideButton.SetText(portToFriend.constants.MYHOUSES_FRONT_DOOR ?? "")
    portOutsideButton.SetClickSound("Click")
    portOutsideButton.SetHandler("OnClicked", () =>
      portToFriend.PortToMyHousesById(entry.houseId, true)
    )
    portOutsideButton.SetHandler("OnMouseEnter", () => portToFriend.BdMyHousesOnMouseEnter(rowId))
    portOutsideButton.SetHandler("OnMouseExit", () => portToFriend.BdMyHousesOnMouseExit(rowId))
  }
  myHouses.scrollPanel.SetDimensions(
    portToFriend.config.size.width - 10,
    sortedMyHousesList.length * 25 + 15
  )

  portToFriend.AdjustMyHousesSliderSize()
}
portToFriend.UpdateMyHouses = updateMyHouses

function myHousesPanelOnMouseWheel(this: void, _control: Control, delta: number): undefined {
  const myHouses = asMyHousesControlsView(portToFriend.controls.myHouses)
  if (myHouses.slider.IsHidden() === false) {
    let size = 100 / portToFriend.GetNumPurchasedHouses()
    if (size < 1) {
      size = 1
    }
    let position = -delta * size * 2 + myHouses.slider.GetValue()

    if (position < 0) {
      position = 0
    }
    if (position > 100) {
      position = 100
    }
    myHouses.slider.SetValue(position)
  }
}
portToFriend.MyHousesPanelOnMouseWheel = myHousesPanelOnMouseWheel

function myHousesAdjustSlider(this: void): undefined {
  const myHouses = asMyHousesControlsView(portToFriend.controls.myHouses)
  let size =
    25 * portToFriend.GetNumPurchasedHouses() +
    10 -
    (portToFriend.config.size.height -
      portToFriend.config.size.headerHeightOffset -
      portToFriend.config.size.headerHeight -
      portToFriend.config.size.gap -
      40)
  if (size < 0) {
    size = 0
  }

  const slide = (size / 100) * myHouses.slider.GetValue()

  myHouses.scrollPanel.SetSimpleAnchor(myHouses.scrollControl, 0, -slide)
}
portToFriend.MyHousesAdjustSlider = myHousesAdjustSlider
