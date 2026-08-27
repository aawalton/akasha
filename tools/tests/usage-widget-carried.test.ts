
import { describe, expect, it } from "bun:test"
import type { AccountState } from "../lib/oauth-types.ts"
import { deriveUsageWidgetPayload } from "../lib/usage-widget.ts"

const NOW = Date.parse("2026-07-13T12:00:00.000Z")
const HOUR_MS = 3_600_000

function at(hours: number): string {
  return new Date(NOW + hours * HOUR_MS).toISOString()
}

function account(overrides: Partial<AccountState> = {}): AccountState {
  return {
    account: "acct",
    fiveHourUtil: 0,
    sevenDayUtil: 0,
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

describe("deriveUsageWidgetPayload — avgUsedPct", () => {
  it("is the rounded pool-wide mean of sevenDayUtil", () => {
    const out = deriveUsageWidgetPayload(
      [account({ sevenDayUtil: 50 }), account({ sevenDayUtil: 51 })],
      NOW
    )
    expect(out.avgUsedPct).toBe(51)
  })

  it("ignores non-finite utilizations when averaging", () => {
    const out = deriveUsageWidgetPayload(
      [
        account({ sevenDayUtil: 40 }),
        account({ sevenDayUtil: Number.NaN }),
        account({ sevenDayUtil: 60 }),
      ],
      NOW
    )
    expect(out.avgUsedPct).toBe(50)
  })

  it("is 0 for an empty pool", () => {
    expect(deriveUsageWidgetPayload([], NOW)).toEqual({
      avgUsedPct: 0,
      fiveHourBackAt: null,
      sevenDayBackAt: null,
      sevenDayEndsAt: null,
      tier: "blue",
    })
  })
})

describe("deriveUsageWidgetPayload — fiveHourBackAt", () => {
  it("is the soonest upcoming five-hour reset among five-hour-maxed accounts", () => {
    const out = deriveUsageWidgetPayload(
      [
        account({ fiveHourUtil: 100, fiveHourResetsAt: at(4) }),
        account({ fiveHourUtil: 100, fiveHourResetsAt: at(2) }),
      ],
      NOW
    )
    expect(out.fiveHourBackAt).toBe(Date.parse(at(2)))
  })

  it("excludes a five-hour-maxed account that is ALSO weekly-dead", () => {
    const out = deriveUsageWidgetPayload(
      [account({ fiveHourUtil: 100, sevenDayUtil: 100, fiveHourResetsAt: at(2) })],
      NOW
    )
    expect(out.fiveHourBackAt).toBeNull()
  })

  it("ignores an account with five-hour headroom", () => {
    const out = deriveUsageWidgetPayload(
      [account({ fiveHourUtil: 99, fiveHourResetsAt: at(2) })],
      NOW
    )
    expect(out.fiveHourBackAt).toBeNull()
  })

  it("skips a five-hour reset already in the past", () => {
    const out = deriveUsageWidgetPayload(
      [
        account({ fiveHourUtil: 100, fiveHourResetsAt: at(-1) }),
        account({ fiveHourUtil: 100, fiveHourResetsAt: at(3) }),
      ],
      NOW
    )
    expect(out.fiveHourBackAt).toBe(Date.parse(at(3)))
  })

  it("is null when the only candidate's reset has passed", () => {
    const out = deriveUsageWidgetPayload(
      [account({ fiveHourUtil: 100, fiveHourResetsAt: at(-1) })],
      NOW
    )
    expect(out.fiveHourBackAt).toBeNull()
  })
})

describe("deriveUsageWidgetPayload — sevenDayBackAt", () => {
  it("is the soonest upcoming seven-day reset among weekly-DEAD accounts", () => {
    const out = deriveUsageWidgetPayload(
      [
        account({ sevenDayUtil: 100, sevenDayResetsAt: at(50) }),
        account({ sevenDayUtil: 100, sevenDayResetsAt: at(21) }),
        account({ sevenDayUtil: 40, sevenDayResetsAt: at(5) }),
      ],
      NOW
    )
    expect(out.sevenDayBackAt).toBe(Date.parse(at(21)))
  })

  it("skips a seven-day reset already in the past", () => {
    const out = deriveUsageWidgetPayload(
      [
        account({ sevenDayUtil: 100, sevenDayResetsAt: at(-2) }),
        account({ sevenDayUtil: 100, sevenDayResetsAt: at(30) }),
      ],
      NOW
    )
    expect(out.sevenDayBackAt).toBe(Date.parse(at(30)))
  })

  it("is null when nothing is weekly-dead", () => {
    const out = deriveUsageWidgetPayload(
      [account({ sevenDayUtil: 40, sevenDayResetsAt: at(30) })],
      NOW
    )
    expect(out.sevenDayBackAt).toBeNull()
  })
})

describe("deriveUsageWidgetPayload — sevenDayEndsAt", () => {
  it("is the soonest upcoming seven-day reset among weekly-ALIVE accounts", () => {
    const out = deriveUsageWidgetPayload(
      [
        account({ sevenDayUtil: 100, sevenDayResetsAt: at(2) }),
        account({ sevenDayUtil: 40, sevenDayResetsAt: at(94) }),
        account({ sevenDayUtil: 60, sevenDayResetsAt: at(150) }),
      ],
      NOW
    )
    expect(out.sevenDayEndsAt).toBe(Date.parse(at(94)))
  })

  it("skips a seven-day reset already in the past", () => {
    const out = deriveUsageWidgetPayload(
      [
        account({ sevenDayUtil: 40, sevenDayResetsAt: at(-3) }),
        account({ sevenDayUtil: 40, sevenDayResetsAt: at(60) }),
      ],
      NOW
    )
    expect(out.sevenDayEndsAt).toBe(Date.parse(at(60)))
  })

  it("is null when nothing is weekly-alive", () => {
    const out = deriveUsageWidgetPayload(
      [account({ sevenDayUtil: 100, sevenDayResetsAt: at(30) })],
      NOW
    )
    expect(out.sevenDayEndsAt).toBeNull()
  })

  it("ignores an unparseable reset instant", () => {
    const out = deriveUsageWidgetPayload(
      [account({ sevenDayUtil: 40, sevenDayResetsAt: "not-a-date" })],
      NOW
    )
    expect(out.sevenDayEndsAt).toBeNull()
  })
})

describe("deriveUsageWidgetPayload — tier is a pure function of sevenDayEndsAt", () => {
  function tierAt(hours: number) {
    return deriveUsageWidgetPayload(
      [account({ sevenDayUtil: 40, sevenDayResetsAt: at(hours) })],
      NOW
    ).tier
  }

  it("red under 24h", () => {
    expect(tierAt(10)).toBe("red")
    expect(tierAt(23.9)).toBe("red")
  })

  it("yellow at [24, 48)", () => {
    expect(tierAt(24)).toBe("yellow")
    expect(tierAt(47.9)).toBe("yellow")
  })

  it("green at [48, 72)", () => {
    expect(tierAt(48)).toBe("green")
    expect(tierAt(71.9)).toBe("green")
  })

  it("blue at >= 72h", () => {
    expect(tierAt(72)).toBe("blue")
    expect(tierAt(200)).toBe("blue")
  })

  it("blue when sevenDayEndsAt is null, while the return row still counts down", () => {
    const out = deriveUsageWidgetPayload(
      [account({ sevenDayUtil: 100, sevenDayResetsAt: at(2) })],
      NOW
    )
    expect(out.sevenDayEndsAt).toBeNull()
    expect(out.tier).toBe("blue")
    expect(out.sevenDayBackAt).toBe(Date.parse(at(2)))
  })

  it("colors from the weekly-ALIVE reset, never the sooner weekly-dead one", () => {
    const out = deriveUsageWidgetPayload(
      [
        account({ sevenDayUtil: 100, sevenDayResetsAt: at(2) }),
        account({ sevenDayUtil: 40, sevenDayResetsAt: at(94) }),
      ],
      NOW
    )
    expect(out.tier).toBe("blue")
    expect(out.sevenDayEndsAt).toBe(Date.parse(at(94)))
    expect(out.sevenDayBackAt).toBe(Date.parse(at(2)))
  })
})
