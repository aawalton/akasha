export interface CheckDefinitionExposure {
  readonly definitionFile: string
  readonly checkStep: string
  readonly reason: string
}

export interface CheckDefinitionRegistryViolation {
  readonly kind: "unknown-check-step" | "missing-definition-file" | "blank-reason"
  readonly definitionFile: string
  readonly checkStep: string
  readonly detail: string
}

export const RETROACTIVE_INVALIDATION_CHECK_DEFINITIONS: readonly CheckDefinitionExposure[] = [
  {
    definitionFile: "infra/cluster-checks/src/lib/functional-type-rules.ts",
    checkStep: "check-functional-type",
    reason:
      "Cross-package rank-monotonicity rule logic; tightening it retroactively invalidates unchanged package imports the branch never touched, which check-functional-type validates repo-wide.",
  },
]

export function forceKeptStepNamesForChangedFiles(
  changedFiles: readonly string[],
  registry: readonly CheckDefinitionExposure[] = RETROACTIVE_INVALIDATION_CHECK_DEFINITIONS
): ReadonlySet<string> {
  const changed = new Set(changedFiles)
  const forced = new Set<string>()
  for (const entry of registry) {
    if (changed.has(entry.definitionFile)) forced.add(entry.checkStep)
  }
  return forced
}

export function findCheckDefinitionRegistryViolations(input: {
  readonly registry: readonly CheckDefinitionExposure[]
  readonly knownCheckSteps: ReadonlySet<string>
  readonly definitionFileExists: (path: string) => boolean
}): readonly CheckDefinitionRegistryViolation[] {
  const violations: CheckDefinitionRegistryViolation[] = []
  for (const entry of input.registry) {
    if (entry.reason.trim() === "") {
      violations.push({
        kind: "blank-reason",
        definitionFile: entry.definitionFile,
        checkStep: entry.checkStep,
        detail: `registry entry for '${entry.definitionFile}' → '${entry.checkStep}' has a blank reason`,
      })
    }
    if (!input.knownCheckSteps.has(entry.checkStep)) {
      violations.push({
        kind: "unknown-check-step",
        definitionFile: entry.definitionFile,
        checkStep: entry.checkStep,
        detail: `checkStep '${entry.checkStep}' is not a step in the assembled 'check' workflow — a renamed/removed check, or a typo`,
      })
    }
    if (!input.definitionFileExists(entry.definitionFile)) {
      violations.push({
        kind: "missing-definition-file",
        definitionFile: entry.definitionFile,
        checkStep: entry.checkStep,
        detail: `definitionFile '${entry.definitionFile}' does not exist — a stale registry entry`,
      })
    }
  }
  return violations
}
