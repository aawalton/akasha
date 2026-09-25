import { alan } from "akasha/person/pages/alan/alan.person.ts"
import {
  readAutomationSettings,
  readInventoryRuleSettings,
  writeAutomationSettings,
  writeInventoryRuleSettings,
} from "akasha/temper/command/modules/inventory-settings-access/inventory-settings-access.module.code.ts"
import type {
  AutomationSettings,
  CharacterAutomationToggles,
  CompanionAutomationToggles,
} from "akasha/temper/items/inventory-automation/modules/automation-toggles/automation-toggles.module.code.ts"
import type { InventoryRuleSettings } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

export type Toggles = CharacterAutomationToggles | CompanionAutomationToggles

export interface Settings {
  readonly read: () => Promise<InventoryRuleSettings>
  readonly write: (next: InventoryRuleSettings) => Promise<undefined>
  readonly readAutomation: () => Promise<AutomationSettings>
  readonly writeAutomation: (next: AutomationSettings) => Promise<undefined>
}

export async function inventorySettings(): Promise<Settings> {
  return {
    read: () => readInventoryRuleSettings(alan.id),
    write: (next) => writeInventoryRuleSettings(alan.id, next),
    readAutomation: () => readAutomationSettings(alan.id),
    writeAutomation: (next) => writeAutomationSettings(alan.id, next),
  }
}
