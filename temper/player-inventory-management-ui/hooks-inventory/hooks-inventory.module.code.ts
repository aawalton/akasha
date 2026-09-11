"use client"

import { NEVER_MATCH_VALUE } from "akasha/pages/access/sentinels/sentinels.module.code.ts"
import { usePages } from "akasha/pages/ui/supabase/use-pages/use-pages.module.code.ts"
import { assembleInventory } from "akasha/temper/items-core/assemble-inventory/assemble-inventory.module.code.ts"
import type { InventoryDatabase } from "akasha/temper/items-core/inventory-types/inventory-types.module.code.ts"
import { chunksStillLoading } from "akasha/temper/player-inventory-management-ui/chunks-loading/chunks-loading.module.code.ts"
import type { PricingData } from "akasha/temper/trading-pricing/pricing-types/pricing-types.module.code.ts"
import { parseNumber } from "akasha/utils/narrow/parse-number/parse-number.module.code.ts"
import { stringIn } from "akasha/utils/narrow/string-in/string-in.module.code.ts"
import { useMemo } from "react"

const INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG = "temper-inventory-snapshot"
const INVENTORY_CHUNK_PAGE_TYPE_SLUG = "temper-inventory-chunk"

interface InventorySnapshotRow {
  id: string
  capturedAt: string
  totalValue: number
  chunkCount: number
}

function readNumber(value: unknown): number | undefined {
  return parseNumber(value)
}

function mapSnapshotRow(row: Record<string, unknown>): InventorySnapshotRow {
  return {
    id: stringIn(row.id) ?? "",
    capturedAt: stringIn(row.capturedAt) ?? "",
    totalValue: readNumber(row.totalValue) ?? 0,
    chunkCount: readNumber(row.chunkCount) ?? 0,
  }
}

export function useInventory(userId: string | null) {
  const snapshotRead = usePages({
    pageTypeSlug: INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG,
    where:
      userId != null
        ? [{ key: "accountPage", eq: userId }]
        : [{ key: "accountPage", eq: NEVER_MATCH_VALUE }],
    order: [{ by: "capturedAt", dir: "desc" }],
    limit: 1,
  })
  const snapshot = snapshotRead.rows[0] ? mapSnapshotRow(snapshotRead.rows[0]) : null

  const chunksRead = usePages({
    pageTypeSlug: INVENTORY_CHUNK_PAGE_TYPE_SLUG,
    where: snapshot
      ? [{ key: "inventory", eq: snapshot.id }]
      : [{ key: "inventory", eq: NEVER_MATCH_VALUE }],
    order: [{ by: "chunkIndex", dir: "asc" }],
    limit: 200,
  })

  const chunksLoading = chunksStillLoading({
    readIsLoading: chunksRead.isLoading,
    loadedCount: chunksRead.rows.length,
    expectedCount: snapshot?.chunkCount ?? null,
  })

  const inventory = useMemo<InventoryDatabase | null>(() => {
    if (!snapshot) return null
    if (chunksLoading) return null
    return assembleInventory(chunksRead.rows)
  }, [snapshot, chunksLoading, chunksRead.rows])

  return {
    inventory,
    totalValue: snapshot?.totalValue ?? null,
    capturedAt: snapshot?.capturedAt ?? null,
    isLoading: snapshotRead.isLoading || (snapshot != null && chunksLoading),
    isError: snapshotRead.error !== null,
    error: snapshotRead.error,
    retry: undefined,
  }
}

export function usePriceExtract(
  _type: string,
  _platform: string,
  _server: string
): {
  pricing: PricingData | null
  updatedAt: string | null
  isLoading: boolean
  isError: boolean
  error: Error | null
  retry: undefined
} {
  return {
    pricing: null,
    updatedAt: null,
    isLoading: false,
    isError: false,
    error: null,
    retry: undefined,
  }
}
