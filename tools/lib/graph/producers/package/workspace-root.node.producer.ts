import { defineNodeProducer } from "../../define-node-producer.ts"
import { readRepoFile } from "../../repos.ts"
import type { NodeInit } from "../../types.ts"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import {
  ROOT_MANIFEST_NAME,
  ROOT_PACKAGE_KEY,
  WORKSPACE_ROOT_NODE_TYPE,
  type WorkspaceRootAttrs,
} from "./types.ts"

export const workspaceRootNodeProducer = defineNodeProducer({
  name: "workspace-root",
  nodeTypes: [WORKSPACE_ROOT_NODE_TYPE],
  build: (ctx) => {
    const raw = readRepoFile(ctx, CODE_REPO, ROOT_MANIFEST_NAME)
    if (raw === null) {
      throw new Error(
        `graph: the snapshot holds no ${ROOT_MANIFEST_NAME} for the ${CODE_REPO} repository`
      )
    }
    const attrs: WorkspaceRootAttrs = { path: "" }
    const nodes: NodeInit<"workspace-root", WorkspaceRootAttrs>[] = [
      { type: WORKSPACE_ROOT_NODE_TYPE, repo: CODE_REPO, key: ROOT_PACKAGE_KEY, attrs },
    ]
    return { nodes }
  },
})

export default workspaceRootNodeProducer
