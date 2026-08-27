import { z } from "zod"
import { PROBE_CONTEXTS } from "../workflow-surface/surface.ts"
import type { CIContext } from "../workflow-dsl/types.ts"

export const PIPELINE_SA = "pipeline-engine"

export const MOCK_WORKSPACE = "/workspace"

export const applyContext = (): CIContext => ({
  ...PROBE_CONTEXTS["main-no-diff"],
  workspace: MOCK_WORKSPACE,
})

const NAMESPACE_FLAG = /(?:-n|--namespace)[=\s]+(\S+)/

const FILE_FLAG = /-f\s+(\S+)/

const OneToken = z.tuple([z.string(), z.string()])

function firstCapture(pattern: RegExp, segment: string): string {
  const parsed = OneToken.safeParse(segment.match(pattern))
  if (!parsed.success) {
    throw new Error(
      `\`${segment}\` matched \`${pattern.source}\` and then read back without its capture, so ` +
        "what the flag names is unknown rather than absent"
    )
  }
  return parsed.data[1]
}

function parseNamespaceFlag(segment: string): string | null {
  if (!NAMESPACE_FLAG.test(segment)) return null
  const namespace = firstCapture(NAMESPACE_FLAG, segment)
  return namespace.includes("$") ? null : namespace
}

function parseFileFlag(segment: string): string | null {
  if (!FILE_FLAG.test(segment)) return null
  return firstCapture(FILE_FLAG, segment)
}

export interface ResolvedApply {
  readonly manifestPath: string
  readonly namespace: string | null
  readonly site: string
}

export interface OpaqueApply {
  readonly site: string
  readonly reason: string
}

function toRepoRelative(target: string): string | null {
  if (target.startsWith(`${MOCK_WORKSPACE}/`)) return target.slice(MOCK_WORKSPACE.length + 1)
  if (target.startsWith("/")) return null
  if (target.includes("$")) return null
  return target
}

function upstreamYamlPaths(upstream: string): readonly string[] {
  const found: string[] = []
  for (const match of upstream.matchAll(/(\S+\.ya?ml)\b/g)) {
    const rel = toRepoRelative(match[1] ?? "")
    if (rel !== null) found.push(rel)
  }
  return found
}

export function resolveApplies(
  commandText: string,
  site: string
): { readonly applies: readonly ResolvedApply[]; readonly opaque: readonly OpaqueApply[] } {
  const applies: ResolvedApply[] = []
  const opaque: OpaqueApply[] = []

  for (const line of commandText.split("\n")) {
    for (const match of line.matchAll(/kubectl apply\b([^\n|;]*)/g)) {
      const segment = match[1] ?? ""
      if (segment.includes("--dry-run")) continue

      const namespace = parseNamespaceFlag(segment)
      const target = parseFileFlag(segment)

      if (target === null) {
        opaque.push({ site, reason: "kubectl apply with no -f argument" })
        continue
      }

      if (target !== "-") {
        const rel = toRepoRelative(target)
        if (rel === null) {
          opaque.push({ site, reason: `applies ${target}, which is not a file in the repository` })
          continue
        }
        applies.push({ manifestPath: rel, namespace, site })
        continue
      }

      const upstream = upstreamYamlPaths(line.slice(0, match.index ?? 0))
      if (upstream.length === 0) {
        opaque.push({ site, reason: "applies stdin built at run time, naming no repo manifest" })
        continue
      }
      for (const manifestPath of upstream) applies.push({ manifestPath, namespace, site })
    }
  }

  return { applies, opaque }
}
