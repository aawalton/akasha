import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import { SOPS_CONFIG_FILE_NODE_TYPE, type SopsConfigFileAttrs } from "./types.ts"

export const classifySopsConfigFile = (
  relPath: string
): NodeInit<"sops-config-file", SopsConfigFileAttrs> => ({
  type: SOPS_CONFIG_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
