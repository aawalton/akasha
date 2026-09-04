import type { InventoryDatabase } from "@akasha/temper-items-core/inventory-types"
import { classifyLocation } from "@akasha/temper-items-core/location-classify"
import { narrowDestination } from "@akasha/temper-items-rules-core/inventory-destination-parse"
import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type { AffectedItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import type {
  ItemAction,
  ItemRule,
  MoveToDestination,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import type { RuleMatcherContext } from "@akasha/temper-items-rules-core/rule-matcher-context-types"
import type { CharacterId } from "@akasha/temper-items-rules-core/use-destination-types"
import { resolveItemRoute } from "@akasha/temper-items-rules-routing-core/inventory-management-plan-route"
import type { RouteStep } from "@akasha/temper-items-rules-routing-core/inventory-management-plan-types"
import {
  buildExistingStorageItems,
  isItemStackable,
  mergeStackableEntries,
} from "../inventory-management-plan-capacity/inventory-management-plan-capacity.module.code.ts"
import {
  processChainRule,
  threadResidueToNextRule,
} from "../inventory-management-plan-chain/inventory-management-plan-chain.module.code.ts"
import type {
  CharSimState,
  SimStep,
} from "../inventory-management-plan-simulation/inventory-management-plan-simulation.module.code.ts"
import { fillUseAllocationsInPlace } from "../inventory-management-plan-use-destinations/inventory-management-plan-use-destinations.module.code.ts"

export function collectSimSteps(
  rules: readonly CompiledOrderedRule[],
  itemRules: readonly ItemRule[],
  affectedItemsMap: Map<string, readonly AffectedItem[]>,
  inventory: InventoryDatabase | null,
  context?: RuleMatcherContext
): Map<string, CharSimState> {
  const charStates = new Map<string, CharSimState>()
  const storageSlotClaims = new Map<string, Set<number>>()
  const existingStorageItems = buildExistingStorageItems(inventory)
  fillUseAllocationsInPlace(rules, itemRules, affectedItemsMap, context)

  function getOrCreateState(charId: string): CharSimState {
    let state = charStates.get(charId)
    if (!state) {
      state = { characterId: charId, pending: [], isSource: false, depositKeys: new Set() }
      charStates.set(charId, state)
    }
    return state
  }

  function needsStorageSlot(
    itemId: number,
    stackable: boolean,
    storageKey: string | undefined
  ): boolean {
    if (!stackable || storageKey === undefined) return true
    const existing = existingStorageItems.get(storageKey)
    if (existing?.has(itemId)) return false
    const claims = storageSlotClaims.get(storageKey)
    if (claims?.has(itemId)) return false
    let claimSet = storageSlotClaims.get(storageKey)
    if (!claimSet) {
      claimSet = new Set()
      storageSlotClaims.set(storageKey, claimSet)
    }
    claimSet.add(itemId)
    return true
  }

  function applyRouteStepsToCharStates(
    routeSteps: readonly RouteStep[],
    entry: AffectedItem,
    sourceSlotCount: number
  ) {
    if (routeSteps.length === 0) return
    const stackable = isItemStackable(entry.item)
    const isCraftBag = entry.locationKey === "CraftBag"
    let i = 0
    while (i < routeSteps.length) {
      const firstStep = routeSteps[i]
      if (firstStep === undefined) break
      const charId = firstStep.characterId
      const charStart = i
      while (i < routeSteps.length && routeSteps[i]?.characterId === charId) i++
      let tail: SimStep | null = null
      for (let j = i - 1; j >= charStart; j--) {
        const rs = routeSteps[j]
        if (rs === undefined) continue
        const isSourceChar = j === charStart && charStart === 0
        let backpackSlots: number
        if (isCraftBag && rs.operation === "act") backpackSlots = 0
        else if (isSourceChar && rs.operation !== "retrieve") backpackSlots = sourceSlotCount
        else if (rs.operation === "retrieve") backpackSlots = 1
        else backpackSlots = 1
        const occupiesStorage =
          (rs.operation === "deposit" || rs.operation === "act") && rs.storageKey !== undefined
            ? needsStorageSlot(rs.itemId, stackable, rs.storageKey)
            : false
        const step: SimStep = {
          venue: rs.venue,
          venueDetail: rs.venueDetail,
          storageKey: rs.storageKey,
          operation: rs.operation,
          planItem: rs.item,
          backpackSlots,
          itemId: rs.itemId,
          stackable,
          occupiesStorageSlot: occupiesStorage,
          next: tail,
        }
        tail = step
      }
      if (tail) {
        const state = getOrCreateState(charId)
        state.pending = [...state.pending, tail]
        if (tail.operation === "deposit" || tail.operation === "retrieve") state.isSource = true
        if (tail.operation === "deposit" && tail.storageKey !== undefined) {
          state.depositKeys.add(`${tail.storageKey}:${tail.itemId}`)
        }
      }
    }
  }

  function addItemRouteSteps(
    entry: AffectedItem,
    action: ItemAction,
    destination: MoveToDestination | undefined,
    sourceSlotCount: number,
    chainTierDirect = false
  ) {
    const allocation = entry.useAllocation
    if (allocation !== undefined) {
      if (allocation.length === 0) return
      for (const [idx, charId] of allocation.entries()) {
        const subSlotCount = idx === 0 ? sourceSlotCount : 0
        const routeSteps = resolveItemRoute(entry, action, destination, inventory, context, {
          useTargetCharIdOverride: charId,
          stackCountOverride: 1,
          chainTierDirect,
        })
        applyRouteStepsToCharStates(routeSteps, entry, subSlotCount)
      }
      return
    }
    const routeSteps = resolveItemRoute(entry, action, destination, inventory, context, {
      chainTierDirect,
    })
    applyRouteStepsToCharStates(routeSteps, entry, sourceSlotCount)
  }

  const chainClaims = new Map<CharacterId, Set<string>>()
  const workingAffectedItemsMap = new Map<string, AffectedItem[]>()
  for (const [ruleId, items] of affectedItemsMap.entries()) {
    workingAffectedItemsMap.set(ruleId, [...items])
  }
  const chainResidueRecipients = new Set<string>()

  for (const [ruleIdx, rule] of rules.entries()) {
    if (rule.active === false) continue
    if (rule.action === "nothing" || rule.action === "lock" || rule.action === "unlock") continue
    if (rule.id === undefined) continue
    const affected = workingAffectedItemsMap.get(rule.id)
    if (!affected) continue
    const ruleDestination =
      rule.destination === undefined ? undefined : narrowDestination(rule.destination)
    const chainHasByPriorityTier =
      rule.destinationChain?.some((t) => t.destination === "character:by-priority") ?? false
    const dropCharBackpackForStock =
      rule.action === "stock" &&
      rule.stockScope === "any-character" &&
      rule.destination !== "character:by-priority" &&
      !chainHasByPriorityTier
    const actionable = affected.filter(
      (e) =>
        !e.alreadyAtDestination &&
        !(dropCharBackpackForStock && classifyLocation(e.locationKey) === "character")
    )
    const merged = mergeStackableEntries(actionable)
    if (rule.destinationChain !== undefined && rule.destinationChain.length > 0 && context) {
      processChainRule(
        {
          rule,
          ruleIdx,
          rules,
          merged,
          context,
          chainClaims,
          workingAffectedItemsMap,
          chainResidueRecipients,
        },
        (entry, destination, sourceSlotCount, chainTierDirect) =>
          addItemRouteSteps(entry, rule.action, destination, sourceSlotCount, chainTierDirect)
      )
      continue
    }
    const legacyStockDirect =
      rule.action === "stock" &&
      rule.stockScope === "any-character" &&
      rule.destination !== "character:by-priority"
    const residueRecipient = chainResidueRecipients.has(rule.id)
    for (const { entry, sourceSlotCount } of merged) {
      addItemRouteSteps(
        entry,
        rule.action,
        ruleDestination,
        sourceSlotCount,
        legacyStockDirect || residueRecipient
      )
    }
    if (
      rule.action === "stock" &&
      rule.destination === "character:by-priority" &&
      rule.destinationChain === undefined
    ) {
      for (const entry of affected) {
        if (entry.alreadyAtDestination) continue
        if (entry.useAllocation === undefined) continue
        const total = entry.quantity ?? entry.item.stackCount
        const surplus = total - entry.useAllocation.length
        const recipient = threadResidueToNextRule(
          rules,
          ruleIdx,
          surplus,
          entry,
          workingAffectedItemsMap
        )
        if (recipient !== undefined) chainResidueRecipients.add(recipient)
      }
    }
  }

  for (const [ruleIdx, rule] of itemRules.entries()) {
    if (rule.active === false) continue
    if (rule.action === "nothing" || rule.action === "lock" || rule.action === "unlock") continue
    const affected = workingAffectedItemsMap.get(rule.id)
    if (!affected) continue
    const chainHasByPriorityTier =
      rule.destinationChain?.some((t) => t.destination === "character:by-priority") ?? false
    const dropCharBackpackForStockItem =
      rule.action === "stock" &&
      rule.stockScope === "any-character" &&
      rule.destination !== "character:by-priority" &&
      !chainHasByPriorityTier
    const actionable = affected.filter(
      (e) =>
        !e.alreadyAtDestination &&
        !(dropCharBackpackForStockItem && classifyLocation(e.locationKey) === "character")
    )
    const merged = mergeStackableEntries(actionable)
    if (rule.destinationChain !== undefined && rule.destinationChain.length > 0 && context) {
      processChainRule(
        {
          rule,
          ruleIdx,
          rules: itemRules,
          merged,
          context,
          chainClaims,
          workingAffectedItemsMap,
          chainResidueRecipients,
        },
        (entry, destination, sourceSlotCount, chainTierDirect) =>
          addItemRouteSteps(entry, rule.action, destination, sourceSlotCount, chainTierDirect)
      )
      continue
    }
    const legacyStockDirectItem =
      rule.action === "stock" &&
      rule.stockScope === "any-character" &&
      rule.destination !== "character:by-priority"
    const residueRecipient = chainResidueRecipients.has(rule.id)
    for (const { entry, sourceSlotCount } of merged) {
      addItemRouteSteps(
        entry,
        rule.action,
        rule.destination,
        sourceSlotCount,
        legacyStockDirectItem || residueRecipient
      )
    }
  }

  return charStates
}
