import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import { SQL_FILE_NODE_TYPE, type SqlFileAttrs } from "./types.ts"

export const classifySqlFile = (relPath: string): NodeInit<"sql-file", SqlFileAttrs> => ({
  type: SQL_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
