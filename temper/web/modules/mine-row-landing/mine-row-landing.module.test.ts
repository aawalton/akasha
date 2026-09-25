import { expect, test } from "bun:test"
import { ENTRY_CEILING } from "akasha/page/modules/entry-ceiling/entry-ceiling.module.code.ts"
import type { Put } from "akasha/page/query/modules/store-writing/store-writing.module.code.ts"
import { eso } from "akasha/temper/player/character/temper-mine/pages/eso/eso.temper-mine.ts"
import { temperMine } from "akasha/temper/player/character/temper-mine/temper-mine.page-type.ts"
import {
  landMineRows,
  MINE_PAGE_TYPE,
  type MineLanding,
  storedItemOf,
  storedQuestOf,
} from "akasha/temper/web/modules/mine-row-landing/mine-row-landing.module.code.ts"

const PAGE = "temper/player/character/temper-mine/pages/eso/eso.temper-mine.ts"

const ITEMS = "temper/player/character/temper-mine/pages/eso/eso.temper-mine.items.jsonl"

const ITEMS_TWO = "temper/player/character/temper-mine/pages/eso/eso.temper-mine.items.part2.jsonl"

const MINE = `${temperMine.slug}/${eso.slug}`

type Wrote = { readonly puts: readonly Put[]; readonly read: string | null }

function landingOver(files: Map<string, string>, wrote: Wrote[], refusing = false): MineLanding {
  let minted = 0
  return {
    readPages: async (pages) => ({
      ok: true,
      at: "c1",
      bodies: pages.map(() => ({ path: PAGE, content: "" })),
      unplaced: [],
    }),
    readFiles: async (paths) => ({
      ok: true,
      at: "c1",
      bodies: paths.map((path) => ({ path, content: files.get(path) ?? null })),
      unplaced: [],
    }),
    writeFiles: async (puts, _writer, _message, _fetcher, _rest, read) => {
      wrote.push({ puts, read: read ?? null })
      if (refusing) return { ok: false, why: "the store was busy" }
      for (const one of puts) files.set(one.path, one.content)
      return { ok: true, at: "c2" }
    },
    waiting: async () => undefined,
    minted: () => `minted-${++minted}`,
  }
}

function linesAt(files: Map<string, string>, path: string): readonly Record<string, unknown>[] {
  return (files.get(path) ?? "")
    .split("\n")
    .filter((one) => one !== "")
    .map((one) => JSON.parse(one) as Record<string, unknown>)
}

const HELD_LINE = '{"id":"held-1","title":"Old Ring","itemId":70,"name":"Old Ring"}'

const OTHER_LINE = '{"id":"held-2","title":"Other","itemId":71,"name":"Other"}'

test("the mine is a page of the temper-mine page type", () => {
  expect(MINE_PAGE_TYPE).toBe(temperMine.slug)
})

test("a stored item is titled by its name and marked with the time it was kept", () => {
  const stored = storedItemOf({ itemId: 70, name: "Ring", icon: "a.dds", stray: 1 }, 5)
  expect(stored.title).toBe("Ring")
  expect(stored.name).toBe("Ring")
  expect(stored.minedAt).toBe(5)
  expect(stored.itemId).toBe(70)
  expect("stray" in stored).toBe(false)
})

test("a stored quest is titled by its name and keeps no name of its own", () => {
  const stored = storedQuestOf(
    { questId: 30, name: "Quest", questType: 0, repeatableType: 1, zoneId: 2, zoneName: "Z" },
    5
  )
  expect(JSON.parse(JSON.stringify(stored))).toEqual({
    title: "Quest",
    minedAt: 5,
    questId: 30,
    questType: 0,
    repeatableType: 1,
    zoneId: 2,
    zoneName: "Z",
  })
})

test("a row with a key the mine has not got is appended with an id of its own", async () => {
  const files = new Map([[ITEMS, `${HELD_LINE}\n`]])
  const wrote: Wrote[] = []
  const kept = await landMineRows(
    { property: "items", key: "itemId", rows: [{ itemId: 72, name: "New" }] },
    landingOver(files, wrote)
  )
  expect(kept).toEqual({ ok: true, kept: 1 })
  expect(linesAt(files, ITEMS)).toEqual([
    JSON.parse(HELD_LINE),
    { id: "minted-1", itemId: 72, name: "New" },
  ])
})

test("a row with a key the mine has replaces that row and keeps the row's id", async () => {
  const files = new Map([[ITEMS, `${HELD_LINE}\n${OTHER_LINE}\n`]])
  const wrote: Wrote[] = []
  const kept = await landMineRows(
    { property: "items", key: "itemId", rows: [{ itemId: 70, name: "New Ring" }] },
    landingOver(files, wrote)
  )
  expect(kept).toEqual({ ok: true, kept: 1 })
  expect(linesAt(files, ITEMS)).toEqual([
    { id: "held-1", itemId: 70, name: "New Ring" },
    JSON.parse(OTHER_LINE),
  ])
})

