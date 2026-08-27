interface SearchUIControl {
  GetName: (this: SearchUIControl) => string
  GetNamedChild: (this: SearchUIControl, name: string) => SearchUIControl
  GetParent: (this: SearchUIControl) => SearchUIControl
  GetOwningWindow: (this: SearchUIControl) => SearchUIControl
  IsHidden: (this: SearchUIControl) => boolean
  SetHidden: (this: SearchUIControl, hidden: boolean) => void
  SetAlpha: (this: SearchUIControl, alpha: number) => void
  SetText: (this: SearchUIControl, text: string) => void
  SetEnabled: (this: SearchUIControl, enabled: boolean) => void
  SetMouseEnabled: (this: SearchUIControl, enabled: boolean) => void
  SetHandler: (
    this: SearchUIControl,
    handlerName: string,
    handler: (this: void, ...args: unknown[]) => void
  ) => void
  ClearAnchors: (this: SearchUIControl) => void
  SetAnchor: (
    this: SearchUIControl,
    point: number,
    relativeTo?: SearchUIControl,
    relativePoint?: number,
    offsetX?: number,
    offsetY?: number
  ) => void
  SetDimensions: (this: SearchUIControl, x: number, y: number) => void
  SetDimensionConstraints: (
    this: SearchUIControl,
    minX: number,
    minY: number,
    maxX: number | string | undefined,
    maxY: number
  ) => void
  GetDimensions: (this: SearchUIControl) => LuaMultiReturn<[number, number]>
  GetWidth: (this: SearchUIControl) => number | undefined
  GetLeft: (this: SearchUIControl) => number
  GetTop: (this: SearchUIControl) => number
  BringWindowToTop: (this: SearchUIControl) => void
  AllowBringToTop: (this: SearchUIControl, allow: boolean) => void
  WasTruncated: (this: SearchUIControl) => boolean
  SetLink: (this: SearchUIControl, itemLink: string) => void
  [key: string]: unknown
}

interface SearchUIEditBox extends SearchUIControl {
  GetText: (this: SearchUIEditBox) => string
  SetDefaultText: (this: SearchUIEditBox, text: string) => void
}

interface ZoInitializingObjectSubclass {
  [key: string]: unknown
}
interface ZoInitializingObjectClass {
  Subclass: <T extends ZoInitializingObjectSubclass = ZoInitializingObjectSubclass>(
    this: ZoInitializingObjectClass
  ) => T
  New: <T = unknown>(this: void, self: object, ...args: unknown[]) => T
  Initialize: (this: void, self: object, ...args: unknown[]) => void
}
declare const ZO_InitializingObject: ZoInitializingObjectClass

interface ZoStringSearchObject {
  AddProcessor: (
    this: ZoStringSearchObject,
    searchType: number,
    processor: (
      this: void,
      stringSearch: unknown,
      data: unknown,
      searchTerm: string,
      cache?: unknown
    ) => boolean
  ) => void
}
declare const ZO_StringSearch: {
  New: (this: unknown) => ZoStringSearchObject
}

interface SearchUIComboBoxItem {
  filterType?: number | string
  nameClean?: string
  releaseDateTimeStamp?: number
  tooltipText?: string
  label?: string
  name?: string
  m_data?: { tooltipText?: string; [key: string]: unknown }
  [key: string]: unknown
}
interface SearchUIComboBox {
  GetNumSelectedEntries: (this: SearchUIComboBox) => number
  GetNumItems: (this: SearchUIComboBox) => number
  ClearAllSelections: (this: SearchUIComboBox) => void
  ClearItems: (this: SearchUIComboBox) => void
  GetItems: (this: SearchUIComboBox) => SearchUIComboBoxItem[]
  SetSelected: (this: SearchUIComboBox, index: number, selected: boolean) => void
  IsItemSelected: (this: SearchUIComboBox, item: SearchUIComboBoxItem) => boolean
  IsDropdownVisible: (this: SearchUIComboBox) => boolean
  ShowDropdown: (this: SearchUIComboBox) => void
  GetIndexByEval: (
    this: SearchUIComboBox,
    evalFn: (this: void, item: SearchUIComboBoxItem) => boolean
  ) => number | undefined
  AddItemToSelected: (this: SearchUIComboBox, item: SearchUIComboBoxItem) => void
  CreateItemEntry: (this: SearchUIComboBox, name: string) => SearchUIComboBoxItem
  AddItem: (this: SearchUIComboBox, entry: SearchUIComboBoxItem, suppressUpdate?: unknown) => void
  UpdateItems: (this: SearchUIComboBox) => void
  SetSortsItems: (this: SearchUIComboBox, sorts: boolean) => void
  SetHideDropdownCallback: (this: SearchUIComboBox, callback: (this: void) => void) => void
  SetEntryMouseOverCallbacks: (
    this: SearchUIComboBox,
    enterCb: (this: void, comboBox: SearchUIComboBox, entry: SearchUIComboBoxItem) => void,
    exitCb: (this: void, comboBox: SearchUIComboBox, entry: SearchUIComboBoxItem) => void
  ) => void
  EnableMultiSelect: (
    this: SearchUIComboBox,
    selectedText: string | number,
    noSelectionText: string
  ) => void
  RefreshSelectedItemText: (this: SearchUIComboBox) => void
  m_sortedItems: SearchUIComboBoxItem[]
  m_sortOrder: boolean
  m_container?: SearchUIControl
  _sortFunc?: (this: void) => void
  [key: string]: unknown
}
declare const ZO_ComboBox: {
  SetEntryMouseOverCallbacks?: unknown
  EnableMultiSelect?: unknown
  [key: string]: unknown
}
declare const ZO_COMBOBOX_SUPPRESS_UPDATE: unknown

