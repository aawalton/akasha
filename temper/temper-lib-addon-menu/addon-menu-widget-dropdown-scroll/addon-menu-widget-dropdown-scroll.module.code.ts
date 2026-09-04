import type { DropdownData, LamControl } from "../addon-menu-types/addon-menu-types.module.code.ts"

const DEFAULT_VISIBLE_ROWS = 10
const PADDING_Y = ZO_SCROLLABLE_COMBO_BOX_LIST_PADDING_Y
const ROUNDING_MARGIN = 0.01

export function setDropdownHeight(
  this: LamControl,
  dropdown: LamComboBox,
  dropdownData: DropdownData
): LuaMultiReturn<[number, number, number]> {
  const entrySpacing = dropdown.GetSpacing()
  const numSortedItems = dropdown.m_sortedItems.length
  let min: number
  let max: number

  const isScrollable = dropdownData.scrollable !== undefined && dropdownData.scrollable !== false
  const visibleRows =
    typeof dropdownData.scrollable === "number" ? dropdownData.scrollable : DEFAULT_VISIBLE_ROWS
  if (numSortedItems < visibleRows) {
    min = numSortedItems
    max = numSortedItems
  } else if (isScrollable) {
    min = DEFAULT_VISIBLE_ROWS < visibleRows ? DEFAULT_VISIBLE_ROWS : visibleRows
    max = DEFAULT_VISIBLE_ROWS > visibleRows ? DEFAULT_VISIBLE_ROWS : visibleRows
  } else {
    min = DEFAULT_VISIBLE_ROWS
    max = numSortedItems
  }

  const numEntries = zo_clamp(numSortedItems, min, max)
  const objectSpacing = dropdown.m_dropdownObject?.spacing ?? 0
  const entryHeightWithSpacing = ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT + objectSpacing
  const allItemsHeight =
    entryHeightWithSpacing * numEntries - entrySpacing + PADDING_Y * 2 + ROUNDING_MARGIN
  dropdown.SetHeight?.(allItemsHeight)
  const scroll = dropdown.m_scroll
  if (scroll !== undefined) {
    ZO_ScrollList_Commit(scroll)
  }

  return $multi(visibleRows, min, max)
}
