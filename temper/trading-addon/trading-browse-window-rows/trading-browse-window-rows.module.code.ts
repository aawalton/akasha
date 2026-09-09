import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-14"
import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-event-manager"
import "@akasha/temper-eso-types/eso-events"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-03"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/eso-functions-09"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-interface-extra-4"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import {
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  CONTROL_HEIGHT,
  PADDING_X,
} from "@akasha/temper-items-filters-addon/filter-bar-controls"
import type { BrowseResultListing } from "../trading-browse-engine/trading-browse-engine.module.code.ts"

export const ROW_HEIGHT = 20
export const ROW_GAP = 2
export const HEADER_HEIGHT = CONTROL_HEIGHT

const COL_NAME_X = PADDING_X
const COL_UNIT_X = PADDING_X + 300
const COL_TOTAL_X = PADDING_X + 400
const COL_SELLER_X = PADDING_X + 500
const COL_GUILD_X = PADDING_X + 650
export const LIST_WIDTH = COL_GUILD_X + 180 + PADDING_X

const SELLER_PLACEHOLDER = "—"

export interface ResultRow {
  readonly container: Control
  readonly name: LabelControl
  readonly unit: LabelControl
  readonly total: LabelControl
  readonly seller: LabelControl
  readonly guild: LabelControl
}

function makeColumnLabel(
  parent: Control,
  name: string,
  xOffset: number,
  width: number,
  bold: boolean
): LabelControl {
  const label = WINDOW_MANAGER.CreateControl(name, parent, CT_LABEL)
  label.SetAnchor(LEFT, parent, LEFT, xOffset, 0)
  label.SetDimensions(width, ROW_HEIGHT)
  label.SetFont(bold ? "$(BOLD_FONT)|14|shadow" : "$(MEDIUM_FONT)|14|soft-shadow-thin")
  const color = bold ? COLOR_SECONDARY : COLOR_PRIMARY
  label.SetColor(color[0], color[1], color[2], 1)
  label.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
  return label
}

export function buildHeader(parent: Control, listName: string, topOffset: number): Control {
  const header = WINDOW_MANAGER.CreateControl(`${listName}Header`, parent, CT_CONTROL)
  header.SetAnchor(TOPLEFT, parent, TOPLEFT, 0, topOffset)
  header.SetDimensions(LIST_WIDTH, HEADER_HEIGHT)
  makeColumnLabel(header, `${listName}HdrName`, COL_NAME_X, 300, true).SetText("Item")
  makeColumnLabel(header, `${listName}HdrUnit`, COL_UNIT_X, 100, true).SetText("Unit")
  makeColumnLabel(header, `${listName}HdrTotal`, COL_TOTAL_X, 100, true).SetText("Total")
  makeColumnLabel(header, `${listName}HdrSeller`, COL_SELLER_X, 150, true).SetText("Seller")
  makeColumnLabel(header, `${listName}HdrGuild`, COL_GUILD_X, 180, true).SetText("Guild")
  return header
}

export function buildRow(
  parent: Control,
  listName: string,
  slotIndex: number,
  topOffset: number
): ResultRow {
  const y = topOffset + slotIndex * (ROW_HEIGHT + ROW_GAP)
  const prefix = `${listName}Row${slotIndex}`
  const container = WINDOW_MANAGER.CreateControl(prefix, parent, CT_CONTROL)
  container.SetAnchor(TOPLEFT, parent, TOPLEFT, 0, y)
  container.SetDimensions(LIST_WIDTH, ROW_HEIGHT)
  container.SetHidden(true)
  return {
    container,
    name: makeColumnLabel(container, `${prefix}Name`, COL_NAME_X, 300, false),
    unit: makeColumnLabel(container, `${prefix}Unit`, COL_UNIT_X, 100, false),
    total: makeColumnLabel(container, `${prefix}Total`, COL_TOTAL_X, 100, false),
    seller: makeColumnLabel(container, `${prefix}Seller`, COL_SELLER_X, 150, false),
    guild: makeColumnLabel(container, `${prefix}Guild`, COL_GUILD_X, 180, false),
  }
}

export function paintRow(row: ResultRow, listing: BrowseResultListing): undefined {
  row.name.SetText(listing.facts.itemName)
  row.unit.SetText(ZO_CommaDelimitNumber(zo_round(listing.pricePerUnit)))
  row.total.SetText(ZO_CommaDelimitNumber(listing.totalPrice))
  row.seller.SetText(listing.sellerName !== "" ? listing.sellerName : SELLER_PLACEHOLDER)
  row.guild.SetText(zo_strformat("<<1>>", GetGuildName(listing.guildId)))
  row.container.SetHidden(false)
}

export function hideRow(row: ResultRow): undefined {
  row.container.SetHidden(true)
}
