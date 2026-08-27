import { asStringArray, isPlainRecord, type NodeTypeSeed, readDispatchNodeTypes } from "./config.ts"

export interface ClosureSeeds {
  nodes?: readonly string[]
  nodeTypes?: readonly NodeTypeSeed[]
  closurePolicy?: "import-graph"
}

export const IMPORT_GRAPH = "import-graph"

function seedsIn(raw: Readonly<Record<string, unknown>>): ClosureSeeds {
  const seeds: ClosureSeeds = {}
  const nodes = asStringArray(raw.dispatchNodes)
  if (nodes !== undefined && nodes.length > 0) seeds.nodes = nodes
  const nodeTypes = readDispatchNodeTypes(raw.dispatchNodeTypes)
  if (nodeTypes !== undefined) seeds.nodeTypes = nodeTypes
  return seeds
}

export function readWorkflowClosureSeeds(raw: Readonly<Record<string, unknown>>): ClosureSeeds {
  return seedsIn(raw)
}

export function readStepClosureSeeds(step: Readonly<Record<string, unknown>>): ClosureSeeds {
  const seeds = seedsIn(step)
  return step.closurePolicy === IMPORT_GRAPH ? { ...seeds, closurePolicy: IMPORT_GRAPH } : seeds
}

export function readWorkflowDependsOn(
  raw: Readonly<Record<string, unknown>> | undefined
): readonly string[] {
  if (raw === undefined || !Array.isArray(raw.dependsOn)) return []
  return raw.dependsOn.filter((one): one is string => typeof one === "string")
}

export function stepBypassesClosureGate(step: Readonly<Record<string, unknown>>): boolean {
  if (step.alwaysRun === true) return true
  const stepConfig = step.stepConfig
  return isPlainRecord(stepConfig) && typeof stepConfig.skipIfTagExists === "string"
}
