export const tool = {
  summary: "Compose a seat's system prompt: who it is, and the one read that loads what it is bound to",
  path: "seat boot",
} as const

import { writeFileSync } from "node:fs"
import { ATTRIBUTES, type Attributes, attributesOf } from "./lib/attributes.ts"
import { seatDocuments } from "./lib/seat-reading.ts"
import { type TaskRecord, taskOf } from "./lib/seat-task.ts"
import { type Roots } from "../page/page"
import { resolveRoots } from "../repo/roots/roots"
import { fail } from "./lib/command.ts"

const HELP = `bun tools/compose-boot.ts — compose a seat's system prompt: who it is, and the read that loads the rest

WHAT A SEAT IS BOUND TO IS NOT IN ITS PROMPT. This composes who the seat is, from its stated
persona, domain and role, what it was sent to do, and the one call that names every document
those bind it to.
The documents themselves are read, never handed over: text in a prompt is credited as read
without anybody reading it, and it goes on standing after the file under it has moved.

SO NOTHING HERE IS CREDITED, and no manifest is written beside the prompt. A seat begins owing
every document it is bound to, and the gate on its first act says so.

A seat stating nothing composes to nothing and exits 0. Nothing here refuses: this
feeds a spawn, and a seat that does not start is worse than one carrying less.

Usage:
  bun ~/repos/akasha/tools/compose-boot.ts --agent <id> [--out <path>]

Flags:
  --agent <id>   Whose attributes to read.
  --out <path>   Write there rather than to stdout.
  --help         This.
`

function parse(argv: readonly string[]): { readonly agent: string; readonly out: string | null } {
  let agent = ""
  let out: string | null = null
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === "--help") {
      process.stdout.write(HELP)
      process.exit(0)
    }
    const next = (): string => {
      const value = argv[i + 1]
      if (value === undefined) fail(`\`${arg}\` takes a value`)
      i += 1
      return value
    }
    if (arg === "--agent") agent = next()
    else if (arg === "--out") out = next()
    else fail(`\`${arg}\` is not an argument this takes — run it with --help`)
  }
  if (agent === "") fail("--agent <id> is required: the composition is one seat's own")
  return { agent, out }
}

function claim(attributes: Attributes): string {
  const named = ATTRIBUTES.flatMap((key) => {
    const one = attributes[key]
    return one === undefined ? [] : [`${key} \`${one.slug}\``]
  })
  return named.length === 0 ? "" : named.join(", ")
}

function sentTo(task: TaskRecord | null): string {
  return task === null ? "" : `You were sent to do task \`${task.value}\`.`
}

export const SEAT_READ = "ops read --seat"

export function compose(seat: string, count: number, sent = ""): string {
  if (seat === "" && sent === "") return ""
  return (
    (seat === "" ? "" : `You are ${seat}.\n\n`) +
    (sent === "" ? "" : `${sent}\n\n`) +
    `${count} document(s) say what that means, and none of them stands here. They are read rather than ` +
    "handed over, so that what you act on is the text on disk now rather than the text that was composed " +
    "when you started. This one call names every one of them, reads and records as many as one answer " +
    "carries, prints the call for any it could not fit, and lists under them the " +
    "definitions of what they name as conditional reading:\n" +
    "\n" +
    `    ${SEAT_READ}\n` +
    "\n" +
    "Run it before you act. Until you have, every tool that changes anything is refused, and the refusal " +
    "names this same call.\n"
  )
}

export interface Composition {
  readonly body: string
  readonly count: number
}

export function compositionFor(agent: string, roots: Roots): Composition {
  const seat = claim(attributesOf(agent))
  const sent = sentTo(taskOf(agent))
  const count = seat === "" && sent === "" ? 0 : seatDocuments(agent, roots).length
  return { body: compose(seat, count, sent), count }
}

function main(): void {
  const { agent, out } = parse(process.argv.slice(2))
  const roots = resolveRoots()
  const { body } = compositionFor(agent, roots)
  if (out === null) {
    process.stdout.write(body)
    return
  }
  writeFileSync(out, body)
}

if (import.meta.main) main()
