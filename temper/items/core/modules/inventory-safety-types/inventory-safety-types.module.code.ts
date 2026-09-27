import { temperBuyAction } from "akasha/temper/player/progress/temper-buy-action/temper-buy-action.page-type.ts"
import { temperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.ts"

export type DestructiveAction = "deconstruct" | "refine" | "sell" | "research" | "destroy" | "buy"

export const DESTRUCTIVE_ACTIONS: { value: DestructiveAction; titledBy: string }[] = [
  { value: "deconstruct", titledBy: temperItemAction.slug },
  { value: "refine", titledBy: temperItemAction.slug },
  { value: "sell", titledBy: temperItemAction.slug },
  { value: "research", titledBy: temperItemAction.slug },
  { value: "destroy", titledBy: temperItemAction.slug },
  { value: "buy", titledBy: temperBuyAction.slug },
]

export const ALL_DESTRUCTIVE_ACTIONS: DestructiveAction[] = DESTRUCTIVE_ACTIONS.map((a) => a.value)

export interface InventorySafetySettings {
  confirmActions: readonly DestructiveAction[]
  openCooldownProtection: boolean
}
