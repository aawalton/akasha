"use client"

import { createPage } from "@shared/pages-access/create"
import { softDeletePage } from "@shared/pages-access/delete"
import { NEVER_MATCH_VALUE } from "@shared/pages-access/sentinels"
import { upsertPage } from "@shared/pages-access/upsert"
import { useOptimisticCreatePage } from "@shared/pages-ui/supabase/mutations/use-optimistic-create-page"
import { useOptimisticSoftDeletePage } from "@shared/pages-ui/supabase/mutations/use-optimistic-soft-delete-page"
import { useOptimisticUpsertPage } from "@shared/pages-ui/supabase/mutations/use-optimistic-upsert-page"
import { usePagesSupabase } from "@shared/pages-ui/supabase/use-pages"
import { parseInventoryContent } from "@temper/game-items-core/inventory-parser"
import { computeInventoryTotalValue } from "@temper/game-items-core/inventory-value"
import {
  type ExistingChunkRow,
  type ExistingSnapshotRow,
  planChunkImport,
  planSnapshotImport,
} from "@temper/game-items-core/plan-inventory-import"
import { shardInventoryJson } from "@temper/game-items-core/shard-inventory"
import { useCallback, useEffect, useRef, useState } from "react"
import type { InventoryImportResult } from "./inventory-import-types"

type InventoryImportState =
  | { phase: "idle" }
  | { phase: "reading" }
  | { phase: "importing" }
  | { phase: "success"; result: InventoryImportResult }
  | { phase: "error"; message: string }

const INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG = "temper-inventory-snapshot"
const INVENTORY_CHUNK_PAGE_TYPE_SLUG = "temper-inventory-chunk"

function toExistingSnapshotRow(row: Record<string, unknown>): ExistingSnapshotRow {
  return {
    id: typeof row.id === "string" ? row.id : "",
    dataTimestamp: typeof row.dataTimestamp === "number" ? row.dataTimestamp : null,
  }
}

function toExistingChunkRow(row: Record<string, unknown>): ExistingChunkRow {
  return {
    id: typeof row.id === "string" ? row.id : "",
    inventory: typeof row.inventory === "string" ? row.inventory : null,
    chunkIndex: typeof row.chunkIndex === "number" ? row.chunkIndex : null,
  }
}

