import { z } from "zod"
import type { Repo } from "../../../../../page/document/types.ts"
import { requireMatchPositional } from "../../../narrow.ts"
import { defineEdgeProducer } from "../../define-edge-producer.ts"
import { nodeKey } from "../../key.ts"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext, EdgeInit, Graph, Node } from "../../types.ts"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import { TS_FILE_NODE_TYPES } from "../file/ts-file/types.ts"
import { k8sResourceKey, YAML_FILE_NODE_TYPE } from "../file/yaml-file/types.ts"
import { WORKFLOW_NODE_TYPE, type WorkflowAttrs, WorkflowAttrsSchema } from "../pipeline/types.ts"
import { type ClusterRbacEmission, discoverClusterRbac } from "./discover-cluster-rbac.ts"
import { discoverSynthFiles } from "./synth-discover.ts"
import { extractApplyRbacCalls, extractSynthManifestsForService } from "./synth-extract.ts"
import {
  APPLYRBAC_USES_EDGE_TYPE,
  type ApplyRbacUsesAttrs,
  RBAC_APPLIES_EDGE_TYPE,
  type RbacAppliesAttrs,
  SOPS_SECRET_EDGE_TYPE,
  type SopsSecretAttrs,
  SYNTH_EMITS_EDGE_TYPE,
  SYNTH_GENERATED_BY_EDGE_TYPE,
  type SynthDiscoveredManifest,
  type SynthEmitsAttrs,
  type SynthGeneratedByAttrs,
} from "./synth-types.ts"
import { K8S_MISSING_NODE_TYPE, K8S_RESOURCE_NODE_TYPE } from "./types.ts"

const WORKLOAD_KINDS: ReadonlySet<string> = new Set([
  "Deployment",
  "StatefulSet",
  "DaemonSet",
  "Job",
  "CronJob",
])

export type ApplyRbacUsesByWorkflow = {
  readonly repo: Repo
  readonly sourcePath: string
  readonly rbacFiles: readonly string[]
}

const SINGLE_STRING_TUPLE_SCHEMA = z.tuple([z.string()])
const FOUNDATION_SOURCE_PATH_RE = /^(.+)\/foundation\.workflow\.ts$/
const KIND_RE = /^kind:\s*([A-Za-z][A-Za-z0-9]*)\s*$/m
const METADATA_NAME_RE = /^\s+name:\s*([A-Za-z0-9][A-Za-z0-9._-]*)\s*$/m
const METADATA_NAMESPACE_RE = /^\s+namespace:\s*([A-Za-z0-9][A-Za-z0-9._-]*)\s*$/m

const tryMatchPositional = (re: RegExp, input: string): string | null => {
  try {
    const [captured] = requireMatchPositional(re, SINGLE_STRING_TUPLE_SCHEMA, input)
    return captured
  } catch {
    return null
  }
}

const TS_FILE_TYPES: ReadonlySet<string> = new Set(TS_FILE_NODE_TYPES)

const reposNamed = (nodes: readonly Node[]): string =>
  nodes
    .map((node: Node) => node.repo ?? "no repository")
    .sort()
    .join(", ")

export const tsFileIdIn = (graph: Graph, repo: Repo, path: string, named: string): string => {
  const standing = graph.nodesByKey(path).filter((node: Node) => TS_FILE_TYPES.has(node.type))
  const own = standing.filter((node: Node) => node.repo === repo)
  const [first] = own
  if (first !== undefined && own.length === 1) return first.id
  if (standing.length === 0) {
    throw new Error(
      `graph: ${named} names ${path}, and no TypeScript file node stands at that path in any repository, so add the file to ${repo} or correct the path`
    )
  }
  throw new Error(
    `graph: ${named} names ${path}, which this reads against ${repo} alone, and ${own.length} TypeScript file nodes stand at that path in ${repo} where one must; the path stands in ${reposNamed(standing)}, so add the file to ${repo} or correct the path`
  )
}

const k8sResourceId = (kind: string, namespace: string | null, name: string): string =>
  nodeKey({
    type: K8S_RESOURCE_NODE_TYPE,
    repo: CODE_REPO,
    key: k8sResourceKey(kind, namespace, name),
  })

const k8sMissingId = (kind: string, namespace: string | null, name: string): string =>
  nodeKey({ type: K8S_MISSING_NODE_TYPE, key: k8sResourceKey(kind, namespace, name) })

