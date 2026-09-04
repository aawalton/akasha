"use client"

import { useSingleFlight } from "@akasha/design-primitives/use-single-flight"
import type {
  PurchaseRecommendation,
  ShoppingItem,
} from "@akasha/temper-shopping/ttc-shopping-types"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  pinLocationIndex,
  recomputeLocations,
} from "../shopping-optimizer-rules/shopping-optimizer-rules.module.code.ts"
import type {
  LocationPurchase,
  LocationSummary,
  NotAvailableParam,
  OptimizerDerived,
  OptimizerState,
  UpdateShoppingMarks,
} from "../shopping-optimizer-types/shopping-optimizer-types.module.code.ts"
import {
  clearCachedRoute,
  loadCachedRoute,
  saveCachedRoute,
} from "../shopping-route-cache/shopping-route-cache.module.code.ts"
import { readSSEStream } from "../shopping-sse-reader/shopping-sse-reader.module.code.ts"
import type { ShoppingList } from "../use-shopping-list/use-shopping-list.module.code.ts"

const IDLE_STATE: OptimizerState = {
  status: "idle",
  plan: null,
  progress: 0,
  searchCompleted: 0,
  searchTotal: 0,
  currentLocationIndex: 0,
  error: null,
  missingItems: new Set(),
  initialPurchaseCount: 0,
  purchasedCount: 0,
  completedLocationCount: 0,
  spentTotal: 0,
}

const SEARCH_IDLE_TIMEOUT_MS = 60_000

