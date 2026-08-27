interface LibSetsSearchUISharedObject {
  control: SearchUIControl
  filtersControl: SearchUIControl
  contentControl: SearchUIControl
  resultsList: LibSetsSearchUIList
  resultsListControl: SearchUIControl
  counterControl: SearchUIControl
  searchButton?: SearchUIControl

  searchParams?: LibSetsSearchParams
  lastSearchParams?: LibSetsSearchParams

  searchDoneCallback?: (this: void, selfVar: LibSetsSearchUISharedObject) => void
  searchErrorCallback?: (this: void, selfVar: LibSetsSearchUISharedObject) => void
  searchCanceledCallback?: (this: void, selfVar: LibSetsSearchUISharedObject) => void

  stringSearch: ZoStringSearchObject

  tooltipControl: SearchUIControl
  tooltipControlTLC: SearchUIControl

  searchEditBoxControl: SearchUIEditBox
  bonusSearchEditBoxControl: SearchUIEditBox
  editBoxFilters: SearchUIEditBox[]
  editBoxFilterToSearchParamName: LuaMap<SearchUIEditBox, string>

  setTypeFiltersControl: SearchUIControl
  armorTypeFiltersControl: SearchUIControl
  weaponTypeFiltersControl: SearchUIControl
  equipmentTypeFiltersControl: SearchUIControl
  DCLIdFiltersControl: SearchUIControl
  enchantSearchCategoryTypeFiltersControl: SearchUIControl
  favoritesFiltersControl: SearchUIControl
  dropZoneFiltersControl: SearchUIControl
  dropMechanicsFiltersControl: SearchUIControl
  dropLocationsFiltersControl: SearchUIControl
  numBonusFiltersControl: SearchUIControl

  multiSelectFilterDropdowns: SearchUIControl[]
  multiSelectFilterDropdownToSearchParamName: LuaMap<SearchUIControl, string>

  itemIdRelevantFilterKeys?: { [searchParamKey: string]: boolean } | false

  Initialize: (this: LibSetsSearchUISharedObject, control: SearchUIControl) => void
  SetSearchCallbacks: (
    this: LibSetsSearchUISharedObject,
    doneCb?: (this: void, selfVar: LibSetsSearchUISharedObject) => void,
    errorCb?: (this: void, selfVar: LibSetsSearchUISharedObject) => void,
    canceledCb?: (this: void, selfVar: LibSetsSearchUISharedObject) => void
  ) => void
  ResetInternal: (this: LibSetsSearchUISharedObject) => void
  ResetUI: (this: LibSetsSearchUISharedObject) => void
  Reset: (this: LibSetsSearchUISharedObject) => void
  ResetMultiSelectDropdown: (
    this: LibSetsSearchUISharedObject,
    dropdownControl: SearchUIControl
  ) => void
  SelectAllAtMultiSelectDropdown: (
    this: LibSetsSearchUISharedObject,
    dropdownControl: SearchUIControl
  ) => void
  SelectInvertMultiSelectDropdown: (
    this: LibSetsSearchUISharedObject,
    dropdownControl: SearchUIControl
  ) => void
  SelectMultiSelectDropdownEntries: (
    this: LibSetsSearchUISharedObject,
    dropdownControl: SearchUIControl,
    entriesToSelect: unknown[],
    refreshResultsListAfterwards?: boolean
  ) => void
  IsShown: (this: LibSetsSearchUISharedObject) => boolean
  ShowUI: (this: LibSetsSearchUISharedObject, slashOptions?: unknown) => void
  HideUI: (this: LibSetsSearchUISharedObject) => void
  Show: (
    this: LibSetsSearchUISharedObject,
    searchParams?: LibSetsSearchParams,
    doneCb?: (this: void, selfVar: LibSetsSearchUISharedObject) => void,
    errorCb?: (this: void, selfVar: LibSetsSearchUISharedObject) => void,
    canceledCb?: (this: void, selfVar: LibSetsSearchUISharedObject) => void
  ) => void
  ToggleUI: (this: LibSetsSearchUISharedObject, slashOptions?: unknown) => void
  UpdateSearchButtonEnabledState: (
    this: LibSetsSearchUISharedObject,
    isEnabled: boolean | undefined
  ) => void
  UpdateSearchHistory: (this: LibSetsSearchUISharedObject, editBoxCtrl: SearchUIEditBox) => void
  GetSetNameSearchString: (
    this: LibSetsSearchUISharedObject,
    tableOrString: unknown
  ) => string | undefined
  Cancel: (this: LibSetsSearchUISharedObject) => void
  ValidateSearchParams: (this: LibSetsSearchUISharedObject) => boolean | undefined
  StartSearch: (
    this: LibSetsSearchUISharedObject,
    doNotShowUI: boolean | undefined,
    wasReset?: boolean
  ) => boolean
  Search: (
    this: LibSetsSearchUISharedObject,
    doNotShowUI: boolean | undefined,
    searchParams: LibSetsSearchParams | undefined
  ) => void
  CheckForMatch: (
    this: LibSetsSearchUISharedObject,
    data: LibSetsSearchRowData,
    searchInput: string
  ) => boolean
  ProcessItemEntry: (
    this: LibSetsSearchUISharedObject,
    stringSearch: unknown,
    data: LibSetsSearchRowData,
    searchTerm: string,
    cache?: unknown
  ) => boolean
  SearchSetBonuses: (
    this: LibSetsSearchUISharedObject,
    bonuses: (string | undefined)[] | undefined,
    searchInput: string,
    setId: number | undefined
  ) => boolean
  OnFilterChanged: (
    this: LibSetsSearchUISharedObject,
    dropdownControl?: SearchUIControl,
    editControl?: SearchUIEditBox
  ) => void
  DidAnyFilterChange: (this: LibSetsSearchUISharedObject) => boolean
  PreFilterMasterList: (
    this: LibSetsSearchUISharedObject,
    defaultMasterListBase: { [setId: number]: { [key: string]: unknown } } | undefined
  ) => { [setId: number]: { [key: string]: unknown } } | undefined
  ThrottledCall: (
    this: LibSetsSearchUISharedObject,
    callbackName: string,
    timer: number,
    callback: (this: void, ...args: unknown[]) => void,
    ...args: unknown[]
  ) => void
  ModifyWeaponType2hd: (
    this: LibSetsSearchUISharedObject,
    weaponType: number | undefined
  ) => string | undefined
  SetSearchEditBoxValue: (
    this: LibSetsSearchUISharedObject,
    editBoxControl: SearchUIEditBox | undefined,
    searchTerm: string
  ) => void
  ShowItemLinkTooltip: (
    this: LibSetsSearchUISharedObject,
    rowControl: SearchUIControl,
    data: LibSetsSearchRowData | undefined
  ) => boolean | undefined
  HideItemLinkTooltip: (this: LibSetsSearchUISharedObject) => void
  ShowItemLinkPopupTooltip: (
    this: LibSetsSearchUISharedObject,
    parent: SearchUIControl,
    data: LibSetsSearchRowData | undefined
  ) => void
  HideItemLinkPopupTooltip: (this: LibSetsSearchUISharedObject) => void
  ShowSetDropLocationTooltip: (
    this: LibSetsSearchUISharedObject,
    rowControl: SearchUIControl,
    data: LibSetsSearchRowData | undefined,
    itemLinkTooltipShownLeftOfControl?: boolean
  ) => void
  ItemLinkToChat: (
    this: LibSetsSearchUISharedObject,
    data: LibSetsSearchRowData | undefined
  ) => void
  GetAllFavoritesCategories: (
    this: LibSetsSearchUISharedObject,
    setId: number | undefined
  ) => string[] | undefined
  GetNextFavoritesCategory: (
    this: LibSetsSearchUISharedObject,
    setId: number | undefined
  ) => string | undefined
  IsSetIdInFavorites: (
    this: LibSetsSearchUISharedObject,
    setId: number | undefined,
    favoriteCategory: string | undefined
  ) => boolean
  AddSetIdToFavorites: (
    this: LibSetsSearchUISharedObject,
    rowControl: SearchUIControl,
    setId: number,
    favoriteCategory: string | undefined
  ) => void
  RemoveSetIdFromFavorites: (
    this: LibSetsSearchUISharedObject,
    rowControl: SearchUIControl,
    setId: number,
    favoriteCategory: string
  ) => void
  RemoveSetIdFromAllFavorites: (
    this: LibSetsSearchUISharedObject,
    rowControl: SearchUIControl,
    setId: number
  ) => void
  RemoveAllSetFavorites: (this: LibSetsSearchUISharedObject, favoriteCategory: string) => void
  ShowSettingsMenu: (this: LibSetsSearchUISharedObject, anchorControl: SearchUIControl) => void
  ShowRowContextMenu: (this: LibSetsSearchUISharedObject, rowControl: SearchUIControl) => void
  ShowDropdownContextMenu: (
    this: LibSetsSearchUISharedObject,
    dropdownControl: SearchUIControl,
    shift?: boolean,
    alt?: boolean,
    ctrl?: boolean,
    command?: boolean
  ) => void
  OnSearchEditBoxContextMenu: (
    this: LibSetsSearchUISharedObject,
    editBoxControl: SearchUIEditBox | undefined,
    shift?: boolean,
    alt?: boolean,
    ctrl?: boolean,
    command?: boolean
  ) => void
  ApplySearchParamsToUI: (this: LibSetsSearchUISharedObject) => void

  [key: string]: unknown
}

