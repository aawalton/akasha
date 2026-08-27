import { defineNodeProducer } from "../../define-node-producer.ts"
import type { BuildContext, NodeInit } from "../../types.ts"
import { discoverLockfilePackages, lockfileRepos } from "./discover.ts"
import {
  LOCKFILE_PACKAGE_NODE_TYPE,
  type LockfilePackageAttrs,
  lockfilePackageKey,
} from "./types.ts"

type LockfilePackageNode = NodeInit<typeof LOCKFILE_PACKAGE_NODE_TYPE, LockfilePackageAttrs>

const buildNodes = (ctx: BuildContext): readonly LockfilePackageNode[] => {
  const nodes: LockfilePackageNode[] = []
  for (const repo of lockfileRepos(ctx)) {
    for (const p of discoverLockfilePackages(ctx, repo)) {
      const attrs: LockfilePackageAttrs = {
        name: p.name,
        version: p.version,
        integrity: p.integrity,
        declaredDeps: p.declaredDeps,
        declaredOptionalPeers: p.declaredOptionalPeers,
        binCommands: p.binCommands,
        os: p.os,
        cpu: p.cpu,
      }
      nodes.push({
        type: LOCKFILE_PACKAGE_NODE_TYPE,
        repo,
        key: lockfilePackageKey(p.name, p.version),
        attrs,
      })
    }
  }
  return nodes
}

export const lockfilePackageNodeProducer = defineNodeProducer({
  name: "lockfile-package-node",
  nodeTypes: [LOCKFILE_PACKAGE_NODE_TYPE],
  build: (ctx) => ({ nodes: buildNodes(ctx) }),
})

export default lockfilePackageNodeProducer
