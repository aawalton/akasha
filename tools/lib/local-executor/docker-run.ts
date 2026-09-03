import { homedir } from "node:os"
import { join } from "node:path"
import { requireFirst } from "@akasha/utils-narrow/require-first"
import { z } from "zod"
import {
  DIRECT_BUILDKIT_HOST,
  DIRECT_BUILDKIT_PORT,
  DIRECT_REGISTRY_HOST,
  DIRECT_REGISTRY_PORT,
  ensureBuildkitPortForward,
  ensureRegistryPortForward,
  LOCAL_REGISTRY,
} from "./cluster-access.ts"
import { containerRuntime } from "./container-runtime.ts"
import { localCacheDir } from "./local-cache.ts"
import { streamProcessOutput } from "./tee.ts"
import type { PipelineContext, StepConfig } from "./types.ts"

export interface DockerRunResult {
  exitCode: number
  success: boolean
  logs: string
}

export interface RunDockerStepInput {
  step: StepConfig
  context: PipelineContext
  command: readonly string[]
  builtInEnv: Record<string, string>
  stepEnv: Record<string, string>
  wantsCiCache: boolean
  stepPrefix: string
  logPath: string
  isBuildkitDirect: () => Promise<boolean>
  isRegistryDirect: () => Promise<boolean>
}

export async function runDockerStep(input: RunDockerStepInput): Promise<DockerRunResult> {
  const {
    step,
    context,
    command,
    builtInEnv,
    stepEnv,
    wantsCiCache,
    stepPrefix,
    logPath,
    isBuildkitDirect,
    isRegistryDirect,
  } = input

  const dockerArgs = [containerRuntime(), "run", "--rm"]

  dockerArgs.push("--user", "root")

  dockerArgs.push("--security-opt", "label=disable")

  dockerArgs.push("-v", `${context.workspaceName}:/workspace`)
  dockerArgs.push("-w", "/workspace")

  for (const [key, value] of Object.entries({
    WORKSPACE: "/workspace",
    ...builtInEnv,
    ...stepEnv,
  })) {
    dockerArgs.push("-e", `${key}=${value}`)
  }

  const isUniversalImage = step.image === "debian:bookworm-slim"
  const needsCiCache = wantsCiCache || isUniversalImage
  if (needsCiCache) {
    dockerArgs.push("-v", `${localCacheDir()}:/ci-storage`)
  }
  if (needsCiCache && isUniversalImage) {
    dockerArgs.push(
      "-e",
      "PATH=/ci-storage/tools:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
    )
    dockerArgs.push("-e", "LD_LIBRARY_PATH=/ci-storage/tools/lib")
    dockerArgs.push("-e", "GIT_EXEC_PATH=/ci-storage/tools/git-core")
    dockerArgs.push("-e", "SSL_CERT_FILE=/ci-storage/tools/ssl/ca-certificates.crt")
  }

  let hasHostNetwork = false
  const enableHostNetwork = () => {
    if (!hasHostNetwork) {
      dockerArgs.push("--network", "host")
      hasHostNetwork = true
    }
  }

  if (step.serviceAccountName != null) {
    const kubeconfigEnv = z.string().optional().parse(process.env.KUBECONFIG)
    const kubeConfig =
      kubeconfigEnv != null && kubeconfigEnv !== ""
        ? requireFirst(kubeconfigEnv.split(":"))
        : join(homedir(), ".kube", "config")
    dockerArgs.push("-v", `${kubeConfig}:/tmp/.kube/config:ro`)
    dockerArgs.push("-e", "KUBECONFIG=/tmp/.kube/config")
    enableHostNetwork()
  }

  const buildkitAddr = `tcp://${DIRECT_BUILDKIT_HOST}:${DIRECT_BUILDKIT_PORT}`
  const originalLastCmd = requireFirst(command.slice(-1))
  const isBuildkitStep = originalLastCmd.includes(buildkitAddr)
  let lastCmd = originalLastCmd
  if (isBuildkitStep) {
    enableHostNetwork()
    if (!(await isBuildkitDirect())) {
      const buildkitHost = z
        .string()
        .default(`tcp://127.0.0.1:${DIRECT_BUILDKIT_PORT}`)
        .parse(process.env.BUILDKIT_HOST)
      lastCmd = originalLastCmd.replaceAll(buildkitAddr, buildkitHost)
      await ensureBuildkitPortForward()
    }
  }

  const internalRegistry = `${DIRECT_REGISTRY_HOST}:${DIRECT_REGISTRY_PORT}`
  const isDirectRegistryAccess =
    !isBuildkitStep && step.serviceAccountName == null && lastCmd.includes(internalRegistry)
  if (isDirectRegistryAccess) {
    enableHostNetwork()
    if (!(await isRegistryDirect())) {
      lastCmd = lastCmd.replaceAll(internalRegistry, LOCAL_REGISTRY)
      await ensureRegistryPortForward()
    }
  }

  const effectiveCommand = [...command.slice(0, -1), lastCmd]

  const shells = new Set(["/bin/sh", "/bin/bash", "/ci-storage/tools/bash", "sh", "bash"])
  const firstCmd = requireFirst(effectiveCommand)
  if (shells.has(firstCmd)) {
    dockerArgs.push("--entrypoint", firstCmd, step.image, ...effectiveCommand.slice(1))
  } else {
    dockerArgs.push(step.image, ...effectiveCommand)
  }

  const proc = Bun.spawn(dockerArgs, {
    stdout: "pipe",
    stderr: "pipe",
  })

  const streamed = await streamProcessOutput({
    proc,
    prefix: stepPrefix,
    logPath,
    terminal: { stdout: process.stdout, stderr: process.stderr },
  })
  const exitCode = streamed.exitCode
  const success = exitCode === 0
  const logs = success ? "" : await streamed.tail()

  return { exitCode, success, logs }
}