declare function ZO_ScrollList_Commit(this: void, listControl: SearchUIControl): void
declare function ZO_SortHeader_Initialize(
  this: void,
  headerControl: SearchUIControl,
  text: string,
  key: string,
  initialDirection: boolean,
  textAlignment: number,
  font: string
): void

declare function zo_plainstrfind(this: void, haystack: string, needle: string): number | undefined
declare function zo_clamp(this: void, value: number, min: number, max: number): number
declare function zo_mixin(this: void, target: object, ...sources: object[]): void
declare function GetZoneDescriptionById(this: void, zoneId: number): string

declare function unpack<T>(this: void, list: T[], i?: number, j?: number): LuaMultiReturn<T[]>
declare function select(this: void, index: number, ...args: unknown[]): LuaMultiReturn<unknown[]>

type LSMSubmenuEntry = {
  label?: string
  callback?: (this: void, ...args: unknown[]) => void
  entryType?: number
  checked?: (this: void) => boolean
  enabled?: boolean | ((this: void) => boolean)
  buttonGroup?: number
  [key: string]: unknown
}
declare function ClearCustomScrollableMenu(this: void): void
declare function AddCustomScrollableMenuHeader(this: void, text: string): number | undefined
declare function AddCustomScrollableMenuDivider(this: void): number | undefined
declare function AddCustomScrollableMenuEntry(
  this: void,
  text: string,
  callback?: (this: void, ...args: unknown[]) => void,
  entryType?: number,
  entries?: LSMSubmenuEntry[] | undefined,
  additionalData?: { [key: string]: unknown } | undefined
): number | undefined
declare function AddCustomScrollableMenuCheckbox(
  this: void,
  text: string,
  callback: (
    this: void,
    comboBox: unknown,
    itemName: string,
    item: unknown,
    checked: boolean,
    data: unknown
  ) => void,
  checkedFn: (this: void) => boolean | undefined
): number | undefined
declare function AddCustomScrollableMenuRadioButton(
  this: void,
  text: string,
  callback: (
    this: void,
    comboBox: unknown,
    itemName: string,
    item: unknown,
    checked: boolean,
    data: unknown
  ) => void,
  checkedFn: (this: void) => boolean
): number | undefined
declare function AddCustomScrollableSubMenuEntry(
  this: void,
  text: string,
  entries: LSMSubmenuEntry[]
): number | undefined
declare function ShowCustomScrollableMenu(
  this: void,
  anchorControl: SearchUIControl,
  options?: { visibleRowsDropdown?: number; [key: string]: unknown }
): void
declare function AddCustomScrollableComboBoxDropdownMenu(
  this: void,
  parentControl: SearchUIControl,
  comboBoxContainer: SearchUIControl,
  options: { [key: string]: unknown }
): unknown

declare const LSM_ENTRY_TYPE_NORMAL: number
declare const LSM_ENTRY_TYPE_DIVIDER: number
declare const LSM_ENTRY_TYPE_SUBMENU: number
declare const LSM_ENTRY_TYPE_RADIOBUTTON: number

declare const SI_TRADINGHOUSESEARCHOUTCOME2: number
declare const SI_ITEM_SETS_BOOK_APPAREL_TYPES_DROPDOWN_TEXT: number
declare const SI_ITEM_SETS_BOOK_WEAPON_TYPES_DROPDOWN_TEXT: number
declare const SI_ARMORTYPE0: number
declare const SI_COLLECTIBLE_ACTION_REMOVE_FAVORITE: number
declare const SI_COLLECTIBLE_ACTION_ADD_FAVORITE: number
declare const SI_HOUSINGFURNITUREBOUNDFILTER0: number
declare const SI_GAMEPAD_BANK_FILTER_HEADER: number
declare const SI_GAMEPAD_MAIL_SEND_CLEAR: number
declare const SI_ATTRIBUTEPOINTALLOCATIONMODE_CLEARKEYBIND1: number
declare const SI_ITEMFILTERTYPE0: number
declare const SI_CUSTOMERSERVICESUBMITFEEDBACKSUBCATEGORIES1305: number
declare const SI_INPUT_LANGUAGE_UNKNOWN: number
declare const SI_DIALOG_CLOSE: number
declare const SI_TRADING_HOUSE_DO_SEARCH: number
declare const SI_TRADING_HOUSE_RESET_SEARCH: number
declare const SI_ENCHANTMENTSEARCHCATEGORYTYPE: string

declare const LibSets_SearchUI_TooltipTopLevel: SearchUIControl
declare const LibSets_SearchUI_Tooltip: SearchUIControl

declare const InformationTooltipTopLevel: SearchUIControl

declare const SYSTEMS: {
  RegisterKeyboardObject: (this: unknown, name: string, object: unknown) => void
  [key: string]: unknown
}
