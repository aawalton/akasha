import { z } from "zod"
import { HOSTNAMES } from "@infra/k8s-types/hostnames"
import type {
  K8sDuplicateDocAttrs,
  K8sPinnedHostnameAttr,
  K8sResourceAttrs,
  K8sResourcePodRefs,
} from "./types.ts"

export const K8sImageLineSchema = z
  .object({
    value: z.string(),
    line: z.number().int().positive(),
  })
  .passthrough()

const K8sMemoryProbeSchema = z
  .object({
    value: z.string(),
    line: z.number().int().positive(),
  })
  .passthrough()

export const K8sContainerResourcesSchema = z
  .object({
    containerName: z.string().nullable(),
    listKey: z.enum(["containers", "initContainers", "ephemeralContainers"]),
    line: z.number().int().positive(),
    requestMemory: K8sMemoryProbeSchema.nullable(),
    limitMemory: K8sMemoryProbeSchema.nullable(),
  })
  .passthrough()

const K8sNamedRefAttrSchema = z
  .object({
    name: z.string(),
    line: z.number().int().positive(),
  })
  .passthrough()

export const K8sResourcePodRefsSchema: z.ZodType<K8sResourcePodRefs> = z
  .object({
    serviceAccount: z.array(K8sNamedRefAttrSchema).readonly(),
    imagePullSecrets: z.array(K8sNamedRefAttrSchema).readonly(),
    volumeConfigMaps: z.array(K8sNamedRefAttrSchema).readonly(),
    volumeSecrets: z.array(K8sNamedRefAttrSchema).readonly(),
    volumePvcs: z.array(K8sNamedRefAttrSchema).readonly(),
    envFromConfigMaps: z.array(K8sNamedRefAttrSchema).readonly(),
    envFromSecrets: z.array(K8sNamedRefAttrSchema).readonly(),
    envValueFromConfigMaps: z.array(K8sNamedRefAttrSchema).readonly(),
    envValueFromSecrets: z.array(K8sNamedRefAttrSchema).readonly(),
  })
  .passthrough()

export const K8sPinnedHostnameAttrSchema: z.ZodType<K8sPinnedHostnameAttr> = z
  .object({
    hostname: z.enum(HOSTNAMES),
    via: z.enum(["node-selector", "node-affinity"]),
  })
  .passthrough()

export const K8sIngressBackendAttrSchema = z
  .object({
    serviceName: z.string(),
    host: z.string().nullable(),
    path: z.string(),
    line: z.number().int().positive(),
  })
  .passthrough()

export const K8sDuplicateDocAttrsSchema: z.ZodType<K8sDuplicateDocAttrs> = z
  .object({
    path: z.string(),
    docIndex: z.number().int().nonnegative(),
    startLine: z.number().int().positive(),
    hasPodTemplate: z.boolean(),
    nodeSelectorKeys: z.array(z.string()).readonly(),
    nodeName: z.string().nullable(),
    nodeAffinityKeys: z.array(z.string()).readonly(),
  })
  .passthrough()

export const K8sResourceAttrsSchema: z.ZodType<K8sResourceAttrs> = z
  .object({
    path: z.string(),
    docIndex: z.number().int().nonnegative(),
    apiVersion: z.string().nullable(),
    kind: z.string(),
    namespace: z.string().nullable(),
    name: z.string(),
    hasPodTemplate: z.boolean(),
    hasPodAffinity: z.boolean(),
    imageLines: z.array(K8sImageLineSchema).readonly(),
    repoPaths: z.array(z.string()).readonly(),
    containerResources: z.array(K8sContainerResourcesSchema).readonly(),
    nodeSelectorKeys: z.array(z.string()).readonly(),
    hostnameSelector: z.string().nullable(),
    workloadClassSelector: z.string().nullable(),
    nodeName: z.string().nullable(),
    nodeAffinityKeys: z.array(z.string()).readonly(),
    startLine: z.number().int().positive(),
    pinnedHostnames: z.array(K8sPinnedHostnameAttrSchema).readonly(),
    podRefs: K8sResourcePodRefsSchema.nullable(),
    ingressBackends: z.array(K8sIngressBackendAttrSchema).readonly(),
    serviceSelector: z.record(z.string(), z.string()).nullable(),
    podTemplateLabels: z.record(z.string(), z.string()).nullable(),
    duplicateDocs: z.array(K8sDuplicateDocAttrsSchema).readonly(),
  })
  .passthrough()

export const PinnedToAttrsSchema = z
  .object({
    via: z.enum(["node-selector", "node-affinity"]),
  })
  .passthrough()

export const K8sUsesConfigAttrsSchema = z
  .object({
    line: z.number().int().positive(),
    mountStyle: z.enum(["envFrom", "env", "volume"]),
  })
  .passthrough()

export const K8sUsesSecretAttrsSchema = z
  .object({
    line: z.number().int().positive(),
    mountStyle: z.enum(["envFrom", "env", "volume", "imagePullSecret"]),
  })
  .passthrough()

export const K8sUsesServiceAccountAttrsSchema = z
  .object({
    line: z.number().int().positive(),
  })
  .passthrough()

export const K8sUsesPvcAttrsSchema = z
  .object({
    line: z.number().int().positive(),
  })
  .passthrough()

export const K8sRoutesToAttrsSchema = z
  .object({
    line: z.number().int().positive(),
    host: z.string().nullable(),
    path: z.string(),
  })
  .passthrough()

export const K8sSelectsAttrsSchema = z
  .object({
    matchedLabelKeys: z.array(z.string()),
  })
  .passthrough()
