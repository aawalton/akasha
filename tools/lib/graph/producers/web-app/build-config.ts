import { posix } from "node:path"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext } from "../../types.ts"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import { repoFiles } from "../lib/repo-files.ts"
import { appDirectories } from "./entry.ts"

export const BUILD_CONFIG_FILES: readonly string[] = [
  "react-router.config.ts",
  "vite.config.ts",
  "package.json",
]

const ROUTER_CONFIG_FILE = "react-router.config.ts"

const DEFAULT_APP_DIRECTORY = "app"

const APP_DIRECTORY_STATED = /\bappDirectory\s*:\s*"([^"\n]*)"/

export const appDirectoryStated = (text: string): string =>
  APP_DIRECTORY_STATED.exec(text)?.[1] ?? DEFAULT_APP_DIRECTORY

export const buildConfigsFor = (
  appDirs: readonly string[],
  standing: ReadonlySet<string>,
  read: (path: string) => string | null
): readonly string[] => {
  const wanted = new Set(appDirs)
  const held = new Set<string>()
  for (const path of [...standing].sort()) {
    if (posix.basename(path) !== ROUTER_CONFIG_FILE) continue
    const at = posix.dirname(path)
    const text = read(path)
    if (text === null) continue
    if (!wanted.has(posix.normalize(posix.join(at, appDirectoryStated(text))))) continue
    for (const name of BUILD_CONFIG_FILES) {
      const beside = posix.join(at, name)
      if (!standing.has(beside)) continue
      held.add(beside)
    }
  }
  return [...held].sort()
}

export const discoverWebAppBuildConfigs = (ctx: BuildContext): readonly string[] => {
  const paths = repoFiles(ctx, CODE_REPO)
  return buildConfigsFor(appDirectories(paths), new Set(paths), (path) =>
    readRepoFile(ctx, CODE_REPO, path)
  )
}
