import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../../../../../repo/scope/scope.ts"
import { SWIFT_FILE_NODE_TYPE, type SwiftFileAttrs } from "./types.ts"

export const classifySwiftFile = (relPath: string): NodeInit<"swift-file", SwiftFileAttrs> => ({
  type: SWIFT_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
