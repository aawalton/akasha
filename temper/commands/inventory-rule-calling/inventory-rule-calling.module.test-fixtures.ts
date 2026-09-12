import type { Writing } from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import type { InventoryRuleSettings } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"

export const HELD = "a-rule-the-settings-hold"

export const LOCKED_ID = "a-rule-the-settings-lock"

export const SETTINGS: InventoryRuleSettings = {
  version: 2,
  rules: [
    { id: HELD, categoryId: "all", action: "nothing", active: true, locked: false },
    { id: LOCKED_ID, categoryId: "all", action: "nothing", active: true, locked: true },
  ],
}

export function writingThat(write: (settings: InventoryRuleSettings) => Promise<unknown>): Writing {
  return { read: () => Promise.resolve(SETTINGS), write }
}

export const WROTE = writingThat(() => Promise.resolve())
