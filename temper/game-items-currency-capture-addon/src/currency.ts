import { registerCatalogDomain } from "@temper/catalog-core/registry"
import { getSavedVariables } from "@temper/catalog-core/saved-variables-accessor"
import type { CurrencyCatalogEntry } from "@akasha/temper-capture-shapes/currency-catalog"
export const CURRENCY_TYPES = [
  CURT_MONEY,
  CURT_ALLIANCE_POINTS,
  CURT_TELVAR_STONES,
  CURT_WRIT_VOUCHERS,
  CURT_CROWNS,
  CURT_CROWN_GEMS,
  CURT_TRANSMUTE_CRYSTALS,
  CURT_UNDAUNTED_KEYS,
  CURT_SEALS,
  CURT_IMPERIAL_FRAGMENTS,
  CURT_STYLE_STONES,
  CURT_ARCHIVAL_FORTUNES,
  CURT_TRADE_BARS,
  CURT_TOME_POINTS,
  CURT_TOME_POINT_CACHES,
  CURT_TOME_TOKENS,
  CURT_TOME_CHALLENGE_REROLLS,
]

export function collectCurrencyCatalog(this: void, onComplete: (this: void) => void): undefined {
  const savedVars = getSavedVariables()
  const currencies: Record<number, CurrencyCatalogEntry> = {}

  for (const curt of CURRENCY_TYPES) {
    if (!IsCurrencyValid(curt)) continue
    currencies[curt] = {
      name: zo_strformat("<<1>>", GetCurrencyDescription(curt)),
      isBankable: CanCurrencyBeStoredInLocation(curt, CURRENCY_LOCATION_BANK),
    }
  }

  savedVars.currencyCatalog = currencies
  onComplete()
}
registerCatalogDomain({ key: "currencyCatalog", collect: collectCurrencyCatalog })
