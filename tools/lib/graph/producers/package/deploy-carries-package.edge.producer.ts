import { defineEdgeProducer } from "../../define-edge-producer.ts"
import { nodeKey } from "../../key.ts"
import { deployedNodeTypes, rootingEdgeTypes } from "../../queries/rooted.ts"
import type { EdgeInit, Graph, NodeId } from "../../types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import {
  DEPLOY_CARRIES_PACKAGE_EDGE_TYPE,
  type DeployCarriesPackageAttrs,
  PACKAGE_NODE_TYPE,
  PackageAttrsSchema,
  ROOT_MANIFEST_NAME,
} from "./types.ts"

type Workspace = {
  readonly path: string
  readonly name: string
}

const holdsFile = (pkgPath: string, filePath: string): boolean =>
  filePath === pkgPath || filePath.startsWith(`${pkgPath}/`)

const reachedFrom = (graph: Graph, root: NodeId, onward: readonly string[]): ReadonlySet<NodeId> => {
  const reached = new Set<NodeId>()
  const queue: NodeId[] = []
  const take = (id: NodeId): void => {
    if (reached.has(id) || graph.node(id) === undefined) return
    reached.add(id)
    queue.push(id)
  }
  for (const edge of graph.outEdges(root)) take(edge.to)
  while (queue.length > 0) {
    const at = queue.shift()
    if (at === undefined) break
    for (const edge of graph.outEdges(at, onward)) take(edge.to)
  }
  return reached
}

export const deployCarriesPackageEdgeProducer = defineEdgeProducer({
  name: "deploy-carries-package",
  edgeTypes: [DEPLOY_CARRIES_PACKAGE_EDGE_TYPE],
  dependsOn: [
    "package",
    "addon-carries-file",
    "dockerfile-recipe-edge",
    "inference-service-source",
    "ios-app-edge",
    "k8s-synth-edges",
    "pipeline-edge",
    "step-names-file",
    "step-runs-script",
    "temper-addon-built-from",
    "tested-by",
    "tunnel-config-recipe-edge",
    "web-app-built-from",
    "web-app-entry",
  ],
  build: (_ctx, graph) => {
    const workspaces: Workspace[] = []
    for (const node of graph.nodes(PACKAGE_NODE_TYPE)) {
      const attrs = PackageAttrsSchema.parse(node.attrs)
      if (attrs.path === "") continue
      workspaces.push({ path: attrs.path, name: attrs.name })
    }
    workspaces.sort((a, b) => b.path.length - a.path.length)

    const ownerOf = (filePath: string): Workspace | undefined =>
      workspaces.find((one) => holdsFile(one.path, filePath))

    const onward = rootingEdgeTypes()
    const edges: EdgeInit[] = []
    const emptyAttrs: DeployCarriesPackageAttrs = {}
    const seen = new Set<string>()

    for (const deployedType of deployedNodeTypes()) {
      for (const from of graph.nodes(deployedType)) {
        for (const id of reachedFrom(graph, from.id, onward)) {
          const to = graph.node(id)
          if (to === undefined) continue
          if (to.repo !== CODE_REPO) continue
          if (to.type === PACKAGE_NODE_TYPE) continue
          const path = String(to.key)
          const owner = ownerOf(path)
          if (owner === undefined) continue
          if (path === `${owner.path}/${ROOT_MANIFEST_NAME}`) continue
          const at = `${from.id}\u0000${owner.name}`
          if (seen.has(at)) continue
          seen.add(at)
          edges.push({
            type: DEPLOY_CARRIES_PACKAGE_EDGE_TYPE,
            from: from.id,
            to: nodeKey({ type: PACKAGE_NODE_TYPE, repo: CODE_REPO, key: owner.name }),
            attrs: emptyAttrs,
          })
        }
      }
    }

    return { edges }
  },
})

export default deployCarriesPackageEdgeProducer
