import {
  ITEM_ACTION_VALUES,
  type ItemAction,
  type MoveToDestination,
} from "../inventory-rule-types/inventory-rule-types.module.code.ts"

const ITEM_ACTIONS: ReadonlySet<ItemAction> = new Set<ItemAction>(ITEM_ACTION_VALUES)

export function isItemAction(value: string): value is ItemAction {
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

export function narrowDestination(value: string): MoveToDestination | undefined {
  if (value.length === 0) return undefined
  for (const closed of CLOSED_DESTINATIONS) {
    if (closed === value) return closed
  }
  if (value.startsWith("house-storage:")) {
    return `house-storage:${value.slice("house-storage:".length)}`
  }
  if (value.startsWith("character:")) return `character:${value.slice("character:".length)}`
  if (value.startsWith("character-worn:")) {
    return `character-worn:${value.slice("character-worn:".length)}`
  }
  if (value.startsWith("companion-worn:")) {
    return `companion-worn:${value.slice("companion-worn:".length)}`
  }
  if (value.startsWith("guild-bank:")) return `guild-bank:${value.slice("guild-bank:".length)}`
  if (value.startsWith("mail:")) return `mail:${value.slice("mail:".length)}`
  return undefined
}
