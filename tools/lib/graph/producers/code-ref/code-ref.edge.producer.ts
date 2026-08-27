import type { Repo } from "../../../../../page/document/types.ts"
import type { CodeRefKind } from "../../../code-import.ts"
import { codeReaches, type ReachSource } from "../../../code-reaches.ts"
import { defineEdgeProducer } from "../../define-edge-producer.ts"
import { nodeKey } from "../../key.ts"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext, EdgeInit, NodeId } from "../../types.ts"
import { packageNamePrefix } from "../file/ts-file/ts-file-edges-for-file.ts"
import { tsFileNodeTypeOf } from "../file/ts-file/types.ts"
import { CODE_REPO, INSTRUCTIONS_REPO } from "../lib/constants.ts"
import { PACKAGE_NODE_TYPE } from "../package/types.ts"
import { IMPORT_CODE_REF_EDGE_TYPE, type ImportCodeRefAttrs } from "./types.ts"

const HOLDERS: readonly Repo[] = [INSTRUCTIONS_REPO, CODE_REPO]

const SOURCE_ENDING = ".ts"

const TEST_ENDING = ".test.ts"

const FIXTURE_DIR = "tools/tests/"

const readsFrom = (ctx: BuildContext): ReachSource => {
  const standing = ctx.repoFiles.get(INSTRUCTIONS_REPO) ?? []
  const held = new Set(standing)
  const there = new Set(ctx.repoFiles.get(CODE_REPO) ?? [])
  return {
    files: standing.filter(
      (rel) =>
        rel.endsWith(SOURCE_ENDING) && !rel.endsWith(TEST_ENDING) && !rel.startsWith(FIXTURE_DIR)
    ),
    read: (rel) => (held.has(rel) ? (readRepoFile(ctx, INSTRUCTIONS_REPO, rel) ?? "") : ""),
    holdsHere: (rel) => held.has(rel),
    holdsThere: (rel) => there.has(rel),
  }
}

type Target = {
  readonly id: NodeId
  readonly resolved: string | null
}

type Holding = readonly (readonly [Repo, ReadonlySet<string>])[]

const holdingIn = (ctx: BuildContext): Holding =>
  HOLDERS.map((repo) => [repo, new Set(ctx.repoFiles.get(repo) ?? [])] as const)

const repoHolding = (holding: Holding, ref: string): Repo =>
  holding.find(([, files]) => files.has(ref))?.[0] ?? CODE_REPO

const targetOf = (ref: string, kind: CodeRefKind, holding: Holding): Target | null => {
  if (kind === "path") {
    const repo = repoHolding(holding, ref)
    return { id: nodeKey({ type: tsFileNodeTypeOf(ref), repo, key: ref }), resolved: ref }
  }
  const named = packageNamePrefix(ref)
  if (named === null) return null
  return { id: nodeKey({ type: PACKAGE_NODE_TYPE, repo: CODE_REPO, key: named }), resolved: null }
}

export const codeRefEdgeProducer = defineEdgeProducer({
  name: "code-ref-edge",
  edgeTypes: [IMPORT_CODE_REF_EDGE_TYPE],
  dependsOn: ["file", "package"],
  build: (ctx) => {
    const edges: EdgeInit[] = []
    const holding = holdingIn(ctx)
    for (const reach of codeReaches(readsFrom(ctx)).reaches) {
      const target = targetOf(reach.ref, reach.kind, holding)
      if (target === null) continue
      const attrs: ImportCodeRefAttrs = { specifier: reach.ref, resolved: target.resolved }
      for (const site of reach.sites) {
        edges.push({
          type: IMPORT_CODE_REF_EDGE_TYPE,
          from: nodeKey({ type: tsFileNodeTypeOf(site), repo: INSTRUCTIONS_REPO, key: site }),
          to: target.id,
          attrs,
        })
      }
    }
    return { edges }
  },
})

export default codeRefEdgeProducer
