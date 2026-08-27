import { HOSTNAMES, type Hostname } from "@infra/k8s-types/hostnames"
import { POD_TEMPLATE_KINDS, scanManifestText } from "@infra/k8s-types/k8s-manifest-scanner"
import { lex, splitDocs } from "@infra/k8s-types/k8s-manifest-walker"
import type { BuildContext, NodeInit } from "../../types.ts"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import { k8sResourceKey } from "../file/yaml-file/types.ts"
import type { ClusterRbacEmission, ClusterRbacResource } from "./discover-cluster-rbac.ts"
import { discoverManifests } from "./discover.ts"
import { extractPvHostnamePins } from "./extract.ts"
import {
  extractEnvFromConfigMaps,
  extractEnvFromSecrets,
  extractEnvValueFromConfigMaps,
  extractEnvValueFromSecrets,
  extractImagePullSecrets,
  extractServiceAccountName,
  extractVolumeConfigMaps,
  extractVolumePvcs,
  extractVolumeSecrets,
  type NamedRef,
  podTemplateSpec,
} from "./extract-pod-refs.ts"
import {
  extractIngressBackends,
  extractPodTemplateLabels,
  extractServiceSelector,
} from "./extract-routing.ts"
import {
  NAMESPACE_ROLE_NODE_TYPE,
  type NamespaceRoleAttrs,
  namespaceRoleKey,
  type RbacData,
  type RbacDeclaration,
} from "./rbac-types.ts"
import {
  K8S_RESOURCE_NODE_TYPE,
  type K8sDuplicateDocAttrs,
  type K8sIngressBackendAttr,
  type K8sNamedRefAttr,
  type K8sPinnedHostnameAttr,
  type K8sResourceAttrs,
  type K8sResourcePodRefs,
  NODE_HOSTNAME_NODE_TYPE,
  type NodeHostnameAttrs,
} from "./types.ts"

const HOSTNAME_SET: ReadonlySet<string> = new Set(HOSTNAMES)
const isHostname = (value: string): value is Hostname => HOSTNAME_SET.has(value)

const buildHostnameNodes = (): readonly NodeInit<"node-hostname", NodeHostnameAttrs>[] =>
  HOSTNAMES.map((hostname) => ({
    type: NODE_HOSTNAME_NODE_TYPE,
    repo: CODE_REPO,
    key: hostname,
    attrs: { hostname },
  }))

const toNamedRefAttr = (ref: NamedRef): K8sNamedRefAttr => ({ name: ref.name, line: ref.line })

const toNamedRefAttrs = (refs: readonly NamedRef[]): readonly K8sNamedRefAttr[] =>
  refs.map(toNamedRefAttr)

const labelMapToRecord = (m: ReadonlyMap<string, string>): Record<string, string> | null => {
  if (m.size === 0) return null
  const out: Record<string, string> = {}
  for (const [k, v] of m) out[k] = v
  return out
}

type ResourceAccumulator = {
  primary: K8sResourceAttrs
  podRefsAccumulating: boolean
  podRefs: {
    serviceAccount: readonly K8sNamedRefAttr[]
    imagePullSecrets: readonly K8sNamedRefAttr[]
    volumeConfigMaps: readonly K8sNamedRefAttr[]
    volumeSecrets: readonly K8sNamedRefAttr[]
    volumePvcs: readonly K8sNamedRefAttr[]
    envFromConfigMaps: readonly K8sNamedRefAttr[]
    envFromSecrets: readonly K8sNamedRefAttr[]
    envValueFromConfigMaps: readonly K8sNamedRefAttr[]
    envValueFromSecrets: readonly K8sNamedRefAttr[]
  }
  pinnedHostnames: readonly K8sPinnedHostnameAttr[]
  ingressBackends: readonly K8sIngressBackendAttr[]
  duplicateDocs: readonly K8sDuplicateDocAttrs[]
}

const newPodRefsAccumulator = (): ResourceAccumulator["podRefs"] => ({
  serviceAccount: [],
  imagePullSecrets: [],
  volumeConfigMaps: [],
  volumeSecrets: [],
  volumePvcs: [],
  envFromConfigMaps: [],
  envFromSecrets: [],
  envValueFromConfigMaps: [],
  envValueFromSecrets: [],
})

const podRefsAccumulatorToAttr = (acc: ResourceAccumulator["podRefs"]): K8sResourcePodRefs => ({
  serviceAccount: acc.serviceAccount,
  imagePullSecrets: acc.imagePullSecrets,
  volumeConfigMaps: acc.volumeConfigMaps,
  volumeSecrets: acc.volumeSecrets,
  volumePvcs: acc.volumePvcs,
  envFromConfigMaps: acc.envFromConfigMaps,
  envFromSecrets: acc.envFromSecrets,
  envValueFromConfigMaps: acc.envValueFromConfigMaps,
  envValueFromSecrets: acc.envValueFromSecrets,
})

