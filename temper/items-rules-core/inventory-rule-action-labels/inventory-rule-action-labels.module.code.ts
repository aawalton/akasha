import type { ItemAction } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"
import { assertNever } from "akasha/utils/narrow/assert-never/assert-never.module.code.ts"

function getActionVerbLabel(action: ItemAction): string {
  switch (action) {
    case "nothing":
      return "Keep"
    case "lock":
      return "Lock"
    case "unlock":
      return "Unlock"
    case "sell":
      return "Sell"
    case "fence-sell":
      return "Fence"
    case "fence-launder":
      return "Launder"
    case "list":
      return "List"
    case "deconstruct":
      return "Deconstruct"
    case "refine":
      return "Refine"
    case "research":
      return "Research"
    case "use":
      return "Use"
    case "open":
      return "Open"
    case "destroy":
      return "Destroy"
    case "move-to":
      return "Move"
    case "character-equip":
      return "Equip"
    case "companion-equip":
      return "Equip Companion"
    case "stock":
      return "Stock"
    case "mail":
      return "Mail"
    default:
      return assertNever(action)
  }
}

export interface FormatActionLabelArgs {
  action: ItemAction
  destinationLabel?: string
  targetQuantity?: number
  quantity?: number
  atDestination?: boolean
}

export function formatActionLabel(args: FormatActionLabelArgs): string {
  const { action, destinationLabel, targetQuantity, quantity, atDestination } = args
  switch (action) {
    case "nothing":
    case "lock":
    case "unlock":
    case "sell":
    case "fence-sell":
    case "fence-launder":
    case "list":
    case "deconstruct":
    case "refine":
    case "research":
    case "open":
    case "destroy":
      return getActionVerbLabel(action)
    case "use":
      return destinationLabel != null ? `Use on ${destinationLabel}` : "Use"
    case "move-to": {
      if (destinationLabel == null) return "Move"
      if (atDestination === true) return `Keep on ${destinationLabel}`
      const moved = quantity !== undefined ? ` ×${quantity}` : ""
      return `Move to ${destinationLabel}${moved}`
    }
    case "character-equip":
      return destinationLabel != null ? `Equip on ${destinationLabel}` : "Equip"
    case "companion-equip":
      return destinationLabel != null ? `Equip on ${destinationLabel}` : "Equip Companion"
    case "stock": {
      const held = targetQuantity !== undefined ? ` ×${targetQuantity}` : ""
      return `Stock${held}`
    }
    case "mail":
      return destinationLabel != null ? `Mail to ${destinationLabel}` : "Mail"
    default:
      return assertNever(action)
  }
}
