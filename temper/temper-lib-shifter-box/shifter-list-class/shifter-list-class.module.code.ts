import {
  asButtonControl,
  asControl,
  asEditControl,
  asNumber,
  asScrollDataEntry,
  asScrollDataList,
  asTableKey,
} from "../shifter-casts/shifter-casts.module.code.ts"
import {
  DATA_DEFAULT_CATEGORY,
  DATA_TYPE_DEFAULT,
} from "../shifter-constants/shifter-constants.module.code.ts"
import {
  fireCallback,
  getShallowClonedTable,
  getValueOrCallback,
} from "../shifter-helpers/shifter-helpers.module.code.ts"
import {
  onSearchHeaderButtonClicked,
  onSearchHeaderEditBoxReturnKey,
  onSearchHeaderEditBoxTextChanged,
} from "../shifter-search-header/shifter-search-header.module.code.ts"
import { lib } from "../shifter-state/shifter-state.module.code.ts"
import type {
  RowData,
  ShifterBox,
  ShifterBoxList,
  ShifterBoxListClass,
} from "../shifter-types/shifter-types.module.code.ts"

export const ShifterBoxListProto = ZO_SortFilterList.Subclass<ShifterBoxListClass>()

ShifterBoxListProto.SORT_KEYS = {
  value: {},
  key: { tiebreaker: "value" },
}

ShifterBoxListProto.New = function (
  this: ShifterBoxListClass,
  shifterBox: ShifterBox,
  control: Control,
  isLeftList: boolean
): ShifterBoxList {
  const shifterBoxSettings = shifterBox.shifterBoxSettings
  const listObj = ZO_SortFilterList.New<ShifterBoxList>(
    this,
    control,
    shifterBoxSettings,
    isLeftList,
    shifterBox
  )

  listObj.buttonControl = asButtonControl(control.GetNamedChild("Button"))
  listObj.buttonAllControl = asButtonControl(control.GetNamedChild("AllButton"))
  listObj.buttonAllControl.SetState(BSTATE_DISABLED, true)
  if (shifterBoxSettings.showMoveAllButtons === false) {
    listObj.buttonAllControl.SetHidden(true)
  }
  const searchEnabled = shifterBoxSettings.search.enabled
  const searchEnabledTruthy = searchEnabled !== false
  listObj.searchHeaderUI = asControl(control.GetNamedChild("HeadersSearchUI"))
  listObj.searchHeaderUIEditBox = asEditControl(listObj.searchHeaderUI.GetNamedChild("Box"))
  listObj.buttonSearchControl = asButtonControl(control.GetNamedChild("HeadersSearchButton"))
  listObj.buttonSearchControl.SetAlpha(0.5)
  listObj.buttonSearchControl.SetState(
    searchEnabledTruthy ? BSTATE_NORMAL : BSTATE_DISABLED,
    !searchEnabledTruthy
  )
  listObj.buttonSearchControl.SetHidden(!searchEnabledTruthy)
  listObj.buttonSearchControl.SetHandler("OnClicked", (...args: unknown[]) => {
    onSearchHeaderButtonClicked(shifterBox, listObj, asControl(args[0]))
  })
  listObj.buttonSearchControl.SetHandler("OnMouseEnter", (...args: unknown[]) => {
    const buttonCtrl = asControl(args[0])
    ZO_Tooltips_HideTextTooltip()
    let tooltipText: string | undefined
    if (listObj.searchHeaderUIEditBox.IsHidden()) {
      buttonCtrl.SetAlpha(1)
      buttonCtrl.SetDimensions(32, 32)

      tooltipText = GetString(SI_SEARCH_FILTER_BY)
      const currentText = listObj.searchHeaderUIEditBox.GetText()
      if (currentText !== "") {
        tooltipText = `${tooltipText}\n|c00FF00${GetString(SI_COLOR_PICKER_CURRENT)}|r: ${currentText}`
      }
    }
    const scrollData = asScrollDataList(ZO_ScrollList_GetDataList(listObj.list))
    if (tooltipText === undefined) {
      tooltipText = `#${tostring(scrollData.length)}`
    } else {
      tooltipText = `${tooltipText}\n#${tostring(scrollData.length)}`
    }
    ZO_Tooltips_ShowTextTooltip(buttonCtrl, TOP, tooltipText)
  })
  listObj.buttonSearchControl.SetHandler("OnMouseExit", (...args: unknown[]) => {
    const buttonCtrl = asControl(args[0])
    ZO_Tooltips_HideTextTooltip()
    if (listObj.searchHeaderUIEditBox.IsHidden()) {
      const currentText = listObj.searchHeaderUIEditBox.GetText()
      if (currentText === "") {
        buttonCtrl.SetAlpha(0.5)
        buttonCtrl.SetDimensions(28, 28)
      }
    }
  })
  listObj.searchHeaderUI.SetHidden(true)
  listObj.isSearchHeaderUIShown = false
  listObj.searchStr = undefined
  listObj.searchHeaderUIEditBox.SetHandler("OnTextChanged", (...args: unknown[]) => {
    onSearchHeaderEditBoxTextChanged(shifterBox, listObj, asEditControl(args[0]))
  })
  listObj.searchHeaderUIEditBox.SetHandler("OnEnter", (...args: unknown[]) => {
    onSearchHeaderEditBoxReturnKey(shifterBox, listObj, asEditControl(args[0]))
  })

  listObj.enabled = true
  listObj.masterList = new LuaTable()

  listObj.shifterBox = shifterBox
  return listObj
}

