export const summary = "Fetch the cluster kubeconfig and write it to a file"

import { existsSync } from "node:fs"
import { mkdir } from "node:fs/promises"
import { dirname } from "node:path"
import { DEFAULT_CLUSTER_NAME } from "@akasha/talos/talos-nodes"
import { clusterKubeconfigPath, clusterTalosconfigPath } from "@akasha/talos/talos-paths"
import { runTalosctl } from "@akasha/talos/talosctl"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [],
  flags: [
    {
      name: "--ip",
      argLabel: "<ip>",
      valueShape: "token",
      required: true,
      description: "IP of any reachable Talos node (control plane preferred).",
    },
    {
      name: "--cluster",
      argLabel: "<name>",
      valueShape: "token",
      required: false,
      description: `Cluster name (default: "${DEFAULT_CLUSTER_NAME}").`,
    },
    {
      name: "--output",
      argLabel: "<path>",
      valueShape: "token",
      required: false,
      description: "Override the default `~/.kube/talos-<cluster>.yaml` destination.",
    },
  ],
  examples: [
    "ops talos kubeconfig --ip 192.168.68.75",
    "ops talos kubeconfig --ip 192.168.68.75 --output ./kubeconfig.talos",
  ],
}

export default async function talosKubeconfig(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const ip = parsed.requireString("--ip")
  const cluster = parsed.string("--cluster") ?? DEFAULT_CLUSTER_NAME

  const output = parsed.string("--output") ?? clusterKubeconfigPath(cluster)

  const talosconfig = clusterTalosconfigPath(cluster)
  if (!existsSync(talosconfig)) {
    throw inputError(
      `talosconfig not found: ${talosconfig}\nRun \`ops talos apply --node <id> --ip ${ip}\` first to generate it.`
    )
  }

  await mkdir(dirname(output), { recursive: true })

  await runTalosctl({
    args: [
      "--talosconfig",
      talosconfig,
      "kubeconfig",
      "--nodes",
      ip,
      "--endpoints",
      ip,
      "--force",
      output,
    ],
  })
  process.stdout.write(`wrote ${output}\n`)
}