export function useInventoryImport(userId: string | null) {
  const [state, setState] = useState<InventoryImportState>({ phase: "idle" })
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { rows: snapshotRows } = usePagesSupabase({
    pageTypeSlug: INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG,
    where:
      userId != null ? [{ key: "userId", eq: userId }] : [{ key: "userId", eq: NEVER_MATCH_VALUE }],
    order: [{ by: "dataTimestamp", dir: "desc" }],
    select: ["id", "dataTimestamp"],
    limit: 100,
  })
  const snapshotRowsRef = useRef(snapshotRows)
  useEffect(() => {
    snapshotRowsRef.current = snapshotRows
  }, [snapshotRows])

  const { rows: chunkRows } = usePagesSupabase({
    pageTypeSlug: INVENTORY_CHUNK_PAGE_TYPE_SLUG,
    where:
      userId != null ? [{ key: "userId", eq: userId }] : [{ key: "userId", eq: NEVER_MATCH_VALUE }],
    select: ["id", "inventory", "chunkIndex"],
    limit: 1000,
  })
  const chunkRowsRef = useRef(chunkRows)
  useEffect(() => {
    chunkRowsRef.current = chunkRows
  }, [chunkRows])

  const runUpsert = useOptimisticUpsertPage((args) => upsertPage(args))
  const runCreate = useOptimisticCreatePage((args) => createPage(args))
  const runSoftDelete = useOptimisticSoftDeletePage((args) => softDeletePage(args))
  const runUpsertRef = useRef(runUpsert)
  const runCreateRef = useRef(runCreate)
  const runSoftDeleteRef = useRef(runSoftDelete)
  useEffect(() => {
    runUpsertRef.current = runUpsert
    runCreateRef.current = runCreate
    runSoftDeleteRef.current = runSoftDelete
  }, [runUpsert, runCreate, runSoftDelete])

  const processFile = useCallback(
    async (file: File) => {
      if (userId == null) {
        setState({ phase: "error", message: "Not authenticated." })
        return
      }
      if (!file.name.endsWith(".lua")) {
        setState({ phase: "error", message: "Please select a .lua file." })
        return
      }

      setState({ phase: "reading" })

      let content: string
      try {
        content = await file.text()
      } catch {
        setState({ phase: "error", message: "Failed to read file." })
        return
      }

      setState({ phase: "importing" })

      let inventoryData: ReturnType<typeof parseInventoryContent>
      try {
        inventoryData = parseInventoryContent(content)
      } catch (e) {
        setState({
          phase: "error",
          message:
            e instanceof Error
              ? e.message
              : "Failed to parse TemperInventory saved variables file.",
        })
        return
      }

      let itemCount = 0
      const locationCount = Object.keys(inventoryData.locations).length
      for (const location of Object.values(inventoryData.locations)) {
        for (const bag of Object.values(location.bags)) {
          itemCount += Object.keys(bag).length
        }
      }

      const totalValue = computeInventoryTotalValue(inventoryData)
      const lastFullScan = inventoryData.meta.lastFullScan
      const dataTimestamp = lastFullScan > 0 ? lastFullScan * 1000 : Date.now()
      const encoded = JSON.stringify(inventoryData)
      const payloads = shardInventoryJson(encoded)
      const chunkCount = payloads.length

      try {
        const snapshotPlan = planSnapshotImport(snapshotRowsRef.current.map(toExistingSnapshotRow))
        const snapshotSet = { userId, dataTimestamp, totalValue, chunkCount, version: "v1" }
        let snapshotId: string
        if (snapshotPlan.targetSnapshotId != null) {
          const snapshot = await runUpsertRef.current({
            pageTypeSlug: INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG,
            where: [{ key: "id", eq: snapshotPlan.targetSnapshotId }],
            set: snapshotSet,
            select: ["id"],
          })
          snapshotId = typeof snapshot.id === "string" ? snapshot.id : snapshotPlan.targetSnapshotId
        } else {
          const snapshot = await runCreateRef.current({
            pageTypeSlug: INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG,
            properties: snapshotSet,
            select: ["id"],
          })
          if (typeof snapshot.id !== "string") {
            throw new Error("Inventory snapshot create returned no id.")
          }
          snapshotId = snapshot.id
        }
        for (const extraId of snapshotPlan.snapshotsToSoftDelete) {
          await runSoftDeleteRef.current({
            pageTypeSlug: INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG,
            where: [{ key: "id", eq: extraId }],
          })
        }

        const chunkPlan = planChunkImport(
          chunkRowsRef.current.map(toExistingChunkRow),
          snapshotId,
          payloads
        )
        for (const chunkId of chunkPlan.chunksToSoftDelete) {
          await runSoftDeleteRef.current({
            pageTypeSlug: INVENTORY_CHUNK_PAGE_TYPE_SLUG,
            where: [{ key: "id", eq: chunkId }],
          })
        }
        for (const { index, data } of chunkPlan.chunksToUpsert) {
          await runUpsertRef.current({
            pageTypeSlug: INVENTORY_CHUNK_PAGE_TYPE_SLUG,
            where: [
              { key: "inventory", eq: snapshotId },
              { key: "chunkIndex", eq: index },
            ],
            set: { userId, inventory: snapshotId, chunkIndex: index, data },
          })
        }

        const result: InventoryImportResult = {
          success: true,
          locationCount,
          itemCount,
          totalValue,
          status: "upserted",
        }
        setState({ phase: "success", result })
      } catch (e) {
        setState({
          phase: "error",
          message:
            e instanceof Error
              ? e.message
              : "An unexpected error occurred during inventory import.",
        })
      }
    },
    [userId]
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) processFile(file)
      e.target.value = ""
    },
    [processFile]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) processFile(file)
    },
    [processFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const reset = useCallback(() => {
    setState({ phase: "idle" })
  }, [])

  return {
    state,
    dragOver,
    inputRef,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    reset,
  }
}