ShifterBoxListProto.OnSelectionChanged = function (
  this: ShifterBoxList,
  _previouslySelectedData?: unknown,
  _selectedData?: unknown,
  _reselectingDuringRebuild?: boolean
): undefined {
  const selectedMultiData = getShallowClonedTable(this.list.selectedMultiData)
  if (selectedMultiData !== undefined) {
    const count = NonContiguousCount(selectedMultiData)
    if (count > 0 && this.enabled) {
      this.buttonControl.SetState(BSTATE_NORMAL, false)
    } else {
      this.buttonControl.SetState(BSTATE_DISABLED, true)
    }
  }
}

ShifterBoxListProto.Initialize = function (
  this: ShifterBoxList,
  control: Control,
  shifterBoxSettings,
  isLeftList: boolean,
  shifterBox: ShifterBox
): undefined {
  this.shifterBoxSettings = shifterBoxSettings

  const listBoxSettings = isLeftList ? shifterBoxSettings.leftList : shifterBoxSettings.rightList
  this.listBoxSettings = listBoxSettings

  this.isLeftList = isLeftList
  this.rowHeight = listBoxSettings.rowHeight
  this.rowWidth = 180
  ZO_SortFilterList.Initialize(this, control)
  this.SetEmptyText(listBoxSettings.emptyListText)
  if (this.shifterBoxSettings.sortEnabled) {
    this.sortHeaderGroup.SelectHeaderByKey("value")
    ZO_SortHeader_OnMouseExit(
      asControl(asControl(this.control.GetNamedChild("Headers")).GetNamedChild("Value"))
    )
  } else {
    asControl(this.sortHeaderGroup.headerContainer.GetNamedChild("Arrow")).SetHidden(true)
    asControl(this.sortHeaderGroup.headerContainer.GetNamedChild("Value")).SetMouseEnabled(false)
  }
  ZO_ScrollList_AddCategory(this.list, DATA_DEFAULT_CATEGORY)

  const additionalDataCallbackFunc = listBoxSettings.rowSetupAdditionalDataCallback
  const standardSetupCallback = (
    rowControl: Control,
    data: RowData,
    doNotSetupRowNow?: boolean
  ): undefined => {
    let dataTabEnriched = data
    let targetRowControl = rowControl
    if (additionalDataCallbackFunc !== undefined) {
      const [enrichedControl, enrichedData] = additionalDataCallbackFunc(rowControl, data)
      targetRowControl = enrichedControl
      dataTabEnriched = enrichedData
    }
    this.SetupRowEntry(targetRowControl, dataTabEnriched, doNotSetupRowNow)
  }
  let setupCallbackFunc: (
    this: void,
    rowControl: Control,
    data: RowData,
    doNotSetupRowNow?: boolean
  ) => void = standardSetupCallback
  if (listBoxSettings.rowSetupCallback !== undefined) {
    const rowSetupCallback = listBoxSettings.rowSetupCallback
    setupCallbackFunc = (rowControl: Control, data: RowData): undefined => {
      standardSetupCallback(rowControl, data, true)
      rowSetupCallback(rowControl, data)
      ZO_SortFilterList.SetupRow(this, rowControl, data)
    }
  }
  const hideCallbackFunc = listBoxSettings.rowHideCallback
  const dataTypeSelectSound = listBoxSettings.rowDataTypeSelectSound
  const resetControlCallback = listBoxSettings.rowResetControlCallback
  ZO_ScrollList_AddDataType(
    this.list,
    DATA_TYPE_DEFAULT,
    listBoxSettings.rowTemplateName,
    listBoxSettings.rowHeight,
    setupCallbackFunc,
    hideCallbackFunc,
    dataTypeSelectSound,
    resetControlCallback
  )
  ZO_ScrollList_EnableSelection(this.list, "ZO_ThinListHighlight", (..._args: unknown[]) => {
    this.OnSelectionChanged()
  })
  this.sortFunction = (listEntry1: unknown, listEntry2: unknown): boolean =>
    ZO_TableOrderingFunction(
      asScrollDataEntry(listEntry1).data,
      asScrollDataEntry(listEntry2).data,
      this.shifterBoxSettings.sortBy,
      ShifterBoxListProto.SORT_KEYS,
      this.currentSortOrder
    )
  this.RefreshData()

  this.list.SetHandler("OnReceiveDrag", (...args: unknown[]) => {
    this.StopDragging(asControl(args[0]))
  })
  this.list.SetMouseEnabled(true)

  if (this.listBoxSettings.callbackRegister !== undefined) {
    for (const [shifterBoxEventId, callbackFunc] of pairs(listBoxSettings.callbackRegister)) {
      shifterBox.RegisterCallback(asNumber(shifterBoxEventId), callbackFunc)
    }
  }
  fireCallback(
    shifterBox,
    control,
    isLeftList ? lib.EVENT_LEFT_LIST_CREATED : lib.EVENT_RIGHT_LIST_CREATED,
    shifterBox
  )
}

