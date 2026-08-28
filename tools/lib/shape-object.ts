
import {
  type Infer,
  type Outcome,
  type ShapeIssue,
  type ShapePath,
  Shape,
  assign,
  held,
  isObjectLike,
  received,
  refused,
} from "./shape-core.ts"
import type { LiteralShape } from "./shape-scalar.ts"

export type Fields = { readonly [key: string]: Shape<unknown> }

type Simplify<T> = { [K in keyof T]: T[K] } & {}

type OptionalKeys<F extends Fields> = {
  [K in keyof F]: undefined extends Infer<F[K]> ? K : never
}[keyof F]

export type Struct<F extends Fields> = Simplify<
  { [K in Exclude<keyof F, OptionalKeys<F>>]: Infer<F[K]> } & {
    [K in OptionalKeys<F>]?: Infer<F[K]>
  }
>

export type LooseStruct<F extends Fields> = Struct<F> & { readonly [key: string]: unknown }

type Unknowns = "strip" | "loose" | "strict"

function parseFields(
  fields: Fields,
  unknowns: Unknowns,
  value: unknown,
  path: ShapePath
): Outcome<Record<string, unknown>> {
  if (!isObjectLike(value)) {
    return refused(path, "invalid_type", `Invalid input: expected object, received ${received(value)}`)
  }

  const issues: ShapeIssue[] = []
  const out: Record<string, unknown> = {}
  const declared = Object.keys(fields)

  for (const name of declared) {
    const present = Object.hasOwn(value, name)
    const field = fields[name] as Shape<unknown>
    const outcome = field.run(present ? value[name] : undefined, [...path, name])
    if (!outcome.ok) {
      issues.push(...outcome.issues)
      continue
    }
    if (!present && !field.acceptsAbsent) {
      issues.push({
        code: "invalid_type",
        path: [...path, name],
        message: "Invalid input: expected nonoptional, received undefined",
      })
      continue
    }
    if (present || outcome.value !== undefined) assign(out, name, outcome.value)
  }

  if (unknowns !== "strip") {
    const known = new Set(declared)
    const extra = Object.keys(value).filter((name) => name !== "__proto__" && !known.has(name))
    if (unknowns === "strict" && extra.length > 0) {
      issues.push({
        code: "unrecognized_keys",
        path,
        message:
          extra.length === 1
            ? `Unrecognized key: ${JSON.stringify(extra[0])}`
            : `Unrecognized keys: ${extra.map((name) => JSON.stringify(name)).join(", ")}`,
      })
    }
    if (unknowns === "loose") for (const name of extra) assign(out, name, value[name])
  }

  return issues.length > 0 ? { ok: false, issues } : held(out)
}

export type ObjectShape<F extends Fields, Out> = Shape<Out> & {
  readonly unknowns: Unknowns
  readonly fields: Fields
  strict(): ObjectShape<F, Struct<F>>
  passthrough(): ObjectShape<F, LooseStruct<F>>
}

export function ObjectShape<F extends Fields, Out>(
  declaration: F,
  unknowns: Unknowns
): ObjectShape<F, Out> {
  return {
    ...Shape<Out>((value, path) => parseFields(declaration, unknowns, value, path) as Outcome<Out>),
    unknowns,
    fields: declaration,

    strict() {
      return ObjectShape<F, Struct<F>>(declaration, "strict")
    },

    passthrough() {
      return ObjectShape<F, LooseStruct<F>>(declaration, "loose")
    },
  }
}

export function array<T>(element: Shape<T>): Shape<T[]> {
  return Shape((value, path) => {
    if (!Array.isArray(value)) {
      return refused(path, "invalid_type", `Invalid input: expected array, received ${received(value)}`)
    }
    const issues: ShapeIssue[] = []
    const out: T[] = []
    for (let index = 0; index < value.length; index += 1) {
      const outcome = element.run(value[index], [...path, index])
      if (outcome.ok) out.push(outcome.value)
      else issues.push(...outcome.issues)
    }
    return issues.length > 0 ? { ok: false, issues } : held(out)
  })
}

