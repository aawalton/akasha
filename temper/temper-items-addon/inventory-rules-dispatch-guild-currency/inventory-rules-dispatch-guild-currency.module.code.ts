import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
import { getCompiledConfig } from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import { getActionReportLevel } from "../inventory-rules-core-report/inventory-rules-core-report.module.code.ts"
import {
  CURRENCY_DISPLAY_NAMES,
  CURRENCY_KEY_TO_CURT,
} from "../inventory-rules-dispatch-bank-currency/inventory-rules-dispatch-bank-currency.module.code.ts"

function transferToGuildBank(this: void, curt: number, amount: number): undefined {
  if (IsProtectedFunction("TransferCurrency")) {
    CallSecureProtected(
      "TransferCurrency",
      curt,
      amount,
      CURRENCY_LOCATION_CHARACTER,
      CURRENCY_LOCATION_GUILD_BANK
    )
  } else {
    TransferCurrency(curt, amount, CURRENCY_LOCATION_CHARACTER, CURRENCY_LOCATION_GUILD_BANK)
  }
  return undefined
}

export function dispatchGuildBankCurrency(): undefined {
  if (!IsGuildBankOpen()) return

  const compiled = getCompiledConfig()
  if (!compiled?.currencyRules) return

  const level = getActionReportLevel()
  const reports: string[] = []

  for (const [currencyKey, rule] of Object.entries(compiled.currencyRules)) {
    if (rule.destination !== "guild-bank") continue

    const curt = CURRENCY_KEY_TO_CURT[currencyKey]
    if (curt === undefined) continue

    const maxTransfer = GetMaxCurrencyTransfer(
      curt,
      CURRENCY_LOCATION_CHARACTER,
      CURRENCY_LOCATION_GUILD_BANK
    )
    if (maxTransfer <= 0) continue

    const charAmount = GetCurrencyAmount(curt, CURRENCY_LOCATION_CHARACTER)
    let toTransfer = 0

    if (rule.action === "move-to") {
      toTransfer = math.min(charAmount, maxTransfer)
    } else if (rule.action === "keep-floor") {
      const surplus = math.max(0, charAmount - (rule.keepAmount ?? 0))
      toTransfer = math.min(surplus, maxTransfer)
    } else {
      toTransfer = math.min(charAmount, maxTransfer)
    }

    if (toTransfer > 0) {
      transferToGuildBank(curt, toTransfer)
      reports.push(`${CURRENCY_DISPLAY_NAMES[currencyKey]}: ${toTransfer} → guild bank`)
    }
  }

  if (reports.length > 0 && level !== "none") {
    d(`[${ADDON_NAME}] Guild bank currency transfers: ${reports.join(", ")}`)
  }
}