const indexFoundationWorkflowsByServiceDir = (graph: Graph): ReadonlyMap<string, string[]> => {
  const out = new Map<string, string[]>()
  for (const node of graph.nodes(WORKFLOW_NODE_TYPE)) {
    const parsed = WorkflowAttrsSchema.safeParse(node.attrs)
    if (!parsed.success) continue
    const attrs: WorkflowAttrs = parsed.data
    if (attrs.kind !== "foundation") continue
    const serviceDir = tryMatchPositional(FOUNDATION_SOURCE_PATH_RE, attrs.sourcePath)
    if (serviceDir === null) continue
    const bucket = out.get(serviceDir) ?? []
    bucket.push(node.id)
    out.set(serviceDir, bucket)
  }
  return out
}

const readSopsHeader = (
  ctx: BuildContext,
  sourcePath: string
): { kind: string; name: string; namespace: string | null } | null => {
  const text = readRepoFile(ctx, CODE_REPO, sourcePath)
  if (text === null) return null
  const kind = tryMatchPositional(KIND_RE, text)
  if (kind === null) return null
  const name = tryMatchPositional(METADATA_NAME_RE, text)
  if (name === null) return null
  const namespace = tryMatchPositional(METADATA_NAMESPACE_RE, text)
  return { kind, name, namespace }
}

export const buildSynthK8sEdges = (
  serviceDirs: ReadonlyMap<string, readonly SynthDiscoveredManifest[]>,
  serviceDirToSopsByName: ReadonlyMap<string, ReadonlyMap<string, string>>,
  foundationWorkflows: ReadonlyMap<string, readonly string[]>,
  nodePresent: (id: string) => boolean,
  applyRbacCalls: ReadonlyMap<string, ApplyRbacUsesByWorkflow>,
  tsFileIdAt: (repo: Repo, path: string, named: string) => string
): readonly EdgeInit[] => {
  const edges: EdgeInit[] = []

  for (const [serviceDir, manifests] of serviceDirs) {
    const workflowIds = foundationWorkflows.get(serviceDir) ?? []
    const sopsByName = serviceDirToSopsByName.get(serviceDir) ?? new Map<string, string>()

    for (const m of manifests) {
      const resourceId = k8sResourceId(m.kind, m.namespace, m.name)

      for (const wid of workflowIds) {
        const attrs: SynthEmitsAttrs = { sourcePath: m.sourcePath }
        edges.push({
          type: SYNTH_EMITS_EDGE_TYPE,
          from: wid,
          to: resourceId,
          attrs,
        })
      }

      if (WORKLOAD_KINDS.has(m.kind) && m.serviceAccountName !== null) {
        const saReal = k8sResourceId("ServiceAccount", m.namespace, m.serviceAccountName)
        const saMissing = k8sMissingId("ServiceAccount", m.namespace, m.serviceAccountName)
        const to = nodePresent(saReal) ? saReal : saMissing
        const attrs: RbacAppliesAttrs = { via: "serviceAccountName" }
        edges.push({
          type: RBAC_APPLIES_EDGE_TYPE,
          from: resourceId,
          to,
          attrs,
        })
      }

      if (m.kind === "Secret") {
        const sopsPath = sopsByName.get(m.name)
        if (sopsPath !== undefined) {
          const attrs: SopsSecretAttrs = { sourcePath: sopsPath }
          edges.push({
            type: SOPS_SECRET_EDGE_TYPE,
            from: resourceId,
            to: nodeKey({ type: YAML_FILE_NODE_TYPE, repo: CODE_REPO, key: sopsPath }),
            attrs,
          })
        }
      }
    }
  }

  for (const [workflowId, payload] of applyRbacCalls) {
    for (const rbacFile of payload.rbacFiles) {
      const targetId = tsFileIdAt(payload.repo, rbacFile, "an applyRbac call")
      const attrs: ApplyRbacUsesAttrs = { sourcePath: payload.sourcePath }
      edges.push({
        type: APPLYRBAC_USES_EDGE_TYPE,
        from: workflowId,
        to: targetId,
        attrs,
      })
    }
  }

  return edges
}

const NO_ATTRS: SynthGeneratedByAttrs = {}

export type SynthModuleManifests = {
  readonly entryPath: string
  readonly manifests: readonly SynthDiscoveredManifest[]
}

export const buildSynthGeneratedByEdges = (
  modules: readonly SynthModuleManifests[],
  tsFileIdAt: (repo: Repo, path: string, named: string) => string
): readonly EdgeInit[] => {
  const edges: EdgeInit[] = []
  for (const { entryPath, manifests } of modules) {
    if (manifests.length === 0) continue
    const moduleId = tsFileIdAt(CODE_REPO, entryPath, "a synth module")
    for (const m of manifests) {
      edges.push({
        type: SYNTH_GENERATED_BY_EDGE_TYPE,
        from: k8sResourceId(m.kind, m.namespace, m.name),
        to: moduleId,
        attrs: NO_ATTRS,
      })
    }
  }
  return edges
}

