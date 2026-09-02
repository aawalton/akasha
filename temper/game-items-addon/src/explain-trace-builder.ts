import { parseMotifBookName } from "@temper/game-items-core/motif-name-parser"
import {
  CharacterId,
  type ItemKey,
  type UseDestinationContext,
} from "@temper/game-items-rules-core/use-destination-types"
import type { EvalContext } from "@temper/game-items-rules-eval/eval-env"
import type { RuleEvalResult, WalkTrace } from "@temper/game-items-rules-eval/eval-result"
import { walkRules } from "@temper/game-items-rules-eval/evaluator"
import { asObjectRecord } from "@akasha/utils-narrow/as-object-record"
import { requireAt } from "@akasha/utils-narrow/require-at"
import { buildItemFactsForLink } from "./build-item-facts"
import { buildCompiledCharacterPriority } from "./character-priority"
import { buildEsoEvalEnv } from "./eso-eval-env"
import { ALL_CATEGORIES_ID, type CompiledOrderedRule } from "./generated/rule-types.generated"
import {
  PLAYER_ARMOR_TRAIT_ESO_ID_TO_TEMPER_ID,
  PLAYER_JEWELRY_TRAIT_ESO_ID_TO_TEMPER_ID,
  PLAYER_WEAPON_TRAIT_ESO_ID_TO_TEMPER_ID,
} from "./generated/trait-mappings.generated"
import { findItemInInventory, isItemLinkCraftedSafe, lookupTtcPricing } from "./item-data"
import { isItemLinkQuestRelevant } from "./quest-relevance"
import { classifyItem, gatherSignals, getAncestorChain } from "./rules-classify"
import { describeInlineConditions, type MatchContext } from "./rules-conditions-render"
import { getCompiledConfig } from "./rules-core"
import { getTemperCharactersData } from "./temper-characters-data"
import { buildUnlockContext, buildUnlockItemKey } from "./rules-core-character-finders"
import { inferDeconCraftingType } from "./rules-core-inspire"
import type { ExplainTrace } from "./types"

const SCHEMA_VERSION = 1
const MAX_REJECTIONS = 50

function buildItemKeyDetail(itemKey: ItemKey): Record<string, number | string> {
  if (itemKey.kind === "recipe") return { resultItemId: itemKey.resultItemId }
  if (itemKey.kind === "motif")
    return {
      styleId: itemKey.styleId,
      chapterId: itemKey.chapterId === null ? "master" : itemKey.chapterId,
    }
  if (itemKey.kind === "script") return { scriptId: itemKey.scriptId }
  return { itemId: itemKey.itemId }
}

function captureMotifLookup(itemLink: string): ExplainTrace["motifLookup"] {
  const [, specializedType] = GetItemLinkItemType(itemLink)
  if (
    specializedType !== SPECIALIZED_ITEMTYPE_RACIAL_STYLE_MOTIF_BOOK &&
    specializedType !== SPECIALIZED_ITEMTYPE_RACIAL_STYLE_MOTIF_CHAPTER
  ) {
    return undefined
  }

  const rawName = GetItemLinkName(itemLink)
  const cleanName = zo_strformat("<<1>>", rawName)
  const parsed = parseMotifBookName(cleanName)

  if (parsed !== undefined) {
    return {
      rawName,
      cleanName,
      lookupHit: true,
      coords: {
        styleId: parsed.styleId,
        chapterId: parsed.chapterId,
      },
    }
  }
  return { rawName, cleanName, lookupHit: false }
}

function captureUnlockWalk(
  itemLink: string,
  itemKey: ItemKey
): NonNullable<ExplainTrace["unlockWalk"]> {
  const currentIdStr = tostring(GetCurrentCharacterId())
  const currentId = CharacterId(currentIdStr)
  const priority = buildCompiledCharacterPriority(currentId)

  const ctx: UseDestinationContext = buildUnlockContext(priority, currentId, itemLink)
  const characters = getTemperCharactersData()

  const entries: NonNullable<ExplainTrace["unlockWalk"]>["priority"] = []
  let chosen: string | undefined
  for (const charId of priority) {
    const knowsRaw = ctx.knowsItem(charId, itemKey)
    let knows: boolean | "no-data-treated-as-knows" = knowsRaw
    if (knowsRaw && charId !== currentIdStr) {
      const charData = characters !== undefined ? asObjectRecord(characters[charId]) : undefined
      if (!charData) knows = "no-data-treated-as-knows"
    }
    const isCandidate = knowsRaw === false && chosen === undefined
    if (isCandidate) chosen = charId
    entries.push({ charId, knows, chosen: isCandidate })
  }

  return { currentCharId: currentIdStr, priority: entries, chosen }
}

