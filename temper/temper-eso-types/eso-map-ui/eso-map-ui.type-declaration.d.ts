declare const SI_WORLD_MAP_LOCATION_NAME: number
declare const SI_ITEM_FORMAT_STR_SET_NAME: number

interface ZoColorDef {
  ToHex: () => string
  Colorize: (text: string) => string
  SetRGB: (r: number, g: number, b: number) => void
  SetRGBA: (r: number, g: number, b: number, a?: number) => void
  UnpackRGB: () => LuaMultiReturn<[red: number, green: number, blue: number]>
  UnpackRGBA: () => LuaMultiReturn<[red: number, green: number, blue: number, alpha: number]>
}
interface ZoColorDefClass {
  New: ((r: number, g: number, b: number, a?: number) => ZoColorDef) &
    ((hex: string) => ZoColorDef) &
    ((colorOrHex: string | ZoColorDef) => ZoColorDef)
}
declare const ZO_ColorDef: ZoColorDefClass

declare const ZO_HIGHLIGHT_TEXT: ZoColorDef
declare const STAT_BATTLE_LEVEL_COLOR: ZoColorDef
declare const ZO_SELECTED_TEXT: ZoColorDef
declare const ZO_TOOLTIP_DEFAULT_COLOR: ZoColorDef

declare const ZO_WorldMapMouseoverName: LabelControl
declare const ZO_WorldMapContainer: Control
declare const ZO_WorldMap_SetMapByIndex: (this: void, mapIndex?: number) => unknown

interface ZoMapPinObject {
  GetPOIZoneIndex: (this: ZoMapPinObject) => number
  GetPOIIndex: (this: ZoMapPinObject) => number
}
interface ZoMapPinTooltipCreatorEntry {
  creator: (this: void, pin: ZoMapPinObject, ...rest: unknown[]) => void
}
interface ZoMapPinClass {
  TOOLTIP_CREATORS: Record<number, ZoMapPinTooltipCreatorEntry | undefined>
}
declare const ZO_MapPin: ZoMapPinClass

interface KeepTooltipControl extends Control {
  lastLine?: Control
  linePool: ObjectPool<LabelControl>
  height: number
  width: number
  keepId?: number
  battlegroundContext?: number
  historyPercent?: number
  SetKeep: (this: KeepTooltipControl, keepId: number, ...rest: unknown[]) => void
  RefreshKeepInfo: (this: KeepTooltipControl, ...rest: unknown[]) => void
}
declare const ZO_KeepTooltip: KeepTooltipControl

interface GamepadTooltipSection {
  GetStyle: (this: GamepadTooltipSection, styleName: string) => unknown
}
interface GamepadMapLocationTooltip {
  tooltip: GamepadTooltipSection
  LayoutIconStringLine: (
    this: GamepadMapLocationTooltip,
    section: GamepadTooltipSection,
    icon: string | undefined,
    text: string,
    style: unknown
  ) => void
}
declare const ZO_MapLocationTooltip_Gamepad: GamepadMapLocationTooltip
declare const ZO_WorldMap_GetMapDungeonDifficulty: (this: void) => number
