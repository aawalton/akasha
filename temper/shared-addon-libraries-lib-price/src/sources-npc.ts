import { asNumber } from "./casts"
import { luaTruthy } from "./lua-truthy"
import { lib } from "./state"
import type { NormalizedPrice, RawPrice } from "./types"

lib.NPCPrice = function (this: void, itemLink: string): RawPrice | undefined {
  const [, value] = GetItemLinkInfo(itemLink)
  let npcPurchase: number | undefined
  if (MasterMerchant !== undefined && MasterMerchant.vendor_price_table !== undefined) {
    const itemId = GetItemLinkItemId(itemLink)
    const [itemType] = GetItemLinkItemType(itemLink)
    const byType = MasterMerchant.vendor_price_table[itemType]
    if (byType !== undefined) {
      npcPurchase = byType[itemId]
    }
  }

  if (!luaTruthy(value) && !luaTruthy(npcPurchase)) {
    return undefined
  }
  return {
    npcVendor: value > 0 ? value : undefined,
    npcPurchase: npcPurchase !== undefined && npcPurchase > 0 ? npcPurchase : undefined,
  }
}

lib.NPCPriceNormalize = function (this: void, npc: RawPrice): NormalizedPrice[] | undefined {
  if (npc === undefined) {
    return undefined
  }
  const prices: NormalizedPrice[] = []
  if (luaTruthy(npc.npcVendor)) {
    prices.push({ type: lib.PRICE_BID, price: asNumber(npc.npcVendor), count: 1 / 0, days: 0 })
  }
  if (luaTruthy(npc.npcPurchase)) {
    prices.push({ type: lib.PRICE_ASK, price: asNumber(npc.npcPurchase), count: 1 / 0, days: 0 })
  }
  return prices
}
