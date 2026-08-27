declare function ConvertRGBToHSL(
  r: number,
  g: number,
  b: number
): LuaMultiReturn<[number, number, number]>

declare function zo_strsplit(separator: string, str: string): LuaMultiReturn<string[]>

declare function zo_strlen(s: string): number

declare function zo_clamp(value: number, min: number, max: number): number

declare const SI_ZONE_NAME: number

declare const _G: Record<string, unknown>

declare const LibAddonMenu2: LibAddonMenuInstance | undefined

interface LibAddonMenuInstance {
  OpenToPanel(this: LibAddonMenuInstance, panel: object): void
  [key: string]: unknown
}

type LinkHandlerCallback = (this: void, ...args: unknown[]) => boolean | undefined
interface LinkHandler {
  LINK_CLICKED_EVENT: string
  LINK_MOUSE_UP_EVENT: string
  RegisterCallback(this: LinkHandler, eventName: string, callback: LinkHandlerCallback): void
}
declare const LINK_HANDLER: LinkHandler

declare function SafeAddString(this: void, id: number, text: string, numArgs: number): void

interface EventManager {
  RegisterForEvent<T extends unknown[] = unknown[]>(
    namespace: string,
    event: number,
    callback: (eventCode: number, ...args: T) => void,
    registerOnce: boolean
  ): boolean
}

interface ZoObjectSubclass {
  [key: string]: unknown
}
interface ZoObjectClass {
  Subclass<T extends ZoObjectSubclass = ZoObjectSubclass>(): T
  New: <T = object>(this: void, self: object) => T
}
declare const ZO_Object: ZoObjectClass

interface CategoryFragment {
  GetControl(this: CategoryFragment): Control
}
interface Scene {
  AddFragmentGroup(fragmentGroup: object): void
  GetFragmentWithCategory(this: Scene, category: string): CategoryFragment
}

interface SceneManager {
  Push(this: SceneManager, sceneName: string): void
}

interface SetTitleFragment extends SceneFragment {
  Show: (this: SetTitleFragment) => void
  OnShown(this: SetTitleFragment): void
}
interface ZoSetTitleFragmentStatic {
  New(): SetTitleFragment
}
declare const ZO_SetTitleFragment: ZoSetTitleFragmentStatic

declare const SCENE_FRAGMENT_SHOWING: number
declare const SCENE_FRAGMENT_HIDING: number

declare const FRAME_EMOTE_FRAGMENT_JOURNAL: SceneFragment
declare const CODEX_WINDOW_SOUNDS: SceneFragment
declare const TITLE_FRAGMENT: SceneFragment
declare const RIGHT_BG_FRAGMENT: SceneFragment
declare const TOP_BAR_FRAGMENT: SceneFragment
declare const FRAME_PLAYER_FRAGMENT: SceneFragment

declare const FRAGMENT_GROUP: {
  MOUSE_DRIVEN_UI_WINDOW: object
  FRAME_TARGET_STANDARD_RIGHT_PANEL: object
  PLAYER_PROGRESS_BAR_KEYBOARD_CURRENT: object
}

interface MainMenuKeyboard {
  categoryBar?: Control
  categoryBarFragment?: SceneFragment
  lastCategory: number
}
declare const MENU_CATEGORY_CHARACTER: number

interface KeybindStripObject {
  AddKeybindButton(this: KeybindStripObject, descriptor: object): void
  RemoveKeybindButton(this: KeybindStripObject, descriptor: object): void
}
declare const KEYBIND_STRIP_ALIGN_RIGHT: number

declare function ZO_MenuBar_AddButton(menuBar: Control, buttonData: object): void
declare function ZO_MenuBar_SelectDescriptor(
  menuBar: Control,
  descriptor: string,
  skipAnimation?: boolean
): boolean
declare function ZO_MenuBar_GetSelectedDescriptor(menuBar: Control): string | undefined
declare function ZO_MenuBar_SelectFirstVisibleButton(menuBar: Control, blockCallback: boolean): void

interface ZoComboBox {
  SetHeight?(this: ZoComboBox, height: number): void
  SetSortsItems(this: ZoComboBox, sorts: boolean): void
  ClearItems(this: ZoComboBox): void
  AddItem(this: ZoComboBox, entry: object, updateMode?: number): void
  GetNumItems(this: ZoComboBox): number
  SelectItemByIndex(this: ZoComboBox, index: number, ...args: unknown[]): void
  GetContainer(this: ZoComboBox): Control
  shouldOpenAbove?: boolean
  m_container?: Control
  m_containerWidth?: number
  [key: string]: unknown
}
interface ZoComboBoxStatic {
  CreateItemEntry(label: string, callback?: (this: void, ...args: unknown[]) => void): object
}
declare const ZO_ComboBox: ZoComboBoxStatic
declare const ZO_COMBOBOX_SUPPRESS_UPDATE: number

declare const ZO_COMBO_BOX_DROPDOWN_KEYBOARD: {
  control: Control
  [key: string]: unknown
}

interface ZoStringSearch {
  AddProcessor(
    this: ZoStringSearch,
    typeId: number,
    processor: (
      this: void,
      stringSearch: ZoStringSearch,
      data: object,
      searchTerm: string,
      ...args: unknown[]
    ) => boolean
  ): void
  IsMatch(this: ZoStringSearch, searchTerm: string, data: object): boolean
  [key: string]: unknown
}
interface ZoStringSearchStatic {
  New(): ZoStringSearch
}
declare const ZO_StringSearch: ZoStringSearchStatic

declare const ZO_DISABLED_TEXT: ZoColorDef

declare function ZO_ScrollList_GetData(this: void, control: Control): unknown

interface ZoSortFilterListClass {
  Row_OnMouseEnter: (this: void, self: object, control: Control) => void
  Row_OnMouseExit: (this: void, self: object, control: Control) => void
}

declare function AddMenuItem(
  labelText: string,
  callback: (this: void) => void,
  itemType: number | undefined,
  myFont: string | undefined,
  normalColor: ZoColorDef | undefined,
  highlightColor: ZoColorDef | undefined,
  itemYPad: number | undefined,
  horizontalAlignment: number | undefined,
  isHighlightable: boolean | undefined,
  onEnter: ((this: void) => void) | undefined,
  onExit: ((this: void) => void) | undefined,
  enabled: boolean
): number

declare const SI_GAME_MENU_SETTINGS: number
declare var SI_BINDING_NAME_EXTENDED_JOURNAL: number

declare const SI_LEJ_NAME: number
declare const SI_LEJ_SEARCH: number
declare const SI_LEJ_SERVER: number
declare const SI_LEJ_ACCOUNT: number
declare const SI_LEJ_CHARACTER: number
declare const SI_LEJ_CHANGE: number

declare const ExtendedJournalFrame: Control
declare const ExtendedJournalItemTooltip: TooltipControl

interface TooltipControl {
  SetLink(this: TooltipControl, itemLink: string): void
  SetCollectible(
    this: TooltipControl,
    collectibleId: number,
    showVisualLayer: boolean,
    showBlockReason: boolean
  ): void
  SetAntiquityLead(this: TooltipControl, antiquityId: number): void
  SetAntiquitySetFragment(this: TooltipControl, antiquityId: number): void
  AddControl(this: TooltipControl, control: Control): void
  SetAnchor(this: TooltipControl, point: number): void
}

declare function GetAntiquitySetId(antiquityId: number): number
