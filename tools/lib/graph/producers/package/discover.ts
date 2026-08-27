import { z } from "zod"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext } from "../../types.ts"
import { toBinCommands } from "../lib/bin-commands.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { repoFiles } from "../lib/repo-files.ts"
import { repoTree } from "../lib/repo-tree.ts"
import { workspaceDirsAt } from "../lib/workspace-dirs.ts"
import { readTsconfigTypeRefs } from "./config-scanners.ts"
import { commandNamesFromScript, extractPackageName } from "./scanner-helpers.ts"
import { walkWorkspaceForUsage } from "./scanners.ts"
import { type PackageData, type PkgDependsKind, ROOT_PACKAGE_KEY, type TstlData } from "./types.ts"

const stringRecord = z.record(z.string(), z.string())

const PackageJsonSchema = z
  .object({
    name: z.string().optional(),
    workspaces: z.array(z.string()).optional(),
    dependencies: stringRecord.optional(),
    devDependencies: stringRecord.optional(),
    peerDependencies: stringRecord.optional(),
    optionalDependencies: stringRecord.optional(),
    exports: z.unknown().optional(),
    bin: z.unknown().optional(),
    scripts: stringRecord.optional(),
  })
  .passthrough()

const toStringRecordExports = (value: unknown): Record<string, string> | null => {
  if (value === null || value === undefined || typeof value !== "object") return null
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(value)) {
    if (typeof v !== "string") return null
    out[k] = v
  }
  return out
}

const TsconfigSchema = z
  .object({
    references: z.array(z.object({ path: z.string() }).passthrough()).optional(),
    tstl: z.unknown().optional(),
  })
  .passthrough()

const TstlBlockSchema = z
  .object({
    luaBundleEntry: z.unknown().optional(),
    luaPlugins: z.unknown().optional(),
  })
  .passthrough()

const TstlPluginEntrySchema = z.object({ name: z.string() }).passthrough()

const toTstlData = (value: unknown): TstlData | null => {
  const parsed = TstlBlockSchema.safeParse(value)
  if (!parsed.success) return null
  const { luaBundleEntry, luaPlugins } = parsed.data
  const bundleEntry = typeof luaBundleEntry === "string" ? luaBundleEntry : null
  const plugins: string[] = []
  if (Array.isArray(luaPlugins)) {
    for (const entry of luaPlugins) {
      const entryParsed = TstlPluginEntrySchema.safeParse(entry)
      if (entryParsed.success) plugins.push(entryParsed.data.name)
    }
  }
  return { bundleEntry, plugins }
}

const DEP_KINDS: readonly PkgDependsKind[] = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
]

const under = (path: string, name: string): string => (path === "" ? name : `${path}/${name}`)

