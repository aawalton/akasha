export type PageAccessClient = unknown

export type Json = string | number | boolean | null | readonly Json[] | { readonly [k: string]: Json }

export interface Page {
  readonly id: string
  readonly seq: number
  readonly [key: string]: unknown
}

export type PageCondition =
  | { readonly key: string; readonly eq: Json }
  | { readonly key: string; readonly neq: Json }
  | { readonly key: string; readonly lt: Json }
  | { readonly key: string; readonly gt: Json }
  | { readonly key: string; readonly lte: Json }
  | { readonly key: string; readonly gte: Json }
  | { readonly key: string; readonly isNull: true }
  | { readonly key: string; readonly in: readonly Json[] }
  | { readonly key: string; readonly notIn: readonly Json[] }
  | { readonly key: string; readonly contains: string }
  | { readonly key: string; readonly notContains: string }
  | { readonly key: string; readonly includes: Json }
  | { readonly key: string; readonly isEmpty: true }
  | { readonly key: string; readonly isNotEmpty: true }
  | { readonly or: readonly PageCondition[] }

export type PageWhere = readonly PageCondition[]

export type PageCursor = string

export interface GetPagesResult {
  readonly rows: readonly Page[]
  readonly nextCursor: PageCursor | null
  readonly count: number | null
}

export type WriteOutcome = "patched" | "created"

export type ReadonlyJSONValue =
  | string
  | number
  | boolean
  | null
  | readonly ReadonlyJSONValue[]
  | { readonly [key: string]: ReadonlyJSONValue }

export interface PropertyDefinition {
  readonly id: string
  readonly slug: string
  readonly kind?: string
  readonly [key: string]: unknown
}

export interface QueryRow {
  readonly values: Record<string, unknown>
}

export type Asked =
  | {
      readonly ok: true
      readonly answer: { readonly n: number; readonly rows: readonly QueryRow[] }
    }
  | { readonly ok: false; readonly why: string }

export type Written = { readonly ok: true } | { readonly ok: false; readonly why: string }

export interface ComposedQuery {
  readonly "page-type": string
  readonly where?: Record<string, unknown>
  readonly keys?: readonly string[]
  readonly limit?: number
  readonly [key: string]: unknown
}

export interface PageEntitySurfaceConfig {
  readonly slug: string
  readonly columns: readonly string[]
}

export interface SessionPage {
  readonly day: string
  readonly title: string | null
  readonly startTime: string | null
  readonly endTime: string | null
  readonly safetyLevel: number | null
  readonly difficultyLevel: number | null
  readonly capacityRate: number | null
}

export interface WakeWindow {
  readonly from: number
  readonly to: number
}

export interface DayWindow {
  readonly start: Date
  readonly end: Date
}

export type DailyTierColor = string

export type DailyTierLadder = readonly unknown[]

export type InboxKey = string

export interface VolumeSetInput {
  readonly [key: string]: unknown
}
