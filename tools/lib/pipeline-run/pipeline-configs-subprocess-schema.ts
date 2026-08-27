import { z } from "zod"
import { SerializedGraphSchema } from "../graph/serde/types.ts"

const WorkflowConfigStepZ = z
  .object({
    name: z.string(),
  })
  .passthrough()

const WorkflowConfigItemZ = z
  .object({
    name: z.string(),
    steps: z.array(WorkflowConfigStepZ),
    inputsHash: z.string(),
  })
  .passthrough()

export const WorkflowConfigArrayZ = z.array(WorkflowConfigItemZ)

const LoadConfigsTimingsZ = z
  .object({
    treeExtractMs: z.number().optional(),
    discoveryImportMs: z.number().optional(),
    engineBuildMs: z.number().optional(),
    graphBuildMs: z.number().optional(),
    childTotalMs: z.number().optional(),
    loadGraphMs: z.number().optional(),
  })
  .passthrough()

export const LoadConfigsResultZ = z.object({
  configs: WorkflowConfigArrayZ,
  timings: LoadConfigsTimingsZ,
})

export const WorktreeConfigLoadResultZ = LoadConfigsResultZ.extend({
  graph: SerializedGraphSchema,
})

export type WorkflowConfigJson = z.infer<typeof WorkflowConfigItemZ>
