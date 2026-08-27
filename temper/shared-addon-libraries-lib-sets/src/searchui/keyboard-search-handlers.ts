import { asGlobalTable } from "../casts"
import { asLibSetsSearchUIKeyboardObjectOpt } from "./casts"
import { getKeyboardSearchUIClass } from "./keyboard-class"
import {
  getKeyboardSearchUI,
  getSharedBringWindowToTop,
  setKeyboardSearchUI,
} from "./searchui-globals"

const globalTable = asGlobalTable(globalThis)

let currentWidth: number | undefined
let currentHeight: number | undefined
let updateListColumnWithCounter = 0

function LibSets_SearchUI_Keyboard_TopLevel_OnResize(
  this: void,
  selfControl: SearchUIControl,
  resizeStart: boolean,
  forceResizeNow?: boolean
): undefined {
  ZO_Tooltips_HideTextTooltip()
  getSharedBringWindowToTop()()
  const libSetsSearchUIKeyboardObject = asLibSetsSearchUIKeyboardObjectOpt(selfControl._object)
  if (libSetsSearchUIKeyboardObject === undefined) {
    return
  }
  if (resizeStart) {
    const [w, h] = selfControl.GetDimensions()
    currentWidth = w
    currentHeight = h
    libSetsSearchUIKeyboardObject.resultsList.updateListColumnWith = undefined
  } else {
    const [newWidth, newHeight] = selfControl.GetDimensions()
    if (
      forceResizeNow === true ||
      (currentWidth !== undefined && currentWidth !== newWidth) ||
      (newHeight !== undefined && newHeight !== currentHeight)
    ) {
      libSetsSearchUIKeyboardObject.SaveSearchUIPositionAndSize(selfControl)
      libSetsSearchUIKeyboardObject.SetMultiSelectDropdownDimensionConstraints()
      updateListColumnWithCounter += 1
      libSetsSearchUIKeyboardObject.resultsList.updateListColumnWith = updateListColumnWithCounter

      ZO_ScrollList_Commit(libSetsSearchUIKeyboardObject.resultsListControl)
    }
    currentWidth = undefined
    currentHeight = undefined
  }
}

function LibSets_SearchUI_Keyboard_TopLevel_OnMove(
  this: void,
  selfControl: SearchUIControl,
  moveStart: boolean
): undefined {
  ZO_Tooltips_HideTextTooltip()
  getSharedBringWindowToTop()()
  const libSetsSearchUIKeyboardObject = asLibSetsSearchUIKeyboardObjectOpt(selfControl._object)
  if (!moveStart && libSetsSearchUIKeyboardObject !== undefined) {
    libSetsSearchUIKeyboardObject.SaveSearchUIPositionAndSize(selfControl)
  }
}

function LibSets_SearchUI_Keyboard_TopLevel_OnInitialized(
  this: void,
  selfControl: SearchUIControl
): undefined {
  if (getKeyboardSearchUI() !== undefined) {
    return
  }
  setKeyboardSearchUI(getKeyboardSearchUIClass().New(selfControl))
}

globalTable.LibSets_SearchUI_Keyboard_TopLevel_OnResize =
  LibSets_SearchUI_Keyboard_TopLevel_OnResize
globalTable.LibSets_SearchUI_Keyboard_TopLevel_OnMove = LibSets_SearchUI_Keyboard_TopLevel_OnMove
globalTable.LibSets_SearchUI_Keyboard_TopLevel_OnInitialized =
  LibSets_SearchUI_Keyboard_TopLevel_OnInitialized
