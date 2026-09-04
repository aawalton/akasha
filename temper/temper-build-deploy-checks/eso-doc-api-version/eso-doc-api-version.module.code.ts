import { join } from "node:path"

export function esoDocPathForLuaRoot(esoLuaRoot: string): string {
  return join(esoLuaRoot, "..", "ESOUIDocumentation.txt")
}

export interface StampedArtifact {
  readonly label: string
  readonly version: number | null
  readonly generator: string
}

export interface FreshnessInput {
  readonly artifacts: readonly StampedArtifact[]
}

export interface FreshnessResult {
  readonly ok: boolean
  readonly violations: readonly string[]
}

function populationViolations(artifacts: readonly StampedArtifact[]): readonly string[] {
  const violations: string[] = []
  for (const artifact of artifacts) {
    if (artifact.version === null) {
      violations.push(
        `${artifact.label}: no ESO-API-Version stamp — it is clone-derived by its own provenance line, ` +
          `so regenerate it with the command that line names, ${artifact.generator}, ` +
          "to record the source version"
      )
    }
  }
  return violations
}

function agreementViolations(artifacts: readonly StampedArtifact[]): readonly string[] {
  const stamped = artifacts.filter(
    (a): a is StampedArtifact & { version: number } => a.version !== null
  )
  const distinct = [...new Set(stamped.map((a) => a.version))]
  if (distinct.length <= 1) return []
  const detail = stamped.map((a) => `${a.label}=${a.version}`).join(", ")
  return [
    `ESO artifacts stamped from mismatched API versions (${detail}) — a partial regen; ` +
      "regenerate every ESO artifact together from one clone",
  ]
}

export function evaluateEsoTypingsFreshness(input: FreshnessInput): FreshnessResult {
  const { artifacts } = input

  if (artifacts.length === 0) {
    return {
      ok: false,
      violations: [
        "no clone-derived ESO artifact was found — every one carries a `Generated from the ~/esoui clone by` " +
          "provenance line, so an empty set means the search lost them rather than that they are all current",
      ],
    }
  }

  const violations = [...populationViolations(artifacts), ...agreementViolations(artifacts)]
  return { ok: violations.length === 0, violations }
}
