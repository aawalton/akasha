import { POD_TEMPLATE_KINDS } from "@infra/k8s-types/k8s-manifest-scanner"
import { defineEdgeProducer } from "../../define-edge-producer.ts"
import { nodeKey } from "../../key.ts"
import type { EdgeInit, Graph, Node } from "../../types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { k8sResourceKey } from "../file/yaml-file/types.ts"
import { K8S_MISSING_NODE_TYPE, K8S_RESOURCE_NODE_TYPE, K8S_ROUTES_TO_EDGE_TYPE, K8S_SELECTS_EDGE_TYPE, K8S_USES_CONFIG_EDGE_TYPE, K8S_USES_PVC_EDGE_TYPE, K8S_USES_SECRET_EDGE_TYPE, K8S_USES_SERVICE_ACCOUNT_EDGE_TYPE, type K8sIngressBackendAttr, type K8sNamedRefAttr, type K8sPinnedHostnameAttr, type K8sResourcePodRefs, type K8sRoutesToAttrs, type K8sSelectsAttrs, type K8sUsesConfigAttrs, type K8sUsesConfigMountStyle, type K8sUsesPvcAttrs, type K8sUsesSecretAttrs, type K8sUsesSecretMountStyle, type K8sUsesServiceAccountAttrs, NODE_HOSTNAME_NODE_TYPE, PINNED_TO_EDGE_TYPE, type PinnedToAttrs } from "./types.ts"
import { K8sResourceAttrsSchema } from "./types-schemas"

const k8sResourceId = (kind: string, namespace: string | null, name: string): string =>
  nodeKey({
    type: K8S_RESOURCE_NODE_TYPE,
    repo: CODE_REPO,
    key: k8sResourceKey(kind, namespace, name),
  })

const k8sMissingId = (kind: string, namespace: string | null, name: string): string =>
  nodeKey({ type: K8S_MISSING_NODE_TYPE, key: k8sResourceKey(kind, namespace, name) })

const refTargetId = (
  upstream: Graph,
  refKind: string,
  namespace: string | null,
  refName: string
): string => {
  const realId = k8sResourceId(refKind, namespace, refName)
  return upstream.node(realId) !== undefined ? realId : k8sMissingId(refKind, namespace, refName)
}

const emitNamedRefEdges = <Type extends string, Attrs extends Record<string, unknown>>(
  edgeType: Type,
  fromId: string,
  refKind: string,
  namespace: string | null,
  refs: readonly K8sNamedRefAttr[],
  attrsFor: (ref: K8sNamedRefAttr) => Attrs,
  upstream: Graph
): readonly EdgeInit<Type, Attrs>[] => {
  const out: EdgeInit<Type, Attrs>[] = []
  for (const ref of refs) {
    out.push({
      type: edgeType,
      from: fromId,
      to: refTargetId(upstream, refKind, namespace, ref.name),
      attrs: attrsFor(ref),
    })
  }
  return out
}

const emitPinnedToEdges = (
  fromId: string,
  pins: readonly K8sPinnedHostnameAttr[]
): readonly EdgeInit<typeof PINNED_TO_EDGE_TYPE, PinnedToAttrs>[] =>
  pins.map((p) => ({
    type: PINNED_TO_EDGE_TYPE,
    from: fromId,
    to: nodeKey({ type: NODE_HOSTNAME_NODE_TYPE, repo: CODE_REPO, key: p.hostname }),
    attrs: { via: p.via },
  }))

const emitPodRefEdges = (
  fromId: string,
  namespace: string | null,
  podRefs: K8sResourcePodRefs,
  upstream: Graph
): readonly EdgeInit[] => {
  const out: EdgeInit[] = []

  for (const sa of podRefs.serviceAccount) {
    const edge: EdgeInit<typeof K8S_USES_SERVICE_ACCOUNT_EDGE_TYPE, K8sUsesServiceAccountAttrs> = {
      type: K8S_USES_SERVICE_ACCOUNT_EDGE_TYPE,
      from: fromId,
      to: refTargetId(upstream, "ServiceAccount", namespace, sa.name),
      attrs: { line: sa.line },
    }
    out.push(edge)
  }

  out.push(
    ...emitNamedRefEdges(
      K8S_USES_SECRET_EDGE_TYPE,
      fromId,
      "Secret",
      namespace,
      podRefs.imagePullSecrets,
      (ref) =>
        ({
          line: ref.line,
          mountStyle: "imagePullSecret",
        }) satisfies K8sUsesSecretAttrs,
      upstream
    )
  )

  const configVolume: K8sUsesConfigMountStyle = "volume"
  out.push(
    ...emitNamedRefEdges(
      K8S_USES_CONFIG_EDGE_TYPE,
      fromId,
      "ConfigMap",
      namespace,
      podRefs.volumeConfigMaps,
      (ref) => ({ line: ref.line, mountStyle: configVolume }) satisfies K8sUsesConfigAttrs,
      upstream
    )
  )

  const secretVolume: K8sUsesSecretMountStyle = "volume"
  out.push(
    ...emitNamedRefEdges(
      K8S_USES_SECRET_EDGE_TYPE,
      fromId,
      "Secret",
      namespace,
      podRefs.volumeSecrets,
      (ref) => ({ line: ref.line, mountStyle: secretVolume }) satisfies K8sUsesSecretAttrs,
      upstream
    )
  )

  out.push(
    ...emitNamedRefEdges(
      K8S_USES_PVC_EDGE_TYPE,
      fromId,
      "PersistentVolumeClaim",
      namespace,
      podRefs.volumePvcs,
      (ref) => ({ line: ref.line }) satisfies K8sUsesPvcAttrs,
      upstream
    )
  )

  const envFromStyleConfig: K8sUsesConfigMountStyle = "envFrom"
  out.push(
    ...emitNamedRefEdges(
      K8S_USES_CONFIG_EDGE_TYPE,
      fromId,
      "ConfigMap",
      namespace,
      podRefs.envFromConfigMaps,
      (ref) => ({ line: ref.line, mountStyle: envFromStyleConfig }) satisfies K8sUsesConfigAttrs,
      upstream
    )
  )

  const envFromStyleSecret: K8sUsesSecretMountStyle = "envFrom"
  out.push(
    ...emitNamedRefEdges(
      K8S_USES_SECRET_EDGE_TYPE,
      fromId,
      "Secret",
      namespace,
      podRefs.envFromSecrets,
      (ref) => ({ line: ref.line, mountStyle: envFromStyleSecret }) satisfies K8sUsesSecretAttrs,
      upstream
    )
  )

  const envStyleConfig: K8sUsesConfigMountStyle = "env"
  out.push(
    ...emitNamedRefEdges(
      K8S_USES_CONFIG_EDGE_TYPE,
      fromId,
      "ConfigMap",
      namespace,
      podRefs.envValueFromConfigMaps,
      (ref) => ({ line: ref.line, mountStyle: envStyleConfig }) satisfies K8sUsesConfigAttrs,
      upstream
    )
  )

  const envStyleSecret: K8sUsesSecretMountStyle = "env"
  out.push(
    ...emitNamedRefEdges(
      K8S_USES_SECRET_EDGE_TYPE,
      fromId,
      "Secret",
      namespace,
      podRefs.envValueFromSecrets,
      (ref) => ({ line: ref.line, mountStyle: envStyleSecret }) satisfies K8sUsesSecretAttrs,
      upstream
    )
  )

  return out
}

