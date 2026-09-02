import { getPages } from "@akasha/pages-access/get"
import { collectPages } from "@akasha/pages-access/iterate"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { foodOrDrink } from "@temper/game-characters-character/food-and-drink/food-or-drink-source"
import { decodeBuild } from "@temper/game-codec/character/build-codec"
import { potions } from "@akasha/temper-alchemy/potion-source"
import { computeItemStock } from "@temper/game-items-core/compute-item-stock"
import type { InventoryDatabase } from "@temper/game-items-core/inventory-types"
import type { InventoryRuleSettings } from "@temper/game-items-rules-core/inventory-rule-types"
import type { AutomationSettings } from "@temper/shared-engine/automation/automation-settings-types"
import { resolveCharacterToggles } from "@temper/shared-engine/automation/automation-settings-types"
import { buildHash } from "@akasha/temper-formula-framework/branded-id"
import { z } from "zod"
import { readCharactersWithTargetBuilds } from "./export-settings-equipment"
import { inventorySnapshotName } from "./inventory-snapshot-name"

const INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG = "temper-inventory-snapshot"
const INVENTORY_CHUNK_PAGE_TYPE_SLUG = "temper-inventory-chunk"

export async function compileCharacterPriority(userId: string): Promise<string[]> {
  const characters = await readCharactersWithTargetBuilds(userId)

  if (characters.length === 0) return []

  return characters.map((c) => c.esoCharacterId).filter((id): id is string => id != null)
}

function asInventoryRuleSettings(value: unknown): InventoryRuleSettings {
  return value as InventoryRuleSettings
}

export function toRuleSettings(value: unknown): InventoryRuleSettings {
  if (typeof value === "object" && value !== null && "version" in value && value.version === 2) {
    return asInventoryRuleSettings(value)
  }
  return { version: 2, rules: [] }
}