interface LibSetsSearchUIKeyboardObject extends LibSetsSearchUISharedObject {
  resetButton: SearchUIControl
  multiSelectFilterTypeNameToDropdown: { [filterName: string]: SearchUIControl }
  multiSelectMinAndMaxData: LuaMap<SearchUIControl, LibSetsMultiSelectMinMaxData>
  isItemIdRelevantMultiSelectFilterDropdown: LuaMap<SearchUIControl, boolean>
  LSM_Dropdowns?: { [filterName: string]: unknown }
  tooltipKeyboardHookWasDone: boolean

  LoadSearchUIPositionAndSize: (
    this: LibSetsSearchUIKeyboardObject,
    tlcCtrl?: SearchUIControl
  ) => void
  SaveSearchUIPositionAndSize: (
    this: LibSetsSearchUIKeyboardObject,
    tlcCtrl?: SearchUIControl
  ) => void
  SetMultiSelectDropdownDimensionConstraints: (this: LibSetsSearchUIKeyboardObject) => void
  UpdateSearchParamsFromSlashcommand: (
    this: LibSetsSearchUIKeyboardObject,
    slashOptions: unknown
  ) => void
  InitializeFilters: (this: LibSetsSearchUIKeyboardObject) => void
  UpdateDropdownSort: (
    this: LibSetsSearchUIKeyboardObject,
    comboBoxType: string,
    sortType: unknown,
    suppressRebuild?: boolean
  ) => void
  GetSelectedMultiSelectDropdownFilters: (
    this: LibSetsSearchUIKeyboardObject,
    multiSelectDropdown: SearchUIControl
  ) => { [filterType: string]: boolean }
  SetMultiSelectDropdownFilters: (
    this: LibSetsSearchUIKeyboardObject,
    multiSelectDropdown: SearchUIControl,
    entriesToSelect: { [filterType: string]: boolean }
  ) => void
  IsAnyItemIdRelevantFilterActive: (this: LibSetsSearchUIKeyboardObject) => boolean
  GetItemIdRelevantFilterKeys: (
    this: LibSetsSearchUIKeyboardObject
  ) => { [searchParamKey: string]: boolean } | false
  GetItemIdsForSetIdRespectingFilters: (
    this: LibSetsSearchUIKeyboardObject,
    setId: number,
    onlyOneItemId?: boolean
  ) => number[] | undefined
  OnRowMouseEnter: (this: LibSetsSearchUIKeyboardObject, rowControl: SearchUIControl) => void
  OnRowMouseExit: (this: LibSetsSearchUIKeyboardObject, rowControl: SearchUIControl) => void
  OnRowMouseUp: (
    this: LibSetsSearchUIKeyboardObject,
    rowControl: SearchUIControl,
    mouseButton: number,
    upInside: boolean,
    shift?: boolean,
    alt?: boolean,
    ctrl?: boolean,
    command?: boolean
  ) => void
  OnDropdownMouseUp: (
    this: LibSetsSearchUIKeyboardObject,
    dropdownControl: SearchUIControl,
    mouseButton: number,
    upInside: boolean,
    shift?: boolean,
    alt?: boolean,
    ctrl?: boolean,
    command?: boolean
  ) => void
}

