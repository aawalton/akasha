import { ESO_BAG_WORN } from "./eso-bag-constants"
import { classifyLocation } from "./location-classify"
import type { LocationTypeId } from "./location-type-data"

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
