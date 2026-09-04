import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-interface-extra-2"
import "@akasha/temper-eso-types/eso-objects-01"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"

interface TabBackdrop {
  SetCenterColor: (this: TabBackdrop, r: number, g: number, b: number, a?: number) => void
}
interface TabNode {
  backdrop: TabBackdrop
}
interface BodyPanelControl {
  SetHidden: (this: BodyPanelControl, hidden: boolean) => void
}
interface BodyPanel {
  control: BodyPanelControl
}
interface TabControlNode {
  houseTab: TabNode
  vcTab: TabNode
  myHousesTab: TabNode
  libraryTab: TabNode
}

function asTabControlNode(value: unknown): TabControlNode {
  return value as TabControlNode
}
function asBodyPanel(value: unknown): BodyPanel {
  return value as BodyPanel
}

interface BodyControls {
  tabControl: unknown
}
function asBodyControls(value: unknown): BodyControls {
  return value as BodyControls
}

interface EdgeBackdropControl {
  SetAnchor: (
    this: EdgeBackdropControl,
    point: number,
    relativeTo?: Control,
    relativePoint?: number,
    offsetX?: number,
    offsetY?: number
  ) => void
  SetDimensions: (this: EdgeBackdropControl, width: number, height: number) => void
  SetEdgeTexture: (
    this: EdgeBackdropControl,
    texture: string | undefined,
    width: number,
    height: number,
    padding: number,
    inner: number
  ) => void
  SetCenterColor: (this: EdgeBackdropControl, r: number, g: number, b: number, a?: number) => void
  SetEdgeColor: (this: EdgeBackdropControl, r: number, g: number, b: number, a?: number) => void
}

interface TabControl extends Control {
  backdrop: BackdropControl
  edge: EdgeBackdropControl
  label: LabelControl
  button: ButtonControl
}
function asTabControl(value: unknown): TabControl {
  return value as TabControl
}
function asEdgeBackdropControl(value: unknown): EdgeBackdropControl {
  return value as EdgeBackdropControl
}

function getTabControlNode(this: void): TabControlNode {
  return asTabControlNode(asBodyControls(portToFriend.controls.body).tabControl)
}

function createTabControl(
  this: void,
  rootControl: Control,
  offset: number,
  index: number,
  title: string
): Control {
  const config = portToFriend.config
  const control = asTabControl(WINDOW_MANAGER.CreateControl(undefined, rootControl, CT_CONTROL))
  control.SetDimensions(config.tabWidth, config.tabHeight - config.tabOffset)
  control.SetAnchor(TOPLEFT, rootControl, TOPLEFT, offset, config.tabOffset)

  control.backdrop = WINDOW_MANAGER.CreateControl(undefined, control, CT_BACKDROP)
  control.backdrop.SetAnchor(TOPLEFT, control, TOPLEFT, 0, 0)
  control.backdrop.SetDimensions(config.tabWidth, config.tabHeight - config.tabOffset)
  control.backdrop.SetCenterColor(
    config.color.tabNotSelected.r,
    config.color.tabNotSelected.g,
    config.color.tabNotSelected.b,
    config.color.tabNotSelected.a
  )
  control.backdrop.SetEdgeColor(0, 0, 0, 0)

  control.edge = asEdgeBackdropControl(
    WINDOW_MANAGER.CreateControl(undefined, control, CT_BACKDROP)
  )
  control.edge.SetAnchor(TOPLEFT, control, TOPLEFT, 0, 0)
  control.edge.SetDimensions(config.tabWidth, config.tabHeight - config.tabOffset)
  control.edge.SetEdgeTexture(undefined, 1, 1, 2, 0)
  control.edge.SetCenterColor(0, 0, 0, 0)
  control.edge.SetEdgeColor(
    config.color.edgeColor.r,
    config.color.edgeColor.g,
    config.color.edgeColor.b,
    config.color.edgeColor.a
  )

  control.label = WINDOW_MANAGER.CreateControl(undefined, control, CT_LABEL)
  control.label.SetAnchor(TOPLEFT, control, TOPLEFT, 0, 0)
  control.label.SetFont(config.tabFont)
  control.label.SetWrapMode(ELLIPSIS)
  control.label.SetColor(
    config.color.tabFontColor.r,
    config.color.tabFontColor.g,
    config.color.tabFontColor.b
  )
  control.label.SetText(title)
  control.label.SetDimensions(config.tabWidth, config.tabHeight - config.tabOffset)
  control.label.SetHorizontalAlignment(TEXT_ALIGN_CENTER)
  control.label.SetVerticalAlignment(TEXT_ALIGN_CENTER)

  control.button = WINDOW_MANAGER.CreateControl(undefined, control, CT_BUTTON)
  const button = control.button
  button.SetAnchor(TOPLEFT, control, TOPLEFT, 0, 0)
  button.SetDimensions(config.tabWidth, config.tabHeight - config.tabOffset)
  button.SetHandler("OnClicked", () => {
    portToFriend.TabSelected(index)
  })
  button.SetHandler("OnMouseEnter", () => {
    portToFriend.TabOnMouseEnter(index)
  })
  button.SetHandler("OnMouseExit", () => {
    portToFriend.TabOnMouseExit(index)
  })

  return control
}
portToFriend.CreateTabControl = createTabControl

