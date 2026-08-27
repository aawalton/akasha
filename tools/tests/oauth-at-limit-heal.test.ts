
import { describe, expect, test } from "bun:test"
import { MAX_AT_LIMIT_BACKOFF_MS } from "../lib/oauth-at-limit-expiry.ts"
import { AT_LIMIT_HEAL_THRESHOLD_MS, selectStaleAtLimitMarks } from "../lib/oauth-at-limit-heal.ts"
import type { AccountState } from "../lib/oauth-types.ts"

const NOW = Date.UTC(2026, 4, 1)

function state(
  account: string,
  marks: { fiveHour?: number | null } = {}
): AccountState {
  return {
    account,
    fiveHourUtil: 0,
    sevenDayUtil: 0,
    sevenDayResetsAt: null,
    fiveHourResetsAt: null,
    subscriptionType: "max",
    subscriptionDisabled: false,
    fiveHourAtLimitUntil: marks.fiveHour ?? null,
    renewalTerminal: false,
    accessTokenExpiresAt: null,
  }
}

describe("selectStaleAtLimitMarks — account-wide mark", () => {
  test("selects a fiveHour mark latched beyond the 5h scale (7d-reset artifact)", () => {
    const states = [state("amywalton", { fiveHour: NOW + 6 * 86_400_000 })]
    expect(selectStaleAtLimitMarks(states, NOW)).toEqual([
      { account: "amywalton", fiveHour: true },
    ])
  })

  test("keeps a legitimate fiveHour mark within the 5h scale", () => {
    const states = [
      state("a", { fiveHour: NOW + 5_000 }),
      state("b", { fiveHour: NOW + 3 * 3_600_000 }),
    ]
    expect(selectStaleAtLimitMarks(states, NOW)).toEqual([])
  })

  test("a mark exactly at now + 5h is the boundary and is NOT stale", () => {
    const states = [state("edge", { fiveHour: NOW + AT_LIMIT_HEAL_THRESHOLD_MS })]
    expect(selectStaleAtLimitMarks(states, NOW)).toEqual([])
  })
})

describe("selectStaleAtLimitMarks — pool behavior", () => {
  test("ignores accounts with no live marks", () => {
    expect(selectStaleAtLimitMarks([state("clean")], NOW)).toEqual([])
  })

  test("returns only the stale accounts from a mixed pool", () => {
    const states = [
      state("clean"),
      state("fresh", { fiveHour: NOW + 4 * 3_600_000 }),
      state("stale1", { fiveHour: NOW + 7 * 86_400_000 }),
    ]
    expect(selectStaleAtLimitMarks(states, NOW)).toEqual([
      { account: "stale1", fiveHour: true },
    ])
  })
})

describe("selectStaleAtLimitMarks — the setter's ceiling and this threshold are one constant", () => {
  test("AT_LIMIT_HEAL_THRESHOLD_MS IS MAX_AT_LIMIT_BACKOFF_MS (restored, see this file's header)", () => {
    expect(MAX_AT_LIMIT_BACKOFF_MS).toBe(AT_LIMIT_HEAL_THRESHOLD_MS)
  })
})
