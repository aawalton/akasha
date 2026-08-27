export type TemperAddonAttrs = {
  readonly name: string
  readonly path: string
}

export type TemperAddonNodeType = "temper-addon"
export const TEMPER_ADDON_NODE_TYPE: TemperAddonNodeType = "temper-addon"

export type TemperAddonBuiltFromEdgeType = "temper-addon-built-from"
export const TEMPER_ADDON_BUILT_FROM_EDGE_TYPE: TemperAddonBuiltFromEdgeType =
  "temper-addon-built-from"

export type TemperAddonBuiltFromAttrs = Record<string, never>

export type AddonCarriesFileEdgeType = "addon-carries-file"
export const ADDON_CARRIES_FILE_EDGE_TYPE: AddonCarriesFileEdgeType = "addon-carries-file"

export type AddonCarriesFileAttrs = {
  readonly kind: string
  readonly path: string
}

export type AddonTsconfigEdgeType = "addon-tsconfig"
export const ADDON_TSCONFIG_EDGE_TYPE: AddonTsconfigEdgeType = "addon-tsconfig"

export type AddonTsconfigAttrs = {
  readonly path: string
}

export type AddonManifestEdgeType = "addon-manifest"
export const ADDON_MANIFEST_EDGE_TYPE: AddonManifestEdgeType = "addon-manifest"

export type AddonManifestAttrs = {
  readonly path: string
}

export type AddonCompilesFileEdgeType = "addon-compiles-file"
export const ADDON_COMPILES_FILE_EDGE_TYPE: AddonCompilesFileEdgeType = "addon-compiles-file"

export type AddonCompilesFileAttrs = Record<string, never>
