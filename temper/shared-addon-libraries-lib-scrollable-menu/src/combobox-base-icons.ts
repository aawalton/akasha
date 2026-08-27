import { asLsmCastArgsUnknownUndefined, asLsmCastBringWindowToTopThisUnknownUndefined } from "./casts-1a"
import { asLsmCastNumberUndefined, asLsmCastRecordNumberLsmTemplateData, asLsmCastRecordStringRecordStringUnknown, asLsmCastRecordStringRecordStringUnknownUndefined, asLsmCastRecordStringString, asLsmCastRecordStringUnknown, asLsmCastRecordStringUnknownUndefined, asLsmCastRecordStringUnknownUnknown } from "./casts-2b"
import { asLsmCastStringUndefined } from "./casts-3a"
import { asLsmCastThisVoidDataUnknownUndefined, asLsmCastThisVoidEntryUnknownComboBoxUnknownCallbackFnT, asLsmCastThisVoidIconPathStringWidthNumberStringHeightN, asLsmCastThisVoidItemRecordStringUnknownUndefined, asLsmCastThisVoidItemUnknownComboBoxUnknownUnknown, asLsmCastThisVoidItemUnknownCustomEntryTemplateUnknownU, asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd } from "./casts-3b"
import {
  asLsmCastUnknown,
  asLsmMultiIconControl,
  asLsmRowControl,
  asLsmTemplateData,
  asNumber,
  asObject,
  asString,
  asUnknown,
  asZoColorDef,
} from "./casts-4"

import { getValueOrCallback } from "./constants-core"
import { lib } from "./lib-state"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const tos = tostring

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)
const comboBoxConstants = asLsmCastRecordStringUnknown(constants.comboBox)
const comboBoxMappingConstants = asLsmCastRecordStringUnknown(comboBoxConstants.mapping)
const subTableConstants = asLsmCastRecordStringString(
  asLsmCastRecordStringUnknown(constants.data).subtables
)
const ST_LSM_DATA_SUBTABLE = asString(subTableConstants.LSM_DATA_SUBTABLE)
const ST_LSM_DATA_SUBTABLE_ORIGINAL_DATA = asString(
  subTableConstants.LSM_DATA_SUBTABLE_ORIGINAL_DATA
)
const ST_LSM_DATA_SUBTABLE_CALLBACK_FUNCTIONS = asString(
  subTableConstants.LSM_DATA_SUBTABLE_CALLBACK_FUNCTIONS
)

const classes = asLsmCastRecordStringUnknown(lib.classes)

const zo_iconTextFormatTinted =
  asLsmCastThisVoidIconPathStringWidthNumberStringHeightN(zo_iconTextFormat)
const textureConstants = asLsmCastRecordStringUnknown(constants.textures)
const narrationConstants = asLsmCastRecordStringUnknown(constants.narration)
const entryTypeDefaults = asLsmCastRecordStringUnknown(entryTypeConstants.defaults)

const libDivider = lib.DIVIDER
const WITHOUT_ICON_LABEL_DEFAULT_OFFSETX = asNumber(
  entryTypeDefaults.WITHOUT_ICON_LABEL_DEFAULT_OFFSETX
)
const iconNewIcon = asString(textureConstants.iconNewIcon)
const iconNarrationNewValue = asString(narrationConstants.iconNarrationNewValue)

const LSM_ENTRY_TYPE_SUBMENU = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_SUBMENU)
const LSM_ENTRY_TYPE_DIVIDER = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_DIVIDER)
const LSM_ENTRY_TYPE_HEADER = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_HEADER)

const zo_comboBox_setItemEntryCustomTemplate =
  asLsmCastThisVoidItemUnknownCustomEntryTemplateUnknownU(ZO_ComboBox.SetItemEntryCustomTemplate)

