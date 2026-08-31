export const tool = {
  summary: "Compose a seat's system prompt: who it is, and the one read that loads what it is",
  path: "seat boot",
} as const

import { writeFileSync } from "node:fs"
import { ATTRIBUTES, type Attributes, attributesOf } from "./lib/attributes.ts"
import { fail } from "./lib/command.ts"
import { akashaSeatRelPath } from "./lib/seat-page-akasha.ts"
import { seatNameForAgent } from "./lib/seat-presence-read.ts"

const HELP = `bun tools/compose-boot.ts — compose a seat's system prompt: who it is, and the read that loads the rest

WHAT A SEAT IS BOUND TO IS NOT IN ITS PROMPT. This composes who the seat is, from its stated
persona, domain and role, and the one call that names every page those bind it to.

The pages themselves are read, never handed over: text in a prompt is credited as read without
anybody reading it, and it goes on standing after the file under it has moved. So nothing here is
credited, and a seat begins owing every page it is bound to.

The call names the seat's own page. What that page warrants is what the seat must read, and the
warrants answer it: the persona and the role and the domain it states, the type of each, and every
domain the one it states is a part of.

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

export const SEAT_READ = "akasha read --file-path"

const READING =
  "What that means stands in pages, and none of them stands here. They are read rather than handed " +
  "over, so that what you act on is the text on disk now rather than the text that was composed when " +
  "you started. This one call names every one of them and hands back as many as one answer carries:"

export function compose(seat: string, at: string | null, sent = ""): string {
  if (seat === "" && sent === "") return ""
  return (
    (seat === "" ? "" : `You are ${seat}.\n`) +
    (sent === "" ? "" : `\n${sent}\n`) +
    (at === null ? "" : `\n${READING}\n\n    ${SEAT_READ} ${at}\n\nRun it before you act.\n`)
  )
}

export function seatReadPath(agent: string): string | null {
  const seatName = seatNameForAgent(agent)
  return seatName === null ? null : akashaSeatRelPath(seatName)
}

export function compositionFor(agent: string): string {
  return compose(claim(attributesOf(agent)), seatReadPath(agent))
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
