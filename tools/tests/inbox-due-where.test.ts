import { describe, expect, test } from "bun:test"
import { getEsoDayStr } from "../lib/eso-day.ts"
import { dayAfter, dueWhere } from "../lib/inbox-tracking/poll.ts"

describe("dueWhere", () => {
  const now = new Date("2026-06-20T18:00:00Z")
  const day = getEsoDayStr(now)

  test("counts only due-today-or-overdue rows, bounded by the ESO day", () => {
    expect(day).toBe("2026-06-20")
    expect(dueWhere(day)).toMatchObject({ "due-date": { before: "2026-06-21" } })
  })

  test("excludes completed rows", () => {
    expect(dueWhere(day)).toMatchObject({ "completed-at": { empty: true } })
  })

  test("excludes undated rows, bounding rather than asking for a null due date", () => {
    expect(dueWhere(day)["due-date"]).not.toHaveProperty("empty")
  })

  test("names the two keys it narrows on and no others", () => {
    expect(Object.keys(dueWhere(day)).toSorted()).toEqual(["completed-at", "due-date"])
  })
})

describe("dayAfter", () => {
  test("steps one calendar day", () => {
    expect(dayAfter("2026-06-20")).toBe("2026-06-21")
  })

  test("steps over a month end", () => {
    expect(dayAfter("2026-06-30")).toBe("2026-07-01")
  })

  test("steps over a year end", () => {
    expect(dayAfter("2026-12-31")).toBe("2027-01-01")
  })

  test("steps over a leap day", () => {
    expect(dayAfter("2028-02-28")).toBe("2028-02-29")
  })

  test("hands back what it was given where that is no day", () => {
    expect(dayAfter("not-a-day")).toBe("not-a-day")
  })
})
