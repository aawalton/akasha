import {
  asControl,
  asDropdownClassPrivate,
  asDropdownComboBox,
  asDropdownObject,
  asDropdownRowControl,
  asEventManagerLike,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastDropdownClassPrivateAddEntryToScrollList,
  asLsmCastDropdownClassPrivateRunHandler,
  asLsmCastGetItemFontObjectThisUnknownItemUnknownUnknown,
} from "../scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import {
  asLsmCastRecordStringString,
  asLsmCastRecordStringUnknown,
  asLsmCastRecordStringUnknownUnknown2,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastSetupAsScrollListDataEntryThisUnknownEntryType,
  asLsmCastThisVoidArgsUnknownUndefined,
} from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import { asLsmCastThisVoidControlUnknownAltUnknownString } from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asNumber,
  asString,
  asZoEntryDataInstance,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidArgsUnknownUndefined(libDebug.DebugLog)

const tos = tostring
const sfor = string.format

const MAJOR = lib.name

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)
const handlerNameConstants = asLsmCastRecordStringString(constants.handlerNames)
const submenuConstants = asLsmCastRecordStringUnknown(constants.submenu)

const getControlName = asLsmCastThisVoidControlUnknownAltUnknownString(lib.Util.getControlName)
const classes = asLsmCastRecordStringUnknown(lib.classes)
const dropdownClassPrivate = asDropdownClassPrivate(classes.dropdownClassPrivate)

const EM = asEventManagerLike(GetEventManager())

function clearTimeout(this: void): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 7)
  }
  EM.UnregisterForUpdate(asString(handlerNameConstants.dropdownCallLaterHandle))
}
dropdownClassPrivate.clearTimeout = clearTimeout

function setTimeout(this: void, callback?: (this: void) => undefined): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 8)
  }
  clearTimeout()
  EM.RegisterForUpdate(
    asString(handlerNameConstants.dropdownCallLaterHandle),
    asNumber(submenuConstants.SUBMENU_SHOW_TIMEOUT),
    function (this: void): undefined {
      if (libDebug.doDebug) {
        dlog(libDebug.LSM_LOGTYPE_VERBOSE, 9, tos(submenuConstants.SUBMENU_SHOW_TIMEOUT))
      }
      clearTimeout()
      if (callback) {
        callback()
      }
    }
  )
}
dropdownClassPrivate.setTimeout = setTimeout

function checkWhereToShowSubmenu(
  this: void,
  selfVar: DropdownObject
): LuaMultiReturn<[boolean, boolean]> {
  if (!selfVar.m_parentMenu) {
    return $multi(false, true)
  }

  let openSubmenuToSideForced = false
  let openToTheRight = true

  const submenuOpenToSide = selfVar.GetSubMenuOpeningSide()
  if (submenuOpenToSide !== undefined) {
    if (submenuOpenToSide === "right") {
      openToTheRight = true
      openSubmenuToSideForced = true
    } else if (submenuOpenToSide === "left") {
      openToTheRight = false
      openSubmenuToSideForced = true
    }
  }
  return $multi(openSubmenuToSideForced, openToTheRight)
}
dropdownClassPrivate.checkWhereToShowSubmenu = checkWhereToShowSubmenu

function poolControlReset(this: void, _selfVar: unknown, control: unknown): undefined {
  const ctrl = asDropdownRowControl(control)
  asControl(ctrl).SetHidden(true)

  if (ctrl.isSubmenu) {
    if (asDropdownComboBox(ctrl.m_owner).m_submenu) {
      asDropdownObject(asDropdownComboBox(ctrl.m_owner).m_submenu).HideDropdown()
    }
  }

  const button = ctrl.m_button
  if (button) {
    const buttonGroup = button.m_buttonGroup
    if (buttonGroup !== undefined) {
      buttonGroup.Remove(button)
    }
  }
}
dropdownClassPrivate.poolControlReset = poolControlReset

const LSM_ENTRY_TYPE_NORMAL = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_NORMAL)

