
export const summary = "Show model gateway version drift across live seats (running gateway version vs the gateway tree standing on disk)"

import type { CommandHelp } from "../../ops/surface.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { computeModelGatewayTreeVersion } from "../../lib/model-gateway-tree-version.ts"
import {
  type LiveProxySeat,
  resolveLiveProxySeats,
} from "../../lib/model-gateway/proxy-seats.ts"

export const help: CommandHelp = {
  flags: [{ name: "--json", description: "Emit a structured JSON object instead of TSV rows" }],
  examples: ["ops model-gateway status", "ops model-gateway status --json"],
}

type GatewayDriftStatus = "current" | "lagging" | "unknown"

function decideGatewayDrift(running: string | null, onDisk: string | null): GatewayDriftStatus {
  if (running == null || onDisk == null) return "unknown"
  return running === onDisk ? "current" : "lagging"
}

function shortGatewayVersion(version: string | null): string {
  if (version == null || version.length === 0) return "—"
  return version.slice(0, 12)
}

function seatLabel(seat: LiveProxySeat): string {
  return seat.name ?? seat.agentId.slice(0, 8)
}

export default async function modelGatewayStatus(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const seats = resolveLiveProxySeats()
  const onDiskVersion = computeModelGatewayTreeVersion()

  const rows = seats.map((seat) => ({
    seat,
    status: decideGatewayDrift(seat.runningVersion, onDiskVersion),
  }))

  if (json) {
    process.stdout.write(
      `${JSON.stringify({
        ok: true,
        onDiskVersion,
        seats: rows.map(({ seat, status }) => ({
          agentId: seat.agentId,
          name: seat.name,
          status,
          runningVersion: seat.runningVersion,
        })),
      })}\n`
    )
    return
  }

  for (const { seat, status } of rows) {
    process.stdout.write(
      `${seatLabel(seat)}\t${status}\t${shortGatewayVersion(seat.runningVersion)}\t${shortGatewayVersion(onDiskVersion)}\n`
    )
  }
}
