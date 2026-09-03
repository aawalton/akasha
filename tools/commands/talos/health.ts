export const summary = "Run `talosctl health` against a node"

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
      description: "IP of a Talos node to query the health check from.",
    },
    {
      name: "--control-plane-ips",
      argLabel: "<csv>",
      valueShape: "token",
      required: false,
      description:
        "Comma-separated control-plane node IPs for a multi-node cluster (default: just --ip). talosctl's etcd-membership check fails unless every etcd member's IP is listed here.",
    },
    {
      name: "--worker-ips",
      argLabel: "<csv>",
      valueShape: "token",
      required: false,
      description: "Comma-separated worker node IPs for a multi-node cluster (default: none).",
    },
    {
      name: "--cluster",
      argLabel: "<name>",
      valueShape: "token",
      required: false,
      description: `Cluster name (default: "${DEFAULT_CLUSTER_NAME}").`,
    },
  ],
  examples: [
    "ops talos health --ip 192.168.68.75",
    "ops talos health --ip 10.5.0.2 --control-plane-ips 10.5.0.2,10.5.0.3,10.5.0.4 --worker-ips 10.5.0.5",
  ],
}

function parseCsv(value: string | undefined): readonly string[] {
  if (value === undefined) return []
  return value
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}

export default async function talosHealth(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const ip = parsed.requireString("--ip")
  const cluster = parsed.string("--cluster") ?? DEFAULT_CLUSTER_NAME

  const controlPlaneIps = parseCsv(parsed.string("--control-plane-ips"))
  const workerIps = parseCsv(parsed.string("--worker-ips"))
  const controlPlanes = controlPlaneIps.length > 0 ? controlPlaneIps : [ip]

  const talosconfig = clusterTalosconfigPath(cluster)
  if (!existsSync(talosconfig)) {
    throw inputError(
      `talosconfig not found: ${talosconfig}\nRun \`ops talos apply --node <id> --ip ${ip}\` first to generate it.`
    )
  }

  await runTalosctl({
    args: [
      "--talosconfig",
      talosconfig,
      "health",
      "--nodes",
      ip,
      "--endpoints",
      controlPlanes.join(","),
      "--control-plane-nodes",
      controlPlanes.join(","),
      ...(workerIps.length > 0 ? ["--worker-nodes", workerIps.join(",")] : []),
    ],
  })
}
