export const tool = {
  summary: "Compose a seat's system prompt: who it is, and what it was sent to do",
  path: "seat boot",
} as const

import { writeFileSync } from "node:fs"
import { ATTRIBUTES, type Attributes, attributesOf } from "./lib/attributes.ts"
import { type TaskRecord, taskOf } from "./lib/seat-task.ts"
import { fail } from "./lib/command.ts"

const HELP = `bun tools/compose-boot.ts — compose a seat's system prompt: who it is, and what it was sent to do

This composes who the seat is, from its stated persona, domain and role, and what it was sent
to do. Nothing else: a seat reads what it needs with the ordinary tools, and nothing is gated
on having read anything.

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

export function compose(seat: string, sent = ""): string {
  if (seat === "" && sent === "") return ""
  return (seat === "" ? "" : `You are ${seat}.\n`) + (sent === "" ? "" : `\n${sent}\n`)
}

export function compositionFor(agent: string): string {
  return compose(claim(attributesOf(agent)), sentTo(taskOf(agent)))
}

function main(): void {
  const { agent, out } = parse(process.argv.slice(2))
  const body = compositionFor(agent)
  if (out === null) {
    process.stdout.write(body)
    return
  }
  writeFileSync(out, body)
}

if (import.meta.main) main()
