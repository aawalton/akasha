declare function zo_clamp(value: number, min: number, max: number): number

declare function ZO_TableOrderingFunction(
  data1: unknown,
  data2: unknown,
  sortKey: string,
  sortKeys: Record<string, unknown>,
  sortOrder: boolean
): boolean

interface ZoComboBox {
  m_maxNumSelections?: number
  m_sortsItems?: boolean
  UpdateItems(this: ZoComboBox): void
  SetSelected(this: ZoComboBox, index: number, selected: boolean): void
  ClearAllSelections(this: ZoComboBox): void
  [key: string]: unknown
}

interface ZoComboBoxRow extends Control {
  m_owner?: ZoComboBox
  dataEntry?: { data?: { tooltip?: string | number | ((this: void) => string | number) } }
}
