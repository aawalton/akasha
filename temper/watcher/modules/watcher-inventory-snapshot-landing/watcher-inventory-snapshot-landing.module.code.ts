import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import {
  type UpsertPageArgs,
  upsertPage,
} from "akasha/page/access/modules/upsert/upsert.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import {
  readPages,
  writeFiles,
} from "akasha/page/query/modules/store-writing/store-writing.module.code.ts"
import { currencies } from "akasha/temper/items-core/modules/inventory-currency-data/inventory-currency-data.module.code.ts"
import type {
  CurrencyBalances,
  InventoryDatabase,
  InventoryItemData,
} from "akasha/temper/items-core/modules/inventory-types/inventory-types.module.code.ts"
import { ACCOUNT_PAGE_TYPE_SLUG } from "akasha/temper/watcher/modules/watcher-account-page/watcher-account-page.module.code.ts"
import type {
  Landed,
  ReadPages,
  Tried,
  Waiting,
  WriteFiles,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"
import {
  besidePathOf,
  jsonlBodyOf,
  jsonRowOf,
  landOverAttempts,
  noPagePathWhy,
  PAGE_LANDING_WRITER,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"

const LOCATIONS_PROPERTY = "locations"

const BAG_SIZES_PROPERTY = "bag-sizes"

const CRAFTING_LEVELS_PROPERTY = "crafting-levels"

const PLACED_FURNISHINGS_PROPERTY = "placed-furnishings"

const CURRENCIES_PROPERTY = "currencies"

const STACKS_PROPERTY = "stacks"

const ROWS_ENDING = "jsonl"

const DATA_PROPERTY = "data"

const DATA_ENDING = "json"

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

const ROW_PROPERTIES = [
  LOCATIONS_PROPERTY,
  BAG_SIZES_PROPERTY,
  CRAFTING_LEVELS_PROPERTY,
  PLACED_FURNISHINGS_PROPERTY,
  CURRENCIES_PROPERTY,
  STACKS_PROPERTY,
] as const

export interface InventoryValues {
  readonly accountSlug: string
  readonly capturedAt: string
  readonly totalValue: number
  readonly inventory: InventoryDatabase
}

export type InventoryPageUpsert = (args: UpsertPageArgs<Record<string, Json>>) => Promise<Page>

export interface InventoryLandingDeps {
  readonly readPages?: ReadPages
  readonly writeFiles?: WriteFiles
  readonly upsert?: InventoryPageUpsert
  readonly waiting?: Waiting
}

function instantOf(seconds: number): string {
  return new Date(seconds * MS_PER_SECOND).toISOString()
}

function locationIdsIn(values: InventoryValues): readonly string[] {
  return Object.keys(values.inventory.locations).sort()
}

export function locationRowsOf(values: InventoryValues, minted: () => string): string {
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

export function bagSizeRowsOf(values: InventoryValues, minted: () => string): string {
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

function numbersIn(held: Record<number, unknown>): readonly number[] {
  return Object.keys(held)
    .map((one) => Number(one))
    .sort((one, two) => one - two)
}

function saidOnly(value: string | undefined): string | undefined {
  return value === undefined || value === "" ? undefined : value
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
    ["estimatedValue", one.marketValue],
    ["suggestedPrice", one.suggestedPrice],
    ["saleAvg", one.saleAvg],
    ["saleAmountCount", one.saleAmountCount],
    ["equipType", one.equipType],
    ["armorType", one.armorType],
    ["weaponType", one.weaponType],
    ["setId", one.setId],
    ["known", one.known],
    ["replacementValue", one.replacementValue],
    ["furnitureCategory", saidOnly(one.furnitureCategory)],
    ["furnitureCategoryId", one.furnitureCategoryId],
    ["furnitureSubcategoryId", one.furnitureSubcategoryId],
    ["isContainer", one.isContainer],
  ])
}

export function stackRowsOf(values: InventoryValues, minted: () => string): string {
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

export function currencyRowsOf(values: InventoryValues, minted: () => string): string {
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

export function placedFurnishingRowsOf(values: InventoryValues, minted: () => string): string {
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
          ["estimatedValue", one.marketValue],
        ])
      )
    }
  }
  return jsonlBodyOf(lines)
}

