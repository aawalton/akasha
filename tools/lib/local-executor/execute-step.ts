import { mkdir } from "node:fs/promises"
import { requireFirst } from "@akasha/utils-narrow/require-first"
import { REGISTRY } from "@akasha/workflow-language/images"
import { z } from "zod"
import {
  DIRECT_REGISTRY_HOST,
  DIRECT_REGISTRY_PORT,
  ensureRegistryPortForward,
  LOCAL_REGISTRY,
} from "./cluster-access.ts"
import { containerRuntime } from "./container-runtime.ts"
import { runDockerStep } from "./docker-run.ts"
import { localCacheDir } from "./local-cache.ts"
import { buildOutputBlock } from "./output-block.ts"
import { resolveStepEnv } from "./secrets.ts"
import { resolveLogPath, streamProcessOutput } from "./tee.ts"
import type { PipelineContext, StepConfig, StepResult } from "./types.ts"

const PRIVATE_REGISTRY_PREFIX = `${REGISTRY}/`

export function isBunNative(image: string): boolean {
  return image.startsWith("oven/bun:")
}

function resolveCommand(step: StepConfig): readonly string[] {
  const shell = step.shell ?? ["/bin/sh", "-c"]
  return [...shell, step.commands.join("\n")]
}

export async function checkTagExists(
  fullTag: string,
  isRegistryDirect: () => Promise<boolean>
): Promise<boolean> {
  const firstSlash = fullTag.indexOf("/")
  const repoTag = fullTag.slice(firstSlash + 1)
  const lastColon = repoTag.lastIndexOf(":")
  const repo = repoTag.slice(0, lastColon)
  const tag = repoTag.slice(lastColon + 1)

  let registryHost: string
  if (await isRegistryDirect()) {
    registryHost = `${DIRECT_REGISTRY_HOST}:${DIRECT_REGISTRY_PORT}`
  } else {
    await ensureRegistryPortForward()
    registryHost = LOCAL_REGISTRY
  }

  const url = `https://${registryHost}/v2/${repo}/manifests/${tag}`
  try {
    const resp = await fetch(url, {
      method: "HEAD",
      tls: { rejectUnauthorized: false },
    })
    return resp.ok
  } catch {
    return false
  }
}

