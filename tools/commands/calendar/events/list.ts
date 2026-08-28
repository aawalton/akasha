export const summary = "List calendar events in a time window and print them as JSON"

import type { CommandHelp } from "../../../ops/surface.ts"
import { calendarClient, calendarEvents } from "../../../lib/calendar-google.ts"
import { parseArgs } from "../../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--from",
      argLabel: "<iso>",
      valueShape: "token",
      description: "Window start (ISO 8601)",
    },
    { name: "--to", argLabel: "<iso>", valueShape: "token", description: "Window end (ISO 8601)" },
    {
      name: "--query",
      argLabel: "<text>",
      valueShape: "prose",
      description: "Free-text search filter",
    },
    { name: "--max", argLabel: "<n>", valueShape: "token", description: "Max results to return" },
    {
      name: "--calendar",
      argLabel: "<id>",
      valueShape: "token",
      description: "Target calendar; optional. `primary` and unset both resolve to Alan's calendar",
    },
  ],
  examples: [
    "ops calendar events list --from 2026-06-01T00:00:00Z --to 2026-06-30T23:59:59Z",
    "ops calendar events list --query-file ./query.txt --max 10",
  ],
}

export default async function calendarEventsList(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const client = await calendarClient()
  const events = await calendarEvents()
  const found = await events.listEvents(client, {
    calendarId: parsed.string("--calendar"),
    from: parsed.string("--from"),
    to: parsed.string("--to"),
    query: parsed.string("--query"),
    max: parsed.nonNegativeInt("--max"),
  })

  process.stdout.write(`${JSON.stringify(found, null, 2)}\n`)
}
