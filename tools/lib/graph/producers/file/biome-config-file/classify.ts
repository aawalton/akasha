import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../../../../../repo/scope/scope.ts"
import { BIOME_CONFIG_FILE_NODE_TYPE, type BiomeConfigFileAttrs } from "./types.ts"

export const classifyBiomeConfigFile = (
  relPath: string
): NodeInit<"biome-config-file", BiomeConfigFileAttrs> => ({
  type: BIOME_CONFIG_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
