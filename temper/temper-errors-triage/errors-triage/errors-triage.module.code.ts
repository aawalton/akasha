export type Triage = "stale-ram" | "live-recurrence" | "unknown"

export type TriageReason =
  | "unattributed"
  | "no-deployed-build"
  | "loaded-build-unknown"
  | "loaded-matches-deployed"
  | "loaded-differs-from-deployed"
  | "inferred-no-deployed-build"
  | "inferred-loaded-build-unknown"
  | "inferred-loaded-matches-deployed"
  | "inferred-loaded-differs-from-deployed"

export interface InferredCulprit {
  readonly addon: string
  readonly loadedBuildId: string | undefined
  readonly deployedBuildId: string | undefined
}

export interface TriageInput {
  readonly attributedAddon: string | undefined
  readonly loadedBuildId: string | undefined
  readonly deployedBuildId: string | undefined
  readonly inferredCulprit?: InferredCulprit
}

export interface TriageVerdict {
  readonly triage: Triage
  readonly reason: TriageReason
}

export function classifyTriage(input: TriageInput): TriageVerdict {
  const { attributedAddon, loadedBuildId, deployedBuildId, inferredCulprit } = input

  if (attributedAddon !== undefined) {
    if (deployedBuildId === undefined) {
      return { triage: "unknown", reason: "no-deployed-build" }
    }
    if (loadedBuildId === undefined) {
      return { triage: "live-recurrence", reason: "loaded-build-unknown" }
    }
    if (loadedBuildId === deployedBuildId) {
      return { triage: "live-recurrence", reason: "loaded-matches-deployed" }
    }
    return { triage: "stale-ram", reason: "loaded-differs-from-deployed" }
  }

  if (inferredCulprit !== undefined) {
    const loaded = inferredCulprit.loadedBuildId
    const deployed = inferredCulprit.deployedBuildId
    if (deployed === undefined) {
      return { triage: "unknown", reason: "inferred-no-deployed-build" }
    }
    if (loaded === undefined) {
      return { triage: "live-recurrence", reason: "inferred-loaded-build-unknown" }
    }
    if (loaded === deployed) {
      return { triage: "live-recurrence", reason: "inferred-loaded-matches-deployed" }
    }
    return { triage: "stale-ram", reason: "inferred-loaded-differs-from-deployed" }
  }

  return { triage: "unknown", reason: "unattributed" }
}
