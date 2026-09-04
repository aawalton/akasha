"use client"

import { applyCompanionMetadata } from "@akasha/temper-build-metadata/build-metadata"
import { decodeCompanion } from "@akasha/temper-companion-codec/companion-codec"
import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import type { CompanionId } from "@akasha/temper-companions-core/companions"
import { companions, getCompanionName } from "@akasha/temper-companions-core/companions"
import { useAllCompanionList } from "@akasha/temper-companions-ui/use-companions"
import { buildHash as toBuildHash } from "@akasha/temper-formula-framework/branded-id"
import {
  type CompanionGearNeed,
  computeAllGearNeeds,
} from "@akasha/temper-items-core/companion-gear-diff"
import { useCompletionCompanions } from "@akasha/temper-player-completion-ui/use-completion"
import {
  useInventory,
  usePriceExtract,
} from "@akasha/temper-player-inventory-management-ui/hooks-inventory"
import {
  type EffectivePricingRegion,
  type PricingRegionNoteKind,
  resolvePricingRegion,
  resolvePricingRegionNote,
} from "@akasha/temper-player-inventory-management-ui/pricing-region"
import { usePlayer } from "@akasha/temper-player-profile/use-player"
import type { CompanionGearPriceResult } from "@akasha/temper-trading-pricing/companion-gear-price-lookup"
import type { PricingData } from "@akasha/temper-trading-pricing/pricing-types"
import { useMemo } from "react"
import {
  type BlendedPriceKey,
  buildBlendedPriceMap,
  buildSlotPriceMap,
  computeTotalCost,
  type SlotPriceKey,
} from "../companion-gear-pricing-rules/companion-gear-pricing-rules.module.code.ts"

interface ShoppingEntity {
  companionId: CompanionId
  companionName: string
  targetBuildData: CompanionState | null
}

interface CompanionShoppingData {
  entityCount: number
  allNeeds: readonly CompanionGearNeed[]
  unownedNeeds: readonly CompanionGearNeed[]
  ownedCount: number
  totalCount: number
  pricing: PricingData | null
  slotPriceMap: Map<SlotPriceKey, CompanionGearPriceResult> | null
  blendedPriceMap: Map<BlendedPriceKey, CompanionGearPriceResult> | null
  totalCost: number | null
  regionNote: PricingRegionNoteKind
  pricingRegion: EffectivePricingRegion
}

export function useCompanionShoppingData(userId: string | null): CompanionShoppingData {
  const { builds } = useAllCompanionList(userId)
  const { companions: completionCompanions } = useCompletionCompanions()
  const { inventory } = useInventory(userId)
  const { isLoading: playerLoading, profileMetadata } = usePlayer()
  const pricingRegion = resolvePricingRegion(profileMetadata)
  const {
    pricing,
    isLoading: pricingLoading,
    error: pricingError,
  } = usePriceExtract("companion-gear", pricingRegion.platform, pricingRegion.server)

  const regionNote = resolvePricingRegionNote({
    playerSettled: !playerLoading,
    isDefaulted: pricingRegion.isDefaulted,
    pricing,
    isLoading: pricingLoading,
    error: pricingError,
  })

  const buildMap = useMemo(() => {
    const map = new Map<string, { buildData: CompanionState | null }>()
    for (const build of builds) {
      if (build.userId !== userId) continue
      const decoded = build.buildHash !== "" ? decodeCompanion(toBuildHash(build.buildHash)) : null
      const buildData =
        decoded && build.buildMetadata ? applyCompanionMetadata(decoded, build.buildMetadata) : null
      map.set(build.id, { buildData })
    }
    return map
  }, [builds, userId])

  const shoppingEntities = useMemo(() => {
    const entities: ShoppingEntity[] = []
    for (const entity of completionCompanions) {
      const companionId = entity.companionId
      if (!companions.has(companionId)) continue
      const targetBuild =
        entity.targetBuildId != null ? buildMap.get(entity.targetBuildId) : undefined
      if (!targetBuild) continue
      entities.push({
        companionId,
        companionName: getCompanionName(companionId),
        targetBuildData: targetBuild.buildData,
      })
    }
    return entities
  }, [completionCompanions, buildMap])

  const {
    needs: allNeeds,
    ownedCount,
    totalCount,
  } = useMemo(() => {
    return computeAllGearNeeds(shoppingEntities, inventory)
  }, [shoppingEntities, inventory])

  const unownedNeeds = useMemo(() => allNeeds.filter((n) => !n.owned), [allNeeds])

  const slotPriceMap = useMemo(() => {
    if (!pricing) return null
    return buildSlotPriceMap(unownedNeeds, pricing)
  }, [unownedNeeds, pricing])

  const blendedPriceMap = useMemo(() => {
    if (!pricing) return null
    return buildBlendedPriceMap(unownedNeeds, pricing)
  }, [unownedNeeds, pricing])

  const totalCost = useMemo(() => {
    if (!slotPriceMap || !blendedPriceMap) return null
    return computeTotalCost(unownedNeeds, slotPriceMap, blendedPriceMap)
  }, [unownedNeeds, slotPriceMap, blendedPriceMap])

  return {
    entityCount: shoppingEntities.length,
    allNeeds,
    unownedNeeds,
    ownedCount,
    totalCount,
    pricing,
    slotPriceMap,
    blendedPriceMap,
    totalCost,
    regionNote,
    pricingRegion,
  }
}
