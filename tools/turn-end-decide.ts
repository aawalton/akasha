export const tool = {
  summary: "Decide one turn end and carry out what it settles",
  path: "seat turn-end decide",
} as const

import { spawnSync } from "node:child_process"
import { recordedModeOf } from "./lib/attributes.ts"
import { decideTurnEnd, turnPendingFrom, turnStartSourceFrom } from "./lib/turn-end-decide.ts"
import { resolveRoots } from "../repo/roots/roots"
import { seatAssignments } from "./lib/seat-assignments.ts"
import { setTurn, setTurnState, setTurnStartSource } from "./lib/seat-turn.ts"
import { setPending } from "./lib/seat-turn-pending.ts"
import { setWorking } from "./lib/seat-turn-working.ts"
import {
  heldRead,
  outboundRead,
  payloadFrom,
  remindersRead,
  stdinText,
} from "./lib/turn-end-read.ts"
import { labelSettled } from "./lib/turn-end-reading.ts"
import type { JudgeRead, TurnEndInputs, TurnEndPlan } from "./lib/turn-end-plan.ts"

const HELP = `bun tools/turn-end-decide.ts — decide one turn end and carry out what it settles

Drives \`tools/lib/turn-end-decide.ts\` for the seat ending a turn, answering the reads it asks for
from \`tools/lib/turn-end-read.ts\` and the reading, then does what the plan says: stops the seat where
the plan stops it, writes the refusal to stderr, and exits 0 to allow or 2 to refuse.

THIS IS THE DECISION. The hook that calls it settles who it is and whether this guard is the one
holding the seat — a seat nothing can identify, and a seat in the other mode — and everything after
that is decided here, once, for both hooks. An on-call turn end is read by
\`ops akasha turn-end-reading\`; every other is decided from what the seat holds and from what
would start it, with no model called.

THE REFUSAL TEXT COMES FROM THE READING. A refused turn is told what about its ending will annoy
its principal, in the reading's own words, and this passes that through unchanged. Where the reading
refuses without saying why, the rule falls back to its own text.

IT DOES NOT RECORD THE DECISION. The caller records, so what a decision is written under stays where
the reason vocabulary is held against the code repository. What this does write is the seat's own
\`turn\`, \`turn-pending\`, \`turn-working\`, \`turn-start-source\` and \`turn-state\` properties, which carry
vocabulary and reach no database.

THE TURN START SOURCE IS ALREADY MEASURED HERE AND WAS THROWN AWAY. It is the whole
\`seat-turn-start-pending\` vocabulary, gathered from this hook's own payload, the reminders the
seat set itself, and the two state reads, and it went to stdout for a reader nothing kept. Together they say whether an idle seat is
waiting on something, waiting on its principal with nothing to tell him, or free. Every turn end is
written, allowing and refusing alike, so a refused one leaves a value that is history the moment the
next turn starts.

WHAT IS STORED IS NAMED FOR THE LIVE DOMAIN, NOT THE TYPE THAT FEEDS IT. \`wake\` in the sense of
what starts a stopped seat is retired; \`seat-turn-start-source\` is the live name and is what the
property is called. The type, the function and the TSV column below now carry it too.

THE RECORDED REASON STRING \`no-wake-source\` IS LEFT ALONE DELIBERATELY. It is a value already
written into the decision log, so renaming it splits history rather than correcting it. That
vocabulary stands here in \`lib/turn-end-reasons.ts\` and nowhere in the code repository.

Usage:
  bun tools/turn-end-decide.ts [--agent <id>] < <stop-payload>

  Default stdout (TSV, one line):
    <decision>\\t<reason>\\t<dispatch>\\t<waiting>\\t<turn start source>\\t<stopped|->

  --agent <id>  Whose turn is ending. Defaults to the AGENT_ID environment variable.
  --help        This.

Exit codes:
  0  the turn may end
  2  the turn is refused, and the reason is on stderr
`

const JUDGE_PATIENCE_MS = 15_000

const MOST_READS = 3

const READING_LINE = /^READING:\s*(\S+)/m

const WHY_LINE = /^WHY:\s*(.*)$/m

