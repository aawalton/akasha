import { expect, test } from "bun:test"
import { bodyOfRows } from "../watcher-task-progress/watcher-task-progress.module.code.ts"
import { completionIn, putsFor, rosterFrom } from "./watcher-task-progress-landing.module.code.ts"

const PAGE_PATH =
  "temper/progressions/temper-tasks/pages/crafting-writs/crafting-writs.temper-task.ts"

const ROWS_PATH =
  "temper/progressions/temper-tasks/pages/crafting-writs/crafting-writs.temper-task.progress.jsonl"

const PAGE = `import type { TemperTask } from "../../temper-task.page-type.ts"

export const craftingWrits = {
  id: "019db533-f381-761a-affb-ba493b613e2e",
  pageTypeSlug: "temper-task",
  slug: "crafting-writs",
  progressTotal: 1,
  progressCurrent: 0,
} as const satisfies TemperTask
`

const INDEX = {
  characters: {
    durene: { label: "Durene", sortOrder: 10 },
    amerys: { label: "Amerys", sortOrder: 5 },
  },
  paths: {
    "daily-writs": {
      current: 7,
      total: 14,
      entries: { durene: { current: 7, total: 7 }, amerys: { current: 0, total: 7 } },
    },
  },
}

const TASK = { slug: "crafting-writs", completionCardId: "daily-writs" }

const PATHS = new Map([["crafting-writs", PAGE_PATH]])

test("a completion that will not parse reads as nothing rather than throwing", () => {
  expect(completionIn("{ not json")).toBe(null)
  expect(completionIn(null)).toBe(null)
  expect(completionIn("")).toBe(null)
})

test("a roster entry takes its label from the first name and falls back to the title", () => {
  const roster = rosterFrom(
    [
      { slug: "durene-faerise", title: "Durene Faerise", firstName: "Durene", displayOrder: 10 },
      { slug: "belavierr", title: "Belavierr", displayOrder: 18 },
    ],
    new Map()
  )
  expect(roster.map((one) => one.firstName)).toEqual(["Durene", "Belavierr"])
  expect(roster.map((one) => one.sortOrder)).toEqual([10, 18])
  expect(roster[0]?.completion).toBe(null)
})

test("a row with no slug is passed over", () => {
  expect(rosterFrom([{ title: "Nobody" }], new Map())).toEqual([])
})

test("a task with no lines yet writes both the lines and the totals", () => {
  const puts = putsFor([TASK], INDEX, PATHS, [
    { path: PAGE_PATH, content: PAGE },
    { path: ROWS_PATH, content: null },
  ])
  const paths = puts.map((one) => one.path)
  expect(paths).toContain(ROWS_PATH)
  expect(paths).toContain(PAGE_PATH)
  const page = puts.find((one) => one.path === PAGE_PATH)?.content ?? ""
  expect(page).toContain("progressTotal: 14,")
  expect(page).toContain("progressCurrent: 7,")
  expect(page).toContain('progress: "jsonl",')
})

test("the totals written are the totals of the lines written", () => {
  const puts = putsFor([TASK], INDEX, PATHS, [
    { path: PAGE_PATH, content: PAGE },
    { path: ROWS_PATH, content: null },
  ])
  const rows = puts.find((one) => one.path === ROWS_PATH)?.content ?? ""
  const held = rows
    .split("\n")
    .filter((one) => one.trim() !== "")
    .map((one) => JSON.parse(one) as { progressTotal: number; progressCurrent: number })
  expect(held.reduce((sum, one) => sum + one.progressTotal, 0)).toBe(14)
  expect(held.reduce((sum, one) => sum + one.progressCurrent, 0)).toBe(7)
})

test("lines that already say what the reading says are not written again", () => {
  const first = putsFor([TASK], INDEX, PATHS, [
    { path: PAGE_PATH, content: PAGE },
    { path: ROWS_PATH, content: null },
  ])
  const rows = first.find((one) => one.path === ROWS_PATH)?.content ?? ""
  const page = first.find((one) => one.path === PAGE_PATH)?.content ?? ""
  const again = putsFor([TASK], INDEX, PATHS, [
    { path: PAGE_PATH, content: page },
    { path: ROWS_PATH, content: rows },
  ])
  expect(again).toEqual([])
})

test("a task the index does not name writes nothing", () => {
  const puts = putsFor([{ slug: "crafting-writs" }], INDEX, PATHS, [
    { path: PAGE_PATH, content: PAGE },
    { path: ROWS_PATH, content: null },
  ])
  expect(puts).toEqual([])
})

test("a task the pages placed no file for is passed over", () => {
  expect(putsFor([TASK], INDEX, new Map(), [])).toEqual([])
})

test("the lines keep the id a character's line already carried", () => {
  const held = bodyOfRows([
    {
      id: "kept-1",
      characterName: "Durene",
      progressTotal: 7,
      progressCurrent: 1,
      displayOrder: 10,
    },
  ])
  const puts = putsFor([TASK], INDEX, PATHS, [
    { path: PAGE_PATH, content: PAGE },
    { path: ROWS_PATH, content: held },
  ])
  const rows = puts.find((one) => one.path === ROWS_PATH)?.content ?? ""
  expect(rows).toContain('"id":"kept-1"')
})
