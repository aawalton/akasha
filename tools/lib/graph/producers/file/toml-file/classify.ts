import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import { TOML_FILE_NODE_TYPE, type TomlFileAttrs } from "./types.ts"

export const classifyTomlFile = (relPath: string): NodeInit<"toml-file", TomlFileAttrs> => ({
  type: TOML_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
