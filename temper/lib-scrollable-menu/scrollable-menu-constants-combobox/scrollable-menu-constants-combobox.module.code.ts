import {
  asBoolean,
  asLsmCastBooleanUndefined,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastNumberUndefined,
  asLsmCastRecordStringUnknown,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastStringUndefined } from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import { asString } from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

type LsmCastLocalComboBoxOptionTarget = ComboBoxOptionTarget
function asLsmCastLocalComboBoxOptionTarget(value: unknown): LsmCastLocalComboBoxOptionTarget {
  return value as LsmCastLocalComboBoxOptionTarget
}

import {
  COLORS,
  constants,
  DEFAULT_SPACING,
  DROPDOWN_DEFAULTS,
  FONTS,
  getValueOrCallback,
  HIGHLIGHTS,
  LSM_ROW_HIGHLIGHT_DEFAULT,
} from "../scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

constants.data = {
  subtables: {
    LSM_DATA_SUBTABLE: "_LSM",
    LSM_DATA_SUBTABLE_ORIGINAL_DATA: "OriginalData",
    LSM_DATA_SUBTABLE_CALLBACK_FUNCTIONS: "funcData",
  },
}

const COMBO_BOX_MAPPING: Record<string, unknown> = {}
asLsmCastRecordStringUnknown(constants.comboBox).mapping = COMBO_BOX_MAPPING

const LSM_ENTRY_KEY_ZO_COMBO_BOX_ENTRY_KEY: Record<string, string> = {
  normalColor: "m_normalColor",
  disabledColor: "m_disabledColor",
  highlightColor: "m_highlightColor",
  highlightTemplate: "m_highlightTemplate",
}
COMBO_BOX_MAPPING.LSMEntryKeyZO_ComboBoxEntryKey = LSM_ENTRY_KEY_ZO_COMBO_BOX_ENTRY_KEY

const NIL_TO_TRUE = true
const NIL_IGNORE = false
const POSSIBLE_ENTRY_DATA_WITH_FUNCTION: Record<string, boolean> = {
  name: NIL_IGNORE,
  label: NIL_IGNORE,
  checked: NIL_IGNORE,
  font: NIL_IGNORE,
  enabled: NIL_TO_TRUE,
}
COMBO_BOX_MAPPING.possibleEntryDataWithFunction = POSSIBLE_ENTRY_DATA_WITH_FUNCTION

const [selR, selG, selB, selA] = GetInterfaceColor(
  INTERFACE_COLOR_TYPE_TEXT_COLORS,
  INTERFACE_TEXT_COLOR_SELECTED
)
const COMBO_BOX_DEFAULTS: Record<string, unknown> = {
  m_disabledColor: COLORS.DEFAULT_TEXT_DISABLED_COLOR,
  m_enableMultiSelect: false,
  m_font: FONTS.DEFAULT_FONT,
  m_height: DROPDOWN_DEFAULTS.DEFAULT_HEIGHT,
  m_highlightColor: COLORS.DEFAULT_TEXT_HIGHLIGHT,
  m_highlightTemplate: LSM_ROW_HIGHLIGHT_DEFAULT,
  m_isDropdownVisible: false,
  m_maxNumSelectionsErrorText: GetString(SI_COMBO_BOX_MAX_SELECTIONS_REACHED_ALERT),
  m_normalColor: COLORS.DEFAULT_TEXT_COLOR,
  m_selectedColor: [selR, selG, selB, selA],
  m_sortsItems: false,
  m_sortOrder: ZO_SORT_ORDER_UP,
  m_sortType: ZO_SORT_BY_NAME,
  m_spacing: DEFAULT_SPACING,
  multiSelectionTextFormatter: SI_COMBO_BOX_DEFAULT_MULTISELECTION_TEXT_FORMATTER,
  noSelectionText: GetString(SI_COMBO_BOX_DEFAULT_NO_SELECTION_TEXT),
  horizontalAlignment: TEXT_ALIGN_LEFT,
  itemYPad: 0,
  automaticRefresh: false,
  automaticSubmenuRefresh: false,
  baseEntryHeight: ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT,
  containerMinWidth: DROPDOWN_DEFAULTS.MIN_WIDTH_WITHOUT_SEARCH_HEADER,
  disableFadeGradient: false,
  enableFilter: false,
  headerFont: FONTS.DEFAULT_FONT,
  headerColor: COLORS.HEADER_TEXT_COLOR,
  headerCollapsed: false,
  submenuArrowColor: COLORS.DEFAULT_ARROW_COLOR,
  visibleRows: DROPDOWN_DEFAULTS.DEFAULT_VISIBLE_ROWS,
  visibleRowsSubmenu: DROPDOWN_DEFAULTS.DEFAULT_VISIBLE_ROWS,
}
asLsmCastRecordStringUnknown(constants.comboBox).defaults = COMBO_BOX_DEFAULTS

