import { describe, expect, test } from "bun:test"
import {
  explainAccountEligibility,
  formatPoolEligibilityBreakdown,
  type IneligibilityReason,
  isAccountEligible,
} from "../lib/oauth-selection.ts"
import type { AccountState } from "../lib/oauth-types.ts"

const NOW = 1_000_000

function eligibleState(overrides: Partial<AccountState> = {}): AccountState {
  return {
    account: "acct",
    fiveHourUtil: 10,
    sevenDayUtil: 10,
    sevenDayResetsAt: null,
    fiveHourResetsAt: null,
    subscriptionType: "max",
    subscriptionDisabled: false,
    fiveHourAtLimitUntil: null,
    renewalTerminal: false,
    accessTokenExpiresAt: null,
    ...overrides,
  }
}

describe("explainAccountEligibility", () => {
  test("fully-eligible account → eligible, no reasons", () => {
    const r = explainAccountEligibility(eligibleState(), NOW)
    expect(r.eligible).toBe(true)
    expect(r.reasons).toEqual([])
  })

  test("fiveHourUtil >= 100 → five-hour-maxed", () => {
    const r = explainAccountEligibility(eligibleState({ fiveHourUtil: 100 }), NOW)
    expect(r.reasons).toEqual(["five-hour-maxed"])
  })

  test("sevenDayUtil >= 100 → seven-day-maxed", () => {
    const r = explainAccountEligibility(eligibleState({ sevenDayUtil: 100 }), NOW)
    expect(r.reasons).toEqual(["seven-day-maxed"])
  })

  test("both reasons at once come out in fixed order", () => {
    const state = eligibleState({ fiveHourUtil: 100, sevenDayUtil: 100 })
    const expected: IneligibilityReason[] = ["five-hour-maxed", "seven-day-maxed"]
    expect(explainAccountEligibility(state, NOW).reasons).toEqual(expected)
  })

  test("isAccountEligible is exactly reasons.length === 0", () => {
    const states: AccountState[] = [
      eligibleState(),
      eligibleState({ fiveHourUtil: 100 }),
      eligibleState({ sevenDayUtil: 100 }),
    ]
    for (const s of states) {
      const explain = explainAccountEligibility(s, NOW)
      expect(isAccountEligible(s, NOW)).toBe(explain.reasons.length === 0)
    }
  })
})

const BREAKDOWN_NOW = Date.UTC(2026, 4, 1)
const isoAt = (offsetHours: number): string =>
  new Date(BREAKDOWN_NOW + offsetHours * 3_600_000).toISOString()

function state(overrides: Partial<AccountState> & { account: string }): AccountState {
  return {
    fiveHourUtil: 50,
    sevenDayUtil: 50,
    sevenDayResetsAt: isoAt(168),
    fiveHourResetsAt: isoAt(2),
    subscriptionDisabled: false,
    fiveHourAtLimitUntil: null,
    subscriptionType: "max",
    renewalTerminal: false,
    accessTokenExpiresAt: null,
    ...overrides,
  }
}

describe("formatPoolEligibilityBreakdown", () => {
  test("empty input renders the empty string", () => {
    expect(formatPoolEligibilityBreakdown([], BREAKDOWN_NOW)).toBe("")
  })

  test("an ineligible account renders its joined reasons in constraint order", () => {
    const blocked = state({ account: "bob", fiveHourUtil: 100, sevenDayUtil: 100 })
    expect(formatPoolEligibilityBreakdown([blocked], BREAKDOWN_NOW)).toBe(
      "bob=five-hour-maxed,seven-day-maxed"
    )
  })

  test("multiple accounts are space-joined in input order", () => {
    const out = formatPoolEligibilityBreakdown(
      [
        state({ account: "alice" }),
        state({ account: "bob", fiveHourUtil: 100 }),
        state({ account: "carol", sevenDayUtil: 100 }),
      ],
      BREAKDOWN_NOW
    )
    expect(out).toBe("alice=eligible bob=five-hour-maxed carol=seven-day-maxed")
  })
})
