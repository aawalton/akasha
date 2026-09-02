import { describe, expect, test } from "bun:test"
import {
  completedDayBody,
  completedDayLinesPath,
  completedDayOf,
  completedDayPagePath,
  completionLine,
  completionsWith,
  completionsWithout,
} from "./completed-day-landing.ts"

// Every fixture here is a record the old `temper-completed-month` store holds and the line
// `akasha/temper/temper-progress/completed-days` now holds for it, copied unchanged.
describe("the day a completion falls on", () => {
  test("is the UTC calendar day of the instant, not the day Alan was having", () => {
    expect(completedDayOf("2026-03-05T12:48:43.137Z")).toBe("2026-03-05")
    // 01:57 UTC on the 30th is still the 29th by the ESO reset, and the day grain is UTC
    expect(completedDayOf("2026-04-30T01:57:12.000Z")).toBe("2026-04-30")
  })

  test("names the page and the lines beside it", () => {
    expect(completedDayPagePath("2026-03-05")).toBe(
      "akasha/temper/temper-progress/completed-days/pages/day-2026-03-05/day-2026-03-05.temper-completed-day.ts"
    )
    expect(completedDayLinesPath("2026-03-05")).toBe(
      "akasha/temper/temper-progress/completed-days/pages/day-2026-03-05/day-2026-03-05.temper-completed-day.completions.jsonl"
    )
  })
})

describe("a completion line", () => {
  test("is the landed line, key for key", () => {
    expect(
      completionLine({
        id: "019db533-f3b3-77e0-bac5-71806d6387b1",
        completedAt: "2026-03-05T13:57:43.192Z",
        task: "hireling-mails",
        title: "Hireling Mails",
        character: "erin-solstice",
        esoCharacterId: "8796093022338107",
      })
    ).toBe(
      '{"id":"019db533-f3b3-77e0-bac5-71806d6387b1","completedAt":"2026-03-05T13:57:43.192Z","task":"hireling-mails","character":"erin-solstice","esoCharacterId":"8796093022338107"}'
    )
  })

  test("states the title only where it names no task", () => {
    expect(
      completionLine({
        id: "019db533-f3b3-77f4-b9f5-55b617d9081e",
        completedAt: "2026-03-05T12:48:56.140Z",
        title: "Dev Tracker",
        dueDate: "2026-03-05",
      })
    ).toBe(
      '{"id":"019db533-f3b3-77f4-b9f5-55b617d9081e","completedAt":"2026-03-05T12:48:56.140Z","title":"Dev Tracker","dueDate":"2026-03-05"}'
    )
  })

  test("writes an item path as text, as the property that holds it is text", () => {
    expect(
      completionLine({
        id: "019de377-7289-708c-93c0-4a546d8bfd0b",
        completedAt: "2026-05-01T12:13:06.000Z",
        task: "undaunted-skill-line",
        character: "mrsha-du-marquin",
        dueDate: "2026-05-01",
        completionCardId: "skill-lines",
        completionItemPath: [55 as unknown as string],
      })
    ).toBe(
      '{"id":"019de377-7289-708c-93c0-4a546d8bfd0b","completedAt":"2026-05-01T12:13:06.000Z","task":"undaunted-skill-line","character":"mrsha-du-marquin","dueDate":"2026-05-01","completionCardId":"skill-lines","completionItemPath":["55"]}'
    )
  })
})

describe("a day's lines", () => {
  const first = {
    id: "019db533-f3b3-77f9-b1f7-7976a7b6f551",
    completedAt: "2026-03-05T12:48:43.137Z",
    title: "Dev Tracker",
    dueDate: "2026-03-05",
  }
  const later = {
    id: "019db533-f3b3-77f4-b9f5-55b617d9081e",
    completedAt: "2026-03-05T12:48:56.140Z",
    title: "Dev Tracker",
    dueDate: "2026-03-06",
  }

  test("open a day that holds none", () => {
    expect(completionsWith(null, first)).toBe(`${completionLine(first)}\n`)
  })

  test("stay ordered by the instant each was marked at", () => {
    const held = `${completionLine(later)}\n`
    expect(completionsWith(held, first)).toBe(`${completionLine(first)}\n${completionLine(later)}\n`)
  })

  test("refuse a completion already standing, so a rerun files nothing twice", () => {
    const held = `${completionLine(first)}\n`
    expect(completionsWith(held, { ...first, id: "019db533-f3b3-0000-0000-000000000000" })).toBeNull()
  })

  test("give a completion back up by its identity", () => {
    const held = `${completionLine(first)}\n${completionLine(later)}\n`
    expect(completionsWithout(held, later.id)).toBe(`${completionLine(first)}\n`)
    expect(completionsWithout(held, "019db533-f3b3-0000-0000-000000000000")).toBeNull()
  })
})

describe("a day page", () => {
  test("is the body that landed for that day", () => {
    expect(completedDayBody("2026-03-05", "01a05fe3-09ca-7e72-8b3e-e6b34e0d2978")).toBe(
      [
        'import type { TemperCompletedDay } from "../../temper-completed-day.page-type.ts"',
        "",
        "export const day20260305 = {",
        '  id: "01a05fe3-09ca-7e72-8b3e-e6b34e0d2978",',
        '  pageTypeSlug: "temper-completed-day",',
        '  slug: "day-2026-03-05",',
        '  title: "2026-03-05",',
        '  day: "2026-03-05",',
        '  completions: "jsonl",',
        "} as const satisfies TemperCompletedDay",
        "",
      ].join("\n")
    )
  })
})
