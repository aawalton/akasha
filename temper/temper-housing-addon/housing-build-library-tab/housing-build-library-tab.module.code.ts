import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-ui-3"
import {
  asBackdropEdgeView,
  asControl,
  asControlHandler,
  asCtControl,
  asScrollableDropdown,
  asScrollView,
  asSliderView,
  asTreeNode,
  controlsTree,
} from "../housing-build-casts/housing-build-casts.module.code.ts"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"

export function buildLibraryTab(this: void): undefined {
  const c = controlsTree(portToFriend.controls)
  const config = portToFriend.config
  const constants = portToFriend.constants
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

  const information = WINDOW_MANAGER.CreateControl(undefined, libraryControl, CT_LABEL)
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

  const filterLabel = WINDOW_MANAGER.CreateControl(undefined, libraryControl, CT_LABEL)
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

  portToFriend.libData.currentData = portToFriend.libData.GetLibraryData()
  portToFriend.CreateCategoryDropdownEntries(dropdown)
  asScrollableDropdown(dropdown).SetSelected(portToFriend.addonState.selectedLibraryFilter)

  const sortLabel = WINDOW_MANAGER.CreateControl(undefined, libraryControl, CT_LABEL)
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

  portToFriend.CreateLibrarySortDropdownEntries(sortDropdown)
  asScrollableDropdown(sortDropdown).SetSelected(portToFriend.addonState.selectedLibrarySort)

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
  scrollPanel.SetHandler("OnMouseWheel", asControlHandler(portToFriend.LibraryPanelOnMouseWheel))

  const slider = asSliderView(
    WINDOW_MANAGER.CreateControl(undefined, libraryControl, asCtControl(CT_SLIDER))
  )
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
  slider.SetHandler("OnValueChanged", asControlHandler(portToFriend.AdjustLibrarySlider))

  portToFriend.CreateLibraryEntries()
  portToFriend.addonState.categoryFilterInitialized = true
  portToFriend.addonState.LibrarySortInitialized = true
}
