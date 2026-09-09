export type Valued<T> = T | ((this: void, ...args: unknown[]) => T)

export type SearchFunc = (
  this: void,
  list: ShifterBoxList,
  entry: MasterEntry,
  searchStr: string
) => boolean

export interface SearchSettings {
  enabled: Valued<boolean>
  searchFunc?: SearchFunc
}

export type RowHandler = (this: void, ...args: unknown[]) => void

export type AnchorOptions = readonly [number, Control, number, number, number]

export interface ListSettings {
  title: string
  rowHeight: number
  rowTemplateName: string
  emptyListText: string
  fontSize: number
  fontName?: string
  rowOnMouseEnter?: RowHandler
  rowOnMouseExit?: RowHandler
  rowOnMouseRightClick?: RowHandler
  rowSetupCallback?: RowHandler
  rowDataTypeSelectSound?: string
  rowResetControlCallback?: RowHandler
  rowSetupAdditionalDataCallback?: (
    this: void,
    rowControl: Control,
    data: RowData
  ) => LuaMultiReturn<[Control, RowData]>
  rowHideCallback?: RowHandler
  callbackRegister?: LuaTable<AnyNotNil, RowHandler>
}

export interface CustomSettingEntry {
  name: string
  validationType: string
}

export interface ShifterBoxSettings {
  showMoveAllButtons: boolean
  dragDropEnabled: boolean
  sortEnabled: boolean
  sortBy: string
  leftList: ListSettings
  rightList: ListSettings
  search: SearchSettings
}

export interface MasterEntry {
  value: unknown
  categoryId?: unknown
  key?: unknown
}

export interface RowData {
  key: unknown
  value: unknown
  categoryId?: unknown
}

export interface DragData extends RowData {
  _sourceListControl?: ShifterBoxList
  _sourceDraggedControl?: Control
  _isSelected?: boolean
  _hasMultipleRowsSelected?: boolean
  _numRowsSelected?: number
  _isFromLeftList?: boolean
  _draggedText?: unknown
  _draggedAdditionalText?: string | undefined
}

export interface ScrollCategory {
  hidden: boolean
}

export interface ShifterScrollListDataEntry {
  data: RowData
  control?: Control
}

export interface ShifterScrollList extends Control {
  data: ShifterScrollListDataEntry[]
  visibleData: number[]
  categories: LuaTable<AnyNotNil, ScrollCategory>
  selectedMultiData?: LuaTable<AnyNotNil, RowData>
  selectionCallback?: (
    this: void,
    data: RowData | undefined,
    selectedMultiData: LuaTable<AnyNotNil, RowData> | undefined,
    reselectingDuringRebuild: boolean
  ) => void
  selectionTemplate?: string
  contents: Control
  scrollbar: Control
  downButton: Control
  upButton: Control
  rowHeight?: number
}

export interface CursorTLC extends Control {
  label?: LabelControl
  shifterBox?: ShifterBox
}

