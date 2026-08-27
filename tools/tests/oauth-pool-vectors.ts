import type { AccountState } from "../lib/oauth-types.ts"

export const NOW = Date.UTC(2026, 4, 1)
export const HOUR_MS = 3_600_000
export const HALF_HOUR_MS = 1_800_000

export const isoAt = (offsetHours: number): string =>
  new Date(NOW + offsetHours * HOUR_MS).toISOString()

export function state(overrides: Partial<AccountState> & { account: string }): AccountState {
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

export interface PoolVector {
  readonly id: string
  readonly states: readonly AccountState[]
  readonly eligibleCount: number
  readonly totalCount: number
  readonly earliestEligibleResetMs: number | null
}

export const POOL_VECTORS: readonly PoolVector[] = [
  {
    id: "an empty pool counts nothing and times nothing",
    states: [],
    eligibleCount: 0,
    totalCount: 0,
    earliestEligibleResetMs: null,
  },
  {
    id: "a pool with every account eligible leaves nothing to time",
    states: [state({ account: "a" }), state({ account: "b" })],
    eligibleCount: 2,
    totalCount: 2,
    earliestEligibleResetMs: null,
  },
  {
    id: "an account capped on the five-hour window alone frees at its five-hour reset",
    states: [
      state({
        account: "blocked",
        fiveHourUtil: 100,
        fiveHourResetsAt: isoAt(3),
        sevenDayResetsAt: isoAt(100),
      }),
    ],
    eligibleCount: 0,
    totalCount: 1,
    earliestEligibleResetMs: NOW + 3 * HOUR_MS,
  },
  {
    id: "an account capped on both windows frees at the later of the two resets",
    states: [
      state({
        account: "blocked",
        fiveHourUtil: 100,
        sevenDayUtil: 100,
        fiveHourResetsAt: isoAt(3),
        sevenDayResetsAt: isoAt(40),
      }),
    ],
    eligibleCount: 0,
    totalCount: 1,
    earliestEligibleResetMs: NOW + 40 * HOUR_MS,
  },
  {
    id: "the pool frees at the soonest account, never at the soonest window",
    states: [
      state({
        account: "freesLate",
        fiveHourUtil: 100,
        sevenDayUtil: 100,
        fiveHourResetsAt: isoAt(1),
        sevenDayResetsAt: isoAt(30),
      }),
      state({
        account: "freesFirst",
        fiveHourUtil: 100,
        fiveHourResetsAt: isoAt(20),
        sevenDayResetsAt: isoAt(100),
      }),
    ],
    eligibleCount: 0,
    totalCount: 2,
    earliestEligibleResetMs: NOW + 20 * HOUR_MS,
  },
  {
    id: "a blocking window with no recorded reset leaves the pool untimeable",
    states: [
      state({
        account: "blocked",
        fiveHourUtil: 100,
        fiveHourResetsAt: null,
        sevenDayResetsAt: isoAt(50),
      }),
    ],
    eligibleCount: 0,
    totalCount: 1,
    earliestEligibleResetMs: null,
  },
  {
    id: "a mixed pool counts the eligible and times the soonest ineligible",
    states: [
      state({ account: "ok" }),
      state({ account: "blocked", sevenDayUtil: 100, sevenDayResetsAt: isoAt(12) }),
    ],
    eligibleCount: 1,
    totalCount: 2,
    earliestEligibleResetMs: NOW + 12 * HOUR_MS,
  },
]

export const CATALOGUE: readonly AccountState[] = [
  state({ account: "a01", fiveHourUtil: 10, sevenDayUtil: 10, sevenDayResetsAt: isoAt(1) }),
  state({ account: "a02", fiveHourUtil: 10, sevenDayUtil: 10, sevenDayResetsAt: isoAt(24) }),
  state({ account: "a03", fiveHourUtil: 10, sevenDayUtil: 10, sevenDayResetsAt: isoAt(168) }),
  state({ account: "a04", fiveHourUtil: 10, sevenDayUtil: 10, sevenDayResetsAt: null }),
  state({ account: "a05", fiveHourUtil: 20, sevenDayUtil: 20, sevenDayResetsAt: "not-a-date" }),
  state({ account: "a06", fiveHourUtil: 30, sevenDayUtil: 30, sevenDayResetsAt: isoAt(-5) }),
  state({ account: "a07", fiveHourUtil: 100, sevenDayUtil: 10, sevenDayResetsAt: isoAt(24) }),
  state({ account: "a08", fiveHourUtil: 10, sevenDayUtil: 100, sevenDayResetsAt: isoAt(1) }),
  state({
    account: "a11",
    fiveHourUtil: 10,
    sevenDayUtil: 10,
    sevenDayResetsAt: isoAt(1),
    fiveHourAtLimitUntil: NOW + HALF_HOUR_MS,
  }),
  state({
    account: "a12",
    fiveHourUtil: 10,
    sevenDayUtil: 10,
    sevenDayResetsAt: isoAt(24),
    fiveHourAtLimitUntil: NOW - HALF_HOUR_MS,
  }),
]

export const INELIGIBLE_CATALOGUE: readonly AccountState[] = [
  state({ account: "zz-five-hour-maxed", fiveHourUtil: 100, sevenDayResetsAt: isoAt(1) }),
  state({ account: "zz-seven-day-maxed", sevenDayUtil: 100, sevenDayResetsAt: isoAt(1) }),
  state({
    account: "zz-both-maxed",
    fiveHourUtil: 100,
    sevenDayUtil: 100,
    sevenDayResetsAt: isoAt(1),
  }),
]

export function enumeratedPools(): AccountState[][] {
  const all = [...CATALOGUE]
  const pools: AccountState[][] = [[], [...all]]
  for (const a of all) pools.push([a])
  for (const [i, a] of all.entries()) {
    const afterA = all.slice(i + 1)
    for (const b of afterA) pools.push([a, b])
    for (const [j, b] of afterA.entries()) {
      for (const c of afterA.slice(j + 1)) pools.push([a, b, c])
    }
  }
  return pools
}
