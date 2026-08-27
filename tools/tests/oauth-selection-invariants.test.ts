import { describe, expect, test } from "bun:test"
import { selectAccount } from "../lib/oauth-selection.ts"
import type { AccountState } from "../lib/oauth-types.ts"
import {
  CATALOGUE,
  enumeratedPools,
  INELIGIBLE_CATALOGUE,
  isoAt,
  NOW,
  state,
} from "./oauth-pool-vectors.ts"

const POOLS = enumeratedPools()

const pick = (pool: readonly AccountState[]): string | null =>
  selectAccount(pool, NOW)?.account ?? null

const namesOf = (pool: readonly AccountState[]): string =>
  pool.length === 0 ? "(empty)" : pool.map((account) => account.account).join("+")

function permutations(pool: readonly AccountState[]): AccountState[][] {
  if (pool.length <= 1) return [[...pool]]
  const out: AccountState[][] = []
  for (const [i, head] of pool.entries()) {
    const rest = [...pool.slice(0, i), ...pool.slice(i + 1)]
    for (const tail of permutations(rest)) out.push([head, ...tail])
  }
  return out
}

function reorderings(pool: readonly AccountState[]): AccountState[][] {
  if (pool.length <= 3) return permutations(pool)
  const out: AccountState[][] = [[...pool].reverse()]
  for (const [k] of pool.entries()) {
    if (k > 0) out.push([...pool.slice(k), ...pool.slice(0, k)])
  }
  return out
}

describe("selectAccount over an enumerated pool grid", () => {
  test("the grid it looked at was every pool of up to three account shapes, and the whole ten", () => {
    expect(POOLS.length).toBe(177)
    expect(CATALOGUE.length).toBe(10)
    expect(POOLS.filter((pool) => pool.length === 0).length).toBe(1)
    expect(POOLS.filter((pool) => pool.length === 1).length).toBe(10)
    expect(POOLS.filter((pool) => pool.length === 2).length).toBe(45)
    expect(POOLS.filter((pool) => pool.length === 3).length).toBe(120)
    expect(POOLS.filter((pool) => pool.length === 10).length).toBe(1)
  })

  test("permutation invariance: every ordering of a pool selects the same account", () => {
    const disagreed: string[] = []
    for (const pool of POOLS) {
      const expected = pick(pool)
      for (const ordering of reorderings(pool)) {
        const got = pick(ordering)
        if (got !== expected) {
          disagreed.push(`${namesOf(pool)} reordered to ${namesOf(ordering)} gave ${got}`)
        }
      }
    }
    expect(disagreed).toEqual([])
  })

  test("containment: a selected account is a member of the pool with headroom on both windows", () => {
    const wrong: string[] = []
    for (const pool of POOLS) {
      const picked = selectAccount(pool, NOW)
      if (picked === null) continue
      if (!pool.includes(picked)) wrong.push(`${namesOf(pool)} selected a non-member`)
      if (picked.fiveHourUtil >= 100) {
        wrong.push(`${namesOf(pool)} selected ${picked.account} at the five-hour cap`)
      }
      if (picked.sevenDayUtil >= 100) {
        wrong.push(`${namesOf(pool)} selected ${picked.account} at the seven-day cap`)
      }
    }
    expect(wrong).toEqual([])
  })

  test("inserting an ineligible account at any position never changes the selection", () => {
    const changed: string[] = []
    for (const pool of POOLS) {
      const before = pick(pool)
      for (const intruder of INELIGIBLE_CATALOGUE) {
        for (const [at] of [...pool, intruder].entries()) {
          const widened = [...pool.slice(0, at), intruder, ...pool.slice(at)]
          const after = pick(widened)
          if (after !== before) {
            changed.push(
              `${namesOf(pool)} took ${intruder.account} at ${at} and moved to ${after} from ${before}`
            )
          }
        }
      }
    }
    expect(changed).toEqual([])
  })
})

const SHARED = { fiveHourUtil: 50, sevenDayUtil: 50, fiveHourResetsAt: null } as const

const FUTURE_HOURS: readonly number[] = [1, 2, 5, 12, 23, 24, 71, 72, 100, 143]

const STALE_RESETS: readonly (string | null)[] = [
  null,
  "not-a-date",
  isoAt(-5),
  new Date(NOW - 1_000).toISOString(),
]

describe("a stale or missing seven-day reset ranks at the 144-hour horizon", () => {
  test("a future reset inside the horizon out-ranks every stale reset, in either input order", () => {
    const lost: string[] = []
    for (const hours of FUTURE_HOURS) {
      for (const stale of STALE_RESETS) {
        const future = state({ account: "future", ...SHARED, sevenDayResetsAt: isoAt(hours) })
        const passed = state({ account: "stale", ...SHARED, sevenDayResetsAt: stale })
        if (pick([passed, future]) !== "future") lost.push(`${hours}h against ${stale}, stale first`)
        if (pick([future, passed]) !== "future") {
          lost.push(`${hours}h against ${stale}, future first`)
        }
      }
    }
    expect(lost).toEqual([])
    expect(FUTURE_HOURS.length * STALE_RESETS.length).toBe(40)
  })

  test("at the horizon itself the two tie and the account name decides, which bounds the sweep", () => {
    const insideHorizon = state({ account: "zzz", ...SHARED, sevenDayResetsAt: isoAt(143) })
    const atHorizon = state({ account: "zzz", ...SHARED, sevenDayResetsAt: isoAt(144) })
    const missing = state({ account: "aaa", ...SHARED, sevenDayResetsAt: null })
    expect(pick([missing, insideHorizon])).toBe("zzz")
    expect(pick([missing, atHorizon])).toBe("aaa")
  })
})
