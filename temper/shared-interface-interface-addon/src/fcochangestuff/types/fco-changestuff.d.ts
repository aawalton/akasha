declare function ZO_PreHook(
  objectTable: object,
  existingFunctionName: string,
  hookFunction: (...args: unknown[]) => unknown
): ((...args: unknown[]) => unknown) | undefined

declare const ZO_SmithingTopLevelCreationPanel: Control

declare const ComparativeTooltip1: TooltipControl
declare const ComparativeTooltip2: TooltipControl

interface QuestTrackerHeaderControl extends Control {
  SetMovable(movable: boolean): void
}
declare const ZO_FocusedQuestTrackerPanelContainerQuestContainerTrackedHeader1: QuestTrackerHeaderControl
declare const FOCUSED_QUEST_TRACKER: Record<string, unknown>

declare const SI_PROMOTIONAL_EVENT_TRACKER_PROGRESS_FORMATTER: number

interface PromotionalEventTrackerFragment {
  SetHiddenForReason(reason: string, hidden: boolean): void
}

interface PromotionalEventActivityData {
  GetProgress(): number
  GetCompletionThreshold(): number
  GetDisplayName(): string
}

interface PromotionalEventCampaignData {
  GetActivityData(activityIndex: number): PromotionalEventActivityData | undefined
}

interface PromotionalEventTrackerGlobal {
  Update: (this: void, selfVar: unknown) => void
  GetFragment(): PromotionalEventTrackerFragment
}
declare const PROMOTIONAL_EVENT_TRACKER: PromotionalEventTrackerGlobal | undefined

interface PromotionalEventManagerGlobal {
  GetCampaignDataByKey(campaignKey: Id64): PromotionalEventCampaignData | undefined
}
declare const PROMOTIONAL_EVENT_MANAGER: PromotionalEventManagerGlobal

interface PromotionalEventTrackerSelf {
  SetSubLabelText(text: string): void
  progressLabel: { SetText(text: string): void }
}

interface PromotionalEventRadioButton {
  parentObject?: {
    activityData?: {
      dataSource?: {
        campaignData?: {
          campaignKey?: number
        }
      }
    }
  }
}
interface PromotionalEventRadioButtonGroup {
  m_clickedButton?: PromotionalEventRadioButton
  onSelectionChangedCallback: (this: void, ...args: unknown[]) => void
}
interface PromotionalEventsKeyboardGlobal {
  trackedActivityRadioButtonGroup: PromotionalEventRadioButtonGroup
  OnDeferredInitialize: (this: void, ...args: unknown[]) => void
}
declare const PROMOTIONAL_EVENTS_KEYBOARD: PromotionalEventsKeyboardGlobal

declare const STATS_SCENE: Scene
declare const ZO_CharacterWindowStatsScrollScrollChildZO_MundusStonesStatsEntry: Control
declare const ZO_StatsPanelPaneScrollChildDivider3: Control
declare const ZO_StatsPanelPaneScrollChildHeader3: Control
declare const ZO_StatsPanelPaneScrollChildMundusRow1: Control

declare const ZO_ChatWindowNotificationsEcho: Control

interface CenterScreenAnnounceMessageParams {
  SetCSAType(csaType: number): void
  SetText(text: string): void
}
declare const CENTER_SCREEN_ANNOUNCE: {
  CreateMessageParams(
    category: number,
    soundId: string | undefined
  ): CenterScreenAnnounceMessageParams
  AddMessageWithParams(params: CenterScreenAnnounceMessageParams): void
}

