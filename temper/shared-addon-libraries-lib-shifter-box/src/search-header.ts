import { asControl } from "./casts"
import { refreshFilters } from "./helpers"
import type { ShifterBox, ShifterBoxList } from "./types"

export function onSearchHeaderEditBoxReturnKey(
  shifterBox: ShifterBox | undefined,
  listObj: ShifterBoxList | undefined,
  editBoxCtrl: EditControl | undefined
): undefined {
  if (shifterBox === undefined || listObj === undefined || editBoxCtrl === undefined) return
  if (listObj.searchStr === undefined) return
  refreshFilters(listObj, undefined, false)
}

export function onSearchHeaderEditBoxTextChanged(
  shifterBox: ShifterBox | undefined,
  listObj: ShifterBoxList | undefined,
  editBoxCtrl: EditControl | undefined,
  _textData?: unknown
): undefined {
  if (shifterBox === undefined || listObj === undefined || editBoxCtrl === undefined) return
  const searchStr = editBoxCtrl.GetText()
  listObj.searchStr = searchStr
}

export function toggleSearchHeaderUI(
  _shifterBox: ShifterBox,
  listObj: ShifterBoxList,
  _searchButtonCtrl: Control
): undefined {
  const currentState = listObj.isSearchHeaderUIShown
  const newState = !currentState
  const searchHeaderUIControl = listObj.searchHeaderUI
  searchHeaderUIControl.SetHidden(!newState)

  const sortHeaderGroup = listObj.sortHeaderGroup
  asControl(sortHeaderGroup.headerContainer.GetNamedChild("Arrow")).SetHidden(newState)
  asControl(sortHeaderGroup.headerContainer.GetNamedChild("Value")).SetHidden(newState)

  listObj.isSearchHeaderUIShown = newState
  if (newState === true) {
    listObj.searchHeaderUIEditBox.TakeFocus()
    listObj.searchHeaderUIEditBox.SelectAll()
  }
}

export function onSearchHeaderButtonClicked(
  shifterBox: ShifterBox | undefined,
  listObj: ShifterBoxList | undefined,
  buttonCtrl: Control | undefined
): undefined {
  if (shifterBox === undefined || listObj === undefined || buttonCtrl === undefined) return
  listObj.searchStr = undefined
  toggleSearchHeaderUI(shifterBox, listObj, buttonCtrl)
}
