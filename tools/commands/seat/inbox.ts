export const summary =
  "Drain your own mailbox: list and take the messages standing in your directory (--peek, --all, --json)"

import type { CommandHelp } from "@akasha/command-system/command-declaring"
import { dataError, inputError } from "../../lib/exit.ts"
import { type Message, messagesTo, takeMessage } from "../../lib/message-file.ts"
import { seatNameForAgent } from "../../lib/messages-agent-tools.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { seatRecord } from "../../lib/seat-facts.ts"
import { resolveSeatTargetCli } from "../../lib/seat-handle.ts"

const BODY_CAP = 2000

export const help: CommandHelp = {
  positionals: [
    {
      name: "agent-id",
      required: false,
      aliasOfFlag: "--agent-id",
      description: "The seat whose directory to drain",
    },
  ],
  flags: [
    {
      name: "--agent-id",
      argLabel: "<uuid|prefix|name>",
      valueShape: "token",
      description: "Target agent id (default: AGENT_ID env var)",
    },
    { name: "--peek", description: "List without taking anything" },
    { name: "--all", description: "Include messages already claimed by a live listener" },
    {
      name: "--limit",
      argLabel: "<n>",
      valueShape: "token",
      description: "At most this many messages (default 50)",
    },
    { name: "--json", description: "Emit JSON instead of TSV" },
  ],
  examples: ["ops seat inbox", "ops seat inbox ione", "ops seat inbox --peek --all --json"],
}

function capped(body: string): string {
  const trimmed = body.trim()
  return trimmed.length <= BODY_CAP ? trimmed : `${trimmed.slice(0, BODY_CAP)}…`
}

function tsvLine(message: Message): string {
  const body = capped(message.body).replace(/\t/g, " ").replace(/\n/g, "\\n")
  return `${message.id}\t${message.from}\t${message.warrant}\t${body}`
}

export default async function agentInbox(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")
  const peek = parsed.boolean("--peek")
  const all = parsed.boolean("--all")
  const limit = parsed.nonNegativeInt("--limit") ?? 50

  const identityInput = parsed.string("--agent-id") ?? parsed.env("AGENT_ID")
  if (identityInput === undefined) {
    throw inputError(
      "no agent identity — name the seat, or pass --agent-id <uuid|prefix|name>, " +
        "or set the AGENT_ID env var (set automatically inside a supervisor session)."
    )
  }

  const targetAgentId = await resolveSeatTargetCli(identityInput)
  if (seatRecord(targetAgentId) === null) throw dataError("no seat found")
  const to = seatNameForAgent(targetAgentId)
  if (to === null) {
    throw dataError(
      `no seat page names agent ${targetAgentId}, so there is no directory holding its messages`
    )
  }

  const standing = messagesTo(to)
  const listed = (all ? standing : standing.filter((one) => one.claimedAtMs === null)).slice(
    0,
    limit
  )

  if (!peek) {
    for (const message of listed) {
      if (message.claimedAtMs !== null && !all) continue
      const taken = takeMessage(to, message.id)
      if (taken.kind === "refused") {
        process.stderr.write(`${message.id} stands: ${taken.detail}\n`)
      }
    }
  }

  if (json) {
    const shaped = listed.map((one) => ({
      id: one.id,
      from: one.from,
      warrant: one.warrant,
      claimed_at: one.claimedAtMs === null ? null : new Date(one.claimedAtMs).toISOString(),
      body: capped(one.body),
    }))
    process.stdout.write(`${JSON.stringify(shaped)}\n`)
    return
  }

  if (listed.length === 0) return
  process.stdout.write(`${listed.map(tsvLine).join("\n")}\n`)
}
