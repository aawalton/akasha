import { shortCommit } from "../ci-container-dispatcher/container-name.ts"
import { WORKLOAD_CLASS_KEY } from "@infra/k8s-types/hostnames"
import {
  buildCompleteBodyTemplate,
  buildStartedBodyTemplate,
  buildStartedBodyTemplateFallback,
} from "./body-templates.ts"
import { mergeContainerResources } from "./container-resources-merge.ts"
import { buildEntrypointShell } from "./pod-spec-entrypoint.ts"
import { buildPodEnv } from "./pod-spec-env.ts"
import {
  asCommitSha40,
  buildPodName,
  DEFAULT_NAMESPACE,
  POD_SECURITY_CONTEXT,
} from "./pod-spec-helpers.ts"
import { buildPodLabels } from "./pod-spec-labels.ts"
import type { RunToCompletionContext, StepConfig } from "./pod-spec-step-config.ts"
import {
  type K8sPodSpec,
  type K8sPodSpecBody,
  STEP_IMAGE_PULL_POLICY,
} from "./pod-spec-types.ts"
import { buildPodVolumes } from "./pod-spec-volumes.ts"
import { stepPatchIfPath } from "./report-payload.ts"


const CI_NODE_SELECTOR: Record<string, string> = { [`${WORKLOAD_CLASS_KEY}.ci`]: "true" }

export interface BuildPodSpecArgs {
  context: RunToCompletionContext
  step: StepConfig
  stepPageName: string
  pageQueryOrigin: string
  namespace?: string
}

export function buildRunToCompletionPodSpec(args: BuildPodSpecArgs): K8sPodSpec {
  const { context, step, stepPageName, pageQueryOrigin, namespace = DEFAULT_NAMESPACE } = args
  const fullSha = asCommitSha40(context.sha)
  const shortSha = shortCommit(context.sha)
  const podName = buildPodName(context.seq, step.name, context.sha)

  const startedTemplate = buildStartedBodyTemplate()
  const startedTemplateFallback = buildStartedBodyTemplateFallback()
  const completeTemplate = buildCompleteBodyTemplate()

  const shell = step.shell ?? ["/bin/sh", "-c"]
  const entrypoint = buildEntrypointShell({ context, step })

  const envEntries = buildPodEnv({
    context,
    step,
    podName,
    pageQueryOrigin,
    stepPagePath: stepPatchIfPath(stepPageName),
    startedTemplate,
    startedTemplateFallback,
    completeTemplate,
  })

  const hardenedSecurityContext = {
    allowPrivilegeEscalation: false,
    capabilities:
      step.runAsUser === 0
        ? { drop: ["ALL"], add: ["DAC_OVERRIDE", "CHOWN", "FOWNER"] }
        : { drop: ["ALL"], add: ["DAC_OVERRIDE"] },
    ...(step.runAsUser !== undefined && { runAsUser: step.runAsUser }),
  }

  const { volumes, volumeMounts } = buildPodVolumes(step.secretMounts ?? [])

  const defaultResources = {
    requests: { cpu: "100m", memory: "512Mi" },
    limits: { memory: "1Gi" },
  }

  const spec: K8sPodSpecBody = {
    restartPolicy: "Never",
    nodeSelector: CI_NODE_SELECTOR,
    securityContext: POD_SECURITY_CONTEXT,
    initContainers: [
      {
        name: "fix-cache-permissions",
        image: "busybox:stable",
        command: ["sh", "-c", "chown 1000:1000 /ci-storage"],
        volumeMounts: [{ name: "ci-storage", mountPath: "/ci-storage" }],
        resources: {
          requests: { cpu: "10m", memory: "16Mi" },
          limits: { cpu: "50m", memory: "32Mi" },
        },
        securityContext: {
          runAsUser: 0,
          allowPrivilegeEscalation: false,
        },
      },
    ],
    containers: [
      {
        name: "step",
        image: step.image,
        imagePullPolicy: STEP_IMAGE_PULL_POLICY,
        command: [...shell, entrypoint],
        env: envEntries,
        volumeMounts,
        resources: mergeContainerResources(defaultResources, step.resources),
        securityContext: hardenedSecurityContext,
      },
    ],
    volumes,
  }

  if (step.serviceAccountName != null) {
    spec.serviceAccountName = step.serviceAccountName
  }

  const labels = buildPodLabels({ context, step, shortSha, fullSha })

  return {
    apiVersion: "v1",
    kind: "Pod",
    metadata: {
      name: podName,
      namespace,
      labels,
    },
    spec,
  }
}
