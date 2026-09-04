import { requireNumericKey } from "@akasha/temper-narrow/require-numeric-key"
import { getCharacterLocationKey } from "../inventory-location-keys/inventory-location-keys.module.code.ts"
import {
  getDatabase,
  getSavedVariables,
} from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import type {
  CurrencyBalances,
  InventoryCurrencies,
} from "../inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"
export const CURRENCY_MAP: Record<number, string> = {}
if (CURT_MONEY !== undefined) CURRENCY_MAP[CURT_MONEY] = "gold"
if (CURT_ALLIANCE_POINTS !== undefined) CURRENCY_MAP[CURT_ALLIANCE_POINTS] = "alliancePoints"
if (CURT_TELVAR_STONES !== undefined) CURRENCY_MAP[CURT_TELVAR_STONES] = "telvarStones"
if (CURT_WRIT_VOUCHERS !== undefined) CURRENCY_MAP[CURT_WRIT_VOUCHERS] = "writVouchers"
if (CURT_TRANSMUTE_CRYSTALS !== undefined)
  CURRENCY_MAP[CURT_TRANSMUTE_CRYSTALS] = "transmuteCrystals"
if (CURT_SEALS !== undefined) CURRENCY_MAP[CURT_SEALS] = "endeavorSeals"
if (CURT_UNDAUNTED_KEYS !== undefined) CURRENCY_MAP[CURT_UNDAUNTED_KEYS] = "undauntedKeys"
if (CURT_CROWNS !== undefined) CURRENCY_MAP[CURT_CROWNS] = "crowns"
if (CURT_CROWN_GEMS !== undefined) CURRENCY_MAP[CURT_CROWN_GEMS] = "crownGems"
if (CURT_ARCHIVAL_FORTUNES !== undefined) CURRENCY_MAP[CURT_ARCHIVAL_FORTUNES] = "archivalFortunes"
if (CURT_TRADE_BARS !== undefined) CURRENCY_MAP[CURT_TRADE_BARS] = "tradeBars"
if (CURT_TOME_POINTS !== undefined) CURRENCY_MAP[CURT_TOME_POINTS] = "tomePoints"
if (CURT_TOME_POINT_CACHES !== undefined) CURRENCY_MAP[CURT_TOME_POINT_CACHES] = "tomePointCaches"
if (CURT_TOME_TOKENS !== undefined) CURRENCY_MAP[CURT_TOME_TOKENS] = "tomeTokens"
if (CURT_TOME_CHALLENGE_REROLLS !== undefined)
  CURRENCY_MAP[CURT_TOME_CHALLENGE_REROLLS] = "tomeChallengeRerolls"

export const BANKABLE_CURRENCIES: number[] = []
if (CURT_MONEY !== undefined) BANKABLE_CURRENCIES.push(CURT_MONEY)
if (CURT_ALLIANCE_POINTS !== undefined) BANKABLE_CURRENCIES.push(CURT_ALLIANCE_POINTS)
if (CURT_TELVAR_STONES !== undefined) BANKABLE_CURRENCIES.push(CURT_TELVAR_STONES)
if (CURT_WRIT_VOUCHERS !== undefined) BANKABLE_CURRENCIES.push(CURT_WRIT_VOUCHERS)

export function ensureCurrencies(): InventoryCurrencies {
  const db = getDatabase()
  if (!db.currencies) {
    db.currencies = { characters: {} }
  }
  return db.currencies
}

export function scanCharacterCurrencies(): undefined {
  const currencies = ensureCurrencies()
  const charId = getCharacterLocationKey()
  if (charId === undefined) return
  const balances: CurrencyBalances = {}

  for (const [curtStr, key] of Object.entries(CURRENCY_MAP)) {
    const curt = requireNumericKey(curtStr, "CURRENCY_MAP")
    const amount = GetCurrencyAmount(curt, CURRENCY_LOCATION_CHARACTER)
    if (amount > 0) {
      balances[key] = amount
    }
  }

  currencies.characters[charId] = {
    displayName: GetUnitName("player"),
    lastScanned: GetTimeStamp(),
    balances: balances,
  }

  if (CURT_TRANSMUTE_CRYSTALS !== undefined) {
    const sv = getSavedVariables()
    sv.transmuteCrystalCap = GetMaxPossibleCurrency(
      CURT_TRANSMUTE_CRYSTALS,
      CURRENCY_LOCATION_ACCOUNT
    )
    sv.transmuteCrystalAmount = GetCurrencyAmount(
      CURT_TRANSMUTE_CRYSTALS,
      CURRENCY_LOCATION_ACCOUNT
    )
  }
}

export function scanBankedCurrencies(): undefined {
  const currencies = ensureCurrencies()
  const balances: CurrencyBalances = {}

  for (const curt of BANKABLE_CURRENCIES) {
    const key = CURRENCY_MAP[curt]
    if (key === undefined) continue
    const amount = GetCurrencyAmount(curt, CURRENCY_LOCATION_BANK)
    if (amount > 0) {
      balances[key] = amount
    }
  }

  currencies.bank = balances
}

export function scanAccountCurrencies(): undefined {
  const currencies = ensureCurrencies()
  const balances: CurrencyBalances = {}

  for (const [curtStr, key] of Object.entries(CURRENCY_MAP)) {
    const curt = requireNumericKey(curtStr, "CURRENCY_MAP")
    const amount = GetCurrencyAmount(curt, CURRENCY_LOCATION_ACCOUNT)
    if (amount > 0) {
      balances[key] = amount
    }
  }

  currencies.account = balances
}

export function updateCurrency(
  currencyType: number,
  currencyLocation: number,
  newAmount: number
): undefined {
  const key = CURRENCY_MAP[currencyType]
  if (key === undefined) return

  const currencies = ensureCurrencies()

  if (currencyLocation === CURRENCY_LOCATION_BANK) {
    if (!currencies.bank) {
      currencies.bank = {}
    }
    if (newAmount > 0) {
      currencies.bank[key] = newAmount
    } else {
      delete currencies.bank[key]
    }
  } else if (currencyLocation === CURRENCY_LOCATION_ACCOUNT) {
    if (!currencies.account) {
      currencies.account = {}
    }
    if (newAmount > 0) {
      currencies.account[key] = newAmount
    } else {
      delete currencies.account[key]
    }
  } else if (currencyLocation === CURRENCY_LOCATION_CHARACTER) {
    const charId = getCharacterLocationKey()
    if (charId === undefined) return
    if (!currencies.characters[charId]) {
      currencies.characters[charId] = {
        displayName: GetUnitName("player"),
        lastScanned: GetTimeStamp(),
        balances: {},
      }
    }
    const charEntry = currencies.characters[charId]
    if (newAmount > 0) {
      charEntry.balances[key] = newAmount
    } else {
      delete charEntry.balances[key]
    }
    charEntry.lastScanned = GetTimeStamp()
  }
}
