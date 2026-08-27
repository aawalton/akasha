import { defineNodeProducer } from "../../define-node-producer.ts"
import { discoverClusterRbac } from "./discover-cluster-rbac.ts"
import { discoverRbacProfiles } from "./discover-rbac.ts"
import {
  buildClusterRbacNodes,
  buildManifestNodes,
  buildProfileResourceNodes,
  buildRbacNodesFromInputs,
} from "./k8s-node-builders.ts"
import { NAMESPACE_ROLE_NODE_TYPE } from "./rbac-types.ts"
import { K8S_RESOURCE_NODE_TYPE, NODE_HOSTNAME_NODE_TYPE } from "./types.ts"

export const k8sNodeProducer = defineNodeProducer({
  name: "k8s",
  nodeTypes: [K8S_RESOURCE_NODE_TYPE, NODE_HOSTNAME_NODE_TYPE, NAMESPACE_ROLE_NODE_TYPE],
  dependsOn: ["package"],
  build: (ctx, upstream) => {
    const profiles = discoverRbacProfiles(ctx, upstream)
    return {
      nodes: [
        ...buildManifestNodes(ctx),
        ...buildClusterRbacNodes(discoverClusterRbac(ctx)),
        ...buildProfileResourceNodes(profiles),
        ...buildRbacNodesFromInputs(profiles),
      ],
    }
  },
})

export default k8sNodeProducer
