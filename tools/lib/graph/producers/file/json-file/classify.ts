import type { Repo } from "../../../../../../page/document/types.ts"
import type { NodeInit } from "../../../types.ts"
import { JSON_FILE_NODE_TYPE, type JsonFileAttrs } from "./types.ts"

export const classifyJsonFile = (
  relPath: string,
  repo: Repo
): NodeInit<"json-file", JsonFileAttrs> => ({
  type: JSON_FILE_NODE_TYPE,
  repo,
  key: relPath,
  attrs: { path: relPath },
})
