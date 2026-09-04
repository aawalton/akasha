import { str } from "../writ-i18n/writ-i18n.module.code.ts"
import { listTotal } from "../writ-mat-row/writ-mat-row.module.code.ts"
import type {
  GoldAmount,
  KnowList,
  MatList,
  MatRow,
  Parser,
} from "../writ-types/writ-types.module.code.ts"
import {
  COLOR_GREEN,
  COLOR_ORANGE,
  COLOR_RED,
  COLOR_WHITE,
  decaret,
  toMoney,
} from "../writ-util/writ-util.module.code.ts"

export interface TooltipTarget<S = unknown> {
  AddLine: (this: TooltipTarget<S>, text: string, style?: S) => undefined
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
  matList: MatList | undefined,
  purchaseGold: number | undefined,
  voucherCt: number | undefined
): string | undefined {
  if (voucherCt === undefined || voucherCt < 1) {
    return undefined
  }

  if (matList === undefined && purchaseGold === undefined) {
    return undefined
  }

  const tooltipElements: string[] = []
  let totalGold = 0
  let matGold: GoldAmount

  if (matList !== undefined) {
    matGold = listTotal(matList)
    if (matGold !== undefined) {
      totalGold = totalGold + matGold
    }
    let s = ttMoney(str("tooltip_mat_total") ?? "", matGold)
    if (matGold === undefined) {
      s = "|c" + COLOR_RED + s + "|r"
    }
    tooltipElements[tooltipElements.length] = s
  }

  if (purchaseGold !== undefined) {
    totalGold = totalGold + purchaseGold
    tooltipElements[tooltipElements.length] = ttMoney(str("tooltip_purchase") ?? "", purchaseGold)
  }

  const perVoucherGold = totalGold / voucherCt
  tooltipElements[tooltipElements.length] = ttMoney(
    str("tooltip_per_voucher") ?? "",
    perVoucherGold
  )

  const sv = tooltipVars()
  if (sv.sell_per_voucher !== undefined) {
    const sellTotal = sv.sell_per_voucher * voucherCt
    const sellNet = sellTotal - (matGold ?? sellTotal)
    let msg: string
    if (0 < sellNet) {
      msg = string.format("|c%s" + (str("tooltip_sell_for") ?? ""), COLOR_GREEN, toMoney(sellNet))
    } else {
      msg = string.format(
        "|c%s" + (str("tooltip_sell_for_cannot") ?? ""),
        COLOR_ORANGE,
        toMoney(sellNet)
      )
    }
    tooltipElements[tooltipElements.length] = msg
  }

  if (3 <= tooltipElements.length) {
    tooltipElements[0] = tooltipElements[0] + "  " + tooltipElements[1]
    tooltipElements.splice(1, 1)
    return table.concat(tooltipElements, "\n")
  }
  return table.concat(tooltipElements, " ")
}

export function knowTooltipText(this: void, knowList: KnowList | undefined): string | undefined {
  if (knowList === undefined) {
    return undefined
  }
  const elements: string[] = []
  for (const know of knowList) {
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

function canTooltipMat(this: void, enable: unknown, matRow: MatRow): boolean {
  if (enable === str("lam_mat_tooltip_all")) {
    return true
  }

  if (enable === undefined || enable === str("lam_mat_tooltip_missing_only")) {
    return matRow.HaveCt() < (matRow.ct ?? 0)
  }

  return false
}

export function matHaveCtTooltipText(this: void, matList: MatList | undefined): string | undefined {
  if (!canShowCMWDuplicates()) {
    return undefined
  }
  if (matList === undefined) {
    return undefined
  }
  const enable = tooltipVars().enable_mat_list_tooltip
  if (enable === str("lam_mat_tooltip_off")) {
    return undefined
  }

  const elements: string[] = []
  for (const matRow of matList) {
    if (canTooltipMat(enable, matRow)) {
      const name = decaret(GetItemLinkName(matRow.link ?? ""))
      const needCt = matRow.ct ?? 1
      const haveCt = matRow.HaveCt() ?? 0
      let lineColor = COLOR_WHITE
      if (haveCt < needCt) {
        lineColor = COLOR_RED
      }
      const s = string.format("|c%s%s  %d/%d|r", lineColor, name, needCt, haveCt)
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
