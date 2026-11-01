import type {
  ItemAction,
  MoveToDestination,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import {
  DETAILED_VENUES,
  planPhraseOf,
  withDepositNote,
} from "akasha/temper/items/rules/routing/core/modules/inventory-management-plan-route-venue/inventory-management-plan-route-venue.module.code.ts"
import type {
  PlanItem,
  RouteStep,
  VenueType,
} from "akasha/temper/items/rules/routing/core/modules/inventory-management-plan-types/inventory-management-plan-types.module.code.ts"
import { deposit } from "akasha/temper/items/rules/routing/core/temper-plan-phrase/pages/deposit.temper-plan-phrase.ts"
import { withdraw } from "akasha/temper/items/rules/routing/core/temper-plan-phrase/pages/withdraw.temper-plan-phrase.ts"

export function buildCrossCharSteps(
  sourceCharId: string,
  targetCharId: string,
  effectiveActionVenue: VenueType | null,
  actionDetail: string | undefined,
  actionStorageKey: string | undefined,
  action: ItemAction,
  planItem: PlanItem
): readonly RouteStep[] {
  const { itemId } = planItem
  const steps: RouteStep[] = []

  steps.push({
    characterId: sourceCharId,
    venue: "bank",
    storageKey: "Bank",
    operation: "deposit",
    item: { ...planItem, note: planPhraseOf(deposit) },
    itemId,
  })

  if (effectiveActionVenue === "bank") {
    steps.push({
      characterId: targetCharId,
      venue: "bank",
      storageKey: "Bank",
      operation: "retrieve",
      item: { ...planItem, note: planPhraseOf(withdraw) },
      itemId,
    })
  } else if (effectiveActionVenue != null) {
    steps.push({
      characterId: targetCharId,
      venue: "bank",
      storageKey: "Bank",
      operation: "retrieve",
      item: { ...planItem, note: planPhraseOf(withdraw) },
      itemId,
    })
    steps.push({
      characterId: targetCharId,
      venue: effectiveActionVenue,
      venueDetail: actionDetail,
      storageKey: actionStorageKey,
      operation: "act",
      item: withDepositNote(planItem, action, effectiveActionVenue),
      itemId,
    })
  }

  return steps
}

export function buildCarrierHandoffSteps(
  carrierId: string,
  targetCharId: string,
  retrieval: {
    readonly venue: VenueType
    readonly detail: string | undefined
    readonly storageKey: string | undefined
  },
  effectiveActionVenue: VenueType | null,
  actionDetail: string | undefined,
  actionStorageKey: string | undefined,
  action: ItemAction,
  planItem: PlanItem
): readonly RouteStep[] {
  return [
    {
      characterId: carrierId,
      venue: retrieval.venue,
      venueDetail: retrieval.detail,
      storageKey: retrieval.storageKey,
      operation: "retrieve",
      item: { ...planItem, note: planPhraseOf(withdraw) },
      itemId: planItem.itemId,
    },
    ...buildCrossCharSteps(
      carrierId,
      targetCharId,
      effectiveActionVenue,
      actionDetail,
      actionStorageKey,
      action,
      planItem
    ),
  ]
}

export function backpackSlotsFor(item: PlanItem): number {
  const most = item.maxStackSize ?? 1
  if (most <= 1) return 1
  return Math.max(1, Math.ceil(item.stackCount / most))
}

function carrierLeg(route: readonly RouteStep[]): readonly [RouteStep, RouteStep] | undefined {
  const [taken, banked, handed] = route
  if (taken === undefined || banked === undefined || handed === undefined) return undefined
  if (taken.operation !== "retrieve" || banked.operation !== "deposit") return undefined
  if (banked.venue !== "bank" || taken.characterId !== banked.characterId) return undefined
  if (handed.characterId === taken.characterId) return undefined
  return [taken, banked]
}

export function mergeCarrierHandoffs(
  routes: readonly (readonly RouteStep[])[]
): readonly (readonly RouteStep[])[] {
  const kept: (readonly RouteStep[])[] = []
  const legs = new Map<string, [RouteStep, RouteStep]>()
  for (const route of routes) {
    const leg = carrierLeg(route)
    if (leg === undefined) {
      kept.push(route)
      continue
    }
    const [taken, banked] = leg
    const key = `${taken.characterId}\0${taken.storageKey ?? ""}\0${taken.itemId}`
    const held = legs.get(key)
    if (held === undefined) {
      legs.set(key, [taken, banked])
    } else {
      const units = held[0].item.stackCount + taken.item.stackCount
      legs.set(key, [
        { ...held[0], item: { ...held[0].item, stackCount: units } },
        { ...held[1], item: { ...held[1].item, stackCount: units } },
      ])
    }
    kept.push(route.slice(2))
  }
  return [...legs.values(), ...kept]
}

export function buildSharedStorageSteps(
  charId: string,
  retrievalVenue: VenueType | null,
  retrievalDetail: string | undefined,
  retrievalStorageKey: string | undefined,
  effectiveActionVenue: VenueType | null,
  actionDetail: string | undefined,
  actionStorageKey: string | undefined,
  action: ItemAction,
  destination: MoveToDestination | undefined,
  planItem: PlanItem
): readonly RouteStep[] {
  const isBackpackDelivery =
    (action === "move-to" || action === "stock") &&
    destination !== undefined &&
    destination.startsWith("character:") &&
    !destination.startsWith("character-worn:")

  const { itemId } = planItem
  const steps: RouteStep[] = []

  if (isBackpackDelivery && retrievalVenue != null) {
    steps.push({
      characterId: charId,
      venue: retrievalVenue,
      venueDetail: retrievalDetail,
      storageKey: retrievalStorageKey,
      operation: "retrieve",
      item: { ...planItem, note: planPhraseOf(withdraw) },
      itemId,
    })
    return steps
  }

  if (
    retrievalVenue != null &&
    effectiveActionVenue != null &&
    retrievalVenue === effectiveActionVenue &&
    (!DETAILED_VENUES.has(retrievalVenue) || retrievalStorageKey === actionStorageKey)
  ) {
    steps.push({
      characterId: charId,
      venue: effectiveActionVenue,
      venueDetail: retrievalDetail ?? actionDetail,
      storageKey: retrievalStorageKey ?? actionStorageKey,
      operation: "act",
      item: withDepositNote(planItem, action, effectiveActionVenue),
      itemId,
    })
  } else {
    if (retrievalVenue != null) {
      steps.push({
        characterId: charId,
        venue: retrievalVenue,
        venueDetail: retrievalDetail,
        storageKey: retrievalStorageKey,
        operation: "retrieve",
        item: { ...planItem, note: planPhraseOf(withdraw) },
        itemId,
      })
    }
    if (effectiveActionVenue != null) {
      steps.push({
        characterId: charId,
        venue: effectiveActionVenue,
        venueDetail: actionDetail,
        storageKey: actionStorageKey,
        operation: "act",
        item: withDepositNote(planItem, action, effectiveActionVenue),
        itemId,
      })
    }
  }

  return steps
}
