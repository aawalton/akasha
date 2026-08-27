export const widgetVersion = 13

export const orderListBoxNameTemplate = "LAMOrderListBox_%s"
export const orderListBoxAddNewEntryDialogSuffix = "AddNewEntryDialog"
export const orderListBoxAskBeforeRemoveEntryDialogSuffix = "AskBeforeRemoveEntryDialog"
export const orderListBoxAddNewEntryButtonSuffix = "AddNewEntryButton"
export const orderListBoxRemoveEntryButtonSuffix = "RemoveEntryButton"

export interface Translation {
  UP: string
  DOWN: string
  TOTAL_UP: string
  TOTAL_DOWN: string
  ADD_ENTRY?: string
  ADD_ENTRY_DESC?: string
  REMOVE_ENTRY?: string
  REMOVE_ENTRY_DESC?: string
}

const moveText = GetString(SI_HOUSINGEDITORCOMMANDTYPE1)
const moveTextLower = string.lower(moveText)

const EN: Translation = {
  UP: moveText + " up",
  DOWN: moveText + " down",
  TOTAL_UP: moveText + " to top",
  TOTAL_DOWN: moveText + " to bottom",
  ADD_ENTRY: "Add entry",
  ADD_ENTRY_DESC: "Enter value:",
  REMOVE_ENTRY: "Remove entry",
  REMOVE_ENTRY_DESC: "Really remove selected entry?",
}

const translations: Record<string, Translation> = {
  de: {
    UP: "Hoch " + moveTextLower,
    DOWN: "Herrunter " + moveTextLower,
    TOTAL_UP: "Zum Anfang " + moveTextLower,
    TOTAL_DOWN: "Zum Ende " + moveTextLower,
    ADD_ENTRY: "Eintrag hinzufügen",
    ADD_ENTRY_DESC: "Wert eingeben:",
    REMOVE_ENTRY: "Eintrag entfernen",
    REMOVE_ENTRY_DESC: "Selektierten Eintrag wirklich entfernen?",
  },
  en: EN,
  es: {
    UP: "Mover hacia arriba",
    DOWN: "Mover hacia abajo",
    TOTAL_UP: "Mover todo hacia arriba",
    TOTAL_DOWN: "Mover todo hacia abajo",
  },
  fr: {
    UP: moveText + " en haut",
    DOWN: moveText + " en bas",
    TOTAL_UP: moveText + " jusqu'au sommet",
    TOTAL_DOWN: moveText + " vers le bas",
  },
  jp: {
    UP: moveText + " 上",
    DOWN: moveText + " 下へ",
    TOTAL_UP: moveText + " 頂点に",
    TOTAL_DOWN: moveText + " 一番下に",
  },
  ru: {
    UP: moveText + " вверх",
    DOWN: moveText + " вниз",
    TOTAL_UP: moveText + " наверх",
    TOTAL_DOWN: moveText + " ко дну",
  },
  zh: {
    UP: "提升",
    DOWN: "向下移动",
    TOTAL_UP: "全部向上移动",
    TOTAL_DOWN: "全部向下移动",
  },
}

const lang = string.lower(GetCVar("Language.2"))
export const translation: Translation = translations[lang] ?? EN

export const widgetPrefix = "LAM2_OrderListBox_Widget"
export const widgetCursorTLCName = widgetPrefix + "_Cursor_TLC"

export const errorTexts: Record<string, string> = {
  no_line_text_given: "No text given for this line",
  no_list_entries: "List entries are empty!",
  list_entry_no_table: "List entry is no table, index: '%s'",
  list_entry_field_missing: "List entry field is missing, index: '%s' - field: '%s'!",
  list_entry_field_format_wrong:
    "List entry field format is wrong, index: '%s' - field: '%s'=%s. Needs to be: '%s'!",
}

export const EVENT_HANDLER_NAMESPACE = widgetPrefix + "_Event"
export const globalMouseDown = "_GLOBAL_MOUSE_DOWN"
export const globalMouseUp = "_GLOBAL_MOUSE_UP"

export const LAM_SORT_LIST_BOX_SCROLL_LIST_DATATYPE = 1
export const SORT_LIST_ROW_DEFAULT_HEIGHT = 25
export const SORT_LIST_ROW_DEFAULT_FONT = "ZoFontWinH4"
export const SORT_LIST_ROW_DEFAULT_MAXLINES = 1
export const SORT_LIST_ROW_TEMPLATE_NAME = widgetPrefix + "_Scrolllist_Row"
export const SORT_LIST_ROW_SELECTION_TEMPLATE_NAME = "ZO_ThinListHighlight"
export const MIN_HEIGHT = SORT_LIST_ROW_DEFAULT_HEIGHT * 5

export const mouseCursorHand = MOUSE_CURSOR_UI_HAND
export const mouseCursorDoNotCare = MOUSE_CURSOR_DO_NOT_CARE
export const mouseCursorResizeNS = MOUSE_CURSOR_RESIZE_NS

export const scrollboxUpTexture = "/esoui/art/buttons/scrollbox_uparrow_%s.dds"
export const scrollboxDownTexture = "/esoui/art/buttons/scrollbox_downarrow_%s.dds"
export const scrollbarEndArrowTexture = "/esoui/art/chatwindow/chat_scrollbar_endarrow_%s.dds"
