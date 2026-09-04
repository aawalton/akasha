import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-objects-01"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
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

export function buildHouseTab(this: void): undefined {
  const c = controlsTree(portToFriend.controls)
  const config = portToFriend.config
  const constants = portToFriend.constants
  const ctrlNames = constants.controls
  const body = asTreeNode(c.body)
  const bodyControl = asControl(body.control)

  const house = asTreeNode({})
  c.house = house

  const houseControl = WINDOW_MANAGER.CreateControl(undefined, bodyControl, CT_CONTROL)
  house.control = houseControl
  houseControl.SetDimensions(
    config.size.width,
    config.size.height - config.size.headerHeightOffset - config.size.headerHeight - config.size.gap
  )
  houseControl.SetAnchor(TOPLEFT, bodyControl, TOPLEFT, 0, config.tabHeight)
  houseControl.SetDrawLayer(0)

  const labelPlayer = WINDOW_MANAGER.CreateControl(ctrlNames.BODY_EDITBOX, houseControl, CT_LABEL)
  house.labelPlayer = labelPlayer
  labelPlayer.SetDimensions(80, 25)
  labelPlayer.SetAnchor(TOPLEFT, houseControl, TOPLEFT, 5, 15)
  labelPlayer.SetText(constants.LABEL_PLAYER ?? "")
  labelPlayer.SetFont(config.fonts.header)
  labelPlayer.SetColor(config.color.default.R, config.color.default.G, config.color.default.B)

  const [editboxbg, editbox] = portToFriend.CreateEditbox(houseControl)
  house.editboxbg = editboxbg
  house.editbox = editbox
  editboxbg.SetAnchor(TOPLEFT, houseControl, TOPLEFT, 85, 15)
  editboxbg.SetDimensions(config.search.width, 25)

  const editboxControl = asEditControl(editbox)
  editboxControl.SetText("")
  editboxControl.SetMaxInputChars(128)
  editboxControl.SetHandler("OnTextChanged", asControlHandler(portToFriend.SearchTextChanged))
  editboxControl.SetAnchor(TOPLEFT, houseControl, TOPLEFT, 85, 15)
  editboxControl.SetDimensions(config.search.width, 25)

  const combobox = WINDOW_MANAGER.CreateControlFromVirtual(
    ctrlNames.BODY_DROPDOWN,
    houseControl,
    "ZO_ScrollableComboBox"
  )
  house.combobox = combobox
  combobox.SetAnchor(TOPLEFT, houseControl, TOPLEFT, 345, 15)
  combobox.SetDimensions(325, 25)
  const dropdown = ZO_ComboBox_ObjectFromContainer(combobox)
  house.dropdown = dropdown
  portToFriend.CreateDropdownEntries(dropdown)

  const buttonPort = WINDOW_MANAGER.CreateControlFromVirtual<ButtonControl>(
    nilName(),
    houseControl,
    "ZO_DefaultButton"
  )
  house.buttonPort = buttonPort
  buttonPort.SetAnchor(TOPLEFT, houseControl, TOPLEFT, 670, 15)
  buttonPort.SetDimensions(125, 25)
  buttonPort.SetText(constants.BUTTON_PORT ?? "")
  buttonPort.SetClickSound("Click")
  buttonPort.SetHandler("OnClicked", asControlHandler(portToFriend.PortToFriend))

  const buttonAddFavorite = WINDOW_MANAGER.CreateControlFromVirtual<ButtonControl>(
    nilName(),
    houseControl,
    "ZO_DefaultButton"
  )
  house.buttonAddFavorite = buttonAddFavorite
  buttonAddFavorite.SetAnchor(TOPLEFT, houseControl, TOPLEFT, 670, 50)
  buttonAddFavorite.SetDimensions(125, 25)
  buttonAddFavorite.SetText(constants.BUTTON_ADD_FAVORITE ?? "")
  buttonAddFavorite.SetClickSound("Click")
  buttonAddFavorite.SetHandler("OnClicked", asControlHandler(portToFriend.AddToFavorite))

  const buttonPortMain = WINDOW_MANAGER.CreateControlFromVirtual<ButtonControl>(
    nilName(),
    houseControl,
    "ZO_DefaultButton"
  )
  house.buttonPortMain = buttonPortMain
  buttonPortMain.SetAnchor(TOPLEFT, houseControl, TOPLEFT, 280, 50)
  buttonPortMain.SetDimensions(175, 25)
  buttonPortMain.SetText(constants.BUTTON_MAIN_RESIDENCE ?? "")
  buttonPortMain.SetClickSound("Click")
  buttonPortMain.SetHandler("OnClicked", asControlHandler(portToFriend.PortToMainResidence))

  const buttonSendVisitCard = WINDOW_MANAGER.CreateControlFromVirtual<ButtonControl>(
    nilName(),
    houseControl,
    "ZO_DefaultButton"
  )
  house.buttonSendVisitCard = buttonSendVisitCard
  buttonSendVisitCard.SetAnchor(TOPLEFT, houseControl, TOPLEFT, 475, 50)
  buttonSendVisitCard.SetDimensions(175, 25)
  buttonSendVisitCard.SetText(constants.BUTTON_SEND_VISITCARD ?? "")
  buttonSendVisitCard.SetClickSound("Click")
  buttonSendVisitCard.SetHandler("OnClicked", asControlHandler(portToFriend.SendVisitCard))

  const scrollControl = asScrollView(
    WINDOW_MANAGER.CreateControl(ctrlNames.SCROLL_CONTROL, houseControl, CT_SCROLL)
  )
  house.scrollControl = scrollControl
  scrollControl.SetDimensions(
    config.size.width - 10,
    config.size.height -
      config.size.headerHeightOffset -
      config.size.headerHeight -
      config.size.gap -
      80 -
      5
  )
  scrollControl.SetAnchor(TOPLEFT, houseControl, TOPLEFT, 5, 80)
  scrollControl.SetScrollBounding(SCROLL_BOUNDING_CONTAINED)

  const scrollPanel = WINDOW_MANAGER.CreateControl(undefined, scrollControl, CT_CONTROL)
  house.scrollPanel = scrollPanel
  scrollPanel.SetDimensions(config.size.width - 10, 40)
  scrollPanel.SetAnchor(TOPLEFT, scrollControl, TOPLEFT, 0, 0)
  scrollPanel.SetMouseEnabled(true)
  scrollPanel.SetHandler("OnMouseWheel", asControlHandler(portToFriend.FavoritePanelOnMouseWheel))

  const slider = asSliderView(
    WINDOW_MANAGER.CreateControl(undefined, houseControl, asCtControl(CT_SLIDER))
  )
  house.slider = slider
  slider.SetDimensions(
    25,
    config.size.height -
      config.size.headerHeightOffset -
      config.size.headerHeight -
      config.size.gap -
      80
  )
  slider.SetAnchor(TOPRIGHT, houseControl, TOPRIGHT, 0, 80)
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
  slider.SetHandler("OnValueChanged", asControlHandler(portToFriend.AdjustSlider))

  portToFriend.CreateFavorites()
  house.searchBox = portToFriend.CreateSearchBox(houseControl, 85, 38, config.search.width)
}

function asEditControl(value: Control): EditControl {
  return value as EditControl
}
