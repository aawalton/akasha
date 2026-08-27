import { defineEdgeProducer } from "../../define-edge-producer.ts"
import { nodeKey } from "../../key.ts"
import type { EdgeInit } from "../../types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { PACKAGE_NODE_TYPE } from "../package/types.ts"
import {
  discoverLockfileEntries,
  discoverWorkspaceResolutions,
  lockfileRepos,
  resolveDepViaPathKey,
} from "./discover.ts"
import {
  LOCKFILE_DEPENDS_EDGE_TYPE,
  LOCKFILE_PACKAGE_NODE_TYPE,
  LOCKFILE_RESOLVES_EDGE_TYPE,
  type LockfileDependsAttrs,
  type LockfileResolvesAttrs,
  lockfilePackageKey,
} from "./types.ts"

export const lockfilePackageEdgeProducer = defineEdgeProducer({
  name: "lockfile-package-edge",
  edgeTypes: [LOCKFILE_RESOLVES_EDGE_TYPE, LOCKFILE_DEPENDS_EDGE_TYPE],
  dependsOn: ["lockfile-package-node"],
  build: (ctx) => {
    const edges: EdgeInit[] = []
    const seen = new Set<string>()

    for (const repo of lockfileRepos(ctx)) {
      const entries = discoverLockfileEntries(ctx, repo)
      const index = new Map<string, { readonly name: string; readonly version: string }>()
      for (const e of entries) index.set(e.pathKey, { name: e.name, version: e.version })

      const lockfilePackageId = (name: string, version: string): string =>
        nodeKey({
          type: LOCKFILE_PACKAGE_NODE_TYPE,
          repo,
          key: lockfilePackageKey(name, version),
        })

      for (const r of discoverWorkspaceResolutions(ctx, repo)) {
        const attrs: LockfileResolvesAttrs = { kind: r.kind, range: r.range }
        edges.push({
          type: LOCKFILE_RESOLVES_EDGE_TYPE,
          from: nodeKey({ type: PACKAGE_NODE_TYPE, repo: CODE_REPO, key: r.workspaceName }),
          to: lockfilePackageId(r.depName, r.resolvedVersion),
          attrs,
        })
      }

      for (const entry of entries) {
        const fromId = lockfilePackageId(entry.name, entry.version)
        for (const dep of entry.declaredDeps) {
          const resolved = resolveDepViaPathKey(index, entry.pathKey, dep.name)
          if (resolved === undefined) continue
          const edgeAttrs: LockfileDependsAttrs = { kind: dep.kind, range: dep.range }
          const toId = lockfilePackageId(resolved.name, resolved.version)
          const key = [fromId, toId, dep.kind, dep.range].join("\n")
          if (seen.has(key)) continue
          seen.add(key)
          edges.push({ type: LOCKFILE_DEPENDS_EDGE_TYPE, from: fromId, to: toId, attrs: edgeAttrs })
        }
        for (const peerName of entry.declaredOptionalPeers) {
          const resolved = resolveDepViaPathKey(index, entry.pathKey, peerName)
          if (resolved === undefined) continue
          const edgeAttrs: LockfileDependsAttrs = { kind: "optionalPeer", range: null }
          const toId = lockfilePackageId(resolved.name, resolved.version)
          const key = [fromId, toId, "optionalPeer", ""].join("\n")
          if (seen.has(key)) continue
          seen.add(key)
          edges.push({ type: LOCKFILE_DEPENDS_EDGE_TYPE, from: fromId, to: toId, attrs: edgeAttrs })
        }
      }
    }

    return { edges }
  },
})

export default lockfilePackageEdgeProducer
