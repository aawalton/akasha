import type {
  ItemAction,
  MoveToDestination,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import {
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
    retrievalVenue === effectiveActionVenue
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
