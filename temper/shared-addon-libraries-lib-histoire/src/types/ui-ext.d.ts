declare const ZO_DISABLED_TEXT: ZoColorDef
declare const ZO_NORMAL_TEXT: ZoColorDef
declare const ZO_ERROR_COLOR: ZoColorDef

declare function SetTooltipText(
  tooltip: TooltipControl,
  text: string,
  r: number,
  g: number,
  b: number
): void
declare function SetTooltipText(tooltip: TooltipControl, text: string, color: ZoColorDef): void

declare function GetString(stringConstantName: string, enumValue: number): string

declare function ZO_FormatDurationAgo(this: void, seconds: number): string
declare function ZO_CommaDelimitDecimalNumber(this: void, value: number): string

declare function FormatAchievementLinkTimestamp(
  this: void,
  timestamp: number
): LuaMultiReturn<[date: string, time: string]>

declare function ZO_FormatTime(this: void, seconds: number, formatStyle: number): string

declare function ZO_StatusBar_SetGradientColor(
  this: void,
  statusBar: Control,
  gradient: readonly [ZoColorDef, ZoColorDef]
): void

declare function ZO_ScrollList_Initialize(this: void, listControl: Control): void
declare function ZO_ScrollList_GetData<T = unknown>(this: void, rowControl: Control): T
declare function ZO_ScrollList_AddResizeOnScreenResize(this: void, listControl: Control): void

declare function ZO_ScrollList_AddDataType<T, C extends Control = Control>(
  listControl: Control,
  typeId: number,
  templateName: string,
  height: number,
  setupCallback: (this: void, rowControl: C, data: T) => void,
  hideCallback: ((this: void, rowControl: C) => void) | undefined,
  dataTypeSelectSound: string | undefined,
  resetControlCallback: ((this: void, rowControl: C) => void) | undefined
): void

interface ZoControlPool {
  SetCustomFactoryBehavior(
    this: ZoControlPool,
    behavior: (this: void, control: Control) => void
  ): void
  SetCustomResetBehavior(
    this: ZoControlPool,
    behavior: (this: void, control: Control) => void
  ): void
  AcquireObject(this: ZoControlPool): Control
  ReleaseAllObjects(this: ZoControlPool): void
}
interface ZoControlPoolClass {
  New(
    this: ZoControlPoolClass,
    templateName: string,
    parent: Control,
    namePrefix: string
  ): ZoControlPool
}
declare const ZO_ControlPool: ZoControlPoolClass

interface ZoAnimation {
  SetAlphaValues(this: ZoAnimation, from: number, to: number): void
}
interface ZoTimeline {
  GetFirstAnimation(this: ZoTimeline): ZoAnimation
  GetDuration(this: ZoTimeline): number
  PlayForward(this: ZoTimeline): void
  PlayBackward(this: ZoTimeline): void
  PlayFromEnd(this: ZoTimeline, time: number): void
}
declare const ANIMATION_MANAGER: AnimationManager

interface CustomSubMenuEntry {
  label: string
  itemType?: number
  callback: (this: void) => void
  checked?: (this: void) => boolean
}
declare function AddCustomSubMenuItem(
  this: void,
  label: string,
  entries: CustomSubMenuEntry[]
): void

interface ZoErrorFrame {
  suppressErrorDialog: boolean
  titleControl: LabelControl
  suppressKeybind: Control
  copyErrorCodeButton: Control
  copyKeybind: Control
  HideAllErrors(this: ZoErrorFrame): void
  OnUIError(this: ZoErrorFrame, text: string): void
}
declare const ZO_ERROR_FRAME: ZoErrorFrame

declare const ZO_GuildHistory_Keyboard_TL: Control

declare const LibHistoireGuildHistoryStatusWindow: Control

declare function ReloadUI(this: void): void

interface ZoStatusBarGloss {
  EnableLeadingEdge(this: ZoStatusBarGloss, enabled: boolean): void
}

interface Control {
  initialized?: boolean
  statusBar?: unknown
  animation?: ZoTimeline
  menuButton?: Control
  gloss: ZoStatusBarGloss
  SetValue(this: Control, value: number): void
  EnableLeadingEdge(this: Control, enabled: boolean): void
  SetAutoRectClipChildren(this: Control, enabled: boolean): void
  SetMovable(this: Control, movable: boolean): void
  CreateControl<T extends Control = Control>(this: Control, name: string, controlType: number): T
}

interface Scene {
  IsShowing(this: Scene): boolean
}
