
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

export class StringShape extends Shape<string> {
  private guarded(holds: (value: string) => boolean, code: string, message: string): StringShape {
    return new StringShape((value, path) => {
      const outcome = this.run(value, path)
      if (!outcome.ok) return outcome
      return holds(outcome.value) ? outcome : refused(path, code, message)
    }, this.acceptsAbsent)
  }

  min(least: number): StringShape {
    return this.guarded(
      (value) => value.length >= least,
      "too_small",
      `Too small: expected string to have >=${least} characters`
    )
  }

  regex(pattern: RegExp): StringShape {
    const stateless = new RegExp(pattern.source, pattern.flags.replace(/[gy]/g, ""))
    return this.guarded(
      (value) => stateless.test(value),
      "invalid_format",
      `Invalid string: must match pattern ${String(pattern)}`
    )
  }

  uuid(): StringShape {
    return this.guarded((value) => UUID.test(value), "invalid_format", "Invalid UUID")
  }

  url(): StringShape {
    return this.guarded(
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
  }

  datetime(): StringShape {
    return this.guarded((value) => ISO_DATETIME.test(value), "invalid_format", "Invalid ISO datetime")
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

export class NumberShape extends Shape<number> {
  private guarded(holds: (value: number) => boolean, code: string, message: string): NumberShape {
    return new NumberShape((value, path) => {
      const outcome = this.run(value, path)
      if (!outcome.ok) return outcome
      return holds(outcome.value) ? outcome : refused(path, code, message)
    }, this.acceptsAbsent)
  }

  int(): NumberShape {
    return this.guarded(
      (value) => Number.isInteger(value),
      "invalid_type",
      "Invalid input: expected int, received number"
    )
  }

  min(least: number): NumberShape {
    return this.guarded(
      (value) => value >= least,
      "too_small",
      `Too small: expected number to be >=${least}`
    )
  }

  max(most: number): NumberShape {
    return this.guarded((value) => value <= most, "too_big", `Too big: expected number to be <=${most}`)
  }

  positive(): NumberShape {
    return this.guarded((value) => value > 0, "too_small", "Too small: expected number to be >0")
  }

  nonnegative(): NumberShape {
    return this.guarded((value) => value >= 0, "too_small", "Too small: expected number to be >=0")
  }

  finite(): NumberShape {
    return this.guarded(
      (value) => Number.isFinite(value),
      "invalid_type",
      "Invalid input: expected number, received number"
    )
  }
}

export class LiteralShape<V extends string> extends Shape<V> {
  readonly value: V

  constructor(value: V) {
    super((input, path) =>
      input === value
        ? held(value)
        : refused(path, "invalid_value", `Invalid input: expected ${JSON.stringify(value)}`)
    )
    this.value = value
  }
}

export function enumOf<const V extends readonly string[]>(values: V): Shape<V[number]> {
  const allowed = new Set<string>(values)
  const listed = values.map((value) => JSON.stringify(value)).join("|")
  return new Shape((value, path) =>
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
  return new Shape((value, path) =>
    isJson(value) ? held(value as Json) : refused(path, "invalid_union", "Invalid input")
  )
}

export function coerceNumber(): NumberShape {
  return new NumberShape((value, path) => {
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
  new StringShape((value, path) =>
    typeof value === "string"
      ? held(value)
      : refused(path, "invalid_type", `Invalid input: expected string, received ${received(value)}`)
  )

export const numberShape = (): NumberShape => new NumberShape(numberHeld)

export const booleanShape = (): Shape<boolean> =>
  new Shape((value, path) =>
    typeof value === "boolean"
      ? held(value)
      : refused(path, "invalid_type", `Invalid input: expected boolean, received ${received(value)}`)
  )

export const unknownShape = (): Shape<unknown> => new Shape((value) => held(value))

export const literal = <V extends string>(value: V): LiteralShape<V> => new LiteralShape(value)
