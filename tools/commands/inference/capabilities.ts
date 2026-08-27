export const summary = "List image pool services + the live env-local mflux-* batch-CLI surface"

import type { CommandHelp } from "../../ops/surface.ts"
import { inferenceBuildScript, inferenceReconcile } from "../../lib/inference-reconcile.ts"
import { inferenceHosts, inferenceServices } from "../../lib/inference-registry.ts"
import { type InferenceService } from "../../lib/inference/schema"
import { inferenceSsh } from "../../lib/inference-ssh.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  positionals: [],
  flags: [],
  examples: ["ops inference capabilities"],
}

function flagValue(command: readonly string[], flag: string): string | undefined {
  const i = command.indexOf(flag)
  return i >= 0 ? command[i + 1] : undefined
}

function endpointFor(command: readonly string[]): string {
  return flagValue(command, "--model-type") === "image-edit"
    ? "POST /v1/images/edits"
    : "POST /v1/images/generations"
}

function isImagePoolService(service: InferenceService): boolean {
  return service.lifecycle === "pool" && service.name.startsWith("image-")
}

export default async function inferenceCapabilities(args: readonly string[]): Promise<void> {
  parseArgs(help, args)

  const services = await inferenceServices()
  const imageServices = services.filter(isImagePoolService)
  const first = imageServices[0]
  if (first === undefined) {
    process.stdout.write("(no image services declared)\n")
    return
  }
  const { getHost } = await inferenceHosts()
  const host = getHost(first.host)

  process.stdout.write(`\n=== ${host.name} (${host.address}) — image capabilities ===\n`)

  process.stdout.write(
    "\npool services (HTTP, fronted by the traffic cop — one resident at a time):\n"
  )
  const namePad = Math.max(...imageServices.map((s) => s.name.length))
  const modelPad = Math.max(
    ...imageServices.map((s) => (flagValue(s.command, "--model-path") ?? "?").length)
  )
  for (const s of imageServices) {
    const model = flagValue(s.command, "--model-path") ?? "?"
    process.stdout.write(
      `  ${s.name.padEnd(namePad)}  ${model.padEnd(modelPad)}  :${s.port}  ${endpointFor(s.command)}\n`
    )
  }

  const queryEnv = first.name
  process.stdout.write(
    `\nmflux batch CLIs (env-local in inference-${queryEnv}; run over SSH, evict the resident pool model first):\n`
  )
  let tools: readonly string[] = []
  try {
    const { buildMfluxQueryScript } = await inferenceBuildScript()
    const { runSshCapture } = await inferenceSsh()
    const { parseMfluxTools } = await inferenceReconcile()
    const target = { user: host.user, host: host.address, keyPath: host.keyPath }
    tools = parseMfluxTools(await runSshCapture(target, buildMfluxQueryScript(host, queryEnv)))
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    process.stdout.write(`  (could not query host: ${reason})\n`)
    return
  }
  if (tools.length === 0) {
    process.stdout.write(`  (none found — inference-${queryEnv} env not provisioned?)\n`)
    return
  }
  for (const t of tools) {
    process.stdout.write(`  ${t}\n`)
  }
}
