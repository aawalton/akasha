import { describe, expect, it } from "bun:test"
import { badTruncate } from "./bad-truncate"

describe("badTruncate", () => {
  it("truncates 0.31 to 4 sig figs as 0.3099 due to FP precision loss", () => {
    expect(badTruncate(0.31, 4)).toBe(0.3099)
  })

  it("truncates 92.97 to 4 sig figs as 92.96 due to FP cancellation", () => {
    expect(badTruncate(92.97, 4)).toBe(92.96)
  })

  it("produces 9296 for 31% of 30000 with consistent 4 sig figs", () => {
    const coeff = badTruncate(31 / 100, 4)
    const scaled = badTruncate(coeff * (30000 / 100), 4)
    const result = scaled * 100
    expect(result).toBe(9296)
  })

  it("handles zero", () => {
    expect(badTruncate(0, 4)).toBe(0)
  })

  it("handles negative values", () => {
    expect(badTruncate(-0.31, 4)).toBe(-0.3099)
  })

  it("handles exact integers", () => {
    expect(badTruncate(9300, 4)).toBe(9300)
  })

  it("truncates integer digits beyond sig figs", () => {
    expect(badTruncate(12345, 3)).toBe(12300)
  })

  it("truncates both integer and fractional digits beyond sig figs", () => {
    expect(badTruncate(11337.6, 4)).toBe(11330)
  })
})
