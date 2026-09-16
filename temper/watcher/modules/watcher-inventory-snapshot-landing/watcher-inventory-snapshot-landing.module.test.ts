import { expect, test } from "bun:test"
import type { InventoryDatabase } from "akasha/temper/items-core/modules/inventory-types/inventory-types.module.code.ts"
import {
  bagSizeRowsOf,
  craftingLevelRowsOf,
  currencyRowsOf,
  landInventorySnapshot,
  locationRowsOf,
  placedFurnishingRowsOf,
  type SnapshotValues,
  snapshotDataPath,
  snapshotPageBody,
  snapshotPageKeys,
  snapshotPagePath,
  snapshotRowsPath,
  stackRowsOf,
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

const LOCATIONS_PATH = snapshotRowsPath(SLUG, "locations")

const BAG_SIZES_PATH = snapshotRowsPath(SLUG, "bag-sizes")

const CRAFTING_LEVELS_PATH = snapshotRowsPath(SLUG, "crafting-levels")

const PLACED_FURNISHINGS_PATH = snapshotRowsPath(SLUG, "placed-furnishings")

const CURRENCIES_PATH = snapshotRowsPath(SLUG, "currencies")

const STACKS_PATH = snapshotRowsPath(SLUG, "stacks")

const WORN_SCANNED = 1789495000

const WORN: SnapshotValues = {
  ...VALUES,
  inventory: {
    ...SCAN,
    locations: {
      Bank: {
        displayName: "Bank",
        lastScanned: WORN_SCANNED,
        bags: {
          1: {
            4: {
              itemId: 205386,
              itemName: "The Shadow Queen's Cowl",
              itemLink: "|H1:item:205386|h|h",
              quality: 6,
              filterType: 2,
              itemType: 2,
              traitType: 14,
              requiredLevel: 50,
              requiredCP: 160,
              stackCount: 1,
              bound: true,
              setId: 761,
            },
          },
          0: {
            2: {
              itemId: 45855,
              itemName: "Rubedite Ore",
              itemLink: "|H1:item:45855|h|h",
              quality: 1,
              filterType: 6,
              itemType: 43,
              traitType: 0,
              requiredLevel: 1,
              requiredCP: 0,
              stackCount: 200,
              minPrice: 27,
            },
          },
        },
      },
    },
  },
}

const PURSE_SCANNED = 1789495668

const PURSES: SnapshotValues = {
  ...VALUES,
  inventory: {
    ...SCAN,
    currencies: {
      account: { transmuteCrystals: 1889, archivalFortunes: 322940 },
      bank: { telvarStones: 425674, gold: 23138989 },
      characters: {
        "8796093022338107": {
          displayName: "Erin Solstice",
          lastScanned: PURSE_SCANNED,
          balances: { gold: 1876306 },
        },
      },
    },
  },
}

const HOME = "House:Grand Psijic Villa"

const LIGHT_CHERRY = "4629427828252784845"

const PINK_CHERRY = "4629427828252784846"

const ERIN_SCANNED = 1789495668

const BANK_SCANNED = 1789495000

const EMBER_SCANNED = 1789400000

const MS = 1000

const HELD: SnapshotValues = {
  ...VALUES,
  inventory: {
    ...SCAN,
    craftingLevels: {
      "8796093022338107": { 1: 10, 7: 5 },
      "8796093022613905": { 2: 3 },
    },
    locations: {
      "8796093022338107": {
        bags: {},
        bagSizes: { 0: 23, 1: 215 },
        displayName: "Erin Solstice",
        lastScanned: ERIN_SCANNED,
      },
      Bank: { bags: {}, bagSizes: { 1: 240 }, displayName: "Bank", lastScanned: BANK_SCANNED },
      "Companion:Ember": { bags: {}, displayName: "Ember", lastScanned: EMBER_SCANNED },
    },
  },
}

const HOMES: SnapshotValues = {
  ...VALUES,
  inventory: {
    ...SCAN,
    locations: {
      [HOME]: {
        bags: {},
        displayName: "Grand Psijic Villa",
        lastScanned: BANK_SCANNED,
        placedFurnishings: {
          [PINK_CHERRY]: {
            itemName: "Tree, Tiered Pink Cherry",
            quality: 4,
            itemLink: "|H1:item:120665|h|h",
            collectibleLink: "",
          },
          [LIGHT_CHERRY]: {
            itemName: "Tree, Tiered Light Cherry",
            quality: 4,
            itemLink: "",
            collectibleLink: "|H1:collectible:9|h|h",
            estimatedValue: 1200,
          },
        },
      },
    },
  },
}

function rowsIn(body: string): readonly unknown[] {
  return body
    .split("\n")
    .filter((one) => one !== "")
    .map((one) => JSON.parse(one) as unknown)
}

function counting(prefix: string): () => string {
  let at = 0
  return () => {
    at += 1
    return `${prefix}${at}`
  }
}

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
    locations: "jsonl",
    bagSizes: "jsonl",
    craftingLevels: "jsonl",
    placedFurnishings: "jsonl",
    currencies: "jsonl",
    stacks: "jsonl",
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
  expect(written.map((one) => one.path)).toEqual([
    PAGE_PATH,
    LOCATIONS_PATH,
    BAG_SIZES_PATH,
    CRAFTING_LEVELS_PATH,
    PLACED_FURNISHINGS_PATH,
    CURRENCIES_PATH,
    STACKS_PATH,
    DATA_PATH,
  ])
  expect(JSON.parse(written[7]?.content ?? "null")).toEqual(SCAN)
})

