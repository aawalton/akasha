interface ContextMenuLike {
  GetOptions(this: ContextMenuLike): Record<string, unknown>
  AddContextMenuItem(
    this: ContextMenuLike,
    newEntry: Record<string, unknown>,
    suppressUpdate: number
  ): number
  SetContextMenuOptions(this: ContextMenuLike, options: unknown): undefined
  ShowContextMenu(this: ContextMenuLike, controlToAnchorTo: unknown): undefined
  RegisterSpecialCallback(
    this: ContextMenuLike,
    uniqueAddonName: string,
    callbackName: string,
    specialCallbackData: Record<string, unknown>
  ): undefined
  IsDropdownVisible(this: ContextMenuLike): boolean
  m_container?: unknown
  m_dropdownObject: { control: { IsHidden(this: unknown): boolean } }
  [key: string]: unknown
}

interface ComboBoxClassLike {
  UpdateMetatable(
    this: void,
    comboBox: unknown,
    parent: unknown,
    comboBoxContainer: unknown,
    options: unknown
  ): undefined
  [key: string]: unknown
}

interface ApiComboBoxObjectLike {
  m_dropdownObject?: ApiComboBoxObjectLike | undefined
  m_comboBox?: ApiComboBoxObjectLike | undefined
  m_owner?: ApiComboBoxObjectLike | undefined
  m_buttonGroup?: unknown
  options?: unknown
  optionsChanged?: unknown
  UpdateOptions?: (this: ApiComboBoxObjectLike, options: unknown) => undefined
  IsDropdownVisible?: (this: ApiComboBoxObjectLike) => boolean
  SubmenuOrCurrentListRefresh?: (
    this: ApiComboBoxObjectLike,
    control: unknown,
    override?: unknown,
    refreshMainMenuOrSubmenu?: unknown
  ) => unknown
  [key: string]: unknown
}

interface ButtonGroupOfEntryTypeLike {
  SetChecked(
    this: ButtonGroupOfEntryTypeLike,
    control: unknown,
    checked: unknown,
    ignoreCallback: unknown
  ): unknown
  SetInverse(this: ButtonGroupOfEntryTypeLike, control: unknown, ignoreCallback: unknown): unknown
  [key: string]: unknown
}

declare var AddCustomScrollableComboBoxDropdownMenu: (
  this: void,
  parent: unknown,
  comboBoxContainer: unknown,
  options?: unknown
) => unknown
declare let GetCustomScrollableMenuRowData: (
  this: void,
  control: Record<string, unknown>
) => Record<string, unknown>
declare var AddCustomScrollableMenuEntry: (
  this: void,
  text: unknown,
  callback: unknown,
  entryType: unknown,
  entries: unknown,
  additionalData: unknown
) => LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]>
declare var AddCustomScrollableSubMenuEntry: (
  this: void,
  text: unknown,
  entries: unknown,
  callbackFunc?: unknown,
  additionalData?: unknown
) => LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]>
declare var AddCustomScrollableMenuDivider: (
  this: void
) => LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]>
declare var AddCustomScrollableMenuHeader: (
  this: void,
  text: unknown,
  additionalData?: unknown
) => LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]>
declare var AddCustomScrollableMenuCheckbox: (
  this: void,
  text: unknown,
  callback: unknown,
  checked?: unknown,
  additionalData?: unknown
) => LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]>
declare var AddCustomScrollableMenuRadioButton: (
  this: void,
  text: unknown,
  callback: unknown,
  checked?: unknown,
  buttonGroup?: unknown,
  additionalData?: unknown
) => LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]>
declare var AddCustomScrollableMenuEditBox: (
  this: void,
  text: unknown,
  callback: unknown,
  editBoxData?: unknown,
  additionalData?: unknown
) => LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]>
declare var AddCustomScrollableMenuSlider: (
  this: void,
  text: unknown,
  callback: unknown,
  sliderData?: unknown,
  additionalData?: unknown
) => LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]>
declare var SetCustomScrollableMenuOptions: (
  this: void,
  options: unknown,
  comboBoxContainer?: unknown
) => undefined
declare var AddCustomScrollableMenuEntries: (
  this: void,
  contextMenuEntries: unknown
) => LuaMultiReturn<[boolean, unknown, unknown]>
declare var AddCustomScrollableMenu: (
  this: void,
  entries: unknown,
  options?: unknown
) => LuaMultiReturn<[boolean, unknown, unknown]>
declare var ShowCustomScrollableMenu: (
  this: void,
  controlToAnchorTo: unknown,
  options?: unknown,
  specialCallbackData?: unknown
) => boolean
declare let RefreshCustomScrollableMenu: (
  this: void,
  mocCtrl?: unknown,
  updateMode?: unknown,
  comboBox?: unknown
) => undefined
declare let IsCustomScrollableMenuShown: (this: void) => boolean
declare var PreventCustomScrollableContextMenuEntryClickHide: (
  this: void,
  clickCount?: unknown
) => undefined

declare const SI_LSM_CNTXT_CHECK_ALL: number
declare const SI_LSM_CNTXT_CHECK_NONE: number
declare const SI_LSM_CNTXT_CHECK_INVERT: number
