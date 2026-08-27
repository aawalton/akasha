
import * as settingsRow from "./temper-inventory/settings-row.ts"
import { USER_ID } from "./user-id.ts"

export type Rule = Readonly<Record<string, unknown>> & {
  readonly id: string
  readonly locked?: boolean
}

export type RuleSettings = Readonly<Record<string, unknown>> & {
  readonly rules: readonly Rule[]
  readonly itemRules?: readonly Rule[]
  readonly buyRules?: readonly Rule[]
}

export type Toggles = Readonly<Record<string, unknown>>

export type AutomationSettings = Readonly<Record<string, unknown>> & {
  readonly global?: {
    readonly characters?: Toggles
    readonly companions?: Toggles
  }
  readonly characters: Readonly<Record<string, Toggles>>
  readonly companions: Readonly<Record<string, Toggles>>
}

interface SettingsRowModule {
  readonly readInventoryRuleSettings: (accountUserId: string) => Promise<RuleSettings>
  readonly writeInventoryRuleSettings: (
    accountUserId: string,
    next: RuleSettings
  ) => Promise<unknown>
  readonly readAutomationSettings: (accountUserId: string) => Promise<AutomationSettings>
  readonly writeAutomationSettings: (
    accountUserId: string,
    next: AutomationSettings
  ) => Promise<unknown>
}

export interface Settings {
  readonly read: () => Promise<RuleSettings>
  readonly write: (next: RuleSettings) => Promise<unknown>
  readonly readAutomation: () => Promise<AutomationSettings>
  readonly writeAutomation: (next: AutomationSettings) => Promise<unknown>
}

export async function inventorySettings(): Promise<Settings> {
  const rows = settingsRow as unknown as SettingsRowModule
  return {
    read: () => rows.readInventoryRuleSettings(USER_ID),
    write: (next) => rows.writeInventoryRuleSettings(USER_ID, next),
    readAutomation: () => rows.readAutomationSettings(USER_ID),
    writeAutomation: (next) => rows.writeAutomationSettings(USER_ID, next),
  }
}

export function assertWriteAllowed(rule: Rule, force: boolean): undefined {
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

export function itemRuleRow(rule: Rule): Record<string, unknown> {
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
