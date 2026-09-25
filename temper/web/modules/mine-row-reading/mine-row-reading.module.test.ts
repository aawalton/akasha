import { expect, test } from "bun:test"
import { eso } from "akasha/temper/player/character/temper-mine/pages/eso/eso.temper-mine.ts"
import { temperMine } from "akasha/temper/player/character/temper-mine/temper-mine.page-type.ts"
import {
  type MineReading,
  mineRowsKeyed,
  mineRowsNamed,
} from "akasha/temper/web/modules/mine-row-reading/mine-row-reading.module.code.ts"

const PAGE = "temper/player/character/temper-mine/pages/eso/eso.temper-mine.ts"

const MINE = `${temperMine.slug}/${eso.slug}`

const ITEMS = "temper/player/character/temper-mine/pages/eso/eso.temper-mine.items.jsonl"

const ITEMS_TWO = "temper/player/character/temper-mine/pages/eso/eso.temper-mine.items.part2.jsonl"

const ITEMS_THREE =
  "temper/player/character/temper-mine/pages/eso/eso.temper-mine.items.part3.jsonl"

const SPANS = "temper/player/character/temper-mine/pages/eso/eso.temper-mine.part-spans.jsonl"

const RING = { id: "r", itemId: 70, name: "Cured Ring", hasSet: true, quality: 3 }

const BOOTS = { id: "b", itemId: 71, name: "Boots", hasSet: false, quality: 1 }

const BAND = { id: "d", itemId: 90, name: "Iron Ring", hasSet: false, quality: 2 }

function bodyOf(rows: readonly object[]): string {
  return rows.map((one) => `${JSON.stringify(one)}\n`).join("")
}

function readingOver(files: Map<string, string>, asked: string[] = []): MineReading {
  return {
    readPages: async (pages) => ({
      ok: true,
      at: "c1",
      bodies: pages.map(() => ({ path: PAGE, content: "" })),
      unplaced: [],
    }),
    readFiles: async (paths) => {
      asked.push(...paths)
      return {
        ok: true,
        at: "c1",
        bodies: paths.map((path) => ({ path, content: files.get(path) ?? null })),
        unplaced: [],
      }
    },
  }
}

const FILES = new Map([
  [ITEMS, bodyOf([RING, BOOTS])],
  [ITEMS_TWO, bodyOf([BAND])],
])

test("a row found by key comes back with the numbers and flags its line holds", async () => {
  const read = await mineRowsKeyed("items", "itemId", [71], readingOver(FILES))
  expect(read).toEqual({ ok: true, rows: [BOOTS] })
})

test("rows found by key are read across every part", async () => {
  const read = await mineRowsKeyed("items", "itemId", [90, 70, 5], readingOver(FILES))
  expect(read).toEqual({ ok: true, rows: [RING, BAND] })
})

test("parts stop being read once every key asked for is found", async () => {
  const asked: string[] = []
  await mineRowsKeyed("items", "itemId", [70], readingOver(FILES, asked))
  expect(asked).toEqual([SPANS, ITEMS])
})

function spanned(rows: readonly object[]): Map<string, string> {
  return new Map([...FILES, [SPANS, bodyOf(rows)]])
}

const ITEM_SPANS = [
  { id: "s1", propertySlug: "items", part: 1, firstKey: 70, lastKey: 71 },
  { id: "s2", propertySlug: "items", part: 2, firstKey: 90, lastKey: 90 },
  { id: "s3", propertySlug: "quests", part: 1, firstKey: 1, lastKey: 99 },
]

test("a part whose span holds no key asked for is passed over", async () => {
  const asked: string[] = []
  const read = await mineRowsKeyed("items", "itemId", [90], readingOver(spanned(ITEM_SPANS), asked))
  expect(read).toEqual({ ok: true, rows: [BAND] })
  expect(asked).toEqual([SPANS, ITEMS_TWO])
})

test("a key no span holds reads only the part past every span", async () => {
  const asked: string[] = []
  const read = await mineRowsKeyed("items", "itemId", [80], readingOver(spanned(ITEM_SPANS), asked))
  expect(read).toEqual({ ok: true, rows: [] })
  expect(asked).toEqual([SPANS, ITEMS_THREE])
})

test("a part past every span is read, since no span has been written for it", async () => {
  const later = { id: "l", itemId: 80, name: "Later", hasSet: false, quality: 1 }
  const files = spanned(ITEM_SPANS).set(ITEMS_THREE, bodyOf([later]))
  const read = await mineRowsKeyed("items", "itemId", [80], readingOver(files))
  expect(read).toEqual({ ok: true, rows: [later] })
})

test("the spans of another entry are no spans of this one", async () => {
  const quests = [{ id: "s3", propertySlug: "quests", part: 1, firstKey: 1, lastKey: 2 }]
  const read = await mineRowsKeyed("items", "itemId", [70], readingOver(spanned(quests)))
  expect(read).toEqual({ ok: true, rows: [RING] })
})

test("a key written inside another value's text finds no row", async () => {
  const quoted = { id: "q", itemId: 9, flavorText: 'say ,"itemId":72,' }
  const files = new Map([[ITEMS, bodyOf([quoted])]])
  const read = await mineRowsKeyed("items", "itemId", [72], readingOver(files))
  expect(read).toEqual({ ok: true, rows: [] })
})

test("a row found by name holds the text asked for, whatever the case", async () => {
  const read = await mineRowsNamed("items", "ring", 20, readingOver(FILES))
  expect(read).toEqual({ ok: true, rows: [RING, BAND] })
})

test("a name search stops once as many rows as asked for are found", async () => {
  const asked: string[] = []
  const read = await mineRowsNamed("items", "RING", 1, readingOver(FILES, asked))
  expect(read).toEqual({ ok: true, rows: [RING] })
  expect(asked).toEqual([ITEMS])
})

test("text held only outside the name finds no row", async () => {
  const read = await mineRowsNamed("items", "itemId", 20, readingOver(FILES))
  expect(read).toEqual({ ok: true, rows: [] })
})

test("a part that will not come back refuses the read and names the part", async () => {
  const reading = readingOver(FILES)
  const read = await mineRowsNamed("items", "ring", 20, {
    ...reading,
    readFiles: async () => ({ ok: false, why: "the store was busy" }),
  })
  expect(read).toEqual({ ok: false, why: `\`${ITEMS}\` did not come back: the store was busy` })
})

test("a mine the store has no page for is refused and named", async () => {
  const reading = readingOver(FILES)
  const read = await mineRowsNamed("items", "ring", 20, {
    ...reading,
    readPages: async () => ({ ok: true, at: "c1", bodies: [], unplaced: [MINE] }),
  })
  expect(read).toEqual({ ok: false, why: `no page is at \`${MINE}\`` })
})
