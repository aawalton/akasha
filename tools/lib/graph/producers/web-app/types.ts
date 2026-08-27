import type { Repo } from "../../../../../page/document/types.ts"

export type WebAppAttrs = {
  readonly name: string
}

export type WebApp = {
  readonly name: string
  readonly repo: Repo
}

export type WebAppNodeType = "web-app"
export const WEB_APP_NODE_TYPE: WebAppNodeType = "web-app"

export type WebAppBuiltFromEdgeType = "web-app-built-from"
export const WEB_APP_BUILT_FROM_EDGE_TYPE: WebAppBuiltFromEdgeType = "web-app-built-from"

export type WebAppBuiltFromAttrs = Record<string, never>

export type WebAppEntryEdgeType = "web-app-entry"
export const WEB_APP_ENTRY_EDGE_TYPE: WebAppEntryEdgeType = "web-app-entry"

export type WebAppEntryKind = "framework-entry" | "route-module" | "server-entry"

export type WebAppEntryAttrs = {
  readonly kind: WebAppEntryKind
  readonly specifier: string | null
}

export type WebAppPublicEdgeType = "web-app-public"
export const WEB_APP_PUBLIC_EDGE_TYPE: WebAppPublicEdgeType = "web-app-public"

export type WebAppPublicAttrs = Record<string, never>

export type WebAppBuildConfigEdgeType = "web-app-build-config"
export const WEB_APP_BUILD_CONFIG_EDGE_TYPE: WebAppBuildConfigEdgeType = "web-app-build-config"

export type WebAppBuildConfigAttrs = Record<string, never>
