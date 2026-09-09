import { ROOT_CONTROL_NAME } from "../selector-constants/selector-constants.module.code.ts"
import { saveCurrentAsPack } from "../selector-packs/selector-packs.module.code.ts"
import { STRINGS } from "../selector-strings/selector-strings.module.code.ts"

export interface SelectorControls {
  root: Control
  searchBox: EditControl
  packNameEditBox: EditControl
  saveButton: ButtonControl
  deleteButton: ButtonControl
  comboBox: Control
  selectedPackLabel: LabelControl
  settingsButton: ButtonControl
}

const ROOT_WIDTH = 400
const ROOT_HEIGHT = 80
const ROOT_OFFSET_X = 10

const SEARCH_WIDTH = 200
const SEARCH_HEIGHT = 20
const SEARCH_OFFSET_X = -5
const SEARCH_OFFSET_Y = 75

const LABEL_WIDTH = 100
const ROW_HEIGHT = 24
const EDITBOX_WIDTH = 200
const EDITBOX_HEIGHT = 20
const FIELD_GAP = 20

const BUTTON_WIDTH = 100
const BUTTON_HEIGHT = 30

const DDL_WIDTH = 202
const DDL_HEIGHT = 30

const SELECTED_LABEL_WIDTH = 500
const SELECTED_LABEL_OFFSET_Y = 5

const GEAR_SIZE = 45
const GEAR_OFFSET_X = 100
const GEAR_OFFSET_Y = 65

const LABEL_FONT = "ZoFontWinH5"
const EDIT_FONT = "ZoFontGame"

let controls: SelectorControls | undefined

export function getControls(): SelectorControls | undefined {
  return controls
}

