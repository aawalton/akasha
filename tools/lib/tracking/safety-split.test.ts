import { describe, expect, test } from "bun:test"
import type { Page } from "../daily-tracking/tracking-types.ts"
import { cloneOpenSessionForSafetyChange, planSafetySplit } from "./safety-split.ts"

/** An open block with rather more on it than the clone will carry. */
const OPEN: Page = {
  id: "row-1",
  seq: 7,
  title: "Deep work",
  safetyLevel: "2",
  difficultyLevel: "3",
  startTime: "2026-03-05T20:00:00.000Z",
  endTime: null,
  relationships: ["rel-a", "rel-b"],
  notes: "half done",
  dailyTracking: "wake-day-2026-03-05",
  attributedDay: "2026-03-05",
}

const AT = new Date("2026-03-05T21:30:00.000Z")

describe("what a block carries into its own continuation", () => {
  /**
   * Three fields and no more.
   *
   * When safety changes mid-block the block is closed and a new one opened in its place, and this is
   * everything the new one inherits. Naming the keys rather than the values is the point: a field
   * added to the row later does not join this list by itself, it stays behind.
   */
  test("the clone is exactly title, difficulty and relationships", () => {
    const clone = cloneOpenSessionForSafetyChange(OPEN)
    expect(Object.keys(clone).sort()).toEqual(["difficulty", "relationships", "title"])
    expect(clone).toEqual({
      title: "Deep work",
      difficulty: "3",
      relationships: ["rel-a", "rel-b"],
    })
  })

  test("everything else on the block is left behind, safety and start and notes alike", () => {
    const clone = cloneOpenSessionForSafetyChange(OPEN) as Record<string, unknown>
    for (const key of [
      "id",
      "seq",
      "safetyLevel",
      "difficultyLevel",
      "startTime",
      "endTime",
      "notes",
      "dailyTracking",
      "attributedDay",
    ]) {
      expect(key in clone).toBe(false)
    }
  })

  test("a block with no title of its own is carried under its id", () => {
    expect(cloneOpenSessionForSafetyChange({ id: "row-2", seq: 1 }).title).toBe("row-2")
    expect(cloneOpenSessionForSafetyChange({ id: "row-2", seq: 1, title: 42 }).title).toBe("row-2")
  })

  test("a block that was never rated for difficulty carries no difficulty, and still has the key", () => {
    const clone = cloneOpenSessionForSafetyChange({ id: "row-2", seq: 1 })
    expect(clone.difficulty).toBeUndefined()
    expect(Object.keys(clone).sort()).toEqual(["difficulty", "relationships", "title"])
  })

  test("relationships that are not a list, or hold what is not a name, come back as names only", () => {
    expect(cloneOpenSessionForSafetyChange({ id: "row-2", seq: 1 }).relationships).toEqual([])
    expect(
      cloneOpenSessionForSafetyChange({ id: "row-2", seq: 1, relationships: "rel-a" }).relationships
    ).toEqual([])
    expect(
      cloneOpenSessionForSafetyChange({ id: "row-2", seq: 1, relationships: ["rel-a", 5, null, "rel-b"] })
        .relationships
    ).toEqual(["rel-a", "rel-b"])
  })
})

describe("the plan a safety change makes", () => {
  test("the old block closes and the new one opens at the same instant", () => {
    const plan = planSafetySplit(OPEN, "-1.5", AT)
    expect(plan.closeAt).toBe(AT)
    expect(plan.next.startInstant).toBe(AT)
    expect(plan.next.startInstant.getTime()).toBe(plan.closeAt.getTime())
  })

  test("the new block takes the safety it was given, not the one the old block held", () => {
    expect(planSafetySplit(OPEN, "-1.5", AT).next.safety).toBe("-1.5")
    expect(OPEN.safetyLevel).toBe("2")
  })

  test("the new block is the clone, and carries nothing the clone did not", () => {
    const plan = planSafetySplit(OPEN, "4", AT)
    expect(plan.next).toEqual({
      title: "Deep work",
      startInstant: AT,
      safety: "4",
      difficulty: "3",
      relationships: ["rel-a", "rel-b"],
    })
    expect(Object.keys(plan.next).sort()).toEqual([
      "difficulty",
      "relationships",
      "safety",
      "startInstant",
      "title",
    ])
  })

  test("the safety it is given is spelled through, not read, so it is whatever it was handed", () => {
    expect(planSafetySplit(OPEN, "not-a-level", AT).next.safety).toBe("not-a-level")
  })
})
