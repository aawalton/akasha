import { currencies } from "akasha/temper/items-core/modules/inventory-currency-data/inventory-currency-data.module.code.ts"
import type {
  CurrencyBalances,
  InventoryDatabase,
  InventoryItemData,
} from "akasha/temper/items-core/modules/inventory-types/inventory-types.module.code.ts"
import type {
  Landed,
  LandingDeps,
  PageKey,
  Tried,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"
import {
  contentIn,
  jsonlBodyOf,
  jsonRowOf,
  landOverAttempts,
  PAGE_LANDING_WRITER,
  pageBodyFor,
  pagePathIn,
  readingFor,
  rowsPathIn,
  triedFrom,
  writingFor,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"

const FOLDER = "temper/holdings/temper-inventory-snapshot/pages"

const DATA_PROPERTY = "data"

const LOCATIONS_PROPERTY = "locations"

const BAG_SIZES_PROPERTY = "bag-sizes"

const BAG_SIZES_KEY = "bagSizes"

const CRAFTING_LEVELS_PROPERTY = "crafting-levels"

const CRAFTING_LEVELS_KEY = "craftingLevels"

const PLACED_FURNISHINGS_PROPERTY = "placed-furnishings"

const PLACED_FURNISHINGS_KEY = "placedFurnishings"

const CURRENCIES_PROPERTY = "currencies"

const STACKS_PROPERTY = "stacks"

const CURRENCY_PAGE_TYPE = "temper-inventory-currency"

const ACCOUNT_SCOPES = ["account", "bank"] as const

const CHARACTER_SCOPE = "character"

const CURRENCY_ADDRESSES: ReadonlyMap<string, string> = new Map(
  currencies.ids.map((id) => [
    id,
    `${CURRENCY_PAGE_TYPE}/${currencies.data[id].name.toLowerCase().split(" ").join("-")}`,
  ])
)

const MS_PER_SECOND = 1000

const INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG = "temper-inventory-snapshot"

export interface SnapshotValues {
  readonly slug: string
  readonly accountPage: string
  readonly capturedAt: string
  readonly totalValue: number
  readonly chunkCount: number
  readonly inventory: InventoryDatabase
}

export function snapshotPagePath(slug: string): string {
  return pagePathIn(FOLDER, slug, INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG)
}

export function snapshotDataPath(slug: string): string {
  return `${FOLDER}/${slug}/${slug}.${INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG}.${DATA_PROPERTY}.json`
}

export function snapshotRowsPath(slug: string, property: string): string {
  return rowsPathIn(FOLDER, slug, INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG, property)
}

function instantOf(seconds: number): string {
  return new Date(seconds * MS_PER_SECOND).toISOString()
}

function locationIdsIn(values: SnapshotValues): readonly string[] {
  return Object.keys(values.inventory.locations).sort()
}

export function locationRowsOf(values: SnapshotValues, minted: () => string): string {
  const lines: string[] = []
  for (const locationId of locationIdsIn(values)) {
    const held = values.inventory.locations[locationId]
    if (held === undefined) continue
    lines.push(
      jsonRowOf([
        ["id", minted()],
        ["locationId", locationId],
        ["displayName", held.displayName],
        ["lastScannedAt", instantOf(held.lastScanned)],
      ])
    )
  }
  return jsonlBodyOf(lines)
}

export function bagSizeRowsOf(values: SnapshotValues, minted: () => string): string {
  const lines: string[] = []
  for (const locationId of locationIdsIn(values)) {
    const sizes = values.inventory.locations[locationId]?.bagSizes
    if (sizes === undefined) continue
    const bags = Object.keys(sizes)
      .map((one) => Number(one))
      .sort((one, two) => one - two)
    for (const bag of bags) {
      const size = sizes[bag]
      if (size === undefined) continue
      lines.push(
        jsonRowOf([
          ["id", minted()],
          ["locationId", locationId],
          ["bag", bag],
          ["bagSize", size],
        ])
      )
    }
  }
  return jsonlBodyOf(lines)
}

export function snapshotPageKeys(values: SnapshotValues): readonly PageKey[] {
  const { meta, transmuteCrystalAmount, transmuteCrystalCap } = values.inventory
  const keys: PageKey[] = [
    ["title", values.capturedAt],
    ["accountPage", values.accountPage],
    ["capturedAt", values.capturedAt],
    ["totalValue", values.totalValue],
    ["chunkCount", values.chunkCount],
  ]
  if (meta.lastFullScan > 0) {
    keys.push(["lastFullScanAt", new Date(meta.lastFullScan * MS_PER_SECOND).toISOString()])
  }
  if (meta.priceSource !== undefined) keys.push(["priceSource", meta.priceSource])
  if (transmuteCrystalAmount !== undefined) {
    keys.push(["transmuteCrystalAmount", transmuteCrystalAmount])
  }
  if (transmuteCrystalCap !== undefined) keys.push(["transmuteCrystalCap", transmuteCrystalCap])
  keys.push(
    [LOCATIONS_PROPERTY, "jsonl"],
    [BAG_SIZES_KEY, "jsonl"],
    [CRAFTING_LEVELS_KEY, "jsonl"],
    [PLACED_FURNISHINGS_KEY, "jsonl"],
    [CURRENCIES_PROPERTY, "jsonl"],
    [STACKS_PROPERTY, "jsonl"]
  )
  keys.push([DATA_PROPERTY, "json"])
  return keys
}

function numbersIn(held: Record<number, unknown>): readonly number[] {
  return Object.keys(held)
    .map((one) => Number(one))
    .sort((one, two) => one - two)
}

function stackRowOf(
  id: string,
  locationId: string,
  bag: number,
  slot: number,
  one: InventoryItemData
): string {
  return jsonRowOf([
    ["id", id],
    ["locationId", locationId],
    ["bag", bag],
    ["slot", slot],
    ["itemId", one.itemId],
    ["title", one.itemName],
    ["itemLink", one.itemLink],
    ["quality", one.quality],
    ["filterType", one.filterType],
    ["itemType", one.itemType],
    ["traitType", one.traitType],
    ["requiredLevel", one.requiredLevel],
    ["requiredCp", one.requiredCP],
    ["stackCount", one.stackCount],
    ["stolen", one.stolen ?? false],
    ["bound", one.bound ?? false],
    ["reconstructed", one.reconstructed ?? false],
    ["transmuted", one.transmuted ?? false],
    ["locked", one.locked ?? false],
    ["crafted", one.crafted ?? false],
    ["bopTradeable", one.bopTradeable ?? false],
    ["questRelevant", one.questRelevant ?? false],
    ["specializedItemType", one.specializedItemType],
    ["merchantValue", one.merchantValue],
    ["minPrice", one.minPrice],
    ["amountCount", one.amountCount],
    ["estimatedValue", one.estimatedValue],
    ["suggestedPrice", one.suggestedPrice],
    ["saleAvg", one.saleAvg],
    ["saleAmountCount", one.saleAmountCount],
    ["equipType", one.equipType],
    ["armorType", one.armorType],
    ["weaponType", one.weaponType],
    ["setId", one.setId],
    ["known", one.known],
    ["replacementCost", one.replacementCost],
    ["furnitureCategory", saidOnly(one.furnitureCategory)],
    ["furnitureCategoryId", one.furnitureCategoryId],
    ["furnitureSubcategoryId", one.furnitureSubcategoryId],
    ["isContainer", one.isContainer],
  ])
}

export function stackRowsOf(values: SnapshotValues, minted: () => string): string {
  const lines: string[] = []
  for (const locationId of locationIdsIn(values)) {
    const bags = values.inventory.locations[locationId]?.bags
    if (bags === undefined) continue
    for (const bag of numbersIn(bags)) {
      const slots = bags[bag]
      if (slots === undefined) continue
      for (const slot of numbersIn(slots)) {
        const one = slots[slot]
        if (one === undefined) continue
        lines.push(stackRowOf(minted(), locationId, bag, slot, one))
      }
    }
  }
  return jsonlBodyOf(lines)
}

function pursedIn(purse: CurrencyBalances): readonly (readonly [string, number])[] {
  const held: (readonly [string, number])[] = []
  for (const key of Object.keys(purse)) {
    const address = CURRENCY_ADDRESSES.get(key)
    const amount = purse[key]
    if (address === undefined || amount === undefined) continue
    held.push([address, amount])
  }
  return [...held].sort((one, two) => one[0].localeCompare(two[0]))
}

export function currencyRowsOf(values: SnapshotValues, minted: () => string): string {
  const held = values.inventory.currencies
  const lines: string[] = []
  if (held === undefined) return jsonlBodyOf(lines)
  for (const scope of ACCOUNT_SCOPES) {
    const purse = held[scope]
    if (purse === undefined) continue
    for (const [currencyKey, amount] of pursedIn(purse)) {
      lines.push(
        jsonRowOf([
          ["id", minted()],
          ["scope", scope],
          ["currencyKey", currencyKey],
          ["amount", amount],
        ])
      )
    }
  }
  for (const esoCharacterId of Object.keys(held.characters).sort()) {
    const one = held.characters[esoCharacterId]
    if (one === undefined) continue
    for (const [currencyKey, amount] of pursedIn(one.balances)) {
      lines.push(
        jsonRowOf([
          ["id", minted()],
          ["scope", CHARACTER_SCOPE],
          ["esoCharacterId", esoCharacterId],
          ["currencyKey", currencyKey],
          ["amount", amount],
          ["lastScannedAt", instantOf(one.lastScanned)],
        ])
      )
    }
  }
  return jsonlBodyOf(lines)
}

function saidOnly(value: string | undefined): string | undefined {
  return value === undefined || value === "" ? undefined : value
}

export function placedFurnishingRowsOf(values: SnapshotValues, minted: () => string): string {
  const lines: string[] = []
  for (const locationId of locationIdsIn(values)) {
    const placed = values.inventory.locations[locationId]?.placedFurnishings
    if (placed === undefined) continue
    for (const furnishingKey of Object.keys(placed).sort()) {
      const one = placed[furnishingKey]
      if (one === undefined) continue
      lines.push(
        jsonRowOf([
          ["id", minted()],
          ["locationId", locationId],
          ["furnishingKey", furnishingKey],
          ["title", one.itemName],
          ["quality", one.quality],
          ["itemLink", saidOnly(one.itemLink)],
          ["collectibleLink", saidOnly(one.collectibleLink)],
          ["saleAvg", one.saleAvg],
          ["minPrice", one.minPrice],
          ["amountCount", one.amountCount],
          ["saleAmountCount", one.saleAmountCount],
          ["suggestedPrice", one.suggestedPrice],
          ["estimatedValue", one.estimatedValue],
        ])
      )
    }
  }
  return jsonlBodyOf(lines)
}

export function craftingLevelRowsOf(values: SnapshotValues, minted: () => string): string {
  const held = values.inventory.craftingLevels ?? {}
  const lines: string[] = []
  for (const esoCharacterId of Object.keys(held).sort()) {
    const crafts = held[esoCharacterId]
    if (crafts === undefined) continue
    const ids = Object.keys(crafts)
      .map((one) => Number(one))
      .sort((one, two) => one - two)
    for (const craftTypeId of ids) {
      const craftingLevel = crafts[craftTypeId]
      if (craftingLevel === undefined) continue
      lines.push(
        jsonRowOf([
          ["id", minted()],
          ["esoCharacterId", esoCharacterId],
          ["craftTypeId", craftTypeId],
          ["craftingLevel", craftingLevel],
        ])
      )
    }
  }
  return jsonlBodyOf(lines)
}

export function snapshotPageBody(values: SnapshotValues, id: string): string {
  return pageBodyFor(
    FOLDER,
    INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG,
    values.slug,
    id,
    snapshotPageKeys(values)
  )
}

function snapshotCommitMessage(values: SnapshotValues): string {
  return `temper: the inventory scan taken at ${values.capturedAt}`
}

export async function landInventorySnapshot(
  values: SnapshotValues,
  minted: () => string,
  deps: LandingDeps = {}
): Promise<Landed> {
  const read = readingFor(deps)
  const write = writingFor(deps)
  const pagePath = snapshotPagePath(values.slug)
  const dataPath = snapshotDataPath(values.slug)
  const tryOnce = async (): Promise<Tried> => {
    const found = await read([pagePath])
    if (!found.ok) return { outcome: "again", why: found.why }
    if (contentIn(found.bodies, pagePath) !== null) return { outcome: "already", at: found.at }
    const puts = [
      { path: pagePath, content: snapshotPageBody(values, minted()) },
      {
        path: snapshotRowsPath(values.slug, LOCATIONS_PROPERTY),
        content: locationRowsOf(values, minted),
      },
      {
        path: snapshotRowsPath(values.slug, BAG_SIZES_PROPERTY),
        content: bagSizeRowsOf(values, minted),
      },
      {
        path: snapshotRowsPath(values.slug, CRAFTING_LEVELS_PROPERTY),
        content: craftingLevelRowsOf(values, minted),
      },
      {
        path: snapshotRowsPath(values.slug, PLACED_FURNISHINGS_PROPERTY),
        content: placedFurnishingRowsOf(values, minted),
      },
      {
        path: snapshotRowsPath(values.slug, CURRENCIES_PROPERTY),
        content: currencyRowsOf(values, minted),
      },
      {
        path: snapshotRowsPath(values.slug, STACKS_PROPERTY),
        content: stackRowsOf(values, minted),
      },
      { path: dataPath, content: JSON.stringify(values.inventory) },
    ]
    return triedFrom(
      await write(
        puts,
        PAGE_LANDING_WRITER,
        snapshotCommitMessage(values),
        undefined,
        undefined,
        found.at
      )
    )
  }
  return landOverAttempts(`no attempt to land a scan on ${pagePath} was made`, tryOnce, deps)
}
