import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import {
  readFiles,
  readPages,
} from "akasha/page/query/modules/store-writing/store-writing.module.code.ts"
import type { AutomationSettings } from "akasha/temper/build-support/modules/automation-settings/automation-settings.module.code.ts"
import { computeItemStock } from "akasha/temper/items-core/modules/compute-item-stock/compute-item-stock.module.code.ts"
import type { InventoryDatabase } from "akasha/temper/items-core/modules/inventory-types/inventory-types.module.code.ts"
import { InventoryRuleSettingsShape } from "akasha/temper/items-rules-core/modules/inventory-rule-settings-shape/inventory-rule-settings-shape.module.code.ts"
import type { InventoryRuleSettings } from "akasha/temper/items-rules-core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  CharacterBuildInput,
  CompletionCharacterInput,
} from "akasha/temper/items-rules-core/modules/rule-matcher-context-types/rule-matcher-context-types.module.code.ts"
import {
  compileConsumableStock as consumableStockOf,
  compileWantedConsumables as wantedConsumablesOf,
} from "akasha/temper/items-rules-matcher/modules/rule-matcher-context-knowledge/rule-matcher-context-knowledge.module.code.ts"
import { ACCOUNT_PAGE_TYPE_SLUG } from "akasha/temper/watcher/modules/watcher-account-page/watcher-account-page.module.code.ts"
import type {
  ReadFiles,
  ReadPages,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"
import {
  besidePathsFor,
  contentIn,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"
import { readCharactersWithTargetBuilds } from "akasha/temper/watcher/modules/watcher-settings-equipment/watcher-settings-equipment.module.code.ts"

const DATA_PROPERTY = "data"

const DATA_ENDING = "json"

const ACCOUNT_KEYS = ["id", "slug"]

export interface TargetBuildCharacter {
  esoCharacterId: string
  targetBuildHash?: string
}

export type TargetBuildCharacterReader = (
  userId: string
) => Promise<readonly TargetBuildCharacter[]>

export type InventoryRow = Record<string, unknown>

export interface InventoryRowReader {
  latestReading: (userId: string) => Promise<InventoryRow | undefined>
  dataOf: (slug: string) => Promise<string | null>
}

export async function readingDataOf(
  slug: string,
  pages: ReadPages = readPages,
  files: ReadFiles = readFiles
): Promise<string | null> {
  const beside = await besidePathsFor(
    pages,
    ACCOUNT_PAGE_TYPE_SLUG,
    [slug],
    DATA_PROPERTY,
    DATA_ENDING
  )
  const path = beside.get(slug)
  if (path === undefined) return null
  const found = await files([path])
  if (!found.ok) {
    throw new Error(
      `the data file beside ${ACCOUNT_PAGE_TYPE_SLUG}/${slug} went unread: ${found.why}`
    )
  }
  return contentIn(found.bodies, path)
}

export const PAGE_INVENTORY_ROWS: InventoryRowReader = {
  latestReading: async (userId) => {
    const { rows } = await getPages({
      pageTypeSlug: ACCOUNT_PAGE_TYPE_SLUG,
      where: [{ key: "title", eq: userId }],
      select: ACCOUNT_KEYS,
      limit: 1,
    })
    return rows[0]
  },
  dataOf: (slug) => readingDataOf(slug),
}

export async function compileCharacterPriority(
  userId: string,
  readCharacters: TargetBuildCharacterReader = readCharactersWithTargetBuilds
): Promise<string[]> {
  const characters = await readCharacters(userId)
  return characters.map((one) => one.esoCharacterId)
}

function saidWrong(
  issues: readonly { readonly path: readonly PropertyKey[]; readonly message: string }[]
): string {
  return issues
    .map((issue) => `\`${issue.path.join(".") || "the settings themselves"}\` ${issue.message}`)
    .join("; ")
}

export function toRuleSettings(value: unknown): InventoryRuleSettings {
  if (value == null) return { version: 2, rules: [] }
  const blob = typeof value === "object" && !Array.isArray(value) ? { rules: [], ...value } : value
  const read = InventoryRuleSettingsShape.safeParse(blob)
  if (read.success) return read.data
  throw new Error(
    `the inventory settings this account holds are no version 2 rule set, so they are neither ` +
      `compiled into the addon nor written back, and what the addon already holds stays: ` +
      saidWrong(read.error.issues)
  )
}

export async function compileWantedConsumables(
  userId: string,
  automationSettings?: AutomationSettings,
  readCharacters: TargetBuildCharacterReader = readCharactersWithTargetBuilds
): Promise<Record<number, string[]>> {
  const characters = await readCharacters(userId)

  const inputs: CompletionCharacterInput[] = []
  const buildById = new Map<string, CharacterBuildInput>()
  for (const one of characters) {
    const buildHash = one.targetBuildHash
    if (buildHash == null) continue
    const esoCharacterId = one.esoCharacterId
    inputs.push({ esoCharacterId, targetBuildId: esoCharacterId, sortOrder: null })
    buildById.set(esoCharacterId, { id: esoCharacterId, buildHash })
  }

  const result: Record<number, string[]> = {}
  for (const [itemId, esoCharacterIds] of wantedConsumablesOf(
    inputs,
    buildById,
    automationSettings
  )) {
    result[itemId] = esoCharacterIds
  }
  return result
}

export type InventoryReadFailure =
  | { readonly kind: "no-reading" }
  | { readonly kind: "reading-has-no-id" }
  | { readonly kind: "reading-has-no-slug"; readonly readingId: string }
  | { readonly kind: "no-data"; readonly readingId: string; readonly slug: string }
  | {
      readonly kind: "json-parse-failed"
      readonly readingId: string
      readonly bytes: number
      readonly message: string
    }

export type InventoryReadResult =
  | { readonly ok: true; readonly db: InventoryDatabase }
  | { readonly ok: false; readonly failure: InventoryReadFailure }

const FAILURE_DESCRIPTIONS: {
  [K in InventoryReadFailure["kind"]]: (
    failure: Extract<InventoryReadFailure, { kind: K }>
  ) => string
} = {
  "no-reading": () => "no inventory reading exists for this user yet",
  "reading-has-no-id": () => "the latest inventory reading row carries no id",
  "reading-has-no-slug": (failure) =>
    `inventory reading ${failure.readingId} states no slug, so its data file cannot be found`,
  "no-data": (failure) =>
    `inventory reading ${failure.readingId} has no data file beside ${failure.slug} — the reading is mid-write or was truncated`,
  "json-parse-failed": (failure) =>
    `inventory reading ${failure.readingId} holds ${failure.bytes} byte(s) that are not valid JSON: ${failure.message}`,
}

export function describeInventoryReadFailure(failure: InventoryReadFailure): string {
  return FAILURE_DESCRIPTIONS[failure.kind](failure as never)
}

export async function readLatestInventory(
  userId: string,
  rows: InventoryRowReader = PAGE_INVENTORY_ROWS
): Promise<InventoryReadResult> {
  const reading = await rows.latestReading(userId)
  if (reading == null) return { ok: false, failure: { kind: "no-reading" } }

  const readingId = reading.id
  if (typeof readingId !== "string") {
    return { ok: false, failure: { kind: "reading-has-no-id" } }
  }

  const slug = reading.slug
  if (typeof slug !== "string") {
    return { ok: false, failure: { kind: "reading-has-no-slug", readingId } }
  }

  const data = await rows.dataOf(slug)
  if (data === null) return { ok: false, failure: { kind: "no-data", readingId, slug } }

  try {
    const db: InventoryDatabase = JSON.parse(data)
    return { ok: true, db }
  } catch (err) {
    return {
      ok: false,
      failure: {
        kind: "json-parse-failed",
        readingId,
        bytes: data.length,
        message: err instanceof Error ? err.message : String(err),
      },
    }
  }
}

export function compileConsumableStock(
  inventory: InventoryDatabase | null,
  wantedItemIds: ReadonlySet<number>
): Record<number, Record<string, number>> {
  const wanted = new Map<number, string[]>()
  for (const itemId of wantedItemIds) wanted.set(itemId, [])

  const result: Record<number, Record<string, number>> = {}
  for (const [itemId, byLocation] of consumableStockOf(inventory, wanted)) {
    const held: Record<string, number> = {}
    for (const [locationKey, stackCount] of byLocation) held[locationKey] = stackCount
    result[itemId] = held
  }
  return result
}

export interface BuyStock {
  available: boolean
  buyStockByChar: Record<number, Record<string, number>>
  buyStockAccount: Record<number, number>
}

export function compileBuyStock(
  read: InventoryReadResult,
  buyItemIds: ReadonlySet<number>
): BuyStock {
  if (!read.ok) return { available: false, buyStockByChar: {}, buyStockAccount: {} }
  if (buyItemIds.size === 0) return { available: true, buyStockByChar: {}, buyStockAccount: {} }

  const buyStockByChar: Record<number, Record<string, number>> = {}
  const buyStockAccount: Record<number, number> = {}
  for (const [itemId, breakdown] of computeItemStock(read.db, buyItemIds)) {
    buyStockByChar[itemId] = Object.fromEntries(breakdown.byChar)
    buyStockAccount[itemId] = breakdown.accountStorage
  }
  return { available: true, buyStockByChar, buyStockAccount }
}