test("every slot holding something becomes a row, bag by bag and slot by slot", () => {
  expect(rowsIn(stackRowsOf(WORN, counting("s")))).toEqual([
    {
      id: "s1",
      locationId: "Bank",
      bag: 0,
      slot: 2,
      itemId: 45855,
      title: "Rubedite Ore",
      itemLink: "|H1:item:45855|h|h",
      quality: 1,
      filterType: 6,
      itemType: 43,
      traitType: 0,
      requiredLevel: 1,
      requiredCp: 0,
      stackCount: 200,
      stolen: false,
      bound: false,
      reconstructed: false,
      transmuted: false,
      locked: false,
      crafted: false,
      bopTradeable: false,
      questRelevant: false,
      minPrice: 27,
    },
    {
      id: "s2",
      locationId: "Bank",
      bag: 1,
      slot: 4,
      itemId: 205386,
      title: "The Shadow Queen's Cowl",
      itemLink: "|H1:item:205386|h|h",
      quality: 6,
      filterType: 2,
      itemType: 2,
      traitType: 14,
      requiredLevel: 50,
      requiredCp: 160,
      stackCount: 1,
      stolen: false,
      bound: true,
      reconstructed: false,
      transmuted: false,
      locked: false,
      crafted: false,
      bopTradeable: false,
      questRelevant: false,
      setId: 761,
    },
  ])
  expect(stackRowsOf(VALUES, counting("s"))).toBe("")
})

test("each purse becomes a row naming the currency's own page", () => {
  expect(rowsIn(currencyRowsOf(PURSES, counting("p")))).toEqual([
    {
      id: "p1",
      scope: "account",
      currencyKey: "temper-inventory-currency/archival-fortunes",
      amount: 322940,
    },
    {
      id: "p2",
      scope: "account",
      currencyKey: "temper-inventory-currency/transmute-crystals",
      amount: 1889,
    },
    { id: "p3", scope: "bank", currencyKey: "temper-inventory-currency/gold", amount: 23138989 },
    {
      id: "p4",
      scope: "bank",
      currencyKey: "temper-inventory-currency/tel-var-stones",
      amount: 425674,
    },
    {
      id: "p5",
      scope: "character",
      esoCharacterId: "8796093022338107",
      currencyKey: "temper-inventory-currency/gold",
      amount: 1876306,
      lastScannedAt: new Date(PURSE_SCANNED * MS).toISOString(),
    },
  ])
  expect(currencyRowsOf(VALUES, counting("p"))).toBe("")
})

test("each furnishing placed in a home becomes a row without its empty links", () => {
  expect(rowsIn(placedFurnishingRowsOf(HOMES, counting("f")))).toEqual([
    {
      id: "f1",
      locationId: HOME,
      furnishingKey: LIGHT_CHERRY,
      title: "Tree, Tiered Light Cherry",
      quality: 4,
      collectibleLink: "|H1:collectible:9|h|h",
      estimatedValue: 1200,
    },
    {
      id: "f2",
      locationId: HOME,
      furnishingKey: PINK_CHERRY,
      title: "Tree, Tiered Pink Cherry",
      quality: 4,
      itemLink: "|H1:item:120665|h|h",
    },
  ])
  expect(placedFurnishingRowsOf(HELD, counting("f"))).toBe("")
})

test("each craft of each character becomes a row", () => {
  expect(rowsIn(craftingLevelRowsOf(HELD, counting("c")))).toEqual([
    { id: "c1", esoCharacterId: "8796093022338107", craftTypeId: 1, craftingLevel: 10 },
    { id: "c2", esoCharacterId: "8796093022338107", craftTypeId: 7, craftingLevel: 5 },
    { id: "c3", esoCharacterId: "8796093022613905", craftTypeId: 2, craftingLevel: 3 },
  ])
  expect(craftingLevelRowsOf(VALUES, counting("c"))).toBe("")
})

test("a holder becomes one row saying when that holder was last read", () => {
  expect(rowsIn(locationRowsOf(HELD, counting("r")))).toEqual([
    {
      id: "r1",
      locationId: "8796093022338107",
      displayName: "Erin Solstice",
      lastScannedAt: new Date(ERIN_SCANNED * MS).toISOString(),
    },
    {
      id: "r2",
      locationId: "Bank",
      displayName: "Bank",
      lastScannedAt: new Date(BANK_SCANNED * MS).toISOString(),
    },
    {
      id: "r3",
      locationId: "Companion:Ember",
      displayName: "Ember",
      lastScannedAt: new Date(EMBER_SCANNED * MS).toISOString(),
    },
  ])
})

test("each bag of each holder becomes a row, and a holder with no bag sizes has none", () => {
  expect(rowsIn(bagSizeRowsOf(HELD, counting("b")))).toEqual([
    { id: "b1", locationId: "8796093022338107", bag: 0, bagSize: 23 },
    { id: "b2", locationId: "8796093022338107", bag: 1, bagSize: 215 },
    { id: "b3", locationId: "Bank", bag: 1, bagSize: 240 },
  ])
})

test("a scan holding no bag holder files no row at all", () => {
  expect(locationRowsOf(VALUES, () => "r")).toBe("")
  expect(bagSizeRowsOf(VALUES, () => "b")).toBe("")
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
