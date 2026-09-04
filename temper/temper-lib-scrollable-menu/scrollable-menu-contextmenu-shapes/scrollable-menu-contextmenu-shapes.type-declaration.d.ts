interface ContextMenuClass {
  [key: string]: unknown
  New: (this: ContextMenuClass, ...args: unknown[]) => ContextMenuObject
  Subclass: (this: ContextMenuClass) => ContextMenuClass

  Initialize: (this: ContextMenuObject, comboBoxContainer: Control) => undefined
  GetUniqueName: (this: ContextMenuObject) => string | undefined
  AddContextMenuItem: (this: ContextMenuObject, itemEntry: unknown) => number
  GetEntries: (this: ContextMenuObject) => unknown
  GetMenuPrefix: (this: ContextMenuObject) => string
  HighlightOpeningControl: (this: ContextMenuObject) => undefined
  SetContextMenuOptions: (this: ContextMenuObject, options?: LsmComboBoxOptions) => undefined
  AddMenuItems: (
    this: ContextMenuObject,
    parentControl?: Control,
    comingFromFilters?: unknown
  ) => undefined
  ClearItems: (this: ContextMenuObject) => undefined
  GetHiddenForReasons: (
    this: ContextMenuObject,
    button: number
  ) => (
    this: void,
    owningWindow: unknown,
    mocCtrl: unknown,
    comboBox: unknown,
    entry: unknown
  ) => unknown
  HideDropdown: (this: ContextMenuObject) => boolean
  ShowSubmenu: (this: ContextMenuObject, parentControl: Control) => undefined
  ShowContextMenu: (this: ContextMenuObject, parentControl?: Control) => undefined
  RegisterSpecialCallback: (
    this: ContextMenuObject,
    uniqueAddonName?: string,
    callbackName?: string,
    specialCallbackData?: Record<string, unknown>
  ) => boolean
  UnregisterSpecialCallback: (
    this: ContextMenuObject,
    uniqueAddonName?: string,
    callbackName?: string
  ) => boolean | undefined
  RunSpecialCallback: (this: ContextMenuObject, callbackName?: string) => unknown
}

interface ContextMenuObject {
  data?: unknown[]
  contextMenuOptions?: LsmComboBoxOptions
  contextMenuIssuingControl?: unknown
  openingControl?: Control
  m_dropdown?: ContextMenuDropdown
  m_name?: string
  m_selectedItemData?: unknown
  optionsChanged?: unknown

  RefreshSortedItems: (this: unknown) => undefined

  AddContextMenuItem: (this: ContextMenuObject, itemEntry: unknown) => number
  HighlightOpeningControl: (this: ContextMenuObject) => undefined
  SetContextMenuOptions: (this: ContextMenuObject, options?: LsmComboBoxOptions) => undefined
  ClearItems: (this: ContextMenuObject) => undefined
  ShowContextMenu: (this: ContextMenuObject, parentControl?: Control) => undefined
  RegisterSpecialCallback: (
    this: ContextMenuObject,
    uniqueAddonName?: string,
    callbackName?: string,
    specialCallbackData?: Record<string, unknown>
  ) => boolean
  UnregisterSpecialCallback: (
    this: ContextMenuObject,
    uniqueAddonName?: string,
    callbackName?: string
  ) => boolean | undefined
  RunSpecialCallback: (this: ContextMenuObject, callbackName?: string) => unknown
}

interface ContextMenuComboBox {
  m_submenu?: {
    IsDropdownVisible: (this: void) => boolean
    HideDropdown: (this: void) => unknown
    [key: string]: unknown
  }
  [key: string]: unknown
}

interface ContextMenuDropdown {
  object?: {
    ResetFilters: (this: void, dropdown: unknown) => undefined
    [key: string]: unknown
  }
  [key: string]: unknown
}

interface ContextMenuCallbackEntry {
  callback?: (
    this: void,
    self: ContextMenuObject,
    openingControl: unknown,
    specialData: unknown
  ) => unknown
  specialData?: unknown
  [key: string]: unknown
}
