import { asLsmCastThisVoidAUnknownUnknown } from "./casts-3a"
import { asLsmConstants } from "./casts-4"

import { lib } from "./lib-state"

const tos = tostring

const MAJOR = "LibScrollableMenu"

lib.name = MAJOR
lib.author = "Baertram, IsJustaGhost, tomstock, Kyoma"
lib.version = "2.44"

lib._objects = {}
lib.preventerVars = {}
lib.XML = {}
lib.contextMenuCallbacksRegistered = {}

const constants: LsmConstants = asLsmConstants({})
lib.constants = constants

const LSM_LOGTYPE_DEBUG = 1
const LSM_LOGTYPE_VERBOSE = 2
const LSM_LOGTYPE_DEBUG_CALLBACK = 3
const LSM_LOGTYPE_INFO = 10
const LSM_LOGTYPE_ERROR = 99

const loggerTypeToName: Record<number, string> = {
  [LSM_LOGTYPE_DEBUG]: " -DEBUG- ",
  [LSM_LOGTYPE_VERBOSE]: " -VERBOSE- ",
  [LSM_LOGTYPE_DEBUG_CALLBACK]: " -CALLBACK- ",
  [LSM_LOGTYPE_INFO]: " -INFO- ",
  [LSM_LOGTYPE_ERROR]: " -ERROR- ",
}

lib.Debug = {
  doDebug: false,
  doVerboseDebug: false,
  controlNameCache: {},
  prefix: "[" + MAJOR + "]",
  loggerTypeToName,
  LSM_LOGTYPE_DEBUG,
  LSM_LOGTYPE_VERBOSE,
  LSM_LOGTYPE_DEBUG_CALLBACK,
  LSM_LOGTYPE_INFO,
  LSM_LOGTYPE_ERROR,
}
const libDebug = lib.Debug

lib.SVConstans = {
  name: "LibScrollableMenu_SavedVars",
  version: 1,
  profile: "LSM",
  defaults: {
    textSearchHistory: {},
    collapsedHeaderState: {},
  },
}
lib.SV = {}

lib.classes = {}
lib.Util = {}
const libUtil = lib.Util

export function getValueOrCallback(this: void, arg: unknown, ...args: unknown[]): unknown {
  if (libDebug.doDebug === true) {
    const dlog = libDebug.DebugLog
    if (dlog !== undefined) {
      dlog(libDebug.LSM_LOGTYPE_VERBOSE, 6, tos(arg))
    }
  }
  if (type(arg) === "function") {
    return asLsmCastThisVoidAUnknownUnknown(arg)(...args)
  }
  return arg
}
libUtil.getValueOrCallback = getValueOrCallback

const NIL_CHECK_TABLE: Record<string, unknown> = {}
constants.NIL_CHECK_TABLE = NIL_CHECK_TABLE

constants.throttledCallDelay = 10

const UINarrationName = MAJOR + "_UINarration"
constants.handlerNames = {
  dropdownCallLaterHandle: MAJOR + "_Timeout",
  UINarrationName: UINarrationName + "_",
  UINarrationUpdaterName: UINarrationName + "Updater_",
  throttledCallDelayName: MAJOR + "_throttledCallDelay",
}

constants.comboBox = {}

const DEFAULT_VISIBLE_ROWS = 10
const DEFAULT_SORTS_ENTRIES = false
const DEFAULT_HEIGHT = 250
const MIN_WIDTH_WITHOUT_SEARCH_HEADER = 50
const MIN_WIDTH_WITH_SEARCH_HEADER = 125
const dropdownDefaults = {
  DEFAULT_VISIBLE_ROWS,
  DEFAULT_SORTS_ENTRIES,
  DEFAULT_HEIGHT,
  MIN_WIDTH_WITHOUT_SEARCH_HEADER,
  MIN_WIDTH_WITH_SEARCH_HEADER,
}
constants.dropdown = { defaults: dropdownDefaults }

