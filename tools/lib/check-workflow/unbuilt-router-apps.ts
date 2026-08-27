import { selectAppBuildPackages } from "./check-configs-app-build.ts"
import { discoverRouterApps, type RouterApp } from "./router-apps.ts"
import { loadWorkspaces } from "./test-step-loader.ts"

export function selectUnbuiltRouterApps(
  apps: readonly RouterApp[],
  builtRoots: ReadonlySet<string>
): readonly RouterApp[] {
  return apps.filter((app) => !builtRoots.has(app.buildRoot))
}

export function discoverBuiltAppRoots(repoRoot: string): ReadonlySet<string> {
  const selected = selectAppBuildPackages(
    loadWorkspaces(repoRoot).map((workspace) => ({
      name: workspace.name,
      dir: workspace.root,
      hasBuildScript: workspace.pkg.scripts?.build !== undefined,
    }))
  )
  return new Set(selected.map((target) => target.dir))
}

export function discoverUnbuiltRouterApps(repoRoot: string): readonly RouterApp[] {
  return selectUnbuiltRouterApps(discoverRouterApps(repoRoot), discoverBuiltAppRoots(repoRoot))
}
