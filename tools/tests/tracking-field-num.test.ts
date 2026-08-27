import { describe, expect, it } from "bun:test"
import type { Page } from "../lib/daily-tracking/tracking-types.ts"
import { fieldNum } from "../lib/tracking/format.ts"
import { resolveActivityDifficulty } from "../lib/tracking/levels.ts"
import { normalizeSessionActivities } from "../lib/tracking/resolve.ts"

function page(values: Readonly<Record<string, unknown>>): Page {
  return { id: "p1", seq: 0, ...values } as Page
}

describe("fieldNum", () => {
  it("reads a number", () => {
    expect(fieldNum(page({ n: 3 }), "n")).toBe(3)
  })

  it("reads the string the page query service delivers a frontmatter scalar as", () => {
    expect(fieldNum(page({ n: "3" }), "n")).toBe(3)
    expect(fieldNum(page({ n: "0" }), "n")).toBe(0)
    expect(fieldNum(page({ n: "4.5" }), "n")).toBe(4.5)
    expect(fieldNum(page({ n: "-2" }), "n")).toBe(-2)
  })

  it("leaves an empty string unread rather than rating it zero", () => {
    expect(fieldNum(page({ n: "" }), "n")).toBeUndefined()
    expect(fieldNum(page({ n: "   " }), "n")).toBeUndefined()
  })

  it("leaves a string that names no number unread", () => {
    expect(fieldNum(page({ n: "hard" }), "n")).toBeUndefined()
  })

  it("leaves a non-finite number unread", () => {
    expect(fieldNum(page({ n: Number.NaN }), "n")).toBeUndefined()
    expect(fieldNum(page({ n: Number.POSITIVE_INFINITY }), "n")).toBeUndefined()
    expect(fieldNum(page({ n: "Infinity" }), "n")).toBeUndefined()
  })

  it("leaves a missing key and a non-scalar unread", () => {
    expect(fieldNum(page({}), "n")).toBeUndefined()
    expect(fieldNum(page({ n: true }), "n")).toBeUndefined()
    expect(fieldNum(page({ n: [1] }), "n")).toBeUndefined()
  })
})

describe("normalizeSessionActivities", () => {
  it("rates every activity in a catalog delivered wholly as strings", () => {
    const rows = [
      page({ id: "a1", title: "Read", defaultDifficulty: "1" }),
      page({ id: "a2", title: "Sleep", defaultDifficulty: "0" }),
      page({ id: "a3", title: "Intense", defaultDifficulty: "4.5" }),
    ]
    expect(normalizeSessionActivities(rows)).toEqual([
      { title: "Read", defaultDifficulty: 1 },
      { title: "Sleep", defaultDifficulty: 0 },
      { title: "Intense", defaultDifficulty: 4.5 },
    ])
  })

  it("leaves an activity with an empty difficulty unrated", () => {
    const rows = [page({ id: "a1", title: "Walk", defaultDifficulty: "  " })]
    expect(normalizeSessionActivities(rows)).toEqual([
      { title: "Walk", defaultDifficulty: undefined },
    ])
  })

  it("normalizes an empty catalog to an empty list", () => {
    expect(normalizeSessionActivities([])).toEqual([])
  })

  it("carries a string-delivered rating through to the title that asks for it", () => {
    const rows = [page({ id: "a1", title: "Projects", seq: "2", defaultDifficulty: "2" })]
    expect(resolveActivityDifficulty("Projects", normalizeSessionActivities(rows))).toBe("2")
  })
})
