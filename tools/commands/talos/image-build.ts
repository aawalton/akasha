export const summary =
  "POST the node's Image Factory schematic to factory.talos.dev, optionally downloading the installer ISO"

import { writeFile } from "node:fs/promises"
import { buildSchematic } from "@akasha/talos/talos-build-schematic"
import { emitSchematicYaml } from "@akasha/talos/talos-emit-yaml"
import { installerIsoUrl, registerSchematic } from "@akasha/talos/talos-factory"
import { getClusterForNode, getNode } from "@akasha/talos/talos-nodes"
import type { NodeIntent } from "@akasha/talos/talos-schema"
import { inputError, operationalError } from "../../lib/exit.ts"
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
      name: "--download",
      argLabel: "<path>",
      valueShape: "token",
      description: "Download the installer ISO to the given path after registering the schematic.",
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
    "ops talos image-build --node node-03",
    "ops talos image-build --node node-03 --download /tmp/talos-node-03.iso",
    "ops talos image-build node-03",
  ],
}

export default async function talosImageBuild(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const nodeId = parsed.requireString("--node")
  const downloadPath = parsed.string("--download")

  let node: NodeIntent
  try {
    node = getNode(nodeId)
  } catch (err) {
    throw inputError(err instanceof Error ? err.message : String(err))
  }

  const schematicYaml = emitSchematicYaml(buildSchematic(node))
  const id = await registerSchematic(schematicYaml)
  const isoUrl = installerIsoUrl(id, getClusterForNode(nodeId).talosVersion)

  process.stdout.write(`schematic id: ${id}\n`)
  process.stdout.write(`installer iso: ${isoUrl}\n`)

  if (downloadPath !== undefined) {
    await downloadIso(isoUrl, downloadPath)
    process.stdout.write(`wrote ${downloadPath}\n`)
  }
}

async function downloadIso(url: string, path: string): Promise<void> {
  let res: Response
  try {
    res = await fetch(url)
  } catch (err) {
    throw operationalError(
      `failed to fetch ${url}: ${err instanceof Error ? err.message : String(err)}`
    )
  }
  if (!res.ok) {
    throw operationalError(`installer ISO fetch returned ${res.status}`)
  }
  const buf = await res.arrayBuffer()
  await writeFile(path, new Uint8Array(buf))
}