declare const ZO_WorldMap: Control
declare const GAMEPAD_WORLD_MAP_SCENE: unknown
declare const WORLD_MAP_ZONE_STORY_KEYBOARD_FRAGMENT: SceneFragment
declare const WORLD_MAP_ZONE_STORY_GAMEPAD_FRAGMENT: SceneFragment
declare const WORLD_MAP_KEY_FILTERS_FRAGMENT: SceneFragment
declare const ZO_WorldMap_ShowWorldMap: ((this: void) => void) | undefined
declare function ZO_WorldMap_GetMode(this: void): number
declare const MAP_MODE_VOTANS_MINIMAP: number | undefined
declare const EVENT_MOUNTED_STATE_CHANGED: number
declare function IsMounted(this: void): boolean
declare function IsInGamepadPreferredMode(this: void): boolean
declare function IsMapLocationVisible(this: void, locationIndex: number): boolean
declare const GetParentZoneId: ((this: void) => number | undefined) | undefined
declare function GetUnitZoneIndex(this: void, unitTag: string): number | undefined
declare const ZO_WorldMapInfoMenuBarLabel: Control
declare const ZO_WorldMapFilters: Control
declare const MOUSE_BUTTON_INDEX_RIGHT: number
declare const ANIMATION_SCALE: number
declare const ANIMATION_PLAYBACK_PING_PONG: number
interface ZO_Animation {
  SetScaleValues(startScale: number, endScale: number): void
  SetDuration(durationMs: number): void
}
interface ZO_AnimationTimeline {
  SetPlaybackType(playbackType: number, loopCount: number): void
  PlayFromStart(): void
}
declare function CreateSimpleAnimation(
  this: void,
  animationType: number,
  control: Control,
  durationMs?: number
): LuaMultiReturn<[ZO_Animation, ZO_AnimationTimeline]>
declare const BMU: { toggleZoneGuide?: unknown } | undefined
declare const Teleporter: { toggleZoneGuide?: unknown } | undefined
interface WorldMapPlayerPin {
  GetControl(this: WorldMapPlayerPin): Control | undefined
}
interface WorldMapPinManagerWithPlayerPin {
  GetPlayerPin(this: WorldMapPinManagerWithPlayerPin): WorldMapPlayerPin
}

interface GuildHistoryMasterListEntry {
  GetUISubcategoryIndex(this: GuildHistoryMasterListEntry): number
}
interface GuildHistoryRequest {
  IsRequestQueued(this: GuildHistoryRequest): boolean
  IsRequestQueuedFromAddon(this: GuildHistoryRequest): boolean
  IsRequestResponsePending(this: GuildHistoryRequest): boolean
  RequestMoreEvents(this: GuildHistoryRequest): number | undefined
}
interface GuildHistoryKeyboard {
  initialized?: boolean
  control?: Control
  masterList?: GuildHistoryMasterListEntry[]
  currentPage?: number
  hasNextPage?: boolean
  selectedSubcategoryIndex?: number
  selectedEventCategory?: unknown
  guildId?: unknown
  SetCurrentPage?: (this: GuildHistoryKeyboard, page: number, suppressRefresh: boolean) => void
  ShowNextPage?: (this: GuildHistoryKeyboard) => void
  GetRequestForSelection?: (this: GuildHistoryKeyboard) => GuildHistoryRequest
}
declare const GUILD_HISTORY_KEYBOARD: GuildHistoryKeyboard | undefined
declare const ZO_GuildHistory_Shared: object
declare const GUILD_HISTORY_DATA_READY_STATE_ON_COOLDOWN: number
declare function CreateControl(
  this: void,
  name: string,
  parent: Control,
  controlType: CtButton
): ButtonControl

declare const _G: Record<string, number | undefined>

declare const SI_ITEMTYPE34: number
declare const SI_COLLECTIBLECATEGORYTYPE26: number

interface VotansMenuSettingsGlobal {
  IsMenuButtonEnabled(this: VotansMenuSettingsGlobal): boolean
}
declare const VOTANS_MENU_SETTINGS: VotansMenuSettingsGlobal | undefined

declare const ZO_ActionBar1: Control

interface LamEditboxControl {
  UpdateValue(this: LamEditboxControl, value: string): void
}
declare const FCOCHANGESTUFF_repositionActionSlotTimersOffsetX_EditBox: LamEditboxControl
declare const FCOCHANGESTUFF_repositionActionSlotTimersOffsetY_EditBox: LamEditboxControl

declare const FCOCHANGESTUFF_LAM_CUSTOM_SOUNDS_DISABLE_PARENT: Control
declare const FCOCHANGESTUFF_LAM_MOUNT_FAVORITES_EXCLUDE_PARENT: Control

declare function ZO_CraftingUtils_IsCraftingWindowOpen(this: void): boolean

declare const SI_TRADING_HOUSE_BROWSE_ARMOR_TYPE_LIGHT: number
declare const SI_TRADING_HOUSE_BROWSE_ARMOR_TYPE_MEDIUM: number
declare const SI_ARMORTYPE_TRADINGHOUSECATEGORY1: number
declare const SI_ARMORTYPE_TRADINGHOUSECATEGORY2: number

declare const SCENE_FRAGMENT_HIDING: number

declare const OPTIONS_WINDOW_FRAGMENT: SceneFragment

interface ZO_Dialog1Control extends Control {
  textParams?: {
    mainTextParams?: ReadonlyArray<string>
  }
}
declare const ZO_Dialog1: ZO_Dialog1Control
declare const ZO_Dialog1EditBox: EditControl

declare function zo_iconTextFormatNoSpace(
  this: void,
  texturePath: string,
  width: number,
  height: number,
  text?: string,
  inheritColor?: boolean
): string
