#!/usr/bin/env bun

import { colorsOf } from "@akasha/seat-system/agent-turn-drawn"
import { colorOfState } from "@akasha/seat-system/seat-turn-color"
import { SEAT_TURN_STATES, type SeatTurnState } from "@akasha/seat-system/seat-turn-state"
import { sayAnswer } from "./lib/answer.ts"

const STATE_FLAG = "--state"

const HELP = `bun tools/agent-turn-colors.ts — the color each named agent, or each named turn state, is drawn in

Takes agent ids as arguments, or turn states after \`${STATE_FLAG}\`, and prints one JSON
object on stdout and nothing else:

  { "colors": { "<what was asked>": "<color>", … } }

Ids and states are never asked for together, so the key a color stands under is one
thing rather than two.

An agent stands in the answer only where records of its own could be kept for it. So an
id no seat ever held is simply absent, and absence is ordinary rather than a fault. An id
nothing knows about is not an error: a caller asking about a terminal that turned out to
hold no seat wants no color rather than a refusal.

An id carrying \`--\` names a subagent, and is read as the seat before the mark and the
subagent after it. A subagent is working or stopped and never anything between, its turn
ending when it returns to the seat that ran it. One that has returned reads stopped while
the seat above it goes on working, and one whose seat has stopped reads stopped with it.

A seat that kept records before any hook stamped one reads as idle, which is what an
older seat is. That is why the answer turns on whether the seat kept anything at all
rather than on whether a hook has run.

Asking by state reads no agent at all, and is what a drawer wants where it already knows
the state and holds no id to ask under: every subagent a panel draws is working, and a
synchronous one has no id of its own until it has finished. A name no state carries is
refused rather than left out, since a caller asking by state knows what it asked.

\`color\` is the name that state's domain states in this repository rather than a
shade, so whatever draws it picks the color out of its own palette. Every turn state
names one, a stopped one included.

Reads the agents' own records and this repository, and reaches no database, so a tab strip
asking this keeps its colors through an outage that empties every panel drawn from a
row.

  ${STATE_FLAG} <name>  A turn state to answer for rather than an agent. Repeatable.
  --help          This.
`

export function statedAs(name: string): SeatTurnState | null {
  return SEAT_TURN_STATES.find((one) => one === name) ?? null
}

export interface StateAnswer {
  readonly colors: Record<string, string>
  readonly unspelled: readonly string[]
}

export function colorsOfStates(names: readonly string[]): StateAnswer {
  const colors: Record<string, string> = {}
  const unspelled: string[] = []
  for (const name of names) {
    const state = statedAs(name)
    if (state === null) {
      unspelled.push(name)
      continue
    }
    const color = colorOfState(state)
    if (color !== null) colors[name] = color
  }
  return { colors, unspelled }
}

export function main(argv: readonly string[]): number {
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP)
    return 0
  }
  const states: string[] = []
  const agents: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const word = argv[at] ?? ""
    if (word === STATE_FLAG) {
      const named = argv[at + 1]
      if (named === undefined) {
        process.stderr.write(`error: ${STATE_FLAG} takes the name of a turn state after it\n`)
        return 1
      }
      states.push(named)
      at += 1
      continue
    }
    if (word.startsWith("-")) {
      process.stderr.write(`error: this command takes no flag ${word}\n`)
      return 1
    }
    agents.push(word)
  }
  if (states.length > 0 && agents.length > 0) {
    process.stderr.write("error: ask for agent ids or for turn states, never both in one call\n")
    return 1
  }
  if (states.length > 0) {
    const answer = colorsOfStates(states)
    if (answer.unspelled.length > 0) {
      process.stderr.write(
        `error: ${answer.unspelled.join(" ")} names no turn state; they are ${SEAT_TURN_STATES.join(", ")}\n`
      )
      return 1
    }
    sayAnswer(`${JSON.stringify({ colors: answer.colors })}\n`)
    return 0
  }
  sayAnswer(`${JSON.stringify({ colors: colorsOf(agents) })}\n`)
  return 0
}

if (import.meta.main) process.exitCode = main(process.argv.slice(2))
