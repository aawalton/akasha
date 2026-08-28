import { synthOne } from "@infra/k8s-types/cdk8s-synth"
import { workloadClassMemberSelector } from "@infra/k8s-types/hostnames"
import { orchestratorCacheChownInitContainer, orchestratorCacheInitContainer, orchestratorCacheSyncSidecar } from "@infra/k8s-types/orchestrator-cache"
import { orchestratorCacheEntrypointPath, orchestratorCacheVolumeMounts, orchestratorCacheVolumes } from "../../infra/k8s-types/src/orchestrator-cache-helpers.ts"
import { BUN_RUNTIME_IMAGE, ORCHESTRATOR_CACHE_REPO_PATH, TEMPER_WEB_CACHE } from "../../infra/k8s-types/src/orchestrator-cache-locations.ts"
import { ADDON_BUNDLE_IMAGE } from "./deploy/addon-bundle-image.ts"

const NAMESPACE = "temper"
const APP_NAME = "web"
const SECRET_NAME = "temper-secrets"

const TEMPER_WATCHER_IMAGE =
  "registry.registry.svc.cluster.local:5000/cluster/temper-watcher:latest"

const WATCHER_IMAGE_SOURCE_DIR = "/build"

const WATCHER_DEST_DIR = `${ORCHESTRATOR_CACHE_REPO_PATH}/temper/web/watcher`

const ADDONS_IMAGE_SOURCE_DIR = "/bundle"

const ADDONS_DEST_DIR = `${ORCHESTRATOR_CACHE_REPO_PATH}/temper/web/addons`

const RESOURCE_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": NAMESPACE,
  "app.kubernetes.io/component": "frontend",
  "app.kubernetes.io/part-of": NAMESPACE,
  "app.kubernetes.io/managed-by": "deploy-script",
} as const

const SELECTOR_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": NAMESPACE,
} as const

const GIT_ACCESS_TOKEN_REF = {
  secretName: SECRET_NAME,
  secretKey: "GIT_ACCESS_TOKEN",
} as const

const VALIDATION_DATA_MOUNT = {
  name: "validation-data",
  mountPath: "/data/validation",
} as const

const VALIDATION_DATA_VOLUME = {
  name: "validation-data",
  emptyDir: {},
} as const

function initWatcherContainer(): object {
  const script = [
    "set -e",
    `mkdir -p ${WATCHER_DEST_DIR}`,
    `cp -f ${WATCHER_IMAGE_SOURCE_DIR}/temper-watcher.exe ${WATCHER_DEST_DIR}/temper-watcher.exe`,
    `cp -f ${WATCHER_IMAGE_SOURCE_DIR}/temper-watcher-worker.exe ${WATCHER_DEST_DIR}/temper-watcher-worker.exe`,
    `cp -f ${WATCHER_IMAGE_SOURCE_DIR}/version.txt ${WATCHER_DEST_DIR}/version.txt`,
    `echo "init-watcher: copied watcher binaries into ${WATCHER_DEST_DIR}"`,
  ].join("\n")

  return {
    name: "init-watcher",
    image: TEMPER_WATCHER_IMAGE,
    imagePullPolicy: "Always",
    command: ["sh", "-c", script],
    resources: {
      requests: { cpu: "50m", memory: "256Mi" },
      limits: { memory: "256Mi" },
    },
    securityContext: {
      runAsNonRoot: true,
      runAsUser: 1000,
      readOnlyRootFilesystem: true,
      allowPrivilegeEscalation: false,
      capabilities: { drop: ["ALL"] },
    },
    volumeMounts: orchestratorCacheVolumeMounts(),
  }
}

function initAddonsContainer(): object {
  const script = [
    "set -e",
    `mkdir -p ${ADDONS_DEST_DIR}`,
    `cp -f ${ADDONS_IMAGE_SOURCE_DIR}/temper-addons.zip ${ADDONS_DEST_DIR}/temper-addons.zip`,
    `cp -f ${ADDONS_IMAGE_SOURCE_DIR}/version.txt ${ADDONS_DEST_DIR}/version.txt`,
    `echo "init-addons: copied the addon bundle into ${ADDONS_DEST_DIR}"`,
  ].join("\n")

  return {
    name: "init-addons",
    image: ADDON_BUNDLE_IMAGE,
    imagePullPolicy: "IfNotPresent",
    command: ["sh", "-c", script],
    resources: {
      requests: { cpu: "50m", memory: "256Mi" },
      limits: { memory: "256Mi" },
    },
    securityContext: {
      runAsNonRoot: true,
      runAsUser: 1000,
      readOnlyRootFilesystem: true,
      allowPrivilegeEscalation: false,
      capabilities: { drop: ["ALL"] },
    },
    volumeMounts: orchestratorCacheVolumeMounts(),
  }
}

