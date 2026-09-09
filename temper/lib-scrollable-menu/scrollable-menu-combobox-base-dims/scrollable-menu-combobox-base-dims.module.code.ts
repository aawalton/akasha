import {
  asComboBoxBaseClass,
  asDropdownClass,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import { asLsmCastIsDropdownVisibleThisVoidBoolean } from "../scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import { asLsmCastRecordStringUnknown } from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastThisVoidComboBoxComboBoxBaseNameUnknownItemUnk,
  asLsmCastThisVoidComboBoxUnknownStayHighlightedUnknownC,
  asLsmCastThisVoidContextMenuObject,
  asLsmCastThisVoidControlUnknownAlternativeControlUnknow,
} from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidItem1UnknownItem2UnknownSelfVarUnknown,
  asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd,
  asLsmCastThisVoidNumber,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmCastThisVoidUndefined,
  asLsmCastUnknown,
  asLsmCastUnregisterForEventThisVoidEventNumberUndefined,
  asLsmComboBoxOptions,
  asNumber,
  asObject,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

type LsmCastLocalHeaderHeaderSizeLike = { header?: HeaderSizeLike }
function asLsmCastLocalHeaderHeaderSizeLike(value: unknown): LsmCastLocalHeaderHeaderSizeLike {
  return value as LsmCastLocalHeaderHeaderSizeLike
}

type LsmCastLocalHeaderHeaderSizeLikeUndefined = { header?: HeaderSizeLike } | undefined
function asLsmCastLocalHeaderHeaderSizeLikeUndefined(
  value: unknown
): LsmCastLocalHeaderHeaderSizeLikeUndefined {
  return value as LsmCastLocalHeaderHeaderSizeLikeUndefined
}

type LsmCastLocalDropdownObjectShowLike = DropdownObjectShowLike
function asLsmCastLocalDropdownObjectShowLike(value: unknown): LsmCastLocalDropdownObjectShowLike {
  return value as LsmCastLocalDropdownObjectShowLike
}

import {
  getContextMenu,
  lib,
  setContextMenu,
} from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const tos = tostring

const constants = lib.constants
const dropdownConstants = asLsmCastRecordStringUnknown(constants.dropdown)
const DROPDOWN_DEFAULTS = asLsmCastRecordStringUnknown(dropdownConstants.defaults)
const MIN_WIDTH_WITHOUT_SEARCH_HEADER = asNumber(DROPDOWN_DEFAULTS.MIN_WIDTH_WITHOUT_SEARCH_HEADER)

const searchFilterConstants = asLsmCastRecordStringUnknown(constants.searchFilter)
const NO_ENTRIES_SUBMENU_RESULTS = asLsmCastRecordStringUnknown(
  searchFilterConstants.noEntriesSubmenuResults
)

const libUtil = lib.Util
const getControlName = asLsmCastThisVoidControlUnknownAlternativeControlUnknow(
  libUtil.getControlName
)
const getScreensMaxDropdownHeight = asLsmCastThisVoidNumber(libUtil.getScreensMaxDropdownHeight)
const hideContextMenu = asLsmCastThisVoidUndefined(libUtil.hideContextMenu)
const unhighlightControl = asLsmCastThisVoidComboBoxUnknownStayHighlightedUnknownC(
  libUtil.unhighlightControl
)
const getContextMenuReference = asLsmCastThisVoidContextMenuObject(libUtil.getContextMenuReference)

const zo_comboBox_base_hideDropdown = ZO_ComboBox_Base.HideDropdown

const classes = asLsmCastRecordStringUnknown(lib.classes)
const dropdownClass = asDropdownClass(classes.dropdownClass)
const submenuClass = asComboBoxBaseClass(classes.submenuClass)
const comboBox_base = asComboBoxBaseClass(classes.comboboxBaseClass)

interface DropdownObjectShowLike {
  Show: (
    this: void,
    comboBox: unknown,
    sortedItems: unknown,
    containerMinWidth: unknown,
    containerWidth: unknown,
    height: unknown,
    spacing: unknown
  ) => undefined
  SetHidden: (this: unknown, hidden: boolean) => undefined
  IsMouseOverControl: (this: void) => boolean
  control: { BringWindowToTop: (this: unknown) => undefined }
}

interface HeaderSizeLike {
  GetHeight: (this: unknown) => number
  GetWidth: (this: unknown) => number
}

