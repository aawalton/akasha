import { parseItemLink } from "@akasha/temper-items-core/item-link-parser"
import type {
  ItemTooltipData,
  ItemTooltipInstance,
  MinedItemData,
} from "@akasha/temper-items-core/item-tooltip-types"
import { resolveItemTooltipData } from "@akasha/temper-items-core/item-tooltip-types"
import { useCallback, useEffect, useRef, useState } from "react"

const minedItemCache = new Map<number, MinedItemData>()

export type ItemLookupOutcome = "ok" | "lookup-failed"

type BatchCallback = (results: Map<number, MinedItemData>, outcome: ItemLookupOutcome) => void

interface Batcher {
  enqueue: (itemId: number, onComplete: BatchCallback) => void
}

function createBatcher(cache: Map<number, MinedItemData>): Batcher {
  let pendingIds: Set<number> = new Set()
  let callbacks: BatchCallback[] = []
  let scheduled = false

  async function flush(): Promise<void> {
    const ids = Array.from(pendingIds)
    const currentCallbacks = callbacks

    pendingIds = new Set()
    callbacks = []
    scheduled = false

    const missing = ids.filter((id) => !cache.has(id))
    let outcome: ItemLookupOutcome = "ok"

    if (missing.length > 0) {
      try {
        const params = missing.join(",")
        const response = await fetch(`/api/items?ids=${params}`)
        if (response.ok) {
          const rows: MinedItemData[] = await response.json()
          for (const row of rows) {
            cache.set(row.itemId, row)
          }
        } else {
          outcome = "lookup-failed"
        }
      } catch {
        outcome = "lookup-failed"
      }
    }

    const results = new Map<number, MinedItemData>()
    for (const id of ids) {
      const entry = cache.get(id)
      if (entry) results.set(id, entry)
    }

    for (const callback of currentCallbacks) {
      callback(results, outcome)
    }
  }

  return {
    enqueue(itemId: number, onComplete: BatchCallback): undefined {
      pendingIds.add(itemId)
      callbacks.push(onComplete)

      if (!scheduled) {
        scheduled = true
        queueMicrotask(flush)
      }
    },
  }
}

const batcher = createBatcher(minedItemCache)

interface UseItemTooltipDataResult {
  data: ItemTooltipData | null
  isLoading: boolean
  lookupFailed: boolean
}

export function useItemTooltipData(
  itemLink: string | null,
  instance: ItemTooltipInstance
): UseItemTooltipDataResult {
  const parsed = itemLink != null ? parseItemLink(itemLink) : null
  const itemId = parsed?.itemId ?? null

  const [referenceData, setReferenceData] = useState<MinedItemData | null>(() => {
    if (itemId === null) return null
    return minedItemCache.get(itemId) ?? null
  })

  const [isLoading, setIsLoading] = useState<boolean>(() => {
    if (itemId === null) return false
    return !minedItemCache.has(itemId)
  })

  const [lookupFailed, setLookupFailed] = useState(false)

  const currentItemIdRef = useRef(itemId)
  currentItemIdRef.current = itemId

  const handleFetchComplete = useCallback(
    (results: Map<number, MinedItemData>, outcome: ItemLookupOutcome) => {
      if (itemId === null || itemId !== currentItemIdRef.current) return
      const found = results.get(itemId) ?? null
      setReferenceData(found)
      setLookupFailed(found === null && outcome === "lookup-failed")
      setIsLoading(false)
    },
    [itemId]
  )

  useEffect(() => {
    if (itemId === null) {
      setReferenceData(null)
      setLookupFailed(false)
      setIsLoading(false)
      return
    }

    const cached = minedItemCache.get(itemId)
    if (cached) {
      setReferenceData(cached)
      setLookupFailed(false)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    batcher.enqueue(itemId, handleFetchComplete)
  }, [itemId, handleFetchComplete])

  if (itemId === null) {
    return { data: null, isLoading: false, lookupFailed: false }
  }

  if (isLoading) {
    return { data: null, isLoading: true, lookupFailed: false }
  }

  return {
    data: resolveItemTooltipData(referenceData, instance),
    isLoading: false,
    lookupFailed,
  }
}