export function createSelectorControls(): undefined {
  if (controls !== undefined) {
    return
  }

  const divider = WINDOW_MANAGER.GetControlByName("ZO_AddOnsDivider")
  const addOnsScreen = WINDOW_MANAGER.GetControlByName("ZO_AddOns")
  if (divider === undefined || addOnsScreen === undefined) {
    return
  }

  const root = WINDOW_MANAGER.CreateControl(ROOT_CONTROL_NAME, addOnsScreen, CT_CONTROL)
  root.SetDimensions(ROOT_WIDTH, ROOT_HEIGHT)
  root.SetAnchor(TOPLEFT, divider, BOTTOMLEFT, ROOT_OFFSET_X, 0)

  WINDOW_MANAGER.GetControlByName("ZO_AddOnsAdvancedUIErrors")?.SetHidden(true)

  const searchBox = WINDOW_MANAGER.CreateControl(`${ROOT_CONTROL_NAME}SearchBox`, root, CT_EDITBOX)
  searchBox.SetDimensions(SEARCH_WIDTH, SEARCH_HEIGHT)
  searchBox.SetAnchor(TOPRIGHT, addOnsScreen, TOPRIGHT, SEARCH_OFFSET_X, SEARCH_OFFSET_Y)
  searchBox.SetFont(EDIT_FONT)
  searchBox.SetMaxInputChars(64)

  const searchLabel = WINDOW_MANAGER.CreateControl(
    `${ROOT_CONTROL_NAME}SearchLabel`,
    searchBox,
    CT_LABEL
  )
  searchLabel.SetFont(LABEL_FONT)
  searchLabel.SetText(STRINGS.addonSearch)
  searchLabel.SetHorizontalAlignment(TEXT_ALIGN_RIGHT)
  searchLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)
  searchLabel.SetAnchor(RIGHT, searchBox, LEFT, -10, 0)

  const nameLabel = WINDOW_MANAGER.CreateControl(`${ROOT_CONTROL_NAME}NameLabel`, root, CT_LABEL)
  nameLabel.SetDimensions(LABEL_WIDTH, ROW_HEIGHT)
  nameLabel.SetFont(LABEL_FONT)
  nameLabel.SetText(STRINGS.packName)
  nameLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)
  nameLabel.SetAnchor(TOPLEFT, root, TOPLEFT, 0, 0)

  const packNameEditBox = WINDOW_MANAGER.CreateControl(
    `${ROOT_CONTROL_NAME}EditBox`,
    root,
    CT_EDITBOX
  )
  packNameEditBox.SetDimensions(EDITBOX_WIDTH, EDITBOX_HEIGHT)
  packNameEditBox.SetFont(EDIT_FONT)
  packNameEditBox.SetMaxInputChars(64)
  packNameEditBox.SetAnchor(TOPLEFT, nameLabel, TOPRIGHT, FIELD_GAP, 0)

  const saveButton = WINDOW_MANAGER.CreateControlFromVirtual<ButtonControl>(
    `${ROOT_CONTROL_NAME}Save`,
    root,
    "ZO_DefaultButton"
  )
  saveButton.SetDimensions(BUTTON_WIDTH, BUTTON_HEIGHT)
  saveButton.SetText(STRINGS.saveButton)
  saveButton.SetAnchor(TOPLEFT, packNameEditBox, TOPRIGHT, FIELD_GAP, 0)
  saveButton.SetHandler("OnClicked", function (this: void): undefined {
    onSaveClicked()
  })

  const selectLabel = WINDOW_MANAGER.CreateControl(
    `${ROOT_CONTROL_NAME}SelectLabel`,
    root,
    CT_LABEL
  )
  selectLabel.SetDimensions(LABEL_WIDTH, ROW_HEIGHT)
  selectLabel.SetFont(LABEL_FONT)
  selectLabel.SetText(STRINGS.selectPack)
  selectLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)
  selectLabel.SetAnchor(TOPLEFT, nameLabel, BOTTOMLEFT, 0, 0)

  const selectedPackLabel = WINDOW_MANAGER.CreateControl(
    `${ROOT_CONTROL_NAME}SelectedPackNameLabel`,
    root,
    CT_LABEL
  )
  selectedPackLabel.SetDimensions(SELECTED_LABEL_WIDTH, ROW_HEIGHT)
  selectedPackLabel.SetFont(LABEL_FONT)
  selectedPackLabel.SetText("")
  selectedPackLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)
  selectedPackLabel.SetAnchor(TOPLEFT, selectLabel, BOTTOMLEFT, 0, SELECTED_LABEL_OFFSET_Y)

  const comboBox = WINDOW_MANAGER.CreateControlFromVirtual(
    `${ROOT_CONTROL_NAME}ddl`,
    root,
    "ZO_ComboBox"
  )
  comboBox.SetDimensions(DDL_WIDTH, DDL_HEIGHT)
  comboBox.SetMouseEnabled(true)
  comboBox.SetAnchor(TOPLEFT, selectLabel, TOPRIGHT, FIELD_GAP, 0)

  const deleteButton = WINDOW_MANAGER.CreateControlFromVirtual<ButtonControl>(
    `${ROOT_CONTROL_NAME}Delete`,
    root,
    "ZO_DefaultButton"
  )
  deleteButton.SetDimensions(BUTTON_WIDTH, BUTTON_HEIGHT)
  deleteButton.SetText(STRINGS.deleteButton)
  deleteButton.SetAnchor(TOPLEFT, comboBox, TOPRIGHT, 18, 0)
  deleteButton.SetHandler("OnClicked", function (this: void): undefined {
    onDeleteClicked()
  })

  const settingsButton = WINDOW_MANAGER.CreateControlFromVirtual<ButtonControl>(
    `${ROOT_CONTROL_NAME}SettingsOpenDropdown`,
    root,
    "ZO_DropdownButton"
  )
  settingsButton.SetDimensions(GEAR_SIZE, GEAR_SIZE)
  settingsButton.SetNormalTexture("esoui/art/chatwindow/chat_options_up.dds")
  settingsButton.SetPressedTexture("esoui/art/chatwindow/chat_options_down.dds")
  settingsButton.SetMouseOverTexture("esoui/art/chatwindow/chat_options_over.dds")
  settingsButton.SetAnchor(TOPLEFT, addOnsScreen, TOP, GEAR_OFFSET_X, GEAR_OFFSET_Y)
  settingsButton.SetHandler("OnClicked", function (this: void): undefined {
    onSettingsClicked(settingsButton)
  })

  controls = {
    root,
    searchBox,
    packNameEditBox,
    saveButton,
    deleteButton,
    comboBox,
    selectedPackLabel,
    settingsButton,
  }
}

function onSaveClicked(): undefined {
  if (controls === undefined) {
    return
  }
  const packName = controls.packNameEditBox.GetText()
  if (packName === "") {
    return
  }
  saveCurrentAsPack(packName)
}

function onDeleteClicked(): undefined {
  deleteSelectedPackViaDropdown()
}

let deleteSelectedPack: (() => void) | undefined

export function setDeleteHandler(handler: () => void): undefined {
  deleteSelectedPack = handler
}

function deleteSelectedPackViaDropdown(): undefined {
  if (deleteSelectedPack !== undefined) {
    deleteSelectedPack()
  }
}

let openSettingsMenu: ((owner: object) => void) | undefined

export function setSettingsHandler(handler: (owner: object) => void): undefined {
  openSettingsMenu = handler
}

function onSettingsClicked(owner: object): undefined {
  if (openSettingsMenu !== undefined) {
    openSettingsMenu(owner)
  }
}
