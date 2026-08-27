import { defineEdgeProducer } from "../../../define-edge-producer.ts"
import { nodeKey } from "../../../key.ts"
import type { EdgeInit, Graph } from "../../../types.ts"
import { K8S_RESOURCE_NODE_TYPE } from "../../k8s/types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import {
  k8sResourceKey,
  SOPS_DECRYPTS_TO_EDGE_TYPE,
  type SopsDecryptsToAttrs,
  YAML_FILE_NODE_TYPES,
  YamlFileAttrsSchema,
} from "./types.ts"

export const buildYamlFileEdgesFromGraph = (
  upstream: Graph
): readonly EdgeInit<"sops-decrypts-to", SopsDecryptsToAttrs>[] => {
  const edges: EdgeInit<"sops-decrypts-to", SopsDecryptsToAttrs>[] = []
  for (const node of upstream.nodes(YAML_FILE_NODE_TYPES)) {
    const attrs = YamlFileAttrsSchema.parse(node.attrs)
    if (attrs.sops?.shape !== "manifest") continue
    for (let i = 0; i < attrs.sops.docs.length; i++) {
      const doc = attrs.sops.docs[i]
      if (doc === undefined) continue
      const edgeAttrs: SopsDecryptsToAttrs = {
        encryptedField: doc.encryptedField,
        docIndex: i,
      }
      edges.push({
        type: SOPS_DECRYPTS_TO_EDGE_TYPE,
        from: node.id,
        to: nodeKey({
          type: K8S_RESOURCE_NODE_TYPE,
          repo: CODE_REPO,
          key: k8sResourceKey(doc.kind, doc.namespace, doc.name),
        }),
        attrs: edgeAttrs,
      })
    }
  }
  return edges
}

export const yamlFileEdgeProducer = defineEdgeProducer({
  name: "yaml-file-edge",
  edgeTypes: [SOPS_DECRYPTS_TO_EDGE_TYPE],
  dependsOn: ["file"],
  build: (_ctx, upstream) => ({ edges: buildYamlFileEdgesFromGraph(upstream) }),
})

export default yamlFileEdgeProducer
