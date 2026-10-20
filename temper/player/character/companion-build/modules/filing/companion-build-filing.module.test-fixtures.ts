import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import type { PageWhere } from "akasha/page/core/modules/page-types/page-types.module.code.ts"

export function rowMatches(
  row: Readonly<Record<string, Json>>,
  where: PageWhere | undefined
): boolean {
  return (where ?? []).every(
    (condition) => "eq" in condition && row[condition.key] === condition.eq
  )
}
