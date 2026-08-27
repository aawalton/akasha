import type { Hostname } from "@infra/k8s-types/hostnames"

export type K8sImageLine = {
  readonly value: string
  readonly line: number
}

export type K8sMemoryProbe = {
  readonly value: string
  readonly line: number
}

export type K8sNamedRefAttr = {
  readonly name: string
  readonly line: number
}

export type K8sResourcePodRefs = {
  readonly serviceAccount: readonly K8sNamedRefAttr[]
  readonly imagePullSecrets: readonly K8sNamedRefAttr[]
  readonly volumeConfigMaps: readonly K8sNamedRefAttr[]
  readonly volumeSecrets: readonly K8sNamedRefAttr[]
  readonly volumePvcs: readonly K8sNamedRefAttr[]
  readonly envFromConfigMaps: readonly K8sNamedRefAttr[]
  readonly envFromSecrets: readonly K8sNamedRefAttr[]
  readonly envValueFromConfigMaps: readonly K8sNamedRefAttr[]
  readonly envValueFromSecrets: readonly K8sNamedRefAttr[]
}

export type K8sIngressBackendAttr = {
  readonly serviceName: string
  readonly host: string | null
  readonly path: string
  readonly line: number
}

export type K8sPinnedHostnameAttr = {
  readonly hostname: Hostname
  readonly via: "node-selector" | "node-affinity"
}

export type K8sContainerResources = {
  readonly containerName: string | null
  readonly listKey: "containers" | "initContainers" | "ephemeralContainers"
  readonly line: number
  readonly requestMemory: K8sMemoryProbe | null
  readonly limitMemory: K8sMemoryProbe | null
}

export type K8sDuplicateDocAttrs = {
  readonly path: string
  readonly docIndex: number
  readonly startLine: number
  readonly hasPodTemplate: boolean
  readonly nodeSelectorKeys: readonly string[]
  readonly nodeName: string | null
  readonly nodeAffinityKeys: readonly string[]
}

export type K8sResourceAttrs = {
  readonly path: string
  readonly docIndex: number
  readonly apiVersion: string | null
  readonly kind: string
  readonly namespace: string | null
  readonly name: string
  readonly hasPodTemplate: boolean
  readonly hasPodAffinity: boolean
  readonly imageLines: readonly K8sImageLine[]
  readonly repoPaths: readonly string[]
  readonly containerResources: readonly K8sContainerResources[]
  readonly nodeSelectorKeys: readonly string[]
  readonly hostnameSelector: string | null
  readonly workloadClassSelector: string | null
  readonly nodeName: string | null
  readonly nodeAffinityKeys: readonly string[]
  readonly startLine: number
  readonly pinnedHostnames: readonly K8sPinnedHostnameAttr[]
  readonly podRefs: K8sResourcePodRefs | null
  readonly ingressBackends: readonly K8sIngressBackendAttr[]
  readonly serviceSelector: Readonly<Record<string, string>> | null
  readonly podTemplateLabels: Readonly<Record<string, string>> | null
  readonly duplicateDocs: readonly K8sDuplicateDocAttrs[]
}

export type NodeHostnameAttrs = {
  readonly hostname: Hostname
}

export type PinnedToAttrs = {
  readonly via: "node-selector" | "node-affinity"
}

export type K8sUsesConfigMountStyle = "envFrom" | "env" | "volume"
export type K8sUsesConfigAttrs = {
  readonly line: number
  readonly mountStyle: K8sUsesConfigMountStyle
}

export type K8sUsesSecretMountStyle = "envFrom" | "env" | "volume" | "imagePullSecret"
export type K8sUsesSecretAttrs = {
  readonly line: number
  readonly mountStyle: K8sUsesSecretMountStyle
}

export type K8sUsesServiceAccountAttrs = {
  readonly line: number
}

export type K8sUsesPvcAttrs = {
  readonly line: number
}

export type K8sRoutesToAttrs = {
  readonly line: number
  readonly host: string | null
  readonly path: string
}

export type K8sSelectsAttrs = {
  readonly matchedLabelKeys: readonly string[]
}

export type K8sDeclaredInAttrs = Record<string, never>

export type K8sResourceNodeType = "k8s-resource"
export type K8sMissingNodeType = "k8s-missing"
export type NodeHostnameNodeType = "node-hostname"
export type PinnedToEdgeType = "pinned-to"
export type K8sUsesConfigEdgeType = "k8s-uses-config"
export type K8sUsesSecretEdgeType = "k8s-uses-secret"
export type K8sUsesServiceAccountEdgeType = "k8s-uses-service-account"
export type K8sUsesPvcEdgeType = "k8s-uses-pvc"
export type K8sRoutesToEdgeType = "k8s-routes-to"
export type K8sSelectsEdgeType = "k8s-selects"
export type K8sDeclaredInEdgeType = "k8s-declared-in"

export const K8S_RESOURCE_NODE_TYPE: K8sResourceNodeType = "k8s-resource"
export const K8S_MISSING_NODE_TYPE: K8sMissingNodeType = "k8s-missing"
export const NODE_HOSTNAME_NODE_TYPE: NodeHostnameNodeType = "node-hostname"
export const PINNED_TO_EDGE_TYPE: PinnedToEdgeType = "pinned-to"
export const K8S_USES_CONFIG_EDGE_TYPE: K8sUsesConfigEdgeType = "k8s-uses-config"
export const K8S_USES_SECRET_EDGE_TYPE: K8sUsesSecretEdgeType = "k8s-uses-secret"
export const K8S_USES_SERVICE_ACCOUNT_EDGE_TYPE: K8sUsesServiceAccountEdgeType =
  "k8s-uses-service-account"
export const K8S_USES_PVC_EDGE_TYPE: K8sUsesPvcEdgeType = "k8s-uses-pvc"
export const K8S_ROUTES_TO_EDGE_TYPE: K8sRoutesToEdgeType = "k8s-routes-to"
export const K8S_SELECTS_EDGE_TYPE: K8sSelectsEdgeType = "k8s-selects"
export const K8S_DECLARED_IN_EDGE_TYPE: K8sDeclaredInEdgeType = "k8s-declared-in"

