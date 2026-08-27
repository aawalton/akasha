import { asDropdownHeaderChildControl, asDropdownHeaderPrivate } from "./casts-1a"
import { asLsmCastDropdownHeaderChildControlUndefined } from "./casts-1b"
import { asLsmCastIsFilterEnabledThisUnknownUnknown, asLsmCastIsSortEnabledThisUnknownBooleanUndefined } from "./casts-2a"
import { asLsmCastNumberUndefined, asLsmCastOptionsRecordStringUnknown, asLsmCastRecordStringString, asLsmCastRecordStringUnknown, asLsmCastRecordStringUnknownUndefined2 } from "./casts-2b"
import { asLsmCastStringUndefined } from "./casts-3a"
import { asLsmCastThisVoidControlUnknownUnknown } from "./casts-3b"
import {
  asLsmCastThisVoidTexturePathUnknownBoolean,
  asLsmCastZoColorDefUndefined,
  asNumber,
  asString,
} from "./casts-4"

import { getValueOrCallback } from "./constants-core"
import { lib } from "./lib-state"

const functionType = "function"
const stringType = "string"
const numberType = "number"
const booleanType = "boolean"
const userDataType = "userdata"

const constants = lib.constants
const fontConstants = asLsmCastRecordStringString(constants.fonts)
const dropdownConstants = asLsmCastRecordStringUnknown(constants.dropdown)
const dropdownDefaults = asLsmCastRecordStringUnknown(dropdownConstants.defaults)
const MIN_WIDTH_WITHOUT_SEARCH_HEADER = asNumber(dropdownDefaults.MIN_WIDTH_WITHOUT_SEARCH_HEADER)

const defaultColorText = (() => {
  const [r, g, b, a] = GetInterfaceColor(
    INTERFACE_COLOR_TYPE_TEXT_COLORS,
    INTERFACE_TEXT_COLOR_NORMAL
  )
  return ZO_ColorDef.New(r, g, b, a)
})()

const libUtil_checkIfValidTexturePath = asLsmCastThisVoidTexturePathUnknownBoolean(
  lib.Util.checkIfValidTexturePath
)

const dropdownHeaderPrivate = asDropdownHeaderPrivate(
  asLsmCastRecordStringUnknown(lib.classes).dropdownHeaderPrivate
)
const header_updateAnchors = dropdownHeaderPrivate.header_updateAnchors

const headerControls = asLsmCastRecordStringUnknown(
  asLsmCastRecordStringUnknown(lib.XML).headerControls
)

