import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { ComparisonOpId } from "../comparison-op-data/comparison-op-data.module.code.ts"

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