constants.submenu = { SUBMENU_SHOW_TIMEOUT: 500 }

const DIVIDER_ENTRY_HEIGHT = 7
const HEADER_ENTRY_HEIGHT = 30
const DEFAULT_SPACING = 0
const WITHOUT_ICON_LABEL_DEFAULT_OFFSETX = 4

const fonts = {
  DEFAULT_FONT: "ZoFontGame",
  HeaderFontTitle: "ZoFontHeader3",
  HeaderFontSubtitle: "ZoFontHeader2",
  HeaderCollapsedTitle: "ZoFontGamepad18",
}
constants.fonts = fonts

const [headerR, headerG, headerB, headerA] = GetInterfaceColor(
  INTERFACE_COLOR_TYPE_TEXT_COLORS,
  INTERFACE_TEXT_COLOR_SELECTED
)
const [normalR, normalG, normalB, normalA] = GetInterfaceColor(
  INTERFACE_COLOR_TYPE_TEXT_COLORS,
  INTERFACE_TEXT_COLOR_NORMAL
)
const [hiR, hiG, hiB, hiA] = GetInterfaceColor(
  INTERFACE_COLOR_TYPE_TEXT_COLORS,
  INTERFACE_TEXT_COLOR_CONTEXT_HIGHLIGHT
)
const HEADER_TEXT_COLOR = ZO_ColorDef.New(headerR, headerG, headerB, headerA)
const DEFAULT_TEXT_COLOR = ZO_ColorDef.New(normalR, normalG, normalB, normalA)
const DEFAULT_TEXT_HIGHLIGHT = ZO_ColorDef.New(hiR, hiG, hiB, hiA)
const colors = {
  HEADER_TEXT_COLOR,
  DEFAULT_TEXT_COLOR,
  DEFAULT_TEXT_HIGHLIGHT,
  DEFAULT_TEXT_DISABLED_COLOR: ZO_GAMEPAD_UNSELECTED_COLOR,
  DEFAULT_ARROW_COLOR: ZO_ColorDef.New("FFFFFF"),
}
constants.colors = colors

constants.textures = { iconNewIcon: ZO_KEYBOARD_NEW_ICON }

constants.narration = {
  iconNarrationNewValue: GetString(SI_SCREEN_NARRATION_NEW_ICON_NARRATION),
}

export const LSM_ENTRY_TYPE_NORMAL = 1
export const LSM_ENTRY_TYPE_DIVIDER = 2
export const LSM_ENTRY_TYPE_HEADER = 3
export const LSM_ENTRY_TYPE_SUBMENU = 4
export const LSM_ENTRY_TYPE_CHECKBOX = 5
export const LSM_ENTRY_TYPE_BUTTON = 6
export const LSM_ENTRY_TYPE_RADIOBUTTON = 7
export const LSM_ENTRY_TYPE_EDITBOX = 8
export const LSM_ENTRY_TYPE_SLIDER = 9

export const LSM_UPDATE_MODE_MAINMENU = 1
export const LSM_UPDATE_MODE_SUBMENU = 2
export const LSM_UPDATE_MODE_BOTH = 99

export const DIVIDER = "-"
lib.DIVIDER = DIVIDER

const scrollListRowTypes: Record<string, number> = {
  LSM_ENTRY_TYPE_NORMAL,
  LSM_ENTRY_TYPE_DIVIDER,
  LSM_ENTRY_TYPE_HEADER,
  LSM_ENTRY_TYPE_SUBMENU,
  LSM_ENTRY_TYPE_CHECKBOX,
  LSM_ENTRY_TYPE_BUTTON,
  LSM_ENTRY_TYPE_RADIOBUTTON,
  LSM_ENTRY_TYPE_EDITBOX,
  LSM_ENTRY_TYPE_SLIDER,
}

export { scrollListRowTypes }

lib.scrollListRowTypes = scrollListRowTypes

