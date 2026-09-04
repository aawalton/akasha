import { buildItemCentricInventory } from "@akasha/temper-items-core/item-centric-inventory"
import { buildLocationTooltipLines } from "../inventory-location-tooltip-lines/inventory-location-tooltip-lines.module.code.ts"
import { getDatabase } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"

const FRAME_NAME = "TemperInventoryLocationTooltip"
const FRAME_PADDING = 8
const FRAME_FALLBACK_WIDTH = 320

let frameBackdrop: BackdropControl | undefined
let frameLabel: LabelControl | undefined

function ensureFrame(): LabelControl {
  if (frameLabel !== undefined) return frameLabel

  const backdrop = CreateControlFromVirtual<BackdropControl>(
    FRAME_NAME,
    GuiRoot,
    "ZO_DefaultBackdrop"
  )
  backdrop.SetDrawTier(DT_HIGH)
  backdrop.SetHidden(true)

  const label = WINDOW_MANAGER.CreateControl(`${FRAME_NAME}Label`, backdrop, CT_LABEL)
  label.SetFont("ZoFontGame")
  label.SetColor(1, 1, 1)
  label.SetWrapMode(TEXT_WRAP_MODE_ELLIPSIS)
  label.SetAnchor(TOPLEFT, backdrop, TOPLEFT, FRAME_PADDING, FRAME_PADDING)

  frameBackdrop = backdrop
  frameLabel = label
  return label
}

export function hideLocationBreakdown(): undefined {
  if (frameBackdrop !== undefined) frameBackdrop.SetHidden(true)
}

export function showLocationBreakdown(anchorTo: Control, itemId: number): undefined {
  if (itemId <= 0) {
    hideLocationBreakdown()
    return
  }
  const inventory = buildItemCentricInventory(getDatabase())
  const lines = buildLocationTooltipLines(inventory.get(itemId))
  if (lines.length === 0) {
    hideLocationBreakdown()
    return
  }

  const label = ensureFrame()
  const backdrop = frameBackdrop
  if (backdrop === undefined) return

  const anchorWidth = anchorTo.GetWidth()
  const width = anchorWidth > 0 ? anchorWidth : FRAME_FALLBACK_WIDTH

  const text = lines.map((line) => line.text).join("\n")
  label.SetWidth(width - 2 * FRAME_PADDING)
  label.SetText(text)
  const height = label.GetTextHeight() + 2 * FRAME_PADDING

  backdrop.SetDimensions(width, height)
  backdrop.ClearAnchors()
  const fitsBelow = anchorTo.GetBottom() + height <= GuiRoot.GetHeight()
  if (fitsBelow) backdrop.SetAnchor(TOP, anchorTo, BOTTOM, 0, 0)
  else backdrop.SetAnchor(BOTTOM, anchorTo, TOP, 0, 0)
  backdrop.SetHidden(false)
}

function renderForLink(anchorTo: Control, itemLink: string): undefined {
  if (itemLink === "") {
    hideLocationBreakdown()
    return
  }
  showLocationBreakdown(anchorTo, GetItemLinkItemId(itemLink))
}

export function registerLocationTooltip(): undefined {
  const originalSetBagItem = ItemTooltip.SetBagItem
  ItemTooltip.SetBagItem = function (
    this: TooltipControl,
    bagId: number,
    slotIndex: number,
    displayFlags?: number
  ): undefined {
    originalSetBagItem.call(this, bagId, slotIndex, displayFlags)
    renderForLink(this, GetItemLink(bagId, slotIndex))
  }

  const originalItemSetLink = ItemTooltip.SetLink
  ItemTooltip.SetLink = function (
    this: TooltipControl,
    link: string,
    ...rest: unknown[]
  ): undefined {
    originalItemSetLink.call(this, link, ...rest)
    renderForLink(this, link)
  }

  const originalPopupSetLink = PopupTooltip.SetLink
  PopupTooltip.SetLink = function (
    this: TooltipControl,
    link: string,
    ...rest: unknown[]
  ): undefined {
    originalPopupSetLink.call(this, link, ...rest)
    renderForLink(this, link)
  }

  ZO_PreHookHandler(ItemTooltip, "OnHide", function (this: void): undefined {
    hideLocationBreakdown()
    return undefined
  })
  ZO_PreHookHandler(PopupTooltip, "OnHide", function (this: void): undefined {
    hideLocationBreakdown()
    return undefined
  })
}
