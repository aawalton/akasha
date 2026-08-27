import { add as logAdd, endEvent as logEndEvent } from "./log"
import { fallbackPrice } from "./price"
import type { ColorString, MoneyString, WritFields } from "./types"
import { toWritFields } from "./writ-fields"

export { toWritFields }

TemperWrit.GOLD_UNKNOWN = undefined

export function fail(msg: string): undefined {
  d(msg)
  logAdd(msg)
  logEndEvent()
  return undefined
}

export const COLOR_WHITE = "FFFFFF"
export const COLOR_RED = "FF3333"
export const COLOR_GREEN = "33AA33"
export const COLOR_GREY = "999999"
export const COLOR_ORANGE = "FF8800"

export function color(colorHex: string, text: string): ColorString {
  return `|c${colorHex}${text}|r`
}

export function grey(text: string): ColorString {
  return color("999999", text)
}

export function red(text: string): ColorString {
  return color("FF3333", text)
}

export function round(f: number | undefined): number | undefined {
  if (f === undefined) {
    return f
  }
  return math.floor(0.5 + f)
}

export function decaret(s: string): string {
  const out = zo_strformat(SI_TOOLTIP_ITEM_NAME, s)
  if (out === undefined || out === "") {
    return " "
  }
  return out
}

export function toMoney(x: number | undefined): MoneyString {
  if (x === undefined || x === -1) {
    return "?"
  }
  const rounded = round(x)
  return ZO_CurrencyControl_FormatCurrency(rounded ?? 0, false)
}

export function matPrice(link: string): number | undefined {
  const sv = TemperWrit.savedVariables

  let price_sources: string[] = []
  if (sv?.enable_mm_price === true) {
    price_sources[price_sources.length] = "mm"
  }
  if (sv?.enable_att_price === true) {
    price_sources[price_sources.length] = "att"
  }
  if (sv?.enable_ttc_price === true) {
    price_sources[price_sources.length] = "ttc"
  }

  if (price_sources.length === 0) {
    price_sources = ["mm", "att", "ttc"]
  }

  const [gold] = LibPrice.ItemLinkToPriceGold(link, ...price_sources)

  const fb = fallbackPrice(link)

  if (gold !== undefined) {
    return gold
  }
  if (fb !== undefined) {
    return fb
  }
  return TemperWrit.GOLD_UNKNOWN
}

export function matHaveCt(item_link: string): number {
  const [bag_ct, bank_ct, craft_bag_ct] = GetItemLinkStacks(item_link)
  return bag_ct + bank_ct + craft_bag_ct
}

export interface UtilNamespace {
  Fail: (this: void, msg: string) => undefined
  ToWritFields: (this: void, item_link: string) => WritFields
  COLOR_WHITE: string
  COLOR_RED: string
  COLOR_GREEN: string
  COLOR_GREY: string
  COLOR_ORANGE: string
  color: (this: void, colorHex: string, text: string) => ColorString
  grey: (this: void, text: string) => ColorString
  red: (this: void, text: string) => ColorString
  round: (this: void, f: number | undefined) => number | undefined
  decaret: (this: void, s: string) => string
  ToMoney: (this: void, x: number | undefined) => MoneyString
  MatPrice: (this: void, link: string) => number | undefined
  MatHaveCt: (this: void, item_link: string) => number

  RestorePos?: (this: void, top_level_control: Control | undefined, key: string) => void
  SavePos?: (this: void, top_level_control: Control, key: string) => void
  OnMoveStop?: (this: void, top_level_control: Control, key: string) => void
  OnResizeStop?: (
    this: void,
    top_level_control: Control,
    list: unknown,
    singleton: unknown,
    key: string
  ) => void
  CallSoon?: (this: void, key: string, func: (this: void) => void) => void
  CallSoonPoll?: (this: void, key: string, func: (this: void) => void) => void
  SetCellToHeaderAlign?: (
    this: void,
    cell_control: LabelControl,
    header_control: Control,
    fallback_header_control: Control | undefined
  ) => void
  StretchBGWidth?: (this: void, row_control: Control) => void
  SetAnchorCellLeft?: (
    this: void,
    row_control: Control,
    cell_control: Control,
    header_cell_control: Control,
    is_leftmost_cell: boolean,
    y_offset: number | undefined,
    rel_to_left: number
  ) => void
}

const utilNamespace: UtilNamespace = {
  Fail: fail,
  ToWritFields: toWritFields,
  COLOR_WHITE,
  COLOR_RED,
  COLOR_GREEN,
  COLOR_GREY,
  COLOR_ORANGE,
  color,
  grey,
  red,
  round,
  decaret,
  ToMoney: toMoney,
  MatPrice: matPrice,
  MatHaveCt: matHaveCt,
}

TemperWrit.Util = utilNamespace
