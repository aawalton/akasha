import { expect, test } from "bun:test"
import {
  bodyOfRows,
  idsByName,
  pathKeyFor,
  refreshedFor,
  rowsFrom,
  rowsIn,
} from "./watcher-task-progress.module.code.ts"

const INDEX = {
  characters: {
    c1: { label: "Durene", sortOrder: 10 },
    c2: { label: "Amerys", sortOrder: 5 },
  },
  paths: {
    "daily-writs": {
      current: 7,
      total: 14,
      entries: { c1: { current: 7, total: 7 }, c2: { current: 0, total: 7 } },
    },
  },
}

const HELD =
  '{"id":"kept-1","characterName":"Durene","progressTotal":7,"progressCurrent":3,"displayOrder":10}\n'

test("a task naming no card has no path key", () => {
  expect(pathKeyFor({ slug: "a" })).toBe(null)
  expect(pathKeyFor({ slug: "a", completionCardId: "" })).toBe(null)
})

test("a path key joins the card to the item path", () => {
  expect(pathKeyFor({ slug: "a", completionCardId: "daily-writs" })).toBe("daily-writs")
  expect(pathKeyFor({ slug: "a", completionCardId: "mount", completionItemPath: ["speed"] })).toBe(
    "mount/speed"
  )
})

test("a line that will not parse is passed over rather than throwing", () => {
  expect(rowsIn("{ not json\n")).toEqual([])
  expect(rowsIn("")).toEqual([])
  expect(rowsIn('{"id":"x"}\n')).toEqual([])
})

test("a row read back carries every field it was written with", () => {
  expect(rowsIn(HELD)).toEqual([
    {
      id: "kept-1",
      characterName: "Durene",
      progressTotal: 7,
      progressCurrent: 3,
      displayOrder: 10,
    },
  ])
})

test("the id a character already had is kept rather than minted again", () => {
  const reading = {
    progressCurrent: 7,
    progressTotal: 14,
    rows: [
      { characterName: "Amerys", progressCurrent: 0, progressTotal: 7, displayOrder: 5 },
      { characterName: "Durene", progressCurrent: 7, progressTotal: 7, displayOrder: 10 },
    ],
  }
  const rows = rowsFrom(reading, idsByName(rowsIn(HELD)), () => "minted")
  expect(rows.map((one) => one.id)).toEqual(["minted", "kept-1"])
  expect(rows[1]?.progressCurrent).toBe(7)
})

test("rows are written one to a line and close with a break", () => {
  const body = bodyOfRows([
    { id: "a", characterName: "Durene", progressTotal: 7, progressCurrent: 7, displayOrder: 10 },
  ])
  expect(body.endsWith("\n")).toBe(true)
  expect(body.split("\n").filter((one) => one !== "")).toHaveLength(1)
})

test("what a task states is the total of the lines added up", () => {
  const done = refreshedFor(
    { slug: "crafting-writs", completionCardId: "daily-writs" },
    INDEX,
    HELD,
    () => "minted"
  )
  expect(done).not.toBe(null)
  const rows = done?.rows ?? []
  expect(done?.progressTotal).toBe(rows.reduce((sum, one) => sum + one.progressTotal, 0))
  expect(done?.progressCurrent).toBe(rows.reduce((sum, one) => sum + one.progressCurrent, 0))
})

test("a task the index does not name is passed over", () => {
  expect(refreshedFor({ slug: "a", completionCardId: "no-such-card" }, INDEX, "")).toBe(null)
  expect(refreshedFor({ slug: "a" }, INDEX, "")).toBe(null)
})

test("rows come back in the order the reading gave them", () => {
  const done = refreshedFor(
    { slug: "crafting-writs", completionCardId: "daily-writs" },
    INDEX,
    HELD,
    () => "minted"
  )
  expect(done?.rows.map((one) => one.characterName)).toEqual(["Amerys", "Durene"])
})
