export const summary = "List image pool services + the live env-local mflux-* batch-CLI surface"

import { getHost } from "@akasha/inference-pool/inference-hosts"
import { parseMfluxTools } from "@akasha/inference-pool/inference-reconcile"
import type { InferenceService } from "@akasha/inference-pool/inference-schema"
import { SERVICES } from "@akasha/inference-pool/inference-services"
import { runSshCapture } from "@akasha/inference-pool/inference-ssh"
import { buildMfluxQueryScript } from "@akasha/inference-pool/provision-script"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

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

  const imageServices = SERVICES.filter(isImagePoolService)
  const first = imageServices[0]
  if (first === undefined) {
    process.stdout.write("(no image services declared)\n")
    return
  }
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
