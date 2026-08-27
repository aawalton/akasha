import { z } from "zod"

export const LOCKFILE_PACKAGE_NODE_TYPE = "lockfile-package"
export const LOCKFILE_RESOLVES_EDGE_TYPE = "lockfile-resolves"
export const LOCKFILE_DEPENDS_EDGE_TYPE = "lockfile-depends"

export const lockfilePackageKey = (name: string, version: string): string => `${name}@${version}`

export type WorkspaceDepKind =
  | "dependencies"
  | "devDependencies"
  | "peerDependencies"
  | "optionalDependencies"

export type LockfileDepKind =
  | "dependencies"
  | "peerDependencies"
  | "optionalDependencies"
  | "optionalPeer"

export type DeclaredDep = {
  readonly name: string
  readonly kind: "dependencies" | "peerDependencies" | "optionalDependencies"
  readonly range: string
}

export type LockfilePackageAttrs = {
  readonly name: string
  readonly version: string
  readonly integrity: string
  readonly declaredDeps: readonly DeclaredDep[]
  readonly declaredOptionalPeers: readonly string[]
  readonly binCommands: readonly string[]
  readonly os: readonly string[]
  readonly cpu: readonly string[]
}

export type LockfileResolvesAttrs = {
  readonly kind: WorkspaceDepKind
  readonly range: string
}

export type LockfileDependsAttrs = {
  readonly kind: LockfileDepKind
  readonly range: string | null
}

export type LockfilePackageData = {
  readonly name: string
  readonly version: string
  readonly integrity: string
  readonly declaredDeps: readonly DeclaredDep[]
  readonly declaredOptionalPeers: readonly string[]
  readonly binCommands: readonly string[]
  readonly os: readonly string[]
  readonly cpu: readonly string[]
}

export type LockfileEntry = {
  readonly pathKey: string
  readonly name: string
  readonly version: string
  readonly declaredDeps: readonly DeclaredDep[]
  readonly declaredOptionalPeers: readonly string[]
}

export type WorkspaceResolution = {
  readonly workspaceName: string
  readonly depName: string
  readonly kind: WorkspaceDepKind
  readonly range: string
  readonly resolvedVersion: string
}

const declaredDepSchema = z.object({
  name: z.string(),
  kind: z.enum(["dependencies", "peerDependencies", "optionalDependencies"]),
  range: z.string(),
})

export const LockfilePackageAttrsSchema = z
  .object({
    name: z.string(),
    version: z.string(),
    integrity: z.string(),
    declaredDeps: z.array(declaredDepSchema).readonly(),
    declaredOptionalPeers: z.array(z.string()).readonly(),
    binCommands: z.array(z.string()).readonly(),
    os: z.array(z.string()).readonly(),
    cpu: z.array(z.string()).readonly(),
  })
  .passthrough()

export const LockfileResolvesAttrsSchema = z
  .object({
    kind: z.enum(["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]),
    range: z.string(),
  })
  .passthrough()

export const LockfileDependsAttrsSchema = z
  .object({
    kind: z.enum(["dependencies", "peerDependencies", "optionalDependencies", "optionalPeer"]),
    range: z.union([z.string(), z.null()]),
  })
  .passthrough()
