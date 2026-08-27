import { defineEdgeProducer } from "../../define-edge-producer.ts"
import type { EdgeInit, Node } from "../../types.ts"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import { K8S_DECLARED_IN_EDGE_TYPE, K8S_RESOURCE_NODE_TYPE, type K8sDeclaredInAttrs } from "./types.ts"
import { K8sResourceAttrsSchema } from "./types-schemas"

const DECLARED_IN_ATTRS: K8sDeclaredInAttrs = {}

export const k8sDeclaredInEdgeProducer = defineEdgeProducer({
  name: "k8s-declared-in",
  edgeTypes: [K8S_DECLARED_IN_EDGE_TYPE],
  dependsOn: ["file", "k8s"],
  build: (_ctx, graph) => {
    const edges: EdgeInit[] = []

    const fileAt = (at: string): Node | undefined =>
      graph.nodesByKey(at, CODE_REPO).find((one: Node) => one.type.endsWith("-file"))

    for (const resource of graph.nodes(K8S_RESOURCE_NODE_TYPE)) {
      const parsed = K8sResourceAttrsSchema.safeParse(resource.attrs)
      if (!parsed.success) continue
      const target = fileAt(parsed.data.path)
      if (target === undefined) continue
      edges.push({
        type: K8S_DECLARED_IN_EDGE_TYPE,
        from: resource.id,
        to: target.id,
        attrs: DECLARED_IN_ATTRS,
      })
    }

    return { edges }
  },
})

export default k8sDeclaredInEdgeProducer
