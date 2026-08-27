import { ESO_BAG_BACKPACK, ESO_BAG_WORN } from "./eso-bag-constants"

export function isCharacterLocationRow(bagIds: readonly number[]): boolean {
  let sawPersonalBag = false
  for (const bagId of bagIds) {
    if (bagId !== ESO_BAG_WORN && bagId !== ESO_BAG_BACKPACK) return false
    sawPersonalBag = true
  }
  return sawPersonalBag
}
