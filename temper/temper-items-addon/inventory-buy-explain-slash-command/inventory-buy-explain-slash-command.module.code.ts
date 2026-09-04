import { requireAt } from "@akasha/utils-narrow/require-at"
import { buildBuyExplainTrace } from "../inventory-buy-explain-trace-builder/inventory-buy-explain-trace-builder.module.code.ts"
import { captureOrNull } from "../inventory-match-capture/inventory-match-capture.module.code.ts"
import { getSavedVariables } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import type { BuyExplainRule } from "../inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"

const PREFIX = "[TemperBuyExplain]"

function printRule(r: BuyExplainRule): undefined {
  if (!r.hasRule) {
    d(`${PREFIX} itemId=${r.itemId}: NO BUY RULE for this item`)
    return
  }
  d(
    `${PREFIX} itemId=${r.itemId}: target=${r.targetQuantity ?? 0}, global=${r.globalTotal} (live=${r.liveCurrentCharBackpack} + acct=${r.accountStock} + otherChars=${r.byCharSum}), shortfall=${r.shortfall}`
  )
  const s = r.storeScan
  if (!s.storeOpen) {
    d(`${PREFIX}   store: NOT OPEN (0 entries) — open a merchant and re-run to scan`)
    return
  }
  if (s.matchedEntryIndex === undefined) {
    d(`${PREFIX}   store: ${s.numEntries} entries, NO entry matched itemId ${r.itemId}`)
    return
  }
  d(
    `${PREFIX}   store: matched entry #${s.matchedEntryIndex} — price=${s.matchPrice ?? "?"}, meetsReq=${s.matchMeetsRequirements === true ? "yes" : "NO"}, maxBuyable=${s.matchMaxBuyable ?? "?"}, computedQty=${s.computedQuantity ?? 0}`
  )
  if ((s.computedQuantity ?? 0) <= 0) {
    d(`${PREFIX}   => would NOT buy (qty 0: check meetsReq / maxBuyable / affordability)`)
  } else {
    d(`${PREFIX}   => would buy ${s.computedQuantity}`)
  }
}

export function onTemperInventoryExplainBuyCommand(this: void, args: string): undefined {
  const argsStr = args !== undefined ? args : ""
  const [captured] = string.match(argsStr, "(|H.-|h.-|h)")
  const matched = captureOrNull(captured)
  const itemId = matched === null ? undefined : GetItemLinkItemId(matched)

  const trace = buildBuyExplainTrace(itemId)
  if (trace === undefined) {
    d(`${PREFIX} No compiled buy rules found. Export settings from Temper first.`)
    return
  }

  const sv = getSavedVariables()
  if (!sv.diagnostics) sv.diagnostics = {}
  sv.diagnostics.lastBuyExplain = trace

  const firstRule = trace.rules.length > 0 ? requireAt(trace.rules, 0) : undefined
  const numEntries = firstRule !== undefined ? firstRule.storeScan.numEntries : 0
  d(
    `${PREFIX} current=${trace.currentCharId}, money=${trace.playerMoney}, storeEntries=${numEntries}, rules=${trace.rules.length}`
  )
  if (!trace.stockAvailable) {
    d(
      `${PREFIX} STOCK UNAVAILABLE — no inventory snapshot reached this build. acct/otherChars below are 0 because they are UNKNOWN, not because they are empty; buying is declined until a sync lands.`
    )
  }
  for (const r of trace.rules) printRule(r)
  d(`${PREFIX} Full trace => SavedVariables.diagnostics.lastBuyExplain`)
}
