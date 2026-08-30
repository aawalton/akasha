export const summary = "Answer WHO AM I from the environment alone: the calling seat's own name, role, domain and persona (--json)"

import type { CommandHelp } from "../../ops/surface.ts"
import { dataError, inputError } from "../../lib/exit.ts"
import { resolveSeatTargetCli } from "../../lib/seat-handle.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { seatWhoami } from "../../lib/seat-whoami.ts"

const ABSENT = "null"

export const help: CommandHelp = {
  positionals: [
    {
      name: "agent-id",
      required: false,
      aliasOfFlag: "--agent-id",
      description: "The seat to answer for",
    },
  ],
  flags: [
    {
      name: "--agent-id",
      argLabel: "<uuid|prefix|name>",
      valueShape: "token",
      description: "Answer for this agent instead of the caller (default: AGENT_ID env var)",
    },
    { name: "--json", description: "Emit JSON result instead of the key-per-line summary" },
  ],
  envVars: [
    {
      name: "AGENT_ID",
      description:
        "The calling session's own agent id — set by its supervisor. Absent in a bare shell, which is the refusal case.",
    },
  ],
  examples: ["ops seat whoami", "ops seat whoami --json", "ops seat whoami dalla"],
}

interface AgentWhoamiResult {
  readonly id: string
  readonly name: string | null
  readonly role: string | null
  readonly domain: string | null
  readonly persona: string | null
  readonly mode: string | null
  readonly principal: string | null
  readonly parentAgentId: string | null
}

function renderKeyLines(result: AgentWhoamiResult): string {
  return [
    `id=${result.id}`,
    `name=${result.name ?? ABSENT}`,
    `role=${result.role ?? ABSENT}`,
    `domain=${result.domain ?? ABSENT}`,
    `persona=${result.persona ?? ABSENT}`,
    `mode=${result.mode ?? ABSENT}`,
    `principal=${result.principal ?? ABSENT}`,
    `parentAgentId=${result.parentAgentId ?? ABSENT}`,
  ].join("\n")
}

export default async function agentWhoami(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const identityInput = parsed.string("--agent-id") ?? parsed.env("AGENT_ID")
  if (identityInput === undefined) {
    throw inputError(
      "no agent identity — name the seat, or pass --agent-id <uuid|prefix|name>, " +
        "or set the AGENT_ID env var (set automatically inside a supervisor session)."
    )
  }

  const agentId = await resolveSeatTargetCli(identityInput)
  const result = seatWhoami(agentId)
  if (result === null) {
    throw dataError(
      `no seat page stands for agent ${agentId}, and this repository's history holds none ` +
        "either, so there is nothing that states who this seat is."
    )
  }
  process.stdout.write(json ? `${JSON.stringify(result)}\n` : `${renderKeyLines(result)}\n`)
}
