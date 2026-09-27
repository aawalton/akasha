import {
  type CompanionGearPriceResult,
  type CompanionGearSlotDescriptor,
  companionPieceNameOf,
  lookupCompanionGearPrice,
  lookupCompanionGearPriceForSlot,
} from "akasha/temper/economy/trading/pricing/modules/companion-gear-price-lookup/companion-gear-price-lookup.module.code.ts"
import type { PricingData } from "akasha/temper/economy/trading/pricing/modules/pricing-types/pricing-types.module.code.ts"
import type { UnfulfilledGearNeed } from "akasha/temper/items/core/modules/companion-gear-diff/companion-gear-diff.module.code.ts"

export function getCompanionGearItemName(need: UnfulfilledGearNeed): string {
  if (need.category === "weapon") return `Companion's ${need.weaponType ?? need.slotName}`
  const piece = companionPieceNameOf(need.category, need.slotId, need.weight)
  return `Companion's ${piece ?? need.slotName}`
}

export function formatGold(value: number): string {
  return Number.isFinite(value) ? value.toLocaleString("en-US") : "—"
}

export type SlotPriceKey = string
export type BlendedPriceKey = `${string}:${string}`

export function buildSlotPriceMap(
  needs: readonly UnfulfilledGearNeed[],
  pricing: PricingData
): Map<SlotPriceKey, CompanionGearPriceResult> {
  const prices = new Map<SlotPriceKey, CompanionGearPriceResult>()

  for (const [i, need] of needs.entries()) {
    const descriptor: CompanionGearSlotDescriptor = {
      category: need.category,
      slotId: need.slotId,
      weight: need.weight?.toLowerCase(),
      weaponTypeId: need.weaponTypeId,
    }
    const result = lookupCompanionGearPriceForSlot(pricing, descriptor, need.trait, need.quality)
    if (result) {
      prices.set(`${need.trait}:${need.quality}:${need.companionId}:${need.slotId}:${i}`, result)
    }
  }

  return prices
}

export function buildBlendedPriceMap(
  needs: readonly UnfulfilledGearNeed[],
  pricing: PricingData
): Map<BlendedPriceKey, CompanionGearPriceResult> {
  const prices = new Map<BlendedPriceKey, CompanionGearPriceResult>()
  const seen = new Set<BlendedPriceKey>()

  for (const need of needs) {
    const key = `${need.trait}:${need.quality}` satisfies BlendedPriceKey
    if (seen.has(key)) continue
    seen.add(key)

    const result = lookupCompanionGearPrice(pricing, need.trait, need.quality)
    if (result) {
      prices.set(key, result)
    }
  }

  return prices
}

export function resolveNeedPrice(
  need: UnfulfilledGearNeed,
  index: number,
  slotPriceMap: Map<SlotPriceKey, CompanionGearPriceResult>,
  blendedPriceMap: Map<BlendedPriceKey, CompanionGearPriceResult>
): CompanionGearPriceResult | null {
  const slotKey = `${need.trait}:${need.quality}:${need.companionId}:${need.slotId}:${index}`
  return slotPriceMap.get(slotKey) ?? blendedPriceMap.get(`${need.trait}:${need.quality}`) ?? null
}

export function computeGroupCost(
  groupNeeds: readonly { need: UnfulfilledGearNeed & { owned?: boolean }; index: number }[],
  slotPriceMap: Map<SlotPriceKey, CompanionGearPriceResult>,
  blendedPriceMap: Map<BlendedPriceKey, CompanionGearPriceResult>
): number | null {
  let total = 0
  for (const { need, index } of groupNeeds) {
    if (need.owned) continue
    const price = resolveNeedPrice(need, index, slotPriceMap, blendedPriceMap)
    if (price) total += price.estimatedCost
  }
  return total > 0 ? total : null
}

export function computeTotalCost(
  needs: readonly (UnfulfilledGearNeed & { owned?: boolean })[],
  slotPriceMap: Map<SlotPriceKey, CompanionGearPriceResult>,
  blendedPriceMap: Map<BlendedPriceKey, CompanionGearPriceResult>
): number | null {
  let total = 0
  for (const [i, need] of needs.entries()) {
    if (need.owned) continue
    const price = resolveNeedPrice(need, i, slotPriceMap, blendedPriceMap)
    if (price) {
      total += price.estimatedCost
    }
  }
  return total > 0 ? total : null
}
