import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import { TSCONFIG_FILE_NODE_TYPE, type TsconfigFileAttrs } from "./types.ts"

export const classifyTsconfigFile = (
  relPath: string
): NodeInit<"tsconfig-file", TsconfigFileAttrs> => ({
  type: TSCONFIG_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