const COMBO_BOX_DEFAULTS_CONTEXTUAL_INIT_VALUES = {
  m_sortsItems: { ifEquals: true, changeTo: COMBO_BOX_DEFAULTS.m_sortsItems },
}
asLsmCastRecordStringUnknown(constants.comboBox).defaultsContextualInitValues =
  COMBO_BOX_DEFAULTS_CONTEXTUAL_INIT_VALUES

HIGHLIGHTS.defaultHighlightTemplate = COMBO_BOX_DEFAULTS.m_highlightTemplate
HIGHLIGHTS.defaultHighlightColor = COMBO_BOX_DEFAULTS.m_highlightColor

const DEFAULT_COMBO_BOX_OPTIONS: Record<string, unknown> = {
  automaticRefresh: false,
  automaticSubmenuRefresh: false,
  enableFilter: false,
  disableFadeGradient: false,
  font: FONTS.DEFAULT_FONT,
  headerCollapsed: false,
  headerCollapsible: false,
  highlightContextMenuOpeningControl: false,
  sortEntries: DROPDOWN_DEFAULTS.DEFAULT_SORTS_ENTRIES,
  spacing: DEFAULT_SPACING,
  useDefaultHighlightForSubmenuWithCallback: false,
  visibleRowsDropdown: DROPDOWN_DEFAULTS.DEFAULT_VISIBLE_ROWS,
  visibleRowsSubmenu: DROPDOWN_DEFAULTS.DEFAULT_VISIBLE_ROWS,
}
asLsmCastRecordStringUnknown(constants.comboBox).defaultComboBoxOptions = DEFAULT_COMBO_BOX_OPTIONS

const LSM_OPTIONS_KEY_TO_ZO_COMBO_BOX_OPTIONS_KEY: Record<string, string> = {
  automaticRefresh: "automaticRefresh",
  automaticSubmenuRefresh: "automaticSubmenuRefresh",
  disableFadeGradient: "disableFadeGradient",
  disabledColor: "m_disabledColor",
  enableFilter: "enableFilter",
  enableMultiSelect: "m_enableMultiSelect",
  headerCollapsible: "headerCollapsible",
  headerCollapsed: "headerCollapsed",
  headerColor: "headerColor",
  headerFont: "headerFont",
  headerIcon: "headerIcon",
  highlightContextMenuOpeningControl: "highlightContextMenuOpeningControl",
  maxNumSelections: "m_maxNumSelections",
  maxNumSelectionsErrorText: "m_overrideMaxSelectionsErrorText",
  multiSelectionTextFormatter: "multiSelectionTextFormatter",
  narrate: "narrateData",
  normalColor: "m_normalColor",
  noSelectionText: "noSelectionText",
  subtitleText: "subtitleText",
  subtitleFont: "subtitleFont",
  titleFont: "titleFont",
  titleText: "titleText",
  titleTextAlignment: "titleTextAlignment",
  useDefaultHighlightForSubmenuWithCallback: "useDefaultHighlightForSubmenuWithCallback",
  visibleRowsSubmenu: "visibleRowsSubmenu",
  font: "m_font",
  maxDropdownHeight: "maxHeight",
  maxDropdownWidth: "maxWidth",
  minDropdownWidth: "minWidth",
  preshowDropdownFn: "m_preshowDropdownFn",
  sortEntries: "m_sortsItems",
  sortOrder: "m_sortOrder",
  sortType: "m_sortType",
  spacing: "m_spacing",
  submenuArrowColor: "submenuArrowColor",
  submenuOpenToSide: "submenuOpenToSide",
  multiSelectSubmenuSelectedArrowColor: "multiSelectSubmenuSelectedArrowColor",
  visibleRowsDropdown: "visibleRows",
}
COMBO_BOX_MAPPING.LSMOptionsKeyToZO_ComboBoxOptionsKey = LSM_OPTIONS_KEY_TO_ZO_COMBO_BOX_OPTIONS_KEY

interface ComboBoxOptionTarget {
  GetOptions: (this: ComboBoxOptionTarget) => Record<string, unknown>
  DisableMultiSelect: (this: ComboBoxOptionTarget) => undefined
  SetMaxSelections: (this: ComboBoxOptionTarget, n: number | undefined) => undefined
  SetMaxSelectionsErrorText: (this: ComboBoxOptionTarget, t: string) => undefined
  SetOnSelectionBlockedCallback: (this: ComboBoxOptionTarget, c: unknown) => undefined
  EnableMultiSelect: (this: ComboBoxOptionTarget, f: unknown, n: string) => undefined
  SetFont: (this: ComboBoxOptionTarget, f: unknown) => undefined
  UpdateHeight: (this: ComboBoxOptionTarget, d: unknown) => undefined
  UpdateWidth: (this: ComboBoxOptionTarget, d: unknown) => undefined
  SetPreshowDropdownCallback: (this: ComboBoxOptionTarget, c: unknown) => undefined
  SetSortsItems: (this: ComboBoxOptionTarget, s: unknown) => undefined
  SetSortOrder: (this: ComboBoxOptionTarget, o: unknown, t: unknown) => undefined
  SetSpacing: (this: ComboBoxOptionTarget, s: unknown) => undefined
  [key: string]: unknown
}

