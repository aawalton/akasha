import { expect, test } from "bun:test"
import type { InventoryDatabase } from "akasha/temper/items-core/modules/inventory-types/inventory-types.module.code.ts"
import {
  landInventorySnapshot,
  type SnapshotValues,
  snapshotDataPath,
  snapshotPageBody,
  snapshotPageKeys,
  snapshotPagePath,
} from "akasha/temper/watcher/modules/watcher-inventory-snapshot-landing/watcher-inventory-snapshot-landing.module.code.ts"
import type {
  ReadFiles,
  WriteFiles,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"

const SLUG = "at-2026-09-15-18-07-48"

const SCAN: InventoryDatabase = {
  locations: {},
  meta: {
    displayName: "@Alanarre",
    worldName: "NA Megaserver",
    lastFullScan: 1789495668,
    priceSource: "ttc",
  },
  transmuteCrystalAmount: 2119,
  transmuteCrystalCap: 3000,
}

const VALUES: SnapshotValues = {
  slug: SLUG,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  capturedAt: "2026-09-15T18:07:48.000Z",
  totalValue: 493345139,
  chunkCount: 2,
  inventory: SCAN,
}

const PAGE_PATH = snapshotPagePath(SLUG)

const DATA_PATH = snapshotDataPath(SLUG)

function keysOf(values: SnapshotValues): Record<string, string | number | boolean> {
  return Object.fromEntries(snapshotPageKeys(values))
}

const missingBoth: ReadFiles = async (paths) => ({
  ok: true,
  at: "c1",
  bodies: paths.map((path) => ({ path, content: null })),
  unplaced: [],
})

test("the page and its data file sit in the snapshot's own folder", () => {
  expect(PAGE_PATH).toBe(
    `temper/holdings/temper-inventory-snapshot/pages/${SLUG}/${SLUG}.temper-inventory-snapshot.ts`
  )
  expect(DATA_PATH).toBe(
    `temper/holdings/temper-inventory-snapshot/pages/${SLUG}/${SLUG}.temper-inventory-snapshot.data.json`
  )
})

test("a page states what the scan carries", () => {
  expect(keysOf(VALUES)).toEqual({
    title: "2026-09-15T18:07:48.000Z",
    accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
    capturedAt: "2026-09-15T18:07:48.000Z",
    totalValue: 493345139,
    chunkCount: 2,
    lastFullScanAt: "2026-09-15T18:07:48.000Z",
    priceSource: "ttc",
    transmuteCrystalAmount: 2119,
    transmuteCrystalCap: 3000,
    data: "json",
  })
})

test("a value the scan does not carry is left off the page", () => {
  const bare: SnapshotValues = {
    ...VALUES,
    inventory: {
      locations: {},
      meta: { displayName: "@Alanarre", worldName: "NA Megaserver", lastFullScan: 0 },
    },
  }
  const keys = keysOf(bare)
  expect(Object.hasOwn(keys, "lastFullScanAt")).toBe(false)
  expect(Object.hasOwn(keys, "priceSource")).toBe(false)
  expect(Object.hasOwn(keys, "transmuteCrystalAmount")).toBe(false)
  expect(keys.data).toBe("json")
})

test("a page body names the page type and the slug", () => {
  const body = snapshotPageBody(VALUES, "01a0-id")
  expect(body).toContain('type: "page-type/temper-inventory-snapshot"')
  expect(body).toContain(`slug: "${SLUG}"`)
  expect(body).toContain('id: "01a0-id"')
})

test("the page and the data file land together in one write", async () => {
  let written: readonly { path: string; content: string }[] = []
  const write: WriteFiles = async (puts) => {
    written = puts as readonly { path: string; content: string }[]
    return { ok: true, at: "c2" }
  }
  const landed = await landInventorySnapshot(VALUES, () => "id-1", {
    read: missingBoth,
    write,
  })
  expect(landed).toEqual({ outcome: "landed", at: "c2" })
  expect(written.map((one) => one.path)).toEqual([PAGE_PATH, DATA_PATH])
  expect(JSON.parse(written[1]?.content ?? "null")).toEqual(SCAN)
})

test("a scan whose page is filed already is left alone", async () => {
  const held: ReadFiles = async (paths) => ({
    ok: true,
    at: "c3",
    bodies: paths.map((path) => ({ path, content: path === PAGE_PATH ? "held" : null })),
    unplaced: [],
  })
  let wrote = false
  const write: WriteFiles = async () => {
    wrote = true
    return { ok: true, at: "c4" }
  }
  expect(await landInventorySnapshot(VALUES, () => "id-2", { read: held, write })).toEqual({
    outcome: "already",
    at: "c3",
  })
  expect(wrote).toBe(false)
})

test("a store that will not answer is refused rather than written to", async () => {
  const refused: ReadFiles = async () => ({ ok: false, why: "the store was unreachable" })
  let wrote = false
  const write: WriteFiles = async () => {
    wrote = true
    return { ok: true, at: "c5" }
  }
  const landed = await landInventorySnapshot(VALUES, () => "id-3", {
    read: refused,
    write,
    waiting: async () => undefined,
  })
  expect(landed.outcome).toBe("refused")
  expect(wrote).toBe(false)
})
