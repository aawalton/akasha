import { describe, expect, test } from "bun:test"
import { selectAccount } from "../lib/oauth-selection.ts"
import type { AccountState } from "../lib/oauth-types.ts"

const NOW = Date.UTC(2026, 4, 1)

const isoAt = (offsetHours: number): string => new Date(NOW + offsetHours * 3_600_000).toISOString()

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

describe("selectAccount — eligibility tier (soonest 7-day reset)", () => {
  test("returns null on empty input", () => {
    expect(selectAccount([], NOW)).toBeNull()
  })

  test("soonest reset wins (smallest hoursUntilSevenDayReset)", () => {
    const a = state({ account: "a", sevenDayUtil: 0, sevenDayResetsAt: isoAt(168) })
    const b = state({ account: "b", sevenDayUtil: 0, sevenDayResetsAt: isoAt(50) })
    expect(selectAccount([a, b], NOW)?.account).toBe("b")
  })

  test("soonest reset wins even when nearly-exhausted (strict greedy on deadline)", () => {
    const exhausted = state({ account: "exhausted", sevenDayUtil: 95, sevenDayResetsAt: isoAt(10) })
    const fresh = state({ account: "fresh", sevenDayUtil: 0, sevenDayResetsAt: isoAt(72) })
    expect(selectAccount([exhausted, fresh], NOW)?.account).toBe("exhausted")
  })

  test("excludes accounts at 100% on either dimension", () => {
    const exhausted5h = state({
      account: "exhausted5h",
      fiveHourUtil: 100,
      sevenDayResetsAt: isoAt(50),
    })
    const exhausted7d = state({
      account: "exhausted7d",
      sevenDayUtil: 100,
      sevenDayResetsAt: isoAt(50),
    })
    const ok = state({ account: "ok", sevenDayResetsAt: isoAt(168) })
    expect(selectAccount([exhausted5h, exhausted7d, ok], NOW)?.account).toBe("ok")
  })

  test("NULL sevenDayResetsAt treated as HOURS_FALLBACK (144h)", () => {
    const nullReset = state({ account: "nullReset", sevenDayResetsAt: null, sevenDayUtil: 0 })
    const dated = state({ account: "dated", sevenDayResetsAt: isoAt(50), sevenDayUtil: 0 })
    expect(selectAccount([nullReset, dated], NOW)?.account).toBe("dated")
  })

  test("invalid date string treated as HOURS_FALLBACK (same as NULL)", () => {
    const broken = state({
      account: "broken",
      sevenDayResetsAt: "not-a-date",
      sevenDayUtil: 0,
    })
    const dated = state({ account: "dated", sevenDayResetsAt: isoAt(50), sevenDayUtil: 0 })
    expect(selectAccount([dated, broken], NOW)?.account).toBe("dated")
  })

  test("a past (stale/just-passed) reset is treated as far-out, NOT soonest", () => {
    const stale = state({ account: "stale", sevenDayResetsAt: isoAt(-10), sevenDayUtil: 50 })
    const soon = state({ account: "soon", sevenDayResetsAt: isoAt(50), sevenDayUtil: 50 })
    expect(selectAccount([stale, soon], NOW)?.account).toBe("soon")
  })

  test("a just-passed reset does not out-rank a genuinely-sooner future reset (bug #14746)", () => {
    const aawalton = state({
      account: "aawalton",
      sevenDayUtil: 80,
      sevenDayResetsAt: isoAt(-0.1667),
    })
    const amywalton = state({
      account: "amywalton",
      sevenDayUtil: 55,
      sevenDayResetsAt: isoAt(90),
    })
    expect(selectAccount([aawalton, amywalton], NOW)?.account).toBe("amywalton")
  })

  test("tiebreak on equal hoursUntilSevenDayReset: lower sevenDayUtil wins", () => {
    const a = state({ account: "a", sevenDayUtil: 50, sevenDayResetsAt: isoAt(50) })
    const b = state({ account: "b", sevenDayUtil: 20, sevenDayResetsAt: isoAt(50) })
    expect(selectAccount([a, b], NOW)?.account).toBe("b")
  })

  test("tiebreak on equal reset and equal 7d util: lower fiveHourUtil wins", () => {
    const high = state({ account: "high", fiveHourUtil: 80 })
    const low = state({ account: "low", fiveHourUtil: 20 })
    expect(selectAccount([high, low], NOW)?.account).toBe("low")
  })

  test("tiebreak on all-equal numerics: lex-smaller account name wins", () => {
    const z = state({ account: "z" })
    const a = state({ account: "a" })
    expect(selectAccount([z, a], NOW)?.account).toBe("a")
  })

  test("returns null when no account is eligible (every account at-cap)", () => {
    const a = state({ account: "a", fiveHourUtil: 100, sevenDayUtil: 50 })
    const b = state({ account: "b", fiveHourUtil: 50, sevenDayUtil: 100 })
    const c = state({ account: "c", fiveHourUtil: 100, sevenDayUtil: 100 })
    expect(selectAccount([a, b, c], NOW)).toBeNull()
  })
})

describe("selectAccount — natural stability", () => {
  test("soonest-reset account stays selected as its util climbs below the cap", () => {
    const far = state({ account: "far", sevenDayUtil: 0, sevenDayResetsAt: isoAt(120) })
    for (const util of [10, 30, 50, 70, 90, 99]) {
      const near = state({
        account: "near",
        fiveHourUtil: util,
        sevenDayUtil: 0,
        sevenDayResetsAt: isoAt(40),
      })
      expect(selectAccount([near, far], NOW)?.account).toBe("near")
    }
  })

  test("selection switches off the soonest-reset account only when it exhausts", () => {
    const far = state({ account: "far", sevenDayUtil: 0, sevenDayResetsAt: isoAt(120) })
    const nearExhausted = state({
      account: "near",
      fiveHourUtil: 100,
      sevenDayUtil: 0,
      sevenDayResetsAt: isoAt(40),
    })
    expect(selectAccount([nearExhausted, far], NOW)?.account).toBe("far")
  })

  test("selection follows weekly-window rollover to the new soonest reset", () => {
    const before = [
      state({ account: "a", sevenDayUtil: 0, sevenDayResetsAt: isoAt(30) }),
      state({ account: "b", sevenDayUtil: 0, sevenDayResetsAt: isoAt(60) }),
    ]
    expect(selectAccount(before, NOW)?.account).toBe("a")

    const afterRollover = [
      state({ account: "a", sevenDayUtil: 0, sevenDayResetsAt: isoAt(30 + 168) }),
      state({ account: "b", sevenDayUtil: 0, sevenDayResetsAt: isoAt(60) }),
    ]
    expect(selectAccount(afterRollover, NOW)?.account).toBe("b")
  })
})
