export type IosAppAttrs = {
  readonly name: string
}

export type IosAppSources = {
  readonly name: string
  readonly nativeShellRepoPath: string | null
  readonly capacitorConfigRepoPath: string | null
  readonly sharedWidgetRepoPath: string | null
  readonly ownWidgetRepoPath: string | null
  readonly seamScript: string | null
  readonly simBuildScript: string | null
  readonly entitlementsRepoPath: string | null
  readonly iconRepoPath: string | null
  readonly wwwStageScript: string | null
  readonly webDirRepoPath: string | null
  readonly spaSourceRepoPath: string | null
}

export type IosAppNodeType = "ios-app"
export const IOS_APP_NODE_TYPE: IosAppNodeType = "ios-app"

export type IosAppNativeShellEdgeType = "ios-app-native-shell"
export const IOS_APP_NATIVE_SHELL_EDGE_TYPE: IosAppNativeShellEdgeType = "ios-app-native-shell"

export type IosAppSpaSourceEdgeType = "ios-app-spa-source"
export const IOS_APP_SPA_SOURCE_EDGE_TYPE: IosAppSpaSourceEdgeType = "ios-app-spa-source"

export type IosAppNativeShellAttrs = Record<string, never>

export type IosAppSpaSourceAttrs = Record<string, never>