const libUtil = lib.Util
const recursiveOverEntries = asLsmCastThisVoidEntryUnknownComboBoxUnknownCallbackFnT(
  libUtil.recursiveOverEntries
)
const getIsNew = asLsmCastThisVoidItemUnknownComboBoxUnknownUnknown(libUtil.getIsNew)
const validateEntryType = asLsmCastThisVoidItemRecordStringUnknownUndefined(
  libUtil.validateEntryType
)
const updateDataByFunctions = asLsmCastThisVoidDataUnknownUndefined(libUtil.updateDataByFunctions)

function updateIcon(
  this: void,
  _control: LsmRowControl,
  data: Record<string, unknown>,
  iconIdx: number,
  singleIconDataOrTab: unknown,
  multiIconCtrl: LsmMultiIconControl,
  parentHeight: number
): LuaMultiReturn<[boolean, number, number]> {
  let iconValue: unknown
  const iconDataType = type(singleIconDataOrTab)
  let iconDataGotMoreParams = false
  if (iconDataType === "table") {
    const singleIconTab = asLsmCastRecordStringUnknownUnknown(singleIconDataOrTab)
    if (singleIconTab[1 - 1] !== undefined) {
      iconValue = getValueOrCallback(singleIconTab[1 - 1], data)
    } else {
      iconDataGotMoreParams = true
      iconValue = getValueOrCallback(asLsmCastRecordStringUnknown(singleIconTab).iconTexture, data)
    }
  } else {
    iconValue = getValueOrCallback(singleIconDataOrTab, data)
  }

  const isNewValue = getValueOrCallback(data.isNew, data)
  const visible = isNewValue === true || iconValue !== undefined

  let iconHeight = parentHeight
  let iconWidth = visible ? iconHeight : WITHOUT_ICON_LABEL_DEFAULT_OFFSETX

  if (visible === true) {
    const singleIconTab = asLsmCastRecordStringUnknown(singleIconDataOrTab)
    multiIconCtrl.data = multiIconCtrl.data || {}
    if (iconIdx === 1) {
      multiIconCtrl.data.tooltipText = undefined
    }

    if (iconDataGotMoreParams) {
      if (singleIconTab.width !== undefined) {
        iconWidth = zo_clamp(
          asNumber(getValueOrCallback(singleIconTab.width, data)),
          WITHOUT_ICON_LABEL_DEFAULT_OFFSETX,
          parentHeight
        )
      }
      if (singleIconTab.height !== undefined) {
        iconHeight = zo_clamp(
          asNumber(getValueOrCallback(singleIconTab.height, data)),
          WITHOUT_ICON_LABEL_DEFAULT_OFFSETX,
          parentHeight
        )
      }
    }

    if (isNewValue === true) {
      multiIconCtrl.AddIcon(iconNewIcon, undefined, iconNarrationNewValue)
      if (libDebug.doDebug) {
        dlog(libDebug.LSM_LOGTYPE_VERBOSE, 25)
      }
    }
    if (iconValue !== undefined) {
      let iconTint: unknown
      if (iconDataGotMoreParams) {
        iconTint = getValueOrCallback(singleIconTab.iconTint, data)
        if (type(iconTint) === "string") {
          const iconColorDef = ZO_ColorDef.New(asString(iconTint))
          iconTint = iconColorDef
        }
      }

      const tooltipForIcon =
        (visible && iconDataGotMoreParams && getValueOrCallback(singleIconTab.tooltip, data)) ||
        undefined
      if (tooltipForIcon !== undefined && tooltipForIcon !== "") {
        let tooltipTextAtMultiIcon = asLsmCastStringUndefined(multiIconCtrl.data.tooltipText)
        if (tooltipTextAtMultiIcon === undefined) {
          tooltipTextAtMultiIcon = zo_iconTextFormatTinted(
            asString(iconValue),
            24,
            24,
            asString(tooltipForIcon),
            asZoColorDef(iconTint)
          )
        } else {
          tooltipTextAtMultiIcon =
            tooltipTextAtMultiIcon +
            "\n" +
            zo_iconTextFormatTinted(
              asString(iconValue),
              24,
              24,
              asString(tooltipForIcon),
              asZoColorDef(iconTint)
            )
        }
        multiIconCtrl.data.tooltipText = tooltipTextAtMultiIcon
      }

      const iconNarration =
        (iconDataGotMoreParams && getValueOrCallback(singleIconTab.iconNarration, data)) ||
        undefined
      multiIconCtrl.AddIcon(iconValue, iconTint, iconNarration)
      if (libDebug.doDebug) {
        dlog(
          libDebug.LSM_LOGTYPE_VERBOSE,
          26,
          tos(iconIdx),
          tos(visible),
          tos(iconValue),
          tos(iconTint),
          tos(iconWidth),
          tos(iconHeight),
          tos(iconNarration)
        )
      }
    }

    return $multi(true, iconWidth, iconHeight)
  }
  return $multi(false, iconWidth, iconHeight)
}