test("posting the same rows again leaves one row for each key", async () => {
  const files = new Map([[ITEMS, `${HELD_LINE}\n`]])
  const wrote: Wrote[] = []
  const landing = landingOver(files, wrote)
  const rows = [{ itemId: 72, name: "New" }]
  await landMineRows({ property: "items", key: "itemId", rows }, landing)
  await landMineRows({ property: "items", key: "itemId", rows }, landing)
  expect(linesAt(files, ITEMS).map((one) => one.itemId)).toEqual([70, 72])
})

test("a key posted twice in one batch is kept once, and the later row remains", async () => {
  const files = new Map<string, string>()
  const wrote: Wrote[] = []
  const kept = await landMineRows(
    {
      property: "items",
      key: "itemId",
      rows: [
        { itemId: 72, name: "First" },
        { itemId: 72, name: "Second" },
      ],
    },
    landingOver(files, wrote)
  )
  expect(kept).toEqual({ ok: true, kept: 1 })
  expect(linesAt(files, ITEMS)).toEqual([{ id: "minted-1", itemId: 72, name: "Second" }])
})

test("a key read inside another value's text is no key", async () => {
  const quoted = '{"id":"held-3","flavorText":"say \\",\\"itemId\\":72,\\"","itemId":9}'
  const files = new Map([[ITEMS, `${quoted}\n`]])
  const wrote: Wrote[] = []
  await landMineRows(
    { property: "items", key: "itemId", rows: [{ itemId: 72, name: "New" }] },
    landingOver(files, wrote)
  )
  expect(linesAt(files, ITEMS).map((one) => one.id)).toEqual(["held-3", "minted-1"])
})

test("a write states the commit the parts were read at", async () => {
  const files = new Map([[ITEMS, `${HELD_LINE}\n`]])
  const wrote: Wrote[] = []
  await landMineRows(
    { property: "items", key: "itemId", rows: [{ itemId: 70, name: "New" }] },
    landingOver(files, wrote)
  )
  expect(wrote.map((one) => one.read)).toEqual(["c1"])
  expect(wrote[0]?.puts.map((one) => one.path)).toEqual([ITEMS])
})

test("a row that would carry the last part past the ceiling starts the next part", async () => {
  const filler = `{"id":"f","itemId":1,"flavorText":"${"x".repeat(ENTRY_CEILING - 60)}"}`
  const files = new Map([[ITEMS, `${filler}\n`]])
  const wrote: Wrote[] = []
  await landMineRows(
    { property: "items", key: "itemId", rows: [{ itemId: 72, name: "New" }] },
    landingOver(files, wrote)
  )
  expect(wrote[0]?.puts.map((one) => one.path)).toEqual([ITEMS_TWO])
  expect(linesAt(files, ITEMS_TWO)).toEqual([{ id: "minted-1", itemId: 72, name: "New" }])
})

test("a row replaced in a later part is found there", async () => {
  const files = new Map([
    [ITEMS, `${OTHER_LINE}\n`],
    [ITEMS_TWO, `${HELD_LINE}\n`],
  ])
  const wrote: Wrote[] = []
  await landMineRows(
    { property: "items", key: "itemId", rows: [{ itemId: 70, name: "New Ring" }] },
    landingOver(files, wrote)
  )
  expect(wrote[0]?.puts.map((one) => one.path)).toEqual([ITEMS_TWO])
  expect(linesAt(files, ITEMS_TWO)).toEqual([{ id: "held-1", itemId: 70, name: "New Ring" }])
})

test("no row posted writes nothing and keeps none", async () => {
  const wrote: Wrote[] = []
  const kept = await landMineRows(
    { property: "items", key: "itemId", rows: [] },
    landingOver(new Map(), wrote)
  )
  expect(kept).toEqual({ ok: true, kept: 0 })
  expect(wrote).toEqual([])
})

test("a write the store keeps refusing keeps nothing and says why", async () => {
  const wrote: Wrote[] = []
  const kept = await landMineRows(
    { property: "items", key: "itemId", rows: [{ itemId: 72, name: "New" }] },
    landingOver(new Map(), wrote, true)
  )
  expect(kept).toEqual({ ok: false, why: "the store was busy — 4 attempts were spent" })
})

test("a mine the store has no page for keeps nothing and names the page", async () => {
  const landing = landingOver(new Map(), [])
  const kept = await landMineRows(
    { property: "quests", key: "questId", rows: [{ questId: 30, name: "Q" }] },
    {
      ...landing,
      readPages: async () => ({ ok: true, at: "c1", bodies: [], unplaced: [MINE] }),
    }
  )
  expect(kept).toEqual({ ok: false, why: `no page is at \`${MINE}\`` })
})
