
import { describe, expect, test } from "bun:test"
import { decideRevivePlacement } from "../lib/decide-revive-placement.ts"

describe("decideRevivePlacement", () => {
  test("interactive + live → restart-in-place (do NOT drop to headless, do NOT orphan)", () => {
    expect(decideRevivePlacement({ priorLaunchOpened: true, isLive: true })).toBe(
      "restart-in-place"
    )
  })

  test("interactive + absent → headless (cold revive; Alan pulls interactive via `cr`)", () => {
    expect(decideRevivePlacement({ priorLaunchOpened: true, isLive: false })).toBe("headless")
  })

  test("headless + live → headless (a live headless seat stays headless)", () => {
    expect(decideRevivePlacement({ priorLaunchOpened: false, isLive: true })).toBe("headless")
  })

  test("headless + dead → headless (the correct resting revive state)", () => {
    expect(decideRevivePlacement({ priorLaunchOpened: false, isLive: false })).toBe("headless")
  })
})
