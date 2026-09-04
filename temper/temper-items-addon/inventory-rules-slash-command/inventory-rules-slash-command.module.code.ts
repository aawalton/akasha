import {
  PLAYER_ARMOR_ESO_TO_TRAIT,
  PLAYER_JEWELRY_ESO_TO_TRAIT,
  PLAYER_WEAPON_ESO_TO_TRAIT,
} from "@akasha/temper-equipment/eso-trait-map"
import type { EvalContext } from "@akasha/temper-items-rules-eval/eval-env"
import type {
  IndeterminateReason,
  RuleEvalResult,
} from "@akasha/temper-items-rules-eval/eval-result"
import { evaluateRule, walkRules } from "@akasha/temper-items-rules-eval/evaluator"
import { requireAt } from "@akasha/utils-narrow/require-at"
import { buildItemFactsForLink } from "../inventory-build-item-facts/inventory-build-item-facts.module.code.ts"
import { buildEsoEvalEnv } from "../inventory-eso-eval-env/inventory-eso-eval-env.module.code.ts"
import {
  findItemInInventory,
  isItemLinkCraftedSafe,
  lookupTtcPricing,
} from "../inventory-item-data/inventory-item-data.module.code.ts"
import { captureOrNull } from "../inventory-match-capture/inventory-match-capture.module.code.ts"
import { isItemLinkQuestRelevant } from "../inventory-quest-relevance/inventory-quest-relevance.module.code.ts"
import {
  classifyItem,
  gatherSignals,
  getAncestorChain,
} from "../inventory-rules-classify/inventory-rules-classify.module.code.ts"
import {
  describeInlineConditions,
  formatCategoryPath,
  type MatchContext,
} from "../inventory-rules-conditions-render/inventory-rules-conditions-render.module.code.ts"
import { getCompiledConfig } from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import { inferDeconCraftingType } from "../inventory-rules-core-inspire/inventory-rules-core-inspire.module.code.ts"
export const PREFIX = "[TemperRules]"

function buildMatchContextForRender(itemLink: string, ancestorChain: string[]): MatchContext {
  const found = findItemInInventory(itemLink)
  const foundBagId = found !== undefined ? found.bagId : 0
  const foundSlotIndex = found !== undefined ? found.slotIndex : 0

  const signals = gatherSignals(0, 0, itemLink)
  const quality = GetItemLinkDisplayQuality(itemLink)
  const equipType = GetItemLinkEquipType(itemLink)
  const armorType = GetItemLinkArmorType(itemLink)
  const weaponType = GetItemLinkWeaponType(itemLink)
  const deconCraftingType = inferDeconCraftingType(itemLink)
  const isStolenVal = found !== undefined ? IsItemStolen(foundBagId, foundSlotIndex) : false
  const isBoundVal = found !== undefined ? IsItemBound(foundBagId, foundSlotIndex) : false
  const isBoPTradeableVal =
    found !== undefined ? IsItemBoPAndTradeable(foundBagId, foundSlotIndex) : false
  const isQuestRelevantVal = isItemLinkQuestRelevant(itemLink)
  const isCraftedVal = isItemLinkCraftedSafe(itemLink, signals.itemType)
  const isReconstructedVal = IsItemLinkReconstructed(itemLink)
  const isTransmutedVal =
    GetItemTraitInformationFromItemLink(itemLink) === ITEM_TRAIT_INFORMATION_RETRAITED
  const isLocked = found !== undefined ? IsItemPlayerLocked(foundBagId, foundSlotIndex) : false
  const itemId = GetItemLinkItemId(itemLink)

  const pricing = lookupTtcPricing(itemLink)
  const merchantValue =
    found !== undefined ? GetItemSellValueWithBonuses(foundBagId, foundSlotIndex) : undefined

  let temperTraitId: string | undefined
  if (signals.traitType !== 0) {
    for (let i = 0; i < ancestorChain.length; i++) {
      const id = requireAt(ancestorChain, i)
      if (id === "jewelry" || id === "companion-jewelry") {
        temperTraitId = PLAYER_JEWELRY_ESO_TO_TRAIT.get(signals.traitType)
        break
      }
      if (id === "weapons" || id === "companion-weapons") {
        temperTraitId = PLAYER_WEAPON_ESO_TO_TRAIT.get(signals.traitType)
        break
      }
      if (id === "armor" || id === "companion-armor") {
        temperTraitId = PLAYER_ARMOR_ESO_TO_TRAIT.get(signals.traitType)
        break
      }
    }
  }

  return {
    quality,
    itemLink,
    bagId: foundBagId,
    slotIndex: foundSlotIndex,
    itemType: signals.itemType,
    traitType: signals.traitType,
    equipType,
    armorType,
    weaponType,
    deconCraftingType,
    isStolenVal,
    isBoundVal,
    isBoPTradeableVal,
    isQuestRelevantVal,
    isCraftedVal,
    isReconstructedVal,
    isTransmutedVal,
    isLocked,
    temperTraitId,
    itemId,
    itemName: signals.itemName,
    saleAvg: pricing.saleAvg,
    minPrice: pricing.minPrice,
    amountCount: pricing.amountCount,
    saleAmountCount: pricing.saleAmountCount,
    estimatedValue: pricing.estimatedValue,
    merchantValue,
    replacementCost: pricing.estimatedValue,
  }
}

