import { describe, expect, test } from "bun:test"
import { summarizePool } from "../lib/oauth-selection.ts"
import { NOW, POOL_VECTORS } from "./oauth-pool-vectors.ts"

describe("summarizePool — the pool shape an honest 429 and a limit-resume are decided on", () => {
  for (const vector of POOL_VECTORS) {
    test(vector.id, () => {
      expect(summarizePool(vector.states, NOW)).toEqual({
        eligibleCount: vector.eligibleCount,
        totalCount: vector.totalCount,
        earliestEligibleResetMs: vector.earliestEligibleResetMs,
      })
    })
  }

  test(`holds ${POOL_VECTORS.length} vectors and no vector twice`, () => {
    const ids = POOL_VECTORS.map((vector) => vector.id)
    expect(ids.length).toBe(7)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
