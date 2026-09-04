export type LeadsColor = ZoColorDef

export interface UnitList {
  list: Control
  masterList: LeadsUnitData[]
  currentSortKey: string
  currentSortOrder: boolean
  sortFunction: (
    this: void,
    listEntry1: ZoScrollListDataEntry<LeadsUnitData>,
    listEntry2: ZoScrollListDataEntry<LeadsUnitData>
  ) => boolean
  sortHeaderGroup: ZoSortHeaderGroup
  Initialize: (this: UnitList, control: Control) => void
  BuildMasterList: (this: UnitList) => void
  FilterScrollList: (this: UnitList) => void
  SortScrollList: (this: UnitList) => void
  SetupUnitRow: (this: UnitList, control: LeadsRowControl, data: LeadsUnitData) => void
  Refresh: (this: UnitList) => void
  RefreshData: (this: UnitList) => void
  Row_OnMouseEnter: (this: UnitList, row: Control) => void
  Row_OnMouseExit: (this: UnitList, row: Control) => void
}

export interface UnitListClass extends UnitList, ZoSortFilterListSubclass {
  defaults: Record<string, unknown>
  SORT_KEYS: Record<string, ZoSortKeyConfig>
  New: (this: UnitListClass) => UnitList
}
