export interface EntryData {
  type: number
  name: string
  subname: string
  itemType: string
  source: string
  zoneIds: { [zoneId: number]: boolean | undefined }
  zoneType: { [classification: number]: boolean | undefined }
  color: ZoColorDef
  bonuses: number | string[]
  itemLink: string
  setId: number
  setSize: number
  setFound: number
  progress: number
}

export type ContextMenuFactory = (
  this: void,
  data: EntryData
) => LuaMultiReturn<[number | string, ((this: void) => void) | number]>

export interface ItemBrowserListInstance extends ExtendedJournalSortFilterList {
  masterList: EntryData[]
  sortFunction:
    | ((
        this: void,
        listEntry1: ZoScrollListDataEntry<EntryData>,
        listEntry2: ZoScrollListDataEntry<EntryData>
      ) => boolean)
    | undefined
  searchType: number
  search: ExtendedJournalSearch
  filterDrop: ComboBox
  searchDrop: ComboBox
  searchBox: EditControl
  accountDrop?: ComboBox
  serverDrop?: ComboBox
  Setup: (this: ItemBrowserListInstance) => void
  BuildMasterList: (this: ItemBrowserListInstance) => void
  FilterScrollList: (this: ItemBrowserListInstance) => void
  SetupItemRow: (this: ItemBrowserListInstance, control: Control, data: EntryData) => void
  RefreshCollectionCount: (this: ItemBrowserListInstance) => void
  OrderedSearch: (this: ItemBrowserListInstance, haystack: string, needles: string) => boolean
  SearchSetBonuses: (
    this: ItemBrowserListInstance,
    bonuses: string[],
    searchInput: string
  ) => boolean
  CheckForMatch: (this: ItemBrowserListInstance, data: EntryData, searchInput: string) => boolean
  ProcessItemEntry: (
    this: ItemBrowserListInstance,
    stringSearch: object,
    data: EntryData,
    searchTerm: string,
    cache?: unknown
  ) => boolean
  RefreshAccountList: (this: ItemBrowserListInstance) => void
}
