import type { InventoryDatabase } from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import { classifyLocation } from "akasha/temper/items/core/modules/location-classify/location-classify.module.code.ts"
import {
  chainHouses,
  furnishingLimitTypeOf,
  houseDestinationOf,
  houseLocationKeyFor,
  houseRoomFor,
  houseTarget,
} from "akasha/temper/items/rules/core/modules/house-destination/house-destination.module.code.ts"
import { narrowDestination } from "akasha/temper/items/rules/core/modules/inventory-destination-parse/inventory-destination-parse.module.code.ts"
import type { CompiledOrderedRule } from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type { AffectedItem } from "akasha/temper/items/rules/core/modules/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import type {
  ItemRule,
  MoveToDestination,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"

const FURNITURE_VAULT_KEY = "FurnitureVault"

type PlannedRule = CompiledOrderedRule | ItemRule

export interface HouseTally {
  readonly collectibleId: number
  stacks: number
  items: number
}

export interface HousePlacement {
  readonly houseRuleIds: ReadonlySet<string>
  readonly housesToScan: readonly number[]
  readonly placed: readonly HouseTally[]
  readonly vaultSlotsFreed: number
}

interface Candidate {
  readonly rule: PlannedRule
  readonly ruleIdx: number
  readonly at: number
  readonly item: AffectedItem
  readonly units: number
}

export function isHouseRule(rule: PlannedRule): boolean {
  if (rule.active === false || rule.action !== "move-to") return false
  return chainHouses(rule.destinationChain).length > 0
}

function fallbackOf(rule: PlannedRule): MoveToDestination | undefined {
  for (const tier of rule.destinationChain ?? []) {
    if (houseTarget(tier.destination) === undefined) return tier.destination
  }
  return rule.destination === undefined ? undefined : narrowDestination(rule.destination)
}

function candidatesOf(
  rules: readonly PlannedRule[],
  map: ReadonlyMap<string, readonly AffectedItem[]>
): Candidate[] {
  const candidates: Candidate[] = []
  for (const [ruleIdx, rule] of rules.entries()) {
    if (rule.id === undefined || !isHouseRule(rule)) continue
    for (const [at, item] of (map.get(rule.id) ?? []).entries()) {
      if (classifyLocation(item.locationKey) === "house") continue
      candidates.push({ rule, ruleIdx, at, item, units: item.quantity ?? item.item.stackCount })
    }
  }
  return candidates.sort(
    (one, two) =>
      one.units - two.units ||
      one.ruleIdx - two.ruleIdx ||
      one.item.item.itemName.localeCompare(two.item.item.itemName)
  )
}

export function placeInHouses(
  rules: readonly PlannedRule[],
  map: Map<string, AffectedItem[]>,
  inventory: InventoryDatabase | null
): HousePlacement {
  const rooms = new Map<string, number | undefined>()
  const housesToScan: number[] = []
  const tallies = new Map<number, HouseTally>()
  let vaultSlotsFreed = 0

  function roomOf(collectibleId: number, limitType: number): number | undefined {
    const key = `${collectibleId}:${limitType}`
    if (!rooms.has(key)) {
      const locations = inventory?.locations ?? {}
      const locationKey = houseLocationKeyFor(collectibleId, locations)
      const location = locationKey === undefined ? undefined : locations[locationKey]
      rooms.set(key, houseRoomFor(location, limitType))
    }
    return rooms.get(key)
  }

  function houseFor(candidate: Candidate): number | undefined {
    const limitType = furnishingLimitTypeOf(candidate.item.item)
    for (const collectibleId of chainHouses(candidate.rule.destinationChain)) {
      const room = roomOf(collectibleId, limitType)
      if (room === undefined) {
        if (!housesToScan.includes(collectibleId)) housesToScan.push(collectibleId)
        continue
      }
      if (room < candidate.units) continue
      rooms.set(`${collectibleId}:${limitType}`, room - candidate.units)
      return collectibleId
    }
    return undefined
  }

  const chosen = new Map<string, AffectedItem[]>()
  for (const candidate of candidatesOf(rules, map)) {
    const ruleId = candidate.rule.id ?? ""
    const row = chosen.get(ruleId) ?? [...(map.get(ruleId) ?? [])]
    chosen.set(ruleId, row)
    const collectibleId = houseFor(candidate)
    if (collectibleId === undefined) {
      const fallback = fallbackOf(candidate.rule)
      const stays =
        fallback === "furniture-vault"
          ? candidate.item.locationKey === FURNITURE_VAULT_KEY
          : candidate.item.alreadyAtDestination
      row[candidate.at] = { ...candidate.item, destination: fallback, alreadyAtDestination: stays }
      continue
    }
    row[candidate.at] = {
      ...candidate.item,
      destination: houseDestinationOf(collectibleId),
      alreadyAtDestination: false,
    }
    const tally = tallies.get(collectibleId) ?? { collectibleId, stacks: 0, items: 0 }
    tally.stacks += 1
    tally.items += candidate.units
    tallies.set(collectibleId, tally)
    if (candidate.item.locationKey === FURNITURE_VAULT_KEY) vaultSlotsFreed += 1
  }
  for (const [ruleId, row] of chosen) map.set(ruleId, row)

  const houseRuleIds = new Set<string>()
  for (const rule of rules) {
    if (rule.id !== undefined && isHouseRule(rule)) houseRuleIds.add(rule.id)
  }
  return { houseRuleIds, housesToScan, placed: [...tallies.values()], vaultSlotsFreed }
}
