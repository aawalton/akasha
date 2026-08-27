interface ZoComboBoxItem {
  name: string | number
  callback?: (this: void, ...args: unknown[]) => void
  data?: unknown
  tooltip?: unknown
  [key: string]: unknown
}

interface ZoComboBox {
  m_container?: Control
  m_containerWidth?: number
  m_dropdownObject?: { spacing: number }
  m_multiSelectItemData?: ZoComboBoxItem[]
  m_scroll?: Control
  m_selectedItemData?: ZoComboBoxItem | ZoComboBoxItem[] | undefined
  m_sortedItems: ZoComboBoxItem[]
  AddItem(this: ZoComboBox, entry: ZoComboBoxItem, suppressUpdate?: unknown): void
  ClearItems(this: ZoComboBox): void
  CreateItemEntry(
    this: ZoComboBox,
    name: string | number,
    callback?: (this: void, ...args: unknown[]) => void
  ): ZoComboBoxItem
  DisableMultiSelect(this: ZoComboBox): void
  EnableMultiSelect(this: ZoComboBox, textFormatter?: unknown, noSelectionText?: unknown): void
  GetSelectedItemData(this: ZoComboBox): ZoComboBoxItem | ZoComboBoxItem[] | undefined
  GetSpacing(this: ZoComboBox): number
  RefreshSelectedItemText(this: ZoComboBox): void
  SetEnabled(this: ZoComboBox, enabled: boolean): void
  SetHeight(this: ZoComboBox, height: number): void
  SetMaxSelections(this: ZoComboBox, max: number): void
  SetSelectedItem(this: ZoComboBox, text: string | number | undefined): void
  SetSelectedItemByEval(
    this: ZoComboBox,
    evalFunction: (this: void, entry: ZoComboBoxItem) => boolean,
    selectionChanged?: boolean
  ): void
  SetSortsItems(this: ZoComboBox, sorts: boolean): void
  SetSortOrder(this: ZoComboBox, sortOrder: unknown, sortType: unknown): void
}

declare const ZO_ComboBoxDropdown_Keyboard: unknown

declare const ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT: number
declare const ZO_SCROLLABLE_COMBO_BOX_LIST_PADDING_Y: number
declare const ZO_COMBOBOX_SUPRESS_UPDATE: unknown
