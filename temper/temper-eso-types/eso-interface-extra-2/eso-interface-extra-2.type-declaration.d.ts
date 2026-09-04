declare const CreateControl: <T extends Control = Control>(
  name: string,
  parent: Control,
  controlType: number
) => T

declare const ZO_SmithingTopLevelCreationPanel: Control

declare const ComparativeTooltip1: TooltipControl

declare const ComparativeTooltip2: TooltipControl

interface QuestTrackerHeaderControl extends Control {
  SetMovable: (this: unknown, movable: boolean) => undefined
}

declare const ZO_FocusedQuestTrackerPanelContainerQuestContainerTrackedHeader1: QuestTrackerHeaderControl

declare const FOCUSED_QUEST_TRACKER: Record<string, unknown>

declare const SI_PROMOTIONAL_EVENT_TRACKER_PROGRESS_FORMATTER: number

interface PromotionalEventTrackerFragment {
  SetHiddenForReason: (this: unknown, reason: string, hidden: boolean) => undefined
}

interface PromotionalEventActivityData {
  GetProgress: (this: unknown) => number
  GetCompletionThreshold: (this: unknown) => number
  GetDisplayName: (this: unknown) => string
}

interface PromotionalEventCampaignData {
  GetActivityData: (
    this: unknown,
    activityIndex: number
  ) => PromotionalEventActivityData | undefined
}

interface PromotionalEventTrackerGlobal {
  Update: (this: void, selfVar: unknown) => undefined
  GetFragment: (this: unknown) => PromotionalEventTrackerFragment
}

declare const PROMOTIONAL_EVENT_TRACKER: PromotionalEventTrackerGlobal | undefined

interface PromotionalEventManagerGlobal {
  GetCampaignDataByKey: (
    this: unknown,
    campaignKey: Id64
  ) => PromotionalEventCampaignData | undefined
}

interface PromotionalEventTrackerSelf {
  SetSubLabelText: (this: unknown, text: string) => undefined
  progressLabel: { SetText: (this: unknown, text: string) => undefined }
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
  onSelectionChangedCallback: (this: void, ...args: unknown[]) => undefined
}

interface PromotionalEventsKeyboard {
  trackedActivityRadioButtonGroup: PromotionalEventRadioButtonGroup
  OnDeferredInitialize: (this: void, ...args: unknown[]) => undefined
}

declare const STATS_SCENE: Scene

declare const ZO_CharacterWindowStatsScrollScrollChildZO_MundusStonesStatsEntry: Control

declare const ZO_StatsPanelPaneScrollChildDivider3: Control

declare const ZO_StatsPanelPaneScrollChildHeader3: Control

declare const ZO_StatsPanelPaneScrollChildMundusRow1: Control

declare const ZO_ChatWindowNotificationsEcho: Control

interface CenterScreenAnnounceMessageParams {
  SetCSAType: (this: unknown, csaType: number) => undefined
  SetText: (this: unknown, text: string) => undefined
}

declare const CENTER_SCREEN_ANNOUNCE: {
  CreateMessageParams: (
    this: unknown,
    category: number,
    soundId: string | undefined
  ) => CenterScreenAnnounceMessageParams
  AddMessageWithParams: (this: unknown, params: CenterScreenAnnounceMessageParams) => undefined
}

declare const ZO_WorldMap: Control

declare const GAMEPAD_WORLD_MAP_SCENE: Scene

declare const WORLD_MAP_ZONE_STORY_KEYBOARD_FRAGMENT: SceneFragment

declare const WORLD_MAP_ZONE_STORY_GAMEPAD_FRAGMENT: SceneFragment

declare const WORLD_MAP_KEY_FILTERS_FRAGMENT: SceneFragment

declare let ZO_WorldMap_ShowWorldMap: ((this: void) => undefined) | undefined

declare const ZO_WorldMap_GetMode: (this: void) => number

declare const ZO_WorldMapInfoMenuBarLabel: Control

declare const ZO_WorldMapFilters: Control

interface ZO_Animation {
  SetScaleValues: (this: unknown, startScale: number, endScale: number) => undefined
  SetDuration: (this: unknown, durationMs: number) => undefined
}