comboBox_base.GetBaseHeight = function (this: ComboBoxBase, control: Control): number {
  const controlTbl = asLsmCastLocalHeaderHeaderSizeLike(control)
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      91,
      tos(getControlName(control)),
      tos(controlTbl.header !== undefined),
      tos(controlTbl.header?.GetHeight() ?? 0)
    )
  }
  if (controlTbl.header) {
    return controlTbl.header.GetHeight()
  }
  return 0
}

comboBox_base.GetBaseWidth = function (this: ComboBoxBase, control: Control | undefined): number {
  const controlTbl = asLsmCastLocalHeaderHeaderSizeLikeUndefined(control)
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      91,
      tos(getControlName(control)),
      tos(controlTbl !== undefined && controlTbl.header !== undefined),
      tos(controlTbl?.header?.GetWidth() ?? 0)
    )
  }
  if (controlTbl?.header) {
    let minWidth = controlTbl.header.GetWidth()
    if (minWidth <= 0) {
      minWidth = MIN_WIDTH_WITHOUT_SEARCH_HEADER
    }
    return minWidth
  }
  return MIN_WIDTH_WITHOUT_SEARCH_HEADER
}

comboBox_base.GetMaxDropdownHeight = function (this: ComboBoxBase): number | undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 92, tos(this.maxHeight))
  }
  return this.maxHeight
}

comboBox_base.GetMaxDropdownWidth = function (this: ComboBoxBase): number | undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 179, tos(this.maxWidth))
  }
  return this.maxWidth
}

comboBox_base.GetMinDropdownWidth = function (this: ComboBoxBase): number | undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 185, tos(this.minWidth))
  }
  return this.minWidth
}

comboBox_base.GetDropdownObject = function (
  this: ComboBoxBase,
  comboBoxContainer: Control,
  depth: number
): DropdownObject {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 93, tos(getControlName(comboBoxContainer)), tos(depth))
  }
  this.m_nextFree = depth + 1
  return dropdownClass.New(this, comboBoxContainer, depth)
}

comboBox_base.GetOptions = function (this: ComboBoxBase): LsmComboBoxOptions {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 94)
  }
  return this.options || asLsmComboBoxOptions({})
}

comboBox_base.GetSubmenu = function (this: ComboBoxBase): ComboBoxBase {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 95)
  }
  if (!this.m_submenu) {
    this.m_submenu = submenuClass.New(this, this.m_container, this.GetOptions(), this.m_nextFree)
  }
  return this.m_submenu
}

comboBox_base.HideDropdown = function (this: ComboBoxBase): boolean {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 97)
  }

  if (this.m_submenu?.IsDropdownVisible()) {
    this.m_submenu.HideDropdown()
  }

  if (this.highlightedControl) {
    unhighlightControl(this, false, undefined, undefined)
  }

  zo_comboBox_base_hideDropdown(this)
  return true
}

comboBox_base.RefreshSortedItems = function (
  this: ComboBoxBase,
  parentControl: Control
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 101, tos(getControlName(parentControl)))
  }
  ZO_ClearNumericallyIndexedTable(asObject(this.m_sortedItems))

  const entries = this.GetEntries()
  if (entries !== undefined) {
    if (ZO_IsTableEmpty(entries)) {
      NO_ENTRIES_SUBMENU_RESULTS.m_owner = this
      NO_ENTRIES_SUBMENU_RESULTS.m_parentControl = parentControl

      this.AddItem(NO_ENTRIES_SUBMENU_RESULTS, ZO_COMBOBOX_SUPPRESS_UPDATE)
    } else {
      for (const [, item] of ipairs(asLsmCastUnknown(entries))) {
        const itemTbl = asLsmCastRecordStringUnknown(item)
        itemTbl.m_owner = this
        itemTbl.m_parentControl = parentControl
        this.AddItem(itemTbl, ZO_COMBOBOX_SUPPRESS_UPDATE)
      }

      this.UpdateItems()
    }
  }
}

comboBox_base.RunItemCallback = function (
  this: ComboBoxBase,
  item: LsmEntry,
  ignoreCallback: unknown,
  ...args: unknown[]
): unknown {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 102)
  }

  const itemTbl = asLsmCastRecordStringUnknown(item)
  if (itemTbl.callback && !ignoreCallback) {
    return asLsmCastThisVoidComboBoxComboBoxBaseNameUnknownItemUnk(itemTbl.callback)(
      this,
      itemTbl.name,
      item,
      ...args
    )
  }
  return false
}

