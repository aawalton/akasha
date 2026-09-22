import type { JournalList } from "akasha/temper/addon/pages/world/collections/modules/journal-shape/journal-shape.module.code.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/addon/pages/crafting/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-addon-list/eso-addon-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-journal-window/eso-journal-window.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

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

export interface ItemBrowserListInstance extends JournalList {
  masterList: EntryData[]
  sortFunction:
    | ((
        this: void,
        listEntry1: ZoScrollListDataEntry<EntryData>,
        listEntry2: ZoScrollListDataEntry<EntryData>
      ) => boolean)
    | undefined
  searchType: number
  search: ZoStringSearch
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