function tabSelected(this: void, index: number): undefined {
  const color = portToFriend.config.color.tabNotSelected
  const constants = portToFriend.constants
  const tabControl = getTabControlNode()
  if (index !== constants.TAB_HOUSE) {
    tabControl.houseTab.backdrop.SetCenterColor(color.r, color.g, color.b, color.a)
  }
  if (index !== constants.TAB_VC) {
    tabControl.vcTab.backdrop.SetCenterColor(color.r, color.g, color.b, color.a)
  }
  if (index !== constants.TAB_MYHOUSES) {
    tabControl.myHousesTab.backdrop.SetCenterColor(color.r, color.g, color.b, color.a)
  }
  if (index !== constants.TAB_LIBRARY) {
    tabControl.libraryTab.backdrop.SetCenterColor(color.r, color.g, color.b, color.a)
  }
  portToFriend.addonState.selectedTab = index

  const house = asBodyPanel(portToFriend.controls.house)
  const vc = asBodyPanel(portToFriend.controls.vc)
  const myHouses = asBodyPanel(portToFriend.controls.myHouses)
  const library = asBodyPanel(portToFriend.controls.library)

  if (index === constants.TAB_HOUSE) {
    house.control.SetHidden(false)
    vc.control.SetHidden(true)
    myHouses.control.SetHidden(true)
    library.control.SetHidden(true)
  }
  if (index === constants.TAB_VC) {
    house.control.SetHidden(true)
    vc.control.SetHidden(false)
    myHouses.control.SetHidden(true)
    library.control.SetHidden(true)
  }
  if (index === constants.TAB_MYHOUSES) {
    house.control.SetHidden(true)
    vc.control.SetHidden(true)
    myHouses.control.SetHidden(false)
    library.control.SetHidden(true)
  }
  if (index === constants.TAB_LIBRARY) {
    house.control.SetHidden(true)
    vc.control.SetHidden(true)
    myHouses.control.SetHidden(true)
    library.control.SetHidden(false)
  }
}
portToFriend.TabSelected = tabSelected

function getTabBackdropForIndex(this: void, index: number): TabBackdrop | undefined {
  const constants = portToFriend.constants
  const tabControl = getTabControlNode()
  if (index === constants.TAB_HOUSE) {
    return tabControl.houseTab.backdrop
  }
  if (index === constants.TAB_VC) {
    return tabControl.vcTab.backdrop
  }
  if (index === constants.TAB_MYHOUSES) {
    return tabControl.myHousesTab.backdrop
  }
  if (index === constants.TAB_LIBRARY) {
    return tabControl.libraryTab.backdrop
  }
  return undefined
}

function tabOnMouseEnter(this: void, index: number): undefined {
  const control = getTabBackdropForIndex(index)
  const color = portToFriend.config.color.tabMouseOver
  if (control !== undefined) {
    control.SetCenterColor(color.r, color.g, color.b, color.a)
  }
}
portToFriend.TabOnMouseEnter = tabOnMouseEnter

function tabOnMouseExit(this: void, index: number): undefined {
  const control = getTabBackdropForIndex(index)
  let color = portToFriend.config.color.tabSelected
  if (index !== portToFriend.addonState.selectedTab) {
    color = portToFriend.config.color.tabNotSelected
  }
  if (control !== undefined) {
    control.SetCenterColor(color.r, color.g, color.b, color.a)
  }
}
portToFriend.TabOnMouseExit = tabOnMouseExit