comboBox_base.SetOptions = function (
  this: ComboBoxBase,
  options: LsmComboBoxOptions | undefined
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 103)
  }
  this.options = options
}

comboBox_base.Show = function (this: ComboBoxBase): undefined {
  const dropdownObject = asLsmCastLocalDropdownObjectShowLike(this.m_dropdownObject)
  dropdownObject.Show(
    this,
    this.m_sortedItems,
    this.containerMinWidth,
    this.m_containerWidth,
    this.m_height,
    this.GetSpacing()
  )
  dropdownObject.control.BringWindowToTop()
}

comboBox_base.ShowDropdownOnMouseAction = function (
  this: ComboBoxBase,
  parentControl: Control
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 105, tos(getControlName(parentControl)))
  }
  if (this.IsDropdownVisible()) {
    this.HideDropdown()
  }

  if (this.IsEnabled()) {
    const dropdownObject = asLsmCastLocalDropdownObjectShowLike(this.m_dropdownObject)
    dropdownObject.SetHidden(false)
    this.AddMenuItems(parentControl)

    this.ShowDropdown()
    this.SetVisible(true)
  } else {
    const container = asLsmCastUnregisterForEventThisVoidEventNumberUndefined(this.m_container)
    container.UnregisterForEvent(EVENT_GLOBAL_MOUSE_UP)
  }
}

comboBox_base.ShowSubmenu = function (this: ComboBoxBase, parentControl: Control): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 106, tos(getControlName(parentControl)))
  }

  setContextMenu(getContextMenuReference())
  const gContextMenu = asLsmCastIsDropdownVisibleThisVoidBoolean(getContextMenu())
  if (!gContextMenu.IsDropdownVisible()) {
    hideContextMenu()
  }

  const submenu = this.GetSubmenu()
  submenu.ShowDropdownOnMouseAction(parentControl)
}

comboBox_base.UpdateItems = function (this: ComboBoxBase, sortUpdate?: unknown): undefined {
  if (sortUpdate === true && !this.m_sortsItems) {
    this.SetSortsItems(true)
  }

  if (this.m_sortOrder !== undefined && this.m_sortsItems) {
    const [, , , sortFunction] = this.GetSortData()
    const selfVar = this
    const sortFunc = asLsmCastThisVoidItem1UnknownItem2UnknownSelfVarUnknown(sortFunction)
    table.sort(
      asLsmCastUnknown(this.m_sortedItems),
      function (this: void, item1: unknown, item2: unknown): boolean {
        return sortFunc(item1, item2, selfVar)
      }
    )
  }

  if (this.IsDropdownVisible()) {
    if (sortUpdate) {
      this.ShowDropdownOnMouseUp()
    } else {
      this.ShowDropdown()
    }
  }
}

comboBox_base.UpdateHeight = function (this: ComboBoxBase, control?: Control): undefined {
  let maxHeightInTotal = 0

  const spacing = this.m_spacing ?? 0
  const maxDropdownHeight = this.GetMaxDropdownHeight()

  const baseEntryHeight = asNumber(this.baseEntryHeight)
  let maxRows: number | undefined
  let maxHeightByEntries: number | undefined

  let headerHeight = 0
  if (control !== undefined) {
    headerHeight = this.GetBaseHeight(control)
  }

  if (maxDropdownHeight !== undefined) {
    maxHeightInTotal = maxDropdownHeight
  } else {
    maxRows = this.GetMaxRows()
    maxHeightByEntries =
      (baseEntryHeight + spacing) * asNumber(maxRows) -
      spacing +
      ZO_SCROLLABLE_COMBO_BOX_LIST_PADDING_Y * 2

    maxHeightInTotal = maxHeightByEntries
  }

  const minHeight = baseEntryHeight * 1 + ZO_SCROLLABLE_COMBO_BOX_LIST_PADDING_Y * 4 + headerHeight

  maxHeightInTotal = maxHeightInTotal + headerHeight

  const screensMaxDropdownHeight = getScreensMaxDropdownHeight()
  maxHeightInTotal = zo_clamp(maxHeightInTotal, minHeight, screensMaxDropdownHeight)

  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      107,
      tos(getControlName(control)),
      tos(maxHeightInTotal),
      tos(maxDropdownHeight),
      tos(maxHeightByEntries),
      tos(baseEntryHeight),
      tos(maxRows),
      tos(spacing),
      tos(headerHeight)
    )
  }

  this.SetHeight(maxHeightInTotal)

  if (this.IsDropdownVisible()) {
    this.Show()
  }
}
