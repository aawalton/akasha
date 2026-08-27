import { PortToFriend } from "../state"
import {
  asControl,
  asControlHandler,
  asScrollableDropdown,
  asScrollView,
  asSliderView,
  asTreeNode,
  controlsTree,
} from "./build-internal"

export function buildMyHousesTab(this: void): undefined {
  const c = controlsTree(PortToFriend.controls)
  const config = PortToFriend.config
  const constants = PortToFriend.constants
  const body = asTreeNode(c.body)
  const bodyControl = asControl(body.control)

  const myHouses = asTreeNode({})
  c.myHouses = myHouses

  const myHousesControl = WINDOW_MANAGER.CreateControl(undefined, bodyControl, CT_CONTROL)
  myHouses.control = myHousesControl
  myHousesControl.SetDimensions(
    config.size.width,
    config.size.height - config.size.headerHeightOffset - config.size.headerHeight - config.size.gap
  )
  myHousesControl.SetAnchor(TOPLEFT, bodyControl, TOPLEFT, 0, config.tabHeight)
  myHousesControl.SetDrawLayer(0)

  const filterLabel = CreateControl(undefined, myHousesControl, CT_LABEL)
  myHouses.filterLabel = filterLabel
  filterLabel.SetAnchor(TOPLEFT, myHousesControl, TOPLEFT, 8, 15)
  filterLabel.SetFont(config.fonts.header)
  filterLabel.SetWrapMode(ELLIPSIS)
  filterLabel.SetColor(config.color.default.R, config.color.default.G, config.color.default.B)
  filterLabel.SetText(constants.SORT_LABEL ?? "")
  filterLabel.SetDimensions(105, 25)

  const combobox = WINDOW_MANAGER.CreateControlFromVirtual(
    constants.controls.COMBOBOX_MYHOUSES,
    myHousesControl,
    "ZO_ScrollableComboBox"
  )
  myHouses.combobox = combobox
  combobox.SetAnchor(TOPLEFT, myHousesControl, TOPLEFT, 120, 15)
  combobox.SetDimensions(145, 25)
  const dropdown = ZO_ComboBox_ObjectFromContainer(combobox)
  myHouses.dropdown = dropdown

  PortToFriend.CreateSortDropdownEntries(dropdown)
  asScrollableDropdown(dropdown).SetSelected(PortToFriend.addonState.selectedMyHousesSort)

  const scrollControl = asScrollView(
    WINDOW_MANAGER.CreateControl(undefined, myHousesControl, CT_SCROLL)
  )
  myHouses.scrollControl = scrollControl
  scrollControl.SetDimensions(
    config.size.width - 10,
    config.size.height -
      config.size.headerHeightOffset -
      config.size.headerHeight -
      config.size.gap -
      40 -
      5
  )
  scrollControl.SetAnchor(TOPLEFT, myHousesControl, TOPLEFT, 5, 40)
  scrollControl.SetScrollBounding(SCROLL_BOUNDING_CONTAINED)

  const scrollPanel = WINDOW_MANAGER.CreateControl(undefined, scrollControl, CT_CONTROL)
  myHouses.scrollPanel = scrollPanel
  scrollPanel.SetDimensions(config.size.width - 10, 0)
  scrollPanel.SetAnchor(TOPLEFT, scrollControl, TOPLEFT, 0, 40)
  scrollPanel.SetMouseEnabled(true)
  scrollPanel.SetHandler("OnMouseWheel", asControlHandler(PortToFriend.MyHousesPanelOnMouseWheel))

  const slider = asSliderView(CreateControl(undefined, myHousesControl, CT_SLIDER))
  myHouses.slider = slider
  slider.SetDimensions(
    25,
    config.size.height -
      config.size.headerHeightOffset -
      config.size.headerHeight -
      config.size.gap -
      40
  )
  slider.SetAnchor(TOPRIGHT, myHousesControl, TOPRIGHT, 0, 40)
  slider.SetOrientation(ORIENTATION_VERTICAL)
  slider.SetMouseEnabled(true)
  slider.SetMinMax(0, 100)
  slider.SetThumbTexture(
    "esoui/art/buttons/smoothsliderbutton_up.dds",
    undefined,
    undefined,
    25,
    50
  )
  slider.SetValueStep(1)
  slider.SetHandler("OnValueChanged", asControlHandler(PortToFriend.MyHousesAdjustSlider))
  slider.SetValue(1)

  PortToFriend.UpdateMyHouses()
  PortToFriend.addonState.sortInitialized = true
}
