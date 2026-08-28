export const summary = "Fetch a single calendar event by id and print it as JSON"

import type { CommandHelp } from "../../../ops/surface.ts"
import { calendarClient, calendarEvents } from "../../../lib/calendar-google.ts"
import { parseArgs } from "../../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--event",
      argLabel: "<id>",
      valueShape: "token",
      required: true,
      description: "Event to fetch",
    },
    {
      name: "--calendar",
      argLabel: "<id>",
      valueShape: "token",
      description: "Target calendar; optional. `primary` and unset both resolve to Alan's calendar",
    },
  ],
  positionals: [
    {
      name: "event",
      required: false,
      aliasOfFlag: "--event",
      description: "Event to fetch",
    },
  ],
  examples: [
    "ops calendar events get --event abc123",
    "ops calendar events get --event abc123 --calendar primary",
    "ops calendar events get abc123",
  ],
}

export default async function calendarEventsGet(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const client = await calendarClient()
  const events = await calendarEvents()
  const event = await events.getEvent(client, {
    calendarId: parsed.string("--calendar"),
    eventId: parsed.requireString("--event"),
  })

  process.stdout.write(`${JSON.stringify(event, null, 2)}\n`)
}
