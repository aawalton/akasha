import { posix } from "node:path"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext } from "../../types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { repoFiles } from "../lib/repo-files.ts"

const ROUTES_FILE = "routes.ts"

const ROOT_FILE = "root.tsx"

export const SERVER_ENTRY_FILE = "server.ts"

export const FRAMEWORK_ENTRY_FILES: readonly string[] = [
  ROUTES_FILE,
  ROOT_FILE,
  "entry.server.tsx",
  "entry.client.tsx",
]

const MODULE_LITERAL = /"([^"\n]+\.tsx?)"/g

export const routeModuleSpecifiers = (text: string): readonly string[] => {
  const held: string[] = []
  const seen = new Set<string>()
  for (const found of text.matchAll(MODULE_LITERAL)) {
    const specifier = found[1]
    if (specifier === undefined) continue
    if (specifier.startsWith("@") || specifier.startsWith("~")) continue
    if (seen.has(specifier)) continue
    seen.add(specifier)
    held.push(specifier)
  }
  return held
}

export const appDirectories = (paths: readonly string[]): readonly string[] => {
  const standing = new Set(paths)
  const held = new Set<string>()
  for (const path of paths) {
    if (posix.basename(path) !== ROUTES_FILE) continue
    const dir = posix.dirname(path)
    if (!standing.has(posix.join(dir, ROOT_FILE))) continue
    held.add(dir)
  }
  return [...held].sort()
}

export type WebAppEntry = {
  readonly appDir: string
  readonly path: string
  readonly kind: "framework-entry" | "route-module" | "server-entry"
  readonly specifier: string | null
}

export const entriesForAppDir = (
  ctx: BuildContext,
  appDir: string,
  standing: ReadonlySet<string>
): readonly WebAppEntry[] => {
  const held: WebAppEntry[] = []
  for (const name of FRAMEWORK_ENTRY_FILES) {
    const path = posix.join(appDir, name)
    if (!standing.has(path)) continue
    held.push({ appDir, path, kind: "framework-entry", specifier: null })
  }
  const routesPath = posix.join(appDir, ROUTES_FILE)
  if (!standing.has(routesPath)) return held
  const text = readRepoFile(ctx, CODE_REPO, routesPath)
  if (text === null) return held
  for (const specifier of routeModuleSpecifiers(text)) {
    const path = posix.normalize(posix.join(appDir, specifier))
    if (!standing.has(path)) continue
    held.push({ appDir, path, kind: "route-module", specifier })
  }
  return held
}

export const discoverWebAppEntries = (ctx: BuildContext): readonly WebAppEntry[] => {
  const paths = repoFiles(ctx, CODE_REPO)
  const standing = new Set(paths)
  const held: WebAppEntry[] = []
  for (const appDir of appDirectories(paths)) {
    for (const entry of entriesForAppDir(ctx, appDir, standing)) held.push(entry)
    const serverPath = posix.join(posix.dirname(appDir), SERVER_ENTRY_FILE)
    if (!standing.has(serverPath)) continue
    held.push({ appDir, path: serverPath, kind: "server-entry", specifier: null })
  }
  return held
}