function updateMultiSelectionOptions(
  this: void,
  comboBoxObject: ComboBoxObject,
  isMultiSelectionEnabled: boolean | undefined,
  maxNumSelections: number | undefined,
  maxNumSelectionsErrorText: string | undefined,
  multiSelectionTextFormatter: unknown,
  noSelectionText: string | undefined,
  onSelectionBlockedCallback: unknown
): undefined {
  const cbo = asLsmCastLocalComboBoxOptionTarget(comboBoxObject)
  const options = cbo.GetOptions()
  const updatedOptions = asLsmCastRecordStringUnknown(comboBoxObject.updatedOptions)

  const isMultiSelectionEnabledPassedIn = isMultiSelectionEnabled

  let isMultiSel = isMultiSelectionEnabled
  if (isMultiSel === undefined) {
    isMultiSel = asLsmCastBooleanUndefined(updatedOptions.enableMultiSelect) ?? undefined
    if (isMultiSel === undefined) {
      isMultiSel =
        asLsmCastBooleanUndefined(getValueOrCallback(options.enableMultiSelect, options)) ??
        undefined
    }
    if (isMultiSel === undefined) {
      isMultiSel = asBoolean(COMBO_BOX_DEFAULTS.m_enableMultiSelect)
    }
  }

  let maxSel =
    maxNumSelections ??
    asLsmCastNumberUndefined(updatedOptions.maxNumSelections) ??
    asLsmCastNumberUndefined(getValueOrCallback(options.maxNumSelections, options)) ??
    asLsmCastNumberUndefined(COMBO_BOX_DEFAULTS.m_maxNumSelections)
  if (maxSel !== undefined && maxSel < 0) {
    maxSel = undefined
  }
  const maxSelErr =
    maxNumSelectionsErrorText ??
    asLsmCastStringUndefined(updatedOptions.maxNumSelectionsErrorText) ??
    asLsmCastStringUndefined(getValueOrCallback(options.maxNumSelectionsErrorText, options)) ??
    asString(COMBO_BOX_DEFAULTS.m_maxNumSelectionsErrorText)
  const noSelText =
    noSelectionText ??
    asLsmCastStringUndefined(updatedOptions.noSelectionText) ??
    asLsmCastStringUndefined(getValueOrCallback(options.noSelectionText, options)) ??
    asString(COMBO_BOX_DEFAULTS.noSelectionText)
  const multiSelFormatter =
    multiSelectionTextFormatter ??
    updatedOptions.multiSelectionTextFormatter ??
    getValueOrCallback(options.multiSelectionTextFormatter, options) ??
    COMBO_BOX_DEFAULTS.multiSelectionTextFormatter
  const onSelBlocked =
    onSelectionBlockedCallback ??
    updatedOptions.OnSelectionBlockedCallback ??
    options.OnSelectionBlockedCallback ??
    COMBO_BOX_DEFAULTS.onSelectionBlockedCallback

  updatedOptions.maxNumSelections = maxSel
  updatedOptions.maxNumSelectionsErrorText = maxSelErr
  updatedOptions.noSelectionText = noSelText
  updatedOptions.multiSelectionTextFormatter = multiSelFormatter
  updatedOptions.OnSelectionBlockedCallback = onSelBlocked

  if (isMultiSel === false) {
    if (isMultiSelectionEnabledPassedIn === false && comboBoxObject.isContextMenu !== true) {
      cbo.DisableMultiSelect()
    }
    return
  }

  cbo.SetMaxSelections(maxSel)
  cbo.SetMaxSelectionsErrorText(maxSelErr)
  cbo.SetOnSelectionBlockedCallback(onSelBlocked)
  cbo.EnableMultiSelect(multiSelFormatter, noSelText)
}

const LSM_OPTIONS_TO_ZO_COMBO_BOX_OPTIONS_CALLBACKS: Record<
  string,
  (this: void, comboBoxObject: ComboBoxObject, value: unknown) => undefined
