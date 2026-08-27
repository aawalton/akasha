import { z } from "zod"
import { nodeId, nodeIdPrefix } from "../lib/node-id.ts"

export type PackageAttrs = {
  readonly name: string
  readonly path: string
  readonly exports: Record<string, string> | null
  readonly hasTsconfig: boolean
  readonly binCommands: readonly string[]
  readonly commandUsages: readonly string[]
  readonly nonTsSpecifiers: readonly string[]
  readonly configFileProtocols: readonly string[]
  readonly configFileNames: readonly string[]
  readonly sourceRoot: string
  readonly dependencies: Record<string, PkgDependsKind>
  readonly externalDependencies: Record<string, readonly PkgDependsKind[]>
  readonly tsconfigRefPaths: readonly string[]
  readonly tstl: TstlData | null
}

export type PkgDependsKind =
  | "dependencies"
  | "devDependencies"
  | "peerDependencies"
  | "optionalDependencies"

export type PkgDependsAttrs = {
  readonly kind: PkgDependsKind
}

export type PackageNodeType = "package"
export type WorkspaceRootNodeType = "workspace-root"
export type PkgDependsEdgeType = "pkg-depends"
export type TsconfigRefEdgeType = "tsconfig-ref"
export type PkgContainsFileEdgeType = "pkg-contains-file"
export type FileInPkgEdgeType = "file-in-pkg"

export const PACKAGE_NODE_TYPE: PackageNodeType = "package"
export const WORKSPACE_ROOT_NODE_TYPE: WorkspaceRootNodeType = "workspace-root"
export const PKG_DEPENDS_EDGE_TYPE: PkgDependsEdgeType = "pkg-depends"
export const TSCONFIG_REF_EDGE_TYPE: TsconfigRefEdgeType = "tsconfig-ref"
export const PKG_CONTAINS_FILE_EDGE_TYPE: PkgContainsFileEdgeType = "pkg-contains-file"
export const FILE_IN_PKG_EDGE_TYPE: FileInPkgEdgeType = "file-in-pkg"

export const ROOT_PACKAGE_KEY = "<root>"

export const ROOT_MANIFEST_NAME = "package.json"

export type WorkspaceRootAttrs = {
  readonly path: string
}

export const WorkspaceRootAttrsSchema = z.object({ path: z.string() }).passthrough()

export const PACKAGE_NODE_ID_PREFIX = nodeIdPrefix(PACKAGE_NODE_TYPE)

export const packageNodeId = (name: string): string => nodeId(PACKAGE_NODE_TYPE, name)

export const packageNodeIdToWorkspaceName = (id: string): string | null =>
  id.startsWith(PACKAGE_NODE_ID_PREFIX) ? id.slice(PACKAGE_NODE_ID_PREFIX.length) : null

export type TsconfigRefAttrs = Record<string, never>

export type PkgContainsFileAttrs = Record<string, never>

export type FileInPkgAttrs = Record<string, never>

export type TstlBundleEntryAttrs = {
  readonly specifier: string
  readonly resolved: string | null
}

export type TstlPluginAttrs = {
  readonly specifier: string
  readonly resolved: string | null
  readonly index: number
}

export type TstlBundleEntryEdgeType = "tstl-bundle-entry"
export type TstlPluginEdgeType = "tstl-plugin"

export const TSTL_BUNDLE_ENTRY_EDGE_TYPE: TstlBundleEntryEdgeType = "tstl-bundle-entry"
export const TSTL_PLUGIN_EDGE_TYPE: TstlPluginEdgeType = "tstl-plugin"

export type TstlData = {
  readonly bundleEntry: string | null
  readonly plugins: readonly string[]
}

export type PackageData = {
  readonly name: string
  readonly path: string
  readonly dependencies: ReadonlyMap<string, PkgDependsKind>
  readonly externalDependencies: ReadonlyMap<string, ReadonlySet<PkgDependsKind>>
  readonly hasTsconfig: boolean
  readonly tsconfigRefPaths: readonly string[]
  readonly exports: Record<string, string> | null
  readonly binCommands: readonly string[]
  readonly commandUsages: readonly string[]
  readonly nonTsSpecifiers: readonly string[]
  readonly configFileProtocols: readonly string[]
  readonly configFileNames: readonly string[]
  readonly sourceRoot: string
  readonly tstl: TstlData | null
}

const PkgDependsKindSchema = z.enum([
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
])

const TstlDataSchema = z
  .object({
    bundleEntry: z.string().nullable(),
    plugins: z.array(z.string()).readonly(),
  })
  .passthrough()

export const PackageAttrsSchema: z.ZodType<PackageAttrs> = z
  .object({
    name: z.string(),
    path: z.string(),
    exports: z.record(z.string(), z.string()).nullable(),
    hasTsconfig: z.boolean(),
    binCommands: z.array(z.string()).readonly(),
    commandUsages: z.array(z.string()).readonly(),
    nonTsSpecifiers: z.array(z.string()).readonly(),
    configFileProtocols: z.array(z.string()).readonly(),
    configFileNames: z.array(z.string()).readonly(),
    sourceRoot: z.string(),
    dependencies: z.record(z.string(), PkgDependsKindSchema),
    externalDependencies: z.record(z.string(), z.array(PkgDependsKindSchema).readonly()),
    tsconfigRefPaths: z.array(z.string()).readonly(),
    tstl: TstlDataSchema.nullable(),
  })
  .passthrough()

export const PkgDependsAttrsSchema = z
  .object({
    kind: z.enum(["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]),
  })
  .passthrough()

export const PkgContainsFileAttrsSchema = z.object({}).passthrough()
