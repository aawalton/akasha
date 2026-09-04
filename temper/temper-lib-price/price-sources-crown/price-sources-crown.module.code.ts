import { asNumber } from "../price-casts/price-casts.module.code.ts"
import { lib } from "../price-state/price-state.module.code.ts"
import type { NormalizedPrice, RawPrice } from "../price-types/price-types.module.code.ts"

lib.CrownPrice = function (this: void, itemLink: string): RawPrice | undefined {
  if (itemLink === undefined) {
    return undefined
  }
  let cash = lib.CASH
  if (cash === undefined) {
    cash = {
      "The Apprentice": { crowns: 4000 },
      "The Atronach": { crowns: 4000 },
      "The Tower": { crowns: 4000 },
      "The Thief": { crowns: 4000 },
      "The Serpent": { crowns: 4000 },
      "The Ritual": { crowns: 4000 },
      "The Mage": { crowns: 4000 },
      "The Lady": { crowns: 4000 },
      "The Lord": { crowns: 4000 },
      "The Warrior": { crowns: 4000 },
      "The Lover": { crowns: 4000 },
      "The Steed": { crowns: 4000 },
      "The Shadow": { crowns: 4000 },
      "Storage Coffer, Secure": { crowns: 100 },
      "Storage Coffer, Sturdy": { crowns: 100 },
      "Storage Coffer, Oaken": { crowns: 100 },
      "Storage Chest, Fortified": { crowns: 200 },
      "Storage Chest, Oaken": { crowns: 200 },
      "Storage Chest, Secure": { crowns: 200 },
      "Storage Chest, Sturdy": { crowns: 200 },
      "Nuzhimeh the Merchant": { crowns: 5000 },
      "Tythis Andromo, the Banker": { crowns: 5000 },
      "Music Box, Blood and Glory": { crowns: 800 },
      "Imperial Pillar, Chipped": { crowns: 410 },
      "Imperial Pillar, Straight": { crowns: 410 },
    }
    lib.CASH = cash
  }
  const name = GetItemLinkName(itemLink)
  return cash[name]
}

lib.CrownPriceNormalize = function (this: void, cash: RawPrice): NormalizedPrice[] | undefined {
  if (cash === undefined) {
    return undefined
  }
  return [{ type: lib.PRICE_ASK, crowns: asNumber(cash.crowns), count: 1 / 0, days: 0 }]
}
