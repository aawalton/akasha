export const summary = "Generate and SOPS-encrypt a Talos cluster's PKI bundle"

import { existsSync } from "node:fs"
import { mkdir, mkdtemp, rm, stat } from "node:fs/promises"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import { DEFAULT_CLUSTER_NAME } from "@akasha/talos/talos-nodes"
import { clusterSecretsSopsPath } from "@akasha/talos/talos-paths"
import { encryptFile } from "@akasha/talos/talos-sops"
import { runTalosctl } from "@akasha/talos/talosctl"
import { inputError, operationalError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

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
      name: "--force",
      required: false,
      description:
        "Overwrite an existing secrets file. Invalidates every node's PKI — only use for a deliberate rotation.",
    },
  ],
  examples: [
    "ops talos secrets gen",
    "ops talos secrets gen --cluster main",
    "ops talos secrets gen --cluster main --force",
  ],
}

export default async function talosSecretsGen(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const cluster = parsed.string("--cluster") ?? DEFAULT_CLUSTER_NAME
  const force = parsed.boolean("--force")

  const destPath = clusterSecretsSopsPath(cluster)
  if (existsSync(destPath) && !force) {
    throw inputError(
      `secrets file already exists: ${destPath}\nRe-running invalidates every node's PKI. Pass --force only for a deliberate rotation.`
    )
  }

  await mkdir(dirname(destPath), { recursive: true })

  const workDir = await mkdtemp(join(tmpdir(), "talos-secrets-gen-"))
  const tmpSecretsPath = join(workDir, "secrets.yaml")
  try {
    await runTalosctl({
      args: ["gen", "secrets", "-o", tmpSecretsPath, "--force"],
    })
    const info = await stat(tmpSecretsPath)
    if (info.size === 0) {
      throw operationalError("talosctl gen secrets produced empty output")
    }
    await encryptFile(tmpSecretsPath, destPath)
    process.stdout.write(`wrote SOPS-encrypted secrets to ${destPath}\n`)
  } finally {
    await rm(workDir, { recursive: true, force: true })
  }
}
