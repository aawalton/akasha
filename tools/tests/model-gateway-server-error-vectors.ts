import type { ServerErrorClassification } from "../lib/model-gateway/server-error.ts"

export interface ServerErrorModule {
  readonly OVERLOADED_ERROR_TYPE: string
  readonly OVERLOADED_STATUS: number
  readonly SERVER_ERROR_BACKOFF_MS: readonly number[]
  readonly MAX_RETRY_AFTER_MS: number
  readonly isServerError: (status: number, body: string) => boolean
  readonly classifyServerError: (status: number, body: string) => ServerErrorClassification
  readonly serverErrorBackoffMs: (args: {
    retryAfterHeader: string | null
    attempt: number
    schedule: readonly number[]
  }) => number
}

export interface Classified {
  readonly id: string
  readonly status: number
  readonly body: string
}

export interface Backoff {
  readonly id: string
  readonly retryAfterHeader: string | null
  readonly attempt: number
  readonly schedule: readonly number[]
}

const OVERLOADED_429 = JSON.stringify({
  type: "error",
  error: { type: "overloaded_error", message: "Overloaded" },
  request_id: "req_over123",
})

const RATE_LIMIT_429 = JSON.stringify({
  type: "error",
  error: { type: "rate_limit_error", message: "usage limit reached" },
})

const OVERLOADED_529 = JSON.stringify({
  type: "error",
  error: { type: "overloaded_error", message: "Overloaded" },
})

const API_ERROR_500 = JSON.stringify({
  type: "error",
  error: { type: "api_error", message: "Internal server error" },
})

export const CARRIED = {
  OVERLOADED_429,
  RATE_LIMIT_429,
  OVERLOADED_529,
  API_ERROR_500,
} as const

const BODIES: readonly (readonly [string, string])[] = [
  ["overloaded-envelope", OVERLOADED_429],
  ["rate-limit-envelope", RATE_LIMIT_429],
  ["overloaded-529-envelope", OVERLOADED_529],
  ["api-error-envelope", API_ERROR_500],
  ["overloaded-no-message", '{"type":"error","error":{"type":"overloaded_error"}}'],
  ["overloaded-empty-message", '{"type":"error","error":{"type":"overloaded_error","message":""}}'],
  ["overloaded-null-message", '{"type":"error","error":{"type":"overloaded_error","message":null}}'],
  ["overloaded-uppercase-type", '{"type":"error","error":{"type":"OVERLOADED_ERROR"}}'],
  ["envelope-type-missing", '{"error":{"type":"overloaded_error","message":"m"}}'],
  ["envelope-type-wrong", '{"type":"message","error":{"type":"overloaded_error"}}'],
  ["error-type-empty", '{"type":"error","error":{"type":""}}'],
  ["error-null", '{"type":"error","error":null}'],
  ["error-missing", '{"type":"error"}'],
  ["html", "<html>429 Overloaded</html>"],
  ["empty", ""],
  ["whitespace", "   "],
  ["json-null", "null"],
  ["json-array", "[1,2,3]"],
  ["json-number", "529"],
  ["truncated", '{"type":"error","error":{"type":"overloaded_error"'],
  ["gateway-timeout-page", "gateway timeout page"],
  ["extra-keys-loose", '{"type":"error","error":{"type":"overloaded_error","message":"m","code":9},"extra":[1]}'],
]

const STATUSES: readonly number[] = [
  200, 403, 404, 429, 500, 501, 502, 503, 504, 528, 529, 530, 0, -529,
]

export function classified(): readonly Classified[] {
  const out: Classified[] = []
  for (const status of STATUSES) {
    for (const [name, body] of BODIES) {
      out.push({ id: `${status}/${name}`, status, body })
    }
  }
  return out
}

const HEADERS: readonly (readonly [string, string | null])[] = [
  ["absent", null],
  ["empty", ""],
  ["spaces", "   "],
  ["zero", "0"],
  ["negative", "-5"],
  ["one", "1"],
  ["two", "2"],
  ["eight", "8"],
  ["nine", "9"],
  ["six-hundred", "600"],
  ["fractional", "0.5"],
  ["padded", " 3 "],
  ["exponent", "1e3"],
  ["plus-signed", "+4"],
  ["hex", "0x10"],
  ["trailing-letters", "3abc"],
  ["http-date", "Wed, 21 Oct 2026 07:28:00 GMT"],
  ["nan-word", "NaN"],
  ["infinity-word", "Infinity"],
]

const SCHEDULES: readonly (readonly [string, readonly number[]])[] = [
  ["default", [1000, 2000, 4000]],
  ["empty", []],
  ["single", [500]],
  ["ascending", [1, 2, 3]],
]

const ATTEMPTS: readonly number[] = [-1, 0, 1, 2, 3, 99]

export function backoffs(): readonly Backoff[] {
  const out: Backoff[] = []
  for (const [scheduleName, schedule] of SCHEDULES) {
    for (const attempt of ATTEMPTS) {
      for (const [headerName, retryAfterHeader] of HEADERS) {
        out.push({
          id: `${scheduleName}/attempt-${attempt}/${headerName}`,
          retryAfterHeader,
          attempt,
          schedule,
        })
      }
    }
  }
  return out
}

export function rows(mod: ServerErrorModule): readonly unknown[] {
  const out: unknown[] = []
  out.push({
    kind: "constants",
    OVERLOADED_ERROR_TYPE: mod.OVERLOADED_ERROR_TYPE,
    OVERLOADED_STATUS: mod.OVERLOADED_STATUS,
    SERVER_ERROR_BACKOFF_MS: [...mod.SERVER_ERROR_BACKOFF_MS],
    MAX_RETRY_AFTER_MS: mod.MAX_RETRY_AFTER_MS,
  })
  for (const vector of classified()) {
    let answer: unknown = "NOT-SET"
    let matched: unknown = "NOT-SET"
    let threw: string | null = null
    try {
      answer = mod.classifyServerError(vector.status, vector.body)
      matched = mod.isServerError(vector.status, vector.body)
    } catch (error) {
      threw = error instanceof Error ? `${error.name}: ${error.message}` : String(error)
    }
    out.push({
      kind: "classify",
      id: vector.id,
      answer,
      keys: typeof answer === "object" && answer !== null ? Object.keys(answer).sort() : [],
      matched,
      threw,
    })
  }
  for (const vector of backoffs()) {
    let answer: unknown = "NOT-SET"
    let threw: string | null = null
    try {
      answer = mod.serverErrorBackoffMs({
        retryAfterHeader: vector.retryAfterHeader,
        attempt: vector.attempt,
        schedule: vector.schedule,
      })
    } catch (error) {
      threw = error instanceof Error ? `${error.name}: ${error.message}` : String(error)
    }
    out.push({ kind: "backoff", id: vector.id, answer, answerKind: typeof answer, threw })
  }
  return out
}
