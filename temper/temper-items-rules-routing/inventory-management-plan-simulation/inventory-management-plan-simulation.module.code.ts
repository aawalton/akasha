import {
  buildVenueLabel,
  VENUE_LABELS,
  VENUE_ORDER,
} from "@akasha/temper-items-rules-routing-core/inventory-management-plan-route-venue"
import type {
  PlanItem,
  VenueStop,
  VenueType,
} from "@akasha/temper-items-rules-routing-core/inventory-management-plan-types"
import {
  buildActionGroups,
  sumTotalValues,
} from "../inventory-management-plan-grouping/inventory-management-plan-grouping.module.code.ts"

export interface SimStep {
  venue: VenueType
  venueDetail?: string
  storageKey?: string
  operation: "retrieve" | "deposit" | "act"
  planItem: PlanItem
  backpackSlots: number
  itemId: number
  stackable: boolean
  occupiesStorageSlot: boolean
  next: SimStep | null
}

export interface CharSimState {
  characterId: string
  pending: readonly SimStep[]
  isSource: boolean
  depositKeys: Set<string>
}

interface VenueCandidate {
  venue: VenueType
  venueDetail?: string
  freers: readonly SimStep[]
  retrievals: readonly SimStep[]
  progress: number
}

function venueGroupKey(venue: VenueType, detail?: string): string {
  return detail != null ? `${venue}\0${detail}` : venue
}

function pickBestVenue(
  pending: readonly SimStep[],
  freeSlots: number | null,
  storageFreeSlots: Map<string, number>
): VenueCandidate | null {
  const bpUnconstrained = freeSlots === null

  const byVenue = new Map<
    string,
    {
      venue: VenueType
      venueDetail?: string
      storageKey?: string
      freers: SimStep[]
      retrievals: SimStep[]
    }
  >()
  for (const step of pending) {
    const key = venueGroupKey(step.venue, step.venueDetail)
    let bucket = byVenue.get(key)
    if (!bucket) {
      bucket = {
        venue: step.venue,
        venueDetail: step.venueDetail,
        storageKey: step.storageKey,
        freers: [],
        retrievals: [],
      }
      byVenue.set(key, bucket)
    }
    if (step.operation === "retrieve") {
      bucket.retrievals.push(step)
    } else {
      bucket.freers.push(step)
    }
  }

  let best: VenueCandidate | null = null

  for (const venueType of VENUE_ORDER) {
    for (const bucket of byVenue.values()) {
      if (bucket.venue !== venueType) continue

      const { freers, retrievals: allRetrievals } = bucket
      const storageFree =
        bucket.storageKey !== undefined ? (storageFreeSlots.get(bucket.storageKey) ?? 0) : undefined

      let cappedFreers: SimStep[]
      let cappedRetrievals: SimStep[]

      if (storageFree !== undefined) {
        const occupyingFreers = freers.filter((s) => s.occupiesStorageSlot)
        const nonOccupyingFreers = freers.filter((s) => !s.occupiesStorageSlot)
        const occupyingRetrievals = allRetrievals.filter((s) => s.backpackSlots > 0)

        let rCount =
          freeSlots === null
            ? allRetrievals.length
            : Math.min(allRetrievals.length, Math.max(0, freeSlots))
        let fOccCount = Math.min(
          occupyingFreers.length,
          Math.max(0, storageFree + Math.min(rCount, occupyingRetrievals.length))
        )

        const bpFreed =
          cappedBpSum(occupyingFreers, fOccCount) +
          nonOccupyingFreers.reduce((sum, s) => sum + s.backpackSlots, 0)
        if (freeSlots !== null) {
          rCount = Math.min(allRetrievals.length, Math.max(0, freeSlots + bpFreed))
        }
        fOccCount = Math.min(
          occupyingFreers.length,
          Math.max(0, storageFree + Math.min(rCount, occupyingRetrievals.length))
        )

        cappedFreers = nonOccupyingFreers.concat(occupyingFreers.slice(0, fOccCount))
        cappedRetrievals = allRetrievals.slice(0, rCount)
      } else {
        const slotFreedCount = bpUnconstrained
          ? 0
          : freers.reduce((sum, s) => sum + s.backpackSlots, 0)
        const slotsAvailable =
          freeSlots === null ? allRetrievals.length : freeSlots + slotFreedCount
        cappedFreers = freers
        cappedRetrievals = allRetrievals.slice(0, Math.max(0, slotsAvailable))
      }

      const progress = cappedFreers.length + cappedRetrievals.length
      if (progress === 0) continue

      if (!best || progress > best.progress) {
        best = {
          venue: venueType,
          venueDetail: bucket.venueDetail,
          freers: cappedFreers,
          retrievals: cappedRetrievals,
          progress,
        }
      }
    }
  }

  return best
}

function cappedBpSum(steps: readonly SimStep[], count: number): number {
  let sum = 0
  const limit = Math.min(count, steps.length)
  for (let i = 0; i < limit; i++) {
    const step = steps[i]
    if (step === undefined) continue
    sum += step.backpackSlots
  }
  return sum
}

export function simulateCharacterSession(
  state: CharSimState,
  freeSlots: number | null,
  storageFreeSlots: Map<string, number>
): { venues: readonly VenueStop[]; freeSlots: number | null } {
  const venues: VenueStop[] = []
  let currentFreeSlots = freeSlots

  while (state.pending.length > 0) {
    const best = pickBestVenue(state.pending, currentFreeSlots, storageFreeSlots)
    if (!best) break

    const processedItems: PlanItem[] = []
    const processedSteps = new Set<SimStep>()
    const newPending: SimStep[] = []

    for (const step of best.freers) {
      processedItems.push(step.planItem)
      processedSteps.add(step)
      if (step.backpackSlots > 0) {
        if (currentFreeSlots !== null) currentFreeSlots += step.backpackSlots
      }
      if (step.occupiesStorageSlot && step.storageKey !== undefined) {
        const cur = storageFreeSlots.get(step.storageKey)
        if (cur !== undefined) storageFreeSlots.set(step.storageKey, cur - 1)
      }
      if (step.next) newPending.push(step.next)
    }

    for (const step of best.retrievals) {
      processedItems.push(step.planItem)
      processedSteps.add(step)
      if (step.backpackSlots > 0) {
        if (currentFreeSlots !== null) currentFreeSlots -= step.backpackSlots
      }
      if (step.storageKey !== undefined) {
        const cur = storageFreeSlots.get(step.storageKey)
        if (cur !== undefined) storageFreeSlots.set(step.storageKey, cur + 1)
      }
      if (step.next) newPending.push(step.next)
    }

    state.pending = state.pending.filter((s) => !processedSteps.has(s)).concat(newPending)

    const actionGroups = buildActionGroups(processedItems)
    let slotCount = 0
    for (const g of actionGroups) slotCount += g.slotCount
    const stop: VenueStop = {
      venue: best.venue,
      label: buildVenueLabel(best.venue, best.venueDetail),
      actionGroups,
      slotCount,
      totalValue: sumTotalValues(actionGroups.map((g) => g.totalValue)),
    }
    if (best.venueDetail != null) stop.venueCategory = VENUE_LABELS[best.venue]
    venues.push(stop)
  }

  return { venues, freeSlots: currentFreeSlots }
}
