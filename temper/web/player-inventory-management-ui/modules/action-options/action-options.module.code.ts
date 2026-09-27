import {
  heldKeyedTitles,
  type KeyedTitles,
  titleOf,
} from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import type { ItemAction } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { fence } from "akasha/temper/items/rules/routing/core/temper-venue/pages/fence.temper-venue.ts"
import { guildStore } from "akasha/temper/items/rules/routing/core/temper-venue/pages/guild-store.temper-venue.ts"
import { vendor } from "akasha/temper/items/rules/routing/core/temper-venue/pages/vendor.temper-venue.ts"
import { temperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.ts"

export type ActionVariant = "elevation-muted" | "green" | "accent" | "orange"

type ActionOption = {
  value: ItemAction
  variant: ActionVariant
}

export const NOTHING_ACTION: ActionOption = {
  value: "nothing",
  variant: "elevation-muted",
}

export const ACTION_OPTIONS: ActionOption[] = [
  { value: "lock", variant: "elevation-muted" },
  { value: "unlock", variant: "elevation-muted" },
  { value: "deconstruct", variant: "orange" },
  { value: "refine", variant: "orange" },
  { value: "destroy", variant: "orange" },
  { value: "research", variant: "green" },
  { value: "fence-launder", variant: "accent" },
  { value: "character-equip", variant: "green" },
  { value: "companion-equip", variant: "green" },
  { value: "mail", variant: "green" },
  { value: "move-to", variant: "green" },
  { value: "stock", variant: "green" },
  { value: "sell", variant: "accent" },
  { value: "use", variant: "green" },
  { value: "open", variant: "green" },
]

export const SELL_ACTIONS: ReadonlySet<ItemAction> = new Set(["sell", "fence-sell", "list"])

type SellDestinationOption = {
  value: ItemAction
  venue: string
}

export const SELL_DESTINATION_OPTIONS: readonly SellDestinationOption[] = [
  { value: "sell", venue: vendor.key },
  { value: "fence-sell", venue: fence.key },
  { value: "list", venue: guildStore.key },
]

export function sellDestinationLabelIn(
  venues: KeyedTitles | null,
  option: SellDestinationOption
): string {
  return venues === null ? option.venue : titleOf(venues, option.venue)
}

export function actionLabelIn(titles: KeyedTitles | null, action: string): string {
  return titles === null ? action : titleOf(titles, action)
}

export function getActionLabel(action: string): string {
  return actionLabelIn(heldKeyedTitles(temperItemAction.slug), action)
}
