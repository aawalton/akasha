import { answer, type PageQuery, type Row, UNREACHED } from "../page-query.ts"
import type { Roots } from "../../../page/page"
import { LOG } from "./log.ts"

export function rowsOf(roots: Roots, query: PageQuery): readonly Row[] {
  const found = answer(roots, query)
  if (found === null) throw new Error(`${LOG} \`${query.pageType}\` ${UNREACHED}`)
  return found.rows
}

export function seqIn(row: Row, key: string): number | null {
  const one = row.values[key]
  if (typeof one !== "string" || !/^\d+$/.test(one)) return null
  const seq = Number.parseInt(one, 10)
  return Number.isSafeInteger(seq) && seq > 0 ? seq : null
}

export function textIn(row: Row, key: string): string | null {
  const one = row.values[key]
  return typeof one === "string" && one.trim() !== "" ? one : null
}
