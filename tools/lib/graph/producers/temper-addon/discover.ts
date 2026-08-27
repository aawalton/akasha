import { z } from "zod"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext, Graph } from "../../types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { PACKAGE_NODE_TYPE, PackageAttrsSchema } from "../package/types.ts"
import type { TemperAddonAttrs } from "./types.ts"

const MANIFEST = "addon.json"

const ManifestSchema = z.object({ name: z.string() }).passthrough()

const declaresItselfAnAddon = (ctx: BuildContext, path: string): boolean => {
  const body = readRepoFile(ctx, CODE_REPO, `${path}/${MANIFEST}`)
  if (body === null) return false
  let raw: unknown
  try {
    raw = JSON.parse(body)
  } catch {
    return false
  }
  return ManifestSchema.safeParse(raw).success
}

export const discoverTemperAddons = (
  ctx: BuildContext,
  upstream: Graph
): readonly TemperAddonAttrs[] => {
  const addons: TemperAddonAttrs[] = []
  for (const node of upstream.nodes(PACKAGE_NODE_TYPE)) {
    const attrs = PackageAttrsSchema.parse(node.attrs)
    if (attrs.tstl === null || attrs.tstl.bundleEntry === null) continue
    if (!declaresItselfAnAddon(ctx, attrs.path)) continue
    addons.push({ name: attrs.name, path: attrs.path })
  }

  addons.sort((a, b) => a.name.localeCompare(b.name))
  return addons
}
