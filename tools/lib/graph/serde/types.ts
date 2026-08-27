import { z } from "zod"
import { REPOS } from "../../../../repo/roots/roots"

const AttrsSchema = z.record(z.string(), z.unknown())

const SerializedNodeSchema = z
  .object({
    type: z.string(),
    repo: z.enum([...REPOS] as [string, ...string[]]).optional(),
    key: z.string(),
    attrs: AttrsSchema,
    derived: AttrsSchema,
  })
  .strict()

const SerializedEdgeSchema = z
  .object({
    type: z.string(),
    from: z.string(),
    to: z.string(),
    attrs: AttrsSchema,
    derived: AttrsSchema,
  })
  .strict()

export const SerializedGraphSchema = z
  .object({
    commit: z.string(),
    nodes: z.array(SerializedNodeSchema),
    edges: z.array(SerializedEdgeSchema),
  })
  .strict()

export type SerializedNode = z.infer<typeof SerializedNodeSchema>
export type SerializedEdge = z.infer<typeof SerializedEdgeSchema>
export type SerializedGraph = z.infer<typeof SerializedGraphSchema>
