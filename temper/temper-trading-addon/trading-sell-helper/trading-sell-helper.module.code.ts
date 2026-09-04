import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-09"
import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/eso-interface-extra-2"
import "@akasha/temper-eso-types/eso-interface-extra-4"
import "@akasha/temper-eso-types/eso-objects-02"
import "@akasha/temper-eso-types/eso-ttc"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import {
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  CONTROL_HEIGHT,
  createBarButton,
  PADDING_X,
  PADDING_Y,
} from "@akasha/temper-items-filters-addon/filter-bar-controls"
import { getItemPriceKey, suggestSellPrice } from "@akasha/temper-trading-listings/sell-pricing"
import { createSellFlow, type SellFlow } from "@akasha/temper-trading-post/guild-store-poster"
import { ADDON_NAME } from "../trading-constants/trading-constants.module.code.ts"
import {
  getLastSold,
  putLastSold,
} from "../trading-sell-price-store/trading-sell-price-store.module.code.ts"

const DIFFERENT_QUALITY_ITEMTYPES: Record<number, true> = {
  [ITEMTYPE_GLYPH_ARMOR]: true,
  [ITEMTYPE_GLYPH_JEWELRY]: true,
  [ITEMTYPE_GLYPH_WEAPON]: true,
  [ITEMTYPE_DRINK]: true,
  [ITEMTYPE_FOOD]: true,
}

const WINDOW_NAME = "TemperListingsSell"
const WINDOW_WIDTH = 320
const LINE_HEIGHT = 20
const LINE_GAP = 4
const BUTTON_HEIGHT = CONTROL_HEIGHT

const SOURCE_LABEL: Record<string, string> = {
  "last-sold": "last sold",
  ttc: "TTC market",
  "vendor-multiple": "3x vendor",
}

export interface SellHelper {
  register: (this: void) => undefined
}

export function createSellHelper(this: void): SellHelper {
  return {
    register(): undefined {
      mountSellHelper()
    },
  }
}

interface SellWidgets {
  readonly tlw: TopLevelWindow
  readonly nameLabel: LabelControl
  readonly priceLabel: LabelControl
  readonly feeLabel: LabelControl
  readonly button: ButtonControl
  readonly buttonLabel: LabelControl
}

function mountSellHelper(this: void): undefined {
  const ns = `${ADDON_NAME}_Sell`
  const flow = createSellFlow(ADDON_NAME)
  const widgets = buildSellWindow()

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_Pending`,
    EVENT_TRADING_HOUSE_PENDING_ITEM_UPDATE,
    function (this: void, _eventCode: number, _slotId: number, isPending: boolean): undefined {
      if (!isPending) {
        widgets.tlw.SetHidden(true)
        return
      }
      onItemStaged(widgets, flow)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_Close`,
    EVENT_CLOSE_TRADING_HOUSE,
    function (this: void): undefined {
      widgets.tlw.SetHidden(true)
    }
  )
}

function onItemStaged(this: void, widgets: SellWidgets, flow: SellFlow): undefined {
  const [bag, slot, quantity] = GetPendingItemPost()

  const itemLink = GetItemLink(bag, slot, LINK_STYLE_DEFAULT)
  const [itemType] = GetItemLinkItemType(itemLink)
  const vendorValue = GetItemSellValueWithBonuses(bag, slot)
  const hasDifferentQualities = DIFFERENT_QUALITY_ITEMTYPES[itemType] === true

  const key = getItemPriceKey({ itemLink, itemType, hasDifferentQualities })
  const last = getLastSold(key)
  const ttcMarketPpu = readTtcPrice(itemLink)

  const suggestion = suggestSellPrice({
    lastSoldPpu: last?.pricePerUnit,
    ttcMarketPpu,
    vendorValue,
  })
  const ppu = suggestion.pricePerUnit
  const total = ppu * quantity

  const [listingFee, , expectedProfit] = GetTradingHousePostPriceInfo(total)

  const itemName = zo_strformat("<<1>>", GetItemName(bag, slot))
  widgets.nameLabel.SetText(`${itemName}  (x${quantity})`)
  widgets.priceLabel.SetText(
    `${ZO_CommaDelimitNumber(zo_round(ppu))}/ea  (${SOURCE_LABEL[suggestion.source] ?? suggestion.source})`
  )
  widgets.feeLabel.SetText(
    `Total ${ZO_CommaDelimitNumber(zo_round(total))}  •  fee ${ZO_CommaDelimitNumber(zo_round(listingFee))}  •  profit ${ZO_CommaDelimitNumber(zo_round(expectedProfit))}`
  )
  widgets.buttonLabel.SetText(`List for ${ZO_CommaDelimitNumber(zo_round(ppu))} each`)

  widgets.button.SetHandler("OnClicked", function (this: void): undefined {
    flow.postItem(bag, slot, quantity, total, function (this: void, ok: boolean): undefined {
      if (ok) {
        putLastSold(key, quantity, ppu)
        widgets.tlw.SetHidden(true)
      } else {
        d(`[${ADDON_NAME}] sell helper: post did not complete.`)
      }
    })
  })

  widgets.tlw.SetHidden(false)
}

