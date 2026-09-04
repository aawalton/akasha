import { getPages } from "@akasha/pages-access/get"
import { collectPages } from "@akasha/pages-access/iterate"
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
import { inventorySnapshotName } from "../watcher-inventory-snapshot-name/watcher-inventory-snapshot-name.module.code.ts"
import { readCharactersWithTargetBuilds } from "../watcher-settings-equipment/watcher-settings-equipment.module.code.ts"

const INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG = "temper-inventory-snapshot"
const INVENTORY_CHUNK_PAGE_TYPE_SLUG = "temper-inventory-chunk"
const CHUNK_PAGE_SIZE = 1000

const SNAPSHOT_KEYS = ["id", "chunkCount"]

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
  chunksOf: (snapshotName: string) => Promise<readonly InventoryRow[]>
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
  chunksOf: async (snapshotName) =>
    collectPages({
      pageTypeSlug: INVENTORY_CHUNK_PAGE_TYPE_SLUG,
      where: [{ key: "inventory", eq: snapshotName }],
      order: [{ by: "chunkIndex", dir: "asc" }],
      select: ["id", "chunkIndex", "inventory", "data"],
      pageSize: CHUNK_PAGE_SIZE,
    }),
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
  | { readonly kind: "snapshot-has-no-timestamp"; readonly snapshotId: string }
  | { readonly kind: "no-chunks"; readonly snapshotId: string }
  | {
      readonly kind: "chunk-count-mismatch"
      readonly snapshotId: string
      readonly declared: number
      readonly found: number
    }
  | {
      readonly kind: "chunk-not-text"
      readonly snapshotId: string
      readonly chunkIndexes: readonly number[]
    }
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
  "snapshot-has-no-timestamp": (failure) =>
    `inventory snapshot ${failure.snapshotId} states no data-timestamp, so its chunks cannot be named`,
  "no-chunks": (failure) => `inventory snapshot ${failure.snapshotId} has no chunk rows`,
  "chunk-count-mismatch": (failure) =>
    `inventory snapshot ${failure.snapshotId} declares ${failure.declared} chunk(s) but ${failure.found} are readable — the snapshot is mid-write or was truncated`,
  "chunk-not-text": (failure) =>
    `inventory snapshot ${failure.snapshotId} has non-text data in chunk(s) ${failure.chunkIndexes.join(", ")}`,
  "json-parse-failed": (failure) =>
    `inventory snapshot ${failure.snapshotId} reassembled to ${failure.bytes} byte(s) that are not valid JSON: ${failure.message}`,
}

export function describeInventoryReadFailure(failure: InventoryReadFailure): string {
  return FAILURE_DESCRIPTIONS[failure.kind](failure as never)
}

function chunkText(value: unknown): string | undefined {
  if (typeof value === "string") return value
  if (value === null || value === undefined) return undefined
  return JSON.stringify(value)
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

  const dataTimestamp = snapshot.dataTimestamp
  if (typeof dataTimestamp !== "number") {
    return { ok: false, failure: { kind: "snapshot-has-no-timestamp", snapshotId } }
  }

  const chunks = await rows.chunksOf(inventorySnapshotName(dataTimestamp))
  if (chunks.length === 0) return { ok: false, failure: { kind: "no-chunks", snapshotId } }

  const declared = snapshot.chunkCount
  if (typeof declared === "number" && declared !== chunks.length) {
    return {
      ok: false,
      failure: {
        kind: "chunk-count-mismatch",
        snapshotId,
        declared,
        found: chunks.length,
      },
    }
  }

  const texts = chunks.map((chunk) => chunkText(chunk.data))
  const chunkIndexes = texts.flatMap((text, index) => (text === undefined ? [index] : []))
  if (chunkIndexes.length > 0) {
    return { ok: false, failure: { kind: "chunk-not-text", snapshotId, chunkIndexes } }
  }

  const combined = texts.join("")
  try {
    const db: InventoryDatabase = JSON.parse(combined)
    return { ok: true, db }
  } catch (err) {
    return {
      ok: false,
      failure: {
        kind: "json-parse-failed",
        snapshotId,
        bytes: combined.length,
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
