import { describe, expect, test } from "bun:test"
import { completionPercent } from "./completion-percent.module.code.ts"

describe("completionPercent", () => {
  test("only exact completion reads as 100", () => {
    expect(completionPercent(10000, 10000)).toBe(100)
    expect(completionPercent(1, 1)).toBe(100)
  })

  test("just-below-complete floors, never rounds up to 100", () => {
    expect(completionPercent(9997, 10000)).toBe(99)
    expect(completionPercent(999, 1000)).toBe(99)
    expect(completionPercent(199, 200)).toBe(99)
  })

  test("a started-but-tiny fraction floors up to at least 1, never 0", () => {
    expect(completionPercent(1, 10000)).toBe(1)
    expect(completionPercent(3, 1000)).toBe(1)
    expect(completionPercent(1, 101)).toBe(1)
  })

  test("not started reads as 0", () => {
    expect(completionPercent(0, 100)).toBe(0)
  })

  test("the mid band floors", () => {
    expect(completionPercent(497, 1000)).toBe(49)
    expect(completionPercent(1, 3)).toBe(33)
    expect(completionPercent(1, 2)).toBe(50)
  })

  test("an absent or invalid total reads as 0", () => {
    expect(completionPercent(0, 0)).toBe(0)
    expect(completionPercent(5, 0)).toBe(0)
  })
})
