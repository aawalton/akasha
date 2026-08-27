export const summary = "Take a mis-created session off its day; it vanishes from status and day totals"

import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import {
  deleteEcho,
  pagesAccess,
  pagesClient,
  trackingFormat,
  trackingSessions,
} from "../../lib/tracking-capability.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--id",
      argLabel: "<id>",
      valueShape: "token",
      description: "Session id to remove (required)",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  positionals: [
    {
      name: "id",
      required: false,
      aliasOfFlag: "--id",
      description: "Session id to remove",
    },
  ],
  exits: [
    { code: 0, meaning: "session removed" },
    { code: 1, meaning: "missing id or session not found" },
  ],
  examples: ["ops tracking delete abc12345", "ops tracking delete --id abc12345 --json"],
}

export default async function trackingDelete(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.string("--id")
  if (id === undefined || id.trim() === "") {
    throw inputError("a session --id is required (from `tracking status --json`)")
  }
  const json = parsed.boolean("--json")
  const trimmedId = id.trim()

  const format = await trackingFormat()
  const { getPage } = await pagesAccess()
  const { getPageAccessClient } = await pagesClient()
  const { buildDeleteEcho } = await deleteEcho()
  const { dropSession } = await trackingSessions()

  const sb = getPageAccessClient()
  const session = await getPage(sb, {
    pageTypeSlug: "session-tracking",
    where: [{ key: "id", eq: trimmedId }],
  })
  if (session == null) {
    throw inputError(`session not found: ${trimmedId}`)
  }

  const startIso = format.fieldStr(session, "startTime")
  const endIso = format.fieldStr(session, "endTime")
  const echo = buildDeleteEcho({ startTime: startIso, endTime: endIso })
  const title = format.displayTitle(session)

  console.error(`Removing "${title}"…`)
  await dropSession(session)

  if (json) {
    process.stdout.write(
      `${JSON.stringify({
        id: session.id,
        seq: session.seq,
        title,
        startTime: startIso ?? null,
        endTime: endIso ?? null,
        durationSeconds: echo.durationSeconds ?? null,
        wasOpen: echo.wasOpen,
        deleted: true,
      })}\n`
    )
    return
  }
  process.stdout.write(
    `id\t${session.id}\n` +
      `title\t${title}\n` +
      `start\t${startIso ?? "-"}\n` +
      `end\t${endIso ?? "-"}\n` +
      `duration\t${echo.durationSeconds !== undefined ? format.fmtDuration(echo.durationSeconds) : "-"}\n` +
      `wasOpen\t${echo.wasOpen ? "yes" : "no"}\n` +
      `deleted\ttrue\n`
  )
}
