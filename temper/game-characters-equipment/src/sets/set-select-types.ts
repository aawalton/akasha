import type { Effect } from "@akasha/temper-formula-framework/effect"

interface FilterableSelectDialogItem {
  id: string
  name: string
  description?: string
  effects?: readonly Effect[]
}

interface FilterableSelectDialogCategory<T extends FilterableSelectDialogItem> {
  id: string
  label: string
  items: readonly T[]
}

export interface FilterableSelectDialogConfig<T extends FilterableSelectDialogItem> {
  title: string
  searchPlaceholder: string
  emptyMessage: string
  categories: readonly FilterableSelectDialogCategory<T>[]
  allItems: readonly T[]
  sortEffects?: (effects: readonly string[]) => readonly string[]
  filterItem: (item: T, searchTerm: string) => boolean
  showEffectFilter?: boolean
}
