import { ALL_DESTRUCTIVE_ACTIONS } from "@akasha/temper-items-core/inventory-safety-types"
import { asRecord } from "@akasha/utils-narrow/as-record"

export type ActionReports = "none" | "minimal" | "verbose"

export type PerfTracing = "none" | "minimal"

export interface LoggingSettings {
  actionReports: ActionReports
  perfTracing: PerfTracing
}

export interface SafetySettings {
  confirmActions: readonly string[]
  openCooldownProtection: boolean
}

const ACTION_REPORTS: readonly ActionReports[] = ["none", "minimal", "verbose"]

const VALID_DESTRUCTIVE_ACTIONS = new Set<string>(ALL_DESTRUCTIVE_ACTIONS)

export function toLoggingSettings(value: unknown): LoggingSettings {
  const held = asRecord(value)
  if (!held) return { actionReports: "verbose", perfTracing: "none" }
  const named = ACTION_REPORTS.find((one) => one === held.actionReports)
  return {
    actionReports: named ?? "verbose",
    perfTracing: held.perfTracing === "minimal" ? "minimal" : "none",
  }
}

export function toSafetySettings(value: unknown): SafetySettings {
  const defaults: SafetySettings = {
    confirmActions: [...ALL_DESTRUCTIVE_ACTIONS],
    openCooldownProtection: true,
  }
  const held = asRecord(value)
  if (!held) return defaults
  if (!Array.isArray(held.confirmActions)) return defaults
  return {
    confirmActions: held.confirmActions.filter(
      (a): a is string => typeof a === "string" && VALID_DESTRUCTIVE_ACTIONS.has(a)
    ),
    openCooldownProtection: held.openCooldownProtection !== false,
  }
}
