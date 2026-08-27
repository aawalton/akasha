import { z } from "zod"
import { POD_TEMPLATE_KINDS } from "@infra/k8s-types/k8s-manifest-scanner"
import { requireMatchPositional } from "../../../narrow.ts"
import { defineNodeProducer } from "../../define-node-producer.ts"
import { nodeKey } from "../../key.ts"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext, NodeInit } from "../../types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { k8sResourceKey } from "../file/yaml-file/types.ts"
import { discoverSynthFiles } from "./synth-discover.ts"
import { extractSynthManifestsForService } from "./synth-extract.ts"
import type { SynthDiscoveredManifest } from "./synth-types.ts"
import { K8S_RESOURCE_NODE_TYPE, type K8sResourceAttrs } from "./types.ts"

const POD_TEMPLATE_KIND_SET: ReadonlySet<string> = new Set(POD_TEMPLATE_KINDS)

const buildSafeAttrs = (m: SynthDiscoveredManifest): K8sResourceAttrs => ({
  path: m.sourcePath,
  docIndex: 0,
  apiVersion: m.apiVersion,
  kind: m.kind,
  namespace: m.namespace,
  name: m.name,
  hasPodTemplate: POD_TEMPLATE_KIND_SET.has(m.kind),
  hasPodAffinity: false,
  imageLines: [],
  repoPaths: [],
  containerResources: [],
  nodeSelectorKeys: [],
  hostnameSelector: null,
  workloadClassSelector: null,
  nodeName: null,
  nodeAffinityKeys: [],
  startLine: 1,
  pinnedHostnames: [],
  podRefs: null,
  ingressBackends: [],
  serviceSelector: null,
  podTemplateLabels: null,
  duplicateDocs: [],
})

export const buildSynthK8sNodes = (
  manifests: readonly SynthDiscoveredManifest[],
  hasNode: (id: string) => boolean
): readonly NodeInit[] => {
  const seen = new Set<string>()
  const out: NodeInit<"k8s-resource", K8sResourceAttrs>[] = []
  for (const m of manifests) {
    const key = k8sResourceKey(m.kind, m.namespace, m.name)
    if (seen.has(key)) continue
    seen.add(key)
    if (hasNode(nodeKey({ type: K8S_RESOURCE_NODE_TYPE, repo: CODE_REPO, key }))) continue
    out.push({
      type: K8S_RESOURCE_NODE_TYPE,
      repo: CODE_REPO,
      key,
      attrs: buildSafeAttrs(m),
    })
  }
  return out
}

const SINGLE_STRING_TUPLE_SCHEMA = z.tuple([z.string()])
const API_VERSION_RE = /^apiVersion:\s*(\S+)\s*$/m
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

const readSopsManifestHeader = (
  ctx: BuildContext,
  sourcePath: string
): SynthDiscoveredManifest | null => {
  const text = readRepoFile(ctx, CODE_REPO, sourcePath)
  if (text === null) return null
  const kind = tryMatchPositional(KIND_RE, text)
  if (kind === null) return null
  const name = tryMatchPositional(METADATA_NAME_RE, text)
  if (name === null) return null
  const apiVersion = tryMatchPositional(API_VERSION_RE, text)
  const namespace = tryMatchPositional(METADATA_NAMESPACE_RE, text)
  return {
    sourcePath,
    apiVersion,
    kind,
    namespace,
    name,
    serviceAccountName: null,
  }
}

export const k8sSynthNodeProducer = defineNodeProducer({
  name: "k8s-synth-nodes",
  nodeTypes: [K8S_RESOURCE_NODE_TYPE],
  dependsOn: ["k8s"],
  build: (ctx, cumulative) => {
    const allManifests: SynthDiscoveredManifest[] = []
    for (const f of discoverSynthFiles(ctx)) {
      for (const m of extractSynthManifestsForService(f.sources)) allManifests.push(m)
      for (const sopsRel of f.sopsFiles) {
        const sopsManifest = readSopsManifestHeader(ctx, sopsRel)
        if (sopsManifest !== null) allManifests.push(sopsManifest)
      }
    }
    const hasNode = (id: string): boolean => cumulative.node(id) !== undefined
    return { nodes: buildSynthK8sNodes(allManifests, hasNode) }
  },
})

export default k8sSynthNodeProducer
