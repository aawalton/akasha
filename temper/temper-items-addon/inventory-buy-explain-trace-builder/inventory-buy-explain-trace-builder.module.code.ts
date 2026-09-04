import { computeBuyShortfall } from "@akasha/temper-items-rules-core/buy-rule-eval"
import {
  computeBuyQuantity,
  computeGlobalTotal,
} from "../inventory-rules-buy-core/inventory-rules-buy-core.module.code.ts"
import { getCompiledConfig } from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import { bankCountInBag } from "../inventory-rules-dispatch-bank-slots/inventory-rules-dispatch-bank-slots.module.code.ts"
import type {
  BuyExplainRule,
  BuyExplainStoreScan,
  BuyExplainTrace,
} from "../inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"

const SCHEMA_VERSION = 1

type CompiledConfig = NonNullable<ReturnType<typeof getCompiledConfig>>

function sumByCharExcludingCurrent(
  byChar: Record<string, number> | undefined,
  currentCharId: string
): number {
  if (!byChar) return 0
  let sum = 0
  for (const [charId, count] of Object.entries(byChar)) {
    if (charId === currentCharId) continue
    sum += count
  }
  return sum
}

function scanStoreForItem(
  itemId: number,
  numEntries: number,
  shortfall: number,
  playerMoney: number
): BuyExplainStoreScan {
  const scan: BuyExplainStoreScan = { storeOpen: numEntries > 0, numEntries }
  for (let i = 1; i <= numEntries; i++) {
    const link = GetStoreItemLink(i, LINK_STYLE_BRACKETS)
    if (GetItemLinkItemId(link) !== itemId) continue
    const [, , , price, , meetsRequirementsToBuy] = GetStoreEntryInfo(i)
    const maxBuyable = GetStoreEntryMaxBuyable(i)
    scan.matchedEntryIndex = i
    scan.matchPrice = price
    scan.matchMeetsRequirements = meetsRequirementsToBuy
    scan.matchMaxBuyable = maxBuyable
    scan.computedQuantity = computeBuyQuantity(shortfall, maxBuyable, playerMoney, price)
    break
  }
  return scan
}

function buildRuleEntry(
  itemId: number,
  rule: { targetQuantity: number } | undefined,
  compiled: CompiledConfig,
  currentCharId: string,
  numEntries: number,
  playerMoney: number
): BuyExplainRule {
  const liveCurrent = bankCountInBag(BAG_BACKPACK, itemId, true)
  const accountStock = compiled.buyStockAccount?.[itemId] ?? 0
  const byChar = compiled.buyStockByChar?.[itemId]
  const byCharSum = sumByCharExcludingCurrent(byChar, currentCharId)
  const globalTotal = computeGlobalTotal(liveCurrent, currentCharId, byChar, accountStock)
  const targetQuantity = rule?.targetQuantity
  const shortfall =
    targetQuantity === undefined ? 0 : computeBuyShortfall(targetQuantity, globalTotal)
  return {
    itemId,
    hasRule: rule !== undefined,
    targetQuantity,
    liveCurrentCharBackpack: liveCurrent,
    accountStock,
    byCharSum,
    globalTotal,
    shortfall,
    storeScan: scanStoreForItem(itemId, numEntries, shortfall, playerMoney),
  }
}

export function buildBuyExplainTrace(itemId: number | undefined): BuyExplainTrace | undefined {
  const compiled = getCompiledConfig()
  if (!compiled) return undefined
  const buyRules = compiled.buyRules
  if (!buyRules) return undefined

  const currentCharId = tostring(GetCurrentCharacterId())
  const numEntries = GetNumStoreItems()
  const playerMoney = GetCurrencyAmount(CURT_MONEY, CURRENCY_LOCATION_CHARACTER)

  const rules: BuyExplainRule[] = []
  if (itemId !== undefined) {
    rules.push(
      buildRuleEntry(itemId, buyRules[itemId], compiled, currentCharId, numEntries, playerMoney)
    )
  } else {
    for (const [itemIdStr, rule] of Object.entries(buyRules)) {
      const id = tonumber(itemIdStr)
      if (id === undefined) continue
      rules.push(buildRuleEntry(id, rule, compiled, currentCharId, numEntries, playerMoney))
    }
  }

  return {
    schemaVersion: SCHEMA_VERSION,
    timestamp: GetGameTimeMilliseconds(),
    currentCharId,
    playerMoney,
    stockAvailable: compiled.buyStockAvailable === true,
    rules,
  }
}
