import type { RotationResult } from "akasha/temper/catalog/companion/companions-core/modules/rotation-types/rotation-types.module.code.ts"

type CompanionRotationOutcome = "nothing-simulated" | "no-damage-or-healing" | "breakdown"

export function deriveCompanionRotationOutcome(
  rotation: Pick<RotationResult, "skillSummaries" | "dps" | "hps">
): CompanionRotationOutcome {
  if (rotation.skillSummaries.length === 0) return "nothing-simulated"
  if (rotation.dps <= 0 && rotation.hps <= 0) return "no-damage-or-healing"
  return "breakdown"
}