ShifterBoxListProto.BuildMasterList = function (this: ShifterBoxList): undefined {}

ShifterBoxListProto.FilterScrollList = function (this: ShifterBoxList): undefined {
  const shifterBoxSettings = this.shifterBoxSettings
  const searchSettings = shifterBoxSettings.search
  let searchEnabled =
    this.searchStr !== undefined && getValueOrCallback(searchSettings.enabled, searchSettings)
  const searchFunc = searchEnabled ? searchSettings.searchFunc : undefined
  if (type(searchFunc) !== "function") {
    searchEnabled = false
  }

  let hasAtLeastOneEntry = false
  const scrollData = asScrollDataList(ZO_ScrollList_GetDataList(this.list))
  ZO_ClearNumericallyIndexedTable(scrollData)
  if (this.masterList !== undefined) {
    const categories = this.list.categories
    for (const [key, data] of pairs(this.masterList)) {
      const category =
        data.categoryId === undefined ? undefined : categories.get(asTableKey(data.categoryId))
      if (category === undefined || category.hidden === false) {
        const rowData: RowData = {
          key,
          value: data.value,
        }
        if (
          !searchEnabled ||
          (searchEnabled && searchFunc?.(this, data, this.searchStr ?? "")) === true
        ) {
          scrollData.push(
            asScrollDataEntry(
              ZO_ScrollList_CreateDataEntry(
                DATA_TYPE_DEFAULT,
                rowData,
                data.categoryId ?? DATA_DEFAULT_CATEGORY
              )
            )
          )
          hasAtLeastOneEntry = true
        }
      } else {
        if (this.list.selectedMultiData !== undefined) {
          this.list.selectedMultiData.delete(asTableKey(key))
        }
      }
    }
  }
  if (hasAtLeastOneEntry && this.enabled) {
    this.buttonAllControl.SetState(BSTATE_NORMAL, false)
    this.OnSelectionChanged()
  } else {
    if (this.buttonControl !== undefined) {
      this.buttonControl.SetState(BSTATE_DISABLED, true)
    }
    if (this.buttonAllControl !== undefined) {
      this.buttonAllControl.SetState(BSTATE_DISABLED, true)
    }
  }
}

ShifterBoxListProto.SortScrollList = function (this: ShifterBoxList): undefined {
  const shifterBoxSettings = this.shifterBoxSettings
  if (shifterBoxSettings.sortEnabled) {
    const scrollData = asScrollDataList(ZO_ScrollList_GetDataList(this.list))
    table.sort(scrollData, this.sortFunction)
  }
}
