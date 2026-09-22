interface ZoObjectClass {
  Subclass: <T = object>() => T
  New: <T = object>(this: void, self: object, ...args: readonly unknown[]) => T
  readonly __call?: (this: void, ...args: readonly unknown[]) => unknown
}

declare const ZO_Object: ZoObjectClass

declare const ZO_InitializingObject: ZoObjectClass

declare const ZO_InitializingCallbackObject: ZoObjectClass

declare const GAMEPAD_TYPE_PS4_NO_TOUCHPAD: number

declare const GRAPHICS_SETTING_FULLSCREEN: number

declare const GetUICustomScale: (this: void) => number

declare const GetUIGlobalScale: (this: void) => number

declare const ScriptBuildInfo: (this: void) => Record<string, string>

declare const zo_strgmatch: (
  this: void,
  s: string,
  pattern: string
) => LuaIterable<LuaMultiReturn<[string]>>

declare const zo_strtrim: (this: void, text: string) => string

declare const SI_COLLECTIBLE_NAME_FORMATTER: number

declare const CT_SLIDER: CtSlider

declare const ITEM_STYLE_CHAPTER_MAX_VALUE: number

declare function FormatAchievementLinkTimestamp(
  this: void,
  timestamp?: string | number
): LuaMultiReturn<[date: string, time: string]>

interface ZoObjectClass {
  Initialize: (this: void, self: object, ...args: unknown[]) => void
}