const entryTypes: Record<string, unknown> = {}
const entryTypeDefaults: Record<string, unknown> = {
  DIVIDER_ENTRY_HEIGHT,
  HEADER_ENTRY_HEIGHT,
  DEFAULT_SPACING,
  WITHOUT_ICON_LABEL_DEFAULT_OFFSETX,
}
const highlights: Record<string, unknown> = {
  defaultHighlightTemplate: undefined,
  defaultHighlightColor: undefined,
  defaultHighLightAnimationFieldName: "LSM_HighlightAnimation",
  subAndContextMenuHighlightAnimationBreadcrumbsPattern: "%s_%s",
}
entryTypeDefaults.highlights = highlights
entryTypes.defaults = entryTypeDefaults
constants.entryTypes = entryTypes

for (const [key, value] of pairs(scrollListRowTypes)) {
  lib[key] = value
  entryTypes[key] = value
}

const onEntryMouseUpExclude: Record<number, boolean> = {
  [LSM_ENTRY_TYPE_EDITBOX]: true,
  [LSM_ENTRY_TYPE_SLIDER]: true,
}
entryTypes.onEntryMouseUpExclude = onEntryMouseUpExclude

const entryTypeToButtonChildName: Record<number, string> = {
  [LSM_ENTRY_TYPE_CHECKBOX]: "Checkbox",
  [LSM_ENTRY_TYPE_RADIOBUTTON]: "RadioButton",
}
entryTypes.entryTypeToButtonChildName = entryTypeToButtonChildName

const isEntryTypeWithParentMocCtrl: Record<number, boolean> = {
  [LSM_ENTRY_TYPE_CHECKBOX]: true,
  [LSM_ENTRY_TYPE_RADIOBUTTON]: true,
  [LSM_ENTRY_TYPE_EDITBOX]: true,
  [LSM_ENTRY_TYPE_SLIDER]: true,
}
entryTypes.isEntryTypeWithParentMocCtrl = isEntryTypeWithParentMocCtrl

const libraryAllowedEntryTypes: Record<number, boolean> = {
  [LSM_ENTRY_TYPE_NORMAL]: true,
  [LSM_ENTRY_TYPE_DIVIDER]: true,
  [LSM_ENTRY_TYPE_HEADER]: true,
  [LSM_ENTRY_TYPE_SUBMENU]: true,
  [LSM_ENTRY_TYPE_CHECKBOX]: true,
  [LSM_ENTRY_TYPE_BUTTON]: true,
  [LSM_ENTRY_TYPE_RADIOBUTTON]: true,
  [LSM_ENTRY_TYPE_EDITBOX]: true,
  [LSM_ENTRY_TYPE_SLIDER]: true,
}
entryTypes.libraryAllowedEntryTypes = libraryAllowedEntryTypes
lib.AllowedEntryTypes = libraryAllowedEntryTypes

const allowedEntryTypesForContextMenu: Record<number, boolean> = {
  [LSM_ENTRY_TYPE_NORMAL]: true,
  [LSM_ENTRY_TYPE_DIVIDER]: true,
  [LSM_ENTRY_TYPE_HEADER]: true,
  [LSM_ENTRY_TYPE_SUBMENU]: true,
  [LSM_ENTRY_TYPE_CHECKBOX]: true,
  [LSM_ENTRY_TYPE_BUTTON]: true,
  [LSM_ENTRY_TYPE_RADIOBUTTON]: true,
  [LSM_ENTRY_TYPE_EDITBOX]: true,
  [LSM_ENTRY_TYPE_SLIDER]: true,
}
entryTypes.allowedEntryTypesForContextMenu = allowedEntryTypesForContextMenu
lib.AllowedEntryTypesForContextMenu = allowedEntryTypesForContextMenu

