import { posix } from "node:path"
import { z } from "zod"
import type { Repo } from "../../../../../page/document/types.ts"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext } from "../../types.ts"
import { scanConfigFile } from "./config-scanners.ts"
import { commandNamesFromScript } from "./scanner-helpers.ts"

const DOCKERFILE_DIRECTIVE_MATCH_SCHEMA = z
  .tuple([z.string(), z.string(), z.string()])
  .rest(z.unknown())
const JSON_ARRAY_SCHEMA = z.array(z.unknown())

const SKIP_DIRS: ReadonlySet<string> = new Set([
  "node_modules",
  ".next",
  "dist",
  ".turbo",
  "_generated",
  "__fixtures__",
  ".git",
])

const TS_JS_EXTS: ReadonlySet<string> = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"])

const CONFIG_STEMS: ReadonlySet<string> = new Set([
  "next.config",
  "postcss.config",
  "tailwind.config",
  "eslint.config",
  "vitest.config",
  "drizzle.config",
  "bunfig",
])

export type WorkspaceUsageData = {
  readonly commandUsages: readonly string[]
  readonly nonTsSpecifiers: readonly string[]
  readonly configFileProtocols: readonly string[]
  readonly configFileNames: readonly string[]
}

type FileBuckets = {
  readonly configFiles: readonly string[]
  readonly dockerfiles: readonly string[]
  readonly yamlFiles: readonly string[]
  readonly shellScripts: readonly string[]
}

const isUnder = (relPath: string, rootRel: string): boolean =>
  rootRel === "" || relPath === rootRel || relPath.startsWith(`${rootRel}/`)

const below = (relPath: string, rootRel: string): string =>
  rootRel === "" ? relPath : relPath.slice(rootRel.length + 1)

const ownedByAnotherWorkspace = (
  relPath: string,
  rootRel: string,
  otherWorkspaceRoots: ReadonlySet<string>
): boolean => {
  const segments = below(relPath, rootRel).split("/")
  let prefix = rootRel
  for (let i = 0; i < segments.length - 1; i++) {
    prefix = prefix === "" ? (segments[i] ?? "") : `${prefix}/${segments[i]}`
    if (otherWorkspaceRoots.has(prefix)) return true
  }
  return false
}

const skipsAnySegment = (relPath: string, rootRel: string): boolean => {
  const segments = below(relPath, rootRel).split("/")
  for (let i = 0; i < segments.length - 1; i++) {
    const segment = segments[i]
    if (segment !== undefined && SKIP_DIRS.has(segment)) return true
  }
  return false
}

const collectWorkspaceFiles = (
  paths: readonly string[],
  rootRel: string,
  otherWorkspaceRoots: ReadonlySet<string>
): FileBuckets => {
  const configFiles: string[] = []
  const dockerfiles: string[] = []
  const yamlFiles: string[] = []
  const shellScripts: string[] = []

  for (const relPath of paths) {
    if (!isUnder(relPath, rootRel)) continue
    if (skipsAnySegment(relPath, rootRel)) continue
    if (ownedByAnotherWorkspace(relPath, rootRel, otherWorkspaceRoots)) continue

    const name = posix.basename(relPath)
    if (SKIP_DIRS.has(name)) continue
    const dot = name.lastIndexOf(".")
    const ext = dot === -1 ? "" : name.slice(dot)

    if (name === "Dockerfile" || name.startsWith("Dockerfile.") || name.endsWith(".dockerfile")) {
      dockerfiles.push(relPath)
      continue
    }
    if (ext === ".yaml" || ext === ".yml") {
      yamlFiles.push(relPath)
      continue
    }
    if (ext === ".sh" || ext === ".bash") {
      shellScripts.push(relPath)
      continue
    }
    if (TS_JS_EXTS.has(ext)) {
      if (below(relPath, rootRel).includes("/")) continue
      const stem = name.slice(0, dot)
      if (CONFIG_STEMS.has(stem)) {
        configFiles.push(relPath)
        continue
      }
      if (stem.endsWith(".config")) {
        configFiles.push(relPath)
      }
    }
  }
  return { configFiles, dockerfiles, yamlFiles, shellScripts }
}

