import { composeCharEligibilityPredicate } from "akasha/temper/temper-items-rules-core/eligibility-predicate-composer/eligibility-predicate-composer.module.code.ts"
import { narrowDestination } from "akasha/temper/temper-items-rules-core/inventory-destination-parse/inventory-destination-parse.module.code.ts"
import type { CompiledOrderedRule } from "akasha/temper/temper-items-rules-core/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type { AffectedItem } from "akasha/temper/temper-items-rules-core/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import type {
  ItemAction,
  ItemRule,
  MoveToDestination,
} from "akasha/temper/temper-items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { RuleMatcherContext } from "akasha/temper/temper-items-rules-core/rule-matcher-context-types/rule-matcher-context-types.module.code.ts"
import { planStockDestinationsForStack } from "akasha/temper/temper-items-rules-core/stock-destination-planner/stock-destination-planner.module.code.ts"
import type { StockDestinationContext } from "akasha/temper/temper-items-rules-core/stock-destination-types/stock-destination-types.module.code.ts"
import {
  buildUseDestinationContext,
  inventoryItemUseKey,
} from "akasha/temper/temper-items-rules-core/use-destination-context-builder/use-destination-context-builder.module.code.ts"
import { planUseDestinationsForStack } from "akasha/temper/temper-items-rules-core/use-destination-resolver/use-destination-resolver.module.code.ts"
import {
  type CharacterId,
  characterId,
} from "akasha/temper/temper-items-rules-core/use-destination-types/use-destination-types.module.code.ts"

export function fillUseAllocationsInPlace(
  rules: readonly CompiledOrderedRule[],
  itemRules: readonly ItemRule[],
  affectedItemsMap: Map<string, readonly AffectedItem[]>,
  context: RuleMatcherContext | undefined
): undefined {
  if (context === undefined) return
  const ruleContext: RuleMatcherContext = context
  const ctx = buildUseDestinationContext(ruleContext)
  const claims = new Map<CharacterId, Set<string>>()

  let stockCtx: StockDestinationContext | undefined
  function ensureStockCtx(): StockDestinationContext {
    if (stockCtx !== undefined) return stockCtx
    const captured = ruleContext
    const readOne = (itemId: number, charId: CharacterId): number => {
      const charStock = captured.consumableStock.get(itemId)
      if (charStock === undefined) return 0
      return charStock.get(charId) ?? 0
    }
    stockCtx = {
      characterPriority: captured.characterPriority.map((id) => characterId(id)),
      getStockOnChar: readOne,
      getStockOnCharForGroup: (itemIds, charId) => {
        let sum = 0
        for (const id of itemIds) sum += readOne(id, charId)
        return sum
      },
    }
    return stockCtx
  }

  function processRule(
    ruleId: string,
    action: ItemAction,
    destination: MoveToDestination | undefined,
    rule?: CompiledOrderedRule | ItemRule
  ): undefined {
    const entries = affectedItemsMap.get(ruleId)
    if (entries === undefined) return
    const isStockByPriority = action === "stock" && destination === "character:by-priority"
    const stockGroupKey = `stock:rule:${ruleId}`
    const stockItemIds = new Set<number>()
    if (isStockByPriority) {
      for (const entry of entries) stockItemIds.add(entry.item.itemId)
    }
    const stockAllocatedPerChar = new Map<CharacterId, number>()
    for (const entry of entries) {
      if (entry.useAllocation !== undefined) continue
      if (isStockByPriority) {
        const targetQuantity =
          rule !== undefined && "stockQuantity" in rule && rule.stockQuantity !== undefined
            ? rule.stockQuantity
            : rule !== undefined && "categoryId" in rule
              ? rule.targetQuantity
              : undefined
        if (targetQuantity === undefined || targetQuantity <= 0) continue
        const stackCount = entry.quantity ?? entry.item.stackCount
        const conditions = rule !== undefined && "categoryId" in rule ? rule : undefined
        const predicate = composeCharEligibilityPredicate(conditions, {
          getCharacterSkillLineRanks: ruleContext.getCharacterSkillLineRanks,
          getCharacterCurseState: ruleContext.getCharacterCurseState,
          getCharacterCanLevelMorphs: ruleContext.getCharacterCanLevelMorphs,
        })
        const allocation = planStockDestinationsForStack(
          stockGroupKey,
          stockItemIds,
          stackCount,
          targetQuantity,
          ensureStockCtx(),
          claims,
          predicate,
          stockAllocatedPerChar
        )
        entry.useAllocation = allocation
        continue
      }
      const itemKey = inventoryItemUseKey(entry.item, action, destination, ruleContext)
      if (itemKey === undefined) continue
      const stackCount = entry.quantity ?? entry.item.stackCount
      const allocation = planUseDestinationsForStack(itemKey, stackCount, ctx, claims)
      entry.useAllocation = allocation
    }
  }

  for (const rule of rules) {
    if (rule.active === false) continue
    if (rule.action === "nothing" || rule.action === "lock" || rule.action === "unlock") continue
    if (rule.id === undefined) continue
    const ruleDestination =
      rule.destination === undefined ? undefined : narrowDestination(rule.destination)
    processRule(rule.id, rule.action, ruleDestination, rule)
  }
  for (const rule of itemRules) {
    if (rule.active === false) continue
    if (rule.action === "nothing" || rule.action === "lock" || rule.action === "unlock") continue
    processRule(rule.id, rule.action, rule.destination, rule)
  }
}
