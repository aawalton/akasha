import type { ItemAction } from "@akasha/temper-items-rules-core/inventory-rule-types"

export type ActionVariant = "elevation-muted" | "green" | "accent" | "orange"

type ActionOption = {
  value: ItemAction
  label: string
  variant: ActionVariant
}

export const NOTHING_ACTION: ActionOption = {
  value: "nothing",
  label: "Do Nothing",
  variant: "elevation-muted",
}

export const ACTION_OPTIONS: ActionOption[] = [
  { value: "lock", label: "Lock", variant: "elevation-muted" },
  { value: "unlock", label: "Unlock", variant: "elevation-muted" },
  { value: "deconstruct", label: "Deconstruct", variant: "orange" },
  { value: "refine", label: "Refine", variant: "orange" },
  { value: "destroy", label: "Destroy", variant: "orange" },
  { value: "research", label: "Research", variant: "green" },
  { value: "fence-launder", label: "Launder at Fence", variant: "accent" },
  { value: "character-equip", label: "Character Equip", variant: "green" },
  { value: "companion-equip", label: "Companion Equip", variant: "green" },
  { value: "mail", label: "Mail", variant: "green" },
  { value: "move-to", label: "Move To", variant: "green" },
  { value: "stock", label: "Stock", variant: "green" },
  { value: "sell", label: "Sell To", variant: "accent" },
  { value: "use", label: "Use", variant: "green" },
  { value: "open", label: "Open", variant: "green" },
]

export const SELL_ACTIONS: ReadonlySet<ItemAction> = new Set(["sell", "fence-sell", "list"])

export const SELL_DESTINATION_OPTIONS: { value: ItemAction; label: string }[] = [
  { value: "sell", label: "Merchant" },
  { value: "fence-sell", label: "Fence" },
  { value: "list", label: "Guild Store" },
]

const ACTION_LABEL_MAP = new Map<string, string>([
  ...ACTION_OPTIONS.map((o) => [o.value, o.label] as const),
  [NOTHING_ACTION.value, NOTHING_ACTION.label],
  ...SELL_DESTINATION_OPTIONS.map((o) => [o.value, o.label] as const),
])

export function getActionLabel(action: string): string {
  return ACTION_LABEL_MAP.get(action) ?? action
}