export const discoverPackages = (ctx: BuildContext): readonly PackageData[] => {
  const rootRaw = readRepoFile(ctx, CODE_REPO, "package.json")
  if (rootRaw === null) {
    throw new Error(`graph: the snapshot holds no package.json for the ${CODE_REPO} repository`)
  }
  const rootPkg = PackageJsonSchema.parse(JSON.parse(rootRaw))
  const workspaces = workspaceDirsAt(ctx, CODE_REPO)
  const tree = repoTree(ctx, CODE_REPO)
  const paths = repoFiles(ctx, CODE_REPO, { includeFixtures: true, includeGenerated: true })

  type RawWorkspace = {
    readonly name: string
    readonly path: string
    readonly pkg: z.infer<typeof PackageJsonSchema>
  }
  const raws: RawWorkspace[] = []
  for (const wsPath of workspaces) {
    const raw = readRepoFile(ctx, CODE_REPO, under(wsPath, "package.json"))
    if (raw === null) continue
    let pkg: z.infer<typeof PackageJsonSchema>
    try {
      pkg = PackageJsonSchema.parse(JSON.parse(raw))
    } catch {
      continue
    }
    if (pkg.name === undefined) continue
    raws.push({ name: pkg.name, path: wsPath, pkg })
  }

  raws.push({
    name: rootPkg.name ?? ROOT_PACKAGE_KEY,
    path: "",
    pkg: rootPkg,
  })

  const workspaceNames = new Set(raws.map((r) => r.name))
  const allWorkspacePaths = new Set(raws.map((r) => r.path))

  const data: PackageData[] = []
  for (const raw of raws) {
    const dependencies = new Map<string, PkgDependsKind>()
    const externalDependencies = new Map<string, Set<PkgDependsKind>>()
    for (const kind of DEP_KINDS) {
      const entries = raw.pkg[kind] ?? {}
      for (const depName of Object.keys(entries)) {
        if (workspaceNames.has(depName)) {
          if (!dependencies.has(depName)) {
            dependencies.set(depName, kind)
          }
        } else {
          let kinds = externalDependencies.get(depName)
          if (kinds === undefined) {
            kinds = new Set<PkgDependsKind>()
            externalDependencies.set(depName, kinds)
          }
          kinds.add(kind)
        }
      }
    }

    const tsconfigPath = under(raw.path, "tsconfig.json")
    const hasTsconfig = tree.hasFile(tsconfigPath)
    let tsconfigRefPaths: readonly string[] = []
    let tstl: TstlData | null = null
    let tsconfigSpecifiers: readonly string[] = []
    if (hasTsconfig) {
      const rawTsconfig = readRepoFile(ctx, CODE_REPO, tsconfigPath)
      try {
        if (rawTsconfig === null) throw new Error("unreadable")
        const tsconfig = TsconfigSchema.parse(JSON.parse(rawTsconfig))
        tsconfigRefPaths = (tsconfig.references ?? []).map((r) => r.path)
        tstl = toTstlData(tsconfig.tstl)
      } catch {
        tsconfigRefPaths = []
        tstl = null
      }
      const refs = readTsconfigTypeRefs(ctx, CODE_REPO, tsconfigPath)
      if (refs.luaPlugins.length > 0) {
        tstl = { bundleEntry: tstl?.bundleEntry ?? null, plugins: refs.luaPlugins }
      }
      const acc = new Set<string>()
      for (const t of refs.types) {
        acc.add(t)
        const pkg = extractPackageName(t)
        if (pkg !== null && pkg !== t) acc.add(pkg)
      }
      for (const p of refs.plugins) {
        acc.add(p)
        const pkg = extractPackageName(p)
        if (pkg !== null && pkg !== p) acc.add(pkg)
      }
      tsconfigSpecifiers = [...acc]
    }

    const otherWorkspaceRoots = new Set<string>()
    for (const otherPath of allWorkspacePaths) {
      if (otherPath !== raw.path) otherWorkspaceRoots.add(otherPath)
    }
    const usage = walkWorkspaceForUsage(ctx, CODE_REPO, paths, raw.path, otherWorkspaceRoots)

    const allCommands = new Set<string>(usage.commandUsages)
    const scripts = raw.pkg.scripts ?? {}
    for (const body of Object.values(scripts)) {
      for (const c of commandNamesFromScript(body)) allCommands.add(c)
    }
    const commandUsages = [...allCommands].sort()

    const allSpecifiers = new Set<string>(usage.nonTsSpecifiers)
    for (const s of tsconfigSpecifiers) allSpecifiers.add(s)
    const nonTsSpecifiers = [...allSpecifiers].sort()

    const srcDir = under(raw.path, "src")
    const sourceRoot = tree.hasDir(srcDir) ? srcDir : raw.path

    data.push({
      name: raw.name,
      path: raw.path,
      dependencies,
      externalDependencies,
      hasTsconfig,
      tsconfigRefPaths,
      exports: toStringRecordExports(raw.pkg.exports),
      binCommands: toBinCommands(raw.pkg.bin, raw.name),
      commandUsages,
      nonTsSpecifiers,
      configFileProtocols: usage.configFileProtocols,
      configFileNames: usage.configFileNames,
      sourceRoot,
      tstl,
    })
  }
  return data
}