{
  const TITLE = asNumber(headerControls.TITLE)
  const SUBTITLE = asNumber(headerControls.SUBTITLE)
  const FILTER_CONTAINER = asNumber(headerControls.FILTER_CONTAINER)
  const CUSTOM_CONTROL = asNumber(headerControls.CUSTOM_CONTROL)
  const TOGGLE_BUTTON = asNumber(headerControls.TOGGLE_BUTTON)
  const TOGGLE_BUTTON_CLICK_EXTENSION = asNumber(headerControls.TOGGLE_BUTTON_CLICK_EXTENSION)
  const TOGGLE_ICON = asNumber(headerControls.TOGGLE_ICON)
  const TOGGLE_TITLE = asNumber(headerControls.TOGGLE_TITLE)
  const SORT_CONTAINER = asNumber(headerControls.SORT_CONTAINER)

  function header_setAlignment(
    this: void,
    control: DropdownHeaderChildControl | undefined,
    alignment: number | undefined,
    defaultAlignment: number
  ): undefined {
    if (control === undefined) {
      return
    }

    if (alignment === undefined) {
      alignment = defaultAlignment
    }

    control.SetHorizontalAlignment(alignment)
  }

  function header_setFont(
    this: void,
    control: DropdownHeaderChildControl | undefined,
    font: string | undefined,
    defaultFont: string
  ): undefined {
    if (control === undefined) {
      return
    }

    if (font === undefined) {
      font = defaultFont
    }

    control.SetFont(font)
  }

  function header_iconSetTexture(
    this: void,
    control: DropdownHeaderChildControl | undefined,
    textureData: Record<string, unknown>
  ): undefined {
    if (control === undefined) {
      return
    }
    control.ClearIcons()
    control.SetMouseEnabled(false)
    if (ZO_IsTableEmpty(textureData) || textureData.iconTexture === undefined) {
      control.SetDimensions(0, 0)
      return
    }
    const width = asNumber(getValueOrCallback(textureData.width, textureData) || 18)
    const height = zo_clamp(
      asNumber(getValueOrCallback(textureData.height, textureData) || 18),
      8,
      32
    )
    const tint = getValueOrCallback(textureData.iconTint, textureData)
    control.SetDimensions(width, height)
    control.AddIcon(getValueOrCallback(textureData.iconTexture, textureData), tint, undefined)
    control.Show()
  }

  function header_titleSetTextAndLook(
    this: void,
    control: DropdownHeaderChildControl | undefined,
    titleData: Record<string, unknown>
  ): undefined {
    if (control === undefined) {
      return
    }
    control.SetHidden(true)
    control.SetMouseEnabled(false)
    if (ZO_IsTableEmpty(titleData) || titleData.text === undefined || titleData.text === "") {
      control.SetDimensions(0, 0)
      return
    }
    const color =
      asLsmCastZoColorDefUndefined(getValueOrCallback(titleData.color, titleData)) ||
      defaultColorText
    header_setFont(
      control,
      asLsmCastStringUndefined(getValueOrCallback(titleData.font, titleData)),
      asString(fontConstants.HeaderCollapsedTitle)
    )
    control.SetText(getValueOrCallback(titleData.text, titleData))
    const [r, g, b, a] = color.UnpackRGBA()
    control.SetColor(r, g, b, a)

    control.SetHidden(false)
  }

  function header_processData(
    this: void,
    control: DropdownHeaderChildControl | undefined,
    data: unknown,
    collapsed?: boolean
  ): unknown {
    if (collapsed || control === undefined) {
      return false
    }

    const dataType = type(data)

    if (dataType === functionType) {
      data = asLsmCastThisVoidControlUnknownUnknown(data)(control)
    }

    if (dataType === stringType || dataType === numberType) {
      control.SetText(data)
    }

    if (dataType === booleanType) {
      return data
    }

    return data !== undefined
  }

  function header_processControl(
    this: void,
    control: DropdownHeaderChildControl | undefined,
    customControl: DropdownHeaderChildControl | undefined,
    collapsed: boolean | undefined
  ): boolean {
    if (collapsed || control === undefined) {
      return false
    }

    const isCustomControlUserData = type(customControl) === userDataType
    control.SetHidden(!isCustomControlUserData)
    if (isCustomControlUserData) {
      const customControlUserData = asDropdownHeaderChildControl(customControl)
      customControlUserData.SetParent(control)
      customControlUserData.ClearAnchors()
      customControlUserData.SetAnchor(TOP, control, TOP, 0, 0)
      const [dw, dh] = customControlUserData.GetDimensions()
      control.SetDimensions(dw, dh)
      return true
    }

    return false
  }

  function checkShowHeaderTitle(this: void, comboBox: unknown): LuaMultiReturn<[boolean, unknown]> {
    const options = asLsmCastOptionsRecordStringUnknown(comboBox).options
    const toggleHeaderTitleData = asLsmCastRecordStringUnknownUndefined2(
      getValueOrCallback(options.headerCollapsedTitle, options)
    )
    const toggleHeaderTitleText = toggleHeaderTitleData?.text || undefined
    return $multi(
      type(toggleHeaderTitleText) === stringType && toggleHeaderTitleText !== "",
      toggleHeaderTitleData
    )
  }
  function checkShowHeaderIcon(this: void, comboBox: unknown): LuaMultiReturn<[boolean, unknown]> {
    const options = asLsmCastOptionsRecordStringUnknown(comboBox).options
    const toggleHeaderIconData = asLsmCastRecordStringUnknownUndefined2(
      getValueOrCallback(options.headerCollapsedIcon, options)
    )
    const toggleHeaderIconpath = toggleHeaderIconData?.iconTexture || undefined
    return $multi(libUtil_checkIfValidTexturePath(toggleHeaderIconpath), toggleHeaderIconData)
  }

  const refreshDropdownHeader = function (
    this: void,
    comboBox: unknown,
    headerControl: DropdownHeaderControl,
    collapsed: boolean | undefined
  ): undefined {
    const controls = headerControl.controls
    const options = asLsmCastOptionsRecordStringUnknown(comboBox).options
    const headerIsCollapsible = getValueOrCallback(options.headerCollapsible, options)

    let showToggleHeaderControls = false
    let toggleHeaderData: Record<number, Record<string, unknown>> | undefined
    let showToggleHeaderIcon: boolean | undefined
    let toggleHeaderIconData: unknown
    let showToggleHeaderTitle: boolean | undefined
    let toggleHeaderTitleData: unknown
    if (headerIsCollapsible && collapsed === true) {
      ;[showToggleHeaderIcon, toggleHeaderIconData] = checkShowHeaderIcon(comboBox)
      ;[showToggleHeaderTitle, toggleHeaderTitleData] = checkShowHeaderTitle(comboBox)
    }
    if (showToggleHeaderIcon === true) {
      header_iconSetTexture(
        controls[TOGGLE_ICON],
        asLsmCastRecordStringUnknown(toggleHeaderIconData)
      )
      toggleHeaderData = toggleHeaderData ?? {}
      toggleHeaderData[TOGGLE_ICON] = asLsmCastRecordStringUnknown(toggleHeaderIconData)
      showToggleHeaderControls = true
    }
    if (showToggleHeaderTitle === true) {
      header_titleSetTextAndLook(
        controls[TOGGLE_TITLE],
        asLsmCastRecordStringUnknown(toggleHeaderTitleData)
      )
      toggleHeaderData = toggleHeaderData ?? {}
      toggleHeaderData[TOGGLE_TITLE] = asLsmCastRecordStringUnknown(toggleHeaderTitleData)
      showToggleHeaderControls = true
    }

    headerControl.SetHidden(true)
    headerControl.SetHeight(0)

    const refreshResults: Record<number, unknown> = {}
    refreshResults[TITLE] = header_processData(
      controls[TITLE],
      getValueOrCallback(options.titleText, options),
      collapsed
    )
    header_setFont(
      controls[TITLE],
      asLsmCastStringUndefined(getValueOrCallback(options.titleFont, options)),
      asString(fontConstants.HeaderFontTitle)
    )

    refreshResults[SUBTITLE] = header_processData(
      controls[SUBTITLE],
      getValueOrCallback(options.subtitleText, options),
      collapsed
    )
    header_setFont(
      controls[SUBTITLE],
      asLsmCastStringUndefined(getValueOrCallback(options.subtitleFont, options)),
      asString(fontConstants.HeaderFontSubtitle)
    )

    header_setAlignment(
      controls[TITLE],
      asLsmCastNumberUndefined(getValueOrCallback(options.titleTextAlignment, options)),
      TEXT_ALIGN_CENTER
    )
    header_setAlignment(
      controls[SUBTITLE],
      asLsmCastNumberUndefined(getValueOrCallback(options.titleTextAlignment, options)),
      TEXT_ALIGN_CENTER
    )

    const isFilterEnabled = asLsmCastIsFilterEnabledThisUnknownUnknown(comboBox).IsFilterEnabled()
    refreshResults[FILTER_CONTAINER] = header_processData(
      controls[FILTER_CONTAINER],
      isFilterEnabled,
      collapsed
    )
    refreshResults[CUSTOM_CONTROL] = header_processControl(
      controls[CUSTOM_CONTROL],
      (!collapsed &&
        asLsmCastDropdownHeaderChildControlUndefined(
          getValueOrCallback(options.customHeaderControl, options)
        )) ||
        undefined,
      collapsed
    )
    refreshResults[TOGGLE_BUTTON] = header_processData(controls[TOGGLE_BUTTON], headerIsCollapsible)
    refreshResults[TOGGLE_BUTTON_CLICK_EXTENSION] = header_processData(
      controls[TOGGLE_BUTTON_CLICK_EXTENSION],
      headerIsCollapsible
    )
    refreshResults[TOGGLE_ICON] = header_processData(controls[TOGGLE_ICON], showToggleHeaderIcon)
    refreshResults[TOGGLE_TITLE] = header_processData(controls[TOGGLE_TITLE], showToggleHeaderTitle)

    const isSortEnabled =
      asLsmCastIsSortEnabledThisUnknownBooleanUndefined(comboBox).IsSortEnabled()
    refreshResults[SORT_CONTAINER] = header_processData(
      controls[SORT_CONTAINER],
      isSortEnabled,
      collapsed
    )

    headerControl.SetDimensionConstraints(MIN_WIDTH_WITHOUT_SEARCH_HEADER, 0)
    header_updateAnchors(
      comboBox,
      headerControl,
      refreshResults,
      collapsed,
      isFilterEnabled,
      showToggleHeaderControls,
      toggleHeaderData,
      isSortEnabled
    )
  }
  lib.Util.refreshDropdownHeader = refreshDropdownHeader
}