export function craftingLevelRowsOf(values: InventoryValues, minted: () => string): string {
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

function rowsFor(property: string, values: InventoryValues, minted: () => string): string {
  if (property === LOCATIONS_PROPERTY) return locationRowsOf(values, minted)
  if (property === BAG_SIZES_PROPERTY) return bagSizeRowsOf(values, minted)
  if (property === CRAFTING_LEVELS_PROPERTY) return craftingLevelRowsOf(values, minted)
  if (property === PLACED_FURNISHINGS_PROPERTY) return placedFurnishingRowsOf(values, minted)
  if (property === CURRENCIES_PROPERTY) return currencyRowsOf(values, minted)
  return stackRowsOf(values, minted)
}

export function inventoryPageKeys(values: InventoryValues): Record<string, Json> {
  const { meta, transmuteCrystalAmount, transmuteCrystalCap } = values.inventory
  const keys: Record<string, Json> = {
    capturedAt: values.capturedAt,
    totalValue: values.totalValue,
    locations: ROWS_ENDING,
    bagSizes: ROWS_ENDING,
    craftingLevels: ROWS_ENDING,
    placedFurnishings: ROWS_ENDING,
    currencies: ROWS_ENDING,
    stacks: ROWS_ENDING,
    data: DATA_ENDING,
  }
  if (meta.lastFullScan > 0) {
    keys.lastFullScanAt = new Date(meta.lastFullScan * MS_PER_SECOND).toISOString()
  }
  if (meta.priceSource !== undefined) keys.priceSource = meta.priceSource
  if (transmuteCrystalAmount !== undefined) keys.transmuteCrystalAmount = transmuteCrystalAmount
  if (transmuteCrystalCap !== undefined) keys.transmuteCrystalCap = transmuteCrystalCap
  return keys
}

function inventoryCommitMessage(values: InventoryValues): string {
  return `temper: the inventory read at ${values.capturedAt}`
}

export async function landAccountInventory(
  values: InventoryValues,
  minted: () => string,
  deps: InventoryLandingDeps = {}
): Promise<Landed> {
  const read = deps.readPages ?? readPages
  const write = deps.writeFiles ?? writeFiles
  const upsert = deps.upsert ?? upsertPage
  const unplaced = noPagePathWhy(ACCOUNT_PAGE_TYPE_SLUG, values.accountSlug)

  const tryOnce = async (): Promise<Tried> => {
    const found = await read([{ pageTypeSlug: ACCOUNT_PAGE_TYPE_SLUG, slug: values.accountSlug }])
    if (!found.ok) return { outcome: "again", why: found.why }
    const pagePath = found.bodies[0]?.path
    if (pagePath === undefined) return { outcome: "refused", why: unplaced }

    const puts: { path: string; content: string }[] = []
    for (const property of ROW_PROPERTIES) {
      const path = besidePathOf(pagePath, property, ROWS_ENDING)
      if (path === null) return { outcome: "refused", why: unplaced }
      puts.push({ path, content: rowsFor(property, values, minted) })
    }
    const dataPath = besidePathOf(pagePath, DATA_PROPERTY, DATA_ENDING)
    if (dataPath === null) return { outcome: "refused", why: unplaced }
    puts.push({ path: dataPath, content: JSON.stringify(values.inventory) })

    const landing = await write(puts, PAGE_LANDING_WRITER, inventoryCommitMessage(values))
    if (!landing.ok) return { outcome: "again", why: landing.why }

    await upsert({
      pageTypeSlug: ACCOUNT_PAGE_TYPE_SLUG,
      where: [{ key: "slug", eq: values.accountSlug }],
      set: inventoryPageKeys(values),
      select: ["id"],
    })
    return { outcome: "landed", at: landing.at }
  }

  return landOverAttempts(`no attempt to land ${unplaced} was made`, tryOnce, {
    waiting: deps.waiting,
  })
}
