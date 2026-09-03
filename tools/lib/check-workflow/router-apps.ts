import { existsSync, readFileSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import { findFiles } from "../../../akasha/checks/cluster-checks/modules/file-finding/file-finding.module.code.ts"
import { resolveConfigAppDir } from "./rr-server-module-imports.ts"

export interface RouterApp {
  readonly configPath: string
  readonly appDir: string
  readonly buildRoot: string
}

function nearestPackageRoot(startAbs: string, repoRootAbs: string): string {
  let dir = startAbs
  while (dir.startsWith(repoRootAbs)) {
    if (existsSync(join(dir, "package.json"))) return dir
    const parent = dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  return repoRootAbs
}

export function discoverRouterApps(repoRoot: string): readonly RouterApp[] {
  const repoRootAbs = resolve(repoRoot)
  const configs = findFiles({
    cwd: repoRootAbs,
    patterns: ["**/react-router.config.ts"],
    absolute: true,
  })
  return configs.map((configAbs) => {
    const text = existsSync(configAbs) ? readFileSync(configAbs, "utf-8") : undefined
    return {
      configPath: relative(repoRootAbs, configAbs),
      appDir: relative(repoRootAbs, resolveConfigAppDir(configAbs, text)),
      buildRoot: relative(repoRootAbs, nearestPackageRoot(dirname(configAbs), repoRootAbs)),
    }
  })
}