export function useShoppingOptimizer(
  shoppingList: ShoppingList,
  notAvailable: NotAvailableParam,
  updateShoppingMarks: UpdateShoppingMarks
) {
  const [state, setState] = useState<OptimizerState>(
    () => loadCachedRoute(notAvailable.userId) ?? IDLE_STATE
  )

  const abortRef = useRef<AbortController | null>(null)

  const pendingMarksRef = useRef<string[]>([])
  const notAvailableRef = useRef(notAvailable)
  notAvailableRef.current = notAvailable

  const flushPendingMarks = useCallback(async () => {
    const keys = pendingMarksRef.current
    pendingMarksRef.current = []
    if (keys.length === 0) return
    const { userId } = notAvailableRef.current
    if (userId == null) return
    await updateShoppingMarks(keys)
  }, [updateShoppingMarks])

  const singleFlightFlush = useSingleFlight(flushPendingMarks)

  useEffect(() => {
    return () => {
      flushPendingMarks()
    }
  }, [flushPendingMarks])

  useEffect(() => {
    saveCachedRoute(state, notAvailableRef.current.userId)
  }, [state])

  const findListings = useCallback((items: readonly ShoppingItem[]) => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    clearCachedRoute(notAvailableRef.current.userId)

    setState({
      status: "searching",
      plan: null,
      progress: 0,
      searchCompleted: 0,
      searchTotal: 0,
      currentLocationIndex: 0,
      error: null,
      missingItems: new Set(),
      initialPurchaseCount: 0,
      purchasedCount: 0,
      completedLocationCount: 0,
      spentTotal: 0,
    })

    void (async () => {
      let watchdog: ReturnType<typeof setTimeout> | undefined
      const clearWatchdog = () => {
        if (watchdog !== undefined) clearTimeout(watchdog)
        watchdog = undefined
      }
      const armWatchdog = () => {
        clearWatchdog()
        watchdog = setTimeout(() => {
          setState((prev) =>
            prev.status === "searching"
              ? { ...prev, status: "error", progress: 0, error: "Search timed out" }
              : prev
          )
          controller.abort()
        }, SEARCH_IDLE_TIMEOUT_MS)
      }

      try {
        armWatchdog()
        const response = await fetch("/api/shopping/optimize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(items),
          signal: controller.signal,
        })

        if (!response.ok) {
          const body: { error?: string } | null = await response.json().catch(() => null)
          setState((prev) => ({
            ...prev,
            status: "error",
            progress: 0,
            error: body?.error ?? `HTTP ${response.status}`,
          }))
          return
        }

        const { terminal, dropped } = await readSSEStream(
          response,
          ({ completed, total }) => {
            armWatchdog()
            const progress = total > 0 ? (completed / total) * 100 : 0
            setState((prev) =>
              prev.status === "searching"
                ? { ...prev, progress, searchCompleted: completed, searchTotal: total }
                : prev
            )
          },
          ({ plan }) => {
            setState((prev) => ({
              ...prev,
              status: "complete",
              progress: 100,
              plan,
              initialPurchaseCount: plan.purchases.length,
              purchasedCount: 0,
            }))
          },
          ({ error }) => {
            setState((prev) => ({
              ...prev,
              status: "error",
              progress: 0,
              error,
            }))
          }
        )
        if (terminal === "none") {
          if (dropped.length > 0) {
            console.warn(
              "[shopping-optimizer] unreadable SSE frames:",
              dropped.map((d) => `${d.event} (${d.reason})`).join(", ")
            )
          }
          const error =
            dropped.length > 0
              ? "Search finished but the result could not be read — try again"
              : "Search ended without a result — try again"
          setState((prev) =>
            prev.status === "searching" ? { ...prev, status: "error", progress: 0, error } : prev
          )
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return
        setState((prev) => ({
          ...prev,
          status: "error",
          progress: 0,
          error: err instanceof Error ? err.message : "Unknown error",
        }))
      } finally {
        clearWatchdog()
      }
    })()
  }, [])

  const markPurchased = useCallback(
    (key: string) => {
      shoppingList.remove(key)

      setState((prev) => {
        if (!prev.plan) return prev
        const pinnedLocation = prev.plan.locations[prev.currentLocationIndex]
        const purchase = prev.plan.purchases.find((p) => p.key === key)
        const unitPrice = purchase?.unitPrice ?? 0
        const purchases = prev.plan.purchases.filter((p) => p.key !== key)
        const locations = recomputeLocations(purchases)
        const totalCost = purchases.reduce((sum, p) => sum + p.unitPrice, 0)
        const currentLocationIndex = pinLocationIndex(pinnedLocation, locations)
        const locationCleared = pinnedLocation !== undefined && !locations.includes(pinnedLocation)

        return {
          ...prev,
          plan: { ...prev.plan, purchases, locations, totalCost },
          currentLocationIndex,
          purchasedCount: prev.purchasedCount + 1,
          completedLocationCount: prev.completedLocationCount + (locationCleared ? 1 : 0),
          spentTotal: prev.spentTotal + unitPrice,
        }
      })
    },
    [shoppingList]
  )

  const markNotAvailable = useCallback(
    (key: string) => {
      setState((prev) => {
        if (!prev.plan) return prev
        const pinnedLocation = prev.plan.locations[prev.currentLocationIndex]

        const purchases = prev.plan.purchases.filter((p) => p.key !== key)

        const alts = { ...prev.plan.alternatives }
        const candidates = alts[key] ?? []
        const promoted = candidates.shift()

        let missingItems = prev.missingItems
        let planMissing: readonly string[] = prev.plan.missingItems

        if (promoted) {
          purchases.push({
            key: promoted.key,
            listing: promoted.listing,
            unitPrice: promoted.unitPrice,
          })
          alts[key] = candidates.length > 0 ? candidates : []
        } else {
          missingItems = new Set(prev.missingItems)
          missingItems.add(key)
          planMissing = prev.plan.missingItems.includes(key)
            ? prev.plan.missingItems
            : [...prev.plan.missingItems, key]
        }

        const locations = recomputeLocations(purchases)
        const totalCost = purchases.reduce((sum, p) => sum + p.unitPrice, 0)
        const currentLocationIndex = pinLocationIndex(pinnedLocation, locations)

        const locationCleared = pinnedLocation !== undefined && !locations.includes(pinnedLocation)

        return {
          ...prev,
          plan: {
            ...prev.plan,
            purchases,
            locations,
            totalCost,
            missingItems: planMissing,
            alternatives: alts,
          },
          missingItems,
          currentLocationIndex,
          completedLocationCount: prev.completedLocationCount + (locationCleared ? 1 : 0),
        }
      })

      pendingMarksRef.current.push(key)
      singleFlightFlush()
    },
    [singleFlightFlush]
  )

  const advanceLocation = useCallback(() => {
    setState((prev) => {
      if (!prev.plan) return prev
      const next = prev.currentLocationIndex + 1
      if (next >= prev.plan.locations.length) return prev
      return { ...prev, currentLocationIndex: next }
    })
  }, [])

  const reset = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    clearCachedRoute(notAvailableRef.current.userId)
    setState(IDLE_STATE)
  }, [])

  const derived = useMemo((): OptimizerDerived => {
    if (!state.plan || state.plan.locations.length === 0) {
      return {
        currentLocation: null,
        locationPurchases: [],
        routeSummary: [],
        locationCount: 0,
        currentLocationCost: 0,
        stopNumber: 0,
        totalStops: 0,
      }
    }

    const { plan, currentLocationIndex } = state
    const currentLocation = plan.locations[currentLocationIndex] ?? null

    const locationMap = new Map<string, PurchaseRecommendation[]>()
    for (const loc of plan.locations) {
      locationMap.set(loc, [])
    }
    for (const purchase of plan.purchases) {
      const loc = String(purchase.listing.GuildKioskLocationID)
      const arr = locationMap.get(loc)
      if (arr) arr.push(purchase)
    }

    const routeSummary: LocationSummary[] = []
    for (const loc of plan.locations) {
      const purchases = locationMap.get(loc) ?? []
      if (purchases.length === 0) continue
      routeSummary.push({
        location: loc,
        itemCount: purchases.length,
        cost: purchases.reduce((sum, p) => sum + p.unitPrice, 0),
      })
    }

    const currentPurchases = currentLocation != null ? (locationMap.get(currentLocation) ?? []) : []
    const guildMap = new Map<string, PurchaseRecommendation[]>()
    for (const p of currentPurchases) {
      const guild = p.listing.GuildName
      let arr = guildMap.get(guild)
      if (!arr) {
        arr = []
        guildMap.set(guild, arr)
      }
      arr.push(p)
    }

    const locationPurchases: LocationPurchase[] = []
    for (const [guildName, purchases] of guildMap) {
      locationPurchases.push({ guildName, purchases })
    }
    locationPurchases.sort((a, b) => a.guildName.localeCompare(b.guildName))

    const currentLocationCost = currentPurchases.reduce((sum, p) => sum + p.unitPrice, 0)

    return {
      currentLocation,
      locationPurchases,
      routeSummary,
      locationCount: plan.locations.length,
      currentLocationCost,
      stopNumber: state.completedLocationCount + currentLocationIndex + 1,
      totalStops: state.completedLocationCount + plan.locations.length,
    }
  }, [state])

  return {
    state,
    actions: { findListings, markPurchased, markNotAvailable, advanceLocation, reset },
    derived,
  }
}
