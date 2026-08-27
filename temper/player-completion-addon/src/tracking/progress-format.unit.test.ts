import { describe, expect, it } from "bun:test"
import { countSuffix, formatProgressCount, progressSuffix } from "./progress-format"

describe("progressSuffix", () => {
  it("wraps an x/y fraction in parentheses with no leading label", () => {
    expect(progressSuffix(4, 7)).toBe("(4/7)")
  })

  it("handles a zero numerator", () => {
    expect(progressSuffix(0, 5)).toBe("(0/5)")
  })

  it("handles a complete fraction", () => {
    expect(progressSuffix(7, 7)).toBe("(7/7)")
  })
})

describe("countSuffix", () => {
  it("wraps a single live count in parentheses", () => {
    expect(countSuffix(3)).toBe("(3)")
  })

  it("handles a count of one", () => {
    expect(countSuffix(1)).toBe("(1)")
  })
})

describe("formatProgressCount", () => {
  it("reuses progressSuffix to build the labeled count", () => {
    expect(formatProgressCount("Bandits Slain", 2, 5)).toBe("Bandits Slain (2/5)")
  })
})
