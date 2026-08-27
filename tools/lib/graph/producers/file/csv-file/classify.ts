import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../../../../../repo/scope/scope.ts"
import { CSV_FILE_NODE_TYPE, type CsvFileAttrs } from "./types.ts"

export const classifyCsvFile = (relPath: string): NodeInit<"csv-file", CsvFileAttrs> => ({
  type: CSV_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
