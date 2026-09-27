import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import type { ItemAction } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { ITEM_ACTION_PAGES } from "akasha/temper/player/progress/temper-item-action/modules/item-action-pages/item-action-pages.module.code.ts"

function getActionVerbLabel(action: ItemAction): string {
  const page = ITEM_ACTION_PAGES.find((one) => one.slug === action)
  return page === undefined ? action : page.title
}

interface FormatActionLabelArgs {
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
      return destinationLabel != null
        ? `${getActionVerbLabel(action)} on ${destinationLabel}`
        : getActionVerbLabel(action)
    case "move-to": {
      if (destinationLabel == null) return getActionVerbLabel(action)
      if (atDestination === true) return `Keep on ${destinationLabel}`
      const moved = quantity !== undefined ? ` ×${quantity}` : ""
      return `Move to ${destinationLabel}${moved}`
    }
    case "character-equip":
    case "companion-equip":
      return destinationLabel != null
        ? `${getActionVerbLabel("character-equip")} on ${destinationLabel}`
        : getActionVerbLabel(action)
    case "stock": {
      const held = targetQuantity !== undefined ? ` ×${targetQuantity}` : ""
      return `${getActionVerbLabel(action)}${held}`
    }
    case "mail":
      return destinationLabel != null
        ? `${getActionVerbLabel(action)} to ${destinationLabel}`
        : getActionVerbLabel(action)
    default:
      return assertNever(action)
  }
}
