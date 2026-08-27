declare function ZO_PreHook<T extends object>(
  objectTable: T,
  existingMethodNameOrEventId: string | number,
  hookFunction: (this: void, ...args: never[]) => unknown
): ((...args: never[]) => unknown) | undefined

interface CenterScreenMessageParams {
  mainText: string
}
type CenterScreenHandler = (this: void, ...args: unknown[]) => CenterScreenMessageParams | undefined
declare function ZO_CenterScreenAnnounce_GetEventHandlers(
  this: void
): Record<number, CenterScreenHandler>

type AlertTextHandler = (this: void, ...args: unknown[]) => unknown
declare function ZO_AlertText_GetHandlers(this: void): Record<number, AlertTextHandler>

interface ZO_RecentMessagesInstance {
  expiryDelayMilliseconds: number
  ShouldDisplayMessage: (this: ZO_RecentMessagesInstance, message: string | number) => boolean
}
interface ZO_RecentMessagesStatic {
  New: (this: ZO_RecentMessagesStatic, expiryDelayMilliseconds: number) => ZO_RecentMessagesInstance
}
declare const ZO_RecentMessages: ZO_RecentMessagesStatic

interface Scene {
  HasFragment(fragment: SceneFragment): boolean
  toRestore?: SceneFragment[] | boolean
}
interface SceneManager {
  scenes: Record<string, Scene | undefined>
  ShowBaseScene(): void
}

declare const FRAME_PLAYER_FRAGMENT: SceneFragment
declare const FRAME_EMOTE_FRAGMENT_INVENTORY: SceneFragment
declare const FRAME_EMOTE_FRAGMENT_SKILLS: SceneFragment
declare const FRAME_EMOTE_FRAGMENT_JOURNAL: SceneFragment
declare const FRAME_EMOTE_FRAGMENT_MAP: SceneFragment
declare const FRAME_EMOTE_FRAGMENT_SOCIAL: SceneFragment
declare const FRAME_EMOTE_FRAGMENT_AVA: SceneFragment
declare const FRAME_EMOTE_FRAGMENT_SYSTEM: SceneFragment
declare const FRAME_EMOTE_FRAGMENT_LOOT: SceneFragment
declare const FRAME_EMOTE_FRAGMENT_CHAMPION: SceneFragment
declare const MINIMIZE_CHAT_FRAGMENT: SceneFragment
declare const TRADING_HOUSE_SCENE: Scene
interface EndInWorldInteractionsFragment {
  OnShown: (this: EndInWorldInteractionsFragment) => void
}
declare const END_IN_WORLD_INTERACTIONS_FRAGMENT: EndInWorldInteractionsFragment

interface EsoEventControl {
  RegisterForEvent(eventId: number, callback: (this: void, ...args: never[]) => void): void
  UnregisterForEvent(eventId: number): void
  AddFilterForEvent(eventId: number, filterType: number, filterValue: unknown): void
}

declare const RETICLE: object
interface NotificationManagerSingleton {
  RefreshNotificationList: (this: NotificationManagerSingleton) => void
}
declare const NOTIFICATIONS: NotificationManagerSingleton
declare const ZO_InventorySlotActions: object
declare const SlashCommandAutoComplete: object
declare const ZO_GamepadStoreManager: { RepairMessageBox?: unknown } | undefined
declare const ZO_SmithingTopLevelCreationPanelStyleListUniversalStyleItem: {
  SetHidden(hidden: boolean): void
}
declare const MAIL_MANAGER_GAMEPAD: { inbox: { GetActiveMailId(): Id64 } }

interface ErrorFrameSingleton {
  OnUIError: (this: ErrorFrameSingleton, errString: string) => void
}
declare const ZO_ERROR_FRAME: ErrorFrameSingleton

interface MailInbox {
  mailId?: Id64
}

declare const ZO_LeaderboardScoreProvider: object
declare const ZO_GuildMotDProvider: object
declare const ZO_CraftBagAutoTransferProvider: object
declare const ZO_GuildInviteProvider: object
declare const ZO_GuildNewApplicationsProvider: object
declare const ZO_GuildRosterManager: object | undefined
declare const GUILD_ROSTER: object

declare const GUILD_HOME: {
  keybindStripDescriptor: Record<number, { visible: (this: void) => boolean } | undefined>
  guildId: number
  guildName: string
}

interface PlayerToPlayerSingleton {
  control: EsoEventControl
  incomingQueue: Array<{ incomingType: number }>
  AddPromptToIncomingQueue: (
    this: PlayerToPlayerSingleton,
    incomingType: number,
    uniqueIdentifier: unknown,
    name: string,
    message: string,
    acceptCallback: (this: void) => void,
    declineCallback: (this: void) => void,
    deferDecisionCallback: (this: void) => void
  ) => { guildId?: number }
  RemoveFromIncomingQueue: (
    this: PlayerToPlayerSingleton,
    incomingType: number,
    name: string
  ) => void
}
declare const PLAYER_TO_PLAYER: PlayerToPlayerSingleton

interface LoreReaderSingleton {
  control: EsoEventControl
  OpenSound: string
  Show: (
    this: LoreReaderSingleton,
    title: string,
    body: string,
    medium: number,
    showTitle: boolean,
    overrideImage?: unknown,
    overrideImageTitlePosition?: unknown
  ) => void
}
declare const LORE_READER: LoreReaderSingleton
declare const INTERACTION: {
  eventCallbacks: Record<number, (this: void, ...args: unknown[]) => void>
  control: EsoEventControl
}

declare function ZO_Alert(category: number, soundId: unknown, message: string): void
declare function ZO_NormalizeSecondsSince(seconds: number): number
declare function ZO_FormatUserFacingDisplayName(displayName: string): string
declare function ZO_Dialogs_ReleaseAllDialogsOfName(name: string): void
declare function ZO_Menu_SetLastCommandWasFromMenu(wasFromMenu: boolean): void
declare function EquipItem(bagId: number, slotIndex: number): void
declare function GetAllianceBannerIcon(alliance: number): string

declare const ALERT: number

declare const SI_GUILD_ROSTER_ADDED: number
declare const SI_GUILD_ROSTER_REMOVED: number
declare const SI_ENDLESS_DUNGEON_LEADERBOARDS_CATEGORIES_HEADER: number
declare const SI_PLAYER_TO_PLAYER_INCOMING_GUILD_REQUEST: number
declare const SI_TRADESKILLRESULT119: number
declare const SI_SMITHING_EXTRACTION_FAILED: number
declare const SI_SMITHING_DECONSTRUCTION_LEVEL_PENALTY: number
declare const SI_ALCHEMY_NO_YIELD: number
declare const SI_ENCHANT_NO_YIELD: number
declare const SI_ITEM_ACTION_REPORT_ITEM: number

declare const EVENT_IMPERIAL_CITY_ACCESS_GAINED_NOTIFICATION: number
declare const EVENT_IMPERIAL_CITY_ACCESS_LOST_NOTIFICATION: number

declare const ZO_ADJUSTED_UNIVERSAL_STYLE_ITEM_INDEX: number

declare const SI_GAMEPAD_MAIN_MENU_CROWN_STORE_CATEGORY: number
declare const SI_WINDOW_TITLE_LORE_LIBRARY: number
declare const SI_NOTIFICATIONTYPE15: number
declare const SI_WINDOW_TITLE_SKILLS: number
declare const SI_MAIN_MENU_INVENTORY: number
declare const SI_MAIN_MENU_MAP: number
declare const SI_JOURNAL_MENU_QUESTS: number
declare const SI_CHAT_TAB_GENERAL: number

type PointOfInterestType = number
