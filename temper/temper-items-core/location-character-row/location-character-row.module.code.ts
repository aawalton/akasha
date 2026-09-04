import {
  ESO_BAG_BACKPACK,
  ESO_BAG_WORN,
} from "../eso-bag-constants/eso-bag-constants.module.code.ts"

export function isCharacterLocationRow(bagIds: readonly number[]): boolean {
  let sawPersonalBag = false
  for (const bagId of bagIds) {
    if (bagId !== ESO_BAG_WORN && bagId !== ESO_BAG_BACKPACK) return false
    sawPersonalBag = true
  }
  return sawPersonalBag
}
