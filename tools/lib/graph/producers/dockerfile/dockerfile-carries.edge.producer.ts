import { defineEdgeProducer } from "../../define-edge-producer.ts"
import { readRepoFile } from "../../repos.ts"
import type { EdgeInit, Graph, Node } from "../../types.ts"
import { DOCKERFILE_FILE_NODE_TYPE } from "../file/dockerfile-file/types.ts"
import { FILE_NODE_TYPES } from "../file/node-types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { PACKAGE_NODE_TYPE, PackageAttrsSchema } from "../package/types.ts"
import { candidatePaths, copySources, recipeDir } from "./copies.ts"
import { DOCKERFILE_CARRIES_EDGE_TYPE, type DockerfileCarriesAttrs } from "./types.ts"

const packagesByPath = (upstream: Graph): ReadonlyMap<string, string> => {
  const held = new Map<string, string>()
  for (const node of upstream.nodes(PACKAGE_NODE_TYPE)) {
    if (node.repo !== CODE_REPO) continue
    const attrs = PackageAttrsSchema.parse(node.attrs)
    if (attrs.path === "") continue
    held.set(attrs.path, node.id)
  }
  return held
}

const filesAt = (upstream: Graph, path: string): readonly Node[] =>
  path === "" ? [] : upstream.nodesByKey(path, CODE_REPO).filter((one) => FILE_NODE_TYPES.includes(one.type))

export const dockerfileCarriesEdgeProducer = defineEdgeProducer({
  name: "dockerfile-carries",
  edgeTypes: [DOCKERFILE_CARRIES_EDGE_TYPE],
  dependsOn: ["package", "file"],
  build: (ctx, upstream) => {
    const packages = packagesByPath(upstream)
    const edges: EdgeInit[] = []
    const attrs: DockerfileCarriesAttrs = {}
    const seen = new Set<string>()

    const carry = (from: string, to: string): undefined => {
      const at = `${from} ${to}`
      if (seen.has(at)) return
      seen.add(at)
      edges.push({ type: DOCKERFILE_CARRIES_EDGE_TYPE, from, to, attrs })
    }

    for (const recipe of upstream.nodes(DOCKERFILE_FILE_NODE_TYPE)) {
      if (recipe.repo !== CODE_REPO) continue
      const path = String(recipe.key)
      const text = readRepoFile(ctx, CODE_REPO, path)
      if (text === null) continue
      const context = recipeDir(path)
      for (const source of copySources(text)) {
        for (const candidate of candidatePaths(path, source)) {
          const files = filesAt(upstream, candidate)
          if (files.length > 0) {
            for (const one of files) carry(recipe.id, one.id)
            break
          }
          if (candidate === "" || candidate === context) continue
          const held = packages.get(candidate)
          if (held === undefined) continue
          carry(recipe.id, held)
          break
        }
      }
    }

    return { edges }
  },
})

export default dockerfileCarriesEdgeProducer
