export const summary = "List the reminders this seat has set for itself"

import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { nextElapse, selfRemindersOf } from "../../lib/reminder-file.ts"
import { seatNameForAgent } from "../../lib/seat-presence-read.ts"
import type { CommandHelp } from "../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [],
  flags: [],
  exits: [
    { code: 0, meaning: "the reminders standing are on stdout, one per line" },
    { code: 1, meaning: "nothing here names a seat" },
  ],
  examples: ["ops reminder list"],
}

function firstLine(body: string): string {
  return body.trim().split("\n")[0] ?? ""
}

function saidOf(schedule: string): string {
  const elapse = nextElapse(schedule)
  if (elapse.kind === "at") return new Date(elapse.ms).toISOString()
  if (elapse.kind === "never") return "never"
  return "unreadable"
}

export default async function reminderList(args: readonly string[]): Promise<void> {
  parseArgs(help, args)
  const seat = seatNameForAgent(process.env.AGENT_ID ?? "")
  if (seat === null) {
    throw inputError("nothing here names a seat, and a reminder is one a seat sets for itself")
  }
  const held = selfRemindersOf(seat)
  if (held.length === 0) {
    process.stdout.write(`no reminder stands for ${seat}\n`)
    return
  }
  for (const one of held) {
    process.stdout.write(`${one.id}\t${one.schedule}\t${saidOf(one.schedule)}\t${firstLine(one.body)}\n`)
  }
}
