declare const SI_WINDOW_TITLE_WORLD_MAP: number
declare const SI_LORE_LIBRARY_READ: number
declare const SI_LORE_LIBRARY_TOTAL_COLLECTED: number
declare const SI_LORE_LIBRARY_HIRELING_CORRESPONDENCE_ENTRY_FORMATTER: number
declare const SI_LORE_LIBRARY_HIRELING_CORRESPONDENCE_SENDER_FORMATTER: number
declare const SI_LORE_LIBRARY_HIRELING_CORRESPONDENCE_HEADER: number
declare const SI_ITEM_ACTION_LINK_TO_CHAT: number
declare const SI_WORLD_MAP_ACTION_SET_PLAYER_WAYPOINT: number
declare const SI_INSTANCEDISPLAYTYPE6: number
declare const SI_INSTANCEDISPLAYTYPE7: number
declare const SI_INSTANCETYPE2: number

declare const KEYBIND_STRIP_ALIGN_LEFT: number
declare const MENU_CATEGORY_MAP: number
declare const HIRELING_TYPE_ITERATION_BEGIN: number
declare const HIRELING_TYPE_ITERATION_END: number

declare const ZO_SUCCEEDED_TEXT: ZoColorDef

declare const ZO_MAP_TOOLTIP_MODE: {
  readonly INFORMATION: number
}

interface ZoCallbackObjectInstance {
  RegisterCallback: (
    this: ZoCallbackObjectInstance,
    callbackName: string,
    callback: (this: void, ...args: unknown[]) => void
  ) => void
  UnregisterCallback: (
    this: ZoCallbackObjectInstance,
    callbackName: string,
    callback: (this: void, ...args: unknown[]) => void
  ) => void
  FireCallbacks: (this: ZoCallbackObjectInstance, callbackName: string, ...args: unknown[]) => void
}
interface ZoCallbackObjectClass {
  New: (this: ZoCallbackObjectClass) => ZoCallbackObjectInstance
}
declare const ZO_CallbackObject: ZoCallbackObjectClass

interface KeybindButtonGroupDescriptor {
  alignment: number
  name: string | ((this: void) => string)
  keybind: string
  callback: (this: void) => void
  visible?: (this: void) => boolean
}
interface KeybindStripObject {
  AddKeybindButtonGroup: ((this: KeybindStripObject, descriptor: DlwcKeybindButtonGroup) => void) &
    ((this: KeybindStripObject, descriptor: KeybindButtonGroupDescriptor[]) => void)
  RemoveKeybindButtonGroup: ((
    this: KeybindStripObject,
    descriptor: DlwcKeybindButtonGroup
  ) => void) &
    ((this: KeybindStripObject, descriptor: KeybindButtonGroupDescriptor[]) => void)
  UpdateKeybindButtonGroup: (
    this: KeybindStripObject,
    descriptor: KeybindButtonGroupDescriptor[]
  ) => void
  HasKeybindButtonGroup: (
    this: KeybindStripObject,
    descriptor: KeybindButtonGroupDescriptor[]
  ) => boolean
}
declare const KEYBIND_STRIP: KeybindStripObject

declare const LORE_LIBRARY_SCENE: Scene

interface LoreLibraryNavigationTree {
  Reset: (this: LoreLibraryNavigationTree) => void
  AddNode: (
    this: LoreLibraryNavigationTree,
    templateName: string,
    data: object,
    parent?: unknown
  ) => unknown
  Commit: (this: LoreLibraryNavigationTree, nodeToSelect?: unknown, bSelectNode?: boolean) => void
  ClearSelectedNode: (this: LoreLibraryNavigationTree) => void
  GetSelectedData: (
    this: LoreLibraryNavigationTree
  ) => { hirelingType?: number } & Record<string, unknown>
}
interface LoreLibraryListDataType {
  setupCallback: (this: void, control: Control, data: unknown) => void
}
interface LoreLibraryObject {
  search: string
  navigationTree: LoreLibraryNavigationTree
  list: {
    list: { dataTypes: Record<number, LoreLibraryListDataType> }
    FilterScrollList: (this: unknown) => boolean
  }
  totalCollectedLabel: LabelControl
  collectionIdToSelect?: number
  keybindStripDescriptor: KeybindButtonGroupDescriptor[]
  dirty?: boolean
  totalCurrentlyCollected: number
  totalPossibleCollected: number
  motifsCurrentlyCollected: number
  motifsPossibleCollected: number
  shalidorCurrentlyCollected: number
  shalidorPossibleCollected: number
  eideticCurrentlyCollected: number
  eideticPossibleCollected: number
  BuildCategoryList: (this: LoreLibraryObject, ...args: unknown[]) => void
  BuildBookList: (this: LoreLibraryObject, ...args: unknown[]) => void
  RefreshCollectedInfo: (this: LoreLibraryObject, library?: LoreLibraryObject) => void
  GetSelectedCategoryIndex: (this: LoreLibraryObject) => number
  GetSelectedCollectionIndex: (this: LoreLibraryObject) => number
}
declare const LORE_LIBRARY: LoreLibraryObject

interface WorldMapPanAndZoom {
  PanToNormalizedPosition: (
    this: WorldMapPanAndZoom,
    normalizedX: number,
    normalizedY: number
  ) => void
  SetCurrentNormalizedZoom: (this: WorldMapPanAndZoom, zoom: number) => void
  GetCurrentNormalizedZoom: (this: WorldMapPanAndZoom) => number
  SetCurrentOffset: (this: WorldMapPanAndZoom, offsetX: number, offsetY: number) => void
}
declare function ZO_WorldMap_GetPanAndZoom(this: void): WorldMapPanAndZoom
declare function ZO_WorldMap_IsWorldMapShowing(this: void): boolean

declare function AddMenuItem(
  this: void,
  labelText: string,
  callback?: ((this: void) => void) | undefined,
  itemType?: number,
  myFont?: string,
  normalColor?: unknown,
  highlightColor?: unknown,
  itemYPad?: number,
  ...rest: unknown[]
): number
declare const ZO_LoreLibrary_ReadBook: (
  this: void,
  categoryIndex: number,
  collectionIndex: number,
  bookIndex: number
) => void
declare function ZO_LinkHandler_CreateChatLink(
  this: void,
  createLinkFunc: (...args: unknown[]) => string,
  ...args: unknown[]
): string
declare const ZO_LinkHandler_InsertLink: (this: void, link: string) => void
declare function ZO_IsTableEmpty(this: void, t: object | undefined): boolean
declare function ZO_CheckButton_IsChecked(this: void, checkButton: Control): boolean
declare const ZO_CheckButton_SetLabelText: (this: void, checkButton: Control, text: string) => void
declare const ZO_CheckButton_SetToggleFunction: (
  this: void,
  checkButton: Control,
  toggleFunction: ((this: void, checkButton: Control, checked: boolean) => void) | undefined
) => void
declare const ZO_EditDefaultText_OnTextChanged: (this: void, editControl: EditControl) => void
declare const ZO_ScrollList_Clear: (this: void, listControl: object) => void
declare function zo_strjoin(this: void, separator: string, ...args: unknown[]): string
declare function zo_iconTextFormat(
  this: void,
  iconPath: string,
  width: number | string,
  height: number | string,
  text: string,
  inheritColor?: boolean
): string

interface SceneManager {
  Push: (this: SceneManager, sceneName: string) => void
}
interface MainMenuKeyboard {
  ShowCategory: (this: MainMenuKeyboard, categoryConst: number) => void
}

declare const ZO_LoreLibrary: Control
