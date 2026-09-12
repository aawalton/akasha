import {
  ITEM_ACTION_VALUES,
  type ItemAction,
  type MoveToDestination,
} from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"

const ITEM_ACTIONS: ReadonlySet<ItemAction> = new Set<ItemAction>(ITEM_ACTION_VALUES)

function isItemAction(value: string): value is ItemAction {
  for (const action of ITEM_ACTIONS) {
    if (action === value) return true
  }
  return false
}

export function parseItemAction(raw: string | undefined): ItemAction | undefined {
  if (raw === undefined) return undefined
  return isItemAction(raw) ? raw : undefined
}

const CLOSED_DESTINATIONS: readonly MoveToDestination[] = [
  "bank",
  "craft-bag",
  "furniture-vault",
  "house-storage",
  "guild-bank",
]

const NAMED_DESTINATIONS = [
  "house-storage:",
  "character:",
  "character-worn:",
  "companion-worn:",
  "guild-bank:",
  "mail:",
] as const

export function destinationFormsSaid(): string {
  return [...CLOSED_DESTINATIONS, ...NAMED_DESTINATIONS.map((one) => `${one}<name>`)].join(", ")
}

export function narrowDestination(value: string): MoveToDestination | undefined {
  if (value.length === 0) return undefined
  for (const closed of CLOSED_DESTINATIONS) {
    if (closed === value) return closed
  }
  for (const named of NAMED_DESTINATIONS) {
    if (value.startsWith(named)) return `${named}${value.slice(named.length)}`
  }
  return undefined
}
