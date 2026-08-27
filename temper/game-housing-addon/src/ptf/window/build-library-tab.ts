import { PortToFriend } from "../state"
import {
  asBackdropEdgeView,
  asControl,
  asControlHandler,
  asScrollableDropdown,
  asScrollView,
  asSliderView,
  asTreeNode,
  controlsTree,
} from "./build-internal"

export function buildLibraryTab(this: void): undefined {
  const c = controlsTree(PortToFriend.controls)
  const config = PortToFriend.config
  const constants = PortToFriend.constants
  const body = asTreeNode(c.body)
  const bodyControl = asControl(body.control)

  const library = asTreeNode({})
  c.library = library

  const libraryControl = WINDOW_MANAGER.CreateControl(undefined, bodyControl, CT_CONTROL)
  library.control = libraryControl
  libraryControl.SetDimensions(
    config.size.width,
    config.size.height - config.size.headerHeightOffset - config.size.headerHeight - config.size.gap
  )
  libraryControl.SetAnchor(TOPLEFT, bodyControl, TOPLEFT, 0, config.tabHeight)
  libraryControl.SetDrawLayer(0)

  const information = CreateControl(undefined, libraryControl, CT_LABEL)
  library.information = information
  information.SetAnchor(TOPLEFT, libraryControl, TOPLEFT, 8, 8)
  information.SetFont(config.fonts.header)
  information.SetWrapMode(ELLIPSIS)
  information.SetColor(config.color.default.R, config.color.default.G, config.color.default.B)
  information.SetText(constants.LIBRARY_MESSAGE ?? "")
  information.SetDimensions(config.size.width - 8, 100)

  const edge = WINDOW_MANAGER.CreateControl(undefined, libraryControl, CT_BACKDROP)
  library.edge = edge
  edge.SetAnchor(TOPLEFT, libraryControl, TOPLEFT, 0, 75)
  edge.SetDimensions(
    config.size.width,
    config.size.height -
      config.size.headerHeightOffset -
      config.size.headerHeight -
      config.size.gap -
      config.tabOffset -
      75
  )
  asBackdropEdgeView(edge).SetEdgeTexture(undefined, 1, 1, 2, 0)
  edge.SetCenterColor(0, 0, 0, 0)
  edge.SetEdgeColor(
    config.color.edgeColor.r,
    config.color.edgeColor.g,
    config.color.edgeColor.b,
    config.color.edgeColor.a
  )

  const filterLabel = CreateControl(undefined, libraryControl, CT_LABEL)
  library.filterLabel = filterLabel
  filterLabel.SetAnchor(TOPLEFT, libraryControl, TOPLEFT, 8, 85)
  filterLabel.SetFont(config.fonts.header)
  filterLabel.SetWrapMode(ELLIPSIS)
  filterLabel.SetColor(config.color.default.R, config.color.default.G, config.color.default.B)
  filterLabel.SetText(constants.FILTER_LABEL ?? "")
  filterLabel.SetDimensions(170, 25)

  const combobox = WINDOW_MANAGER.CreateControlFromVirtual(
    constants.controls.COMBOBOX_LIBRARY,
    libraryControl,
    "ZO_ScrollableComboBox"
  )
  library.combobox = combobox
  combobox.SetAnchor(TOPLEFT, libraryControl, TOPLEFT, 178, 85)
  combobox.SetDimensions(200, 25)
  const dropdown = ZO_ComboBox_ObjectFromContainer(combobox)
  library.dropdown = dropdown

  PortToFriend.libData.currentData = PortToFriend.libData.GetLibraryData()
  PortToFriend.CreateCategoryDropdownEntries(dropdown)
  asScrollableDropdown(dropdown).SetSelected(PortToFriend.addonState.selectedLibraryFilter)

  const sortLabel = CreateControl(undefined, libraryControl, CT_LABEL)
  library.sortLabel = sortLabel
  sortLabel.SetAnchor(TOPLEFT, libraryControl, TOPLEFT, 400, 85)
  sortLabel.SetFont(config.fonts.header)
  sortLabel.SetWrapMode(ELLIPSIS)
  sortLabel.SetColor(config.color.default.R, config.color.default.G, config.color.default.B)
  sortLabel.SetText(constants.LIBRARY_SORT_LABEL ?? "")
  sortLabel.SetDimensions(170, 25)

  const sortCombobox = WINDOW_MANAGER.CreateControlFromVirtual(
    constants.controls.COMBOBOX_SORT_LIBRARY,
    libraryControl,
    "ZO_ScrollableComboBox"
  )
  library.sortCombobox = sortCombobox
  sortCombobox.SetAnchor(TOPLEFT, libraryControl, TOPLEFT, 578, 85)
  sortCombobox.SetDimensions(200, 25)
  const sortDropdown = ZO_ComboBox_ObjectFromContainer(sortCombobox)
  library.sortDropdown = sortDropdown

  PortToFriend.CreateLibrarySortDropdownEntries(sortDropdown)
  asScrollableDropdown(sortDropdown).SetSelected(PortToFriend.addonState.selectedLibrarySort)

  const scrollControl = asScrollView(
    WINDOW_MANAGER.CreateControl(undefined, libraryControl, CT_SCROLL)
  )
  library.scrollControl = scrollControl
  scrollControl.SetDimensions(
    config.size.width - 10,
    config.size.height -
      config.size.headerHeightOffset -
      config.size.headerHeight -
      config.size.gap -
      100 -
      5
  )
  scrollControl.SetAnchor(TOPLEFT, libraryControl, TOPLEFT, 5, 100)
  scrollControl.SetScrollBounding(SCROLL_BOUNDING_CONTAINED)

  const scrollPanel = WINDOW_MANAGER.CreateControl(undefined, scrollControl, CT_CONTROL)
  library.scrollPanel = scrollPanel
  scrollPanel.SetDimensions(config.size.width - 10, 40)
  scrollPanel.SetAnchor(TOPLEFT, scrollControl, TOPLEFT, 0, 0)
  scrollPanel.SetMouseEnabled(true)
  scrollPanel.SetHandler("OnMouseWheel", asControlHandler(PortToFriend.LibraryPanelOnMouseWheel))

  const slider = asSliderView(CreateControl(undefined, libraryControl, CT_SLIDER))
  library.slider = slider
  slider.SetDimensions(
    25,
    config.size.height -
      config.size.headerHeightOffset -
      config.size.headerHeight -
      config.size.gap -
      100
  )
  slider.SetAnchor(TOPRIGHT, libraryControl, TOPRIGHT, 0, 100)
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
  slider.SetHandler("OnValueChanged", asControlHandler(PortToFriend.AdjustLibrarySlider))

  PortToFriend.CreateLibraryEntries()
  PortToFriend.addonState.categoryFilterInitialized = true
  PortToFriend.addonState.LibrarySortInitialized = true
}
