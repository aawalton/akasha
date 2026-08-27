import { str } from "./i18n"
import { listTotal } from "./mat-row"
import type { GoldAmount, KnowList, MatList, MatRow, Parser } from "./types"
import { COLOR_GREEN, COLOR_ORANGE, COLOR_RED, COLOR_WHITE, decaret, toMoney } from "./util"

export interface TooltipTarget<S = unknown> {
  AddLine: (this: TooltipTarget<S>, text: string, style?: S) => void
}

export interface TooltipVars extends Record<string, unknown> {
  enable_mat_price_tooltip?: boolean
  enable_mat_list_chat?: unknown
  enable_mat_list_tooltip?: unknown
  sell_per_voucher?: number
  show_confirm_master_writ_duplicates?: unknown
}

export function tooltipVars(): TooltipVars {
  return TemperWrit.savedVariables ?? {}
}

function ttMoney(this: void, label: string, count: GoldAmount, suffix?: string): string {
  return label + ": " + toMoney(count) + (suffix ?? str("currency_suffix_gold") ?? "")
}

export function matTooltipText(
  this: void,
  mat_list: MatList | undefined,
  purchase_gold: number | undefined,
  voucher_ct: number | undefined
): string | undefined {
  if (voucher_ct === undefined || voucher_ct < 1) {
    return undefined
  }

  if (mat_list === undefined && purchase_gold === undefined) {
    return undefined
  }

  const tooltip_elements: string[] = []
  let total_gold = 0
  let mat_gold: GoldAmount

  if (mat_list !== undefined) {
    mat_gold = listTotal(mat_list)
    if (mat_gold !== undefined) {
      total_gold = total_gold + mat_gold
    }
    let s = ttMoney(str("tooltip_mat_total") ?? "", mat_gold)
    if (mat_gold === undefined) {
      s = "|c" + COLOR_RED + s + "|r"
    }
    tooltip_elements[tooltip_elements.length] = s
  }

  if (purchase_gold !== undefined) {
    total_gold = total_gold + purchase_gold
    tooltip_elements[tooltip_elements.length] = ttMoney(
      str("tooltip_purchase") ?? "",
      purchase_gold
    )
  }

  const per_voucher_gold = total_gold / voucher_ct
  tooltip_elements[tooltip_elements.length] = ttMoney(
    str("tooltip_per_voucher") ?? "",
    per_voucher_gold
  )

  const sv = tooltipVars()
  if (sv.sell_per_voucher !== undefined) {
    const sell_total = sv.sell_per_voucher * voucher_ct
    const sell_net = sell_total - (mat_gold ?? sell_total)
    let msg: string
    if (0 < sell_net) {
      msg = string.format("|c%s" + (str("tooltip_sell_for") ?? ""), COLOR_GREEN, toMoney(sell_net))
    } else {
      msg = string.format(
        "|c%s" + (str("tooltip_sell_for_cannot") ?? ""),
        COLOR_ORANGE,
        toMoney(sell_net)
      )
    }
    tooltip_elements[tooltip_elements.length] = msg
  }

  if (3 <= tooltip_elements.length) {
    tooltip_elements[0] = tooltip_elements[0] + "  " + tooltip_elements[1]
    tooltip_elements.splice(1, 1)
    return table.concat(tooltip_elements, "\n")
  }
  return table.concat(tooltip_elements, " ")
}

export function knowTooltipText(this: void, know_list: KnowList | undefined): string | undefined {
  if (know_list === undefined) {
    return undefined
  }
  const elements: string[] = []
  for (const know of know_list) {
    const how = know.how
    if (how === undefined || how.cmw !== true || canShowCMWDuplicates()) {
      const s = know.TooltipText()
      if (s !== undefined) {
        elements[elements.length] = s
      }
    }
  }
  return table.concat(elements, "\n")
}

function canTooltipMat(this: void, enable: unknown, mat_row: MatRow): boolean {
  if (enable === str("lam_mat_tooltip_all")) {
    return true
  }

  if (enable === undefined || enable === str("lam_mat_tooltip_missing_only")) {
    return mat_row.HaveCt() < (mat_row.ct ?? 0)
  }

  return false
}

export function matHaveCtTooltipText(
  this: void,
  mat_list: MatList | undefined
): string | undefined {
  if (!canShowCMWDuplicates()) {
    return undefined
  }
  if (mat_list === undefined) {
    return undefined
  }
  const enable = tooltipVars().enable_mat_list_tooltip
  if (enable === str("lam_mat_tooltip_off")) {
    return undefined
  }

  const elements: string[] = []
  for (const mat_row of mat_list) {
    if (canTooltipMat(enable, mat_row)) {
      const name = decaret(GetItemLinkName(mat_row.link ?? ""))
      const need_ct = mat_row.ct ?? 1
      const have_ct = mat_row.HaveCt() ?? 0
      let lineColor = COLOR_WHITE
      if (have_ct < need_ct) {
        lineColor = COLOR_RED
      }
      const s = string.format("|c%s%s  %d/%d|r", lineColor, name, need_ct, have_ct)
      elements[elements.length] = s
    }
  }
  return table.concat(elements, "\n")
}

export function canDumpMatlist(this: void, enable: unknown, parser: Parser | undefined): boolean {
  if (enable === str("lam_mat_list_all")) {
    return true
  }
  const alchemyClass = TemperWrit.Alchemy?.Parser?.class
  if (
    enable === str("lam_mat_list_alchemy_only") &&
    parser !== undefined &&
    parser.class === alchemyClass
  ) {
    return true
  }
  return false
}

export function canShowCMWDuplicates(this: void): boolean {
  if (ConfirmMasterWrit === undefined) {
    return true
  }
  return tooltipVars().show_confirm_master_writ_duplicates === true
}
