export const summary = "Take away one reminder this seat set for itself"

import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { selfRemindersOf, takeReminder } from "../../lib/reminder-file.ts"
import { seatNameForAgent } from "../../lib/seat-presence-read.ts"
import type { CommandHelp } from "../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [{ name: "<id>", description: "The id `ops reminder list` prints in its first column." }],
  flags: [],
  exits: [
    { code: 0, meaning: "the reminder is gone" },
    { code: 1, meaning: "nothing names a seat, no reminder of this seat's carries that id, or the removal was refused" },
  ],
  examples: ["ops reminder drop 019f2330-25c9-770c-894f-fd4ac497997c"],
}

export default async function reminderDrop(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.positionals[0] ?? ""
  const seat = seatNameForAgent(process.env.AGENT_ID ?? "")
  if (seat === null) {
    throw inputError("nothing here names a seat, and a reminder is one a seat sets for itself")
  }
  const held = selfRemindersOf(seat).find((one) => one.id === id)
  if (held === undefined) {
    throw inputError(`no reminder ${seat} set for itself carries \`${id}\` — \`ops reminder list\` names what does`)
  }
  const taken = takeReminder(seat, id, `${seat} set this reminder and has taken it back`)
  if (taken.kind === "refused") throw inputError(taken.detail)
  process.stdout.write(`${taken.kind === "gone" ? "gone already" : "dropped"}\t${held.relPath}\n`)
}
