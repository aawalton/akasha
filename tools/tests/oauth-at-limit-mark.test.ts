
import { beforeEach, describe, expect, test } from "bun:test"

import { applyAtLimitMark } from "../lib/oauth-at-limit-mark.ts"
import { RETRY_AFTER_KEY } from "../lib/oauth-page-state.ts"
import type { PageMark } from "../lib/oauth-page-mark.ts"
import {
  DEFAULT_AT_LIMIT_BACKOFF_MS,
  MAX_AT_LIMIT_BACKOFF_MS,
} from "../lib/oauth-at-limit-expiry.ts"

type MarkCall = { account: string; marks: Record<string, string | null> }

let markCalls: MarkCall[] = []
let markAnswers: PageMark | "throws" = { kind: "unchanged", account: "acct" }

const holdMark = (account: string, marks: Record<string, string | null>): PageMark => {
  markCalls.push({ account, marks })
  if (markAnswers === "throws") throw new Error("page write failed")
  return markAnswers
}

const mark = (args: { account: string; retryAfterHeader: string | null; logPrefix?: string }) =>
  applyAtLimitMark(args, { holdMark })

beforeEach(() => {
  markCalls = []
  markAnswers = { kind: "unchanged", account: "acct" }
})

const heldMarkMs = (call: MarkCall | undefined): number => {
  const v = call?.marks[RETRY_AFTER_KEY]
  if (typeof v !== "string") throw new Error(`expected a string retry-after, got ${typeof v}`)
  return Date.parse(v)
}

describe("markAccountAtLimit — the page carries the self-expiring mark", () => {
  test("holds retry-after under the key the page reader looks for", async () => {
    const before = Date.now()
    await mark({ account: "acct", retryAfterHeader: "120" })
    const after = Date.now()

    expect(markCalls).toHaveLength(1)
    expect(markCalls[0]?.account).toBe("acct")

    const markMs = heldMarkMs(markCalls[0])
    expect(markMs).toBeGreaterThanOrEqual(before + 120_000)
    expect(markMs).toBeLessThanOrEqual(after + 120_000)
  })

  test("holds nothing but the one mark, so a page keeps whatever else it states", async () => {
    await mark({ account: "acct", retryAfterHeader: null })
    expect(Object.keys(markCalls[0]?.marks ?? {})).toEqual([RETRY_AFTER_KEY])
  })

  test("a weekly-scale retry-after is CLAMPED in the held mark — never a window instant in the 5h key (#15715)", async () => {
    const before = Date.now()
    await mark({ account: "acct", retryAfterHeader: String(3 * 86_400) })
    const after = Date.now()

    const markMs = heldMarkMs(markCalls[0])
    expect(markMs).toBeGreaterThanOrEqual(before + MAX_AT_LIMIT_BACKOFF_MS)
    expect(markMs).toBeLessThanOrEqual(after + MAX_AT_LIMIT_BACKOFF_MS)
  })

  test("no retry-after → short bounded backoff (no window-reset latch)", async () => {
    const before = Date.now()
    await mark({ account: "acct", retryAfterHeader: null })
    const after = Date.now()

    const markMs = heldMarkMs(markCalls[0])
    expect(markMs).toBeGreaterThanOrEqual(before + DEFAULT_AT_LIMIT_BACKOFF_MS)
    expect(markMs).toBeLessThanOrEqual(after + DEFAULT_AT_LIMIT_BACKOFF_MS)
  })
})

describe("markAccountAtLimit — best-effort", () => {
  test("swallows a refused page mark and never throws", async () => {
    markAnswers = { kind: "refused", account: "acct", why: "names no page" }
    await expect(mark({ account: "acct", retryAfterHeader: null })).resolves.toBeUndefined()
    expect(markCalls).toHaveLength(1)
  })

  test("swallows a page writer that threw and never throws", async () => {
    markAnswers = "throws"
    await expect(mark({ account: "acct", retryAfterHeader: null })).resolves.toBeUndefined()
    expect(markCalls).toHaveLength(1)
  })
})
