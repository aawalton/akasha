import { FLAG_SHOW_ACCOUNTS, FLAG_SHOW_HEADER, FLAG_SHOW_PIECES } from "../constants"
import { getVars } from "../core/state"
import { addTooltipExtension } from "./extension"

function asNumber(this: void, value: unknown): number {
  return value as number
}
function asString(this: void, value: unknown): string {
  return value as string
}
function asId64(this: void, value: unknown): Id64 {
  return value as Id64
}

type LinkFn = (this: void, ...args: unknown[]) => string

let areExternalTooltipsHooked = false

function tooltipHook(
  this: void,
  control: object,
  functionName: string,
  linkFunction: LinkFn,
  flagMask?: number,
  sourceParams?: readonly string[]
): undefined {
  ZO_PostHook(control, functionName, (...hookArgs: unknown[]): undefined => {
    const vars = getVars()
    if (!vars.externalTooltips.enableExtension) {
      return undefined
    }

    let flags = FLAG_SHOW_HEADER
    if (vars.externalTooltips.showPieces > 0) {
      flags = BitOr(flags, FLAG_SHOW_PIECES)
    }
    if (vars.externalTooltips.showAccounts > 0) {
      flags = BitOr(flags, FLAG_SHOW_ACCOUNTS)
    }
    if (flagMask !== undefined) {
      flags = BitAnd(flags, flagMask)
    }

    const methodArgs: unknown[] = []
    for (const i of $range(1, hookArgs.length - 1)) {
      methodArgs.push(hookArgs[i])
    }

    let itemSource: { [param: string]: unknown } | undefined
    if (sourceParams !== undefined) {
      itemSource = {}
      for (const i of $range(1, sourceParams.length)) {
        const key = sourceParams[i - 1]
        if (key !== undefined) {
          itemSource[key] = methodArgs[i - 1]
        }
      }
    }

    addTooltipExtension(control, linkFunction(...methodArgs), undefined, flags, itemSource)
    return undefined
  })
  return undefined
}

const itemLinkPassthrough: LinkFn = (...args) => asString(args[0])

export function hookExternalTooltips(this: void): undefined {
  if (areExternalTooltipsHooked || !getVars().externalTooltips.enableExtension) {
    return
  }
  areExternalTooltipsHooked = true

  tooltipHook(PopupTooltip, "SetLink", itemLinkPassthrough)
  tooltipHook(ItemTooltip, "SetLink", itemLinkPassthrough)
  tooltipHook(ItemTooltip, "SetWornItem", (...args) =>
    GetItemLink(asNumber(args[1]), asNumber(args[0]))
  )
  tooltipHook(
    ItemTooltip,
    "SetBagItem",
    (...args) => GetItemLink(asNumber(args[0]), asNumber(args[1])),
    undefined,
    ["bagId", "slotIndex"]
  )
  tooltipHook(
    ItemTooltip,
    "SetTradeItem",
    (...args) => GetTradeItemLink(asNumber(args[0]), asNumber(args[1]), LINK_STYLE_DEFAULT),
    undefined,
    ["who", "tradeIndex"]
  )
  tooltipHook(ItemTooltip, "SetBuybackItem", (...args) =>
    GetBuybackItemLink(asNumber(args[0]), LINK_STYLE_DEFAULT)
  )
  tooltipHook(ItemTooltip, "SetStoreItem", (...args) =>
    GetStoreItemLink(asNumber(args[0]), LINK_STYLE_DEFAULT)
  )
  tooltipHook(ItemTooltip, "SetAttachedMailItem", (...args) =>
    GetAttachedItemLink(asId64(args[0]), asNumber(args[1]), LINK_STYLE_DEFAULT)
  )
  tooltipHook(
    ItemTooltip,
    "SetLootItem",
    (...args) => GetLootItemLink(asNumber(args[0]), LINK_STYLE_DEFAULT),
    undefined,
    ["lootId"]
  )
  tooltipHook(ItemTooltip, "SetReward", (...args) =>
    GetItemRewardItemLink(
      asNumber(args[0]),
      asNumber(args[1]),
      asNumber(args[2]),
      LINK_STYLE_DEFAULT
    )
  )
  tooltipHook(ItemTooltip, "SetQuestReward", (...args) =>
    GetQuestRewardItemLink(asNumber(args[0]), LINK_STYLE_DEFAULT)
  )
  tooltipHook(ItemTooltip, "SetTradingHouseItem", (...args) =>
    GetTradingHouseSearchResultItemLink(asNumber(args[0]), LINK_STYLE_DEFAULT)
  )
  tooltipHook(ItemTooltip, "SetTradingHouseListing", (...args) =>
    GetTradingHouseListingItemLink(asNumber(args[0]), LINK_STYLE_DEFAULT)
  )
  tooltipHook(ItemTooltip, "SetItemSetCollectionPieceLink", itemLinkPassthrough, FLAG_SHOW_ACCOUNTS)
  return undefined
}
