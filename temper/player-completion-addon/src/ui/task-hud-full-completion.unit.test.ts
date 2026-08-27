import { describe, expect, it } from "bun:test"
import { isFullyCompleteAtLoad, isPermanentlyComplete } from "./task-hud-full-completion"
import type { TaskProgress } from "./task-progress-resolver-types"

describe("isFullyCompleteAtLoad", () => {
  it("binary task with no timestamp → not full (visible)", () => {
    expect(isFullyCompleteAtLoad({ hasTimestampToday: false, progress: undefined })).toBe(false)
  })

  it("binary task with timestamp → full (hide on relog)", () => {
    expect(isFullyCompleteAtLoad({ hasTimestampToday: true, progress: undefined })).toBe(true)
  })

  it("counted task at max with no timestamp → full (hide on relog)", () => {
    const progress: TaskProgress = { current: 7, total: 7 }
    expect(isFullyCompleteAtLoad({ hasTimestampToday: false, progress })).toBe(true)
  })

  it("counted task at max with timestamp → full (hide on relog)", () => {
    const progress: TaskProgress = { current: 7, total: 7 }
    expect(isFullyCompleteAtLoad({ hasTimestampToday: true, progress })).toBe(true)
  })

  it("counted task below max with no timestamp → not full (visible)", () => {
    const progress: TaskProgress = { current: 3, total: 7 }
    expect(isFullyCompleteAtLoad({ hasTimestampToday: false, progress })).toBe(false)
  })

  it("counted task below max with timestamp → not full (partial completion, stays visible after relog)", () => {
    const progress: TaskProgress = { current: 3, total: 7 }
    expect(isFullyCompleteAtLoad({ hasTimestampToday: true, progress })).toBe(false)
  })

  it("counted task above max with timestamp → full (counter overshoot still counts as maxed)", () => {
    const progress: TaskProgress = { current: 9, total: 7 }
    expect(isFullyCompleteAtLoad({ hasTimestampToday: true, progress })).toBe(true)
  })
})

describe("isPermanentlyComplete", () => {
  it("cumulative card maxed → permanently complete (hide for this character)", () => {
    const progress: TaskProgress = { current: 12, total: 12 }
    expect(isPermanentlyComplete({ cardId: "skill-lines", progress })).toBe(true)
  })

  it("cumulative card overshoot → permanently complete", () => {
    const progress: TaskProgress = { current: 14, total: 12 }
    expect(isPermanentlyComplete({ cardId: "skill-lines", progress })).toBe(true)
  })

  it("cumulative card below max → not permanent (still climbing, stays visible)", () => {
    const progress: TaskProgress = { current: 5, total: 12 }
    expect(isPermanentlyComplete({ cardId: "skill-lines", progress })).toBe(false)
  })

  it("resetting card maxed → not permanent (resets next reset, stays in rotation)", () => {
    const progress: TaskProgress = { current: 7, total: 7 }
    expect(isPermanentlyComplete({ cardId: "daily-writs", progress })).toBe(false)
  })

  it("cumulative card with no progress data → not permanent (cannot prove maxed)", () => {
    expect(isPermanentlyComplete({ cardId: "skill-lines", progress: undefined })).toBe(false)
  })

  it("undefined card → not permanent (unknown reset behavior, stays visible)", () => {
    const progress: TaskProgress = { current: 7, total: 7 }
    expect(isPermanentlyComplete({ cardId: undefined, progress })).toBe(false)
  })
})
