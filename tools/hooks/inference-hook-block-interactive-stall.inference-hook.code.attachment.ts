import { keeper } from "../lib/hook-decision-record.ts"
import { decideTurnEnd } from "../lib/turn-end-decide-call.ts"

const HOOK_NAME = "block-interactive-stall"

async function main(): Promise<number> {
  let stdin = ""
  try {
    stdin = await Bun.stdin.text()
  } catch {
    stdin = ""
  }
  const agent = process.env.AGENT_ID ?? ""
  const kept = keeper(HOOK_NAME, agent, stdin)
  if (agent === "") {
    await kept.record("allow", "no-agent-id")
    return 0
  }
  if (kept.seatMode() !== "interactive") {
    await kept.record("allow", "not-interactive")
    return 0
  }
  return decideTurnEnd(kept, agent, stdin)
}

if (import.meta.main) process.exit(await main())
