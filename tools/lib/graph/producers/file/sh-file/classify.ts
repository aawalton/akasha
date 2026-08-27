import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../../../../../repo/scope/scope.ts"
import { SH_FILE_NODE_TYPE, type ShFileAttrs } from "./types.ts"

export const classifyShFile = (relPath: string): NodeInit<"sh-file", ShFileAttrs> => ({
  type: SH_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
