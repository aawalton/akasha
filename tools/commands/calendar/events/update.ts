export const summary = "Patch fields of an existing calendar event and print it as JSON"

import type { CommandHelp } from "../../../ops/surface.ts"
import { calendarEvents, calendarOAuthClient } from "../../../lib/calendar-google.ts"
import { type EventPatch } from "@alanwalton/calendar-google/types"
import { narrowSendUpdates, SEND_UPDATES } from "../../../lib/calendar-send-updates.ts"
import { parseArgs } from "../../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--event",
      argLabel: "<id>",
      valueShape: "token",
      required: true,
      description: "Event to update",
    },
    { name: "--summary", argLabel: "<text>", valueShape: "prose", description: "New event title" },
    {
      name: "--start",
      argLabel: "<iso>",
      valueShape: "token",
      description:
        "New ISO 8601 start timestamp, or a date-only YYYY-MM-DD for an all-day event. " +
        "When both --start and --end are given they must both be date-only or both be timestamps.",
    },
    {
      name: "--end",
      argLabel: "<iso>",
      valueShape: "token",
      description:
        "New ISO 8601 end timestamp, or a date-only YYYY-MM-DD for an all-day event (exclusive — the day after the last day).",
    },
    {
      name: "--description",
      argLabel: "<text>",
      valueShape: "prose",
      description: "New event description",
    },
    {
      name: "--location",
      argLabel: "<text>",
      valueShape: "prose",
      description: "New event location",
    },
    {
      name: "--attendees",
      argLabel: "<emails>",
      valueShape: "token",
      description: "Comma-separated attendee emails (replaces existing)",
    },
    {
      name: "--timezone",
      argLabel: "<iana>",
      valueShape: "token",
      description:
        "IANA zone name (e.g. America/Denver) applied to patched start/end. Never a raw UTC offset. Not valid for all-day (date-only) events — rejected if combined with date-only --start/--end.",
    },
    {
      name: "--recurrence",
      argLabel: "<rrule>",
      valueShape: "token",
      repeat: true,
      description:
        "RRULE body (with or without a leading RRULE:), replacing the recurrence. Repeatable — pass once per rule (not comma-split).",
    },
    {
      name: "--send-updates",
      argLabel: "<who>",
      valueShape: "token",
      choices: SEND_UPDATES,
      description: "Who to notify; defaults to all (emails attendees the update)",
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
      description: "Event to update",
    },
  ],
  examples: [
    "ops calendar events update --event abc123 --summary-file ./summary.txt",
    "ops calendar events update --event abc123 --start 2026-06-10T16:00:00Z --end 2026-06-10T16:30:00Z",
    'ops calendar events update --event abc123 --timezone America/Denver --recurrence "FREQ=WEEKLY;BYDAY=SU"',
    "ops calendar events update --event abc123 --start 2026-07-08 --end 2026-07-09 (convert to all-day; --end exclusive)",
    "ops calendar events update abc123 --summary-file ./summary.txt",
  ],
}

export default async function calendarEventsUpdate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const attendeesRaw = parsed.string("--attendees")
  const recurrence = parsed.repeated("--recurrence")
  const patch: EventPatch = {
    calendarId: parsed.string("--calendar"),
    eventId: parsed.requireString("--event"),
    summary: parsed.string("--summary"),
    start: parsed.string("--start"),
    end: parsed.string("--end"),
    description: parsed.string("--description"),
    location: parsed.string("--location"),
    attendees:
      attendeesRaw !== undefined ? attendeesRaw.split(",").map((email) => email.trim()) : undefined,
    timezone: parsed.string("--timezone"),
    recurrence: recurrence.length > 0 ? recurrence : undefined,
    sendUpdates: await narrowSendUpdates(parsed.string("--send-updates")),
  }

  const client = await calendarOAuthClient()
  const events = await calendarEvents()
  const event = await events.updateEvent(client, patch)

  process.stdout.write(`${JSON.stringify(event, null, 2)}\n`)
}
