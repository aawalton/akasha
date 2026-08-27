import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../../../../../repo/scope/scope.ts"
import { CONF_FILE_NODE_TYPE, type ConfFileAttrs } from "./types.ts"

export const classifyConfFile = (relPath: string): NodeInit<"conf-file", ConfFileAttrs> => ({
  type: CONF_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
