import {
  asControl,
  asDropdownClass,
  asLsmCastApplyCustomSortButtonsDataThisUnknownUnknownUn,
  asLsmCastCallbackThisVoidComboBoxUnknownEditBoxUnknownT,
  asLsmCastCallbackThisVoidComboBoxUnknownSliderUnknownVa,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastFilterBoxDropdownRowControl,
  asLsmCastGetTextThisUnknownString,
  asLsmCastGetUniqueNameThisUnknownString,
  asLsmCastGetUniqueNameThisUnknownStringUndefined,
  asLsmCastGetValueThisUnknownNumber,
} from "../scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import {
  asLsmCastIsContextMenuBooleanMSortOrderNumberSetSortsI,
  asLsmCastIsContextMenuBooleanUndefined,
  asLsmCastIsFilterEnabledThisUnknownUnknown,
  asLsmCastIsHiddenThisUnknownBoolean,
  asLsmCastIsSortEnabledThisUnknownUnknownUndefined,
} from "../scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import {
  asLsmCastRecordStringStringUndefined,
  asLsmCastRecordStringUnknown,
  asLsmCastRecordStringUnknownUndefined3,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastSetFilterStringThisUnknownFilterBoxUnknownText,
  asLsmCastSetTextThisUnknownTextStringUndefined,
  asLsmCastString,
} from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import { asLsmCastThisVoidFnThisVoidUndefinedDelayNumberSuffixSt } from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asNumber,
  asObject,
  asString,
  asUnknown,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const debugPrefix = libDebug.prefix
void debugPrefix

const tos = tostring

const throttledCall = asLsmCastThisVoidFnThisVoidUndefinedDelayNumberSuffixSt(
  lib.Util.throttledCall
)

const THROTTLED_CALL_DROPDOWN_CLASS_SET_FILTER_STRING_SUFFIX = "_DropdownClass_SetFilterString"
const THROTTLED_CALL_DROPDOWN_CLASS_ON_TEXT_CHANGED_STRING_SUFFIX = "_DropdownClass_OnTextChanged"
const THROTTLED_CALL_DROPDOWN_CLASS_ON_VALUE_CHANGED_STRING_SUFFIX = "_DropdownClass_OnValueChanged"

const classes = asLsmCastRecordStringUnknown(lib.classes)
const dropdownClass = asDropdownClass(classes.dropdownClass)

let preventCustomScrollableContextMenuHide:
  | typeof PreventCustomScrollableContextMenuHide
  | undefined
let clearCustomScrollableMenu: typeof ClearCustomScrollableMenu | undefined

function setTextSearchEditBoxText(
  this: void,
  selfVar: DropdownObject,
  filterBox: DropdownRowControl,
  newText: string
): undefined {
  selfVar.wasTextSearchContextMenuEntryClicked = true
  asLsmCastSetTextThisUnknownTextStringUndefined(filterBox).SetText(newText)
}

function clearTextSearchHistory(
  this: void,
  self: DropdownObject,
  comboBoxContainerName?: string
): undefined {
  self.wasTextSearchContextMenuEntryClicked = true
  if (comboBoxContainerName === undefined || comboBoxContainerName === "") {
    return
  }
  const textSearchHistory = asLsmCastRecordStringUnknownUndefined3(lib.SV.textSearchHistory)
  if (ZO_IsTableEmpty(asObject(textSearchHistory[comboBoxContainerName]))) {
    return
  }
  textSearchHistory[comboBoxContainerName] = undefined
}

function addTextSearchEditBoxTextToHistory(
  this: void,
  comboBox: { GetUniqueName: (this: unknown) => string } | undefined,
  filterBox: DropdownRowControl,
  historyText?: string
): undefined {
  historyText = historyText ?? asLsmCastGetTextThisUnknownString(filterBox).GetText()
  if (comboBox === undefined || historyText === undefined || historyText === "") {
    return
  }
  const comboBoxContainerName = comboBox.GetUniqueName()
  if (comboBoxContainerName === undefined || comboBoxContainerName === "") {
    return
  }

  const svHistory = asLsmCastRecordStringStringUndefined(lib.SV.textSearchHistory)
  svHistory[comboBoxContainerName] = svHistory[comboBoxContainerName] ?? []
  const textSearchHistory = asLsmCastString(svHistory[comboBoxContainerName])
  if (ZO_IsElementInNumericallyIndexedTable(textSearchHistory, historyText)) {
    return
  }
  textSearchHistory.unshift(historyText)

  const numEntries = textSearchHistory.length
  if (numEntries > 10) {
    textSearchHistory.pop()
  }
}

