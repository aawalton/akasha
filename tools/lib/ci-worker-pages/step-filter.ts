import { type ClosureSeeds, readStepClosureSeeds, stepBypassesClosureGate } from "./closure-seeds.ts"
import { isPlainRecord } from "./config.ts"

export interface PreSelectedWorkflowEntry {
  readonly workflowName: string
  readonly changedFiles: readonly string[]
  readonly config: Record<string, unknown>
}

export interface ClosureGate {
  readonly forcedStepNames: ReadonlySet<string>
  readonly intersects: (seeds: ClosureSeeds, changedFiles: readonly string[]) => boolean
}

export function applyStepLevelClosureFilter(
  entries: readonly PreSelectedWorkflowEntry[],
  gate: ClosureGate
): undefined {
  for (const entry of entries) {
    const stated = entry.config.stepDefinitions
    if (!Array.isArray(stated)) continue
    const kept: unknown[] = []
    for (const step of stated) {
      if (!isPlainRecord(step) || stepBypassesClosureGate(step)) {
        kept.push(step)
        continue
      }
      if (typeof step.name === "string" && gate.forcedStepNames.has(step.name)) {
        kept.push(step)
        continue
      }
      if (gate.intersects(readStepClosureSeeds(step), entry.changedFiles)) kept.push(step)
    }
    entry.config.stepDefinitions = kept
  }
}
