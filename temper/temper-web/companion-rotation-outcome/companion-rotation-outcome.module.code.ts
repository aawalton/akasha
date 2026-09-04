import type { RotationResult } from "@akasha/temper-companions-core/rotation-types"

export type CompanionRotationOutcome = "nothing-simulated" | "no-damage-or-healing" | "breakdown"

export function deriveCompanionRotationOutcome(
  rotation: Pick<RotationResult, "skillSummaries" | "dps" | "hps">
): CompanionRotationOutcome {
  if (rotation.skillSummaries.length === 0) return "nothing-simulated"
  if (rotation.dps <= 0 && rotation.hps <= 0) return "no-damage-or-healing"
  return "breakdown"
}
