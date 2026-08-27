import { defineEdgeProducer } from "../../define-edge-producer.ts"
import { nodeKey } from "../../key.ts"
import type { EdgeInit, Graph } from "../../types.ts"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import { k8sResourceKey } from "../file/yaml-file/types.ts"
import { PACKAGE_NODE_TYPE } from "../package/types.ts"
import { profileResourceKinds } from "./k8s-node-builders.ts"
import { SYNTH_GENERATED_BY_EDGE_TYPE, type SynthGeneratedByAttrs } from "./synth-types.ts"
import { K8S_RESOURCE_NODE_TYPE } from "./types.ts"
import { TS_FILE_NODE_TYPE } from "../file/ts-file/types.ts"
import {
  NAMESPACE_ROLE_NODE_TYPE,
  type NamespaceRoleAttrs,
  NamespaceRoleAttrsSchema,
  RBAC_DECLARES_EDGE_TYPE,
  type RbacDeclaresAttrs,
} from "./rbac-types.ts"

const readNamespaceRoleAttrs = (raw: unknown): NamespaceRoleAttrs =>
  NamespaceRoleAttrsSchema.parse(raw)

export const buildRbacEdgesFromGraph = (
  upstream: Graph
): readonly EdgeInit<typeof RBAC_DECLARES_EDGE_TYPE, RbacDeclaresAttrs>[] => {
  const edges: EdgeInit<typeof RBAC_DECLARES_EDGE_TYPE, RbacDeclaresAttrs>[] = []
  for (const node of upstream.nodes(NAMESPACE_ROLE_NODE_TYPE)) {
    const attrs = readNamespaceRoleAttrs(node.attrs)
    for (const declaration of attrs.declarations) {
      const edgeAttrs: RbacDeclaresAttrs = {
        sourcePath: declaration.sourcePath,
        rules: declaration.rules,
      }
      edges.push({
        type: RBAC_DECLARES_EDGE_TYPE,
        from: nodeKey({
          type: PACKAGE_NODE_TYPE,
          repo: CODE_REPO,
          key: declaration.packageName,
        }),
        to: node.id,
        attrs: edgeAttrs,
      })
    }
  }
  return edges
}

const NO_ATTRS: SynthGeneratedByAttrs = {}

export const buildProfileResourceEdgesFromGraph = (upstream: Graph): readonly EdgeInit[] => {
  const edges: EdgeInit[] = []
  const seen = new Set<string>()
  for (const node of upstream.nodes(NAMESPACE_ROLE_NODE_TYPE)) {
    const attrs = readNamespaceRoleAttrs(node.attrs)
    const repo = node.repo ?? CODE_REPO
    for (const declaration of attrs.declarations) {
      for (const kind of profileResourceKinds) {
        const from = nodeKey({
          type: K8S_RESOURCE_NODE_TYPE,
          repo,
          key: k8sResourceKey(kind, attrs.namespace, attrs.roleName),
        })
        const to = nodeKey({ type: TS_FILE_NODE_TYPE, repo, key: declaration.sourcePath })
        const once = `${from} ${to}`
        if (seen.has(once)) continue
        seen.add(once)
        if (upstream.node(from) === undefined || upstream.node(to) === undefined) continue
        edges.push({ type: SYNTH_GENERATED_BY_EDGE_TYPE, from, to, attrs: NO_ATTRS })
      }
    }
  }
  return edges
}

export const rbacEdgeProducer = defineEdgeProducer({
  name: "rbac-edge",
  edgeTypes: [RBAC_DECLARES_EDGE_TYPE, SYNTH_GENERATED_BY_EDGE_TYPE],
  dependsOn: ["k8s"],
  build: (_ctx, upstream) => ({
    edges: [...buildRbacEdgesFromGraph(upstream), ...buildProfileResourceEdgesFromGraph(upstream)],
  }),
})

export default rbacEdgeProducer
