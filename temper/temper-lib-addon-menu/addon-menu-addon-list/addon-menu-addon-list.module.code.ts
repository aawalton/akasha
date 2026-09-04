import {
  asAddonListData,
  asEsoHandler,
  asSelectableLabelControl,
  asSoundName,
} from "../addon-menu-casts/addon-menu-casts.module.code.ts"
import {
  ADDON_DATA_TYPE,
  RESELECTING_DURING_REBUILD,
} from "../addon-menu-constants/addon-menu-constants.module.code.ts"
import { ADDONS_FOR_LIST, lam, wm } from "../addon-menu-state/addon-menu-state.module.code.ts"
import type { AddonListData } from "../addon-menu-types/addon-menu-types.module.code.ts"

export function scrollDataIntoView(
  this: void,
  list: LamWidgetControl,
  data: AddonListData
): undefined {
  const targetIndex = data.sortIndex
  if (targetIndex === undefined) {
    return
  }

  const scrollbar = list.scrollbar
  if (scrollbar === undefined) {
    return
  }

  const [scrollMin, scrollMax] = scrollbar.GetMinMax()
  const scrollTop = scrollbar.GetValue()
  const controlHeight = list.uniformControlHeight ?? list.controlHeight ?? 0
  const targetMin = controlHeight * (targetIndex - 1) - 64

  if (targetMin < scrollTop) {
    ZO_ScrollList_ScrollAbsolute(list, zo_max(targetMin, scrollMin))
  } else {
    const listHeight = ZO_ScrollList_GetHeight(list)
    const targetMax = controlHeight * targetIndex + 64 - listHeight

    if (targetMax > scrollTop) {
      ZO_ScrollList_ScrollAbsolute(list, zo_min(targetMax, scrollMax))
    }
  }
}

function parseLuaCapture(this: void, captured: unknown): string | undefined {
  return typeof captured === "string" ? captured : undefined
}

export function getSearchFilterFunc(
  this: void,
  searchEdit: EditControl
): ((this: void, data: AddonListData) => boolean) | undefined {
  const text = searchEdit.GetText().toLowerCase()
  const [rawMatched] = string.match(text, "(%S+.-)%s*$")
  const matched = parseLuaCapture(rawMatched)

  if (matched === undefined) {
    return undefined
  }

  const [escaped] = string.gsub(matched, "[-*+?^$().[%]%%]", "%%%0")

  const [pattern] = string.gsub(escaped, "%s+", ".-")

  return function (this: void, data: AddonListData): boolean {
    const [found] = string.find(data.filterText.toLowerCase(), pattern)
    return found !== undefined
  }
}

export function populateAddonList(
  this: void,
  addonList: Control,
  filter?: (this: void, data: AddonListData) => boolean
): undefined {
  const entryList = ZO_ScrollList_GetDataList<AddonListData>(addonList)
  let numEntries = 0
  let selectedData: AddonListData | undefined
  let selectionIsFinal = false

  ZO_ScrollList_Clear(addonList)

  for (const data of ADDONS_FOR_LIST) {
    if (filter === undefined || filter(data)) {
      const dataEntry = ZO_ScrollList_CreateDataEntry(ADDON_DATA_TYPE, data)
      numEntries = numEntries + 1
      data.sortIndex = numEntries
      if (entryList !== undefined) {
        entryList[numEntries - 1] = dataEntry
      }
      if (
        selectedData === undefined ||
        data.panel === lam.pendingAddonPanel ||
        data.panel === lam.currentAddonPanel
      ) {
        if (!selectionIsFinal) {
          selectedData = data
        }
        if (data.panel === lam.pendingAddonPanel) {
          lam.pendingAddonPanel = undefined
          selectionIsFinal = true
        }
      }
    } else {
      data.sortIndex = undefined
    }
  }

  ZO_ScrollList_Commit(addonList)

  if (selectedData !== undefined) {
    if (selectedData.panel === lam.currentAddonPanel) {
      ZO_ScrollList_SelectData(addonList, selectedData, undefined, RESELECTING_DURING_REBUILD)
    } else {
      ZO_ScrollList_SelectData(addonList, selectedData, undefined)
    }
    scrollDataIntoView(addonList, selectedData)
  }
}

export function createAddonList(this: void, name: string, parent: Control): Control {
  const addonList = wm.CreateControlFromVirtual(name, parent, "ZO_ScrollList")

  function addonListRowOnMouseDown(this: void, control: Control, button: number): undefined {
    if (button === 1) {
      const data = ZO_ScrollList_GetData(control)
      ZO_ScrollList_SelectData(addonList, data, control)
    }
  }

  function addonListRowSelect(
    this: void,
    previouslySelectedData: unknown,
    selectedData: unknown,
    reselectingDuringRebuild?: boolean
  ): undefined {
    if (!reselectingDuringRebuild) {
      if (previouslySelectedData !== undefined) {
        asAddonListData(previouslySelectedData).panel.SetHidden(true)
      }
      if (selectedData !== undefined) {
        asAddonListData(selectedData).panel.SetHidden(false)
        PlaySound(asSoundName(SOUNDS.TREE_SUBCATEGORY_CLICK))
      }
    }
  }

  function addonListRowSetup(
    this: void,
    control: SelectableLabelControl,
    data: AddonListData
  ): undefined {
    control.SetText(data.name)
    control.SetSelected(!data.panel.IsHidden())
  }

  ZO_ScrollList_AddDataType<AddonListData, SelectableLabelControl>(
    addonList,
    ADDON_DATA_TYPE,
    "ZO_SelectableLabel",
    28,
    addonListRowSetup
  )
  ZO_ScrollList_EnableSelection(addonList, "ZO_ThinListHighlight", asEsoHandler(addonListRowSelect))

  const addonDataType = assert(ZO_ScrollList_GetDataTypeTable(addonList, ADDON_DATA_TYPE))
  const addonListRowCreateRaw = addonDataType.pool.m_Factory

  function addonListRowCreate(this: void, pool: typeof addonDataType.pool): Control {
    const control = asSelectableLabelControl(addonListRowCreateRaw(pool))
    control.SetHandler("OnMouseDown", asEsoHandler(addonListRowOnMouseDown))
    control.SetHeight(28)
    control.SetFont("ZoFontHeader")
    control.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    control.SetVerticalAlignment(TEXT_ALIGN_CENTER)
    control.SetWrapMode(TEXT_WRAP_MODE_ELLIPSIS)
    return control
  }

  addonDataType.pool.m_Factory = addonListRowCreate

  return addonList
}

