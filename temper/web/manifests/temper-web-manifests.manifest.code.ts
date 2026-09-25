import { synthOne } from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import { resourcesOf } from "akasha/infrastructure/cluster/k8s-type/modules/container-resources/container-resources.module.code.ts"
import { workloadClassMemberSelector } from "akasha/infrastructure/cluster/k8s-type/modules/hostnames/hostnames.module.code.ts"
import { webServiceYaml } from "akasha/infrastructure/cluster/k8s-type/modules/k8s-web-service/k8s-web-service.module.code.ts"
import { synthWebDeploymentService } from "akasha/infrastructure/cluster/k8s-type/modules/manifest-composing/manifest-composing.module.code.ts"
import {
  orchestratorCacheChownInitContainer,
  orchestratorCacheInitContainer,
  orchestratorCacheSyncSidecar,
  webBuildInitContainer,
} from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache/orchestrator-cache.module.code.ts"
import {
  orchestratorCacheEntrypointPath,
  orchestratorCacheVolumeMounts,
  orchestratorCacheVolumes,
} from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache-helpers/orchestrator-cache-helpers.module.code.ts"
import {
  BUN_RUNTIME_IMAGE,
  ORCHESTRATOR_CACHE_REPO_PATH,
  TEMPER_WEB_CACHE,
} from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache-locations/orchestrator-cache-locations.module.code.ts"
import { temperWeb } from "akasha/infrastructure/service/akasha-service/service-cluster/pages/temper-web/temper-web.service-cluster.ts"
import { ADDON_BUNDLE_IMAGE } from "akasha/temper/web/deploy/addon-bundle-image.ts"
import { temperWebManifests as page } from "akasha/temper/web/manifests/temper-web-manifests.manifest.ts"

const NAMESPACE = temperWeb.namespace
const APP_NAME = temperWeb.resourceName
const SECRET_NAME = "temper-secrets"
const PACKAGE_PATH = "temper/web"

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

function initWatcherContainer(): object {
  const script = [
    "set -e",
    `mkdir -p ${WATCHER_DEST_DIR}`,
    `cp -f ${WATCHER_IMAGE_SOURCE_DIR}/temper-watcher.exe ${WATCHER_DEST_DIR}/temper-watcher.exe`,
    `cp -f ${WATCHER_IMAGE_SOURCE_DIR}/temper-watcher-worker.exe ${WATCHER_DEST_DIR}/temper-watcher-worker.exe`,
    `cp -f ${WATCHER_IMAGE_SOURCE_DIR}/version.txt ${WATCHER_DEST_DIR}/version.txt`,
    `echo "init-watcher: copied into ${WATCHER_DEST_DIR}"`,
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
    `echo "init-addons: copied into ${ADDONS_DEST_DIR}"`,
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
      replicas: temperWeb.replicas,
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
            webBuildInitContainer({ packagePath: PACKAGE_PATH, secretName: SECRET_NAME }),
          ],
          containers: [
            {
              name: APP_NAME,
              image: BUN_RUNTIME_IMAGE,
              imagePullPolicy: "IfNotPresent",
              workingDir: orchestratorCacheEntrypointPath(PACKAGE_PATH),
              command: ["bun", "run", "server.ts"],
              ports: [{ containerPort: temperWeb.containerPort, protocol: "TCP" }],
              envFrom: [{ secretRef: { name: SECRET_NAME } }],
              env: [
                { name: "NODE_ENV", value: "production" },
                { name: "AKASHA_ROOT", value: ORCHESTRATOR_CACHE_REPO_PATH },
                { name: "HOST", value: "0.0.0.0" },
                { name: "PORT", value: `${temperWeb.containerPort}` },
                { name: "PAGE_WRITER", value: "temper-web" },
                { name: "BASE_URL", value: "https://tempereso.com" },
                { name: "WATCHER_DIR", value: WATCHER_DEST_DIR },
                { name: "ADDONS_BUNDLE_DIR", value: ADDONS_DEST_DIR },
              ],
              volumeMounts: orchestratorCacheVolumeMounts(),
              resources: resourcesOf(page),
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 1000,
                readOnlyRootFilesystem: true,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
              },
              livenessProbe: {
                httpGet: { path: "/api/watcher/version", port: temperWeb.containerPort },
                initialDelaySeconds: 15,
                periodSeconds: 10,
                failureThreshold: 6,
                timeoutSeconds: 5,
              },
              readinessProbe: {
                httpGet: { path: "/api/watcher/version", port: temperWeb.containerPort },
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
          volumes: orchestratorCacheVolumes(TEMPER_WEB_CACHE),
        },
      },
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return synthWebDeploymentService(webDeploymentYaml, () =>
    webServiceYaml(NAMESPACE, APP_NAME, temperWeb.containerPort, RESOURCE_LABELS, SELECTOR_LABELS)
  )
}
