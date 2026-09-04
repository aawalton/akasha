import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-objects-01"
import "@akasha/temper-eso-types/eso-ui-2"
import {
  asBackdropEdgeView,
  asControl,
  asControlHandler,
  asNumber,
  asTreeNode,
  controlsTree,
} from "../housing-build-casts/housing-build-casts.module.code.ts"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"

function nilWidth(this: void): number {
  return asNumber(undefined)
}

export function buildWindow(this: void): undefined {
  const c = controlsTree(portToFriend.controls)
  const config = portToFriend.config
  const constants = portToFriend.constants
  const ctrlNames = constants.controls

  const tlw = WINDOW_MANAGER.CreateTopLevelWindow(ctrlNames.TLW_NAME)
  c.TLW = tlw
  tlw.SetDimensions(config.size.width, config.size.headerHeight)
  if (portToFriend.savedVars === undefined || portToFriend.savedVars.position === undefined) {
    tlw.SetAnchor(CENTER, GuiRoot, CENTER, 0, -config.size.height / 2)
  } else {
    tlw.SetAnchor(
      TOPLEFT,
      GuiRoot,
      TOPLEFT,
      portToFriend.savedVars.position.x,
      portToFriend.savedVars.position.y
    )
  }
  tlw.SetMovable(config.isMovable)
  tlw.SetMouseEnabled(config.isMouseEnabled)
  tlw.SetClampedToScreen(config.isClampedToScreen)
  tlw.SetDrawLayer(3)
  tlw.SetDrawLevel(0)
  tlw.SetHandler("OnMoveStop", asControlHandler(portToFriend.SaveWindowLocation))
  tlw.SetHidden(true)

  const header = asTreeNode({})
  c.header = header
  const headerLabel = WINDOW_MANAGER.CreateControl(ctrlNames.HEADER_NAME, tlw, CT_LABEL)
  header.label = headerLabel
  headerLabel.SetAnchor(TOP, tlw, TOP, 0, 3)
  headerLabel.SetFont(config.fonts.header)
  headerLabel.SetWrapMode(ELLIPSIS)
  headerLabel.SetColor(config.color.default.R, config.color.default.G, config.color.default.B)
  headerLabel.SetText(constants.HEADER_TITLE ?? "")

  const headerControl = WINDOW_MANAGER.CreateControl(ctrlNames.HEADER_CONTROL, tlw, CT_CONTROL)
  header.control = headerControl
  headerControl.SetDimensions(
    config.size.width,
    config.size.headerHeight + config.size.headerHeightOffset
  )
  headerControl.SetAnchor(TOPLEFT, tlw, TOPLEFT, 0, 0)
  headerControl.SetDrawLayer(0)

  const headerBackdrop = CreateControlFromVirtual<BackdropControl>(
    ctrlNames.HEADER_BACKDROP,
    headerControl,
    "ZO_SliderBackdrop"
  )
  header.backdrop = headerBackdrop
  headerBackdrop.SetCenterColor(
    config.color.backdrop.R,
    config.color.backdrop.G,
    config.color.backdrop.B,
    config.color.backdrop.A
  )
  headerBackdrop.SetEdgeColor(
    config.color.backdropEdge.R,
    config.color.backdropEdge.G,
    config.color.backdropEdge.B,
    config.color.backdropEdge.A
  )

  const headerButton = WINDOW_MANAGER.CreateControl(ctrlNames.HEADER_BUTTON, tlw, CT_BUTTON)
  header.button = headerButton
  headerButton.SetAnchor(TOPRIGHT, headerControl, TOPRIGHT, -3, 7)
  headerButton.SetDimensions(20, 20)
  headerButton.SetNormalTexture("/esoui/art/buttons/decline_up.dds")
  headerButton.SetMouseOverTexture("/esoui/art/buttons/decline_over.dds")
  headerButton.SetHandler("OnClicked", asControlHandler(portToFriend.CloseWindow))

  const body = asTreeNode({})
  c.body = body
  const bodyControl = WINDOW_MANAGER.CreateControl(ctrlNames.BODY_CONTROL, tlw, CT_CONTROL)
  body.control = bodyControl
  bodyControl.SetDimensions(
    config.size.width,
    config.size.height -
      config.size.headerHeightOffset -
      config.size.headerHeight -
      config.size.gap +
      config.tabHeight
  )
  bodyControl.SetAnchor(
    TOPLEFT,
    tlw,
    TOPLEFT,
    0,
    config.size.headerHeightOffset + config.size.headerHeight + config.size.gap
  )
  bodyControl.SetDrawLayer(0)

  const bodyBackdrop = CreateControlFromVirtual<BackdropControl>(
    ctrlNames.BODY_BACKDROP,
    bodyControl,
    "ZO_SliderBackdrop"
  )
  body.backdrop = bodyBackdrop
  bodyBackdrop.SetCenterColor(
    config.color.backdrop.R,
    config.color.backdrop.G,
    config.color.backdrop.B,
    config.color.backdrop.A
  )
  bodyBackdrop.SetEdgeColor(
    config.color.backdropEdge.R,
    config.color.backdropEdge.G,
    config.color.backdropEdge.B,
    config.color.backdropEdge.A
  )

  const tabControl = asTreeNode(WINDOW_MANAGER.CreateControl(undefined, bodyControl, CT_CONTROL))
  body.tabControl = tabControl
  const tabControlAsControl = asControl(tabControl)
  tabControlAsControl.SetDimensions(nilWidth(), config.tabHeight - config.tabOffset)
  tabControlAsControl.SetAnchor(TOPLEFT, bodyControl, TOPLEFT, 0, config.tabOffset)

  tabControl.houseTab = portToFriend.CreateTabControl(
    tabControlAsControl,
    config.tabOffset,
    constants.TAB_HOUSE,
    constants.TAB_HOUSE_TITLE ?? ""
  )
  tabControl.vcTab = portToFriend.CreateTabControl(
    tabControlAsControl,
    config.tabOffset + config.tabWidth,
    constants.TAB_VC,
    constants.TAB_VC_TITLE ?? ""
  )
  tabControl.myHousesTab = portToFriend.CreateTabControl(
    tabControlAsControl,
    config.tabOffset + config.tabWidth * 2,
    constants.TAB_MYHOUSES,
    constants.TAB_MYHOUSES_TITLE ?? ""
  )
  tabControl.libraryTab = portToFriend.CreateTabControl(
    tabControlAsControl,
    config.tabOffset + config.tabWidth * 3,
    constants.TAB_LIBRARY,
    constants.TAB_LIBRARY_TITLE ?? ""
  )

  const bodyEdge = WINDOW_MANAGER.CreateControl(undefined, bodyControl, CT_BACKDROP)
  body.edge = bodyEdge
  bodyEdge.SetAnchor(TOPLEFT, bodyControl, TOPLEFT, 0, config.tabHeight + config.tabOffset)
  bodyEdge.SetDimensions(
    config.size.width,
    config.size.height -
      config.size.headerHeightOffset -
      config.size.headerHeight -
      config.size.gap -
      config.tabOffset -
      4
  )
  asBackdropEdgeView(bodyEdge).SetEdgeTexture(undefined, 1, 1, 2, 0)
  bodyEdge.SetCenterColor(0, 0, 0, 0)
  bodyEdge.SetEdgeColor(
    config.color.edgeColor.r,
    config.color.edgeColor.g,
    config.color.edgeColor.b,
    config.color.edgeColor.a
  )
}
