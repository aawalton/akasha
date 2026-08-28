
import {
  type Outcome,
  type ShapePath,
  Shape,
  held,
  isObjectLike,
  received,
  refused,
} from "./shape-core.ts"

const UUID =
  /^(?:[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$/

const ISO_DATETIME =
  /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?Z$/

export type StringShape = Shape<string> & {
  min(least: number): StringShape
  regex(pattern: RegExp): StringShape
  uuid(): StringShape
  url(): StringShape
  datetime(): StringShape
}

export function StringShape(
  run: (value: unknown, path: ShapePath) => Outcome<string>,
  acceptsAbsent = false
): StringShape {
  const guarded = (holds: (value: string) => boolean, code: string, message: string): StringShape =>
    StringShape((value, path) => {
      const outcome = run(value, path)
      if (!outcome.ok) return outcome
      return holds(outcome.value) ? outcome : refused(path, code, message)
    }, acceptsAbsent)

  return {
    ...Shape(run, acceptsAbsent),

    min(least) {
      return guarded(
        (value) => value.length >= least,
        "too_small",
        `Too small: expected string to have >=${least} characters`
      )
    },

    regex(pattern) {
      const stateless = new RegExp(pattern.source, pattern.flags.replace(/[gy]/g, ""))
      return guarded(
        (value) => stateless.test(value),
        "invalid_format",
        `Invalid string: must match pattern ${String(pattern)}`
      )
    },

    uuid() {
      return guarded((value) => UUID.test(value), "invalid_format", "Invalid UUID")
    },

    url() {
      return guarded(
        (value) => {
          try {
            void new URL(value)
            return true
          } catch {
            return false
          }
        },
        "invalid_format",
        "Invalid URL"
      )
    },

    datetime() {
      return guarded((value) => ISO_DATETIME.test(value), "invalid_format", "Invalid ISO datetime")
    },
  }
}

function numberHeld(value: unknown, path: ShapePath): Outcome<number> {
  if (typeof value !== "number") {
    return refused(path, "invalid_type", `Invalid input: expected number, received ${received(value)}`)
  }
  if (Number.isNaN(value)) {
    return refused(path, "invalid_type", "Invalid input: expected number, received NaN")
  }
  if (!Number.isFinite(value)) {
    return refused(path, "invalid_type", "Invalid input: expected number, received number")
  }
  return held(value)
}

export type NumberShape = Shape<number> & {
  int(): NumberShape
  min(least: number): NumberShape
  max(most: number): NumberShape
  positive(): NumberShape
  nonnegative(): NumberShape
  finite(): NumberShape
}

export function NumberShape(
  run: (value: unknown, path: ShapePath) => Outcome<number>,
  acceptsAbsent = false
): NumberShape {
  const guarded = (holds: (value: number) => boolean, code: string, message: string): NumberShape =>
    NumberShape((value, path) => {
      const outcome = run(value, path)
      if (!outcome.ok) return outcome
      return holds(outcome.value) ? outcome : refused(path, code, message)
    }, acceptsAbsent)

  return {
    ...Shape(run, acceptsAbsent),

    int() {
      return guarded(
        (value) => Number.isInteger(value),
        "invalid_type",
        "Invalid input: expected int, received number"
      )
    },

    min(least) {
      return guarded(
        (value) => value >= least,
        "too_small",
        `Too small: expected number to be >=${least}`
      )
    },

    max(most) {
      return guarded((value) => value <= most, "too_big", `Too big: expected number to be <=${most}`)
    },

    positive() {
      return guarded((value) => value > 0, "too_small", "Too small: expected number to be >0")
    },

    nonnegative() {
      return guarded((value) => value >= 0, "too_small", "Too small: expected number to be >=0")
    },

    finite() {
      return guarded(
        (value) => Number.isFinite(value),
        "invalid_type",
        "Invalid input: expected number, received number"
      )
    },
  }
}

export type LiteralShape<V extends string> = Shape<V> & { readonly value: V }

export function LiteralShape<V extends string>(value: V): LiteralShape<V> {
  return {
    ...Shape<V>((input, path) =>
      input === value
        ? held(value)
        : refused(path, "invalid_value", `Invalid input: expected ${JSON.stringify(value)}`)
    ),
    value,
  }
}

export function enumOf<const V extends readonly string[]>(values: V): Shape<V[number]> {
  const allowed = new Set<string>(values)
  const listed = values.map((value) => JSON.stringify(value)).join("|")
  return Shape((value, path) =>
    typeof value === "string" && allowed.has(value)
      ? held(value as V[number])
      : refused(path, "invalid_value", `Invalid option: expected one of ${listed}`)
  )
}

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json }

const isBareObject = (value: unknown): value is Record<string, unknown> => {
  if (!isObjectLike(value)) return false
  const proto = Object.getPrototypeOf(value) as unknown
  return proto === Object.prototype || proto === null
}

function isJson(value: unknown): boolean {
  if (value === null) return true
  const kind = typeof value
  if (kind === "string" || kind === "boolean") return true
  if (kind === "number") return Number.isFinite(value)
  if (Array.isArray(value)) return value.every(isJson)
  if (isBareObject(value)) return Object.values(value).every(isJson)
  return false
}

export function json(): Shape<Json> {
  return Shape((value, path) =>
    isJson(value) ? held(value as Json) : refused(path, "invalid_union", "Invalid input")
  )
}

export function coerceNumber(): NumberShape {
  return NumberShape((value, path) => {
    let asNumber: number
    try {
      asNumber = Number(value)
    } catch {
      return refused(path, "invalid_type", `Invalid input: expected number, received ${received(value)}`)
    }
    return numberHeld(asNumber, path)
  })
}

export const stringShape = (): StringShape =>
  StringShape((value, path) =>
    typeof value === "string"
      ? held(value)
      : refused(path, "invalid_type", `Invalid input: expected string, received ${received(value)}`)
  )

export const numberShape = (): NumberShape => NumberShape(numberHeld)

export const booleanShape = (): Shape<boolean> =>
  Shape((value, path) =>
    typeof value === "boolean"
      ? held(value)
      : refused(path, "invalid_type", `Invalid input: expected boolean, received ${received(value)}`)
  )

export const unknownShape = (): Shape<unknown> => Shape((value) => held(value))

export const literal = <V extends string>(value: V): LiteralShape<V> => LiteralShape(value)
