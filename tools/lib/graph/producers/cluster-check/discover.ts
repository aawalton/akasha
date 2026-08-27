import type { Repo } from "../../../../../page/document/types.ts"
import { parseFrontmatter } from "../../../../../page/frontmatter.ts"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext } from "../../types.ts"
import { repoFiles } from "../lib/repo-files.ts"
import type { ClusterCheckAttrs, DispatchTarget } from "./types.ts"

export const CLUSTER_CHECK_PAGE_DIR = "pages/cluster-check"

export const CLUSTER_CHECK_REPO: Repo = "instructions"

export type PageTree = {
  readonly files: readonly string[]
  readonly read: (path: string) => string | null
}

const isPage = (rel: string): boolean =>
  rel.startsWith(`${CLUSTER_CHECK_PAGE_DIR}/`) && rel.endsWith(".md")

const textOf = (value: unknown): string | null => (typeof value === "string" ? value : null)

const listOf = (value: unknown): readonly string[] => {
  if (typeof value === "string") return [value]
  if (!Array.isArray(value)) return []
  return value.filter((entry): entry is string => typeof entry === "string")
}

const flagOf = (value: unknown): boolean | undefined => {
  if (value === "true") return true
  if (value === "false") return false
  return undefined
}

const targetsOf = (value: unknown): readonly DispatchTarget[] => {
  if (!Array.isArray(value)) return []
  const targets: DispatchTarget[] = []
  for (const entry of value) {
    if (typeof entry !== "object" || entry === null) continue
    const record = entry as Record<string, unknown>
    const kind = textOf(record.kind)
    if (kind === null) continue
    const under = textOf(record.under)
    targets.push(under === null ? { kind } : { kind, under })
  }
  return targets
}

const readPage = (rel: string, body: string): ClusterCheckAttrs => {
  const front = parseFrontmatter(body)
  if (front.error !== null) {
    throw new Error(`graph: ${rel} stands as a cluster check and its frontmatter ${front.error}`)
  }
  const name = textOf(front.fields.get("runner-name"))
  const script = textOf(front.fields.get("script"))
  if (name === null) {
    throw new Error(`graph: ${rel} stands as a cluster check and names no runner-name`)
  }
  if (script === null) {
    throw new Error(`graph: ${rel} stands as a cluster check and names no script`)
  }
  const args = listOf(front.fields.get("args"))
  const treeSha = flagOf(front.fields.get("tree-sha"))
  const alwaysRun = flagOf(front.fields.get("always-run"))
  const image = textOf(front.fields.get("image"))
  const closurePolicy = textOf(front.fields.get("closure-policy"))
  return {
    name,
    script,
    pagePath: rel,
    ...(args.length > 0 && { args }),
    ...(treeSha !== undefined && { treeSha }),
    ...(alwaysRun !== undefined && { alwaysRun }),
    ...(image !== null && { image }),
    ...(closurePolicy !== null && { closurePolicy }),
    dependsOn: listOf(front.fields.get("depends-on")),
    dispatchNodeTypes: targetsOf(front.fields.get("dispatch-node-types")),
  }
}

export const readClusterCheckPages = (tree: PageTree): readonly ClusterCheckAttrs[] => {
  const checks: ClusterCheckAttrs[] = []
  const seen = new Set<string>()
  for (const rel of tree.files) {
    if (!isPage(rel)) continue
    const body = tree.read(rel)
    if (body === null) {
      throw new Error(`graph: ${rel} stands as a cluster check and the snapshot carries no body`)
    }
    const check = readPage(rel, body)
    if (seen.has(check.name)) {
      throw new Error(`graph: two cluster check pages both call themselves ${check.name}`)
    }
    seen.add(check.name)
    checks.push(check)
  }
  if (checks.length === 0) {
    throw new Error(
      `graph: not one page stands under ${CLUSTER_CHECK_PAGE_DIR}, and every check the cluster runs is ` +
        `declared by a page standing there, so reading none would leave the graph asserting that ` +
        `nothing is checked rather than failing`
    )
  }
  checks.sort((a, b) => a.name.localeCompare(b.name))
  return checks
}

export const discoverClusterChecks = (
  ctx: BuildContext,
  repo: Repo
): readonly ClusterCheckAttrs[] =>
  readClusterCheckPages({
    files: repoFiles(ctx, repo),
    read: (path) => readRepoFile(ctx, repo, path),
  })
