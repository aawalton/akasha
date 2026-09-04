interface ComboBoxBaseStatic {
  Initialize: (
    this: void,
    self: ComboBoxBase,
    parent: Control,
    comboBoxContainer: Control,
    options: LsmComboBoxOptions | undefined,
    depth: number,
    initExistingComboBox?: unknown
  ) => undefined
  HideDropdown: (this: void, self: ComboBoxBase) => boolean
  Subclass: (this: ComboBoxBaseStatic) => ComboBoxBaseStatic
  New: (this: ComboBoxBaseStatic, ...args: unknown[]) => ComboBoxBase
  [key: string]: unknown
}

interface ComboBoxClass {
  [key: string]: unknown
  New: (this: ComboBoxClass, ...args: unknown[]) => ComboBoxObject
  Subclass: (this: ComboBoxClass) => ComboBoxClass

  Initialize: (
    this: ComboBoxObject,
    parent: Control,
    comboBoxContainer: Control,
    options: LsmComboBoxOptions | undefined,
    depth: number,
    initExistingComboBox?: unknown
  ) => ComboBoxObject
  UpdateMetatable: (
    this: ComboBoxObject,
    parent: Control,
    comboBoxContainer: Control,
    options: LsmComboBoxOptions | undefined
  ) => undefined
  GetUniqueName: (this: ComboBoxObject) => string | undefined
  AddMenuItems: (this: ComboBoxObject) => undefined
  GetMaxRows: (this: ComboBoxObject) => number
  GetMenuPrefix: (this: ComboBoxObject) => string
  GetSubMenuOpeningSide: (this: ComboBoxObject) => string | undefined
  GetHiddenForReasons: (
    this: ComboBoxObject,
    button: number
  ) => (
    this: void,
    owningWindow: unknown,
    mocCtrl: unknown,
    comboBox: unknown,
    entry: unknown
  ) => unknown
  HideDropdown: (this: ComboBoxObject) => boolean
  HideOnMouseEnter: (this: ComboBoxObject) => undefined
  HideOnMouseExit: (this: ComboBoxObject, mocCtrl?: unknown) => boolean | undefined
  IsFilterEnabled: (this: ComboBoxObject) => unknown
  SetFilterString: (
    this: ComboBoxObject,
    filterBox: LsmFilterBoxControl,
    newText?: string
  ) => undefined
  IsAutomaticRefreshEnabled: (
    this: ComboBoxObject
  ) => LuaMultiReturn<[unknown, unknown]> | undefined
  SetDefaults: (this: ComboBoxObject) => undefined
  ResetToDefaults: (this: ComboBoxObject, initExistingComboBox?: unknown) => undefined
  SetOption: (this: ComboBoxObject, LSMOptionsKey: string, doDebugNow?: boolean) => undefined
  UpdateOptions: (
    this: ComboBoxObject,
    options: LsmComboBoxOptions | undefined,
    onInit?: unknown,
    isContextMenu?: unknown,
    initExistingComboBox?: unknown
  ) => undefined
  UpdateResults: (this: ComboBoxObject, comingFromFilters?: unknown) => undefined
  ShowDropdown: (this: ComboBoxObject) => undefined
  ShowDropdownInternal: (this: ComboBoxObject) => undefined
  ShowDropdownOnMouseUp: (this: ComboBoxObject) => undefined
  SetupDropdownHeader: (this: ComboBoxObject) => undefined
  UpdateDropdownHeader: (
    this: ComboBoxObject,
    toggleButtonCtrl?: LsmHeaderToggleButton,
    toggleFuncUsed?: unknown
  ) => undefined
  AddItemToSelected: (this: ComboBoxObject, item: unknown) => undefined
  RemoveItemFromSelected: (this: ComboBoxObject, item: unknown) => undefined
  IsSortEnabled: (this: ComboBoxObject) => unknown
}

interface ComboBoxClassStatic {
  Initialize: (
    this: void,
    self: ComboBoxObject,
    parent: Control,
    comboBoxContainer: Control,
    options: LsmComboBoxOptions | undefined,
    depth: number,
    initExistingComboBox?: unknown
  ) => ComboBoxObject
  HideOnMouseExit: (this: void, self: ComboBoxBase, mocCtrl?: unknown) => boolean | undefined
  Subclass: (this: ComboBoxClassStatic) => ComboBoxClassStatic
  New: (this: ComboBoxClassStatic, ...args: unknown[]) => ComboBoxObject
  [key: string]: unknown
}

interface ComboBoxObject {
  visibleRows?: number
  m_name?: string
  m_openDropdown?: unknown
  m_selectedItemText?: unknown
  m_preshowDropdownFn?: unknown
  filterString?: string
  defaults?: Record<string, unknown>
  optionsChanged?: unknown
  updatedOptions?: Record<string, unknown>

  AddMenuItems: (this: unknown) => undefined

  UpdateMetatable: (
    this: ComboBoxObject,
    parent: Control,
    comboBoxContainer: Control,
    options: LsmComboBoxOptions | undefined
  ) => undefined
  GetUniqueName: (this: ComboBoxObject) => string | undefined
  GetMenuPrefix: (this: ComboBoxObject) => string
  GetSubMenuOpeningSide: (this: ComboBoxObject) => string | undefined
  HideOnMouseEnter: (this: ComboBoxObject) => undefined
  HideOnMouseExit: (this: ComboBoxObject, mocCtrl?: unknown) => boolean | undefined
  IsAutomaticRefreshEnabled: (
    this: ComboBoxObject
  ) => LuaMultiReturn<[unknown, unknown]> | undefined
  SetDefaults: (this: ComboBoxObject) => undefined
  ResetToDefaults: (this: ComboBoxObject, initExistingComboBox?: unknown) => undefined
  SetOption: (this: ComboBoxObject, LSMOptionsKey: string, doDebugNow?: boolean) => undefined
  UpdateResults: (this: ComboBoxObject, comingFromFilters?: unknown) => undefined
  ShowDropdownInternal: (this: ComboBoxObject) => undefined
}

interface LsmComboBoxContainer extends Omit<Control, "GetName" | "GetNamedChild" | "GetWidth"> {
  m_comboBox?: ComboBoxObject
  GetName: () => string
  GetNamedChild: (name: string) => unknown
  GetWidth: () => number
  [key: string]: unknown
}

interface LsmHeaderHostControl extends Omit<Control, "GetParent" | "GetType"> {
  GetParent: () => LsmHeaderHostControl | undefined
  GetType: () => number
  [key: string]: unknown
}

interface LsmHeaderControl extends Control {
  [key: string]: unknown
}

interface LsmDropdownHeaderHost extends Control {
  toggleButton?: LsmHeaderToggleButton
  [key: string]: unknown
}

interface LsmHeaderToggleButton extends Control {
  [key: string]: unknown
}

interface LsmFilterBoxControl extends Control {
  GetText: (this: LsmFilterBoxControl) => string
  [key: string]: unknown
}

interface LsmEventContainer extends Omit<Control, "RegisterForEvent" | "UnregisterForEvent"> {
  RegisterForEvent: (
    event: number,
    callback: (this: void, ...args: unknown[]) => undefined
  ) => undefined
  UnregisterForEvent: (event: number) => undefined
  [key: string]: unknown
}
