import { describe, expect, test } from "bun:test"
import { computeBuyQuantity, computeBuyShortfall, computeGlobalTotal } from "./rules-buy-core"

describe("computeGlobalTotal", () => {
  test("sums live current-char backpack + account snapshot + other chars' backpacks", () => {
    const total = computeGlobalTotal(
      10,
      "char-current",
      { "char-a": 100, "char-b": 50 },
      4000 - 160
    )
    expect(total).toBe(10 + 100 + 50 + 3840)
  })

  test("excludes the current character from the by-char sum (counted live instead)", () => {
    const total = computeGlobalTotal(7, "char-current", { "char-current": 999, "char-other": 3 }, 0)
    expect(total).toBe(7 + 3)
  })

  test("treats missing by-char and account snapshots as zero", () => {
    expect(computeGlobalTotal(5, "char-current", undefined, undefined)).toBe(5)
  })

  test("treats an empty by-char snapshot as zero from others", () => {
    expect(computeGlobalTotal(5, "char-current", {}, 12)).toBe(17)
  })
})

describe("computeBuyShortfall", () => {
  test("returns the positive gap to the target", () => {
    expect(computeBuyShortfall(4000, 160)).toBe(3840)
  })

  test("clamps to zero when at or over target", () => {
    expect(computeBuyShortfall(4000, 4000)).toBe(0)
    expect(computeBuyShortfall(4000, 4200)).toBe(0)
  })
})

describe("computeBuyQuantity", () => {
  test("bounds by the shortfall when it is the tightest constraint", () => {
    expect(computeBuyQuantity(100, 200, 1_000_000, 1)).toBe(100)
  })

  test("bounds by merchant max-buyable", () => {
    expect(computeBuyQuantity(100, 30, 1_000_000, 1)).toBe(30)
  })

  test("bounds by affordability (floor of money / unit price)", () => {
    expect(computeBuyQuantity(100, 200, 250, 30)).toBe(8)
  })

  test("returns 0 when the player cannot afford even one", () => {
    expect(computeBuyQuantity(100, 200, 5, 30)).toBe(0)
  })

  test("returns 0 when shortfall or max-buyable is non-positive", () => {
    expect(computeBuyQuantity(0, 200, 1_000_000, 1)).toBe(0)
    expect(computeBuyQuantity(100, 0, 1_000_000, 1)).toBe(0)
  })

  test("treats a zero unit price as free (unconstrained by money)", () => {
    expect(computeBuyQuantity(100, 50, 0, 0)).toBe(50)
  })
})