function webDeploymentYaml(): string {
  return synthOne(NAMESPACE, "deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: { name: APP_NAME, namespace: NAMESPACE, labels: RESOURCE_LABELS },
    spec: {
      replicas: 1,
      strategy: {
        type: "RollingUpdate",
        rollingUpdate: { maxSurge: 1, maxUnavailable: 0 },
      },
      selector: { matchLabels: SELECTOR_LABELS },
      template: {
        metadata: { labels: RESOURCE_LABELS },
        spec: {
          nodeSelector: workloadClassMemberSelector("serve"),
          initContainers: [
            orchestratorCacheChownInitContainer(),
            orchestratorCacheInitContainer({
              gitAccessTokenRef: GIT_ACCESS_TOKEN_REF,
              location: TEMPER_WEB_CACHE,
              memory: { request: "256Mi", limit: "2Gi" },
            }),
            initWatcherContainer(),
            initAddonsContainer(),
          ],
          containers: [
            {
              name: APP_NAME,
              image: BUN_RUNTIME_IMAGE,
              imagePullPolicy: "IfNotPresent",
              workingDir: orchestratorCacheEntrypointPath("temper/web"),
              command: ["bun", "run", "start"],
              ports: [{ containerPort: 3000, protocol: "TCP" }],
              envFrom: [{ secretRef: { name: SECRET_NAME } }],
              env: [
                { name: "NODE_ENV", value: "production" },
                { name: "AKASHA_ROOT", value: ORCHESTRATOR_CACHE_REPO_PATH },
                { name: "HOST", value: "0.0.0.0" },
                { name: "PORT", value: "3000" },
                { name: "PAGE_WRITER", value: "temper-web" },
                { name: "NEXT_PUBLIC_SUPABASE_URL", value: "https://supabase.alanwalton.com" },
                { name: "NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN", value: ".tempereso.com" },
                {
                  name: "SUPABASE_INTERNAL_URL",
                  value: "http://auth-proxy.auth-proxy.svc.cluster.local:3080",
                },
                { name: "BASE_URL", value: "https://tempereso.com" },
                {
                  name: "SUPABASE_JWT_SECRET",
                  valueFrom: { secretKeyRef: { name: SECRET_NAME, key: "JWT_SECRET" } },
                },
                { name: "VALIDATION_STORAGE_PATH", value: "/data/validation" },
                { name: "WATCHER_DIR", value: WATCHER_DEST_DIR },
                { name: "ADDONS_BUNDLE_DIR", value: ADDONS_DEST_DIR },
              ],
              volumeMounts: [...orchestratorCacheVolumeMounts(), VALIDATION_DATA_MOUNT],
              resources: {
                requests: { cpu: "100m", memory: "512Mi" },
                limits: { cpu: "500m", memory: "512Mi" },
              },
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 1000,
                readOnlyRootFilesystem: true,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
              },
              livenessProbe: {
                httpGet: { path: "/api/watcher/version", port: 3000 },
                initialDelaySeconds: 15,
                periodSeconds: 10,
                failureThreshold: 6,
                timeoutSeconds: 5,
              },
              readinessProbe: {
                httpGet: { path: "/api/watcher/version", port: 3000 },
                initialDelaySeconds: 5,
                periodSeconds: 5,
                failureThreshold: 12,
                timeoutSeconds: 5,
              },
              lifecycle: { preStop: { exec: { command: ["sleep", "5"] } } },
            },
            orchestratorCacheSyncSidecar({
              gitAccessTokenRef: GIT_ACCESS_TOKEN_REF,
              memory: { request: "256Mi", limit: "4Gi" },
            }),
          ],
          volumes: [...orchestratorCacheVolumes(TEMPER_WEB_CACHE), VALIDATION_DATA_VOLUME],
        },
      },
    },
  })
}

function webServiceYaml(): string {
  return synthOne(NAMESPACE, "service", {
    apiVersion: "v1",
    kind: "Service",
    metadata: { name: APP_NAME, namespace: NAMESPACE, labels: RESOURCE_LABELS },
    spec: {
      type: "ClusterIP",
      selector: SELECTOR_LABELS,
      ports: [{ port: 3000, targetPort: 3000, protocol: "TCP" }],
    },
  })
}

export const BUILD_ENV = [
  { name: "NEXT_PUBLIC_SUPABASE_URL", value: "https://supabase.alanwalton.com" },
  {
    name: "NEXT_PUBLIC_ELECTRIC_URL",
    value: "https://supabase.alanwalton.com/electric/v1/shape",
  },
  {
    name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    fromSecret: { name: SECRET_NAME, key: "NEXT_PUBLIC_SUPABASE_ANON_KEY" },
  },
  { name: "NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN", value: ".tempereso.com" },
  { name: "SUPABASE_URL", value: "https://supabase.alanwalton.com" },
  {
    name: "SUPABASE_SERVICE_ROLE_KEY",
    fromSecret: { name: SECRET_NAME, key: "SUPABASE_SERVICE_ROLE_KEY" },
  },
] as const

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "web-deployment", yaml: webDeploymentYaml() },
    { name: "web-service", yaml: webServiceYaml() },
  ]
}
