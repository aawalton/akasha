import type { HouseData } from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import { isAllDigits } from "akasha/temper/items/core/modules/location-classify/location-classify.module.code.ts"
import type { DestinationChain } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"

const HOUSE_PREFIX = "house:"

export const TRADITIONAL_ITEM_LIMIT_TYPE = 0

interface HousedLocation {
  readonly displayName: string
  readonly house?: HouseData
}

export function houseTarget(destination: string | undefined): number | undefined {
  if (destination === undefined || !destination.startsWith(HOUSE_PREFIX)) return undefined
  const target = destination.slice(HOUSE_PREFIX.length)
  return isAllDigits(target) ? Number(target) : undefined
}

export function houseDestinationOf(collectibleId: number): `house:${string}` {
  return `house:${collectibleId}`
}

export function chainHouses(chain: DestinationChain | undefined): readonly number[] {
  const houses: number[] = []
  for (const tier of chain ?? []) {
    const collectibleId = houseTarget(tier.destination)
    if (collectibleId !== undefined) houses.push(collectibleId)
  }
  return houses
}

export function houseLocationKeyFor(
  collectibleId: number,
  locations: Readonly<Record<string, HousedLocation>>
): string | undefined {
  for (const [key, location] of Object.entries(locations)) {
    if (location.house?.collectibleId === collectibleId) return key
  }
  return undefined
}

export function houseRoomFor(
  location: HousedLocation | undefined,
  limitType: number
): number | undefined {
  const limit = location?.house?.furnishingLimits[limitType]
  if (limit === undefined) return undefined
  return Math.max(0, limit.limit - limit.placed)
}

export function furnishingLimitTypeOf(item: { readonly furnishingLimitType?: number }): number {
  return item.furnishingLimitType ?? TRADITIONAL_ITEM_LIMIT_TYPE
}