export async function compileWantedConsumables(
  userId: string,
  automationSettings?: AutomationSettings
): Promise<Record<number, string[]>> {
  const characters = await readCharactersWithTargetBuilds(userId)

  if (characters.length === 0) return {}

  const result: Record<number, string[]> = {}

  for (const char of characters) {
    if (char.targetBuildHash == null || char.esoCharacterId == null) continue

    const esoCharId = char.esoCharacterId
    const charToggles = resolveCharacterToggles(
      automationSettings?.characters[esoCharId],
      automationSettings?.global?.characters
    )

    const decoded = decodeBuild(buildHash(char.targetBuildHash))
    if (!decoded) continue

    if (charToggles.food) {
      const foodOrDrinkId = decoded.consumables.foodOrDrink
      if (foodOrDrinkId && foodOrDrink.has(foodOrDrinkId)) {
        const template = foodOrDrink.data[foodOrDrinkId]
        if (template !== undefined && template.itemId > 0) {
          const list = result[template.itemId] ?? []
          if (!list.includes(esoCharId)) list.push(esoCharId)
          result[template.itemId] = list
        }
      }
    }

    if (charToggles.potions) {
      const potionId = decoded.consumables.potion
      if (potionId && potions.has(potionId)) {
        const template = potions.data[potionId]
        if (template !== undefined && template.itemId > 0) {
          const list = result[template.itemId] ?? []
          if (!list.includes(esoCharId)) list.push(esoCharId)
          result[template.itemId] = list
        }
      }

      const potion2Id = decoded.consumables.potion2
      if (potion2Id && potions.has(potion2Id)) {
        const template = potions.data[potion2Id]
        if (template !== undefined && template.itemId > 0) {
          const list = result[template.itemId] ?? []
          if (!list.includes(esoCharId)) list.push(esoCharId)
          result[template.itemId] = list
        }
      }
    }
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

export function describeInventoryReadFailure(failure: InventoryReadFailure): string {
  switch (failure.kind) {
    case "no-snapshot":
      return "no inventory snapshot exists for this user yet"
    case "snapshot-has-no-id":
      return "the latest inventory snapshot row carries no id"
    case "snapshot-has-no-timestamp":
      return `inventory snapshot ${failure.snapshotId} states no data-timestamp, so its chunks cannot be named`
    case "no-chunks":
      return `inventory snapshot ${failure.snapshotId} has no chunk rows`
    case "chunk-count-mismatch":
      return `inventory snapshot ${failure.snapshotId} declares ${failure.declared} chunk(s) but ${failure.found} are readable — the snapshot is mid-write or was truncated`
    case "chunk-not-text":
      return `inventory snapshot ${failure.snapshotId} has non-text data in chunk(s) ${failure.chunkIndexes.join(", ")}`
    case "json-parse-failed":
      return `inventory snapshot ${failure.snapshotId} reassembled to ${failure.bytes} byte(s) that are not valid JSON: ${failure.message}`
    default:
      return assertNever(failure)
  }
}

function chunkText(value: unknown): string | undefined {
  if (typeof value === "string") return value
  if (value === null || value === undefined) return undefined
  return JSON.stringify(value)
}

export async function readLatestInventory(userId: string): Promise<InventoryReadResult> {
  const { rows: snapshotRows } = await getPages({
    pageTypeSlug: INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG,
    where: [{ key: "userId", eq: userId }],
    order: [{ by: "dataTimestamp", dir: "desc" }],
    limit: 1,
  })
  const snapshot = snapshotRows[0]
  if (snapshot == null) return { ok: false, failure: { kind: "no-snapshot" } }

  const snapshotId = typeof snapshot.id === "string" ? snapshot.id : undefined
  if (snapshotId == null) return { ok: false, failure: { kind: "snapshot-has-no-id" } }

  const dataTimestamp = snapshot.dataTimestamp
  if (typeof dataTimestamp !== "number") {
    return { ok: false, failure: { kind: "snapshot-has-no-timestamp", snapshotId } }
  }

  const chunkRows = await collectPages({
    pageTypeSlug: INVENTORY_CHUNK_PAGE_TYPE_SLUG,
    where: [{ key: "inventory", eq: inventorySnapshotName(dataTimestamp) }],
    order: [{ by: "chunkIndex", dir: "asc" }],
    select: ["id", "chunkIndex", "inventory", "data"],
    pageSize: 1000,
  })
  if (chunkRows.length === 0) return { ok: false, failure: { kind: "no-chunks", snapshotId } }

  const declared = snapshot.chunkCount
  if (typeof declared === "number" && declared !== chunkRows.length) {
    return {
      ok: false,
      failure: {
        kind: "chunk-count-mismatch",
        snapshotId,
        declared,
        found: chunkRows.length,
      },
    }
  }

  const texts = chunkRows.map((c) => chunkText(c.data))
  const untyped = texts
    .map((text, index) => (text === undefined ? index : undefined))
    .filter((index): index is number => index !== undefined)
  if (untyped.length > 0) {
    return { ok: false, failure: { kind: "chunk-not-text", snapshotId, chunkIndexes: untyped } }
  }

  const combined = texts.join("")
  try {
    return { ok: true, db: asInventoryDatabase(z.unknown().parse(JSON.parse(combined))) }
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

function asInventoryDatabase(value: unknown): InventoryDatabase {
  return value as InventoryDatabase
}

export function compileConsumableStock(
  db: InventoryDatabase | null,
  wantedItemIds: Set<number>
): Record<number, Record<string, number>> {
  if (wantedItemIds.size === 0) return {}
  if (!db?.locations) return {}

  const result: Record<number, Record<string, number>> = {}

  for (const [locationKey, location] of Object.entries(db.locations)) {
    if (!/^\d+$/.test(locationKey)) continue

    for (const slots of Object.values(location.bags)) {
      for (const item of Object.values(slots)) {
        if (!wantedItemIds.has(item.itemId)) continue

        const bucket = result[item.itemId] ?? {}
        bucket[locationKey] = (bucket[locationKey] ?? 0) + item.stackCount
        result[item.itemId] = bucket
      }
    }
  }

  return result
}

export function compileBuyStock(
  read: InventoryReadResult,
  buyItemIds: Set<number>
): {
  available: boolean
  buyStockByChar: Record<number, Record<string, number>>
  buyStockAccount: Record<number, number>
} {
  if (!read.ok) {
    return { available: false, buyStockByChar: {}, buyStockAccount: {} }
  }
  if (buyItemIds.size === 0) {
    return { available: true, buyStockByChar: {}, buyStockAccount: {} }
  }

  const breakdowns = computeItemStock(read.db, buyItemIds)
  const buyStockByChar: Record<number, Record<string, number>> = {}
  const buyStockAccount: Record<number, number> = {}
  for (const [itemId, breakdown] of breakdowns) {
    buyStockByChar[itemId] = Object.fromEntries(breakdown.byChar)
    buyStockAccount[itemId] = breakdown.accountStorage
  }

  return { available: true, buyStockByChar, buyStockAccount }
}
