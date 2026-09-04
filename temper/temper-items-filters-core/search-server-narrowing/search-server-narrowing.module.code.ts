import type { FilterRangeValue } from "../search-filter-types/search-filter-types.module.code.ts"

export function selectedIdsToServerTerms(selected: readonly string[]): readonly number[] {
  const ids: number[] = []
  for (const entry of selected) {
    const parsed = Number(entry)
    if (Number.isInteger(parsed)) ids.push(parsed)
  }
  return ids
}

const LEVEL_BAND_MAX = 999999

export function thresholdToServerBand(
  range: FilterRangeValue
): readonly [number, number] | undefined {
  const value = range.value
  const op = range.op ?? "<="
  switch (op) {
    case "<=":
      return [0, value]
    case "<":
      return [0, value - 1]
    case ">=":
      return [value, LEVEL_BAND_MAX]
    case ">":
      return [value + 1, LEVEL_BAND_MAX]
    case "=":
      return [value, value]
    case "!=":
      return undefined
    default:
      throw new Error(`unhandled comparison op: ${op}`)
  }
}
