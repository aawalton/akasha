interface ZoSortKeyConfig {
  tiebreaker?: string
  isNumeric?: boolean
  caseInsensitive?: boolean
  tieBreakerSortOrder?: boolean
}

declare function ZO_TableOrderingFunction(
  data1: unknown,
  data2: unknown,
  sortKey: string,
  sortKeys: Record<string, ZoSortKeyConfig>,
  sortOrder: boolean
): boolean

declare const ZO_SORT_ORDER_UP: boolean
declare const ZO_SORT_ORDER_DOWN: boolean

interface ZoSortHeaderGroup {
  SelectHeaderByKey: (key: string) => void
  SetEnabled: (enabled: boolean) => void
  headerContainer: Control
  [key: string]: unknown
}

interface ZoSortFilterList {
  list: Control
  sortHeaderGroup: ZoSortHeaderGroup
  currentSortKey: string
  currentSortOrder: boolean
  sortFunction:
    | ((
        this: void,
        entry1: ZoScrollListDataEntry<never>,
        entry2: ZoScrollListDataEntry<never>
      ) => boolean)
    | undefined
  masterList: unknown[]
  RefreshData: () => void
  RefreshFilters: () => void
  RefreshSort: () => void
  CommitScrollList: () => void
  SetAlternateRowBackgrounds: (alternate: boolean) => void
  GetListControl: () => Control
  BuildMasterList: () => void
  FilterScrollList: () => void
  SortScrollList: () => void
  SetupRow: (rowControl: Control, data: unknown) => void
  [key: string]: unknown
}

interface ZoSortFilterListSubclass {
  [key: string]: unknown
}

interface ZoSortFilterListClass {
  Subclass: <T extends ZoSortFilterListSubclass = ZoSortFilterListSubclass>() => T
  New: <T = ZoSortFilterList>(this: void, self: object, control: Control, ...args: unknown[]) => T
  Initialize: (this: void, self: object, control: Control) => void
  InitializeSortFilterList: (this: void, self: object, control: Control) => void
  SetupRow: (this: void, self: object, rowControl: Control, data: unknown) => void
}
declare const ZO_SortFilterList: ZoSortFilterListClass

declare const ZO_ScrollList_AddDataType: <T, C extends Control = Control>(
  listControl: Control,
  typeId: number,
  templateName: string,
  height: number,
  setupCallback: (this: void, rowControl: C, data: T) => void,
  hideCallback?: ((this: void, rowControl: C, data: T) => void) | undefined,
  dataTypeSelectSound?: string | undefined,
  resetControlCallback?: ((this: void, rowControl: C) => void) | undefined
) => void

declare const ZO_ScrollList_EnableHighlight: (listControl: Control, templateName: string) => void

declare const ZO_ScrollList_EnableSelection: (
  listControl: Control,
  highlightTemplate: string,
  selectionCallback: (this: void, ...args: unknown[]) => void
) => void

declare function ZO_ScrollList_CreateDataEntry<T>(
  typeId: number,
  data: T,
  categoryId?: unknown
): ZoScrollListDataEntry<T>

declare const ZO_ClearNumericallyIndexedTable: (table: object) => void

declare const ZO_ScrollList_AddCategory: (listControl: Control, categoryId: unknown) => void

declare const ZO_ScrollList_ShowCategory: (listControl: Control, categoryId: unknown) => void

declare const ZO_ScrollList_HideCategory: (listControl: Control, categoryId: unknown) => void

declare const ZO_ScrollList_GetData: <T = unknown>(rowControl: Control) => T

declare const ZO_ScrollList_GetDataControl: <T extends Control = Control>(
  listControl: Control,
  data: unknown
) => T | undefined

declare const ZO_ScrollList_ScrollRelative: (
  listControl: Control,
  value: number,
  onScrollCompleteCallback?: unknown,
  instant?: boolean
) => void

declare const ZO_SortHeader_OnMouseExit: (headerControl: Control) => void
