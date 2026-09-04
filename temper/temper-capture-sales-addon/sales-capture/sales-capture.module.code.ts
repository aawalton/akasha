import "@akasha/temper-addon-library-types/lib-histoire"
import "@akasha/temper-eso-types/eso-enums-06"
import "@akasha/temper-eso-types/eso-enums-07"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-08"

import type { SalesPayload } from "@akasha/temper-capture-sales/sales-payload"

let getSavedVariables: (() => SalesPayload) | undefined

export function setSalesAccessor(accessor: () => SalesPayload): undefined {
  getSavedVariables = accessor
}

function recordSale(
  ownName: string,
  guildName: string,
  event: GuildHistoryEventRef,
  info: GuildHistoryTraderEventInfo
): undefined {
  if (info.sellerDisplayName !== ownName) return

  const accessor = getSavedVariables
  if (!accessor) return
  const sv = accessor()

  const saleId = Id64ToString(event.GetEventId())
  if (saleId === "") return

  let sales = sv.sales
  if (sales === undefined) {
    sales = {}
    sv.sales = sales
  }

  sales[saleId] = {
    saleId,
    itemLink: info.itemLink,
    itemName: GetItemLinkName(info.itemLink),
    itemId: GetItemLinkItemId(info.itemLink),
    quantity: info.quantity,
    price: info.price,
    tax: info.tax,
    buyerName: info.buyerDisplayName,
    guildName,
    soldAt: event.GetEventTimestampS(),
  }
}

export function startSalesCapture(addonName: string): undefined {
  const lib = LibHistoire
  if (!lib) return

  const ownName = GetDisplayName()

  lib.OnReady((ready) => {
    const numGuilds = GetNumGuilds()
    for (let i = 1; i <= numGuilds; i++) {
      const guildId = GetGuildId(i)
      const guildName = GetGuildName(guildId)
      const processor = ready.CreateGuildHistoryProcessor(
        guildId,
        GUILD_HISTORY_EVENT_CATEGORY_TRADER,
        addonName
      )
      if (!processor) continue

      processor.SetStopOnLastCachedEvent(false)
      processor.SetEventCallback((event) => {
        if (event.GetEventType() !== GUILD_HISTORY_TRADER_EVENT_ITEM_SOLD) return
        const info = event.GetEventInfo()
        if (!info) return
        recordSale(ownName, guildName, event, info)
      })
      processor.StartStreaming()
    }
  })
}