interface LibSetsSearchParams {
  names?: string
  bonuses?: string
  [filterKey: string]: string | { [id: string]: boolean } | undefined
}

interface LibSetsSearchRowData {
  name: string
  nameLower?: string
  nameClean?: string
  setId?: number
  setType?: number
  setTypeName?: string
  setTypeTexture?: string
  itemLink?: string
  itemId?: number
  isFavorite?: string | number | boolean
  bonuses?: (string | undefined)[]
  numBonuses?: number
  dropLocationText?: string
  dropLocationSort?: string
  setDataText?: string
  setDataTextClean?: string
  setInfoParts?: { [part: string]: LibSetsSetInfoPart }
  zoneIds?: number[]
  [key: string]: unknown
}

interface LibSetsMultiSelectMinMaxData {
  minX: number
  maxX?: number | string
  anchors?: LibSetsAnchorData[]
}

interface LibSetsAnchorData {
  point: number
  relativeTo: unknown
  relativePoint: number
  offsetX?: number | string
  offsetY?: number | string
}

interface LibSetsSearchUIList extends ZoSortFilterList {
  _parentObject: LibSetsSearchUIKeyboardObject
  masterList: LibSetsSearchRowData[]
  sortKeys: Record<string, ZoSortKeyConfig>
  isAnyItemIdRelevantFilterActive?: boolean
  updateListColumnWith?: number
  headerAndColumnsMinAndMaxData: LuaMap<SearchUIControl, LibSetsListColumnData>

