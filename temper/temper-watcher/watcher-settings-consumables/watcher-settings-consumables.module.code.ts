import { getPages } from "@akasha/pages-access/get"
import { readFiles, readPages } from "@akasha/pages-query"
import type { AutomationSettings } from "@akasha/temper-build-support/automation-settings"
import { computeItemStock } from "@akasha/temper-items-core/compute-item-stock"
import type { InventoryDatabase } from "@akasha/temper-items-core/inventory-types"
import type { InventoryRuleSettings } from "@akasha/temper-items-rules-core/inventory-rule-types"
import type {
  CharacterBuildInput,
  CompletionCharacterInput,
} from "@akasha/temper-items-rules-core/rule-matcher-context-types"
import {
  compileConsumableStock as consumableStockOf,
  compileWantedConsumables as wantedConsumablesOf,
} from "@akasha/temper-items-rules-matcher/rule-matcher-context-knowledge"
import type {
  ReadFiles,
  ReadPages,
} from "../watcher-page-landing/watcher-page-landing.module.code.ts"
import {
  besidePathsFor,
  contentIn,
} from "../watcher-page-landing/watcher-page-landing.module.code.ts"
import { readCharactersWithTargetBuilds } from "../watcher-settings-equipment/watcher-settings-equipment.module.code.ts"

const INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG = "temper-inventory-snapshot"

export const DATA_PROPERTY = "data"

export const DATA_ENDING = "json"

const SNAPSHOT_KEYS = ["id", "slug"]

export interface TargetBuildCharacter {
  esoCharacterId: string
  targetBuildHash?: string
}

export type TargetBuildCharacterReader = (
  userId: string
) => Promise<readonly TargetBuildCharacter[]>

export type InventoryRow = Record<string, unknown>

export interface InventoryRowReader {
  latestSnapshot: (userId: string) => Promise<InventoryRow | undefined>
  dataOf: (slug: string) => Promise<string | null>
}

export async function snapshotDataOf(
  slug: string,
  pages: ReadPages = readPages,
  files: ReadFiles = readFiles
): Promise<string | null> {
  const beside = await besidePathsFor(
    pages,
    INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG,
    [slug],
    DATA_PROPERTY,
    DATA_ENDING
  )
  const path = beside.get(slug)
  if (path === undefined) return null
  const found = await files([path])
  if (!found.ok) {
    throw new Error(
      `the data file beside ${INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG}/${slug} went unread: ${found.why}`
    )
  }
  return contentIn(found.bodies, path)
}

const PAGE_INVENTORY_ROWS: InventoryRowReader = {
  latestSnapshot: async (userId) => {
    const { rows } = await getPages({
      pageTypeSlug: INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG,
      where: [{ key: "accountPage", eq: userId }],
      order: [{ by: "capturedAt", dir: "desc" }],
      select: SNAPSHOT_KEYS,
      limit: 1,
    })
    return rows[0]
  },
  dataOf: (slug) => snapshotDataOf(slug),
}

export async function compileCharacterPriority(
  userId: string,
  readCharacters: TargetBuildCharacterReader = readCharactersWithTargetBuilds
): Promise<string[]> {
  const characters = await readCharacters(userId)
  return characters.map((one) => one.esoCharacterId)
}

function isRuleSettings(value: unknown): value is InventoryRuleSettings {
  return typeof value === "object" && value !== null && "version" in value && value.version === 2
}

export function toRuleSettings(value: unknown): InventoryRuleSettings {
  return isRuleSettings(value) ? value : { version: 2, rules: [] }
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
    buildById.set(esoCharacterId, { id: esoCharacterId, buildHash, esoCharacterId })
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
  | { readonly kind: "no-snapshot" }
  | { readonly kind: "snapshot-has-no-id" }
  | { readonly kind: "snapshot-has-no-slug"; readonly snapshotId: string }
  | { readonly kind: "no-data"; readonly snapshotId: string; readonly slug: string }
  | {
      readonly kind: "json-parse-failed"
      readonly snapshotId: string
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
  "no-snapshot": () => "no inventory snapshot exists for this user yet",
  "snapshot-has-no-id": () => "the latest inventory snapshot row carries no id",
  "snapshot-has-no-slug": (failure) =>
    `inventory snapshot ${failure.snapshotId} states no slug, so its data file cannot be found`,
  "no-data": (failure) =>
    `inventory snapshot ${failure.snapshotId} has no data file beside ${failure.slug} — the snapshot is mid-write or was truncated`,
  "json-parse-failed": (failure) =>
    `inventory snapshot ${failure.snapshotId} holds ${failure.bytes} byte(s) that are not valid JSON: ${failure.message}`,
}

export function describeInventoryReadFailure(failure: InventoryReadFailure): string {
  return FAILURE_DESCRIPTIONS[failure.kind](failure as never)
}

export async function readLatestInventory(
  userId: string,
  rows: InventoryRowReader = PAGE_INVENTORY_ROWS
): Promise<InventoryReadResult> {
  const snapshot = await rows.latestSnapshot(userId)
  if (snapshot == null) return { ok: false, failure: { kind: "no-snapshot" } }

  const snapshotId = snapshot.id
  if (typeof snapshotId !== "string") {
    return { ok: false, failure: { kind: "snapshot-has-no-id" } }
  }

  const slug = snapshot.slug
  if (typeof slug !== "string") {
    return { ok: false, failure: { kind: "snapshot-has-no-slug", snapshotId } }
  }

  const data = await rows.dataOf(slug)
  if (data === null) return { ok: false, failure: { kind: "no-data", snapshotId, slug } }

  try {
    const db: InventoryDatabase = JSON.parse(data)
    return { ok: true, db }
  } catch (err) {
    return {
      ok: false,
      failure: {
        kind: "json-parse-failed",
        snapshotId,
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