> = {
  enableMultiSelect: (comboBoxObject, isMultiSelectionEnabled) => {
    updateMultiSelectionOptions(
      comboBoxObject,
      asLsmCastBooleanUndefined(isMultiSelectionEnabled),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  },
  font: (comboBoxObject, font) => {
    asLsmCastLocalComboBoxOptionTarget(comboBoxObject).SetFont(font)
  },
  maxDropdownHeight: (comboBoxObject, maxDropdownHeight) => {
    comboBoxObject.maxHeight = asLsmCastNumberUndefined(maxDropdownHeight)
    asLsmCastLocalComboBoxOptionTarget(comboBoxObject).UpdateHeight(comboBoxObject.m_dropdown)
  },
  maxDropdownWidth: (comboBoxObject, maxDropdownWidth) => {
    comboBoxObject.maxWidth = asLsmCastNumberUndefined(maxDropdownWidth)
    asLsmCastLocalComboBoxOptionTarget(comboBoxObject).UpdateWidth(comboBoxObject.m_dropdown)
  },
  minDropdownWidth: (comboBoxObject, minDropdownWidth) => {
    comboBoxObject.minWidth = asLsmCastNumberUndefined(minDropdownWidth)
    asLsmCastLocalComboBoxOptionTarget(comboBoxObject).UpdateWidth(comboBoxObject.m_dropdown)
  },
  maxNumSelections: (comboBoxObject, maxNumSelections) => {
    updateMultiSelectionOptions(
      comboBoxObject,
      undefined,
      asLsmCastNumberUndefined(maxNumSelections),
      undefined,
      undefined,
      undefined,
      undefined
    )
  },
  maxNumSelectionsErrorText: (comboBoxObject, maxNumSelectionsErrorText) => {
    updateMultiSelectionOptions(
      comboBoxObject,
      undefined,
      undefined,
      asLsmCastStringUndefined(maxNumSelectionsErrorText),
      undefined,
      undefined,
      undefined
    )
  },
  multiSelectionTextFormatter: (comboBoxObject, multiSelectionTextFormatter) => {
    updateMultiSelectionOptions(
      comboBoxObject,
      undefined,
      undefined,
      undefined,
      multiSelectionTextFormatter,
      undefined,
      undefined
    )
  },
  noSelectionText: (comboBoxObject, noSelectionText) => {
    updateMultiSelectionOptions(
      comboBoxObject,
      undefined,
      undefined,
      undefined,
      undefined,
      asLsmCastStringUndefined(noSelectionText),
      undefined
    )
  },
  OnSelectionBlockedCallback: (comboBoxObject, onSelectionBlockedCallbackFunc) => {
    updateMultiSelectionOptions(
      comboBoxObject,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      onSelectionBlockedCallbackFunc
    )
  },
  preshowDropdownFn: (comboBoxObject, preshowDropdownCallbackFunc) => {
    asLsmCastLocalComboBoxOptionTarget(comboBoxObject).SetPreshowDropdownCallback(
      preshowDropdownCallbackFunc
    )
  },
  sortEntries: (comboBoxObject, sortEntries) => {
    asLsmCastLocalComboBoxOptionTarget(comboBoxObject).SetSortsItems(sortEntries)
  },
  sortOrder: (comboBoxObject, sortOrder) => {
    const options = asLsmCastRecordStringUnknown(comboBoxObject.options)
    const updatedOptions = asLsmCastRecordStringUnknown(comboBoxObject.updatedOptions)
    if (updatedOptions.sortType !== undefined) {
      return
    }
    const sortType = getValueOrCallback(options.sortType, options) ?? comboBoxObject.m_sortType
    asLsmCastLocalComboBoxOptionTarget(comboBoxObject).SetSortOrder(sortOrder, sortType)
  },
  sortType: (comboBoxObject, sortType) => {
    const options = asLsmCastRecordStringUnknown(comboBoxObject.options)
    const updatedOptions = asLsmCastRecordStringUnknown(comboBoxObject.updatedOptions)
    if (updatedOptions.sortOrder !== undefined && updatedOptions.sortOrder !== false) {
      return
    }
    let sortOrder = getValueOrCallback(options.sortOrder, options)
    if (sortOrder === undefined) {
      sortOrder = comboBoxObject.m_sortOrder
    }
    asLsmCastLocalComboBoxOptionTarget(comboBoxObject).SetSortOrder(sortOrder, sortType)
  },
  spacing: (comboBoxObject, spacing) => {
    asLsmCastLocalComboBoxOptionTarget(comboBoxObject).SetSpacing(spacing)
  },
  visibleRowsDropdown: (comboBoxObject, visibleRows) => {
    comboBoxObject.visibleRows = asLsmCastNumberUndefined(visibleRows)
    asLsmCastLocalComboBoxOptionTarget(comboBoxObject).UpdateHeight(comboBoxObject.m_dropdown)
  },
}
COMBO_BOX_MAPPING.LSMOptionsToZO_ComboBoxOptionsCallbacks =
  LSM_OPTIONS_TO_ZO_COMBO_BOX_OPTIONS_CALLBACKS
