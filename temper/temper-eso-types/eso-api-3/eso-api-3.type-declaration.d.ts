interface PromotionalEventsKeyboard {
  RefreshCampaignList: (this: PromotionalEventsKeyboard) => void
  SetCurrentActivityType: (this: PromotionalEventsKeyboard, activityType: number) => void
  [key: string]: unknown
}
declare const PROMOTIONAL_EVENTS_KEYBOARD: PromotionalEventsKeyboard

declare const PROMOTIONAL_EVENTS_GAMEPAD: Record<string, unknown>

declare const ZO_TimedActivities_Keyboard: Record<string, unknown> & {
  InitializeActivityFinderCategory: (this: unknown) => unknown
}

declare const ZO_TimedActivities_Gamepad: Record<string, unknown> & {
  InitializeActivityFinderCategory: (this: unknown) => unknown
}

interface PromotionalEventCampaignDataFactory {
  New: (this: PromotionalEventCampaignDataFactory, campaignId: unknown) => Record<string, unknown>
}
declare const ZO_PromotionalEventCampaignData: PromotionalEventCampaignDataFactory

interface PromotionalEventActivityDataFactory {
  New: (
    this: PromotionalEventActivityDataFactory,
    campaignData: unknown,
    activityIndex: number
  ) => Record<string, unknown>
}
declare const ZO_PromotionalEventActivityData: PromotionalEventActivityDataFactory

interface RewardDataFactory {
  New: (this: RewardDataFactory, rewardId: number, name: string) => Record<string, unknown>
}
declare const ZO_RewardData: RewardDataFactory

interface GroupMenuKeyboard {
  nodeList: Record<number, Record<string, unknown>>
  navigationTree: { Reset: (this: unknown) => void; Commit: (this: unknown) => void }
  AddCategoryTreeNodes: (this: GroupMenuKeyboard, nodeList: unknown) => void
  [key: string]: unknown
}
declare const GROUP_MENU_KEYBOARD: GroupMenuKeyboard

interface LoreReader {
  Show: (
    this: LoreReader,
    title: string,
    body: string,
    medium: number,
    showImmediately?: boolean,
    overrideImage?: unknown,
    overrideImageTitlePosition?: unknown
  ) => void
  [key: string]: unknown
}
declare const LORE_READER: LoreReader

interface PlayerToPlayer {
  RemoveFromIncomingQueue: (this: PlayerToPlayer, interactionType: number, name?: string) => void
  [key: string]: unknown
}
declare const PLAYER_TO_PLAYER: PlayerToPlayer

declare const CATEGORY_PRIORITY: number

declare const SI_ACTIVITY_FINDER_CATEGORY_TIMED_ACTIVITIES: number
declare const SI_GAMEPAD_ACTIVITY_FINDER_TOOLTIP_TIMED_ACTIVITIES: number
declare const SI_GAMEPAD_MAIN_MENU_ENDEAVOR_SEAL_MARKET_ENTRY: number

declare const LLC_FREE_STYLE_CHOICE: string

interface SceneManager {
  RegisterCallback: (
    this: SceneManager,
    event: string,
    callback: (this: void, scene: Scene, newState: number) => void
  ) => void
}
interface Scene {
  GetName: (this: Scene) => string
}

declare var ZO_AlertNoSuppression: (
  this: void,
  category: number,
  sound: unknown,
  message: string | number,
  ...rest: unknown[]
) => void

declare const SI_ENCHANT_NO_GLYPH_CREATED: number

interface DlwcQuestOutputControl extends LabelControl {
  AddText: (this: DlwcQuestOutputControl, text: string | number) => void
}

declare const DolgubonsWrits: TopLevelWindow
declare const DolgubonsWritsBackdropOutput: LabelControl
declare const DolgubonsWritsBackdropQuestOutput: DlwcQuestOutputControl
declare const DolgubonsWritsBackdropCraft: ButtonControl
declare const DolgubonsWritsFeedback: Control
declare const DolgubonsWritsBackdrop: Control
declare const DolgubonsWritsBackdropBackdrop: BackdropControl
declare const DolgubonsWritsBackdropHead: LabelControl
declare const DolgubonsWritsFabulousDrop: BackdropControl
declare const DolgubonsLazyWritResetWarnerBackdropTitle: LabelControl

