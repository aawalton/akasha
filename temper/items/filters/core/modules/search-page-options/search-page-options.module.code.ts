import type { FilterEditorOption } from "akasha/temper/items/filters/core/modules/search-filter-types/search-filter-types.module.code.ts"

export function numberedOptions<T extends { readonly title?: string }>(
  rows: readonly T[],
  numberOf: (this: void, row: T) => number | undefined
): readonly FilterEditorOption[] {
  const found: { readonly value: number; readonly label: string }[] = []
  for (const row of rows) {
    const value = numberOf(row)
    if (value === undefined || value === 0 || row.title === undefined) continue
    found.push({ value, label: row.title })
  }
  found.sort((one, other) => one.value - other.value)
  return found.map((one) => ({ value: String(one.value), label: one.label }))
}

export function gameNamedOptions<T>(
  rows: readonly T[],
  numberOf: (this: void, row: T) => number | undefined,
  nameOf: (this: void, row: T) => string | undefined
): readonly FilterEditorOption[] {
  const found: { readonly value: number; readonly label: string }[] = []
  for (const row of rows) {
    const value = numberOf(row)
    const label = nameOf(row)
    if (value === undefined || label === undefined) continue
    found.push({ value, label })
  }
  found.sort((one, other) => one.value - other.value)
  return found.map((one) => ({ value: String(one.value), label: one.label }))
}
