
export type ShapePath = readonly (string | number)[]

export type ShapeIssue = {
  readonly code: string
  readonly path: ShapePath
  readonly message: string
}

export class ShapeError extends Error {
  readonly issues: readonly ShapeIssue[]

  constructor(issues: readonly ShapeIssue[]) {
    super(JSON.stringify(issues, null, 2))
    this.name = "ShapeError"
    this.issues = issues
  }
}

export type ShapeResult<T> =
  | { readonly success: true; readonly data: T }
  | { readonly success: false; readonly error: ShapeError }

export type Outcome<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly issues: readonly ShapeIssue[] }

export const held = <T>(value: T): Outcome<T> => ({ ok: true, value })

export const refused = (path: ShapePath, code: string, message: string): Outcome<never> => ({
  ok: false,
  issues: [{ code, path, message }],
})

export function received(value: unknown): string {
  if (value === null) return "null"
  if (Array.isArray(value)) return "array"
  if (typeof value === "number" && Number.isNaN(value)) return "NaN"
  return typeof value
}

export const isObjectLike = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value)

export function assign(target: Record<string, unknown>, key: string, value: unknown): void {
  if (key === "__proto__") return
  target[key] = value
}

type Runs<T> = (value: unknown, path: ShapePath) => Outcome<T>

export type Shape<T> = {
  readonly run: Runs<T>
  readonly acceptsAbsent: boolean
  parse(value: unknown): T
  safeParse(value: unknown): ShapeResult<T>
  optional(): Shape<T | undefined>
  nullable(): Shape<T | null>
  default(fallback: T): Shape<T>
  catch(fallback: T): Shape<T>
  refine(holds: (value: T) => boolean, options: { readonly message: string }): Shape<T>
  transform<U>(change: (value: T) => U): Shape<U>
  pipe<U>(next: Shape<U>): Shape<U>
}

export function Shape<T>(run: Runs<T>, acceptsAbsent = false): Shape<T> {
  return {
    run,
    acceptsAbsent,
    parse(value) {
      const outcome = run(value, [])
      if (outcome.ok) return outcome.value
      throw new ShapeError(outcome.issues)
    },
    safeParse(value) {
      const outcome = run(value, [])
      return outcome.ok
        ? { success: true, data: outcome.value }
        : { success: false, error: new ShapeError(outcome.issues) }
    },
    optional() {
      return Shape<T | undefined>(
        (value, path) => (value === undefined ? held(undefined) : run(value, path)),
        true
      )
    },
    nullable() {
      return Shape<T | null>(
        (value, path) => (value === null ? held(null) : run(value, path)),
        acceptsAbsent
      )
    },
    default(fallback) {
      return Shape(
        (value, path) => (value === undefined ? held(fallback) : run(value, path)),
        true
      )
    },
    catch(fallback) {
      return Shape((value, path) => {
        const outcome = run(value, path)
        return outcome.ok ? outcome : held(fallback)
      }, true)
    },
    refine(holds, options) {
      return Shape((value, path) => {
        const outcome = run(value, path)
        if (!outcome.ok) return outcome
        return holds(outcome.value) ? outcome : refused(path, "custom", options.message)
      }, acceptsAbsent)
    },
    transform<U>(change: (value: T) => U) {
      return Shape<U>((value, path) => {
        const outcome = run(value, path)
        return outcome.ok ? held(change(outcome.value)) : outcome
      }, acceptsAbsent)
    },
    pipe<U>(next: Shape<U>) {
      return Shape<U>((value, path) => {
        const outcome = run(value, path)
        return outcome.ok ? next.run(outcome.value, path) : outcome
      }, acceptsAbsent)
    },
  }
}

export type Infer<S> = S extends Shape<infer T> ? T : never
