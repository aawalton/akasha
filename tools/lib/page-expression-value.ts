import type { Held } from "./page-file-values.ts"

export type RefusedCode =
  | "parse_error"
  | "not_implemented"
  | "substrate_parting"
  | "comparison_type_mismatch"
  | "equality_non_scalar"
  | "arithmetic_nan"
  | "divide_by_zero"
  | "function_argument_type_error"
  | "ref_lookup_type_error"
  | "unknown_key"
  | "bracket_access_type_error"

export class ExpressionRefused extends Error {
  readonly code: RefusedCode
  constructor(why: string, code: RefusedCode) {
    super(why)
    this.name = "ExpressionRefused"
    this.code = code
  }
}

export type Scalar = number | string | boolean | null

export type Value = Scalar | readonly Scalar[]

export const NUMERIC = /^-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?$/

function scalared(text: string, whose: string): Scalar {
  if (NUMERIC.test(text)) return Number(text)
  if (text === "true" || text === "false") {
    throw new ExpressionRefused(
      `${whose} holds \`${text}\`, which is a word to a file and a boolean to the database, and this evaluator will not pick`,
      "substrate_parting"
    )
  }
  return text
}

export function valued(held: Held, key: string): Value {
  if (held === null || held === undefined) return null
  if (Array.isArray(held)) {
    return (held as readonly string[]).map(function eachItem(item, at) {
      return scalared(String(item), `item ${at + 1} of the list \`${key}\``)
    })
  }
  return scalared(String(held), `\`${key}\``)
}

export function listed(value: Value): readonly Scalar[] | null {
  return Array.isArray(value) ? (value as readonly Scalar[]) : null
}

export function truthy(value: Value): boolean {
  if (Array.isArray(value)) return true
  if (value === null) return false
  if (typeof value === "boolean") return value
  if (typeof value === "string") return value !== ""
  return value !== 0 && !Number.isNaN(value)
}

export function shown(value: Value): string {
  const list = listed(value)
  if (list !== null) return `a list of ${list.length} item${list.length === 1 ? "" : "s"}`
  return typeof value === "string" ? `the text \`${value}\`` : `\`${String(value)}\``
}

export function scalarOnly(op: "==" | "!=", side: "left" | "right", value: Value): Scalar {
  if (Array.isArray(value)) {
    throw new ExpressionRefused(
      `\`${op}\` compares scalars only, and the ${side} side is ${shown(value)}`,
      "equality_non_scalar"
    )
  }
  return value as Scalar
}
