import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../../../../../repo/scope/scope.ts"
import { ENV_FILE_NODE_TYPE, type EnvFileAttrs } from "./types.ts"

export const classifyEnvFile = (relPath: string): NodeInit<"env-file", EnvFileAttrs> => ({
  type: ENV_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
