import type { K8sEnvVar } from "./secrets.ts"

export interface K8sPodSpecBody {
  restartPolicy: "Never"
  nodeSelector: Record<string, string>
  securityContext: { runAsUser: number; runAsGroup: number; fsGroup: number }
  initContainers: ReadonlyArray<{
    name: string
    image: string
    command: readonly string[]
    volumeMounts: ReadonlyArray<{ name: string; mountPath: string }>
    resources: Record<string, unknown>
    securityContext: Record<string, unknown>
  }>
  containers: ReadonlyArray<{
    name: string
    image: string
    imagePullPolicy: "IfNotPresent" | "Always"
    command: readonly string[]
    env: readonly K8sEnvVar[]
    volumeMounts: ReadonlyArray<{ name: string; mountPath: string }>
    resources: Record<string, unknown>
    securityContext: Record<string, unknown>
  }>
  volumes: ReadonlyArray<{ name: string; [key: string]: unknown }>
  serviceAccountName?: string
  [key: string]: unknown
}

export interface K8sPodSpec {
  apiVersion: "v1"
  kind: "Pod"
  metadata: { name: string; namespace: string; labels: Record<string, string> }
  spec: K8sPodSpecBody
}

export const STEP_IMAGE_PULL_POLICY = "IfNotPresent" as const
