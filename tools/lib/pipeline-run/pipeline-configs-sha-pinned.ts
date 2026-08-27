import { askGraph } from "../graph/ask.ts"
import type { Graph } from "../graph/types.ts"
import type { CommitSha40 } from "../workflow-dsl/ci-identifiers.ts"
import { loadAllWorkflowConfigs, type WorkflowConfig } from "./pipeline-configs.ts"
import type { LoadConfigsTimings } from "./pipeline-configs-types.ts"
import { withShaPinnedTree } from "../main-pipeline-creator/sha-pinned-tree.ts"

const SHORT_SHA_LEN = 7

export interface LoadAtShaArgs {
  readonly gitDir: string
  readonly sha: CommitSha40
  readonly instructionsGitDir: string
  readonly instructionsCommit: CommitSha40
  readonly branch: string
  readonly changedFiles?: readonly string[]
  readonly graph?: Graph
  readonly scratchRoot?: string
  readonly timings?: LoadConfigsTimings
}

async function graphAt(sha: CommitSha40): Promise<Graph> {
  const asked = await askGraph(sha)
  if (!asked.ok) {
    throw new Error(
      `loadAllWorkflowConfigsAtShaInProcess: the graph at ${sha.slice(0, SHORT_SHA_LEN)} went unanswered, so which files each workflow watches cannot be worked out: ${asked.why}`
    )
  }
  return asked.held
}

export async function loadAllWorkflowConfigsAtShaInProcess(
  args: LoadAtShaArgs
): Promise<readonly WorkflowConfig[]> {
  return withShaPinnedTree(
    {
      gitDir: args.instructionsGitDir,
      sha: args.instructionsCommit,
      scratchRoot: args.scratchRoot,
      onExtractComplete: (ms) => {
        if (args.timings) args.timings.treeExtractMs = ms
      },
    },
    async (akashaRoot) =>
      withShaPinnedTree(
        { gitDir: args.gitDir, sha: args.sha, scratchRoot: args.scratchRoot },
        async (codeRoot) =>
          loadAllWorkflowConfigs({
            akashaRoot,
            codeRoot,
            gitDir: args.gitDir,
            commitSha: args.sha,
            branch: args.branch,
            changedFiles: args.changedFiles ?? [],
            graph: args.graph ?? (await graphAt(args.sha)),
            timings: args.timings,
          })
      )
  )
}
