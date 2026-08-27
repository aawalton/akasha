import { z } from "zod"
import type { Repo } from "../../../../../page/document/types.ts"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext } from "../../types.ts"
import { toBinCommands } from "../lib/bin-commands.ts"
import { repoFiles } from "../lib/repo-files.ts"
import { ROOT_PACKAGE_KEY } from "../package/types.ts"
import type {
  DeclaredDep,
  LockfileEntry,
  LockfilePackageData,
  WorkspaceDepKind,
  WorkspaceResolution,
} from "./types.ts"

export const LOCKFILE_PATH = "bun.lock"

const stringRecord = z.record(z.string(), z.string())

const PackageMetadataSchema = z
  .object({
    dependencies: stringRecord.optional(),
    peerDependencies: stringRecord.optional(),
    optionalDependencies: stringRecord.optional(),
    optionalPeers: z.array(z.string()).optional(),
    bin: z.unknown().optional(),
    os: z.union([z.string(), z.array(z.string())]).optional(),
    cpu: z.union([z.string(), z.array(z.string())]).optional(),
  })
  .passthrough()

const PackageEntrySchema = z.array(z.unknown())

const WorkspaceEntrySchema = z
  .object({
    name: z.string().optional(),
    version: z.string().optional(),
    dependencies: stringRecord.optional(),
    devDependencies: stringRecord.optional(),
    peerDependencies: stringRecord.optional(),
    optionalDependencies: stringRecord.optional(),
  })
  .passthrough()

const BunLockSchema = z
  .object({
    workspaces: z.record(z.string(), WorkspaceEntrySchema).optional(),
    packages: z.record(z.string(), PackageEntrySchema).optional(),
  })
  .passthrough()

type BunLock = z.infer<typeof BunLockSchema>

const stripTrailingCommas = (text: string): string => {
  const out: string[] = []
  let inString = false
  for (let i = 0; i < text.length; i++) {
    const ch = text.charAt(i)
    if (inString) {
      out.push(ch)
      if (ch === "\\") {
        i++
        if (i < text.length) out.push(text.charAt(i))
        continue
      }
      if (ch === '"') inString = false
      continue
    }
    if (ch === '"') {
      inString = true
      out.push(ch)
      continue
    }
    if (ch === ",") {
      let j = i + 1
      while (j < text.length) {
        const next = text.charAt(j)
        if (next === " " || next === "\t" || next === "\n" || next === "\r") {
          j++
          continue
        }
        break
      }
      const next = text.charAt(j)
      if (next === "}" || next === "]") continue
      out.push(ch)
      continue
    }
    out.push(ch)
  }
  return out.join("")
}

const readBunLock = (ctx: BuildContext, repo: Repo): BunLock | null => {
  const text = readRepoFile(ctx, repo, LOCKFILE_PATH)
  if (text === null) return null
  return BunLockSchema.parse(JSON.parse(stripTrailingCommas(text)))
}

export const lockfileRepos = (ctx: BuildContext): readonly Repo[] =>
  [...ctx.repoRoots.keys()].filter((repo) => repoFiles(ctx, repo).includes(LOCKFILE_PATH))

const parseNameVersion = (specifier: string): { name: string; version: string } | undefined => {
  const lastAt = specifier.lastIndexOf("@")
  if (lastAt <= 0) return undefined
  const version = specifier.slice(lastAt + 1)
  if (version.startsWith("workspace:")) return undefined
  const name = specifier.slice(0, lastAt)
  if (name.length === 0) return undefined
  return { name, version }
}

const toStringArray = (value: unknown): readonly string[] => {
  if (value === undefined || value === null) return []
  if (typeof value === "string") return [value]
  if (Array.isArray(value)) {
    const out: string[] = []
    for (const v of value) {
      if (typeof v === "string") out.push(v)
    }
    return [...out].sort()
  }
  return []
}

const collectDeclaredDeps = (
  meta: z.infer<typeof PackageMetadataSchema>
): readonly DeclaredDep[] => {
  const out: DeclaredDep[] = []
  for (const [name, range] of Object.entries(meta.dependencies ?? {})) {
    out.push({ name, kind: "dependencies", range })
  }
  for (const [name, range] of Object.entries(meta.peerDependencies ?? {})) {
    out.push({ name, kind: "peerDependencies", range })
  }
  for (const [name, range] of Object.entries(meta.optionalDependencies ?? {})) {
    out.push({ name, kind: "optionalDependencies", range })
  }
  out.sort((a, b) => {
    if (a.kind !== b.kind) return a.kind.localeCompare(b.kind)
    return a.name.localeCompare(b.name)
  })
  return out
}

