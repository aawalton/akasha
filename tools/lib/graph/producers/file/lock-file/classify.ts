import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../../../../../repo/scope/scope.ts"
import { LOCK_FILE_NODE_TYPE, type LockFileAttrs } from "./types.ts"

export const classifyLockFile = (relPath: string): NodeInit<"lock-file", LockFileAttrs> => ({
  type: LOCK_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
