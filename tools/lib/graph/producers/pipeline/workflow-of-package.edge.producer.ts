import { defineEdgeProducer } from "../../define-edge-producer.ts"
import { nodeKey } from "../../key.ts"
import type { EdgeInit } from "../../types.ts"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import { PACKAGE_NODE_TYPE } from "../package/types.ts"
import {
  WORKFLOW_NODE_TYPE,
  WORKFLOW_OF_PACKAGE_EDGE_TYPE,
  WorkflowAttrsSchema,
  type WorkflowOfPackageAttrs,
} from "./types.ts"

const NO_ATTRS: WorkflowOfPackageAttrs = {}

export const workflowOfPackageEdgeProducer = defineEdgeProducer({
  name: "workflow-of-package",
  edgeTypes: [WORKFLOW_OF_PACKAGE_EDGE_TYPE],
  dependsOn: ["pipeline", "package"],
  build: (_ctx, upstream) => {
    const edges: EdgeInit[] = []
    const packagesStanding = upstream.nodes(PACKAGE_NODE_TYPE).length
    for (const workflow of upstream.nodes(WORKFLOW_NODE_TYPE)) {
      const attrs = WorkflowAttrsSchema.parse(workflow.attrs)
      const named = attrs.package
      if (named === undefined) continue
      const to = nodeKey({ type: PACKAGE_NODE_TYPE, repo: CODE_REPO, key: named })
      if (upstream.node(to) === undefined) {
        throw new Error(
          `graph: workflow ${workflow.id} names the package ${named}, and no node stands at ${to}; ${packagesStanding} package node(s) stand in all, and they come from the \`workspaces\` array of the ${CODE_REPO} repo's root package.json, so read that array before this one package`
        )
      }
      edges.push({ type: WORKFLOW_OF_PACKAGE_EDGE_TYPE, from: workflow.id, to, attrs: NO_ATTRS })
    }
    return { edges }
  },
})

export default workflowOfPackageEdgeProducer
