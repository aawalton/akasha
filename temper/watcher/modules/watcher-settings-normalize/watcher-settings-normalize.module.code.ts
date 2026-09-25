import { asRecord } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import { ALL_DESTRUCTIVE_ACTIONS } from "akasha/temper/items/core/modules/inventory-safety-types/inventory-safety-types.module.code.ts"

type ActionReports = "none" | "minimal" | "verbose"

type PerfTracing = "none" | "minimal"

type BankProfiler = "none" | "script"

interface LoggingSettings {
  actionReports: ActionReports
  perfTracing: PerfTracing
  bankProfiler?: BankProfiler
}

interface SafetySettings {
  confirmActions: readonly string[]
  openCooldownProtection: boolean
}

const ACTION_REPORTS: readonly ActionReports[] = ["none", "minimal", "verbose"]

const VALID_DESTRUCTIVE_ACTIONS = new Set<string>(ALL_DESTRUCTIVE_ACTIONS)

export function toLoggingSettings(value: unknown): LoggingSettings {
  const held = asRecord(value)
  if (!held) return { actionReports: "verbose", perfTracing: "none" }
  const named = ACTION_REPORTS.find((one) => one === held.actionReports)
  const settings: LoggingSettings = {
    actionReports: named ?? "verbose",
    perfTracing: held.perfTracing === "minimal" ? "minimal" : "none",
  }
  if (held.bankProfiler === "script") settings.bankProfiler = "script"
  return settings
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
