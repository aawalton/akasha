
import { recordEpoch, replacedAt } from "../lib/epoch.ts"
import { recordingAgentId, resetReadings } from "../lib/read-log.ts"

async function main(): Promise<void> {
  let payload: unknown
  try {
    payload = JSON.parse(await Bun.stdin.text())
  } catch {
    return
  }
  if (payload === null || typeof payload !== "object") return
  const fields = payload as Record<string, unknown>
  const source = typeof fields.source === "string" && fields.source !== "" ? fields.source : "unknown"
  const agent = recordingAgentId(fields)
  if (agent === null) return
  try {
    recordEpoch(agent, source)
    resetReadings(agent, replacedAt(agent))
  } catch {
  }
}

await main()
