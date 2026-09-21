interface NotificationManagerSingleton {
  totalNumNotifications: number
  sortFilterList?: {
    control?: Control
    list?: NotificationsList
  }
}

declare const NOTIFICATIONS_LFG_READY_CHECK_DATA: number

declare const ZO_MainMenuCategoryBarButton1: Control | undefined

declare const ZO_MainMenuCategoryBarButton1RemainingCrowns: Control | undefined

declare const ZO_MainMenuCategoryBarButton1Membership: Control | undefined

declare const ZO_MainMenuCategoryBarButton2: Control | undefined

declare const ZO_MainMenuCategoryBarPaddingBar1: Control

declare const SI_BINDING_NAME_FCOCS_ADDON_SETTINGS_MENU: number

interface LibAddonMenuHandle {
  OpenToPanel?: (this: LibAddonMenuHandle, panel: unknown) => undefined
  currentAddonPanel?: unknown
}

interface LibMainMenu2MenuItemData {
  binding?: string
  categoryName?: string | number
  callback?: (this: void) => undefined
  visible?: (this: void) => boolean
  normal?: string
  pressed?: string
  highlight?: string
  disabled?: string
}

interface LibMainMenu2 {
  Init: (this: LibMainMenu2) => undefined
  AddMenuItem: (this: LibMainMenu2, descriptor: string, data: LibMainMenu2MenuItemData) => undefined
}

interface MovableControl extends Control {
  SetMovable: (this: unknown, movable: boolean) => undefined
}

declare const BATTLEGROUND_HUD_FRAGMENT: {
  readonly control: MovableControl | undefined
  RegisterCallback: (
    this: unknown,
    event: string,
    callback: (this: void, oldState: number, newState: number) => undefined
  ) => undefined
}

declare const SCENE_FRAGMENT_SHOWN: number

interface CollectibleCategoryData {
  orderedCollectibles?: CollectibleData[]
  GetCollectibleCategoryTypesInCategory: (this: CollectibleCategoryData) => Record<number, boolean>
}

interface CollectibleData {
  collectibleId: number
  GetName: (this: CollectibleData) => string
  GetCategoryName: (this: CollectibleData) => string
  GetCategoryId: (this: CollectibleData) => number
  GetCategoryType: (this: CollectibleData) => number
  GetActorCategory: (this: CollectibleData) => number
  IsCategoryType: (this: CollectibleData, categoryType: number) => boolean
  IsUnlocked: (this: CollectibleData) => boolean
  IsFavoritable: (this: CollectibleData) => boolean
  IsFavorite: (this: CollectibleData) => boolean
  IsNew: (this: CollectibleData) => boolean
  IsActive: (this: CollectibleData, actorCategory: number) => boolean
  ShouldSuppressActiveState: (this: CollectibleData, actorCategory: number) => boolean
  WouldBeHidden: (this: CollectibleData, actorCategory: number) => boolean
}

interface CollectibleDataManager {
  collectibleCategoryIdToDataMap: Record<number, CollectibleCategoryData | undefined>
  GetCategoryDataById: (
    this: CollectibleDataManager,
    categoryId: number
  ) => CollectibleCategoryData | undefined
  GetCollectibleDataById: (this: CollectibleDataManager, collectibleId: number) => CollectibleData
}

declare const ZO_COLLECTIBLE_DATA_MANAGER: CollectibleDataManager

declare const ZO_CollectibleDataManager: {
  HasAnyUnlockedMounts: (this: void) => boolean
  HasAnyFavoriteMounts: (this: void) => boolean
}

declare const COLLECTIONS_BOOK: {
  UpdateCollectionVisualLayer: (this: void) => undefined
}

interface StatusIconControl extends Control {
  ClearIcons: (this: StatusIconControl) => undefined
  AddIcon: (this: StatusIconControl, texture: string, color?: ZoColorDef) => undefined
  Show: (this: StatusIconControl) => undefined
}

declare const ZO_CollectibleTile_Keyboard: object

declare const GetCombinationUnlockedCollectible: (
  this: void,
  referenceId: number
) => number | undefined

declare const moc: (this: void) => MocControl | undefined

interface MocControl extends Control {
  dataEntry?: { data?: CollectibleFragmentRowData }
}

interface CollectibleFragmentRowData {
  dataSource?: { collectibleId?: number; referenceId?: number }
  meetsRequirementsToBuy?: unknown
  slotIndex?: number
}

declare const GetMenuOwner: (this: void) => MocControl | undefined

declare const ZO_CHECK_ICON: string

declare const ZO_KEYBOARD_NEW_ICON: string

declare const SI_COLLECTIBLEUNLOCKSTATE2: number

declare const SI_COLLECTIBLE_ACTION_COMBINE: number

