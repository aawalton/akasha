import { readFileSync } from "node:fs"
import { join } from "node:path"
import { NAMESPACE_NAMES } from "@infra/k8s/app-namespaces/synth"
import { DISCOVERY_GLOBS } from "@infra/k8s-synth/manifests"
import { akashaRoot } from "../../../repo/roots/roots.ts"
import { extractSynthManifests } from "../graph/producers/k8s/synth-extract.ts"
import { AUDITED_KINDS, type LiveResource, listLive } from "./cluster.ts"

export const MANAGED_BY_A_DEPLOY: ReadonlySet<string> = new Set(["deploy-script", "bootstrap"])

export const ALLOWED_ORPHANS: ReadonlySet<string> = new Set<string>()

const AUDITED_KIND_NAMES: ReadonlySet<string> = new Set<string>(AUDITED_KINDS)

export function resourceKey(kind: string, namespace: string, name: string): string {
  return `${kind}/${namespace}/${name}`
}

export function sourceKeys(root: string, globs: readonly string[]): ReadonlySet<string> {
  const keys = new Set<string>()
  const read = new Set<string>()
  for (const glob of globs) {
    for (const relPath of new Bun.Glob(glob).scanSync({ cwd: root, onlyFiles: true })) {
      if (relPath.split("/").includes("src")) continue
      if (read.has(relPath)) continue
      read.add(relPath)
      const text = readFileSync(join(root, relPath), "utf8")
      for (const manifest of extractSynthManifests(relPath, text)) {
        if (!AUDITED_KIND_NAMES.has(manifest.kind)) continue
        if (manifest.namespace === null) continue
        keys.add(resourceKey(manifest.kind, manifest.namespace, manifest.name))
      }
    }
  }
  return keys
}

export function orphansAmong(
  keys: ReadonlySet<string>,
  live: readonly LiveResource[]
): readonly LiveResource[] {
  return live.filter((one) => {
    if (one.managedBy === null) return false
    if (!MANAGED_BY_A_DEPLOY.has(one.managedBy)) return false
    const key = resourceKey(one.kind, one.namespace, one.name)
    return !keys.has(key) && !ALLOWED_ORPHANS.has(key)
  })
}

export interface Sweep {
  readonly namespaces: readonly string[]
  readonly sourceCount: number
  readonly liveCount: number
  readonly orphans: readonly LiveResource[]
}

export async function sweepOrphanedResources(deadlineMs: number): Promise<Sweep> {
  const keys = sourceKeys(akashaRoot(), DISCOVERY_GLOBS)
  const namespaces: readonly string[] = NAMESPACE_NAMES
  const live: LiveResource[] = []
  for (const namespace of namespaces) {
    for (const kind of AUDITED_KINDS) {
      live.push(...(await listLive(namespace, kind, deadlineMs)))
    }
  }
  return {
    namespaces,
    sourceCount: keys.size,
    liveCount: live.length,
    orphans: orphansAmong(keys, live),
  }
}
