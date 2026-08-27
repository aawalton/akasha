import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../../../../../repo/scope/scope.ts"
import { TXT_FILE_NODE_TYPE, type TxtFileAttrs } from "./types.ts"

export const classifyTxtFile = (relPath: string): NodeInit<"txt-file", TxtFileAttrs> => ({
  type: TXT_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
