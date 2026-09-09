import { USER_ID } from "@akasha/supabase-auth/user-id"
import type { InventoryRuleSettings } from "@akasha/temper-items-rules-core/inventory-rule-types"
import type {
  AutomationSettings,
  CharacterAutomationToggles,
  CompanionAutomationToggles,
} from "akasha/temper/inventory-automation/automation-toggles/automation-toggles.module.code.ts"
import {
  readAutomationSettings,
  readInventoryRuleSettings,
  writeAutomationSettings,
  writeInventoryRuleSettings,
} from "../inventory-settings-access/inventory-settings-access.module.code.ts"

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