export const buildManifestNodes = (ctx: BuildContext): readonly NodeInit[] => {
  const manifests = discoverManifests(ctx)
  const accumulators = new Map<string, ResourceAccumulator>()
  const order: string[] = []

  for (const { relPath, text } of manifests) {
    const lines = lex(text)
    const docSpans = splitDocs(lines, text)
    const { docs } = scanManifestText(text)

    for (let docIndex = 0; docIndex < docs.length; docIndex++) {
      const doc = docs[docIndex]
      if (doc === undefined) continue
      if (doc.kind === undefined || doc.name === undefined) continue
      const namespace = doc.namespace ?? null
      const key = k8sResourceKey(doc.kind, namespace, doc.name)
      const docSpan = docSpans[docIndex]

      let acc = accumulators.get(key)
      if (acc === undefined) {
        acc = {
          primary: {
            path: relPath,
            docIndex,
            apiVersion: doc.apiVersion ?? null,
            kind: doc.kind,
            namespace,
            name: doc.name,
            hasPodTemplate: doc.hasPodTemplate,
            hasPodAffinity: doc.hasPodAffinity,
            imageLines: doc.imageLines,
            repoPaths: doc.repoPaths,
            containerResources: doc.containerResources.map((probe) => ({
              containerName: probe.containerName ?? null,
              listKey: probe.listKey,
              line: probe.line,
              requestMemory: probe.requestMemory ?? null,
              limitMemory: probe.limitMemory ?? null,
            })),
            nodeSelectorKeys: doc.nodeSelectorKeys,
            hostnameSelector: doc.hostnameSelector ?? null,
            workloadClassSelector: doc.workloadClassSelector ?? null,
            nodeName: doc.nodeName ?? null,
            nodeAffinityKeys: doc.nodeAffinityKeys,
            startLine: doc.startLine,
            pinnedHostnames: [],
            podRefs: null,
            ingressBackends: [],
            duplicateDocs: [],
            serviceSelector:
              doc.kind === "Service" && docSpan !== undefined
                ? labelMapToRecord(extractServiceSelector(lines, docSpan))
                : null,
            podTemplateLabels:
              POD_TEMPLATE_KINDS.has(doc.kind) && docSpan !== undefined
                ? labelMapToRecord(extractPodTemplateLabels(lines, docSpan, doc.kind))
                : null,
          },
          podRefsAccumulating: false,
          podRefs: newPodRefsAccumulator(),
          pinnedHostnames: [],
          ingressBackends: [],
          duplicateDocs: [],
        }
        accumulators.set(key, acc)
        order.push(key)
      } else {
        acc.duplicateDocs = [
          ...acc.duplicateDocs,
          {
            path: relPath,
            docIndex,
            startLine: doc.startLine,
            hasPodTemplate: doc.hasPodTemplate,
            nodeSelectorKeys: doc.nodeSelectorKeys,
            nodeName: doc.nodeName ?? null,
            nodeAffinityKeys: doc.nodeAffinityKeys,
          },
        ]
      }

      if (docSpan !== undefined) {
        if (POD_TEMPLATE_KINDS.has(doc.kind)) {
          if (doc.hostnameSelector !== undefined && isHostname(doc.hostnameSelector)) {
            acc.pinnedHostnames = [
              ...acc.pinnedHostnames,
              { hostname: doc.hostnameSelector, via: "node-selector" },
            ]
          }
          const podSpec = podTemplateSpec(lines, docSpan, doc.kind)
          if (podSpec !== null) {
            acc.podRefsAccumulating = true
            const sa = extractServiceAccountName(lines, podSpec)
            acc.podRefs = {
              serviceAccount:
                sa !== null
                  ? [...acc.podRefs.serviceAccount, toNamedRefAttr(sa)]
                  : acc.podRefs.serviceAccount,
              imagePullSecrets: [
                ...acc.podRefs.imagePullSecrets,
                ...toNamedRefAttrs(extractImagePullSecrets(lines, podSpec)),
              ],
              volumeConfigMaps: [
                ...acc.podRefs.volumeConfigMaps,
                ...toNamedRefAttrs(extractVolumeConfigMaps(lines, podSpec)),
              ],
              volumeSecrets: [
                ...acc.podRefs.volumeSecrets,
                ...toNamedRefAttrs(extractVolumeSecrets(lines, podSpec)),
              ],
              volumePvcs: [
                ...acc.podRefs.volumePvcs,
                ...toNamedRefAttrs(extractVolumePvcs(lines, podSpec)),
              ],
              envFromConfigMaps: [
                ...acc.podRefs.envFromConfigMaps,
                ...toNamedRefAttrs(extractEnvFromConfigMaps(lines, podSpec)),
              ],
              envFromSecrets: [
                ...acc.podRefs.envFromSecrets,
                ...toNamedRefAttrs(extractEnvFromSecrets(lines, podSpec)),
              ],
              envValueFromConfigMaps: [
                ...acc.podRefs.envValueFromConfigMaps,
                ...toNamedRefAttrs(extractEnvValueFromConfigMaps(lines, podSpec)),
              ],
              envValueFromSecrets: [
                ...acc.podRefs.envValueFromSecrets,
                ...toNamedRefAttrs(extractEnvValueFromSecrets(lines, podSpec)),
              ],
            }
          }
        }
        if (doc.kind === "PersistentVolume") {
          const additions: readonly K8sPinnedHostnameAttr[] = extractPvHostnamePins(
            lines,
            docSpan
          ).map((hostname) => ({ hostname, via: "node-affinity" as const }))
          acc.pinnedHostnames = [...acc.pinnedHostnames, ...additions]
        }
        if (doc.kind === "Ingress") {
          const additions: readonly K8sIngressBackendAttr[] = extractIngressBackends(
            lines,
            docSpan
          ).map((b) => ({
            serviceName: b.serviceName,
            host: b.host,
            path: b.path,
            line: b.line,
          }))
          acc.ingressBackends = [...acc.ingressBackends, ...additions]
        }
      }
    }
  }

  const nodes: NodeInit[] = [...buildHostnameNodes()]
  for (const key of order) {
    const acc = accumulators.get(key)
    if (acc === undefined) continue
    const attrs: K8sResourceAttrs = {
      ...acc.primary,
      pinnedHostnames: acc.pinnedHostnames,
      podRefs: acc.podRefsAccumulating ? podRefsAccumulatorToAttr(acc.podRefs) : null,
      ingressBackends: acc.ingressBackends,
      duplicateDocs: acc.duplicateDocs,
    }
    nodes.push({ type: K8S_RESOURCE_NODE_TYPE, repo: CODE_REPO, key, attrs })
  }
  return nodes
}