interface ZO_AnimationTimeline {
  SetPlaybackType: (this: unknown, playbackType: number, loopCount: number) => undefined
  PlayFromStart: (this: unknown) => undefined
}

declare const CreateSimpleAnimation: (
  this: void,
  animationType: number,
  control: Control,
  durationMs?: number
) => LuaMultiReturn<[ZO_Animation, ZO_AnimationTimeline]>

interface WorldMapPlayerPin {
  GetControl: (this: WorldMapPlayerPin) => Control | undefined
}

interface WorldMapPinManagerWithPlayerPin {
  GetPlayerPin: (this: WorldMapPinManagerWithPlayerPin) => WorldMapPlayerPin
}

interface GuildHistoryMasterListEntry {
  GetUISubcategoryIndex: (this: GuildHistoryMasterListEntry) => number
}

interface GuildHistoryRequest {
  IsRequestQueued: (this: GuildHistoryRequest) => boolean
  IsRequestQueuedFromAddon: (this: GuildHistoryRequest) => boolean
  IsRequestResponsePending: (this: GuildHistoryRequest) => boolean
  RequestMoreEvents: (this: GuildHistoryRequest) => number | undefined
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
  SetCurrentPage?: (this: GuildHistoryKeyboard, page: number, suppressRefresh: boolean) => undefined
  ShowNextPage?: (this: GuildHistoryKeyboard) => undefined
  GetRequestForSelection?: (this: GuildHistoryKeyboard) => GuildHistoryRequest
}

declare const GUILD_HISTORY_KEYBOARD: GuildHistoryKeyboard | undefined

declare const ZO_GuildHistory_Shared: object

declare const SI_ITEMTYPE34: number

declare const SI_COLLECTIBLECATEGORYTYPE26: number

declare const ZO_ActionBar1: Control

interface LamEditboxControl {
  UpdateValue: (this: LamEditboxControl, value: string) => undefined
}

declare const ZO_CraftingUtils_IsCraftingWindowOpen: (this: void) => boolean

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

declare const zo_iconTextFormatNoSpace: (
  this: void,
  texturePath: string,
  width: number,
  height: number,
  text?: string,
  inheritColor?: boolean
) => string

interface EndInWorldInteractionsFragment {
  OnShown: (this: EndInWorldInteractionsFragment) => undefined
}

declare const TREASURE_MAP_INVENTORY_SCENE: Scene

declare const FRAME_TARGET_CENTERED_FRAGMENT: SceneFragment

declare const LOOT_WINDOW: {
  list: {
    contents: Control
    data?: ReadonlyArray<{ control?: Control } | undefined>
  }
}

interface WindowManager {
  SetMouseFocusByName: (this: unknown, name: string) => undefined
  IsSecureRenderModeEnabled: (this: unknown) => boolean
}

interface ButtonControl {
  SetFont: (this: unknown, font: string) => undefined
}

declare const ZO_SceneManager_ToggleGameMenuBinding: (this: void) => undefined

interface BankMenuBar extends Control {
  m_object: {
    m_clickedButton: {
      m_buttonData: {
        descriptor?: number
      }
    }
  }
}

declare const ZO_HouseBankMenuBar: BankMenuBar

declare const ZO_PlayerInventoryMenuBar: BankMenuBar

declare const ZO_PlayerBankMenuBar: BankMenuBar

declare const ZO_GuildBankMenuBar: BankMenuBar

declare const ZO_SelectGuildBankDialog: Control

declare const SI_BANK_DEPOSIT: number

declare const SI_BANK_WITHDRAW: number

declare const CHARACTER_WINDOW_FRAGMENT: SceneFragment

declare const CHARACTER_WINDOW_STATS_FRAGMENT: SceneFragment

declare const LEFT_PANEL_BG_FRAGMENT: SceneFragment

interface NotificationProvider {
  Accept?: (this: void, data: unknown) => undefined
  Decline?: (this: void, data: unknown) => undefined
}

interface NotificationsListRow {
  TypeId: number
  data?: {
    provider?: NotificationProvider
  }
}

interface NotificationsList {
  data: ReadonlyArray<NotificationsListRow>
}