function labelOfReading(said: string): string {
  return (READING_LINE.exec(said)?.[1] ?? "").trim().toLowerCase()
}

function whyOfReading(said: string): string {
  return (WHY_LINE.exec(said)?.[1] ?? "").trim()
}

function judgeRead(args: {
  readonly agent: string
  readonly transcript: string
  readonly pending: boolean
}): JudgeRead {
  const ran = spawnSync(
    "ops",
    [
      "akasha",
      "turn-end-reading",
      "--transcript",
      args.transcript,
      ...(args.pending ? ["--pending"] : []),
    ],
    { encoding: "utf8", timeout: JUDGE_PATIENCE_MS }
  )
  if (ran.error !== undefined && ran.signal === null) return { kind: "unavailable" }
  if (ran.status === null)
    return { kind: "answered", status: 124, feedback: "", settled: false }
  const label = labelOfReading(ran.stdout ?? "")
  setTurn(args.agent, label)
  const feedback = ran.status === 3 ? whyOfReading(ran.stdout ?? "") : ""
  return {
    kind: "answered",
    status: ran.status,
    feedback,
    settled: labelSettled(label),
  }
}

interface Driven {
  readonly plan: TurnEndPlan
  readonly at: TurnEndInputs
}

async function drive(from: TurnEndInputs): Promise<Driven> {
  let at = from
  for (let asked = 0; asked <= MOST_READS; asked += 1) {
    const plan = decideTurnEnd(at)
    if (plan.kind === "needs-read") {
      at =
        plan.verb === "pending"
          ? { ...at, outbound: { kind: "answered", signals: await outboundRead(at.agentId ?? "") } }
          : { ...at, inbound: heldRead(at.agentId ?? "") }
      continue
    }
    if (plan.kind === "needs-judge") {
      at = {
        ...at,
        judge: judgeRead({
          agent: at.agentId ?? "",
          transcript: plan.transcript,
          pending: plan.pending,
        }),
      }
      continue
    }
    return { plan, at }
  }
  throw new Error(`the rule asked for more than ${MOST_READS} reads for ${String(from.agentId)}`)
}

function stop(agent: string): boolean {
  const ran = spawnSync("ops", ["seat", "stop", agent], { encoding: "utf8", timeout: JUDGE_PATIENCE_MS })
  return ran.error === undefined && ran.status === 0
}

async function main(argv: readonly string[]): Promise<number> {
  if (argv.includes("--help")) {
    process.stdout.write(HELP)
    return 0
  }
  const named = argv.indexOf("--agent")
  const agent = named === -1 ? (process.env.AGENT_ID ?? "") : (argv[named + 1] ?? "")
  if (agent === "") {
    process.stderr.write("refused: no seat named — pass --agent or set AGENT_ID\n")
    return 1
  }
  const recorded = recordedModeOf(agent)
  const { onCall, dispatched, handedBack } = seatAssignments(agent, resolveRoots())
  const from: TurnEndInputs = {
    agentId: agent,
    mode: recorded === null ? null : recorded.value,
    onCall,
    dispatched,
    handedBack,
    payload: payloadFrom(stdinText()),
    reminders: remindersRead(agent),
    outbound: { kind: "unread" },
    inbound: { kind: "unread" },
    judge: { kind: "unread" },
  }
  const { plan, at } = await drive(from)
  if (plan.kind !== "settled") throw new Error(`the rule settled nothing for ${agent}`)

  setPending(agent, turnPendingFrom(at))
  const startSource = turnStartSourceFrom(at)
  setTurnStartSource(agent, startSource)
  const stopped = plan.actions.some((one) => one.kind === "stop-seat") ? stop(agent) : false
  const refused = plan.record.decision === "block"
  setWorking(agent, { "active-turn": refused && !stopped })
  setTurnState(agent, stopped ? "stopped" : "idle")
  process.stdout.write(
    `${plan.record.decision}\t${plan.record.reason}\t${String(dispatched.length)}\t` +
      `${startSource === "none" ? "no" : "yes"}\t${startSource}\t${stopped ? "stopped" : "-"}\n`
  )
  if (plan.message !== null) process.stderr.write(plan.message)
  return plan.exitCode
}

process.exitCode = await main(process.argv.slice(2))
