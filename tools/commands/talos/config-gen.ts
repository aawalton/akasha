export const summary = "Emit the Talos machine-config patch YAML for the given node"

import { writeFile } from "node:fs/promises"
import { buildNodePatch, PLACEHOLDER_SCHEMATIC_ID } from "@akasha/talos/talos-build-patch"
import { buildNodeVolumes } from "@akasha/talos/talos-build-volumes"
import { emitDocumentsYaml } from "@akasha/talos/talos-emit-yaml"
import { getClusterForNode, getNode } from "@akasha/talos/talos-nodes"
import { readRegistryCa } from "@akasha/talos/talos-registry-ca"
import type { NodeIntent } from "@akasha/talos/talos-schema"
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
      description: "Node id (e.g. node-03). Must match a key in src/nodes.ts.",
    },
    {
      name: "--output",
      argLabel: "<path>",
      valueShape: "token",
      description: "Write to a file instead of stdout.",
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
  envVars: [
    {
      name: "TALOS_SCHEMATIC_ID",
      description:
        "Image Factory schematic id (deterministic content hash of the schematic YAML). Required for a real apply; defaults to a stable placeholder otherwise.",
    },
  ],
  examples: [
    "ops talos config-gen --node node-03",
    "TALOS_SCHEMATIC_ID=abc123 ops talos config-gen --node node-03 --output node-03.patch.yaml",
    "ops talos config-gen node-03",
  ],
}

export default async function talosConfigGen(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const nodeId = parsed.requireString("--node")
  const output = parsed.string("--output")

  let node: NodeIntent
  try {
    node = getNode(nodeId)
  } catch (err) {
    throw inputError(err instanceof Error ? err.message : String(err))
  }
  const cluster = getClusterForNode(nodeId)

  const schematicId = parsed.env("TALOS_SCHEMATIC_ID") ?? PLACEHOLDER_SCHEMATIC_ID
  const registryCa = cluster.registryHosts.length > 0 ? readRegistryCa() : undefined
  const patch = buildNodePatch(node, cluster, schematicId, { registryCa })
  const yaml = emitDocumentsYaml([patch, ...buildNodeVolumes(node)])

  if (output !== undefined) {
    await writeFile(output, yaml)
    process.stdout.write(`wrote ${output}\n`)
    return
  }
  process.stdout.write(yaml)
}
