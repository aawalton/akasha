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