function readTtcPrice(this: void, itemLink: string): number | undefined {
  if (TamrielTradeCentrePrice === undefined) return undefined
  const info = TamrielTradeCentrePrice.GetPriceInfo(itemLink)
  if (info === undefined) return undefined
  return info.SuggestedPrice ?? info.Avg
}

function buildSellWindow(this: void): SellWidgets {
  const existing = WINDOW_MANAGER.GetControlByName<TopLevelWindow>(WINDOW_NAME)
  if (existing !== undefined) existing.SetHidden(true)

  const tlw = WINDOW_MANAGER.CreateTopLevelWindow(WINDOW_NAME)
  tlw.SetHidden(true)
  tlw.SetClampedToScreen(true)
  tlw.SetMovable(true)

  const bg = WINDOW_MANAGER.CreateControl("$(parent)BG", tlw, CT_BACKDROP)
  bg.SetAnchorFill()
  bg.SetCenterColor(0, 0, 0, 0.7)
  bg.SetEdgeColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2], 0.6)
  bg.SetEdgeTexture(undefined, 1, 1, 1)

  let y = PADDING_Y
  const nameLabel = buildLine(tlw, "Name", y, true)
  y += LINE_HEIGHT + LINE_GAP
  const priceLabel = buildLine(tlw, "Price", y, false)
  y += LINE_HEIGHT + LINE_GAP
  const feeLabel = buildLine(tlw, "Fee", y, false)
  y += LINE_HEIGHT + LINE_GAP

  const btn = createBarButton(
    tlw,
    `${WINDOW_NAME}List`,
    "List",
    PADDING_X,
    WINDOW_WIDTH - PADDING_X * 2
  )
  btn.backdrop.ClearAnchors()
  btn.backdrop.SetAnchor(TOPLEFT, tlw, TOPLEFT, PADDING_X, y)
  btn.backdrop.SetDimensions(WINDOW_WIDTH - PADDING_X * 2, BUTTON_HEIGHT)
  btn.button.ClearAnchors()
  btn.button.SetAnchor(TOPLEFT, btn.backdrop, TOPLEFT, 0, 0)
  btn.button.SetAnchor(BOTTOMRIGHT, btn.backdrop, BOTTOMRIGHT, 0, 0)
  y += BUTTON_HEIGHT + PADDING_Y

  tlw.SetDimensions(WINDOW_WIDTH, y)
  tlw.ClearAnchors()
  tlw.SetAnchor(TOPLEFT, GuiRoot, TOPLEFT, 80, 400)

  return {
    tlw,
    nameLabel,
    priceLabel,
    feeLabel,
    button: btn.button,
    buttonLabel: btn.label,
  }
}

function buildLine(
  this: void,
  parent: Control,
  suffix: string,
  top: number,
  bold: boolean
): LabelControl {
  const label = WINDOW_MANAGER.CreateControl(`${WINDOW_NAME}${suffix}`, parent, CT_LABEL)
  label.SetAnchor(TOPLEFT, parent, TOPLEFT, PADDING_X, top)
  label.SetDimensions(WINDOW_WIDTH - PADDING_X * 2, LINE_HEIGHT)
  label.SetFont(bold ? "$(BOLD_FONT)|16|shadow" : "$(MEDIUM_FONT)|14|soft-shadow-thin")
  const color = bold ? COLOR_SECONDARY : COLOR_PRIMARY
  label.SetColor(color[0], color[1], color[2], 1)
  label.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
  return label
}
