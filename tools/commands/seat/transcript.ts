
export const summary = "Materialize an agent's stored session transcript to the local `claude --resume` path (idempotent)"

import type { CommandHelp } from "../../ops/surface.ts"
import { materializeLocalTranscript } from "../../lib/transcript-materialize.ts"
import { dataError, inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { resolveSeatTargetCli } from "../../lib/seat-handle.ts"
import { resolveSessionIdByAgentId } from "../../lib/seat-session-resolve.ts"
import { SEAT_START_DIR } from "../../lib/supervisor-config.ts"


export const help: CommandHelp = {
  flags: [
    { name: "--json", description: "Emit JSON `{ agent_id, session_id, path, downloaded }`" },
  ],
  positionals: [
    {
      name: "target",
      required: true,
      description: "Agent target: UUID, UUID prefix, or name",
    },
  ],
  exits: [
    { code: 0, meaning: "success (materialized, or already present and left alone)" },
    { code: 1, meaning: "input error (missing target, unknown flag)" },
    {
      code: 2,
      meaning:
        "data error (unknown/ambiguous target, no bound session, the object store is\n" +
        "unreachable, or no transcript object exists for the agent — nothing to resume)",
    },
  ],
  examples: [
    "ops seat transcript '#11663'",
    "ops seat transcript isempty-filter-worker",
  ],
}

export default async function agentTranscript(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const target = parsed.positionals[0]
  if (target === undefined || target.length === 0) {
    throw inputError("missing required positional argument(s): target")
  }
  const json = parsed.boolean("--json")

  const agentId = await resolveSeatTargetCli(target)
  const session = await resolveSessionIdByAgentId(agentId)
  if ("error" in session) throw dataError(`[ops] ${session.error}`)
  const sessionId = session.session

  const { path: localPath, downloaded } = await materializeLocalTranscript({
    agentId,
    sessionId,
    cwd: SEAT_START_DIR,
  })

  if (json) {
    process.stdout.write(
      `${JSON.stringify({ agent_id: agentId, session_id: sessionId, path: localPath, downloaded })}\n`
    )
  } else {
    process.stdout.write(`${localPath}\n`)
  }
}