export function createSearchFilterBox(this: void, name: string, parent: Control): Control {
  const boxControl = wm.CreateControl(name, parent, CT_CONTROL)

  const srchButton = wm.CreateControl("$(parent)Button", boxControl, CT_BUTTON)
  srchButton.SetDimensions(32, 32)
  srchButton.SetAnchor(LEFT, undefined, LEFT, 2, 0)
  srchButton.SetNormalTexture("EsoUI/Art/LFG/LFG_tabIcon_groupTools_up.dds")
  srchButton.SetPressedTexture("EsoUI/Art/LFG/LFG_tabIcon_groupTools_down.dds")
  srchButton.SetMouseOverTexture("EsoUI/Art/LFG/LFG_tabIcon_groupTools_over.dds")

  const srchEdit = wm.CreateControlFromVirtual<EditControl>(
    "$(parent)Edit",
    boxControl,
    "ZO_DefaultEdit"
  )
  srchEdit.SetAnchor(LEFT, srchButton, RIGHT, 4, 1)
  srchEdit.SetAnchor(RIGHT, undefined, RIGHT, -4, 1)
  const [nr, ng, nb, na] = ZO_NORMAL_TEXT.UnpackRGBA()
  srchEdit.SetColor(nr, ng, nb, na)

  const srchBg = wm.CreateControl("$(parent)Bg", boxControl, CT_BACKDROP)
  srchBg.SetAnchorFill()
  srchBg.SetAlpha(0)
  srchBg.SetCenterColor(0, 0, 0, 0.5)
  const [dr, dg, db, da] = ZO_DISABLED_TEXT.UnpackRGBA()
  srchBg.SetEdgeColor(dr, dg, db, da)
  srchBg.SetEdgeTexture("", 1, 1, 0, 0)

  let srchActive = false
  let srchHover = false

  function srchBgUpdateAlpha(this: void): undefined {
    if (srchActive || srchEdit.HasFocus()) {
      srchBg.SetAlpha(srchHover ? 0.8 : 0.6)
    } else {
      srchBg.SetAlpha(srchHover ? 0.6 : 0.0)
    }
  }

  function srchMouseEnter(this: void): undefined {
    srchHover = true
    srchBgUpdateAlpha()
  }

  function srchMouseExit(this: void): undefined {
    srchHover = false
    srchBgUpdateAlpha()
  }

  boxControl.SetMouseEnabled(true)
  boxControl.SetHitInsets(1, 1, -1, -1)
  boxControl.SetHandler("OnMouseEnter", srchMouseEnter)
  boxControl.SetHandler("OnMouseExit", srchMouseExit)

  srchButton.SetHandler("OnMouseEnter", srchMouseEnter)
  srchButton.SetHandler("OnMouseExit", srchMouseExit)

  let focusLostTime = 0

  srchButton.SetHandler("OnClicked", function (this: void): undefined {
    srchEdit.Clear()
    if (GetFrameTimeMilliseconds() - focusLostTime < 100) {
      srchEdit.TakeFocus()
    }
  })

  srchEdit.SetHandler("OnMouseEnter", srchMouseEnter)
  srchEdit.SetHandler("OnMouseExit", srchMouseExit)
  srchEdit.SetHandler("OnFocusGained", srchBgUpdateAlpha)

  srchEdit.SetHandler("OnFocusLost", function (this: void): undefined {
    focusLostTime = GetFrameTimeMilliseconds()
    srchBgUpdateAlpha()
  })

  srchEdit.SetHandler("OnEscape", function (this: void): undefined {
    srchEdit.Clear()
    srchEdit.LoseFocus()
  })

  srchEdit.SetHandler("OnTextChanged", function (this: void): undefined {
    const filterFunc = getSearchFilterFunc(srchEdit)
    if (filterFunc !== undefined) {
      srchActive = true
      const [sr, sg, sb, sa] = ZO_SECOND_CONTRAST_TEXT.UnpackRGBA()
      srchBg.SetEdgeColor(sr, sg, sb, sa)
      srchButton.SetState(BSTATE_PRESSED)
    } else {
      srchActive = false
      const [er, eg, eb, ea] = ZO_DISABLED_TEXT.UnpackRGBA()
      srchBg.SetEdgeColor(er, eg, eb, ea)
      srchButton.SetState(BSTATE_NORMAL)
    }
    srchBgUpdateAlpha()
    if (lam.addonList !== undefined) {
      populateAddonList(lam.addonList, filterFunc)
    }
    PlaySound(asSoundName(SOUNDS.SPINNER_DOWN))
  })

  return boxControl
}
