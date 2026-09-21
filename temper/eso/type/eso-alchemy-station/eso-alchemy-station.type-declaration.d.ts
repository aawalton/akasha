declare function ZO_Alchemy_IsThirdAlchemySlotUnlocked(this: void): boolean

declare const TRISTATE_CHECK_BUTTON_CHECKED: number

declare const TRISTATE_CHECK_BUTTON_UNCHECKED: number

declare const TRISTATE_CHECK_BUTTON_INDETERMINATE: number

interface CenterScreenAnnounceMessage {
  SetSound: (sound: string | undefined) => undefined
  SetText: (text: string) => undefined
  MarkSuppressIconFrame: () => undefined
  MarkShowImmediately: () => undefined
}

interface CenterScreenAnnounceManager {
  CreateMessageParams: (category: number, sound: string | undefined) => CenterScreenAnnounceMessage
  QueueMessage: (message: CenterScreenAnnounceMessage) => undefined
}

declare const KEYBIND_STRIP_ALIGN_RIGHT: number

interface CraftingResultsControl {
  craftingProcessCompleted: boolean
  DisplayDiscoveredTraits: (...args: unknown[]) => unknown
  enchantSoundPlayer: EnchantSoundPlayer
}

declare const CRAFTING_RESULTS: CraftingResultsControl

declare const SI_CUSTOMERSERVICESUBMITFEEDBACKSUBCATEGORIES212: number

declare const ZO_SharedRightPanelBackground: Control

declare const ZO_SharedRightBackground: Control

declare const SI_BINDING_NAME_POTIONMAKER: number

declare const SI_BINDING_NAME_POISONMAKER: number

declare const SI_BINDING_NAME_POTIONMAKER_SEARCH: number

declare const SI_BINDING_NAME_POTIONMAKER_SEARCH_WRITS: number

declare const SI_BINDING_NAME_POTIONMAKER_SEARCH_FAVORITS: number

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

declare function LocalizeString(this: void, format: string, ...args: string[]): string

declare function ZO_CraftingUtils_ConnectKeybindButtonGroupToCraftingProcess(
  this: void,
  descriptor: unknown[]
): undefined

declare function ZO_ItemIconTooltip_OnAddGameData(this: void, ...args: unknown[]): undefined

declare function ZO_Loading_Initialize(this: void, control: Control, text: string): undefined

interface AlchemyStationModeBar extends Control {
  m_object: Record<string, unknown>
}

interface AlchemyStationObject {
  mode: number | string
  modeBar: AlchemyStationModeBar
  modeBarLabel: LabelControl
  control: Control
  SetMode: (this: AlchemyStationObject, mode: number | string) => undefined
}

declare const ALCHEMY: AlchemyStationObject

declare const GAMEPAD_ALCHEMY: AlchemyStationObject

declare const ZO_Alchemy: object

interface CraftAdvisorManagerGlobal {
  FireCallbacks: (name: string) => undefined
}

declare const CRAFT_ADVISOR_MANAGER: CraftAdvisorManagerGlobal

interface SceneFragmentTarget {
  AddFragment: (this: SceneFragmentTarget, fragment: object) => undefined
}

declare const GAMEPAD_ALCHEMY_ROOT_SCENE: SceneFragmentTarget

declare const RIGHT_PANEL_BG_FRAGMENT: SceneFragment

declare const FRAGMENT_GROUP: {
  MOUSE_DRIVEN_UI_WINDOW: object
  FRAME_TARGET_STANDARD_RIGHT_PANEL: object
  PLAYER_PROGRESS_BAR_KEYBOARD_CURRENT: object
}

interface WindowSoundFragmentFactory {
  New: (openSound: string | undefined, closeSound: string | undefined) => SceneFragment
}

declare const ZO_WindowSoundFragment: WindowSoundFragmentFactory

interface FadeSceneFragmentFactory {
  New: (control: Control, alwaysAnimate?: boolean, duration?: number) => SceneFragment
}

declare const ZO_FadeSceneFragment: FadeSceneFragmentFactory

interface SceneGroupFactory {
  New: (descriptor: string) => object
}

declare const ZO_SceneGroup: SceneGroupFactory

declare const SCENE_FRAGMENT_HIDDEN: number

declare const PopupTooltipTopLevel: Control

declare const FILTERIT_ALCHEMY: number
