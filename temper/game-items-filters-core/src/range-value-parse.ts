import { isRecord } from "../../../shared/utils-narrow/src/is-record"
import type { FilterRangeValue } from "./filter-types"

function isComparisonOp(raw: unknown): raw is FilterRangeValue["op"] {
  return raw === "<=" || raw === "<" || raw === ">=" || raw === ">" || raw === "=" || raw === "!="
}

export function parseRangeValue(raw: unknown): FilterRangeValue | undefined {
  if (!isRecord(raw)) return undefined
  if (typeof raw.value !== "number") return undefined
  if (raw.op !== undefined && !isComparisonOp(raw.op)) return undefined
  return { value: raw.value, op: raw.op }
}
