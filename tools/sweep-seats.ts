export const tool = {
  summary: "Name every running seat holding no unfinished assignment",
  path: "seat sweep",
} as const

import { basename } from "node:path"
import { pageStemOf } from "../page/name/name"
import { akashaRoot } from "../repo/roots/roots"
import { frontmatterOf, seatPagePaths, seatPresence } from "./lib/seat-presence-read.ts"
import type { SeatPresence } from "./lib/seat-proc-key.ts"
import { statedOf } from "./lib/seat-stated.ts"
import { type Sources, initiativeFinishedIn, readSeat } from "./lib/seat-sweep.ts"

const HELP = `bun tools/sweep-seats.ts — name the seats the fleet's intent says should not exist

Reports three classes in one run, from one reading of the fleet:
  page-outlives-seat  a seat page standing with no agent present in the seat it names
  presence-uncertain  a seat page whose presence could not be read either way
  running-unassigned  a live seat holding no unfinished assignment

The population is the seat pages standing in akasha. A seat's page stands while
an agent is present in it and goes when none is, so a page with nobody in it is the first class
above rather than a seat to judge. Nothing here reads a row.

PRESENCE HAS THREE ANSWERS, NOT TWO. A seat reads as present where its sidecar names a process
still standing, and as departed where /proc answers that no such pid stands. A seat with no
sidecar, one whose supervisor-process cannot be parsed, and one whose /proc entry could not be
read are none of those: they are presence-uncertain, and reporting them as page-outlives-seat
would send somebody to take away the page of a seat an agent may still be sitting in.

An assignment is held unless what it names says otherwise. An \`on-call\` never finishes, so it is
held on presence. A \`task\` has nothing observable that ends it and is held on presence. An
\`initiative\` is finished where its document is gone and held otherwise: the document is deleted
when the intent it quotes is met, so its absence is the whole signal.

Usage:
  bun tools/sweep-seats.ts [--json]

  --json       The seats in an envelope, with every count and denominator beside them.
  --help       This.
`

const PAGE_SUFFIX = ".md"

interface Seat {
  readonly id: string
  readonly name: string
  readonly presence: SeatPresence
}

type SeatClass =
  | "page-outlives-seat"
  | "presence-uncertain"
  | "running-unassigned"

interface Finding {
  readonly seatClass: SeatClass
  readonly agent: string
  readonly name: string | null
  readonly mode: string
  readonly held: readonly string[]
}

function seatsStanding(): readonly Seat[] {
  const found: Seat[] = []
  for (const page of seatPagePaths()) {
    const id = frontmatterOf(page)?.id
    if (typeof id !== "string" || id === "") continue
    found.push({ id, name: pageStemOf(page), presence: seatPresence(page) })
  }
  return found
}

export async function main(argv: readonly string[]): Promise<number> {
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP)
    return 0
  }
  let asJson = false
  for (const arg of argv) {
    if (arg === "--json") asJson = true
    else {
      process.stderr.write(`unknown flag: ${arg}\n`)
      return 1
    }
  }

  const seats = seatsStanding()
  const stated = new Map(seats.map((seat) => [seat.id, statedOf(seat.id)]))

  const from: Sources = {
    initiativeFinished: initiativeFinishedIn(akashaRoot()),
  }

  const findings: Finding[] = []
  let present = 0
  let departed = 0
  let unread = 0
  for (const seat of seats) {
    const one = stated.get(seat.id) as ReturnType<typeof statedOf>
    const { held } = readSeat(one, from)
    const shape = { agent: seat.id, name: seat.name, mode: one.mode, held }
    if (seat.presence === "present") present += 1
    else if (seat.presence === "absent") departed += 1
    else unread += 1
    if (seat.presence === "unknown") findings.push({ seatClass: "presence-uncertain", ...shape })
    else if (seat.presence === "absent") findings.push({ seatClass: "page-outlives-seat", ...shape })
    else if (held.length === 0) findings.push({ seatClass: "running-unassigned", ...shape })
  }

  const counted = (seatClass: SeatClass): number =>
    findings.filter((one) => one.seatClass === seatClass).length
  const counts = {
    pages: seats.length,
    present,
    departed,
    unread,
    pageOutlivesSeat: counted("page-outlives-seat"),
    presenceUncertain: counted("presence-uncertain"),
    runningUnassigned: counted("running-unassigned"),
  }
  if (asJson) {
    process.stdout.write(`${JSON.stringify({ findings, counts })}\n`)
    return 0
  }
  for (const one of findings) {
    const held = one.held.length === 0 ? "-" : one.held.join(",")
    process.stdout.write(`${one.seatClass}\t${one.agent}\t${one.name ?? ""}\t${one.mode}\t${held}\n`)
  }
  process.stderr.write(
    `swept ${counts.pages} seat page(s): ${counts.present} with an agent present, ` +
      `${counts.departed} without, ${counts.unread} that could not be read either way. Found ` +
      `${counts.pageOutlivesSeat} page-outlives-seat, ` +
      `${counts.presenceUncertain} presence-uncertain and ` +
      `${counts.runningUnassigned} running-unassigned.\n`
  )
  return 0
}

if (import.meta.main) process.exit(await main(process.argv.slice(2)))
