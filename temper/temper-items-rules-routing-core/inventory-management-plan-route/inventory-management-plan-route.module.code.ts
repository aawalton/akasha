import type { InventoryDatabase } from "@akasha/temper-items-core/inventory-types"
import { classifyLocation } from "@akasha/temper-items-core/location-classify"
import type { AffectedItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import type {
  ItemAction,
  MoveToDestination,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import type { RuleMatcherContext } from "@akasha/temper-items-rules-core/rule-matcher-context-types"
import { isConsolidateDest } from "../inventory-consolidate-dest/inventory-consolidate-dest.module.code.ts"
import {
  computePlanItemValue,
  extractTargetCharId,
  getFirstCharacterId,
  resolveStorageDetail,
  resolveStorageKey,
} from "../inventory-management-plan-route-helpers/inventory-management-plan-route-helpers.module.code.ts"
import {
  buildCrossCharSteps,
  buildSharedStorageSteps,
} from "../inventory-management-plan-route-steps/inventory-management-plan-route-steps.module.code.ts"
import {
  DETAILED_VENUES,
  getActionVenue,
  LOCATION_ACCESS_VENUE,
  withDepositNote,
} from "../inventory-management-plan-route-venue/inventory-management-plan-route-venue.module.code.ts"
import type {
  PlanItem,
  RouteStep,
  VenueType,
} from "../inventory-management-plan-types/inventory-management-plan-types.module.code.ts"

export function resolveItemRoute(
  entry: AffectedItem,
  action: ItemAction,
  destination: MoveToDestination | undefined,
  inventory: InventoryDatabase | null,
  context?: RuleMatcherContext,
  options?: {
    useTargetCharIdOverride?: string
    stackCountOverride?: number
    chainTierDirect?: boolean
  }
): readonly RouteStep[] {
  const { item } = entry
  const stackCount = options?.stackCountOverride ?? entry.quantity ?? item.stackCount
  const planItem: PlanItem = {
    itemId: item.itemId,
    itemName: item.itemName,
    stackCount,
    quality: item.quality,
    action,
    value: computePlanItemValue(action, item),
    marketValue: item.estimatedValue,
    replacementValue: item.replacementCost,
    merchantValue: item.merchantValue,
    saleAvg: item.saleAvg,
    minPrice: item.minPrice,
    amountCount: item.amountCount,
    saleAmountCount: item.saleAmountCount,
    suggestedPrice: item.suggestedPrice,
  }

  const locationType = classifyLocation(entry.locationKey)
  const isCharacterSource = locationType === "character"
  const retrievalVenue: VenueType | null = LOCATION_ACCESS_VENUE[locationType]

  const rawActionVenue = getActionVenue(action, destination, entry.item.stolen)
  const effectiveActionVenue: VenueType | null =
    rawActionVenue ?? (action === "use" || action === "open" ? "backpack" : null)

  if (effectiveActionVenue == null && retrievalVenue == null) return []

  const retrievalDetail =
    retrievalVenue != null && DETAILED_VENUES.has(retrievalVenue)
      ? entry.locationDisplayName
      : undefined
  const actionDetail = resolveStorageDetail(effectiveActionVenue, destination, inventory)

  const retrievalStorageKey = retrievalVenue != null ? entry.locationKey : undefined
  const actionStorageKey = resolveStorageKey(effectiveActionVenue, destination, inventory)

  let targetCharId = extractTargetCharId(destination)

  if (targetCharId == null && options?.useTargetCharIdOverride !== undefined) {
    targetCharId = options.useTargetCharIdOverride
  }

  if (
    targetCharId == null &&
    isConsolidateDest(destination) &&
    (context?.characterPriority?.length ?? 0) > 0
  ) {
    targetCharId = context?.characterPriority?.[0] ?? null
  }

  const sourceCharId = isCharacterSource ? entry.locationKey : null
  const isCrossChar = isCharacterSource && targetCharId != null && targetCharId !== sourceCharId

  const primaryCharId = targetCharId ?? sourceCharId ?? getFirstCharacterId(inventory)
  if (primaryCharId == null) return []

  if (isCrossChar && sourceCharId !== null && targetCharId !== null) {
    return buildCrossCharSteps(
      sourceCharId,
      targetCharId,
      effectiveActionVenue,
      actionDetail,
      actionStorageKey,
      action,
      planItem
    )
  } else if (isCharacterSource) {
    if (effectiveActionVenue != null) {
      return [
        {
          characterId: primaryCharId,
          venue: effectiveActionVenue,
          venueDetail: actionDetail,
          storageKey: actionStorageKey,
          operation: "act",
          item: withDepositNote(planItem, action, effectiveActionVenue),
          itemId: planItem.itemId,
        },
      ]
    }
    return []
  } else {
    if (options?.chainTierDirect === true && effectiveActionVenue != null) {
      return [
        {
          characterId: primaryCharId,
          venue: effectiveActionVenue,
          venueDetail: actionDetail,
          storageKey: actionStorageKey,
          operation: "act",
          item: withDepositNote(planItem, action, effectiveActionVenue),
          itemId: planItem.itemId,
        },
      ]
    }
    return buildSharedStorageSteps(
      primaryCharId,
      retrievalVenue,
      retrievalDetail,
      retrievalStorageKey,
      effectiveActionVenue,
      actionDetail,
      actionStorageKey,
      action,
      destination,
      planItem
    )
  }
}
