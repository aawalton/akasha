import { ADDON_NAME } from "./constants"
import { computeBuyQuantity, computeBuyShortfall, computeGlobalTotal } from "./rules-buy-core"
import { getCompiledConfig } from "./rules-core"
import { shouldConfirmAction, showConfirmDialog } from "./rules-core-confirm-dialog"
import { formatItemList, reportAction, reportPendingAction } from "./rules-core-report"
import { bankCountInBag } from "./rules-dispatch-bank-slots"

interface BuyTarget {
  entryIndex: number
  itemId: number
  link: string
  quantity: number
}

export function dispatchBuyRules(): undefined {
  const compiled = getCompiledConfig()
  if (!compiled) return
  const buyRules = compiled.buyRules
  if (!buyRules) return

  if (compiled.buyStockAvailable !== true) {
    d(
      `[${ADDON_NAME}] Buy skipped: Temper could not read your inventory, so it cannot tell what you already own. Sync from Temper web, then reopen the merchant.`
    )
    return
  }

  const currentCharId = tostring(GetCurrentCharacterId())
  const numEntries = GetNumStoreItems()
  const playerMoney = GetCurrencyAmount(CURT_MONEY, CURRENCY_LOCATION_CHARACTER)

  const targets: BuyTarget[] = []

  for (const [itemIdStr, rule] of Object.entries(buyRules)) {
    const itemId = tonumber(itemIdStr)
    if (itemId === undefined) continue

    const liveCurrent = bankCountInBag(BAG_BACKPACK, itemId, true)
    const byChar = compiled.buyStockByChar?.[itemId]
    const accountStock = compiled.buyStockAccount?.[itemId]
    const globalTotal = computeGlobalTotal(liveCurrent, currentCharId, byChar, accountStock)

    const shortfall = computeBuyShortfall(rule.targetQuantity, globalTotal)
    if (shortfall <= 0) continue

    for (let i = 1; i <= numEntries; i++) {
      const link = GetStoreItemLink(i, LINK_STYLE_BRACKETS)
      if (GetItemLinkItemId(link) !== itemId) continue

      const [, , , price, , meetsRequirementsToBuy] = GetStoreEntryInfo(i)
      if (!meetsRequirementsToBuy) break

      const maxBuyable = GetStoreEntryMaxBuyable(i)
      const n = computeBuyQuantity(shortfall, maxBuyable, playerMoney, price)
      if (n <= 0) break

      targets.push({ entryIndex: i, itemId, link, quantity: n })
      break
    }
  }

  if (targets.length === 0) return

  function executeBuy(): undefined {
    const boughtLinks: string[] = []
    for (const t of targets) {
      BuyStoreItem(t.entryIndex, t.quantity)
      for (let k = 0; k < t.quantity; k++) boughtLinks.push(t.link)
    }
    if (boughtLinks.length > 0) {
      reportAction("Bought", boughtLinks)
    }
  }

  if (shouldConfirmAction("buy")) {
    const allLinks = targets.flatMap((t) => {
      const repeated: string[] = []
      for (let k = 0; k < t.quantity; k++) repeated.push(t.link)
      return repeated
    })
    const n = allLinks.length
    const summary = `Buy ${n} ${n !== 1 ? "items" : "item"}: ${formatItemList(allLinks)}`
    reportPendingAction("Buy", allLinks)
    showConfirmDialog(summary, function (this: void): undefined {
      executeBuy()
    })
  } else {
    executeBuy()
  }
}
