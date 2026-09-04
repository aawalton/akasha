import { asNumber } from "../price-casts/price-casts.module.code.ts"
import { lib } from "../price-state/price-state.module.code.ts"
import type { NormalizedPrice, RawPrice } from "../price-types/price-types.module.code.ts"

lib.RolisPrice = function (this: void, itemLink: string): RawPrice | undefined {
  if (itemLink === undefined) {
    return undefined
  }
  let rolisPrice = lib.ROLIS_PRICE
  if (rolisPrice === undefined) {
    rolisPrice = {
      [lib.LINK_ATTUNABLE_BS]: { vouchers: 250 },
      [lib.LINK_ATTUNABLE_CL]: { vouchers: 250 },
      [lib.LINK_ATTUNABLE_WW]: { vouchers: 250 },
      [lib.LINK_ATTUNABLE_JW]: { vouchers: 250 },
      "Transmute Station": { vouchers: 1250 },
    }
    lib.ROLIS_PRICE = rolisPrice
  }
  const l = lib.Unattune(itemLink)
  let result = rolisPrice[l.item_link]

  if (result === undefined) {
    const itemName = GetItemLinkName(itemLink)
    result = rolisPrice[itemName]
  }
  return result
}

lib.RolisPriceNormalize = function (this: void, rolis: RawPrice): NormalizedPrice[] | undefined {
  if (rolis === undefined) {
    return undefined
  }
  return [
    {
      type: lib.PRICE_ASK,
      [lib.CURRENCY_TYPE_WRIT_VOUCHERS]: asNumber(rolis.vouchers),
      count: 1 / 0,
      days: 0,
    },
  ]
}

lib.Unattune = function (
  this: void,
  itemLink: string
): { item_name: string; item_link: string; furniture_data_id?: number } {
  const itemName = GetItemLinkName(itemLink)

  if (string.find(itemName, "Blacksmithing Station ")[0] !== undefined) {
    return {
      item_name: "Attunable Blacksmithing Station",
      item_link: lib.LINK_ATTUNABLE_BS,
      furniture_data_id: 4050,
    }
  }
  if (string.find(itemName, "Clothing Station ")[0] !== undefined) {
    return {
      item_name: "Attunable Clothier Station",
      item_link: lib.LINK_ATTUNABLE_CL,
      furniture_data_id: 4051,
    }
  }
  if (string.find(itemName, "Woodworking Station ")[0] !== undefined) {
    return {
      item_name: "Attunable Woodworking Station",
      item_link: lib.LINK_ATTUNABLE_WW,
      furniture_data_id: 4052,
    }
  }
  if (string.find(itemName, "Jewelry Crafting Station ")[0] !== undefined) {
    return {
      item_name: "Attunable Jewelry Crafting Station",
      item_link: lib.LINK_ATTUNABLE_JW,
      furniture_data_id: 4051,
    }
  }
  return { item_name: itemName, item_link: itemLink }
}
