import { asRecord } from "../../../../shared/utils-narrow/src/as-record"
import { ALL_DESTRUCTIVE_ACTIONS } from "@temper/game-items-core/inventory-safety-types"

export function toLoggingSettings(value: unknown): {
  actionReports: "none" | "minimal" | "verbose"
  perfTracing: "none" | "minimal"
} {
  const DEFAULT = { actionReports: "verbose" as const, perfTracing: "none" as const }
  const v = asRecord(value)
  if (!v) return DEFAULT
  const actionReports =
    v.actionReports === "none" || v.actionReports === "minimal" || v.actionReports === "verbose"
      ? v.actionReports
      : ("verbose" as const)
  const perfTracing = v.perfTracing === "minimal" ? ("minimal" as const) : ("none" as const)
  return { actionReports, perfTracing }
}

const VALID_DESTRUCTIVE_ACTIONS = new Set<string>(ALL_DESTRUCTIVE_ACTIONS)

export function toSafetySettings(value: unknown): {
  confirmActions: readonly string[]
  openCooldownProtection: boolean
} {
  const DEFAULT = {
    confirmActions: [...ALL_DESTRUCTIVE_ACTIONS],
    openCooldownProtection: true,
  }
  const v = asRecord(value)
  if (!v) return DEFAULT
  if (!Array.isArray(v.confirmActions)) return DEFAULT
  const valid = v.confirmActions.filter(
    (a): a is string => typeof a === "string" && VALID_DESTRUCTIVE_ACTIONS.has(a)
  )
  return {
    confirmActions: valid,
    openCooldownProtection: v.openCooldownProtection !== false,
  }
}
