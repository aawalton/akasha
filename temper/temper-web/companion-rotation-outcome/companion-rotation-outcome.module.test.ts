import { describe, expect, test } from "bun:test"
import type {
  RotationResult,
  SkillUsageSummary,
} from "@akasha/temper-companions-core/rotation-types"
import { deriveCompanionRotationOutcome } from "./companion-rotation-outcome.module.code.ts"

const SILENT_SKILL: SkillUsageSummary = {
  skillId: "light-attack",
  usageCount: 40,
  totalDamage: 0,
  totalHealing: 0,
  averageDamage: 0,
  uptime: 0.9,
}

function rotation(
  overrides: Partial<Pick<RotationResult, "skillSummaries" | "dps" | "hps">> = {}
): Pick<RotationResult, "skillSummaries" | "dps" | "hps"> {
  return { skillSummaries: [SILENT_SKILL], dps: 0, hps: 0, ...overrides }
}

describe("deriveCompanionRotationOutcome", () => {
  test("separates a run with nothing to simulate from a run that produced nothing", () => {
    expect(deriveCompanionRotationOutcome(rotation({ skillSummaries: [] }))).toBe(
      "nothing-simulated"
    )
    expect(deriveCompanionRotationOutcome(rotation())).toBe("no-damage-or-healing")
  })

  test("an empty run stays empty-run even with output reported alongside it", () => {
    expect(deriveCompanionRotationOutcome(rotation({ skillSummaries: [], dps: 900 }))).toBe(
      "nothing-simulated"
    )
  })

  test("shows the breakdown when the simulation attributed damage", () => {
    expect(deriveCompanionRotationOutcome(rotation({ dps: 1200 }))).toBe("breakdown")
  })

  test("shows the breakdown when the simulation attributed healing alone", () => {
    expect(deriveCompanionRotationOutcome(rotation({ hps: 800 }))).toBe("breakdown")
  })
})
