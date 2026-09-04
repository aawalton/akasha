import {
  asDropdownHeaderChildControl,
  asDropdownHeaderPrivate,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import { asLsmCastDropdownHeaderChildControlUndefined } from "../scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import {
  asLsmCastIsFilterEnabledThisUnknownUnknown,
  asLsmCastIsSortEnabledThisUnknownBooleanUndefined,
} from "../scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import {
  asLsmCastNumberUndefined,
  asLsmCastOptionsRecordStringUnknown,
  asLsmCastRecordStringString,
  asLsmCastRecordStringUnknown,
  asLsmCastRecordStringUnknownUndefined2,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastStringUndefined } from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import { asLsmCastThisVoidControlUnknownUnknown } from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmCastThisVoidTexturePathUnknownBoolean,
  asLsmCastZoColorDefUndefined,
  asNumber,
  asString,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import { getValueOrCallback } from "../scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const FUNCTION_TYPE = "function"
const STRING_TYPE = "string"
const NUMBER_TYPE = "number"
const BOOLEAN_TYPE = "boolean"
const USER_DATA_TYPE = "userdata"

const constants = lib.constants
const fontConstants = asLsmCastRecordStringString(constants.fonts)
const dropdownConstants = asLsmCastRecordStringUnknown(constants.dropdown)
const DROPDOWN_DEFAULTS = asLsmCastRecordStringUnknown(dropdownConstants.defaults)
const MIN_WIDTH_WITHOUT_SEARCH_HEADER = asNumber(DROPDOWN_DEFAULTS.MIN_WIDTH_WITHOUT_SEARCH_HEADER)

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
const headerUpdateAnchors = dropdownHeaderPrivate.header_updateAnchors

const HEADER_CONTROLS = asLsmCastRecordStringUnknown(
  asLsmCastRecordStringUnknown(lib.XML).headerControls
)

