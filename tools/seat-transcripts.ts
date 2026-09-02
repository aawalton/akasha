#!/usr/bin/env bun

import { akashaSeatsStanding } from "./lib/seat-akasha-beside.ts"
import { akashaSeatRecordOf } from "./lib/seat-akasha-read.ts"

const TRANSCRIPT_KEY = "transcript-path"

const HELP = `bun tools/seat-transcripts.ts — where each seat's transcript file is

Prints one JSON object on stdout and nothing else:

  { "seats": [ { "agentId", "seatName", "transcriptPath" }, … ] }

A seat is named by the index and its transcript is read from the values kept beside its
page, so a seat kept only in akasha is answered here like any other. A seat holding no
transcript, or holding an empty one, is left out rather than answered with an empty path.

This is what the editor's agent tree and transcript panel read. They ask it as a child
process because both reads reach an uncommitted page body, and loading one needs a
transpiler that only bun carries.

  --help  This.
`

export interface SeatTranscript {
  readonly agentId: string
  readonly seatName: string
  readonly transcriptPath: string
}

export function seatTranscripts(): readonly SeatTranscript[] {
  const found: SeatTranscript[] = []
  for (const [agentId, seatName] of akashaSeatsStanding()) {
    const held = akashaSeatRecordOf(agentId, TRANSCRIPT_KEY)
    if (held === null || held.value === "") continue
    found.push({ agentId, seatName, transcriptPath: held.value })
  }
  return found
}

export function main(argv: readonly string[]): number {
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP)
    return 0
  }
  const unknown = argv.filter((arg) => arg.startsWith("-"))
  if (unknown.length > 0) {
    process.stderr.write(`error: this command takes no flags, and was given ${unknown.join(" ")}\n`)
    return 1
  }
  try {
    process.stdout.write(`${JSON.stringify({ seats: seatTranscripts() })}\n`)
  } catch (err) {
    process.stderr.write(`error: ${err instanceof Error ? err.message : String(err)}\n`)
    return 3
  }
  return 0
}

if (import.meta.main) process.exitCode = main(process.argv.slice(2))
