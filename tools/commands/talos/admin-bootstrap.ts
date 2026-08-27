export const summary = "Run the cluster-scoped admin installs (MetalLB, cert-manager, CNPG operator + Barman plugin, pipeline-engine-escalate RBAC) against the Talos admin kubeconfig"

import { spawn } from "node:child_process"
import { existsSync, realpathSync } from "node:fs"
import { resolve } from "node:path"
import { WORKLOAD_CLASSES } from "@infra/k8s-types/hostnames"
import {
  type AdminBootstrapStep,
  type ControlClassOption,
  buildAdminBootstrapPlan,
} from "@infra/talos/admin-bootstrap-plan"
import { runKubectl } from "@infra/talos/lib/kubectl"
import { clusterKubeconfigPath } from "@infra/talos/lib/paths"
import { DEFAULT_CLUSTER_NAME } from "@infra/talos/nodes"
import { assertNever } from "@shared/utils-narrow/assert-never"
import type { CommandHelp } from "../../ops/surface.ts"
import { inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { codeRoot } from "../../lib/code-root.ts"
import { ownRepoRoot } from "../../../repo/roots/roots"

export const help: CommandHelp = {
  positionals: [],
  flags: [
    {
      name: "--cluster",
      argLabel: "<name>",
      valueShape: "token",
      required: false,
      description: `Cluster name (default: "${DEFAULT_CLUSTER_NAME}").`,
    },
    {
      name: "--kubeconfig",
      argLabel: "<path>",
      valueShape: "token",
      required: false,
      description: "Override the default `~/.kube/talos-<cluster>.yaml` source.",
    },
    {
      name: "--control-class",
      argLabel: "<value>",
      valueShape: "token",
      required: false,
      description:
        'Workload-class value the admin Deployments are pinned to (default "control"), or "none" to unpin them (schedule on any node).',
    },
  ],
  examples: [
    "ops talos admin-bootstrap",
    "ops talos admin-bootstrap --kubeconfig ./kubeconfig.talos --control-class control",
    "ops talos admin-bootstrap --cluster main --control-class none",
  ],
}

function runGenerator(scriptPath: string): Promise<string> {
  return new Promise<string>((res, rej) => {
    const child = spawn("bun", [scriptPath], { stdio: ["ignore", "pipe", "inherit"] })
    let stdout = ""
    if (child.stdout) {
      child.stdout.setEncoding("utf8")
      child.stdout.on("data", (chunk: string) => {
        stdout += chunk
      })
    }
    child.on("error", (err: Error & { code?: string }) => {
      const message =
        err.code === "ENOENT" ? "bun not found on PATH" : `bun spawn failed: ${err.message}`
      rej(operationalError(message))
    })
    child.on("close", (code) => {
      if (code === 0) {
        res(stdout)
        return
      }
      rej(operationalError(`generator ${scriptPath} exited ${code}`))
    })
  })
}

async function runStep(
  step: AdminBootstrapStep,
  kubeconfig: string,
  codeRepoRoot: string,
  instructionsRepoRoot: string
): Promise<void> {
  switch (step.kind) {
    case "apply-file": {
      process.stdout.write(`▶ ${step.description}\n`)
      const applyFlags = step.serverSide === true ? ["--server-side", "--force-conflicts"] : []
      await runKubectl({
        args: ["apply", ...applyFlags, "-f", resolve(codeRepoRoot, step.manifestPath)],
        kubeconfig,
      })
      return
    }
    case "apply-generated": {
      process.stdout.write(`▶ ${step.description}\n`)
      const yaml = await runGenerator(resolve(instructionsRepoRoot, step.generatorScript))
      await runKubectl({ args: ["apply", "-f", "-"], kubeconfig, stdin: yaml })
      return
    }
    case "patch-nodeselector": {
      const hasSelector = Object.keys(step.selector).length > 0
      const patch = JSON.stringify({
        spec: { template: { spec: { nodeSelector: hasSelector ? step.selector : null } } },
      })
      await runKubectl({
        args: [
          "-n",
          step.namespace,
          "patch",
          "deployment",
          step.deployment,
          "--type=merge",
          "-p",
          patch,
        ],
        kubeconfig,
      })
      return
    }
    case "rollout": {
      await runKubectl({
        args: [
          "-n",
          step.namespace,
          "rollout",
          "status",
          step.resource,
          `--timeout=${step.timeoutSeconds}s`,
        ],
        kubeconfig,
      })
      return
    }
    default:
      assertNever(step)
  }
}

export default async function talosAdminBootstrap(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const cluster = parsed.string("--cluster") ?? DEFAULT_CLUSTER_NAME

  const kubeconfig = parsed.string("--kubeconfig") ?? clusterKubeconfigPath(cluster)

  const raw = parsed.string("--control-class")
  let controlClass: ControlClassOption | undefined
  if (raw !== undefined) {
    if (raw === "none") {
      controlClass = "none"
    } else {
      const classes = WORKLOAD_CLASSES
      const match = classes.find((c) => c === raw)
      if (match === undefined) {
        throw inputError(
          `--control-class must be one of: ${classes.join(", ")}, or "none" (got "${raw}")`
        )
      }
      controlClass = match
    }
  }

  if (!existsSync(kubeconfig)) {
    throw inputError(
      `kubeconfig not found: ${kubeconfig}\nRun \`ops talos kubeconfig --ip <ip>\` first to fetch it.`
    )
  }

  const codeRepoRoot = realpathSync(codeRoot())
  const instructionsRepoRoot = realpathSync(ownRepoRoot())

  const plan = buildAdminBootstrapPlan(controlClass === undefined ? {} : { controlClass })
  for (const step of plan.steps) {
    await runStep(step, kubeconfig, codeRepoRoot, instructionsRepoRoot)
  }
  process.stdout.write("admin-bootstrap complete\n")
}
