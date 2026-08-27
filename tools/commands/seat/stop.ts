
export const summary = "Stop an agent, SELF by default: SIGTERM its supervisor and take its seat page"

import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { resolveSeatTargetCli } from "../../lib/seat-handle.ts"
import { A_STOP, stopSeat } from "../../lib/stop-seat.ts"


export const help: CommandHelp = {
  positionals: [
    {
      name: "<agent-id>",
      required: false,
      description:
        "Full agent UUID, 8+ character UUID prefix, or kebab-case name. " +
        "OPTIONAL — defaults to SELF ($AGENT_ID), so a seat ends " +
        "its own turn recoverably with a bare `ops seat stop`.",
    },
  ],
  flags: [
    {
      name: "--json",
      description: "Emit JSON record instead of TSV",
    },
    {
      name: "--force",
      description: "Stop the seat even where subagents are working, ending them with it",
    },
  ],
  exits: [
    { code: 0, meaning: "success (stopped, already-exited, or reconciled)" },
    {
      code: 1,
      meaning:
        "input error (malformed identifier, unknown flag, no target and $AGENT_ID unset, or " +
        "subagents working and no --force)",
    },
    {
      code: 2,
      meaning: "data error (no agent matches the identifier)",
    },
  ],
  examples: [
    "ops seat stop                                # self-stop (no argument)",
    "ops seat stop athena-worker",
    "ops seat stop 019ec7c0 --json",
    "ops seat stop 019ec7c0-4f3e-713b-b150-8ba2d5a5bce6",
    "ops seat stop '#12832'",
  ],
}

export default async function agentStop(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const input = parsed.positionals[0] ?? process.env.AGENT_ID
  if (input === undefined) {
    throw inputError(
      "no <agent-id> given and $AGENT_ID is unset — nothing to stop. " +
        "Pass a target or run inside a supervisor session."
    )
  }

  const resolvedId = await resolveSeatTargetCli(input)

  const stopped = await stopSeat({
    agentId: resolvedId,
    force: parsed.boolean("--force"),
    saying: A_STOP,
  })

  if (parsed.boolean("--json")) {
    process.stdout.write(
      `${JSON.stringify({
        agent_id: stopped.agentId,
        name: stopped.name,
        pid: stopped.pid,
        signaled: stopped.signaled,
        status: stopped.status,
      })}\n`
    )
    return
  }
  process.stdout.write(`${stopped.agentId}\t${stopped.name ?? ""}\t${stopped.status}\n`)
}
