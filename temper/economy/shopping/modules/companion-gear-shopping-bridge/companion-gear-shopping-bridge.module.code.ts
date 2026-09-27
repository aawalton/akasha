import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"
import type { ShoppingItem } from "akasha/temper/economy/shopping/modules/ttc-shopping-types/ttc-shopping-types.module.code.ts"
import {
  type CompanionGearSlotDescriptor,
  resolveTtcItemId,
  ttcCategoryOf,
  ttcQualityIdOf,
  ttcTraitIdOf,
} from "akasha/temper/economy/trading/pricing/modules/companion-gear-price-lookup/companion-gear-price-lookup.module.code.ts"
import { isPriceEntry } from "akasha/temper/economy/trading/pricing/modules/is-price-entry/is-price-entry.module.code.ts"
import type { PricingData } from "akasha/temper/economy/trading/pricing/modules/pricing-types/pricing-types.module.code.ts"

interface CompanionGearNeed {
  companionId: string
  category: "armor" | "jewelry" | "weapon"
  slotId: string
  trait: Slug
  quality: Slug
  weight?: string
  weaponTypeId?: string
}

export function needToShoppingKey(need: CompanionGearNeed): string {
  return `${need.companionId}:${need.slotId}:${need.trait}:${need.quality}`
}

export function needToShoppingItem(
  need: CompanionGearNeed,
  pricing: PricingData | null
): ShoppingItem | null {
  const ttcTraitId = ttcTraitIdOf(need.trait)
  const qualityId = ttcQualityIdOf(need.quality)
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
    const cat2 = ttcCategoryOf(need.weight)
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
        const cat2 = ttcCategoryOf(need.weight)
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