export function updateIcons(
  this: void,
  control: LsmRowControl,
  data: Record<string, unknown>
): undefined {
  const multiIconContainerCtrl = asLsmRowControl(control.m_iconContainer)
  const multiIconCtrl = asLsmMultiIconControl(control.m_icon)
  multiIconCtrl.ClearIcons()

  let iconWidth = WITHOUT_ICON_LABEL_DEFAULT_OFFSETX
  const parentHeight = multiIconCtrl.GetParent().GetHeight()
  let iconHeight = parentHeight

  let iconData = getValueOrCallback(data.icon, data)
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      27,
      tos(iconData !== undefined ? asLsmCastUnknown(iconData).length : 0)
    )
  }

  let anyIconWasAdded = false
  const iconDataType = iconData !== undefined ? type(iconData) : undefined
  if (iconDataType !== undefined) {
    if (iconDataType !== "table") {
      iconData = asUnknown({ [1 - 1]: { iconTexture: iconData } })
    } else {
      if (asLsmCastRecordStringUnknown(iconData).iconTexture !== undefined) {
        const iconDataFixed = asUnknown({ [1 - 1]: ZO_ShallowTableCopy(asObject(iconData)) })
        iconData = iconDataFixed
      }
    }

    for (const [iconIdx, singleIconData] of ipairs(asLsmCastUnknown(iconData))) {
      const [l_anyIconWasAdded, l_iconWidth, l_iconHeight] = updateIcon(
        control,
        data,
        iconIdx,
        singleIconData,
        multiIconCtrl,
        parentHeight
      )
      if (l_anyIconWasAdded === true) {
        anyIconWasAdded = true
      }
      if (l_iconWidth > iconWidth) {
        iconWidth = l_iconWidth
      }
      if (l_iconHeight > iconHeight) {
        iconHeight = l_iconHeight
      }
    }
  }
  multiIconCtrl.SetMouseEnabled(anyIconWasAdded)
  multiIconCtrl.SetDrawTier(DT_MEDIUM)
  multiIconCtrl.SetDrawLayer(DL_CONTROLS)
  multiIconCtrl.SetDrawLevel(10)

  if (anyIconWasAdded) {
    if (multiIconCtrl.GetHandler("OnMouseEnter") === undefined) {
      multiIconCtrl.SetHandler(
        "OnMouseEnter",
        function (this: void, ...args: unknown[]): undefined {
          ZO_Options_OnMouseEnter(...args)
          asLsmCastBringWindowToTopThisUnknownUndefined(
            InformationTooltipTopLevel
          ).BringWindowToTop()
        }
      )
    }
    if (multiIconCtrl.GetHandler("OnMouseExit") === undefined) {
      multiIconCtrl.SetHandler("OnMouseExit", asLsmCastArgsUnknownUndefined(ZO_Options_OnMouseExit))
    }
    multiIconCtrl.Show()
  }

  multiIconContainerCtrl.SetDimensions(iconWidth, iconHeight)
  multiIconCtrl.SetHidden(!anyIconWasAdded)
}
