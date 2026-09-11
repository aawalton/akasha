import {
  FLAGS,
  type ItemFlags,
} from "akasha/temper/item-browser/item-browser-constants/item-browser-constants.module.code.ts"
import {
  ITEMS,
  type RawItem,
} from "akasha/temper/item-browser/item-browser-items/item-browser-items.module.code.ts"
import { buildSpecialNames } from "akasha/temper/item-browser/item-browser-special-names/item-browser-special-names.module.code.ts"
import { ZONE_CLASSIFICATION } from "akasha/temper/item-browser/item-browser-zone-classification/item-browser-zone-classification.module.code.ts"

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