const scanDockerfile = (text: string): readonly string[] => {
  const commands: string[] = []
  const lines = text.split("\n")
  let buffered = ""
  for (const line of lines) {
    const trimmedRight = line.replace(/\s+$/, "")
    if (trimmedRight.endsWith("\\")) {
      buffered += `${trimmedRight.slice(0, -1)} `
      continue
    }
    const full = (buffered + trimmedRight).trim()
    buffered = ""
    if (full === "") continue
    const matchResult = DOCKERFILE_DIRECTIVE_MATCH_SCHEMA.safeParse(
      /^(RUN|CMD|ENTRYPOINT)\s+(.+)$/i.exec(full)
    )
    if (!matchResult.success) continue
    const body = matchResult.data[2]
    if (body.startsWith("[")) {
      try {
        const arr = JSON_ARRAY_SCHEMA.parse(JSON.parse(body))
        const parts: string[] = []
        for (const el of arr) if (typeof el === "string") parts.push(el)
        if (parts.length > 0) {
          for (const c of commandNamesFromScript(parts.join(" "))) commands.push(c)
        }
      } catch {}
      continue
    }
    for (const c of commandNamesFromScript(body)) commands.push(c)
  }
  return commands
}

const scanYaml = (text: string): readonly string[] => {
  const commands: string[] = []
  for (const m of text.matchAll(/^\s*(command|args)\s*:\s*\[([^\]]*)\]/gm)) {
    const kind = m[1]
    const body = m[2]
    if (kind === undefined || body === undefined) continue
    const parts = body.split(",").map((s) => s.trim().replace(/^["']|["']$/g, ""))
    if (kind === "command") {
      for (const c of commandNamesFromScript(parts.join(" "))) commands.push(c)
    } else {
      for (const p of parts) {
        for (const c of commandNamesFromScript(p)) commands.push(c)
      }
    }
  }
  return commands
}

const scanShellScript = (text: string): readonly string[] => {
  const commands: string[] = []
  for (const line of text.split("\n")) {
    const t = line.trim()
    if (t === "" || t.startsWith("#")) continue
    for (const c of commandNamesFromScript(t)) commands.push(c)
  }
  return commands
}

const sortedUnique = (xs: Iterable<string>): readonly string[] => {
  const set = new Set<string>(xs)
  return [...set].sort()
}

export const walkWorkspaceForUsage = (
  ctx: BuildContext,
  repo: Repo,
  paths: readonly string[],
  rootRel: string,
  otherWorkspaceRoots: ReadonlySet<string>
): WorkspaceUsageData => {
  const buckets = collectWorkspaceFiles(paths, rootRel, otherWorkspaceRoots)
  const commands: string[] = []
  const specifiers: string[] = []
  const protocols: string[] = []
  const configNames: string[] = []
  const textOf = (relPath: string): string | null => readRepoFile(ctx, repo, relPath)
  for (const f of buckets.dockerfiles) {
    const text = textOf(f)
    if (text === null) continue
    for (const c of scanDockerfile(text)) commands.push(c)
  }
  for (const f of buckets.yamlFiles) {
    const text = textOf(f)
    if (text === null) continue
    for (const c of scanYaml(text)) commands.push(c)
  }
  for (const f of buckets.shellScripts) {
    const text = textOf(f)
    if (text === null) continue
    for (const c of scanShellScript(text)) commands.push(c)
  }
  for (const f of buckets.configFiles) {
    const r = scanConfigFile(ctx, repo, f)
    for (const s of r.specifiers) specifiers.push(s)
    for (const p of r.protocols) protocols.push(p)
    configNames.push(posix.basename(f))
  }
  return {
    commandUsages: sortedUnique(commands),
    nonTsSpecifiers: sortedUnique(specifiers),
    configFileProtocols: sortedUnique(protocols),
    configFileNames: sortedUnique(configNames),
  }
}
