import { assertNever } from "../../../../shared/utils-narrow/src/assert-never"
import type { ComparisonOpId } from "./comparison-op-data"

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
