export const summary = "Apply the Talos machine config to a node in maintenance mode"

import { existsSync } from "node:fs"
import { chmod, copyFile, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import { buildNodePatch } from "@akasha/talos/talos-build-patch"
import { buildSchematic } from "@akasha/talos/talos-build-schematic"
import { buildNodeVolumes } from "@akasha/talos/talos-build-volumes"
import { emitDocumentsYaml, emitPatchYaml, emitSchematicYaml } from "@akasha/talos/talos-emit-yaml"
import { registerSchematic } from "@akasha/talos/talos-factory"
import { DEFAULT_CLUSTER_NAME, getCluster, getNode } from "@akasha/talos/talos-nodes"
import { clusterSecretsSopsPath, clusterTalosconfigPath } from "@akasha/talos/talos-paths"
import { readRegistryCa } from "@akasha/talos/talos-registry-ca"
import type { NodeIntent } from "@akasha/talos/talos-schema"
import { decryptToTmp } from "@akasha/talos/talos-sops"
import { runTalosctl } from "@akasha/talos/talosctl"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--node",
      argLabel: "<id>",
      valueShape: "token",
      required: true,
      description: "Node id (e.g. node-03).",
    },
    {
      name: "--ip",
      argLabel: "<ip>",
      valueShape: "token",
      required: true,
      description: "Talos maintenance-mode IP address of the node.",
    },
    {
      name: "--cluster",
      argLabel: "<name>",
      valueShape: "token",
      required: false,
      description: `Cluster override for recovery (default: the node's own cluster, e.g. "${DEFAULT_CLUSTER_NAME}").`,
    },
  ],
  positionals: [
    {
      name: "node",
      required: false,
      aliasOfFlag: "--node",
      description: "Node id",
    },
  ],
  examples: [
    "ops talos apply --node node-03 --ip 192.168.68.75",
    "ops talos apply node-03 --ip 192.168.68.75",
  ],
}

export default async function talosApply(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const nodeId = parsed.requireString("--node")
  const ip = parsed.requireString("--ip")

  let node: NodeIntent
  try {
    node = getNode(nodeId)
  } catch (err) {
    throw inputError(err instanceof Error ? err.message : String(err))
  }
  const cluster = parsed.string("--cluster") ?? node.cluster
  const clusterIntent = getCluster(cluster)

  const secretsSopsPath = clusterSecretsSopsPath(cluster)
  if (!existsSync(secretsSopsPath)) {
    throw inputError(
      `cluster secrets file not found: ${secretsSopsPath}\nRun \`ops talos secrets gen --cluster ${cluster}\` first.`
    )
  }

  process.stdout.write(`registering image factory schematic for ${node.id}...\n`)
  const schematicId = await registerSchematic(emitSchematicYaml(buildSchematic(node)))
  process.stdout.write(`schematic id: ${schematicId}\n`)

  const registryCa = clusterIntent.registryHosts.length > 0 ? readRegistryCa() : undefined

  const patchYaml = emitPatchYaml(buildNodePatch(node, clusterIntent, schematicId, { registryCa }))
  const workDir = await mkdtemp(join(tmpdir(), `talos-apply-${node.id}-`))
  const patchPath = join(workDir, "patch.yaml")
  await writeFile(patchPath, patchYaml)

  const volumesYaml = emitDocumentsYaml(buildNodeVolumes(node))
  const volumesPatchArgs: string[] = []
  if (volumesYaml.length > 0) {
    const volumesPath = join(workDir, "volumes.yaml")
    await writeFile(volumesPath, volumesYaml)
    volumesPatchArgs.push("--config-patch", `@${volumesPath}`)
  }

  const isWorker = node.role === "worker"
  const machineType = isWorker ? "worker" : "controlplane"
  const appliedFile = `${machineType}.yaml`

  let decryptedSecretsPath: string | undefined
  try {
    decryptedSecretsPath = await decryptToTmp(secretsSopsPath)
    const endpoint =
      clusterIntent.controlPlaneVip !== undefined
        ? `https://${clusterIntent.controlPlaneVip}:6443`
        : `https://${ip}:6443`
    await runTalosctl({
      args: [
        "gen",
        "config",
        cluster,
        endpoint,
        "--with-secrets",
        decryptedSecretsPath,
        "--config-patch",
        `@${patchPath}`,
        ...volumesPatchArgs,
        "--output-types",
        `${machineType},talosconfig`,
        "--output",
        workDir,
        "--force",
      ],
    })

    const generatedTalosconfig = join(workDir, "talosconfig")
    const appliedPath = join(workDir, appliedFile)
    const persistedTalosconfig = clusterTalosconfigPath(cluster)
    await mkdir(dirname(persistedTalosconfig), { recursive: true, mode: 0o700 })
    await copyFile(generatedTalosconfig, persistedTalosconfig)
    await chmod(persistedTalosconfig, 0o600)
    process.stdout.write(`wrote talosconfig to ${persistedTalosconfig}\n`)

    process.stdout.write(`applying ${appliedFile} to ${ip}...\n`)
    await runTalosctl({
      args: ["apply-config", "--insecure", "--nodes", ip, "--file", appliedPath],
    })
  } finally {
    if (decryptedSecretsPath !== undefined) {
      await rm(dirname(decryptedSecretsPath), { recursive: true, force: true })
    }
    await rm(workDir, { recursive: true, force: true })
  }
}