type HandlerFn = (
  this: void,
  selfVar: DropdownObject,
  control: DropdownRowControl,
  data: Record<string, unknown>,
  ...rest: unknown[]
) => unknown

function runHandler(
  this: void,
  selfVar: DropdownObject,
  handlerTable: Record<number, HandlerFn>,
  control: DropdownRowControl,
  ...args: unknown[]
): unknown {
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      53,
      tos(getControlName(control)),
      tos(handlerTable),
      tos(control.typeId)
    )
  }
  const handler = handlerTable[asNumber(control.typeId)]
  if (handler) {
    return handler(selfVar, control, ...asLsmCastRecordStringUnknownUnknown2(args))
  }
  return false
}
dropdownClassPrivate.runHandler = asLsmCastDropdownClassPrivateRunHandler(runHandler)

function createScrollableComboBoxEntry(
  this: void,
  self: DropdownObject,
  item: unknown,
  index: number,
  entryType: number
): ZoEntryDataInstance {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 54, tos(index), tos(entryType))
  }
  const entryData = asLsmCastRecordStringUnknown(ZO_EntryData.New(item))
  entryData.m_index = index
  entryData.m_owner = self.owner
  entryData.m_dropdownObject = self
  asLsmCastSetupAsScrollListDataEntryThisUnknownEntryType(entryData).SetupAsScrollListDataEntry(
    entryType
  )
  return asZoEntryDataInstance(entryData)
}
dropdownClassPrivate.createScrollableComboBoxEntry = createScrollableComboBoxEntry

function addEntryToScrollList(
  this: void,
  self: DropdownObject,
  item: Record<string, unknown>,
  dataList: unknown[],
  index: number,
  allItemsHeight: number,
  largestEntryWidth: number,
  spacing: number,
  isLastEntry: boolean,
  _isNoItemsMatchFilter: boolean,
  _comboBoxObject: unknown
): LuaMultiReturn<[number, number]> {
  let entryHeight = ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT
  let entryType = LSM_ENTRY_TYPE_NORMAL
  let widthPadding = 0
  if (self.customEntryTemplateInfos && item.customEntryTemplate) {
    const templateInfo = self.customEntryTemplateInfos[asString(item.customEntryTemplate)]
    if (templateInfo) {
      entryType = templateInfo.typeId
      entryHeight = templateInfo.entryHeight
      widthPadding = templateInfo.widthPadding ?? 0

      const iconPadding = item.isNew || item.icon ? entryHeight : 0
      widthPadding = widthPadding + iconPadding
    }
  }

  if (isLastEntry) {
    entryType = entryType + 1
  } else {
    entryHeight = entryHeight + spacing
  }

  allItemsHeight = allItemsHeight + entryHeight

  const entry = createScrollableComboBoxEntry(self, item, index, entryType)
  dataList.push(entry)

  const fontObject = asLsmCastGetItemFontObjectThisUnknownItemUnknownUnknown(
    self.owner
  ).GetItemFontObject(item)
  const nameWidth =
    GetStringWidthScaled(
      asString(fontObject),
      asString(item.label || item.name),
      1,
      SPACE_INTERFACE
    ) + widthPadding
  if (nameWidth > largestEntryWidth) {
    largestEntryWidth = nameWidth
  }
  return $multi(allItemsHeight, largestEntryWidth)
}
dropdownClassPrivate.addEntryToScrollList =
  asLsmCastDropdownClassPrivateAddEntryToScrollList(addEntryToScrollList)

function getDropdownTemplate(
  this: void,
  enabled: unknown,
  baseTemplate: string,
  alternate: string,
  deflt: string
): string {
  baseTemplate = MAJOR + baseTemplate
  const templateName = sfor("%s%s", baseTemplate, enabled ? alternate : deflt)
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 2, tos(templateName))
  }
  return templateName
}

function getScrollContentsTemplate(this: void, barHidden: unknown): string {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 3, tos(barHidden))
  }
  return getDropdownTemplate(barHidden, "_ScrollContents", "_BarHidden", "_BarShown")
}
dropdownClassPrivate.getScrollContentsTemplate = getScrollContentsTemplate