{
  const TITLE = asNumber(HEADER_CONTROLS.TITLE)
  const SUBTITLE = asNumber(HEADER_CONTROLS.SUBTITLE)
  const FILTER_CONTAINER = asNumber(HEADER_CONTROLS.FILTER_CONTAINER)
  const CUSTOM_CONTROL = asNumber(HEADER_CONTROLS.CUSTOM_CONTROL)
  const TOGGLE_BUTTON = asNumber(HEADER_CONTROLS.TOGGLE_BUTTON)
  const TOGGLE_BUTTON_CLICK_EXTENSION = asNumber(HEADER_CONTROLS.TOGGLE_BUTTON_CLICK_EXTENSION)
  const TOGGLE_ICON = asNumber(HEADER_CONTROLS.TOGGLE_ICON)
  const TOGGLE_TITLE = asNumber(HEADER_CONTROLS.TOGGLE_TITLE)
  const SORT_CONTAINER = asNumber(HEADER_CONTROLS.SORT_CONTAINER)

  function headerSetAlignment(
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

  function headerSetFont(
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

  function headerIconSetTexture(
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

  function headerTitleSetTextAndLook(
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
    headerSetFont(
      control,
      asLsmCastStringUndefined(getValueOrCallback(titleData.font, titleData)),
      asString(fontConstants.HeaderCollapsedTitle)
    )
    control.SetText(getValueOrCallback(titleData.text, titleData))
    const [r, g, b, a] = color.UnpackRGBA()
    control.SetColor(r, g, b, a)

    control.SetHidden(false)
  }

  function headerProcessData(
    this: void,
    control: DropdownHeaderChildControl | undefined,
    data: unknown,
    collapsed?: boolean
  ): unknown {
    if (collapsed || control === undefined) {
      return false
    }

    const dataType = type(data)

    if (dataType === FUNCTION_TYPE) {
      data = asLsmCastThisVoidControlUnknownUnknown(data)(control)
    }

    if (dataType === STRING_TYPE || dataType === NUMBER_TYPE) {
      control.SetText(data)
    }

    if (dataType === BOOLEAN_TYPE) {
      return data
    }

    return data !== undefined
  }

  function headerProcessControl(
    this: void,
    control: DropdownHeaderChildControl | undefined,
    customControl: DropdownHeaderChildControl | undefined,
    collapsed: boolean | undefined
  ): boolean {
    if (collapsed || control === undefined) {
      return false
    }

    const isCustomControlUserData = type(customControl) === USER_DATA_TYPE
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
      type(toggleHeaderTitleText) === STRING_TYPE && toggleHeaderTitleText !== "",
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
      headerIconSetTexture(
        controls[TOGGLE_ICON],
        asLsmCastRecordStringUnknown(toggleHeaderIconData)
      )
      toggleHeaderData = toggleHeaderData ?? {}
      toggleHeaderData[TOGGLE_ICON] = asLsmCastRecordStringUnknown(toggleHeaderIconData)
      showToggleHeaderControls = true
    }
    if (showToggleHeaderTitle === true) {
      headerTitleSetTextAndLook(
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
    refreshResults[TITLE] = headerProcessData(
      controls[TITLE],
      getValueOrCallback(options.titleText, options),
      collapsed
    )
    headerSetFont(
      controls[TITLE],
      asLsmCastStringUndefined(getValueOrCallback(options.titleFont, options)),
      asString(fontConstants.HeaderFontTitle)
    )

    refreshResults[SUBTITLE] = headerProcessData(
      controls[SUBTITLE],
      getValueOrCallback(options.subtitleText, options),
      collapsed
    )
    headerSetFont(
      controls[SUBTITLE],
      asLsmCastStringUndefined(getValueOrCallback(options.subtitleFont, options)),
      asString(fontConstants.HeaderFontSubtitle)
    )

    headerSetAlignment(
      controls[TITLE],
      asLsmCastNumberUndefined(getValueOrCallback(options.titleTextAlignment, options)),
      TEXT_ALIGN_CENTER
    )
    headerSetAlignment(
      controls[SUBTITLE],
      asLsmCastNumberUndefined(getValueOrCallback(options.titleTextAlignment, options)),
      TEXT_ALIGN_CENTER
    )

    const isFilterEnabled = asLsmCastIsFilterEnabledThisUnknownUnknown(comboBox).IsFilterEnabled()
    refreshResults[FILTER_CONTAINER] = headerProcessData(
      controls[FILTER_CONTAINER],
      isFilterEnabled,
      collapsed
    )
    refreshResults[CUSTOM_CONTROL] = headerProcessControl(
      controls[CUSTOM_CONTROL],
      (!collapsed &&
        asLsmCastDropdownHeaderChildControlUndefined(
          getValueOrCallback(options.customHeaderControl, options)
        )) ||
        undefined,
      collapsed
    )
    refreshResults[TOGGLE_BUTTON] = headerProcessData(controls[TOGGLE_BUTTON], headerIsCollapsible)
    refreshResults[TOGGLE_BUTTON_CLICK_EXTENSION] = headerProcessData(
      controls[TOGGLE_BUTTON_CLICK_EXTENSION],
      headerIsCollapsible
    )
    refreshResults[TOGGLE_ICON] = headerProcessData(controls[TOGGLE_ICON], showToggleHeaderIcon)
    refreshResults[TOGGLE_TITLE] = headerProcessData(controls[TOGGLE_TITLE], showToggleHeaderTitle)

    const isSortEnabled =
      asLsmCastIsSortEnabledThisUnknownBooleanUndefined(comboBox).IsSortEnabled()
    refreshResults[SORT_CONTAINER] = headerProcessData(
      controls[SORT_CONTAINER],
      isSortEnabled,
      collapsed
    )

    headerControl.SetDimensionConstraints(MIN_WIDTH_WITHOUT_SEARCH_HEADER, 0)
    headerUpdateAnchors(
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
