export const summary = "Set a reminder this seat sends itself when its schedule comes due"

import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { nextElapse, writeReminder } from "../../lib/reminder-file.ts"
import { seatNameForAgent } from "../../lib/seat-presence-read.ts"
import type { CommandHelp } from "../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [{ name: "<body>", description: "What the reminder says when it arrives." }],
  flags: [
    {
      name: "--schedule",
      argLabel: "<calendar>",
      valueShape: "line",
      required: true,
      description: "When it fires, written as systemd states a calendar.",
    },
  ],
  exits: [
    { code: 0, meaning: "the reminder stands, and its path and next firing are on stdout" },
    { code: 1, meaning: "nothing names a seat, systemd will not read the schedule, or the write was refused" },
  ],
  examples: [
    'ops reminder set --schedule hourly "check whether the deploy finished"',
    'ops reminder set --schedule "2026-08-24 15:30" "stand up and stretch"',
  ],
}

export default async function reminderSet(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const schedule = parsed.requireString("--schedule")
  const body = parsed.positionals[0] ?? ""
  if (body.trim() === "") throw inputError("a reminder says something, and this one says nothing")

  const seat = seatNameForAgent(process.env.AGENT_ID ?? "")
  if (seat === null) {
    throw inputError("nothing here names a seat, and a reminder is one a seat sets for itself")
  }

  const elapse = nextElapse(schedule)
  if (elapse.kind === "invalid") {
    throw inputError(`\`${schedule}\` is not a calendar systemd will read: ${elapse.detail}`)
  }
  if (elapse.kind === "never") {
    throw inputError(`\`${schedule}\` names no time still to come, so nothing would ever send it`)
  }

  const written = writeReminder({ to: seat, from: seat, warrant: "announce", schedule, body })
  if (written.kind === "refused") throw inputError(written.detail)
  process.stdout.write(`${written.relPath}\t${new Date(elapse.ms).toISOString()}\n`)
}