export interface ShifterBoxList {
  list: ShifterScrollList
  sortHeaderGroup: ZoSortHeaderGroup
  headersContainer: Control
  currentSortOrder: boolean
  sortFunction?: (this: void, e1: unknown, e2: unknown) => boolean
  control: Control
  RefreshData: (this: ShifterBoxList) => void
  RefreshFilters: (this: ShifterBoxList) => void
  CommitScrollList: (this: ShifterBoxList) => void
  SetEmptyText: (this: ShifterBoxList, text: string) => void
  buttonControl: ButtonControl
  buttonAllControl: ButtonControl
  buttonSearchControl: ButtonControl
  searchHeaderUI: Control
  searchHeaderUIEditBox: EditControl
  isSearchHeaderUIShown: boolean
  searchStr?: string
  searchText?: string
  enabled: boolean
  masterList: LuaTable<AnyNotNil, MasterEntry>
  shifterBox: ShifterBox
  shifterBoxSettings: ShifterBoxSettings
  listBoxSettings: ListSettings
  isLeftList: boolean
  rowHeight: number
  rowWidth: number
  currentDragData?: DragData
  draggingUpdateTime?: number
  draggingMouseButtonPressed?: number
  OnSelectionChanged: (
    this: ShifterBoxList,
    previouslySelectedData?: unknown,
    selectedData?: unknown,
    reselectingDuringRebuild?: boolean
  ) => void
  Initialize: (
    this: ShifterBoxList,
    control: Control,
    shifterBoxSettings: ShifterBoxSettings,
    isLeftList: boolean,
    shifterBox: ShifterBox
  ) => void
  BuildMasterList: (this: ShifterBoxList) => void
  FilterScrollList: (this: ShifterBoxList) => void
  SortScrollList: (this: ShifterBoxList) => void
  AddEntry: (this: ShifterBoxList, key: unknown, value: unknown, categoryId?: unknown) => void
  RemoveEntry: (this: ShifterBoxList, key: unknown) => LuaMultiReturn<[unknown, unknown, unknown]>
  ClearMasterList: (this: ShifterBoxList) => void
  UnselectEntries: (this: ShifterBoxList) => void
  SelectControl: (this: ShifterBoxList, control: Control, animateInstantly?: boolean) => void
  UnselectControl: (this: ShifterBoxList, control: Control, animateInstantly?: boolean) => void
  ToggleEntrySelection: (
    this: ShifterBoxList,
    data?: RowData,
    control?: Control,
    reselectingDuringRebuild?: boolean,
    animateInstantly?: boolean,
    deselectOnReselect?: boolean
  ) => void
  SetupRowEntry: (
    this: ShifterBoxList,
    rowControl: Control,
    rowData: RowData,
    doNotSetupRowNow?: boolean
  ) => void
  SetCustomDimensions: (
    this: ShifterBoxList,
    width: number,
    height: number,
    headerHeight: number
  ) => void
  Refresh: (this: ShifterBoxList) => void
  SetEntriesEnabled: (this: ShifterBoxList, enabled: boolean) => void
  OnGlobalMouseDownDuringDrag: (
    this: ShifterBoxList,
    eventId?: unknown,
    mouseButton?: number
  ) => void
  OnGlobalMouseUpDuringDrag: (this: ShifterBoxList, eventId?: unknown, mouseButton?: number) => void
  DragOnUpdateCallback: (this: ShifterBoxList, draggedControl: Control) => void
  StartDragging: (this: ShifterBoxList, draggedControl: Control, mouseButton: number) => void
  StopDragging: (this: ShifterBoxList, draggedOnToControl?: Control) => void
}

export interface ShifterRowControl extends Control {
  dataEntry?: ShifterScrollListDataEntry
  key?: unknown
}

export interface ShifterBoxListClass extends ShifterBoxList, ZoSortFilterListSubclass {
  SORT_KEYS: Record<string, ZoSortKeyConfig>
  New: (
    this: ShifterBoxListClass,
    shifterBox: ShifterBox,
    control: Control,
    isLeftList: boolean
  ) => ShifterBoxList
}

export interface ShifterBox {
  addonName: unknown
  shifterBoxName: unknown
  shifterBoxControl: Control
  shifterBoxSettings: ShifterBoxSettings
  leftList: ShifterBoxList
  rightList: ShifterBoxList
  headerHeight: number
  currentDragData?: DragData
  draggingUpdateTime?: number
  draggingMouseButtonPressed?: number
  GetControl: (this: ShifterBox) => LuaMultiReturn<[Control, ShifterBox]>
  SetAnchor: (this: ShifterBox, ...args: AnchorOptions) => void
  SetDimensions: (this: ShifterBox, width: number, height: number) => void
  SetEnabled: (this: ShifterBox, enabled: boolean) => void
  SetHidden: (this: ShifterBox, hidden: boolean) => void
  ShowCategory: (this: ShifterBox, categoryId: unknown) => void
  ShowOnlyCategory: (this: ShifterBox, categoryId: unknown) => void
  ShowAllCategories: (this: ShifterBox) => void
  HideCategory: (this: ShifterBox, categoryId: unknown) => void
  SelectEntryByKey: (this: ShifterBox, key: unknown) => void
  SelectEntriesByKey: (this: ShifterBox, keys: unknown[]) => void
  UnselectAllEntries: (this: ShifterBox) => void
  RemoveEntryByKey: (this: ShifterBox, key: unknown) => void
  RemoveEntriesByKey: (this: ShifterBox, keys: unknown[]) => void
  RegisterCallback: (
    this: ShifterBox,
    shifterBoxEvent: number,
    callbackFunction: RowHandler
  ) => void
  UnregisterCallback: (
    this: ShifterBox,
    shifterBoxEvent: number,
    callbackFunction: RowHandler
  ) => void
  GetLeftListEntries: (this: ShifterBox, withCategoryId?: boolean) => LuaTable<AnyNotNil, unknown>
  GetLeftListEntriesFull: (
    this: ShifterBox,
    withCategoryId?: boolean
  ) => LuaTable<AnyNotNil, unknown>
  AddEntryToLeftList: (
    this: ShifterBox,
    key: unknown,
    value: unknown,
    replace?: boolean,
    categoryId?: unknown
  ) => void
  AddEntriesToLeftList: (
    this: ShifterBox,
    entries: unknown,
    replace?: boolean,
    categoryId?: unknown
  ) => void
  MoveEntryToLeftList: (this: ShifterBox, key: unknown) => void
  MoveEntriesToLeftList: (this: ShifterBox, keys: unknown[]) => void
  MoveAllEntriesToLeftList: (this: ShifterBox) => void
  ClearLeftList: (this: ShifterBox) => void
  GetRightListEntries: (this: ShifterBox, withCategoryId?: boolean) => LuaTable<AnyNotNil, unknown>
  GetRightListEntriesFull: (
    this: ShifterBox,
    withCategoryId?: boolean
  ) => LuaTable<AnyNotNil, unknown>
  AddEntryToRightList: (
    this: ShifterBox,
    key: unknown,
    value: unknown,
    replace?: boolean,
    categoryId?: unknown
  ) => void
  AddEntriesToRightList: (
    this: ShifterBox,
    entries: unknown,
    replace?: boolean,
    categoryId?: unknown
  ) => void
  MoveEntryToRightList: (this: ShifterBox, key: unknown) => void
  MoveEntriesToRightList: (this: ShifterBox, keys: unknown[]) => void
  MoveAllEntriesToRightList: (this: ShifterBox) => void
  ClearRightList: (this: ShifterBox) => void
  UpdateCursorTLC: (this: ShifterBox, isHidden: boolean, draggedControl?: Control) => void
}

