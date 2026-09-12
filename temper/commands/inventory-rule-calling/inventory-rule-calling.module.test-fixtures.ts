import type { Writing } from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import type { InventoryRuleSettings } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"

export const HELD = "a-rule-the-settings-hold"

export const LOCKED_ID = "a-rule-the-settings-lock"

export const ITEM_HELD = "an-item-rule-the-settings-hold"

export const ITEM_LOCKED = "an-item-rule-the-settings-lock"

export const SETTINGS: InventoryRuleSettings = {
  version: 2,
  rules: [
    { id: HELD, categoryId: "all", action: "nothing", active: true, locked: false },
    { id: LOCKED_ID, categoryId: "all", action: "nothing", active: true, locked: true },
  ],
  itemRules: [
    {
      id: ITEM_HELD,
      itemId: 30150,
      itemName: "a thing the settings know",
      action: "nothing",
      active: true,
      locked: false,
    },
    {
      id: ITEM_LOCKED,
      itemId: 30151,
      itemName: "a thing the settings keep",
      action: "nothing",
      active: true,
      locked: true,
    },
  ],
}

export function writingThat(write: (settings: InventoryRuleSettings) => Promise<unknown>): Writing {
  return { read: () => Promise.resolve(SETTINGS), write }
}

export const WROTE = writingThat(() => Promise.resolve())

export const UNREADABLE: Writing = {
  read: () => Promise.reject(new Error("the store would not be read")),
  write: () => Promise.reject(new Error("the store would not be written")),
}
