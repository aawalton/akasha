import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-ui-2"
import {
  asControl,
  asControlHandler,
  asCtControl,
  asScrollView,
  asSliderView,
  asTreeNode,
  controlsTree,
  nilName,
} from "../housing-build-casts/housing-build-casts.module.code.ts"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"

export function buildVcTab(this: void): undefined {
  const c = controlsTree(portToFriend.controls)
  const config = portToFriend.config
  const constants = portToFriend.constants
  const body = asTreeNode(c.body)
  const bodyControl = asControl(body.control)

  const vc = asTreeNode({})
  c.vc = vc

  const vcControl = WINDOW_MANAGER.CreateControl(undefined, bodyControl, CT_CONTROL)
  vc.control = vcControl
  vcControl.SetDimensions(
    config.size.width,
    config.size.height - config.size.headerHeightOffset - config.size.headerHeight - config.size.gap
  )
  vcControl.SetAnchor(TOPLEFT, bodyControl, TOPLEFT, 0, config.tabHeight)
  vcControl.SetDrawLayer(0)

  const nameLabel = WINDOW_MANAGER.CreateControl(undefined, vcControl, CT_LABEL)
  vc.nameLabel = nameLabel
  nameLabel.SetAnchor(TOPLEFT, vcControl, TOPLEFT, 8, 8)
  nameLabel.SetFont(config.fonts.header)
  nameLabel.SetWrapMode(ELLIPSIS)
  nameLabel.SetColor(config.color.default.R, config.color.default.G, config.color.default.B)
  nameLabel.SetText(constants.VC_PLAYER ?? "")
  nameLabel.SetDimensions(config.vc.size.width - 6, 25)

  const houseLabel = WINDOW_MANAGER.CreateControl(undefined, vcControl, CT_LABEL)
  vc.houseLabel = houseLabel
  houseLabel.SetAnchor(TOPLEFT, vcControl, TOPLEFT, 8, 34)
  houseLabel.SetFont(config.fonts.header)
  houseLabel.SetWrapMode(ELLIPSIS)
  houseLabel.SetColor(config.color.default.R, config.color.default.G, config.color.default.B)
  houseLabel.SetText(constants.VC_HOUSE ?? "")
  houseLabel.SetDimensions(config.vc.size.width - 6, 25)

  const addFavoriteButton = CreateControlFromVirtual<ButtonControl>(
    nilName(),
    vcControl,
    "ZO_DefaultButton"
  )
  vc.addFavoriteButton = addFavoriteButton
  addFavoriteButton.SetAnchor(TOPLEFT, vcControl, TOPLEFT, 0, 65)
  addFavoriteButton.SetDimensions(125, 25)
  addFavoriteButton.SetText(constants.BUTTON_ADD_FAVORITE ?? "")
  addFavoriteButton.SetClickSound("Click")
  addFavoriteButton.SetHandler("OnClicked", asControlHandler(portToFriend.VCAddFavorite))

  const vcButton = CreateControlFromVirtual<ButtonControl>(nilName(), vcControl, "ZO_DefaultButton")
  vc.vcButton = vcButton
  vcButton.SetAnchor(TOPLEFT, vcControl, TOPLEFT, 130, 65)
  vcButton.SetDimensions(175, 25)
  vcButton.SetText(constants.BUTTON_SEND_VISITCARD ?? "")
  vcButton.SetClickSound("Click")
  vcButton.SetHandler("OnClicked", asControlHandler(portToFriend.VCSendVC))

  const portButton = CreateControlFromVirtual<ButtonControl>(
    nilName(),
    vcControl,
    "ZO_DefaultButton"
  )
  vc.portButton = portButton
  portButton.SetAnchor(TOPLEFT, vcControl, TOPLEFT, 310, 65)
  portButton.SetDimensions(125, 25)
  portButton.SetText(constants.BUTTON_PORT ?? "")
  portButton.SetClickSound("Click")
  portButton.SetHandler("OnClicked", asControlHandler(portToFriend.VCPort))

  const removeButton = CreateControlFromVirtual<ButtonControl>(
    nilName(),
    vcControl,
    "ZO_DefaultButton"
  )
  vc.removeButton = removeButton
  removeButton.SetAnchor(TOPLEFT, vcControl, TOPLEFT, 430, 65)
  removeButton.SetDimensions(125, 25)
  removeButton.SetText(constants.BUTTON_REMOVE ?? "")
  removeButton.SetClickSound("Click")
  removeButton.SetHandler("OnClicked", asControlHandler(portToFriend.VCRemoveVC))

  addFavoriteButton.SetEnabled(false)
  vcButton.SetEnabled(false)
  portButton.SetEnabled(false)
  removeButton.SetEnabled(false)

  const scrollControl = asScrollView(
    WINDOW_MANAGER.CreateControl(constants.controls.VC_SCROLL_CONTROL, vcControl, CT_SCROLL)
  )
  vc.scrollControl = scrollControl
  scrollControl.SetDimensions(
    config.size.width - 10,
    config.size.height -
      config.size.headerHeightOffset -
      config.size.headerHeight -
      config.size.gap -
      95 -
      5
  )
  scrollControl.SetAnchor(TOPLEFT, vcControl, TOPLEFT, 5, 95)
  scrollControl.SetScrollBounding(SCROLL_BOUNDING_CONTAINED)

  const scrollPanel = WINDOW_MANAGER.CreateControl(undefined, scrollControl, CT_CONTROL)
  vc.scrollPanel = scrollPanel
  scrollPanel.SetDimensions(config.size.width - 10, 40)
  scrollPanel.SetAnchor(TOPLEFT, scrollControl, TOPLEFT, 0, 0)
  scrollPanel.SetMouseEnabled(true)
  scrollPanel.SetHandler("OnMouseWheel", asControlHandler(portToFriend.VCPanelOnMouseWheel))

  const slider = asSliderView(
    WINDOW_MANAGER.CreateControl(undefined, vcControl, asCtControl(CT_SLIDER))
  )
  vc.slider = slider
  slider.SetDimensions(
    25,
    config.size.height -
      config.size.headerHeightOffset -
      config.size.headerHeight -
      config.size.gap -
      90
  )
  slider.SetAnchor(TOPRIGHT, vcControl, TOPRIGHT, 0, 90)
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
  slider.SetHandler("OnValueChanged", asControlHandler(portToFriend.VCAdjustSlider))

  portToFriend.UpdateVisitCardList()
}