dropdownClass.WasTextSearchContextMenuEntryClicked = function (
  this: DropdownObject,
  mocCtrl: DropdownRowControl | undefined
): boolean {
  if (this.wasTextSearchContextMenuEntryClicked) {
    this.wasTextSearchContextMenuEntryClicked = undefined
    return true
  }
  if (mocCtrl !== undefined && mocCtrl.GetOwningWindow() === asUnknown(ZO_Menus)) {
    return true
  }
  return false
}

dropdownClass.SetFilterString = function (
  this: DropdownObject,
  filterBox: DropdownRowControl
): undefined {
  if (this.m_comboBox) {
    const self = this
    throttledCall(
      function (this: void): undefined {
        const text = asLsmCastGetTextThisUnknownString(filterBox).GetText()
        asLsmCastSetFilterStringThisUnknownFilterBoxUnknownText(self.m_comboBox).SetFilterString(
          filterBox,
          text
        )

        throttledCall(
          function (this: void): undefined {
            addTextSearchEditBoxTextToHistory(
              asLsmCastGetUniqueNameThisUnknownString(self.m_comboBox),
              filterBox,
              text
            )
          },
          990,
          THROTTLED_CALL_DROPDOWN_CLASS_SET_FILTER_STRING_SUFFIX
        )
      },
      10,
      THROTTLED_CALL_DROPDOWN_CLASS_SET_FILTER_STRING_SUFFIX
    )
  }
}

dropdownClass.ShowFilterEditBoxHistory = function (
  this: DropdownObject,
  filterBox: DropdownRowControl
): undefined {
  lib.preventerVars.suppressNextOnEntryMouseUpDisableCounter = undefined

  const selfVar = this
  const comboBox = asLsmCastGetUniqueNameThisUnknownStringUndefined(this.m_comboBox)
  if (comboBox !== undefined) {
    const comboBoxContainerName = comboBox.GetUniqueName()
    if (comboBoxContainerName === undefined || comboBoxContainerName === "") {
      return
    }
    const textSearchHistory = asLsmCastRecordStringStringUndefined(lib.SV.textSearchHistory)[
      comboBoxContainerName
    ]
    if (!ZO_IsTableEmpty(asObject(textSearchHistory))) {
      this.wasTextSearchContextMenuEntryClicked = undefined
      ClearMenu()
      for (const [idx, textSearched] of ipairs(asLsmCastString(textSearchHistory))) {
        if (textSearched !== "") {
          AddMenuItem(tos(idx) + ". " + textSearched, function (this: void): undefined {
            setTextSearchEditBoxText(selfVar, filterBox, textSearched)
          })
        }
      }
      if (LibCustomMenu) {
        AddCustomMenuItem("-")
      }
      AddMenuItem(
        "- " + GetString(SI_STATS_CLEAR_ALL_ATTRIBUTES_BUTTON) + " - ",
        function (this: void): undefined {
          clearTextSearchHistory(selfVar, comboBoxContainerName)
        }
      )

      preventCustomScrollableContextMenuHide =
        preventCustomScrollableContextMenuHide ?? PreventCustomScrollableContextMenuHide
      preventCustomScrollableContextMenuHide()
      ShowMenu(asObject(filterBox))
      ZO_Tooltips_HideTextTooltip()
    }
  }
}

dropdownClass.OnFilterEditBoxMouseUp = function (
  this: DropdownObject,
  filterBox: DropdownRowControl,
  button: number,
  upInside: boolean,
  _ctrl?: unknown,
  _alt?: unknown,
  _shift?: unknown
): undefined {
  ZO_Tooltips_HideTextTooltip()
  if (!upInside || button !== MOUSE_BUTTON_INDEX_RIGHT) {
    return
  }

  this.ShowFilterEditBoxHistory(filterBox)
}

dropdownClass.ResetFilters = function (
  this: DropdownObject,
  owningWindow: { filterBox?: DropdownRowControl } | undefined
): undefined {
  const comboBox = asLsmCastIsContextMenuBooleanUndefined(this.m_comboBox)
  if (comboBox !== undefined) {
    if (!comboBox.isContextMenu) {
      clearCustomScrollableMenu = clearCustomScrollableMenu ?? ClearCustomScrollableMenu
      clearCustomScrollableMenu()
    }
  }

  ZO_Tooltips_HideTextTooltip()
  if (!owningWindow || !owningWindow.filterBox) {
    return
  }
  asLsmCastSetTextThisUnknownTextStringUndefined(owningWindow.filterBox).SetText("")
}

dropdownClass.IsFilterEnabled = function (this: DropdownObject): unknown {
  if (this.m_comboBox) {
    return asLsmCastIsFilterEnabledThisUnknownUnknown(this.m_comboBox).IsFilterEnabled()
  }
}

