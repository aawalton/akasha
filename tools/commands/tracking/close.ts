export const summary = "Close the open session (stop) without opening a new one"

import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import {
  pagesClient,
  sleepTitleWords,
  trackingFormat,
  trackingResolve,
  trackingSessions,
  trackingTime,
} from "../../lib/tracking-capability.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--at",
      argLabel: "<time>",
      valueShape: "token",
      description:
        "Close instant — HH:MM / 'YYYY-MM-DD HH:MM' (Mountain local) / ISO (default now)",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    { code: 0, meaning: "session closed" },
    { code: 1, meaning: "no open session or bad input" },
  ],
  examples: ["ops tracking close", "ops tracking close --at 17:30"],
}

export default async function trackingClose(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")
  const now = new Date()
  const atRaw = parsed.string("--at")
  const time = await trackingTime()
  const endInstant = atRaw !== undefined ? time.parseInstantFlag(atRaw, now) : now

  const format = await trackingFormat()
  const { getPageAccessClient } = await pagesClient()
  const { findOpenSession } = await trackingResolve()
  const { closeSession } = await trackingSessions()
  const { DAY_TURN_WORDS: dayTurnWords } = await sleepTitleWords()

  const sb = getPageAccessClient()
  const open = await findOpenSession(sb)
  if (open === null) {
    throw inputError('no open session — start one with `ops tracking start "<title>"`')
  }
  console.error(`Closing "${format.displayTitle(open)}"…`)
  await closeSession(sb, open, endInstant, dayTurnWords)

  const dur = format.durationSeconds(format.fieldStr(open, "startTime"), endInstant.toISOString())
  if (json) {
    process.stdout.write(
      `${JSON.stringify({
        id: open.id,
        title: format.displayTitle(open),
        endTime: endInstant.toISOString(),
        durationSeconds: dur ?? null,
      })}\n`
    )
    return
  }
  process.stdout.write(
    `id\t${open.id}\n` +
      `title\t${format.displayTitle(open)}\n` +
      `end\t${endInstant.toISOString()}\n` +
      `duration\t${dur !== undefined ? format.fmtDuration(dur) : "-"}\n`
  )
}