export const buildClusterRbacGeneratedByEdges = (
  emission: ClusterRbacEmission,
  tsFileIdAt: (repo: Repo, path: string, named: string) => string
): readonly EdgeInit[] => {
  const edges: EdgeInit[] = []
  for (const resource of emission.resources) {
    const from = nodeKey({
      type: K8S_RESOURCE_NODE_TYPE,
      repo: emission.repo,
      key: k8sResourceKey(resource.kind, resource.namespace, resource.name),
    })
    for (const source of emission.sources) {
      edges.push({
        type: SYNTH_GENERATED_BY_EDGE_TYPE,
        from,
        to: tsFileIdAt(emission.repo, source, "the cluster RBAC emitter"),
        attrs: NO_ATTRS,
      })
    }
  }
  return edges
}

const discoverApplyRbacCalls = (
  ctx: BuildContext,
  cumulative: Graph
): ReadonlyMap<string, ApplyRbacUsesByWorkflow> => {
  const out = new Map<string, ApplyRbacUsesByWorkflow>()
  for (const node of cumulative.nodes(WORKFLOW_NODE_TYPE)) {
    const parsed = WorkflowAttrsSchema.safeParse(node.attrs)
    if (!parsed.success) continue
    const attrs: WorkflowAttrs = parsed.data
    const repo = node.repo ?? CODE_REPO
    const text = readRepoFile(ctx, repo, attrs.sourcePath)
    if (text === null) continue
    const rbacFiles = extractApplyRbacCalls(attrs.sourcePath, text)
    if (rbacFiles.length === 0) continue
    out.set(node.id, { repo, sourcePath: attrs.sourcePath, rbacFiles })
  }
  return out
}

export const k8sSynthEdgeProducer = defineEdgeProducer({
  name: "k8s-synth-edges",
  edgeTypes: [
    SYNTH_EMITS_EDGE_TYPE,
    RBAC_APPLIES_EDGE_TYPE,
    SOPS_SECRET_EDGE_TYPE,
    APPLYRBAC_USES_EDGE_TYPE,
    SYNTH_GENERATED_BY_EDGE_TYPE,
  ],
  dependsOn: ["k8s-synth-nodes", "pipeline"],
  build: (ctx, cumulative) => {
    const serviceDirs = new Map<string, SynthDiscoveredManifest[]>()
    const serviceDirToSopsByName = new Map<string, Map<string, string>>()
    const modules: SynthModuleManifests[] = []

    for (const f of discoverSynthFiles(ctx)) {
      const own = [...extractSynthManifestsForService(f.sources)]
      const [entry] = f.sources
      if (entry !== undefined) modules.push({ entryPath: entry.sourcePath, manifests: own })
      const allMs: SynthDiscoveredManifest[] = [...own]
      const sopsByName = new Map<string, string>()
      for (const sopsRel of f.sopsFiles) {
        const header = readSopsHeader(ctx, sopsRel)
        if (header === null) continue
        if (header.kind !== "Secret") continue
        sopsByName.set(header.name, sopsRel)
        allMs.push({
          sourcePath: sopsRel,
          apiVersion: null,
          kind: header.kind,
          namespace: header.namespace,
          name: header.name,
          serviceAccountName: null,
        })
      }
      serviceDirs.set(f.serviceDir, allMs)
      serviceDirToSopsByName.set(f.serviceDir, sopsByName)
    }

    const foundationWorkflows = indexFoundationWorkflowsByServiceDir(cumulative)
    const nodePresent = (id: string): boolean => cumulative.node(id) !== undefined
    const applyRbacCalls = discoverApplyRbacCalls(ctx, cumulative)
    const tsFileIdAt = (repo: Repo, path: string, named: string): string =>
      tsFileIdIn(cumulative, repo, path, named)
    const edges = [
      ...buildSynthK8sEdges(
        serviceDirs,
        serviceDirToSopsByName,
        foundationWorkflows,
        nodePresent,
        applyRbacCalls,
        tsFileIdAt
      ),
      ...buildSynthGeneratedByEdges(modules, tsFileIdAt),
      ...buildClusterRbacGeneratedByEdges(discoverClusterRbac(ctx), tsFileIdAt),
    ]
    return { edges }
  },
})

export default k8sSynthEdgeProducer