const entryTypesForContextMenuWithoutMandatoryCallback: Record<number, boolean> = {
  [LSM_ENTRY_TYPE_DIVIDER]: true,
  [LSM_ENTRY_TYPE_HEADER]: true,
  [LSM_ENTRY_TYPE_SUBMENU]: true,
}
entryTypes.entryTypesForContextMenuWithoutMandatoryCallback =
  entryTypesForContextMenuWithoutMandatoryCallback

const additionalDataKeyToLSMEntryType: Record<string, number> = {
  isDivider: LSM_ENTRY_TYPE_DIVIDER,
  isHeader: LSM_ENTRY_TYPE_HEADER,
  isCheckbox: LSM_ENTRY_TYPE_CHECKBOX,
  isButton: LSM_ENTRY_TYPE_BUTTON,
  isRadioButton: LSM_ENTRY_TYPE_RADIOBUTTON,
  isEditBox: LSM_ENTRY_TYPE_EDITBOX,
  isSlider: LSM_ENTRY_TYPE_SLIDER,
}
entryTypes.additionalDataKeyToLSMEntryType = additionalDataKeyToLSMEntryType

const updateEntryPathsData = {
  updateEntryPath: "updateEntryPath",
  updateEntryPathCheckFunc: "updateEntryPathCheckFunc",
  updateIconPath: "updateIconPath",
}
entryTypes.updateEntryPathsData = updateEntryPathsData

const dataAllowedAutomaticUpdateRaise: Record<number, string> = {
  [1]: updateEntryPathsData.updateEntryPath,
  [2]: updateEntryPathsData.updateIconPath,
}
entryTypes.dataAllowedAutomaticUpdateRaise = dataAllowedAutomaticUpdateRaise

export const LSM_ROW_HIGHLIGHT_DEFAULT = "ZO_SelectionHighlight"
export const LSM_ROW_HIGHLIGHT_GREEN = "LibScrollableMenu_Highlight_Green"
export const LSM_ROW_HIGHLIGHT_BLUE = "LibScrollableMenu_Highlight_Blue"
export const LSM_ROW_HIGHLIGHT_RED = "LibScrollableMenu_Highlight_Red"
export const LSM_ROW_HIGHLIGHT_OPAQUE = "LibScrollableMenu_Highlight_Opaque"

const scrollListRowHighlights: Record<string, string> = {
  LSM_ROW_HIGHLIGHT_DEFAULT,
  LSM_ROW_HIGHLIGHT_GREEN,
  LSM_ROW_HIGHLIGHT_BLUE,
  LSM_ROW_HIGHLIGHT_RED,
  LSM_ROW_HIGHLIGHT_OPAQUE,
}

export { scrollListRowHighlights }

lib.scrollListRowHighlights = scrollListRowHighlights

for (const [key, value] of pairs(scrollListRowHighlights)) {
  lib[key] = value
  highlights[key] = value
}

const defaultHighlightTemplateData = {
  template: LSM_ROW_HIGHLIGHT_DEFAULT,
  color: colors.DEFAULT_TEXT_HIGHLIGHT,
}
highlights.defaultHighlightTemplateData = defaultHighlightTemplateData

const defaultHighlightTemplateDataEntryHavingSubMenuWithCallback = {
  template: LSM_ROW_HIGHLIGHT_GREEN,
  color: colors.DEFAULT_TEXT_HIGHLIGHT,
}
highlights.defaultHighlightTemplateDataEntryHavingSubMenuWithCallback =
  defaultHighlightTemplateDataEntryHavingSubMenuWithCallback

const defaultHighlightTemplateDataEntryContextMenuOpeningControl = {
  template: LSM_ROW_HIGHLIGHT_GREEN,
  color: colors.DEFAULT_TEXT_HIGHLIGHT,
}
highlights.defaultHighlightTemplateDataEntryContextMenuOpeningControl =
  defaultHighlightTemplateDataEntryContextMenuOpeningControl

export { colors, constants, DEFAULT_SPACING, dropdownDefaults, entryTypes, fonts, highlights }
