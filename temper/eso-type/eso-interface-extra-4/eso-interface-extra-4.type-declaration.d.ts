declare const ZO_ONE_SECOND_IN_MILLISECONDS: number
declare const ZO_ONE_DAY_IN_SECONDS: number

declare const SI_SPECIALIZEDITEMTYPE100: number
declare const SI_SPECIALIZEDITEMTYPE101: number
declare const SI_SPECIALIZEDITEMTYPE113: number
declare const SI_ITEM_FORMAT_STR_TEXT1_TEXT2: number
declare const SI_GUILDSIZEATTRIBUTEVALUE1: number
declare const SI_GUILDSIZEATTRIBUTEVALUE2: number
declare const SI_GUILDSIZEATTRIBUTEVALUE3: number
declare const SI_GUILDSIZEATTRIBUTEVALUE4: number
declare const SI_QUEST_JOURNAL_SHOW_ON_MAP: number
declare const SI_GUILD_RANK_ICONS_DIALOG_HEADER: number
declare const SI_CRAFTING_QUANTITY_HEADER: number

declare function ZO_CreateSetFromArguments(
  this: void,
  ...args: (string | number)[]
): Record<string | number, true | undefined>
declare function zo_strfind(
  this: void,
  s: string,
  pattern: string,
  init?: number,
  plain?: boolean
): LuaMultiReturn<[number | undefined, number | undefined]>

interface ZoAnchor {
  ResetToAnchor: (anchor: unknown) => void
  Set: (control: unknown) => void
  SetFromControlAnchor: (control: unknown, anchorIndex?: number) => void
  GetOffsetX: (this: ZoAnchor) => number
  GetOffsetY: (this: ZoAnchor) => number
}

interface ZoAnchorClass {
  New: (
    this: ZoAnchorClass,
    point?: number,
    relativeTo?: unknown,
    relativePoint?: number,
    offsetX?: number,
    offsetY?: number
  ) => ZoAnchor
}

declare const ZO_Anchor: ZoAnchorClass

interface CompassOverPinLabel {
  SetText: (text: string) => void
}

interface CompassPinAnimation {
  IsPlaying: () => boolean
  IsPlayingBackward: () => boolean
  PlayForward: () => void
  PlayBackward: () => void
}

interface CompassContainer {
  SetAlphaDropoffBehavior: (
    this: CompassContainer,
    pinType: number,
    a: number,
    b: number,
    c: number,
    d: number
  ) => undefined
}

interface CompassControl {
  container: CompassContainer
  centerOverPinLabel: CompassOverPinLabel
  centerOverPinLabelAnimation: CompassPinAnimation
  areaOverrideAnimation: CompassPinAnimation
}

declare const COMPASS: CompassControl

interface WorldMapQuestsDataSingleton {
  ShouldMapShowQuestsInList: () => boolean
}

declare const ZO_WorldMapQuestsData_Singleton: WorldMapQuestsDataSingleton

declare const GAMEPAD_TREASURE_MAP_INVENTORY_SCENE: Scene

interface Control {
  RegisterForEvent: <T extends unknown[] = unknown[]>(
    event: number,
    callback: (this: void, ...args: T) => void
  ) => void
  UnregisterForEvent: (event: number) => void
  SetTexture: (texturePath: string) => void
}

interface SceneManager {
  GetCurrentSceneName: (this: SceneManager) => string
}

interface GamepadMapLocationTooltip {
  LayoutStringLine: (
    this: GamepadMapLocationTooltip,
    section: GamepadTooltipSection,
    text: string
  ) => void
}

declare const GuiMouse: Control

declare const ZO_SCROLL_BAR_WIDTH: number

declare const ANIMATION_MANAGER: AnimationManager

declare const GetStringWidthScaledPixels: (
  this: void,
  font: FontObject,
  text: string,
  fontScale: number
) => number

interface LabelControl {
  GetDesiredWidth: () => number
  WasTruncated: () => boolean
}
