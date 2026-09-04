import { isRecord } from "@akasha/utils-narrow/is-record"
import type { FilterRangeValue } from "../search-filter-types/search-filter-types.module.code.ts"

function isComparisonOp(raw: unknown): raw is FilterRangeValue["op"] {
  return raw === "<=" || raw === "<" || raw === ">=" || raw === ">" || raw === "=" || raw === "!="
}

export function parseRangeValue(raw: unknown): FilterRangeValue | undefined {
  if (!isRecord(raw)) return undefined
  if (typeof raw.value !== "number") return undefined
  if (raw.op !== undefined && !isComparisonOp(raw.op)) return undefined
  return { value: raw.value, op: raw.op }
}
