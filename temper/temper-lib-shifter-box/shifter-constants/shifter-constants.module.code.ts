import { registerLibShifterBoxStrings } from "../shifter-strings/shifter-strings.module.code.ts"
import type {
  CustomSettingEntry,
  ListSettings,
  ShifterBoxSettings,
} from "../shifter-types/shifter-types.module.code.ts"

registerLibShifterBoxStrings()

export const LIB_IDENTIFIER = "LibShifterBox"

export const LIST_SPACING = 40
export const ARROW_SIZE = 36
export const HEADER_HEIGHT = 32
export const DATA_TYPE_DEFAULT = 1
export const DATA_DEFAULT_CATEGORY = "LSBDefCat"
export const SCROLLBAR_WIDTH = ZO_SCROLL_BAR_WIDTH
export const RESELECTING_DURING_REBUILD = true
export const ANIMATION_FIELD_NAME = "SelectionAnimation"
export const FONT_STYLE = "MEDIUM_FONT"
export const FONT_WEIGHT = "soft-shadow-thin"

export const CURSOR_TLC_NAME = `${LIB_IDENTIFIER}_Cursor_TLC`
export const EVENT_HANDLER_NAMESPACE = `${LIB_IDENTIFIER}_Event`
export const GLOBAL_MOUSE_DOWN = "_GLOBAL_MOUSE_DOWN"
export const GLOBAL_MOUSE_UP = "_GLOBAL_MOUSE_UP"

export const MULTIPLE_ROWS_DRAGGED_TEXT = GetString(LIBSHIFTERBOX_DRAG_MULTIPLE)

export const MOUSECURSOR_UIHAND = MOUSE_CURSOR_UI_HAND
export const MOUSECURSOR_DONOTCATRE = MOUSE_CURSOR_DO_NOT_CARE
export const MOUSECURSOR_NEXTLEFT = MOUSE_CURSOR_NEXT_LEFT
export const MOUSECURSOR_NEXTRIGHT = MOUSE_CURSOR_NEXT_RIGHT

export const SEARCH_TEXTURE =
  " |t40:40:/esoui/art/tutorial/gamepad/gp_inventory_trait_not_researched_icon.dds|t"

export const SPECIAL_TYPE_TEXTS: Record<string, boolean> = {
  "number+": true,
  "number-": true,
  stringValue: true,
  sound: true,
}

export const POSSIBLE_CUSTOM_SETTINGS: {
  head: CustomSettingEntry[]
  leftList: CustomSettingEntry[]
  rightList: CustomSettingEntry[]
} = {
  head: [
    { name: "showMoveAllButtons", validationType: "boolean" },
    { name: "dragDropEnabled", validationType: "boolean" },
    { name: "sortEnabled", validationType: "boolean" },
    { name: "sortBy", validationType: "stringValueKey" },
    { name: "search", validationType: "table" },
  ],
  leftList: [
    { name: "title", validationType: "string" },
    { name: "rowTemplateName", validationType: "string" },
    { name: "emptyListText", validationType: "string" },
    { name: "fontName", validationType: "string" },
    { name: "rowHeight", validationType: "positiveNumber" },
    { name: "fontSize", validationType: "positiveNumber" },
    { name: "rowOnMouseEnter", validationType: "function" },
    { name: "rowOnMouseExit", validationType: "function" },
    { name: "rowOnMouseRightClick", validationType: "function" },
    { name: "rowSetupCallback", validationType: "function" },
    { name: "rowDataTypeSelectSound", validationType: "sound" },
    { name: "rowResetControlCallback", validationType: "function" },
    { name: "rowSetupAdditionalDataCallback", validationType: "function" },
    { name: "callbackRegister", validationType: "table" },
  ],
  rightList: [],
}
POSSIBLE_CUSTOM_SETTINGS.rightList = ZO_ShallowTableCopy(POSSIBLE_CUSTOM_SETTINGS.leftList)

export const EVENT_NAMES: readonly string[] = [
  "EVENT_ENTRY_HIGHLIGHTED",
  "EVENT_ENTRY_UNHIGHLIGHTED",
  "EVENT_ENTRY_MOVED",
  "EVENT_LEFT_LIST_CLEARED",
  "EVENT_RIGHT_LIST_CLEARED",
  "EVENT_LEFT_LIST_ENTRY_ADDED",
  "EVENT_RIGHT_LIST_ENTRY_ADDED",
  "EVENT_LEFT_LIST_ENTRY_REMOVED",
  "EVENT_RIGHT_LIST_ENTRY_REMOVED",
  "EVENT_LEFT_LIST_CREATED",
  "EVENT_RIGHT_LIST_CREATED",
  "EVENT_LEFT_LIST_ROW_ON_MOUSE_ENTER",
  "EVENT_RIGHT_LIST_ROW_ON_MOUSE_ENTER",
  "EVENT_LEFT_LIST_ROW_ON_MOUSE_EXIT",
  "EVENT_RIGHT_LIST_ROW_ON_MOUSE_EXIT",
  "EVENT_LEFT_LIST_ROW_ON_MOUSE_UP",
  "EVENT_RIGHT_LIST_ROW_ON_MOUSE_UP",
  "EVENT_LEFT_LIST_ROW_ON_DRAG_START",
  "EVENT_RIGHT_LIST_ROW_ON_DRAG_START",
  "EVENT_LEFT_LIST_ROW_ON_DRAG_END",
  "EVENT_RIGHT_LIST_ROW_ON_DRAG_END",
]

export const DEFAULT_LIST_SETTINGS: ListSettings = {
  title: "",
  rowHeight: 32,
  rowTemplateName: "ShifterBoxEntryTemplate",
  emptyListText: GetString(LIBSHIFTERBOX_EMPTY),
  fontSize: 18,
}

export const DEFAULT_SETTINGS: ShifterBoxSettings = {
  showMoveAllButtons: true,
  dragDropEnabled: true,
  sortEnabled: true,
  sortBy: "value",
  leftList: DEFAULT_LIST_SETTINGS,
  rightList: DEFAULT_LIST_SETTINGS,
  search: {
    enabled: false,
  },
}