type TupleOut<M extends readonly Shape<unknown>[]> = { -readonly [K in keyof M]: Infer<M[K]> }

export function tuple<const M extends readonly Shape<unknown>[]>(items: M): Shape<TupleOut<M>> {
  return Shape((value, path) => {
    if (!Array.isArray(value)) {
      return refused(path, "invalid_type", `Invalid input: expected tuple, received ${received(value)}`)
    }
    if (value.length < items.length) {
      return refused(path, "too_small", `Too small: expected array to have >=${items.length} items`)
    }
    if (value.length > items.length) {
      return refused(path, "too_big", `Too big: expected array to have <=${items.length} items`)
    }
    const issues: ShapeIssue[] = []
    const out: unknown[] = []
    for (let index = 0; index < items.length; index += 1) {
      const outcome = (items[index] as Shape<unknown>).run(value[index], [...path, index])
      if (outcome.ok) out.push(outcome.value)
      else issues.push(...outcome.issues)
    }
    return issues.length > 0 ? { ok: false, issues } : held(out as TupleOut<M>)
  })
}

export function record<V>(keys: Shape<string>, values: Shape<V>): Shape<Record<string, V>> {
  return Shape((value, path) => {
    if (!isObjectLike(value)) {
      return refused(path, "invalid_type", `Invalid input: expected record, received ${received(value)}`)
    }
    const issues: ShapeIssue[] = []
    const out: Record<string, V> = {}
    for (const name of Object.keys(value)) {
      if (name === "__proto__") continue
      const key = keys.run(name, [...path, name])
      if (!key.ok) {
        issues.push(...key.issues)
        continue
      }
      const outcome = values.run(value[name], [...path, name])
      if (outcome.ok) out[name] = outcome.value
      else issues.push(...outcome.issues)
    }
    return issues.length > 0 ? { ok: false, issues } : held(out)
  })
}

export function union<const M extends readonly Shape<unknown>[]>(members: M): Shape<Infer<M[number]>> {
  return Shape((value, path) => {
    for (const member of members) {
      const outcome = member.run(value, path)
      if (outcome.ok) return held(outcome.value as Infer<M[number]>)
    }
    return refused(path, "invalid_union", "Invalid input")
  })
}

type Tagged = Shape<unknown> & { readonly fields: Fields }

function literalIn(marker: Shape<unknown> | undefined): LiteralShape<string> | undefined {
  if (marker === undefined) return undefined
  if (!("value" in marker) || typeof marker.value !== "string") return undefined
  return marker as LiteralShape<string>
}

export function discriminatedUnion<const M extends readonly Tagged[]>(
  key: string,
  members: M
): Shape<Infer<M[number]>> {
  const byTag = new Map<string, Shape<unknown>>()
  for (const member of members) {
    const marker = literalIn(member.fields[key])
    if (marker === undefined) {
      throw new Error(`shape.discriminatedUnion: a member declares no literal \`${key}\` to sort it by`)
    }
    byTag.set(marker.value, member)
  }
  const expected = [...byTag.keys()].map((tag) => `'${tag}'`).join(" | ")

  return Shape((value, path) => {
    if (!isObjectLike(value)) {
      return refused(path, "invalid_type", `Invalid input: expected object, received ${received(value)}`)
    }
    const tag = value[key]
    const member = typeof tag === "string" ? byTag.get(tag) : undefined
    if (member === undefined) {
      return refused([...path, key], "invalid_union", `Invalid discriminator value. Expected ${expected}`)
    }
    return member.run(value, path) as Outcome<Infer<M[number]>>
  })
}

export const object = <F extends Fields>(fields: F): ObjectShape<F, Struct<F>> =>
  ObjectShape<F, Struct<F>>(fields, "strip")

export const looseObject = <F extends Fields>(fields: F): ObjectShape<F, LooseStruct<F>> =>
  ObjectShape<F, LooseStruct<F>>(fields, "loose")
