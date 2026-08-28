"use client"

import { NEVER_MATCH_VALUE } from "@shared/pages-access/sentinels"
import { usePagesSupabase } from "@shared/pages-ui/supabase/use-pages"
import { isRecord } from "../../../shared/utils-narrow/src/is-record"
import { assembleInventory } from "@temper/game-items-core/assemble-inventory"
import type { InventoryDatabase } from "@temper/game-items-core/inventory-types"
import type { PricingData } from "@temper/game-trading-pricing/pricing-types"
import { useEffect, useMemo, useState } from "react"
import { chunksStillLoading } from "./chunks-loading"
import { toGuildBankBasisChange, toNetWorthHistory } from "./net-worth-history"
import { NET_WORTH_MAX_PERIOD_DAYS } from "./net-worth-periods"

const INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG = "temper-inventory-snapshot"
const INVENTORY_CHUNK_PAGE_TYPE_SLUG = "temper-inventory-chunk"

interface InventorySnapshotRow {
  id: string
  userId: string
  dataTimestamp: number
  totalValue: number
  chunkCount: number
  version: string | null
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
    userId: readString(row.userId) ?? "",
    dataTimestamp: readNumber(row.dataTimestamp) ?? 0,
    totalValue: readNumber(row.totalValue) ?? 0,
    chunkCount: readNumber(row.chunkCount) ?? 0,
    version: readString(row.version) ?? null,
  }
}

export function useInventory(userId: string | null) {
  const snapshotRead = usePagesSupabase({
    pageTypeSlug: INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG,
    where:
      userId != null ? [{ key: "userId", eq: userId }] : [{ key: "userId", eq: NEVER_MATCH_VALUE }],
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

const MS_PER_DAY = 86_400_000

const NET_WORTH_WINDOW_DAYS = NET_WORTH_MAX_PERIOD_DAYS

const NO_ROWS: readonly Record<string, unknown>[] = []

function readRows(body: unknown): readonly Record<string, unknown>[] {
  if (!isRecord(body)) return NO_ROWS
  const held: unknown = body.rows
  if (!Array.isArray(held)) return NO_ROWS
  const rows: unknown[] = held
  return rows.every(isRecord) ? rows : NO_ROWS
}

export function useNetWorthHistory(userId: string | null) {
  const [since] = useState(() => Date.now() - NET_WORTH_WINDOW_DAYS * MS_PER_DAY)
  const [state, setState] = useState<{
    rows: readonly Record<string, unknown>[]
    isLoading: boolean
  }>({ rows: NO_ROWS, isLoading: userId != null })

  useEffect(() => {
    if (userId == null) {
      setState({ rows: NO_ROWS, isLoading: false })
      return
    }
    let cancelled = false
    setState((prev) => ({ ...prev, isLoading: true }))
    fetch(`/api/net-worth?since=${since}`, { headers: { accept: "application/json" } })
      .then(async (response) => (response.ok ? await response.json() : { rows: NO_ROWS }))
      .then((body: unknown) => {
        if (cancelled) return
        setState({ rows: readRows(body), isLoading: false })
      })
      .catch(() => {
        if (!cancelled) setState({ rows: NO_ROWS, isLoading: false })
      })
    return () => {
      cancelled = true
    }
  }, [userId, since])

  const history = useMemo(() => toNetWorthHistory(state.rows), [state.rows])
  const guildBankBasisChange = useMemo(() => toGuildBankBasisChange(state.rows), [state.rows])

  return { history, guildBankBasisChange, isLoading: state.isLoading }
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