const emitIngressEdges = (
  fromId: string,
  namespace: string | null,
  backends: readonly K8sIngressBackendAttr[],
  upstream: Graph
): readonly EdgeInit<typeof K8S_ROUTES_TO_EDGE_TYPE, K8sRoutesToAttrs>[] =>
  backends.map((b) => ({
    type: K8S_ROUTES_TO_EDGE_TYPE,
    from: fromId,
    to: refTargetId(upstream, "Service", namespace, b.serviceName),
    attrs: { line: b.line, host: b.host, path: b.path },
  }))

type WorkloadLabels = {
  readonly id: string
  readonly namespace: string | null
  readonly labels: Readonly<Record<string, string>>
}

const collectWorkloadLabels = (resourceNodes: readonly Node[]): readonly WorkloadLabels[] => {
  const out: WorkloadLabels[] = []
  for (const n of resourceNodes) {
    const attrs = K8sResourceAttrsSchema.parse(n.attrs)
    if (!POD_TEMPLATE_KINDS.has(attrs.kind)) continue
    if (attrs.podTemplateLabels === null) continue
    out.push({ id: n.id, namespace: attrs.namespace, labels: attrs.podTemplateLabels })
  }
  return out
}

const emitServiceSelectorEdges = (
  fromId: string,
  namespace: string | null,
  selector: Readonly<Record<string, string>>,
  workloadLabels: readonly WorkloadLabels[]
): readonly EdgeInit<typeof K8S_SELECTS_EDGE_TYPE, K8sSelectsAttrs>[] => {
  const out: EdgeInit<typeof K8S_SELECTS_EDGE_TYPE, K8sSelectsAttrs>[] = []
  const selectorEntries = Object.entries(selector)
  if (selectorEntries.length === 0) return out
  for (const w of workloadLabels) {
    if (w.namespace !== namespace) continue
    let allMatch = true
    for (const [k, v] of selectorEntries) {
      if (w.labels[k] !== v) {
        allMatch = false
        break
      }
    }
    if (!allMatch) continue
    const matchedLabelKeys = selectorEntries.map(([k]) => k).sort()
    out.push({
      type: K8S_SELECTS_EDGE_TYPE,
      from: fromId,
      to: w.id,
      attrs: { matchedLabelKeys },
    })
  }
  return out
}

export const k8sEdgeProducer = defineEdgeProducer({
  name: "k8s-edge",
  edgeTypes: [
    PINNED_TO_EDGE_TYPE,
    K8S_USES_CONFIG_EDGE_TYPE,
    K8S_USES_SECRET_EDGE_TYPE,
    K8S_USES_SERVICE_ACCOUNT_EDGE_TYPE,
    K8S_USES_PVC_EDGE_TYPE,
    K8S_ROUTES_TO_EDGE_TYPE,
    K8S_SELECTS_EDGE_TYPE,
  ],
  dependsOn: ["k8s"],
  build: (_ctx, upstream) => {
    const resourceNodes = upstream.nodes(K8S_RESOURCE_NODE_TYPE)
    const workloadLabels = collectWorkloadLabels(resourceNodes)
    const edges: EdgeInit[] = []

    for (const n of resourceNodes) {
      const attrs = K8sResourceAttrsSchema.parse(n.attrs)
      const fromId = n.id

      edges.push(...emitPinnedToEdges(fromId, attrs.pinnedHostnames))

      if (attrs.podRefs !== null) {
        edges.push(...emitPodRefEdges(fromId, attrs.namespace, attrs.podRefs, upstream))
      }

      if (attrs.kind === "Ingress" && attrs.ingressBackends.length > 0) {
        edges.push(...emitIngressEdges(fromId, attrs.namespace, attrs.ingressBackends, upstream))
      }

      if (attrs.kind === "Service" && attrs.serviceSelector !== null) {
        edges.push(
          ...emitServiceSelectorEdges(
            fromId,
            attrs.namespace,
            attrs.serviceSelector,
            workloadLabels
          )
        )
      }
    }

    return { edges }
  },
})

export default k8sEdgeProducer