function describeIndeterminateReason(reason: IndeterminateReason): string {
  if (reason.kind === "category-unknown") {
    return `category-unknown (missing ${reason.missingSignal})`
  }
  if (reason.kind === "condition-unknown") {
    return `condition-unknown ${reason.conditionKind} (missing ${reason.missingSignal})`
  }
  return `destination-unknown${reason.detail !== undefined ? ` (${reason.detail})` : ""}`
}

function describeIndeterminateResult(r: RuleEvalResult): string {
  if (r.verdict.kind !== "indeterminate") return ""
  return describeIndeterminateReason(r.verdict.reason)
}

export function onTemperRulesCommand(this: void, args: string): undefined {
  const [captured] = string.match(args, "(|H.-|h.-|h)")
  const matched = captureOrNull(captured)
  if (matched === null) {
    d(`${PREFIX} Usage: /temperrules [item link] — shift-click an item to insert its link`)
    return
  }
  const itemLink: string = matched

  const compiled = getCompiledConfig()
  if (!compiled) {
    d(`${PREFIX} No compiled rules config found. Export settings from Temper first.`)
    return
  }

  const signals = gatherSignals(0, 0, itemLink)
  const nodeId = classifyItem(signals)
  const chain = getAncestorChain(nodeId)

  d(`${PREFIX} ${itemLink}`)
  d(`${PREFIX} Category: ${formatCategoryPath(chain)}`)

  const found = findItemInInventory(itemLink)
  if (found !== undefined) {
    d(`${PREFIX} Found in inventory: bag ${found.bagId} slot ${found.slotIndex}`)
  }

  const itemId = GetItemLinkItemId(itemLink)
  const isLocked = found !== undefined ? IsItemPlayerLocked(found.bagId, found.slotIndex) : false

  if (!isLocked) {
    const itemRule = compiled.itemRules[itemId]
    if (itemRule !== undefined) {
      const dest = itemRule.destination ?? "nil"
      d(
        `${PREFIX} Matched item rule: itemId=${itemId}, action=${itemRule.action}, destination=${dest}`
      )
      return
    }
  }

  const facts = buildItemFactsForLink(itemLink)
  const env = buildEsoEvalEnv()
  const ctx: EvalContext = { env }

  const renderCtx = buildMatchContextForRender(itemLink, chain)

  if (isLocked) {
    for (let i = 0; i < compiled.orderedRules.length; i++) {
      const rule = compiled.orderedRules[i]
      if (rule === undefined) continue
      if (rule.locked !== "locked" || rule.action !== "unlock") continue
      const result = evaluateRule(rule, i, facts, ctx)
      if (result.verdict.kind !== "matched") continue
      const dest = result.resolvedDestination ?? rule.destination ?? "nil"
      d(`${PREFIX} Rule #${i}: action=unlock, destination=${dest}`)
      const condStr = describeInlineConditions(rule, renderCtx)
      if (condStr !== "") {
        d(`${PREFIX} Conditions: ${condStr}`)
      }
      return
    }
    d(`${PREFIX} No matching unlock rule for locked item`)
    return
  }

  const trace = walkRules(compiled.orderedRules, facts, ctx)
  const outcome = trace.outcome

  if (outcome.kind === "matched") {
    const ruleIndex = outcome.rule.index
    const compiledRule = compiled.orderedRules[ruleIndex]
    const destination = outcome.destination ?? "nil"
    d(`${PREFIX} Rule #${ruleIndex}: action=${outcome.action}, destination=${destination}`)
    if (compiledRule !== undefined) {
      const condStr = describeInlineConditions(compiledRule, renderCtx)
      if (condStr !== "") {
        d(`${PREFIX} Conditions: ${condStr}`)
      }
    }
    return
  }

  if (outcome.kind === "implicit-terminal") {
    d(`${PREFIX} No matching rule for item`)
    return
  }

  d(`${PREFIX} Indeterminate rule evaluation`)
  for (const r of outcome.indeterminateRules) {
    d(`${PREFIX}   Rule #${r.index}: ${describeIndeterminateResult(r)}`)
  }
  const provisional = outcome.provisionalMatch
  if (provisional !== undefined) {
    const dest = provisional.destination ?? "nil"
    d(
      `${PREFIX} Provisional match (would win if all indeterminate rules fail): Rule #${provisional.rule.index}, action=${provisional.action}, destination=${dest}`
    )
  }
}
