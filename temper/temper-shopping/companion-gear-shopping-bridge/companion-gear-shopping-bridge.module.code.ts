import type {
  CompanionEquipmentQualityId,
  CompanionTraitId,
} from "@akasha/temper-trading-pricing/companion-gear-ids"
import {
  COMPANION_TRAIT_TO_TTC_TRAIT,
  type CompanionGearSlotDescriptor,
  resolveTtcItemId,
  WEIGHT_TO_CATEGORY2,
} from "@akasha/temper-trading-pricing/companion-gear-price-lookup"
import { isPriceEntry } from "@akasha/temper-trading-pricing/is-price-entry"
import type { PricingData } from "@akasha/temper-trading-pricing/pricing-types"
import type { ShoppingItem } from "../ttc-shopping-types/ttc-shopping-types.module.code.ts"

export interface CompanionGearNeed {
  companionId: string
  category: "armor" | "jewelry" | "weapon"
  slotId: string
  trait: CompanionTraitId
  quality: CompanionEquipmentQualityId
  weight?: string
  weaponTypeId?: string
}

const QUALITY_TO_LIVE_API: Partial<Record<CompanionEquipmentQualityId, number>> = {
  normal: 0,
  fine: 1,
  superior: 2,
  epic: 3,
  legendary: 4,
}

export function needToShoppingKey(need: CompanionGearNeed): string {
  return `${need.companionId}:${need.slotId}:${need.trait}:${need.quality}`
}

export function needToShoppingItem(
  need: CompanionGearNeed,
  pricing: PricingData | null
): ShoppingItem | null {
  const ttcTraitId = COMPANION_TRAIT_TO_TTC_TRAIT[need.trait]
  const qualityId = QUALITY_TO_LIVE_API[need.quality]
  if (ttcTraitId == null || qualityId === undefined) return null

  const descriptor: CompanionGearSlotDescriptor = {
    category: need.category,
    slotId: need.slotId,
    weight: need.weight?.toLowerCase(),
    weaponTypeId: need.weaponTypeId,
  }

  const ttcItemIdStr = resolveTtcItemId(descriptor)
  if (ttcItemIdStr == null) return null
  const itemId = Number(ttcItemIdStr)

  const key = needToShoppingKey(need)

  const searchParams: ShoppingItem["searchParams"] = {
    ItemID: itemId,
    ItemTraitID: Number(ttcTraitId),
    ItemQualityID: qualityId,
    LevelMin: 1,
    LevelMax: 1,
  }

  if (need.category === "armor" && need.weight != null) {
    const cat2 = WEIGHT_TO_CATEGORY2[need.weight.toLowerCase()]
    if (cat2 != null) {
      searchParams.ItemCategory2ID = Number(cat2)
    }
  }

  let priceData: ShoppingItem["priceData"]
  if (pricing) {
    const offlineQuality = String(qualityId)
    const itemData = pricing.Data[ttcItemIdStr]
    const qualityData = itemData?.[offlineQuality]
    const levelData = qualityData?.["1"]
    const traitData = levelData?.[ttcTraitId]

    if (traitData) {
      if (need.category === "armor" && need.weight != null) {
        const cat2 = WEIGHT_TO_CATEGORY2[need.weight.toLowerCase()]
        if (cat2 != null && !isPriceEntry(traitData)) {
          priceData = traitData[cat2]
        }
      } else if (isPriceEntry(traitData)) {
        priceData = traitData
      }
    }
  }

  return { key, searchParams, priceData }
}
