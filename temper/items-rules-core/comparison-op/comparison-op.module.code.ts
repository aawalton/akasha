import type { ComparisonOpId } from "akasha/temper/items-rules-core/comparison-op-data/comparison-op-data.module.code.ts"
import { assertNever } from "akasha/utils/narrow/modules/assert-never/assert-never.module.code.ts"

export function compareWithOp(op: ComparisonOpId, a: number, b: number): boolean {
  switch (op) {
    case "<=":
      return a <= b
    case "<":
      return a < b
    case ">=":
      return a >= b
    case ">":
      return a > b
    case "=":
      return a === b
    case "!=":
      return a !== b
    default:
      return assertNever(op)
  }
}
