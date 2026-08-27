import { patchPage } from "../page-write.ts"
import { resolveRoots } from "../../../repo/roots/roots"
import { getCommitTreeSha } from "./tree-sha.ts"

const PIPELINE = "pipeline"

const TREE_HASH_KEY = "tree-hash"

const LOG = "[stamp-pipeline-tree-sha]"

export interface StampPipelineTreeShaArgs {
  readonly seq: number
  readonly workDir: string
  readonly commitSha: string
}

export async function stampPipelineTreeSha(args: StampPipelineTreeShaArgs): Promise<undefined> {
  let treeHash: string
  try {
    treeHash = await getCommitTreeSha(args.workDir, args.commitSha)
  } catch (err) {
    console.error(
      `${LOG} getCommitTreeSha failed for pipeline=${args.seq} commitSha=${args.commitSha} (non-fatal): ${err instanceof Error ? err.message : String(err)}`
    )
    return
  }
  const at = patchPage(resolveRoots(), PIPELINE, String(args.seq), { [TREE_HASH_KEY]: treeHash })
  if (at === null) {
    throw new Error(
      `stampPipelineTreeSha: no pipeline page stands at seq ${args.seq}, so the tree hash ${treeHash} was written nowhere. A later pipeline reuses a build by this hash, so a silent miss would read as "nothing to reuse" rather than as a fault`
    )
  }
}
