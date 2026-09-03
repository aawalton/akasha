import type { SeatPresence } from "@akasha/seat-system/seat-proc-key"

export const DECLARATION_RELATIVE_PATH = "tools/lib/spawn-guard.ts"

export const SPAWN_REJECT_BASES = ["holder-live", "holder-uncertain"] as const

export type SpawnRejectBasis = (typeof SPAWN_REJECT_BASES)[number]

export interface SpawnGuardInput {
  readonly holder: SeatPresence
}

export const SPAWN_GUARD_DECISIONS = ["allow", "reject"] as const

export type SpawnGuardDecisionKind = (typeof SPAWN_GUARD_DECISIONS)[number]

export type SpawnGuardDecision =
  | { kind: "allow" }
  | { kind: "reject"; basis: SpawnRejectBasis; reason: string }

export function decideSpawnGuard(input: SpawnGuardInput): SpawnGuardDecision {
  if (input.holder === "absent") {
    return { kind: "allow" }
  }

  if (input.holder === "unknown") {
    return {
      kind: "reject",
      basis: "holder-uncertain",
      reason:
        "a seat holds this name and the process its page names cannot be read, so whether it " +
        "is running is unknown — refusing rather than risk clobbering a live agent. Resolve it " +
        "with `akasha seat supervisor stop <name>` (safe either way), or pick a different name",
    }
  }

  return {
    kind: "reject",
    basis: "holder-live",
    reason:
      "a live agent already holds this name; stop it first with `akasha seat supervisor stop <name>` " +
      "(or pick a different name)",
  }
}