declare var GetItemNameFromItemId: (this: void, itemId: number) => string
declare var isCurrentStationsWritComplete: (this: void) => boolean

declare const DolgubonsLazyWritStatus: TopLevelWindow
declare const DolgubonsLazyWritStatusBackdrop: BackdropControl
declare const DolgubonsLazyWritStatusBackdropOutput: LabelControl
declare const DolgubonsLazyWritStatusContainer: BackdropControl
declare const DolgubonsLazyWritStatusContainerRemaining: LabelControl
declare const DolgubonsLazyWritStatusContainerCooldown: BackdropControl

declare const DolgubonsLazyWritStatsWindow: TopLevelWindow
declare const DolgubonsLazyWritStatsWindowRewardScroll: Control
declare const DolgubonsLazyWritStatsWindowBackdrop: BackdropControl
declare const DolgubonsLazyWritStatsWindowBackdropTitle: LabelControl
declare const DolgubonsLazyWritStatsWindowBackdropWritCounter: LabelControl
declare const DolgubonsLazyWritStatsWindowBackdropCraftHeader: Control

declare const KEYBIND_STRIP_FADE_FRAGMENT: SceneFragment
declare const KEYBIND_STRIP_GAMEPAD_FRAGMENT: SceneFragment
declare const UI_SHORTCUTS_ACTION_LAYER_FRAGMENT: SceneFragment

interface DlwcKeybindButtonEntry {
  name: string
  actionName: string
  keybind: string
  order: number
  callback: (this: void, input?: unknown, input2?: unknown) => void
}
interface DlwcKeybindButtonGroup {
  alignment: number
  [index: number]: DlwcKeybindButtonEntry
}
interface KeybindStripObject {
  AddKeybindButtonGroup: ((this: KeybindStripObject, descriptor: DlwcKeybindButtonGroup) => void) &
    ((this: KeybindStripObject, descriptor: KeybindButtonGroupDescriptor[]) => void)
  RemoveKeybindButtonGroup: ((
    this: KeybindStripObject,
    descriptor: DlwcKeybindButtonGroup
  ) => void) &
    ((this: KeybindStripObject, descriptor: KeybindButtonGroupDescriptor[]) => void)
}

interface ZoAlphaAnimation {
  FadeOut: (this: ZoAlphaAnimation, duration: number, delay: number) => void
}

interface ZoAlphaAnimationClass {
  New: (this: ZoAlphaAnimationClass, control: Control) => ZoAlphaAnimation
}

declare const ZO_AlphaAnimation: ZoAlphaAnimationClass

declare const DolgubonsLazyWritQRCode: Control
declare const DolgubonsLazyWritQRCodeBackdropOutput: Control
declare const DolgubonsLazyWritChangelog: Control
declare const DolgubonsLazyWritChangelogBackdropOutput: LabelControl
declare const DolgubonsLazyWritResetWarner: Control
declare const DolgubonsLazyWritResetWarnerBackdrop: Control
declare const DolgubonsLazyWritResetWarnerBackdropOutput: LabelControl
declare const DolgubonsLazyWritResetWarnerBackdropClose: LabelControl
declare const DolgubonsLazyWritResetWarnerBackdropButton2: Control

declare function ZO_Alchemy_IsAlchemyItem(this: void, ...args: unknown[]): boolean

declare const QUEST_MAIN_STEP_INDEX: number

declare function findItemLocationById(
  this: void,
  itemId: number
): LuaMultiReturn<[bagId: number | undefined, slotIndex: number]>

declare const craftingQuestIndices: Record<string, unknown>

interface VirtualStackedItemEntry {
  bag: number
  index: number
  [key: string]: unknown
}
interface PlayerInventoryManager {
  GenerateListOfVirtualStackedItems: (
    this: PlayerInventoryManager,
    inventoryType: number,
    predicate: (this: void, ...args: never[]) => boolean,
    existingList?: Record<string | number, VirtualStackedItemEntry>
  ) => Record<string | number, VirtualStackedItemEntry>
}

declare const ZO_SharedInventoryManager: {
  ClearNewStatus: (this: unknown, bag: number, slot: number) => void
  [key: string]: unknown
}

declare const ZO_InventorySlotActions: {
  DoPrimaryAction: (this: unknown, ...args: unknown[]) => unknown
  [key: string]: unknown
}

declare const TRIBUTE: {
  gameFlowState: number
  [key: string]: unknown
}
