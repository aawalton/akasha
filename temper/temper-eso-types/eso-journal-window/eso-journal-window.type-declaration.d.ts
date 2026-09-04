declare const zo_clamp: (this: void, value: number, min: number, max: number) => number

declare const ConvertRGBToHSL: (
  this: void,
  r: number,
  g: number,
  b: number
) => LuaMultiReturn<[number, number, number]>

declare const SafeAddString: (this: void, id: number, text: string, numArgs: number) => void

declare const SI_ZONE_NAME: number

declare const SI_GAME_MENU_SETTINGS: number

declare const MENU_CATEGORY_CHARACTER: number

declare const CODEX_WINDOW_SOUNDS: SceneFragment

declare const TITLE_FRAGMENT: SceneFragment

declare const RIGHT_BG_FRAGMENT: SceneFragment

declare const TOP_BAR_FRAGMENT: SceneFragment

interface SetTitleFragment extends SceneFragment {
  Show: (this: SetTitleFragment) => void
  OnShown: (this: SetTitleFragment) => void
}

interface ZoSetTitleFragmentClass {
  New: (this: void) => SetTitleFragment
}

declare const ZO_SetTitleFragment: ZoSetTitleFragmentClass

interface SceneCategoryFragment {
  GetControl: (this: SceneCategoryFragment) => Control
}

interface Scene {
  AddFragmentGroup: (this: Scene, fragmentGroup: object) => void
  GetFragmentWithCategory: (this: Scene, category: string) => SceneCategoryFragment
}

interface MainMenuKeyboard {
  categoryBar: Control
  categoryBarFragment?: SceneFragment
  lastCategory: number
}

interface KeybindStripObject {
  AddKeybindButton: (this: KeybindStripObject, descriptor: object) => void
  RemoveKeybindButton: (this: KeybindStripObject, descriptor: object) => void
}

interface TooltipControl {
  SetCollectible: (
    this: TooltipControl,
    collectibleId: number,
    showVisualLayer: boolean,
    showBlockReason: boolean
  ) => void
  SetAntiquitySetFragment: (this: TooltipControl, antiquityId: number) => void
  AddControl: (this: TooltipControl, control: Control) => void
}

interface ZoSortFilterListClass {
  Row_OnMouseEnter: (this: void, self: object, control: Control) => void
  Row_OnMouseExit: (this: void, self: object, control: Control) => void
}

declare const ZO_MenuBar_SelectFirstVisibleButton: (
  this: void,
  menuBar: Control,
  blockCallback?: boolean
) => void

interface ZoComboBox {
  SetHeight?: (this: ZoComboBox, height: number) => void
  SetSortsItems: (this: ZoComboBox, sorts: boolean) => void
  ClearItems: (this: ZoComboBox) => void
  AddItem: (this: ZoComboBox, entry: object, updateMode?: number) => void
  GetNumItems: (this: ZoComboBox) => number
  SelectItemByIndex: (this: ZoComboBox, index: number, ...args: unknown[]) => void
  GetContainer: (this: ZoComboBox) => Control
  shouldOpenAbove?: boolean
  m_container?: Control
  m_containerWidth?: number
  [key: string]: unknown
}

interface ZoComboBoxClass {
  CreateItemEntry: (
    this: void,
    label: string,
    callback?: (this: void, ...args: unknown[]) => void
  ) => object
}

declare const ZO_ComboBox: ZoComboBoxClass

declare const ZO_COMBOBOX_SUPPRESS_UPDATE: number

interface ZoComboBoxDropdownKeyboard {
  control: Control
  [key: string]: unknown
}

declare const ZO_COMBO_BOX_DROPDOWN_KEYBOARD: ZoComboBoxDropdownKeyboard

interface ZoStringSearch {
  AddProcessor: (
    this: ZoStringSearch,
    typeId: number,
    processor: (
      this: void,
      stringSearch: ZoStringSearch,
      data: object,
      searchTerm: string,
      ...args: unknown[]
    ) => boolean
  ) => void
  IsMatch: (this: ZoStringSearch, searchTerm: string, data: object) => boolean
  [key: string]: unknown
}

interface ZoStringSearchClass {
  New: (this: void) => ZoStringSearch
}

declare const ZO_StringSearch: ZoStringSearchClass

declare const ZO_DISABLED_TEXT: ZoColorDef
