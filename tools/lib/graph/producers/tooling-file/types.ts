import { BIOME_CONFIG_FILE_NODE_TYPE } from "../file/biome-config-file/types.ts"
import { IGNORE_FILE_NODE_TYPE } from "../file/ignore-file/types.ts"
import { SOPS_CONFIG_FILE_NODE_TYPE } from "../file/sops-config-file/types.ts"
import { TSCONFIG_FILE_NODE_TYPE } from "../file/tsconfig-file/types.ts"
import { TOML_FILE_NODE_TYPE } from "../file/toml-file/types.ts"

export type PkgCarriesToolingAttrs = Record<string, never>

export type PkgCarriesToolingEdgeType = "pkg-carries-tooling"

export const PKG_CARRIES_TOOLING_EDGE_TYPE: PkgCarriesToolingEdgeType = "pkg-carries-tooling"

export const TOOLING_FILE_NODE_TYPES: readonly string[] = [
  BIOME_CONFIG_FILE_NODE_TYPE,
  IGNORE_FILE_NODE_TYPE,
  SOPS_CONFIG_FILE_NODE_TYPE,
  TOML_FILE_NODE_TYPE,
  TSCONFIG_FILE_NODE_TYPE,
]