export const buildRbacNodesFromInputs = (
  inputs: readonly RbacData[]
): readonly NodeInit<"namespace-role", NamespaceRoleAttrs>[] => {
  const nodesByKey = new Map<string, NodeInit<"namespace-role", NamespaceRoleAttrs>>()
  const declarationsByKey = new Map<string, RbacDeclaration[]>()
  for (const data of inputs) {
    for (const profile of data.profiles) {
      const key = namespaceRoleKey(profile.namespace, profile.roleName)
      const declaration: RbacDeclaration = {
        packageName: data.packageName,
        sourcePath: data.sourcePath,
        rules: profile.rules,
      }
      const existing = declarationsByKey.get(key)
      if (existing === undefined) {
        const declarations: RbacDeclaration[] = [declaration]
        declarationsByKey.set(key, declarations)
        const attrs: NamespaceRoleAttrs = {
          namespace: profile.namespace,
          roleName: profile.roleName,
          ...(profile.comment !== undefined ? { comment: profile.comment } : {}),
          declarations,
        }
        nodesByKey.set(key, {
          type: NAMESPACE_ROLE_NODE_TYPE,
          repo: data.repo,
          key,
          attrs,
        })
      } else {
        existing.push(declaration)
      }
    }
  }
  return [...nodesByKey.values()]
}

const clusterRbacAttrs = (resource: ClusterRbacResource, path: string): K8sResourceAttrs => ({
  path,
  docIndex: 0,
  apiVersion: null,
  kind: resource.kind,
  namespace: resource.namespace,
  name: resource.name,
  hasPodTemplate: false,
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

export const profileResourceKinds: readonly string[] = ["Role", "RoleBinding"]

export const buildProfileResourceNodes = (
  inputs: readonly RbacData[]
): readonly NodeInit<"k8s-resource", K8sResourceAttrs>[] => {
  const nodesByKey = new Map<string, NodeInit<"k8s-resource", K8sResourceAttrs>>()
  for (const data of inputs) {
    for (const profile of data.profiles) {
      for (const kind of profileResourceKinds) {
        const key = k8sResourceKey(kind, profile.namespace, profile.roleName)
        if (nodesByKey.has(key)) continue
        nodesByKey.set(key, {
          type: K8S_RESOURCE_NODE_TYPE,
          repo: data.repo,
          key,
          attrs: clusterRbacAttrs(
            { kind, namespace: profile.namespace, name: profile.roleName },
            data.sourcePath
          ),
        })
      }
    }
  }
  return [...nodesByKey.values()]
}

export const buildClusterRbacNodes = (
  emission: ClusterRbacEmission
): readonly NodeInit<"k8s-resource", K8sResourceAttrs>[] =>
  emission.resources.map((resource) => ({
    type: K8S_RESOURCE_NODE_TYPE,
    repo: emission.repo,
    key: k8sResourceKey(resource.kind, resource.namespace, resource.name),
    attrs: clusterRbacAttrs(resource, emission.emittedBy),
  }))
