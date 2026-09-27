import { classifyLocation } from "akasha/temper/items/core/modules/location-classify/location-classify.module.code.ts"
import { composeCharEligibilityPredicate } from "akasha/temper/items/rules/core/modules/eligibility-predicate-composer/eligibility-predicate-composer.module.code.ts"
import type { CompiledOrderedRule } from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type { AffectedItem } from "akasha/temper/items/rules/core/modules/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import type { RuleMatcherContext } from "akasha/temper/items/rules/core/modules/rule-matcher-context-types/rule-matcher-context-types.module.code.ts"
import {
  planStockChainVisit,
  stockChainTarget,
} from "akasha/temper/items/rules/core/modules/stock-chain-visit/stock-chain-visit.module.code.ts"
import { characterId } from "akasha/temper/items/rules/core/modules/use-destination-types/use-destination-types.module.code.ts"
import { planPhraseOf } from "akasha/temper/items/rules/routing/core/modules/inventory-management-plan-route-venue/inventory-management-plan-route-venue.module.code.ts"
import type { PlanItem } from "akasha/temper/items/rules/routing/core/modules/inventory-management-plan-types/inventory-management-plan-types.module.code.ts"
import { anyCharacter } from "akasha/temper/items/rules/routing/core/temper-plan-phrase/pages/any-character.temper-plan-phrase.ts"
import { buy } from "akasha/temper/items/rules/routing/core/temper-plan-phrase/pages/buy.temper-plan-phrase.ts"
import type {
  CharSimState,
  SimStep,
} from "akasha/temper/items/rules/routing/modules/inventory-management-plan-simulation/inventory-management-plan-simulation.module.code.ts"

export const BUY_CHARACTER_ID = "__buy__"

export function buyCharacterName(): string {
  return planPhraseOf(anyCharacter)
}

export interface BuyShortfall {
  readonly itemId: number
  readonly itemName: string
  readonly quantity: number
}

const HELD_LOCATIONS: ReadonlySet<string> = new Set(["character", "bank", "housing-storage"])

function eligibleCharacters(
  rule: CompiledOrderedRule,
  context: RuleMatcherContext | undefined
): number {
  if (context === undefined) return 0
  const chain = rule.destinationChain
  const leg = chain === undefined ? undefined : planStockChainVisit(chain)
  const passes = composeCharEligibilityPredicate(leg?.charEligibility, {
    getCharacterSkillLineRanks: context.getCharacterSkillLineRanks,
    getCharacterCurseState: context.getCharacterCurseState,
    getCharacterCanLevelMorphs: context.getCharacterCanLevelMorphs,
  })
  return context.characterPriority.filter((id) => passes(characterId(id))).length
}

function heldByRule(entries: readonly AffectedItem[]): number {
  let held = 0
  for (const entry of entries) {
    if (HELD_LOCATIONS.has(classifyLocation(entry.locationKey))) held += entry.item.stackCount
  }
  return held
}

function boughtItem(
  rule: CompiledOrderedRule,
  entries: readonly AffectedItem[]
): { readonly itemId: number; readonly itemName: string } | undefined {
  const wanted = rule.itemIds?.[0]
  if (wanted !== undefined) {
    const named = entries.find((one) => one.item.itemId === wanted)
    return { itemId: wanted, itemName: named?.item.itemName ?? String(wanted) }
  }
  const first = entries[0]
  return first === undefined
    ? undefined
    : { itemId: first.item.itemId, itemName: first.item.itemName }
}

export function buyShortfallsOf(
  rules: readonly CompiledOrderedRule[],
  affectedItemsMap: ReadonlyMap<string, readonly AffectedItem[]>,
  context: RuleMatcherContext | undefined
): readonly BuyShortfall[] {
  const shortfalls: BuyShortfall[] = []
  for (const rule of rules) {
    if (rule.buyShortfall !== true || rule.active === false || rule.action !== "stock") continue
    if (rule.id === undefined) continue
    const target = stockChainTarget(rule.destinationChain, eligibleCharacters(rule, context))
    if (target === undefined) continue
    const entries = affectedItemsMap.get(rule.id) ?? []
    const quantity = target - heldByRule(entries)
    if (quantity <= 0) continue
    const item = boughtItem(rule, entries)
    if (item === undefined) continue
    shortfalls.push({ ...item, quantity })
  }
  return shortfalls
}

function buildBuySimStep(shortfall: BuyShortfall): SimStep {
  const planItem: PlanItem = {
    itemId: shortfall.itemId,
    itemName: shortfall.itemName,
    stackCount: shortfall.quantity,
    quality: 0,
    action: "sell",
    note: planPhraseOf(buy),
  }
  return {
    venue: "vendor",
    operation: "retrieve",
    planItem,
    backpackSlots: 1,
    itemId: shortfall.itemId,
    stackable: true,
    occupiesStorageSlot: false,
    next: null,
  }
}

export function injectBuySimSteps(
  charStates: Map<string, CharSimState>,
  rules: readonly CompiledOrderedRule[],
  affectedItemsMap: ReadonlyMap<string, readonly AffectedItem[]>,
  context: RuleMatcherContext | undefined
): undefined {
  const shortfalls = buyShortfallsOf(rules, affectedItemsMap, context)
  if (shortfalls.length === 0) return

  const pending: SimStep[] = shortfalls.map(buildBuySimStep)
  charStates.set(BUY_CHARACTER_ID, {
    characterId: BUY_CHARACTER_ID,
    pending,
    isSource: false,
    depositKeys: new Set(),
  })
}
