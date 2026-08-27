declare const ZO_ONE_SECOND_IN_MILLISECONDS: number
declare const ZO_ONE_DAY_IN_SECONDS: number

declare const SI_SPECIALIZEDITEMTYPE100: number
declare const SI_SPECIALIZEDITEMTYPE101: number
declare const SI_SPECIALIZEDITEMTYPE113: number
declare const SI_ITEM_FORMAT_STR_TEXT1_TEXT2: number
declare const SI_TOOLTIP_ITEM_NAME: number
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
declare function ZO_NormalizeSecondsSince(this: void, time: number): number
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
  SetFromControlAnchor: (control: unknown) => void
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

interface SlotData {
  bag: number
  index: number
  specializedItemType: number
  name: string
  uniqueId: Id64
}

interface SharedInventoryManager {
  RegisterCallback: <T extends unknown[] = unknown[]>(
    eventName: string,
    callback: (this: void, ...args: T) => void
  ) => void
}
declare const SHARED_INVENTORY: SharedInventoryManager

interface CompassOverPinLabel {
  SetText: (text: string) => void
}
interface CompassPinAnimation {
  IsPlaying: () => boolean
  IsPlayingBackward: () => boolean
  PlayForward: () => void
  PlayBackward: () => void
}
interface CompassControl {
  centerOverPinLabel: CompassOverPinLabel
  centerOverPinLabelAnimation: CompassPinAnimation
  areaOverrideAnimation: CompassPinAnimation
}
declare const COMPASS: CompassControl

interface WorldMapQuestsDataSingleton {
  ShouldMapShowQuestsInList: () => boolean
}
declare const ZO_WorldMapQuestsData_Singleton: WorldMapQuestsDataSingleton

declare const TREASURE_MAP_INVENTORY_SCENE: Scene
declare const GAMEPAD_TREASURE_MAP_INVENTORY_SCENE: Scene
declare const GAMEPAD_WORLD_MAP_SCENE: Scene

interface Control {
  RegisterForEvent: <T extends unknown[] = unknown[]>(
    event: number,
    callback: (this: void, ...args: T) => void
  ) => void
  UnregisterForEvent: (event: number) => void
  SetTexture: (texturePath: string) => void
}

interface SceneManager {
  GetCurrentSceneName: () => string
}

interface PlayerInventoryManager {
  GenerateListOfVirtualStackedItems: (
    bagId: number,
    filterFunction: (this: void, bagId: number, slotIndex: number) => boolean
  ) => Record<string | number, SlotData>
}

interface GamepadMapLocationTooltip {
  LayoutStringLine: (section: unknown, text: string) => void
}

interface HUDFadeSceneFragment {
  IsHidden(): boolean
  SetHiddenForReason(
    reason: string,
    hidden: boolean,
    customShowDuration?: number,
    customHideDuration?: number
  ): void
}
