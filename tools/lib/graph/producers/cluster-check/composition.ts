import ts from "typescript"
import type { Repo } from "../../../../../page/document/types.ts"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext } from "../../types.ts"
import { repoFiles } from "../lib/repo-files.ts"
import type { SourceTree } from "../pipeline/workflow-modules.ts"
import { createSourceReader, type SourceReader } from "../pipeline/workflow-source.ts"

export const CHECK_WORKFLOW_REPO: Repo = "instructions"

export const CHECK_WORKFLOW_SOURCE = "tools/lib/check-workflow/index.ts"

export type CheckStepComposition = {
  readonly stepPrefix: string
  readonly defaultImage: string
}

const declaredString = (reader: SourceReader, path: string, name: string): string | null => {
  const file = reader.sourceFile(path)
  if (file === null) return null
  let found: string | null = null
  const visit = (node: ts.Node): undefined => {
    if (found !== null) return
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === name &&
      node.initializer !== undefined
    ) {
      found = reader.resolveString(node.initializer, path)
      if (found !== null) return
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(file, visit)
  return found
}

export const readComposition = (tree: SourceTree): CheckStepComposition => {
  const reader = createSourceReader(tree)
  const stepPrefix = declaredString(reader, CHECK_WORKFLOW_SOURCE, "STEP_PREFIX")
  const defaultImage = declaredString(reader, CHECK_WORKFLOW_SOURCE, "image")
  if (stepPrefix === null) {
    throw new Error(
      `graph: ${CHECK_WORKFLOW_SOURCE} declares no readable STEP_PREFIX, so no check step can be named`
    )
  }
  if (defaultImage === null) {
    throw new Error(
      `graph: ${CHECK_WORKFLOW_SOURCE} declares no readable default image, so a check stating none has none`
    )
  }
  return { stepPrefix, defaultImage }
}

export const readCheckStepComposition = (ctx: BuildContext): CheckStepComposition =>
  readComposition({
    files: repoFiles(ctx, CHECK_WORKFLOW_REPO, { includeFixtures: true, includeGenerated: true }),
    read: (path) => readRepoFile(ctx, CHECK_WORKFLOW_REPO, path),
  })
