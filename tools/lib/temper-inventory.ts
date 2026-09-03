import { USER_ID } from "@akasha/supabase-auth/user-id"
import type {
  AutomationSettings,
  CharacterAutomationToggles,
  CompanionAutomationToggles,
} from "@akasha/temper-inventory-automation/automation-toggles"
import type { BuyRule } from "@akasha/temper-items-rules-core/buy-rule-types"
import type {
  CategoryRule,
  InventoryRuleSettings,
  ItemRule,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import {
  readAutomationSettings,
  readInventoryRuleSettings,
  writeAutomationSettings,
  writeInventoryRuleSettings,
} from "./temper-inventory/settings-row.ts"

export type {
  AutomationSettings,
  BuyRule,
  CategoryRule,
  CharacterAutomationToggles,
  CompanionAutomationToggles,
  InventoryRuleSettings,
  ItemRule,
}

export type Toggles = CharacterAutomationToggles | CompanionAutomationToggles

export interface Settings {
  readonly read: () => Promise<InventoryRuleSettings>
  readonly write: (next: InventoryRuleSettings) => Promise<undefined>
  readonly readAutomation: () => Promise<AutomationSettings>
  readonly writeAutomation: (next: AutomationSettings) => Promise<undefined>
}

export async function inventorySettings(): Promise<Settings> {
  return {
    read: () => readInventoryRuleSettings(USER_ID),
    write: (next) => writeInventoryRuleSettings(USER_ID, next),
    readAutomation: () => readAutomationSettings(USER_ID),
    writeAutomation: (next) => writeAutomationSettings(USER_ID, next),
  }
}

export function assertWriteAllowed(
  rule: Pick<CategoryRule, "id" | "locked">,
  force: boolean
): undefined {
  if (rule.locked === true && force === false) {
    throw new Error(
      `Rule ${rule.id} is locked. Pass --force to override the lock guard, or unlock the rule first.`
    )
  }
  return undefined
}

export const ITEM_RULE_COLUMNS = [
  "id",
  "itemId",
  "itemName",
  "action",
  "active",
  "locked",
  "stockQuantity",
  "destination",
] as const

export const BUY_RULE_COLUMNS = [
  "id",
  "itemId",
  "itemName",
  "targetQuantity",
  "source",
  "active",
  "locked",
] as const

export const RULE_SHOW_COLUMNS = [
  "id",
  "categoryId",
  "action",
  "active",
  "locked",
  "destination",
] as const

export function itemRuleRow(rule: ItemRule): Record<string, unknown> {
  return {
    id: rule.id,
    itemId: rule.itemId,
    itemName: rule.itemName,
    action: rule.action,
    active: rule.active,
    locked: rule.locked,
    stockQuantity: rule.stockQuantity,
    destination: rule.destination,
  }
}
