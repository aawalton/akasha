declare const d: ((message: string) => void) & ((...args: unknown[]) => void)

declare function zo_strformat(format: string | number, ...args: unknown[]): string

declare function zo_strsplit(separator: string, str: string): LuaMultiReturn<string[]>

declare function ZO_CachedStrFormat(format: string | number, ...args: unknown[]): string

declare function GetString(this: void, stringId: number): string
declare function GetString(this: void, stringVariablePrefix: string, value: string | number): string
declare function GetString(this: void, stringIdOrPrefix: number | string): string

declare const ZO_CreateStringId: (key: string, value: string) => void

declare function ZO_CommaDelimitNumber(num: number): string

declare function ZO_Currency_GetPlatformFormattedGoldIcon(this: void): string

declare const ZO_Tooltips_ShowTextTooltip: (
  control: Control,
  anchor: number,
  text: string | undefined
) => void

declare const ZO_Tooltips_HideTextTooltip: () => void

declare const zo_callLater: (callback: () => void, delayMs: number) => void

declare const SecurePostHook: ((
  object: object,
  existingFunctionName: string,
  hookFunction: (this: void, ...args: never[]) => void
) => void) &
  ((existingFunctionName: string, hookFunction: (this: void, ...args: never[]) => void) => void)

declare function zo_round(value: number): number

declare function zo_floor(value: number): number

declare function zo_min(a: number, b: number): number

declare function zo_max(a: number, b: number): number

declare function zo_ceil(value: number): number

declare function zo_abs(value: number): number

declare function zo_sqrt(value: number): number

declare function zo_roundToNearest(value: number, nearest: number): number

declare function zo_strsub(s: string, startIndex: number, endIndex?: number): string

declare function zo_pow(base: number, exponent: number): number

declare function ZO_AbbreviateNumber(
  amount: number,
  numDecimalPlaces: number,
  useUppercaseSuffixes: boolean
): string

declare function zo_iconFormat(
  path: string,
  width: number | string,
  height: number | string
): string

declare function ZO_GetNextBagSlotIndex(
  bagId: number,
  lastSlotIndex: number | undefined
): number | undefined

declare function NonContiguousCount(table: object): number

declare function ZO_DeepTableCopy<T>(source: T, target?: object): T

declare function ZO_ShallowTableCopy<T>(source: T, target?: object): T

declare const ZO_ClearTable: ((table: object) => void) & ((t: unknown) => void)

declare const SLASH_COMMANDS: Record<string, (command: string) => void>

declare const CALLBACK_MANAGER: {
  FireCallbacks: (callbackName: string, ...args: unknown[]) => void
  RegisterCallback: (callbackName: string, callback: (this: void, ...args: never[]) => void) => void
  UnregisterCallback: (
    callbackName: string,
    callback?: (this: void, ...args: never[]) => void
  ) => void
}

declare const SOUNDS: Readonly<Record<string, string>>

declare const ZO_Tooltip_AddDivider: (tooltip: TooltipControl) => void

declare const ITEMSTYLE_NONE: number

declare const ITEMSTYLE_RACIAL_BRETON: number
declare const ITEMSTYLE_RACIAL_REDGUARD: number
declare const ITEMSTYLE_RACIAL_ORC: number
declare const ITEMSTYLE_RACIAL_DARK_ELF: number
declare const ITEMSTYLE_RACIAL_NORD: number
declare const ITEMSTYLE_RACIAL_ARGONIAN: number
declare const ITEMSTYLE_RACIAL_HIGH_ELF: number
declare const ITEMSTYLE_RACIAL_WOOD_ELF: number
declare const ITEMSTYLE_RACIAL_KHAJIIT: number
declare const ITEMSTYLE_RACIAL_IMPERIAL: number
declare const ITEMSTYLE_AREA_ANCIENT_ELF: number
declare const ITEMSTYLE_AREA_REACH: number
declare const ITEMSTYLE_ENEMY_PRIMITIVE: number
declare const ITEMSTYLE_ENEMY_DAEDRIC: number

declare const ITEM_QUALITY_TRASH: number
declare const ITEM_QUALITY_NORMAL: number
declare const ITEM_QUALITY_MAGIC: number
declare const ITEM_QUALITY_ARCANE: number
declare const ITEM_QUALITY_ARTIFACT: number
declare const ITEM_QUALITY_LEGENDARY: number

declare const ITEM_TRAIT_TYPE_ARMOR_EXPLORATION: number
declare const ITEM_TRAIT_TYPE_WEAPON_WEIGHTED: number

declare const ENCHANTING: {
  potencySound: string | undefined
  potencyLength: number
  essenceSound: string | undefined
  essenceLength: number
  aspectSound: string | undefined
  aspectLength: number
  [key: string]: unknown
}

declare const TUTORIAL_SUPPRESSED_BY_SCENE: number

declare const StartScriptProfiler: (this: void) => void

declare const StopScriptProfiler: (this: void) => void

declare function IsScriptProfilerEnabled(this: void): boolean

declare function GetScriptProfilerNumFrames(this: void): number

declare function GetScriptProfilerFrameNumRecords(this: void, frameIndex: number): number

declare function GetScriptProfilerRecordInfo(
  this: void,
  frameIndex: number,
  recordIndex: number
): LuaMultiReturn<
  [
    recordDataIndex: number,
    startTimeNS: number,
    endTimeNS: number,
    callerRecordIndex: number | undefined,
    recordDataType: ScriptProfilerRecordDataType,
  ]
>

declare function GetScriptProfilerNumClosures(this: void): number

declare function GetScriptProfilerClosureInfo(
  this: void,
  recordDataIndex: number
): LuaMultiReturn<[displayName: string, fileName: string, fileLineNumber: number]>

declare function GetScriptProfilerNumCFunctions(this: void): number

declare function GetScriptProfilerCFunctionInfo(this: void, recordDataIndex: number): string