export const discoverLockfilePackages = (
  ctx: BuildContext,
  repo: Repo
): readonly LockfilePackageData[] => {
  const lock = readBunLock(ctx, repo)
  if (lock === null) return []
  const byKey = new Map<string, LockfilePackageData>()

  for (const entry of Object.values(lock.packages ?? {})) {
    if (entry.length < 4) continue
    const [specifier, _registry, metaRaw, integrityRaw] = entry
    if (typeof specifier !== "string") continue
    const parsed = parseNameVersion(specifier)
    if (parsed === undefined) continue
    const integrity = typeof integrityRaw === "string" ? integrityRaw : ""
    if (integrity === "") continue
    const meta = PackageMetadataSchema.parse(metaRaw ?? {})
    const data: LockfilePackageData = {
      name: parsed.name,
      version: parsed.version,
      integrity,
      declaredDeps: collectDeclaredDeps(meta),
      declaredOptionalPeers: [...(meta.optionalPeers ?? [])].sort(),
      binCommands: toBinCommands(meta.bin, parsed.name),
      os: toStringArray(meta.os),
      cpu: toStringArray(meta.cpu),
    }
    const key = `${data.name}@${data.version}`
    if (!byKey.has(key)) byKey.set(key, data)
  }

  const out = [...byKey.values()]
  out.sort((a, b) => {
    if (a.name !== b.name) return a.name.localeCompare(b.name)
    return a.version.localeCompare(b.version)
  })
  return out
}

export const resolveDepViaPathKey = (
  index: ReadonlyMap<string, { readonly name: string; readonly version: string }>,
  parentPathKey: string,
  depName: string
): { readonly name: string; readonly version: string } | undefined => {
  const pathKeyed = index.get(`${parentPathKey}/${depName}`)
  if (pathKeyed !== undefined) return pathKeyed
  return index.get(depName)
}

const buildPathKeyIndex = (lock: BunLock): Map<string, { name: string; version: string }> => {
  const index = new Map<string, { name: string; version: string }>()
  for (const [pathKey, entry] of Object.entries(lock.packages ?? {})) {
    if (entry.length < 4) continue
    const specifier = entry[0]
    if (typeof specifier !== "string") continue
    const parsed = parseNameVersion(specifier)
    if (parsed === undefined) continue
    const integrity = entry[3]
    if (typeof integrity !== "string" || integrity === "") continue
    index.set(pathKey, parsed)
  }
  return index
}

export const discoverWorkspaceResolutions = (
  ctx: BuildContext,
  repo: Repo
): readonly WorkspaceResolution[] => {
  const lock = readBunLock(ctx, repo)
  if (lock === null) return []
  const index = buildPathKeyIndex(lock)

  const KINDS: readonly WorkspaceDepKind[] = [
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "optionalDependencies",
  ]
  const out: WorkspaceResolution[] = []
  for (const [wsPath, wsEntry] of Object.entries(lock.workspaces ?? {})) {
    const workspaceName = wsEntry.name ?? (wsPath === "" ? ROOT_PACKAGE_KEY : undefined)
    if (workspaceName === undefined) continue
    for (const kind of KINDS) {
      const entries = wsEntry[kind] ?? {}
      for (const [depName, range] of Object.entries(entries)) {
        if (range.startsWith("workspace:")) continue
        const resolved = resolveDepViaPathKey(index, workspaceName, depName)
        if (resolved === undefined) continue
        out.push({ workspaceName, depName, kind, range, resolvedVersion: resolved.version })
      }
    }
  }
  out.sort((a, b) => {
    if (a.workspaceName !== b.workspaceName) return a.workspaceName.localeCompare(b.workspaceName)
    if (a.depName !== b.depName) return a.depName.localeCompare(b.depName)
    return a.kind.localeCompare(b.kind)
  })
  return out
}

export const discoverLockfileEntries = (
  ctx: BuildContext,
  repo: Repo
): readonly LockfileEntry[] => {
  const lock = readBunLock(ctx, repo)
  if (lock === null) return []
  const out: LockfileEntry[] = []
  for (const [pathKey, entry] of Object.entries(lock.packages ?? {})) {
    if (entry.length < 4) continue
    const [specifier, _registry, metaRaw, integrityRaw] = entry
    if (typeof specifier !== "string") continue
    const parsed = parseNameVersion(specifier)
    if (parsed === undefined) continue
    const integrity = typeof integrityRaw === "string" ? integrityRaw : ""
    if (integrity === "") continue
    const meta = PackageMetadataSchema.parse(metaRaw ?? {})
    out.push({
      pathKey,
      name: parsed.name,
      version: parsed.version,
      declaredDeps: collectDeclaredDeps(meta),
      declaredOptionalPeers: [...(meta.optionalPeers ?? [])].sort(),
    })
  }
  out.sort((a, b) => a.pathKey.localeCompare(b.pathKey))
  return out
}
