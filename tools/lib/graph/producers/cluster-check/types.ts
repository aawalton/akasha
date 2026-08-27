import { z } from "zod"

export type DispatchTarget = {
  readonly kind: string
  readonly under?: string
}

export type ClusterCheckAttrs = {
  readonly name: string
  readonly script: string
  readonly pagePath: string
  readonly args?: readonly string[]
  readonly treeSha?: boolean
  readonly alwaysRun?: boolean
  readonly image?: string
  readonly closurePolicy?: string
  readonly dependsOn: readonly string[]
  readonly dispatchNodeTypes: readonly DispatchTarget[]
}

export type ClusterCheckNodeType = "cluster-check"
export const CLUSTER_CHECK_NODE_TYPE: ClusterCheckNodeType = "cluster-check"

export const CHECK_WORKFLOW_NAME = "check"

export const DispatchTargetSchema = z
  .object({
    kind: z.string(),
    under: z.string().optional(),
  })
  .passthrough()

export const ClusterCheckAttrsSchema = z
  .object({
    name: z.string(),
    script: z.string(),
    pagePath: z.string(),
    args: z.array(z.string()).optional(),
    treeSha: z.boolean().optional(),
    alwaysRun: z.boolean().optional(),
    image: z.string().optional(),
    closurePolicy: z.string().optional(),
    dependsOn: z.array(z.string()),
    dispatchNodeTypes: z.array(DispatchTargetSchema),
  })
  .passthrough()
