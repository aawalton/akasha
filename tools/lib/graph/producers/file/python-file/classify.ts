import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import { PYTHON_FILE_NODE_TYPE, type PythonFileAttrs } from "./types.ts"

export const classifyPythonFile = (relPath: string): NodeInit<"python-file", PythonFileAttrs> => ({
  type: PYTHON_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
