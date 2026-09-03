import { join } from "node:path"
import type { AddonInfo } from "@akasha/temper-addons-resolve/addon-roster"
import type { DeployableInfo } from "@akasha/temper-addons-resolve/deployable-addons"
import type { RepoFile } from "@akasha/workflow-language/inputs-hash"
import { attrText, importGraphClosureFromSeeds } from "../graph/queries/closure.ts"
import type { Graph, NodeId } from "../graph/types.ts"
import { BUILD_TOOLING_SEEDS, packageSeedForAddonDir } from "./check-configs-addons-seeds.ts"

const CODE_REPO = "code"
const PACKAGE_NODE = "package"
const WORKFLOW_NODE = "workflow"

const pathsOfNode = (attrs: unknown, type: string): readonly string[] => {
  if (type === PACKAGE_NODE) return []
  const field = type === WORKFLOW_NODE ? "sourcePath" : "path"
  const held = attrText(attrs, field)
  return held === undefined ? [] : [held]
}

export const importGraphClosureFiles = (
  graph: Graph,
  seedIds: Iterable<NodeId>
): readonly RepoFile[] => {
  const files = new Map<string, RepoFile>()
  for (const id of importGraphClosureFromSeeds(graph, seedIds)) {
    const node = graph.node(id)
    if (node === undefined) continue
    const repo = node.repo ?? CODE_REPO
    for (const path of pathsOfNode(node.attrs, node.type)) {
      files.set(`${repo}:${path}`, { repo, path })
    }
  }
  return [...files.values()].sort((a, b) =>
    a.repo === b.repo ? a.path.localeCompare(b.path) : a.repo.localeCompare(b.repo)
  )
}

export const ADDON_BUILD_CONCURRENCY = 4

export const deployableAddonDirs = (
  deployable: DeployableInfo,
  roster: readonly AddonInfo[]
): readonly string[] => {
  const addon = roster.find((a) => a.canonicalName === deployable.name)
  if (addon === undefined) {
    throw new Error(`addon-build-cache: addon "${deployable.name}" not found in roster`)
  }
  return [addon.dir]
}

export const deployableSeeds = (
  deployable: DeployableInfo,
  roster: readonly AddonInfo[]
): readonly string[] => {
  const ownSeeds = deployableAddonDirs(deployable, roster).map(packageSeedForAddonDir)
  return [...new Set([...ownSeeds, ...BUILD_TOOLING_SEEDS])].sort()
}

export const closureFilesForDeployable = (
  graph: Graph,
  deployable: DeployableInfo,
  roster: readonly AddonInfo[]
): readonly RepoFile[] => {
  const files = new Map<string, RepoFile>()
  for (const one of importGraphClosureFiles(graph, deployableSeeds(deployable, roster))) {
    files.set(`${one.repo}:${one.path}`, one)
  }
  files.set(`${CODE_REPO}:bun.lock`, { repo: CODE_REPO, path: "bun.lock" })
  return [...files.values()].sort((a, b) =>
    a.repo === b.repo ? a.path.localeCompare(b.path) : a.repo.localeCompare(b.repo)
  )
}

export const missingSeeds = (graph: Graph, seeds: readonly string[]): readonly string[] =>
  seeds.filter((s) => graph.node(s) === undefined)

export const cacheTarPath = (cacheDir: string, name: string, hash: string): string =>
  join(cacheDir, `${name}-${hash}.tar`)