export async function executeStepOnce(
  step: StepConfig,
  context: PipelineContext,
  deps: {
    isBuildkitDirect: () => Promise<boolean>
    isRegistryDirect: () => Promise<boolean>
  }
): Promise<StepResult> {
  const startTime = Date.now()
  const logPath = resolveLogPath(context.seq, context.workflowName, step.name)
  const stepPrefix = `[${step.name}] `
  let logs = ""
  let exitCode = 1
  let success = false

  try {
    if (step.skipIfTagExists != null) {
      const exists = await checkTagExists(step.skipIfTagExists, deps.isRegistryDirect)
      if (exists) {
        logs = `[skip] Image ${step.skipIfTagExists} already exists — skipping step`
        console.log(`[local-executor] ${step.name}: ${logs}`)
        exitCode = 0
        success = true
        return { success, logs, exitCode, duration: Date.now() - startTime }
      }
    }

    if (step.image.startsWith(PRIVATE_REGISTRY_PREFIX)) {
      const direct = await deps.isRegistryDirect()
      let pullImage: string
      if (direct) {
        pullImage = step.image
      } else {
        await ensureRegistryPortForward()
        pullImage = step.image.replace(REGISTRY, LOCAL_REGISTRY)
      }
      const runtime = containerRuntime()
      const pullProc = Bun.spawn([runtime, "pull", pullImage], {
        stdout: "pipe",
        stderr: "pipe",
      })
      const pull = await streamProcessOutput({
        proc: pullProc,
        prefix: `[${step.name} pull] `,
        terminal: { stderr: process.stderr },
      })
      if (pull.exitCode !== 0) {
        const tail = (await pull.tail()).trim()
        const err = tail !== "" ? tail : `exit ${pull.exitCode}`
        logs = `[local-executor] ${step.name}: failed to pull "${step.image}": ${err}`
        console.error(logs)
        return { success: false, logs, exitCode: 1, duration: Date.now() - startTime }
      }
      if (!direct) {
        Bun.spawnSync([runtime, "tag", pullImage, step.image])
      }
      console.log(`[local-executor] ${step.name}: pulled ${step.image}`)
    }

    const builtInEnv: Record<string, string> = {
      CI_SEQ: String(context.seq),
      CI_COMMIT_SHA: context.sha,
      CI_COMMIT_BRANCH: context.branch,
      CI_REPO_NAME: context.repoFullName,
      CI_COMMIT_AUTHOR: context.commitAuthor,
      CI_COMMIT_MESSAGE: context.commitMessage,
      PIPELINE_SEQ: String(context.seq),
      WORKFLOW_NAME: context.workflowName,
      STEP_NAME: step.name,
    }

    const stepEnv = step.environment ? resolveStepEnv(step.environment, context.secrets) : {}

    const env: Record<string, string> = { ...builtInEnv, ...stepEnv }
    const hostPath = z.string().optional().parse(process.env.PATH)
    if (hostPath != null) env.PATH = hostPath
    const hostHome = z.string().optional().parse(process.env.HOME)
    if (hostHome != null) env.HOME = hostHome
    const hostSupabaseUrl = z.string().optional().parse(process.env.SUPABASE_URL)
    if (hostSupabaseUrl != null) env.SUPABASE_URL = hostSupabaseUrl
    const hostSupabaseKey = z.string().optional().parse(process.env.SUPABASE_SERVICE_ROLE_KEY)
    if (hostSupabaseKey != null) env.SUPABASE_SERVICE_ROLE_KEY = hostSupabaseKey
    const hostGitToken = z.string().optional().parse(process.env.GIT_ACCESS_TOKEN)
    if (hostGitToken != null) env.GIT_ACCESS_TOKEN = hostGitToken
    if (isBunNative(step.image)) {
      const toolsDir = `${localCacheDir()}/tools`
      env.PATH = `${toolsDir}:${env.PATH ?? ""}`
      env.GIT_EXEC_PATH = `${toolsDir}/git-core`
      env.SSL_CERT_FILE = `${toolsDir}/ssl/ca-certificates.crt`
    }

    const shellNeedsCache = step.shell?.[0]?.startsWith("/ci-storage/")
    const hasStepOutputs = (step.outputs?.length ?? 0) > 0 || (step.dependsOn?.length ?? 0) > 0
    const wantsCiCache =
      step.volumes?.includes("ci-storage:/ci-storage") || shellNeedsCache || hasStepOutputs
    if (wantsCiCache && isBunNative(step.image)) {
      const cacheDir = localCacheDir()
      await mkdir(cacheDir, { recursive: true })
      for (const [key, value] of Object.entries(env)) {
        if (value.includes("/ci-storage")) {
          env[key] = value.replaceAll("/ci-storage", cacheDir)
        }
      }
      console.log(`[local-executor] ${step.name}: rewriting /ci-storage → ${cacheDir}`)
    }

    const command: string[] = [...resolveCommand(step)]

    const outputBlock = buildOutputBlock(step)
    if (outputBlock !== "") {
      command[command.length - 1] = `${outputBlock}${command[command.length - 1]}`
    }

    if (wantsCiCache && isBunNative(step.image)) {
      const cacheDir = localCacheDir()
      command[command.length - 1] = requireFirst(command.slice(-1)).replaceAll(
        "/ci-storage",
        cacheDir
      )
    }

    if (isBunNative(step.image)) {
      const proc = Bun.spawn(command, {
        cwd: context.workspaceName,
        env,
        stdout: "pipe",
        stderr: "pipe",
      })

      const streamed = await streamProcessOutput({
        proc,
        prefix: stepPrefix,
        logPath,
        terminal: { stdout: process.stdout, stderr: process.stderr },
      })
      exitCode = streamed.exitCode
      success = exitCode === 0
      logs = success ? "" : await streamed.tail()
    } else {
      const docker = await runDockerStep({
        step,
        context,
        command,
        builtInEnv,
        stepEnv,
        wantsCiCache,
        stepPrefix,
        logPath,
        isBuildkitDirect: deps.isBuildkitDirect,
        isRegistryDirect: deps.isRegistryDirect,
      })
      exitCode = docker.exitCode
      success = docker.success
      logs = docker.logs
    }

    return { success, logs, exitCode, duration: Date.now() - startTime }
  } catch (error) {
    const errorLogs = logs !== "" ? logs : String(error)
    return { success: false, logs: errorLogs, exitCode, duration: Date.now() - startTime }
  }
}
