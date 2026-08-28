
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

export class Shape<T> {
  readonly run: (value: unknown, path: ShapePath) => Outcome<T>
  readonly acceptsAbsent: boolean

  constructor(
    run: (value: unknown, path: ShapePath) => Outcome<T>,
    acceptsAbsent = false
  ) {
    this.run = run
    this.acceptsAbsent = acceptsAbsent
  }

  parse(value: unknown): T {
    const outcome = this.run(value, [])
    if (outcome.ok) return outcome.value
    throw new ShapeError(outcome.issues)
  }

  safeParse(value: unknown): ShapeResult<T> {
    const outcome = this.run(value, [])
    return outcome.ok
      ? { success: true, data: outcome.value }
      : { success: false, error: new ShapeError(outcome.issues) }
  }

  optional(): Shape<T | undefined> {
    return new Shape<T | undefined>(
      (value, path) => (value === undefined ? held(undefined) : this.run(value, path)),
      true
    )
  }

  nullable(): Shape<T | null> {
    return new Shape<T | null>(
      (value, path) => (value === null ? held(null) : this.run(value, path)),
      this.acceptsAbsent
    )
  }

  default(fallback: T): Shape<T> {
    return new Shape(
      (value, path) => (value === undefined ? held(fallback) : this.run(value, path)),
      true
    )
  }

  catch(fallback: T): Shape<T> {
    return new Shape((value, path) => {
      const outcome = this.run(value, path)
      return outcome.ok ? outcome : held(fallback)
    }, true)
  }

  refine(holds: (value: T) => boolean, options: { readonly message: string }): Shape<T> {
    return new Shape((value, path) => {
      const outcome = this.run(value, path)
      if (!outcome.ok) return outcome
      return holds(outcome.value) ? outcome : refused(path, "custom", options.message)
    }, this.acceptsAbsent)
  }

  transform<U>(change: (value: T) => U): Shape<U> {
    return new Shape((value, path) => {
      const outcome = this.run(value, path)
      return outcome.ok ? held(change(outcome.value)) : outcome
    }, this.acceptsAbsent)
  }

  pipe<U>(next: Shape<U>): Shape<U> {
    return new Shape((value, path) => {
      const outcome = this.run(value, path)
      return outcome.ok ? next.run(outcome.value, path) : outcome
    }, this.acceptsAbsent)
  }
}

export type Infer<S> = S extends Shape<infer T> ? T : never
