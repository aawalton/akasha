import { posix } from "node:path"

export type BiomeConfigFileAttrs = {
  readonly path: string
}

export type BiomeConfigFileNodeType = "biome-config-file"

export const BIOME_CONFIG_FILE_NODE_TYPE: BiomeConfigFileNodeType = "biome-config-file"

export const isBiomeConfigPath = (relPath: string): boolean =>
  posix.basename(relPath) === "biome.json"
