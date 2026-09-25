import { expect, test } from "bun:test"
import {
  bodyOfRows,
  idsByCharacter,
  pathKeyFor,
  refreshedFor,
  rowsFrom,
  rowsIn,
  unpagedWhy,
} from "akasha/temper/watcher/modules/watcher-task-progress/watcher-task-progress.module.code.ts"

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

const KNOWN = { slugs: new Set(["c1", "c2"]), refuse: () => undefined }

const HELD =
  '{"id":"kept-1","character":"temper-account-character/c1","progressTotal":7,"progressCurrent":3,"displayOrder":10}\n'

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
      character: "temper-account-character/c1",
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
      { characterId: "c2", progressCurrent: 0, progressTotal: 7, displayOrder: 5 },
      { characterId: "c1", progressCurrent: 7, progressTotal: 7, displayOrder: 10 },
    ],
  }
  const held = idsByCharacter(rowsIn(HELD))
  const rows = rowsFrom("crafting-writs", reading, held, KNOWN, () => "minted")
  expect(rows.map((one) => one.id)).toEqual(["minted", "kept-1"])
  expect(rows[1]?.progressCurrent).toBe(7)
})

test("a line names its character as a relation to that character's page", () => {
  const reading = {
    progressCurrent: 0,
    progressTotal: 7,
    rows: [{ characterId: "c2", progressCurrent: 0, progressTotal: 7, displayOrder: 5 }],
  }
  const rows = rowsFrom("crafting-writs", reading, new Map(), KNOWN, () => "minted")
  expect(rows[0]?.character).toBe("temper-account-character/c2")
})

test("a character no page is for is refused, named, and not written", () => {
  const said: string[] = []
  const reading = {
    progressCurrent: 7,
    progressTotal: 14,
    rows: [
      { characterId: "c1", progressCurrent: 7, progressTotal: 7, displayOrder: 10 },
      { characterId: "ghost", progressCurrent: 0, progressTotal: 7, displayOrder: 11 },
    ],
  }
  const refuse = (one: string) => {
    said.push(one)
  }
  const characters = { slugs: KNOWN.slugs, refuse }
  const rows = rowsFrom("crafting-writs", reading, new Map(), characters, () => "minted")
  expect(rows.map((one) => one.character)).toEqual(["temper-account-character/c1"])
  expect(said).toEqual([unpagedWhy("crafting-writs", "ghost")])
})

test("the totals a task states leave out a line that was refused", () => {
  const done = refreshedFor(
    { slug: "crafting-writs", completionCardId: "daily-writs" },
    INDEX,
    "",
    { slugs: new Set(["c1"]), refuse: () => undefined },
    () => "minted"
  )
  expect(done?.progressCurrent).toBe(7)
  expect(done?.progressTotal).toBe(7)
})

test("rows are written one to a line and close with a break", () => {
  const body = bodyOfRows([
    {
      id: "a",
      character: "temper-account-character/c1",
      progressTotal: 7,
      progressCurrent: 7,
      displayOrder: 10,
    },
  ])
  expect(body.endsWith("\n")).toBe(true)
  expect(body.split("\n").filter((one) => one !== "")).toHaveLength(1)
})

const WRITS = { slug: "crafting-writs", completionCardId: "daily-writs" }

test("what a task states is the total of the lines added up", () => {
  const done = refreshedFor(WRITS, INDEX, HELD, KNOWN, () => "minted")
  expect(done).not.toBe(null)
  const rows = done?.rows ?? []
  expect(done?.progressTotal).toBe(rows.reduce((sum, one) => sum + one.progressTotal, 0))
  expect(done?.progressCurrent).toBe(rows.reduce((sum, one) => sum + one.progressCurrent, 0))
})

test("a line already held for a character is matched by its relation", () => {
  const done = refreshedFor(WRITS, INDEX, HELD, KNOWN, () => "minted")
  const held = done?.rows.find((one) => one.character === "temper-account-character/c1")
  expect(held?.id).toBe("kept-1")
  expect(held?.progressCurrent).toBe(7)
})

test("a task the index does not name is passed over", () => {
  const card = { slug: "a", completionCardId: "no-such-card" }
  expect(refreshedFor(card, INDEX, "", KNOWN)).toBe(null)
  expect(refreshedFor({ slug: "a" }, INDEX, "", KNOWN)).toBe(null)
})

test("the character a task falls to is read from the index", () => {
  const named = {
    characters: { c1: { label: "Durene", sortOrder: 10 }, c2: { label: "Amerys", sortOrder: 5 } },
    paths: {
      "daily-writs": {
        current: 7,
        total: 14,
        effectiveCharacterId: "c2",
        entries: { c1: { current: 7, total: 7 }, c2: { current: 0, total: 7 } },
      },
    },
  }
  const done = refreshedFor(WRITS, named, HELD, KNOWN, () => "minted")
  expect(done?.effectiveCharacter).toBe("c2")
})

test("a task the index names no character for falls to nobody", () => {
  const done = refreshedFor(WRITS, INDEX, HELD, KNOWN, () => "minted")
  expect(done?.effectiveCharacter).toBe(null)
})

test("rows come back in the order the reading gave them", () => {
  const done = refreshedFor(WRITS, INDEX, HELD, KNOWN, () => "minted")
  expect(done?.rows.map((one) => one.character)).toEqual([
    "temper-account-character/c2",
    "temper-account-character/c1",
  ])
})
