interface ZoAddOnRowData {
  index?: number
  addOnFileName?: string
  strippedAddOnName?: string
  addOnName?: string
  sortIndex?: number
  addOnEnabled?: boolean
  typeId?: number
}

interface ZoScrollListDataEntry<T = ZoAddOnRowData> {
  data?: T
  control?: Control
}

interface ZoAddOnManagerObject {
  list?: object
}

declare const ADD_ON_MANAGER_KEYBOARD: ZoAddOnManagerObject | undefined

declare function ZO_ScrollList_GetDataList<T = ZoAddOnRowData>(
  listControl: Control
): ZoScrollListDataEntry<T>[] | undefined

declare const ZO_ScrollList_ScrollDataIntoView: (
  list: object,
  index: number,
  onScrollComplete?: () => void,
  animateInstantly?: boolean
) => void
