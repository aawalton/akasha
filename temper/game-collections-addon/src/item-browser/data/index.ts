import { FLAGS, type ItemFlags } from "../constants"
import { ITEMS, type RawItem } from "./generated/items.generated"
import { ZONE_CLASSIFICATION } from "./generated/zone-classification.generated"
import { buildSpecialNames } from "./special-names"


export interface ItemBrowserData {
  readonly flags: ItemFlags
  readonly items: readonly RawItem[]
  readonly specialNames: { readonly [zoneId: number]: string | undefined }
  readonly zoneClassification: { readonly [zoneId: number]: number | undefined }
}

let cached: ItemBrowserData | undefined

export function getData(this: void): ItemBrowserData {
  if (cached === undefined) {
    cached = {
      flags: FLAGS,
      items: ITEMS,
      specialNames: buildSpecialNames(),
      zoneClassification: ZONE_CLASSIFICATION,
    }
  }
  return cached
}