export interface ShifterBoxClass extends ShifterBox {
  New: (
    this: ShifterBoxClass,
    uniqueAddonName: unknown,
    uniqueShifterBoxName: unknown,
    parentControl: Control,
    customSettings?: unknown,
    anchorOptions?: AnchorOptions,
    dimensionOptions?: unknown[],
    leftListEntries?: unknown,
    rightListEntries?: unknown
  ) => ShifterBox
}

export type ValidateFn = (
  this: void,
  customSettingsTbl: Record<string, unknown>,
  parameterName: string,
  settingsTbl: Record<string, unknown>
) => void

export interface Lib {
  name: string
  version: string
  doDebug: boolean
  allowedEventNames: readonly string[]
  existingShifterBoxes: LuaTable<AnyNotNil, LuaTable<AnyNotNil, ShifterBox>>
  DEFAULT_CATEGORY: string
  GetShifterBox: (
    this: void,
    uniqueAddonName: unknown,
    uniqueShifterBoxName: unknown
  ) => ShifterBox | undefined
  GetControl: (
    this: void,
    uniqueAddonName: unknown,
    uniqueShifterBoxName: unknown
  ) => LuaMultiReturn<[Control | undefined, ShifterBox | undefined]>
  Create: (this: void, ...args: unknown[]) => ShifterBox
  EVENT_ENTRY_HIGHLIGHTED: number
  EVENT_ENTRY_UNHIGHLIGHTED: number
  EVENT_ENTRY_MOVED: number
  EVENT_LEFT_LIST_CLEARED: number
  EVENT_RIGHT_LIST_CLEARED: number
  EVENT_LEFT_LIST_ENTRY_ADDED: number
  EVENT_RIGHT_LIST_ENTRY_ADDED: number
  EVENT_LEFT_LIST_ENTRY_REMOVED: number
  EVENT_RIGHT_LIST_ENTRY_REMOVED: number
  EVENT_LEFT_LIST_CREATED: number
  EVENT_RIGHT_LIST_CREATED: number
  EVENT_LEFT_LIST_ROW_ON_MOUSE_ENTER: number
  EVENT_RIGHT_LIST_ROW_ON_MOUSE_ENTER: number
  EVENT_LEFT_LIST_ROW_ON_MOUSE_EXIT: number
  EVENT_RIGHT_LIST_ROW_ON_MOUSE_EXIT: number
  EVENT_LEFT_LIST_ROW_ON_MOUSE_UP: number
  EVENT_RIGHT_LIST_ROW_ON_MOUSE_UP: number
  EVENT_LEFT_LIST_ROW_ON_DRAG_START: number
  EVENT_RIGHT_LIST_ROW_ON_DRAG_START: number
  EVENT_LEFT_LIST_ROW_ON_DRAG_END: number
  EVENT_RIGHT_LIST_ROW_ON_DRAG_END: number
}

export type LibCallable = (this: void, ...args: unknown[]) => ShifterBox

export type LibShifterBoxGlobal = Lib & LibCallable

export interface DebugBoxEntry {
  addonName?: unknown
  shifterBoxName?: unknown
  customSettings?: unknown
  shifterBoxSettings?: unknown
}