dropdownClass.Sort = function (
  this: DropdownObject,
  _owningWindow: unknown,
  sortUp?: boolean
): undefined {
  ZO_Tooltips_HideTextTooltip()

  const comboBox = asLsmCastIsContextMenuBooleanMSortOrderNumberSetSortsI(this.m_comboBox)
  if (comboBox !== undefined) {
    if (!comboBox.isContextMenu) {
      clearCustomScrollableMenu = clearCustomScrollableMenu ?? ClearCustomScrollableMenu
      clearCustomScrollableMenu()
    }
    if (sortUp === undefined) {
      sortUp = true
    }
    comboBox.m_sortOrder = asNumber((sortUp && ZO_SORT_ORDER_UP) || ZO_SORT_ORDER_DOWN)
    comboBox.SetSortsItems(true)
    comboBox.UpdateItems(true)
  }
}

dropdownClass.IsSortEnabled = function (this: DropdownObject): unknown {
  const comboBox = asLsmCastIsSortEnabledThisUnknownUnknownUndefined(this.m_comboBox)
  if (comboBox) {
    return comboBox.IsSortEnabled()
  }
}

dropdownClass.ApplyCustomSortButtonsData = function (this: DropdownObject): unknown {
  d(debugPrefix + "dropdownClass:ApplyCustomSortButtonsData")
  const comboBox = asLsmCastApplyCustomSortButtonsDataThisUnknownUnknownUn(this.m_comboBox)
  if (comboBox) {
    return comboBox.ApplyCustomSortButtonsData()
  }
}

dropdownClass.ShowTextTooltip = function (
  this: DropdownObject,
  control: DropdownRowControl,
  side: unknown,
  tooltipText: unknown,
  owningWindow?: { filterBox?: DropdownRowControl }
): undefined {
  ZO_Tooltips_HideTextTooltip()
  if (
    !asLsmCastIsHiddenThisUnknownBoolean(ZO_Menu).IsHidden() ||
    tooltipText === undefined ||
    tooltipText === ""
  ) {
    return
  }
  if (owningWindow === undefined && control.GetOwningWindow !== undefined) {
    owningWindow = asLsmCastFilterBoxDropdownRowControl(control.GetOwningWindow())
  }
  if (owningWindow !== undefined) {
    const searchFilterTextBox = owningWindow.filterBox
    if (
      searchFilterTextBox !== undefined &&
      control === searchFilterTextBox &&
      control.HasFocus()
    ) {
      return
    }
  }
  ZO_Tooltips_ShowTextTooltip(asControl(control), asNumber(side), asString(tooltipText))
  InformationTooltipTopLevel.BringWindowToTop()
}

dropdownClass.OnEditBoxTextChanged = function (
  this: DropdownObject,
  editBox: DropdownRowControl
): undefined {
  ZO_Tooltips_HideTextTooltip()
  const selfVar = this
  if (selfVar.m_comboBox && editBox) {
    const callbackFunc = asLsmCastCallbackThisVoidComboBoxUnknownEditBoxUnknownT(editBox).callback
    if (callbackFunc === undefined) {
      return
    }

    const self = this
    throttledCall(
      function (this: void): undefined {
        const text = asLsmCastGetTextThisUnknownString(editBox).GetText()
        callbackFunc(selfVar.m_comboBox, editBox, text)
        self.SubmenuOrCurrentListRefresh(editBox)
      },
      250,
      THROTTLED_CALL_DROPDOWN_CLASS_ON_TEXT_CHANGED_STRING_SUFFIX
    )
  }
}

dropdownClass.OnSliderValueChanged = function (
  this: DropdownObject,
  slider: DropdownRowControl
): undefined {
  ZO_Tooltips_HideTextTooltip()
  const selfVar = this
  if (selfVar.m_comboBox && slider) {
    const callbackFunc = asLsmCastCallbackThisVoidComboBoxUnknownSliderUnknownVa(slider).callback
    if (callbackFunc === undefined) {
      return
    }

    const self = this
    throttledCall(
      function (this: void): undefined {
        const value = asLsmCastGetValueThisUnknownNumber(slider).GetValue()
        callbackFunc(selfVar.m_comboBox, slider, value)
        self.SubmenuOrCurrentListRefresh(slider)
      },
      250,
      THROTTLED_CALL_DROPDOWN_CLASS_ON_VALUE_CHANGED_STRING_SUFFIX
    )
  }
}

dropdownClass.ToggleHeader = function (
  this: DropdownObject,
  toggleButtonControl: Control
): undefined {
  ZO_Tooltips_HideTextTooltip()
  ZO_CheckButton_OnClicked(toggleButtonControl)
}
