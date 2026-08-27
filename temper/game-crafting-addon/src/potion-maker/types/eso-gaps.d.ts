declare const ITEMTYPE_POTION_BASE: number
declare const ITEMTYPE_POISON_BASE: number
declare function ZO_Alchemy_IsThirdAlchemySlotUnlocked(this: void): boolean
declare function GetItemLinkReagentTraitInfo(
  this: void,
  itemLink: string,
  index: number
): LuaMultiReturn<[known: boolean, traitName: string]>

declare const TRISTATE_CHECK_BUTTON_CHECKED: number
declare const TRISTATE_CHECK_BUTTON_UNCHECKED: number
declare const TRISTATE_CHECK_BUTTON_INDETERMINATE: number

declare const MODIFY_TEXT_TYPE_NONE: number
declare const MODIFY_TEXT_TYPE_UPPERCASE: number
declare const CSA_CATEGORY_SMALL_TEXT: number

interface CenterScreenAnnounceMessage {
  SetSound(sound: string | undefined): void
  SetText(text: string): void
  MarkSuppressIconFrame(): void
  MarkShowImmediately(): void
}
interface CenterScreenAnnounceManager {
  CreateMessageParams(category: number, sound: string | undefined): CenterScreenAnnounceMessage
  QueueMessage(message: CenterScreenAnnounceMessage): void
}
declare const CENTER_SCREEN_ANNOUNCE: CenterScreenAnnounceManager

declare const KEYBIND_STRIP_ALIGN_RIGHT: number

declare function ZO_MenuBar_AddButton(this: void, menuBar: Control, buttonData: object): Control
declare function ZO_MenuBar_GetSelectedDescriptor(this: void, menuBar: Control): string
declare function ZO_MenuBar_SelectDescriptor(this: void, menuBar: Control, descriptor: string): void

interface CraftingResultsControl {
  craftingProcessCompleted: boolean
  DisplayDiscoveredTraits: (...args: unknown[]) => unknown
  enchantSoundPlayer: EnchantSoundPlayer
}
declare const CRAFTING_RESULTS: CraftingResultsControl

declare const SI_CUSTOMERSERVICESUBMITFEEDBACKSUBCATEGORIES212: number

declare function collectgarbage(this: void, opt?: string): void

declare const ZO_SharedRightPanelBackground: Control
interface Control {
  IsControlHidden(): boolean
}

declare const SI_BINDING_NAME_POTIONMAKER: number
declare const SI_BINDING_NAME_POISONMAKER: number
declare const SI_BINDING_NAME_POTIONMAKER_SEARCH: number
declare const SI_BINDING_NAME_POTIONMAKER_SEARCH_WRITS: number
declare const SI_BINDING_NAME_POTIONMAKER_SEARCH_FAVORITS: number

declare const SI_TOOLTIP_ITEM_NAME: number
declare const SI_CRAFTING_COMPONENT_TOOLTIP_TRAITS: number
declare const SI_ALCHEMY_UNKNOWN_RESULT: number
declare const SI_ITEM_FORMAT_STR_POTION: number
declare const SI_ITEM_FORMAT_STR_POISON: number
declare const SI_ITEM_FORMAT_STR_TEXT1: number
declare const SI_ITEM_FORMAT_STR_SPECIFIC_TYPE: number
declare const SI_ITEMTYPE31: number
declare const SI_GAMEPADITEMCATEGORY0: number
declare const SI_PROVISIONER_INGREDIENTS_HEADER: number
declare const SI_ALCHEMY_SOLVENT_HEADER: number
declare const SI_ALCHEMY_REAGENTS_HEADER: number
declare const SI_ALCHEMY_REAGENT_TRAIT_FORMATTER: number
declare const SI_CRAFTING_CLEAR_SELECTIONS: number
declare const SI_HOUSING_EDITOR_SELECT: number
declare const SI_KEYBINDINGS_LAYER_GENERAL: number
declare const SI_KEYBINDINGS_LAYER_POTIONMAKER: number

declare const STAT_LOWER_COLOR: ZoColorDef
declare const ZO_NORMAL_TEXT: ZoColorDef
declare const ZO_TOOLTIP_INSTRUCTIONAL_COLOR: ZoColorDef

declare function zo_plainstrfind(this: void, text: string, substring: string): boolean
declare function LocalizeString(this: void, format: string, ...args: string[]): string
declare function ZO_Alchemy_IsAlchemyItem(this: void, bagId: number, slotIndex: number): boolean
declare function ZO_CraftingUtils_ConnectKeybindButtonGroupToCraftingProcess(
  this: void,
  descriptor: unknown[]
): void
declare function ZO_ItemIconTooltip_OnAddGameData(this: void, ...args: unknown[]): void
declare function ZO_Loading_Initialize(this: void, control: Control, text: string): void
declare function ZO_Alert(
  this: void,
  category: number,
  sound: string | undefined,
  message: string
): void

interface AlchemyStationModeBar {
  m_object: Record<string, unknown>
}
interface AlchemyStationObject {
  modeBar: AlchemyStationModeBar
}
declare const ALCHEMY: AlchemyStationObject
declare const GAMEPAD_ALCHEMY: AlchemyStationObject
declare const ZO_Alchemy: object

interface CraftAdvisorManagerGlobal {
  FireCallbacks(name: string): void
}
declare const CRAFT_ADVISOR_MANAGER: CraftAdvisorManagerGlobal

interface SceneFragmentTarget {
  AddFragment: (this: SceneFragmentTarget, fragment: object) => void
}
declare const GAMEPAD_ALCHEMY_ROOT_SCENE: SceneFragmentTarget
declare const RIGHT_PANEL_BG_FRAGMENT: SceneFragment
declare const FRAME_EMOTE_FRAGMENT_MAP: SceneFragment
declare const FRAGMENT_GROUP: { MOUSE_DRIVEN_UI_WINDOW: object }
interface WindowSoundFragmentFactory {
  New(openSound: string | undefined, closeSound: string | undefined): SceneFragment
}
declare const ZO_WindowSoundFragment: WindowSoundFragmentFactory
interface FadeSceneFragmentFactory {
  New(control: Control, alwaysAnimate: boolean, duration: number): SceneFragment
}
declare const ZO_FadeSceneFragment: FadeSceneFragmentFactory
interface SceneGroupFactory {
  New(descriptor: string): object
}
declare const ZO_SceneGroup: SceneGroupFactory
declare const SCENE_FRAGMENT_SHOWING: number
declare const SCENE_FRAGMENT_SHOWN: number
declare const SCENE_FRAGMENT_HIDING: number
declare const SCENE_FRAGMENT_HIDDEN: number

declare const PopupTooltipTopLevel: Control
declare const LFFT: undefined

declare const FCOIsMarked: ((this: void, ...args: unknown[]) => boolean) | undefined
declare const FilterIt:
  | {
      GetFilterResult(this: void, ...args: unknown[]): unknown
      AccountSavedVariables: { FilteredItems: Record<string, number | undefined> }
    }
  | undefined
declare const FILTERIT_ALCHEMY: number

interface TooltipControl {
  AddHeaderLine(...args: unknown[]): void
}
declare function SetTooltipText(
  tooltip: TooltipControl,
  text: string,
  color: ZoColorDef | string | number
): void

interface Control {
  SetSimpleAnchorParent(...args: unknown[]): void
  EnableMouseButton(button: number, enabled: boolean): void
}
