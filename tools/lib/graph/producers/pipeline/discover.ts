import type { Repo } from "../../../../../page/document/types.ts"
import { workflowPages } from "../../../workflow-dsl/discovery.ts"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext } from "../../types.ts"
import { repoFiles } from "../lib/repo-files.ts"
import { PIPELINE_REPO } from "./types.ts"
import {
  type ExtractedWorkflow,
  type Extraction,
  extractWorkflows,
  type WorkflowSource,
} from "./workflow-extract.ts"
import type { SourceTree } from "./workflow-modules.ts"

const sourceTree = (ctx: BuildContext, repo: Repo): SourceTree => ({
  files: repoFiles(ctx, repo, { includeFixtures: true, includeGenerated: true }),
  read: (path) => readRepoFile(ctx, repo, path),
})

const rootOf = (ctx: BuildContext): string => {
  const root = ctx.repoRoots.get(PIPELINE_REPO)
  if (root === undefined) {
    throw new Error(
      `graph: the snapshot holds no reading of the ${PIPELINE_REPO} repository, and every workflow is declared by a page standing there`
    )
  }
  return root
}

export const workflowSources = (ctx: BuildContext): readonly WorkflowSource[] =>
  workflowPages(rootOf(ctx)).map((page) => ({ sourcePath: page.sourcePath, kind: page.kind }))

export const extractPipelineWorkflows = (ctx: BuildContext): Extraction =>
  extractWorkflows(sourceTree(ctx, PIPELINE_REPO), workflowSources(ctx))

export const discoverPipelineWorkflows = (ctx: BuildContext): readonly ExtractedWorkflow[] =>
  extractPipelineWorkflows(ctx).workflows
