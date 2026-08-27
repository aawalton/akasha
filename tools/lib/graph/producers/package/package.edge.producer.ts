import { posix } from "node:path"
import { defineEdgeProducer } from "../../define-edge-producer.ts"
import { nodeKey } from "../../key.ts"
import type { EdgeInit } from "../../types.ts"
import { tsFileNodeTypeOf } from "../file/ts-file/types.ts"
import { extractPackageName } from "./scanner-helpers.ts"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import { repoTree } from "../lib/repo-tree.ts"
import {
  PACKAGE_NODE_TYPE,
  type PackageAttrs,
  PackageAttrsSchema,
  PKG_DEPENDS_EDGE_TYPE,
  type PkgDependsAttrs,
  TSCONFIG_REF_EDGE_TYPE,
  TSTL_BUNDLE_ENTRY_EDGE_TYPE,
  TSTL_PLUGIN_EDGE_TYPE,
  type TsconfigRefAttrs,
  type TstlBundleEntryAttrs,
  type TstlPluginAttrs,
} from "./types.ts"

const packageKey = (name: string): string =>
  nodeKey({ type: PACKAGE_NODE_TYPE, repo: CODE_REPO, key: name })

const tsFileKey = (relPath: string): string =>
  nodeKey({ type: tsFileNodeTypeOf(relPath), repo: CODE_REPO, key: relPath })

const resolveTsconfigRef = (
  sourcePath: string,
  refPath: string,
  byPath: ReadonlyMap<string, PackageAttrs>
): string | undefined => {
  const joined = posix.normalize(posix.join(sourcePath, refPath))
  const direct = byPath.get(joined)
  if (direct !== undefined) return direct.name
  const trimmed = joined.replace(/\/+$/, "")
  return byPath.get(trimmed)?.name
}

const isRelativeSpecifier = (s: string): boolean => s.startsWith("./") || s.startsWith("../")

const isTemplateSpecifier = (s: string): boolean => s.includes("<") && s.includes(">")



export const packageEdgeProducer = defineEdgeProducer({
  name: "package-edge",
  edgeTypes: [
    PKG_DEPENDS_EDGE_TYPE,
    TSCONFIG_REF_EDGE_TYPE,
    TSTL_BUNDLE_ENTRY_EDGE_TYPE,
    TSTL_PLUGIN_EDGE_TYPE,
  ],
  dependsOn: ["package"],
  build: (ctx, graph) => {
    const tree = repoTree(ctx, CODE_REPO)

    const resolveTstlBundleEntry = (pkgPath: string, specifier: string): string | null => {
      const joined = posix.normalize(posix.join(pkgPath, specifier))
      return tree.hasFile(joined) ? joined : null
    }

    const resolveTstlPlugin = (pkgPath: string, specifier: string): string | null => {
      const joined = posix.normalize(posix.join(pkgPath, specifier))
      if (!tree.hasFile(joined)) return null
      const asTs = joined.replace(/\.js$/, ".ts")
      if (asTs === joined) return null
      if (!tree.hasFile(asTs)) return null
      return asTs
    }

    const resolvePluginTarget = (
      p: PackageAttrs,
      specifier: string,
      byName: ReadonlyMap<string, PackageAttrs>
    ): { to: string; resolved: string | null } | null => {
      if (isRelativeSpecifier(specifier)) {
        const resolved = resolveTstlPlugin(p.path, specifier)
        return { to: resolved === null ? packageKey(p.name) : tsFileKey(resolved), resolved }
      }
      const providerName = extractPackageName(specifier)
      if (providerName === null) return null
      const provider = byName.get(providerName)
      if (provider === undefined) return null
      if (provider.name === p.name) return null
      const subpath = `./${specifier.slice(providerName.length + 1)}`
      return { to: packageKey(provider.name), resolved: resolveTstlPlugin(provider.path, subpath) }
    }

    const packages: readonly PackageAttrs[] = graph
      .nodes(PACKAGE_NODE_TYPE)
      .map((n) => PackageAttrsSchema.parse(n.attrs))
    const byName = new Map<string, PackageAttrs>()
    const byPath = new Map<string, PackageAttrs>()
    for (const p of packages) {
      byName.set(p.name, p)
      byPath.set(p.path, p)
    }

    const edges: EdgeInit[] = []
    for (const p of packages) {
      const fromId = packageKey(p.name)

      for (const [depName, kind] of Object.entries(p.dependencies)) {
        if (!byName.has(depName)) continue
        const attrs: PkgDependsAttrs = { kind }
        const edge: EdgeInit<"pkg-depends", PkgDependsAttrs> = {
          type: PKG_DEPENDS_EDGE_TYPE,
          from: fromId,
          to: packageKey(depName),
          attrs,
        }
        edges.push(edge)
      }

      const seenRefTargets = new Set<string>()
      for (const refPath of p.tsconfigRefPaths) {
        const targetName = resolveTsconfigRef(p.path, refPath, byPath)
        if (targetName === undefined) continue
        if (targetName === p.name) continue
        if (seenRefTargets.has(targetName)) continue
        seenRefTargets.add(targetName)
        const refAttrs: TsconfigRefAttrs = {}
        const edge: EdgeInit<"tsconfig-ref", TsconfigRefAttrs> = {
          type: TSCONFIG_REF_EDGE_TYPE,
          from: fromId,
          to: packageKey(targetName),
          attrs: refAttrs,
        }
        edges.push(edge)
      }

      if (p.tstl?.bundleEntry !== null && p.tstl?.bundleEntry !== undefined) {
        const specifier = p.tstl.bundleEntry
        if (!isTemplateSpecifier(specifier) && isRelativeSpecifier(specifier)) {
          const resolved = resolveTstlBundleEntry(p.path, specifier)
          const to = resolved === null ? fromId : tsFileKey(resolved)
          const attrs: TstlBundleEntryAttrs = { specifier, resolved }
          edges.push({ type: TSTL_BUNDLE_ENTRY_EDGE_TYPE, from: fromId, to, attrs })
        }
      }

      if (p.tstl !== null) {
        const seenPluginTargets = new Set<string>()
        for (let i = 0; i < p.tstl.plugins.length; i++) {
          const specifier = p.tstl.plugins[i]
          if (specifier === undefined) continue
          if (isTemplateSpecifier(specifier)) continue
          const target = resolvePluginTarget(p, specifier, byName)
          if (target === null) continue
          if (seenPluginTargets.has(target.to)) continue
          seenPluginTargets.add(target.to)
          const attrs: TstlPluginAttrs = { specifier, resolved: target.resolved, index: i }
          edges.push({ type: TSTL_PLUGIN_EDGE_TYPE, from: fromId, to: target.to, attrs })
        }
            }
    }

    return { edges }
  },
})

export default packageEdgeProducer
