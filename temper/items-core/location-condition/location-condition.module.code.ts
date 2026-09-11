import { ESO_BAG_WORN } from "akasha/temper/items-core/eso-bag-constants/eso-bag-constants.module.code.ts"
import { classifyLocation } from "akasha/temper/items-core/location-classify/location-classify.module.code.ts"
import type { LocationTypeId } from "akasha/temper/items-core/location-type-data/location-type-data.module.code.ts"

export type InventoryLocationConditionId =
  | Exclude<LocationTypeId, "character">
  | "worn"
  | "backpack"

export function locationConditionFromKeyAndBag(
  locationKey: string,
  bagId: number
): InventoryLocationConditionId {
  const type = classifyLocation(locationKey)
  if (type === "character") {
    return bagId === ESO_BAG_WORN ? "worn" : "backpack"
  }
  return type
}
