import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
import { getCompiledConfig } from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import { getActionReportLevel } from "../inventory-rules-core-report/inventory-rules-core-report.module.code.ts"
export const CURRENCY_KEY_TO_CURT: Record<string, number> = {
  gold: CURT_MONEY,
  alliancePoints: CURT_ALLIANCE_POINTS,
  telvarStones: CURT_TELVAR_STONES,
  writVouchers: CURT_WRIT_VOUCHERS,
}

export const CURRENCY_DISPLAY_NAMES: Record<string, string> = {
  gold: "Gold",
  alliancePoints: "Alliance Points",
  telvarStones: "Tel Var Stones",
  writVouchers: "Writ Vouchers",
}

export function dispatchCurrencyRules(): undefined {
  const bankingBag = GetBankingBag()
  if (!DoesBankHoldCurrency(bankingBag)) return

  const compiled = getCompiledConfig()
  if (!compiled?.currencyRules) return

  const level = getActionReportLevel()
  const reports: string[] = []

  for (const [currencyKey, rule] of Object.entries(compiled.currencyRules)) {
    const curt = CURRENCY_KEY_TO_CURT[currencyKey]
    if (curt === undefined) continue

    if (rule.destination === "guild-bank") continue

    let toTransfer = 0

    if (rule.destination === "bank") {
      const maxTransfer = GetMaxCurrencyTransfer(
        curt,
        CURRENCY_LOCATION_CHARACTER,
        CURRENCY_LOCATION_BANK
      )
      if (maxTransfer <= 0) continue

      if (rule.action === "move-to") {
        toTransfer = maxTransfer
      } else if (rule.action === "keep-floor") {
        const charAmount = GetCurrencyAmount(curt, CURRENCY_LOCATION_CHARACTER)
        const surplus = math.max(0, charAmount - (rule.keepAmount ?? 0))
        toTransfer = math.min(surplus, maxTransfer)
      } else {
        const bankAmount = GetCurrencyAmount(curt, CURRENCY_LOCATION_BANK)
        const needed = math.max(0, (rule.targetAmount ?? 0) - bankAmount)
        toTransfer = math.min(needed, maxTransfer)
      }

      if (toTransfer > 0) {
        TransferCurrency(curt, toTransfer, CURRENCY_LOCATION_CHARACTER, CURRENCY_LOCATION_BANK)
        reports.push(`${CURRENCY_DISPLAY_NAMES[currencyKey]}: ${toTransfer} → bank`)
      }
    } else {
      const maxTransfer = GetMaxCurrencyTransfer(
        curt,
        CURRENCY_LOCATION_BANK,
        CURRENCY_LOCATION_CHARACTER
      )
      if (maxTransfer <= 0) continue

      if (rule.action === "move-to") {
        toTransfer = maxTransfer
      } else {
        const charAmount = GetCurrencyAmount(curt, CURRENCY_LOCATION_CHARACTER)
        const needed = math.max(0, (rule.targetAmount ?? 0) - charAmount)
        toTransfer = math.min(needed, maxTransfer)
      }

      if (toTransfer > 0) {
        TransferCurrency(curt, toTransfer, CURRENCY_LOCATION_BANK, CURRENCY_LOCATION_CHARACTER)
        reports.push(`${CURRENCY_DISPLAY_NAMES[currencyKey]}: ${toTransfer} → character`)
      }
    }
  }

  if (reports.length > 0 && level !== "none") {
    d(`[${ADDON_NAME}] Currency transfers: ${reports.join(", ")}`)
  }
}