interface SmithingImprovementPanel {
  OnSlotChanged?: (this: void, ...args: unknown[]) => unknown
  improvementSlot: { HasItem: (this: unknown) => boolean }
  GetRowForSelection: (this: unknown) => unknown
  FindMaxBoostersToApply: (this: unknown) => number | undefined
  spinner: {
    Activate: (this: unknown) => undefined
    SetValue: (this: unknown, value: number) => undefined
  }
  ClearSelections: (this: unknown) => undefined
}

interface SmithingPanelWithImprovement {
  improvementPanel?: SmithingImprovementPanel
}

type GroupRosterBuildFn = (this: void, ...args: unknown[]) => undefined

interface GroupListManager {
  BuildMasterList: ((this: GroupListManager, ...args: unknown[]) => undefined) | undefined
  [key: string]: unknown
}

declare const GROUP_LIST_MANAGER: GroupListManager | undefined

type CPGetter = (this: void, unitTag: string) => number

declare var GetLevelOrChampionPointsStringNoIcon: unknown

declare const ZO_GROUP_ELECTION_DESCRIPTORS: {
  readonly READY_CHECK: unknown
}

declare const COMPANION_EQUIPMENT_KEYBOARD: object

interface PlayerInventoryManager {
  suppressItemAlert?: boolean
  suppressItemAddedAlert?: boolean
  newItemList?: unknown[]
  flashingSlots?: Record<string, unknown>
  listeningControls?: Record<string, Control | undefined>
}

interface SceneFragment {
  callbackRegistry?: {
    StateChange?: Array<Array<((oldState: number, newState: number) => undefined) | undefined>>
  }
}

interface TradingHouseDataType {
  setupCallback?: (this: void, ...args: never[]) => undefined
}

declare const TRADING_HOUSE: {
  searchResultsList: {
    dataTypes: Record<number, TradingHouseDataType>
  }
}

declare const ZO_ScrollList_ResetToTop: (this: void, scrollList: Control) => undefined

declare const ZO_ScrollList_ScrollAbsolute: (
  this: void,
  scrollList: Control,
  offset: number
) => undefined

declare const ZO_Scroll_UpdateScrollBar: (this: void, scrollContainer: Control) => undefined

interface ScrollbarButtonsCache {
  vertical?: Record<string, Control | undefined>
  horizontal?: Record<string, Control | undefined>
}

interface ScrollbarControl extends Control {
  FCOChangeStuffScrollbarButtons?: ScrollbarButtonsCache
  GetMinMax: () => LuaMultiReturn<[min: number, max: number]>
}

interface ScrollbarParentControl {
  useScrollbar?: boolean
  scrollbar?: ScrollbarControl
}

interface EsoInventoryContainer {
  useScrollbar?: boolean
  scrollbar?: ScrollbarControl
}

declare const ZO_PlayerInventoryList: ScrollbarParentControl

declare const ZO_GuildBankBackpack: ScrollbarParentControl

declare const ZO_CraftBagList: ScrollbarParentControl

declare const ZO_FurnitureVaultList: ScrollbarParentControl

declare const ZO_VengeanceInventory: unknown

declare const ZO_VengeanceInventoryList: ScrollbarParentControl

declare const SCENE_FRAGMENT_SHOWING: number

declare const zo_getSafeId64Key: (this: void, id64: Id64) => string

interface MailInbox {
  masterList?: Array<Record<string, unknown>>
  mailId?: Id64
}

declare const ZO_MailInbox: Control

declare const ZO_MailSend: Control

declare const ZO_Dialogs_IsDialogRegistered: (this: void, name: string) => boolean

declare const ZO_Dialogs_IsShowingDialog: (this: void) => boolean

declare const ZO_Dialogs_GetEditBoxText: (this: void, dialog: unknown) => string | undefined

interface ZO_DialogInfo {
  editBox?: Record<string, unknown>
  noChoiceCallback?: (this: void) => undefined
}

interface KeyboardSkillsWindow {
  control: Control
  skillLinesTree?: { rootNode?: { children?: FcocsSkillLinesTreeNode[] } }
}

declare const ZO_ActionBarTimer: {
  ApplyAnchor: (
    this: void,
    selfButtonTimer: unknown,
    target: Control,
    offsetY: number,
    offsetX: number
  ) => undefined
}

declare const ActionButton: object

declare const ZO_ONE_MINUTE_IN_SECONDS: number

declare const ZO_EFFECT_EXPIRATION_IMMINENCE_THRESHOLD_S: number

declare const ZO_FormatTimeShowUnitOverThresholdShowDecimalUnderThreshold: (
  this: void,
  timeS: number,
  showUnitOverThreshold: number,
  showDecimalUnderThreshold: number,
  timeFormatStyle: number
) => string

declare const STABLES_SCENE: Scene

declare const ZO_StablePanelSpeedTrainRowTrainButton: Control

declare const ZO_StablePanelStaminaTrainRowTrainButton: Control

declare const ZO_StablePanelCarryTrainRowTrainButton: Control
