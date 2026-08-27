import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import { IGNORE_FILE_NODE_TYPE, type IgnoreFileAttrs } from "./types.ts"

export const classifyIgnoreFile = (relPath: string): NodeInit<"ignore-file", IgnoreFileAttrs> => ({
  type: IGNORE_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
