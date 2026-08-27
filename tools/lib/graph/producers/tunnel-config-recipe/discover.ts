import type { Repo } from "../../../../../page/document/types.ts"
import type { BuildContext } from "../../types.ts"
import { repoFiles } from "../lib/repo-files.ts"

const TUNNEL_ROUTES_FILENAME = "tunnel-routes.ts"

const CLOUDFLARED_PACKAGE_DIR = "infra/k8s/src/cloudflared/"
const CLOUDFLARED_OWN_TUNNEL_ROUTES_FILE = "infra/k8s/src/cloudflared/tunnel-routes.ts"

export const TUNNEL_CONFIG_RECIPE_GENERATOR_TS =
  "infra/scripts/src/generate-tunnel-config.ts"
export const TUNNEL_CONFIG_RECIPE_BOOTSTRAP_NODES_JSON =
  "infra/scripts/bootstrap/nodes.json"

const DEPLOY_LIB_DIR = "infra/lib/"

export const holdsCloudflared = (ctx: BuildContext, repo: Repo): boolean =>
  repoFiles(ctx, repo).some((rel) => rel.startsWith(CLOUDFLARED_PACKAGE_DIR))

export const discoverDeployLibShFiles = (ctx: BuildContext, repo: Repo): readonly string[] =>
  repoFiles(ctx, repo).filter((rel) => rel.startsWith(DEPLOY_LIB_DIR) && rel.endsWith(".sh"))

export const discoverTunnelRouteFiles = (ctx: BuildContext, repo: Repo): readonly string[] =>
  repoFiles(ctx, repo).filter((rel) => rel.endsWith(`/${TUNNEL_ROUTES_FILENAME}`))

export interface CloudflaredPackageInputs {
  readonly tsFiles: readonly string[]
  readonly yamlFiles: readonly string[]
  readonly jsonFiles: readonly string[]
  readonly shFiles: readonly string[]
}

export const discoverCloudflaredPackageInputs = (
  ctx: BuildContext,
  repo: Repo
): CloudflaredPackageInputs => {
  const all = repoFiles(ctx, repo).filter((rel) => rel.startsWith(CLOUDFLARED_PACKAGE_DIR))
  const tsFiles: string[] = []
  const yamlFiles: string[] = []
  const jsonFiles: string[] = []
  const shFiles: string[] = []
  for (const rel of all) {
    if (rel === CLOUDFLARED_OWN_TUNNEL_ROUTES_FILE) continue
    if (rel.endsWith(".ts")) {
      tsFiles.push(rel)
      continue
    }
    if (rel.endsWith(".yaml") || rel.endsWith(".yml")) {
      yamlFiles.push(rel)
      continue
    }
    if (rel.endsWith(".json")) {
      jsonFiles.push(rel)
      continue
    }
    if (rel.endsWith(".sh")) {
      shFiles.push(rel)
    }
  }
  return { tsFiles, yamlFiles, jsonFiles, shFiles }
}
