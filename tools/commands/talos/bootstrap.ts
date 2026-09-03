export const summary = "Bootstrap etcd on the given Talos control-plane node (one-time)"

import { existsSync } from "node:fs"
import { clusterTalosconfigPath } from "@akasha/talos/talos-paths"
import { runTalosctl } from "@akasha/talos/talosctl"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const DEFAULT_CLUSTER_NAME = "main"

export const help: CommandHelp = {
  positionals: [],
  flags: [
    {
      name: "--ip",
      argLabel: "<ip>",
      valueShape: "token",
      required: true,
      description: "IP of the control-plane node to bootstrap.",
    },
    {
      name: "--cluster",
      argLabel: "<name>",
      valueShape: "token",
      required: false,
      description: `Cluster name (default: "${DEFAULT_CLUSTER_NAME}").`,
    },
  ],
  examples: ["ops talos bootstrap --ip 192.168.68.75"],
}

export default async function talosBootstrap(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const ip = parsed.requireString("--ip")
  const cluster = parsed.string("--cluster") ?? DEFAULT_CLUSTER_NAME

  const talosconfig = clusterTalosconfigPath(cluster)
  if (!existsSync(talosconfig)) {
    throw inputError(
      `talosconfig not found: ${talosconfig}\nRun \`ops talos apply --node <id> --ip ${ip}\` first to generate it.`
    )
  }

  await runTalosctl({
    args: ["--talosconfig", talosconfig, "bootstrap", "--nodes", ip, "--endpoints", ip],
  })
}
