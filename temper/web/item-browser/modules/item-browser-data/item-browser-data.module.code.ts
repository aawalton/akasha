import {
  FLAGS,
  type ItemFlags,
} from "akasha/temper/web/item-browser/modules/item-browser-constants/item-browser-constants.module.code.ts"
import { PLACE_KINDS } from "akasha/temper/web/item-browser/modules/item-browser-place-kinds/item-browser-place-kinds.module.code.ts"
import { ITEM_BROWSER_ROWS } from "akasha/temper/web/item-browser/modules/item-browser-rows/item-browser-rows.data-table.code.ts"
import { buildSpecialNames } from "akasha/temper/web/item-browser/modules/item-browser-special-names/item-browser-special-names.module.code.ts"
import type { ItemBrowserRow } from "akasha/temper/web/item-browser/modules/item-browser-types/item-browser-types.module.code.ts"

interface ItemBrowserData {
  readonly flags: ItemFlags
  readonly items: readonly ItemBrowserRow[]
  readonly specialNames: { readonly [zoneId: number]: string | undefined }
  readonly zoneClassification: { readonly [zoneId: number]: number | undefined }
}

let cached: ItemBrowserData | undefined

export function getData(this: void): ItemBrowserData {
  if (cached === undefined) {
    cached = {
      flags: FLAGS,
      items: ITEM_BROWSER_ROWS,
      specialNames: buildSpecialNames(),
      zoneClassification: PLACE_KINDS,
    }
  }
  return cached
}
