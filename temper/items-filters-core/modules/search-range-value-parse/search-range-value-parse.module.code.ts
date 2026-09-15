import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import type { FilterRangeValue } from "akasha/temper/items-filters-core/modules/search-filter-types/search-filter-types.module.code.ts"

function isComparisonOp(raw: unknown): raw is FilterRangeValue["op"] {
  return raw === "<=" || raw === "<" || raw === ">=" || raw === ">" || raw === "=" || raw === "!="
}

export function parseRangeValue(raw: unknown): FilterRangeValue | undefined {
  if (!isRecord(raw)) return undefined
  if (typeof raw.value !== "number") return undefined
  if (raw.op !== undefined && !isComparisonOp(raw.op)) return undefined
  return { value: raw.value, op: raw.op }
}