function buildMatchContext(
  itemLink: string,
  ancestorChain: ReadonlyArray<string>,
  signals: { itemType: number; traitType: number }
): MatchContext {
  const found = findItemInInventory(itemLink)
  const foundBagId = found !== undefined ? found.bagId : 0
  const foundSlotIndex = found !== undefined ? found.slotIndex : 0
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
  const itemName = zo_strformat("<<1>>", GetItemLinkName(itemLink))

  const pricing = lookupTtcPricing(itemLink)
  const merchantValue =
    found !== undefined ? GetItemSellValueWithBonuses(foundBagId, foundSlotIndex) : undefined

  let temperTraitId: string | undefined
  if (signals.traitType !== 0) {
    for (let i = 0; i < ancestorChain.length; i++) {
      const id = requireAt(ancestorChain, i)
      if (id === "jewelry" || id === "companion-jewelry") {
        temperTraitId = PLAYER_JEWELRY_TRAIT_ESO_ID_TO_TEMPER_ID[signals.traitType]
        break
      }
      if (id === "weapons" || id === "companion-weapons") {
        temperTraitId = PLAYER_WEAPON_TRAIT_ESO_ID_TO_TEMPER_ID[signals.traitType]
        break
      }
      if (id === "armor" || id === "companion-armor") {
        temperTraitId = PLAYER_ARMOR_TRAIT_ESO_ID_TO_TEMPER_ID[signals.traitType]
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
    itemName,
    saleAvg: pricing.saleAvg,
    minPrice: pricing.minPrice,
    amountCount: pricing.amountCount,
    saleAmountCount: pricing.saleAmountCount,
    estimatedValue: pricing.estimatedValue,
    merchantValue,
    replacementCost: pricing.estimatedValue,
  }
}

function formatCategoryPath(chain: ReadonlyArray<string>): string {
  const parts: string[] = []
  for (let i = chain.length - 1; i >= 0; i--) {
    const id = requireAt(chain, i)
    if (id === ALL_CATEGORIES_ID) continue
    parts.push(id)
  }
  return parts.join(" > ")
}

function pushRejection(
  trace: ExplainTrace,
  index: number,
  categoryId: string,
  action: string,
  reason: ExplainTrace["orderedWalk"]["rejections"][number]["reason"],
  detail?: string
): undefined {
  if (trace.orderedWalk.rejections.length >= MAX_REJECTIONS) return
  trace.orderedWalk.rejections[trace.orderedWalk.rejections.length] = {
    index,
    categoryId,
    action,
    reason,
    detail,
  }
}

function recordRuleResult(
  trace: ExplainTrace,
  result: RuleEvalResult,
  matchCtx: MatchContext,
  rules: ReadonlyArray<CompiledOrderedRule>
): undefined {
  const verdict = result.verdict
  if (verdict.kind === "matched") return
  if (verdict.kind === "rejected") {
    const reason = verdict.reason
    if (reason.kind === "category-mismatch") return
    if (reason.kind === "condition-fail") {
      const rule = requireAt(rules, result.index)
      pushRejection(
        trace,
        result.index,
        result.categoryId,
        result.action,
        "conditions-fail",
        describeInlineConditions(rule, matchCtx)
      )
      return
    }
    if (reason.kind === "destination-resolve-fail") {
      pushRejection(
        trace,
        result.index,
        result.categoryId,
        result.action,
        "destination-resolve-fail",
        reason.detail
      )
      return
    }
    if (reason.kind === "container-skip") {
      pushRejection(
        trace,
        result.index,
        result.categoryId,
        result.action,
        "container-skip",
        reason.detail
      )
      return
    }
    return
  }
  const ireason = verdict.reason
  let detail: string
  if (ireason.kind === "condition-unknown") {
    detail = `condition unknown: ${ireason.conditionKind} (missing ${ireason.missingSignal})`
  } else if (ireason.kind === "category-unknown") {
    detail = `category unknown: missing ${ireason.missingSignal}`
  } else {
    detail = `destination unknown${ireason.detail !== undefined ? `: ${ireason.detail}` : ""}`
  }
  pushRejection(trace, result.index, result.categoryId, result.action, "conditions-fail", detail)
}

export function buildExplainTrace(itemLink: string): ExplainTrace | undefined {
  const compiled = getCompiledConfig()
  if (!compiled) return undefined

  const signals = gatherSignals(0, 0, itemLink)
  const leaf = classifyItem(signals)
  const chain = getAncestorChain(leaf)

  const matchCtx = buildMatchContext(itemLink, chain, {
    itemType: signals.itemType,
    traitType: signals.traitType,
  })

  const facts = buildItemFactsForLink(itemLink)

  const found = findItemInInventory(itemLink)
  const itemId = matchCtx.itemId
  const itemNameRaw = GetItemLinkName(itemLink)

  const motifLookup = captureMotifLookup(itemLink)
  const itemKey = buildUnlockItemKey(itemLink, signals.itemType)

  const trace: ExplainTrace = {
    schemaVersion: SCHEMA_VERSION,
    timestamp: GetGameTimeMilliseconds(),
    itemLink,
    itemId,
    itemName: matchCtx.itemName,
    itemNameRaw,
    inventory:
      found !== undefined
        ? { found: true, bagId: found.bagId, slotIndex: found.slotIndex }
        : { found: false },
    signals: {
      itemType: signals.itemType,
      specializedItemType: signals.specializedItemType,
      filterType: signals.filterType,
      traitType: signals.traitType,
      equipType: signals.equipType,
      armorType: signals.armorType,
      weaponType: signals.weaponType,
      quality: matchCtx.quality,
    },
    classification: {
      leafCategoryId: leaf,
      ancestorChain: chain,
      categoryPath: formatCategoryPath(chain),
    },
    motifLookup,
    itemKey:
      itemKey === undefined
        ? { kind: "none", detail: {} }
        : { kind: itemKey.kind, detail: buildItemKeyDetail(itemKey) },
    orderedWalk: {
      rulesConsidered: compiled.orderedRules.length,
      rulesEvaluated: 0,
      rejections: [],
    },
    outcome: { action: "no-match", destination: "nil", summary: "" },
    notes: [],
  }

  if (
    itemKey !== undefined &&
    (itemKey.kind === "recipe" || itemKey.kind === "motif" || itemKey.kind === "script")
  ) {
    trace.unlockWalk = captureUnlockWalk(itemLink, itemKey)
  }

  if (motifLookup !== undefined && !motifLookup.lookupHit) {
    trace.notes[trace.notes.length] =
      `motif name parse miss for "${motifLookup.cleanName}"; buildUnlockItemKey returned undefined → unlock rules cannot match. Likely an unknown chapter suffix not in CHAPTER_SUFFIX_TO_ID (parseMotifBookName) — extend the suffix table.`
  }

  if (!matchCtx.isLocked) {
    const itemRule = compiled.itemRules[itemId]
    if (itemRule !== undefined) {
      trace.itemRulesMatch = {
        itemId,
        action: itemRule.action,
        destination: itemRule.destination,
      }
      trace.outcome = {
        action: itemRule.action,
        destination: itemRule.destination ?? "nil",
        summary: `item rule (itemId=${itemId})`,
      }
      return trace
    }
  }

  const ctx: EvalContext = { env: buildEsoEvalEnv() }
  const walk: WalkTrace = walkRules(compiled.orderedRules, facts, ctx)
  const rules = compiled.orderedRules

  for (let i = 0; i < walk.perRule.length; i++) {
    const result = requireAt(walk.perRule, i)
    if (result.verdict.kind !== "rejected" || result.verdict.reason.kind !== "category-mismatch") {
      trace.orderedWalk.rulesEvaluated++
    }
    recordRuleResult(trace, result, matchCtx, rules)
  }

  const outcome = walk.outcome
  if (outcome.kind === "matched") {
    const matchedRule = requireAt(rules, outcome.rule.index)
    const destination = outcome.destination ?? "nil"
    trace.orderedWalk.matched = {
      index: outcome.rule.index,
      categoryId: outcome.rule.categoryId,
      action: outcome.action,
      destination,
      conditions: describeInlineConditions(matchedRule, matchCtx),
    }
    trace.outcome = {
      action: outcome.action,
      destination,
      summary: `ordered rule #${outcome.rule.index} (category=${outcome.rule.categoryId})`,
    }
    return trace
  }

  if (outcome.kind === "indeterminate") {
    const provisional = outcome.provisionalMatch
    if (provisional !== undefined) {
      const matchedRule = requireAt(rules, provisional.rule.index)
      const destination = provisional.destination ?? "nil"
      trace.orderedWalk.matched = {
        index: provisional.rule.index,
        categoryId: provisional.rule.categoryId,
        action: provisional.action,
        destination,
        conditions: describeInlineConditions(matchedRule, matchCtx),
      }
      trace.outcome = {
        action: provisional.action,
        destination,
        summary: `provisional rule #${provisional.rule.index} (category=${provisional.rule.categoryId}) — outcome indeterminate`,
      }
    } else {
      trace.outcome = {
        action: "no-match",
        destination: "nil",
        summary: `walked ${trace.orderedWalk.rulesEvaluated} rule(s) in category, outcome indeterminate`,
      }
    }
    trace.notes[trace.notes.length] =
      `walk outcome is indeterminate — ${outcome.indeterminateRules.length} rule(s) before any deterministic match could not be resolved (see rejections with "condition unknown:" / "category unknown:" / "destination unknown" detail prefixes).`
    return trace
  }

  trace.outcome = {
    action: "no-match",
    destination: "nil",
    summary: `walked ${trace.orderedWalk.rulesEvaluated} rule(s) in category, none matched`,
  }
  return trace
}
