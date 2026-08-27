import { describe, expect, test } from "bun:test"
import { chunksStillLoading } from "./chunks-loading"

describe("chunksStillLoading — inventory chunk loading gate", () => {
  test("read still loading → true (regardless of counts)", () => {
    expect(chunksStillLoading({ readIsLoading: true, loadedCount: 0, expectedCount: 3 })).toBe(true)
  })

  test("REGRESSION: read done but partial chunk set (loaded < expected) → still loading", () => {
    expect(chunksStillLoading({ readIsLoading: false, loadedCount: 2, expectedCount: 3 })).toBe(
      true
    )
  })

  test("read done and every declared chunk present (loaded == expected) → done", () => {
    expect(chunksStillLoading({ readIsLoading: false, loadedCount: 3, expectedCount: 3 })).toBe(
      false
    )
  })

  test("no snapshot yet (expectedCount null) and read done → not loading (count gate inert)", () => {
    expect(chunksStillLoading({ readIsLoading: false, loadedCount: 0, expectedCount: null })).toBe(
      false
    )
  })
})
