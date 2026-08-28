// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.
import type { Repo } from "../../../../../page/document/types.ts"
import { goneRecord, oldGraphGone } from "../../graph-gone.ts"
import type { NodeInit, Producer } from "../../types.ts"
import type { ExtractedWorkflow } from "./workflow-extract.ts"

export const buildPipelineNodes: (
  repo: Repo,
  workflows: readonly ExtractedWorkflow[]
) => readonly NodeInit[] = () => oldGraphGone("buildPipelineNodes")
export const pipelineNodeProducer: Producer = goneRecord("pipelineNodeProducer")
