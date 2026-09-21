declare const ZO_ERROR_COLOR: ZoColorDef

declare const ZO_FormatDurationAgo: (this: void, seconds: number) => string

declare const ZO_CommaDelimitDecimalNumber: (this: void, value: number) => string

declare const ZO_StatusBar_SetGradientColor: (
  this: void,
  statusBar: Control,
  gradient: readonly [ZoColorDef, ZoColorDef]
) => void

interface ZoStatusBarGloss {
  EnableLeadingEdge: (this: ZoStatusBarGloss, enabled: boolean) => void
}

interface StatusBarControl {
  gloss: ZoStatusBarGloss
}

interface ZoAnimation {
  SetAlphaValues: (this: ZoAnimation, from: number, to: number) => void
}

interface ZoTimeline {
  GetFirstAnimation: (this: ZoTimeline) => ZoAnimation
  GetDuration: (this: ZoTimeline) => number
  PlayForward: (this: ZoTimeline) => void
  PlayBackward: (this: ZoTimeline) => void
  PlayFromEnd: (this: ZoTimeline, time?: number) => void
}

interface ErrorFrameSingleton {
  suppressErrorDialog: boolean
  titleControl: LabelControl
  suppressKeybind: Control
  copyErrorCodeButton: Control
  copyKeybind: Control
  HideAllErrors: (this: ErrorFrameSingleton) => void
}

declare const ZO_Dialogs_ShowGamepadDialog: (this: void, name: string, data?: object) => void

declare const ZO_Dialogs_ReleaseDialogOnButtonPress: (this: void, keybind: string) => void

declare const zo_removeCallLater: (this: void, handle: number) => void

declare const SI_SLASH_LOGOUT: number
declare const SI_SLASH_CAMP: number
declare const SI_SLASH_QUIT: number
declare const SI_LOG_OUT_GAME_CONFIRM_KEYBIND: number
declare const SI_QUIT_GAME_CONFIRM_KEYBIND: number

declare const ZO_WHITE: ZoColorDef

declare const ZO_DEFAULT_DISABLED_COLOR: ZoColorDef

declare const ZO_COMBOBOX_SUPRESS_UPDATE: number

interface ZoComboBoxDropdownKeyboardClass {
  Subclass: (this: ZoComboBoxDropdownKeyboardClass) => ZoComboBoxDropdownKeyboardClass
  New: (
    this: ZoComboBoxDropdownKeyboardClass,
    ...args: unknown[]
  ) => ZoComboBoxDropdownKeyboardInstance
  OnEntryMouseUp: (control: Control, button: number, upInside: boolean) => void
  [key: string]: unknown
}

interface ZoComboBoxDropdownKeyboardInstance {
  IsOwnedByComboBox: (this: ZoComboBoxDropdownKeyboardInstance, comboBox: unknown) => boolean
  GetHighlightFromPool: (this: ZoComboBoxDropdownKeyboardInstance) => Control
  SetupEntry: (this: ZoComboBoxDropdownKeyboardInstance, ...args: unknown[]) => void
  SetupEntryBase: (
    this: ZoComboBoxDropdownKeyboardInstance,
    control: Control,
    data: unknown,
    list: unknown
  ) => void
  IsHidden: (this: ZoComboBoxDropdownKeyboardInstance) => boolean
  [key: string]: unknown
}

declare const ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT: number

declare const ZO_SCROLLABLE_COMBO_BOX_LIST_PADDING_Y: number

declare const ZO_SORT_BY_NAME: Record<string, unknown>

declare const ZO_Menus: Control

declare const ZO_CheckButton_OnClicked: (this: void, checkButton: Control, button?: number) => void

declare const SCREEN_NARRATION_MANAGER: {
  QueueParametricListEntry: (list: unknown) => void
  [key: string]: unknown
}

declare const ZO_Scroll_SetUseFadeGradient: (
  this: void,
  scrollControl: Control,
  use: boolean
) => void

declare const ZO_ComboBoxDropdown_Keyboard: ZoComboBoxDropdownKeyboardClass

interface ErrorFrameSingleton {
  OnUIError: (this: ErrorFrameSingleton, errString: string) => undefined
}

interface StatusBarControl extends Control {
  CalculateSizeWithoutLeadingEdgeForValue: (value?: number) => number
  ClearFadeOutLossAdjustedTopValue: () => void
  EnableFadeOut: (enabled?: boolean) => void
  EnableLeadingEdge: (enabled?: boolean) => void
  EnableScrollingOverlay: (enabled?: boolean) => void
  GetMinMax: () => LuaMultiReturn<[min: number, max: number]>
  GetValue: () => number
  IsPixelRoundingEnabled: () => boolean
  SetBarAlignment: (barAlignment?: BarAlignment) => void
  SetColor: (r?: number, g?: number, b?: number, a?: number) => void
  SetFadeOutGainColor: (r?: number, g?: number, b?: number, a?: number) => void
  SetFadeOutLossAdjustedTopValue: (topValue?: number) => void
  SetFadeOutLossColor: (r?: number, g?: number, b?: number, a?: number) => void
  SetFadeOutLossSetValueToAdjust: (adjustValue?: number) => void
  SetFadeOutTexture: (filename?: string) => void
  SetFadeOutTime: (fadeOutSeconds?: number, fadeOutDelaySeconds?: number) => void
  SetGradientColors: (
    startR?: number,
    startG?: number,
    startB?: number,
    startA?: number,
    endR?: number,
    endG?: number,
    endB?: number,
    endA?: number
  ) => void
  SetLeadingEdge: (textureFile?: string, width?: number, height?: number) => void
  SetLeadingEdgeTextureCoords: (
    left?: number,
    right?: number,
    top?: number,
    bottom?: number
  ) => void
  SetMinMax: (aMin?: number, aMax?: number) => void
  SetOrientation: (orientation?: ControlOrientation) => void
  SetPixelRoundingEnabled: (pixelRoundingEnabled?: boolean) => void
  SetTexture: (filename?: string) => void
  SetTextureCoords: (left?: number, right?: number, top?: number, bottom?: number) => void
  SetValue: (aValue?: number) => void
  SetupScrollingOverlay: (
    textureFile?: string,
    width?: number,
    height?: number,
    duration?: number
  ) => void
}