  sortHeaderGroup: ZoSortHeaderGroup & {
    SelectAndResetSortForKey: (this: ZoSortHeaderGroup, key: string) => void
    GetCurrentSortKey: (this: ZoSortHeaderGroup) => string | undefined
    GetSortDirection: (this: ZoSortHeaderGroup) => boolean | undefined
  }

  SetEmptyText: (this: LibSetsSearchUIList, text: string) => void
  RefreshVisible: (this: LibSetsSearchUIList) => void

  Row_OnMouseEnter: (this: LibSetsSearchUIList, rowControl: SearchUIControl) => void
  Row_OnMouseExit: (this: LibSetsSearchUIList, rowControl: SearchUIControl) => void

  Setup: (this: LibSetsSearchUIList) => void
  SetHeaderAndColumnDimensionConstraints: (
    this: LibSetsSearchUIList,
    rowControl?: SearchUIControl,
    columnsToo?: boolean,
    noHeader?: boolean
  ) => void
  SetupItemRow: (
    this: LibSetsSearchUIList,
    control: SearchUIControl,
    data: LibSetsSearchRowData
  ) => void
  CreateEntryForSet: (
    this: LibSetsSearchUIList,
    setId: number,
    setData: { [key: string]: unknown }
  ) => LibSetsSearchRowData | undefined
  BuildSortKeys: (this: LibSetsSearchUIList) => void
  UpdateCounter: (this: LibSetsSearchUIList, scrollData: unknown[]) => void
  AddFavorite: (
    this: LibSetsSearchUIList,
    rowControl: SearchUIControl,
    favoriteCategory: string
  ) => void
  RemoveFavorite: (
    this: LibSetsSearchUIList,
    rowControl: SearchUIControl,
    favoriteCategory: string
  ) => void
  [key: string]: unknown
}

interface LibSetsListColumnData {
  minX: number
  maxX: number | string
  factorMultiplier?: number
  columnName?: string
  anchors?: LibSetsAnchorData[]
}

interface LibSetsSearchUIListClass extends LibSetsSearchUIList, ZoSortFilterListSubclass {
  New: (
    this: LibSetsSearchUIListClass,
    listParentControl: SearchUIControl,
    parentObject: LibSetsSearchUIKeyboardObject
  ) => LibSetsSearchUIList
}

interface LibSetsSearchUISharedClass
  extends LibSetsSearchUISharedObject,
    ZoInitializingObjectSubclass {
  New: (this: LibSetsSearchUISharedClass, ...args: unknown[]) => LibSetsSearchUISharedObject
}

interface LibSetsSearchUIKeyboardClass
  extends LibSetsSearchUIKeyboardObject,
    ZoInitializingObjectSubclass {
  New: (
    this: LibSetsSearchUIKeyboardClass,
    control: SearchUIControl
  ) => LibSetsSearchUIKeyboardObject
}

declare let LibSets_SearchUI_List: LibSetsSearchUIListClass
