"use client"

import { NEVER_MATCH_VALUE } from "@akasha/pages-access/sentinels"
import { usePagesSupabase } from "@akasha/pages-ui/supabase/use-pages"
import { assembleInventory } from "@akasha/temper-items-core/assemble-inventory"
import type { InventoryDatabase } from "@akasha/temper-items-core/inventory-types"
import type { PricingData } from "@akasha/temper-trading-pricing/pricing-types"
import { useMemo } from "react"
import { chunksStillLoading } from "../chunks-loading/chunks-loading.module.code.ts"

const INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG = "temper-inventory-snapshot"
const INVENTORY_CHUNK_PAGE_TYPE_SLUG = "temper-inventory-chunk"

interface InventorySnapshotRow {
  id: string
  dataTimestamp: number
  totalValue: number
  chunkCount: number
}

function readString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined
}

function readNumber(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined
}

function mapSnapshotRow(row: Record<string, unknown>): InventorySnapshotRow {
  return {
    id: readString(row.id) ?? "",
    dataTimestamp: readNumber(row.dataTimestamp) ?? 0,
    totalValue: readNumber(row.totalValue) ?? 0,
    chunkCount: readNumber(row.chunkCount) ?? 0,
  }
}

export function useInventory(userId: string | null) {
  const snapshotRead = usePagesSupabase({
    pageTypeSlug: INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG,
    where:
      userId != null
        ? [{ key: "accountPage", eq: userId }]
        : [{ key: "accountPage", eq: NEVER_MATCH_VALUE }],
    order: [{ by: "dataTimestamp", dir: "desc" }],
    limit: 1,
  })
  const snapshot = snapshotRead.rows[0] ? mapSnapshotRow(snapshotRead.rows[0]) : null

  const chunksRead = usePagesSupabase({
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
    dataTimestamp: snapshot?.dataTimestamp ?? null,
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
