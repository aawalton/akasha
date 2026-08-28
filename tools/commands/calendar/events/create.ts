export const summary = "Create a calendar event and print the normalized event as JSON"

import type { CommandHelp } from "../../../ops/surface.ts"
import { calendarEvents, calendarOAuthClient } from "../../../lib/calendar-google.ts"
import { type EventInput } from "@alanwalton/calendar-google/types"
import { narrowSendUpdates, SEND_UPDATES } from "../../../lib/calendar-send-updates.ts"
import { parseArgs } from "../../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--summary",
      argLabel: "<text>",
      valueShape: "prose",
      required: true,
      description: "Event title",
    },
    {
      name: "--start",
      argLabel: "<iso>",
      valueShape: "token",
      required: true,
      description:
        "ISO 8601 start timestamp, or a date-only YYYY-MM-DD for an all-day event. " +
        "--start and --end must both be date-only or both be timestamps.",
    },
    {
      name: "--end",
      argLabel: "<iso>",
      valueShape: "token",
      required: true,
      description:
        "ISO 8601 end timestamp, or a date-only YYYY-MM-DD for an all-day event. " +
        "For all-day the date is exclusive — the day after the last day (2026-07-08..2026-07-09 is a single day, July 8).",
    },
    {
      name: "--description",
      argLabel: "<text>",
      valueShape: "prose",
      description: "Optional event description",
    },
    {
      name: "--location",
      argLabel: "<text>",
      valueShape: "prose",
      description: "Optional event location",
    },
    {
      name: "--attendees",
      argLabel: "<emails>",
      valueShape: "token",
      description: "Comma-separated attendee emails",
    },
    {
      name: "--timezone",
      argLabel: "<iana>",
      valueShape: "token",
      description:
        "IANA zone name (e.g. America/Denver) for start/end; allows naive local --start/--end (DST-safe). Never a raw UTC offset. Not valid for all-day (date-only) events — rejected if combined with date-only --start/--end.",
    },
    {
      name: "--recurrence",
      argLabel: "<rrule>",
      valueShape: "token",
      repeat: true,
      description:
        "RRULE body (e.g. FREQ=WEEKLY;BYDAY=SU), with or without a leading RRULE:. Repeatable — pass once per rule (not comma-split).",
    },
    {
      name: "--send-updates",
      argLabel: "<who>",
      valueShape: "token",
      choices: SEND_UPDATES,
      description: "Who to notify; defaults to all (emails attendees their invites)",
    },
    {
      name: "--calendar",
      argLabel: "<id>",
      valueShape: "token",
      description: "Target calendar; optional. `primary` and unset both resolve to Alan's calendar",
    },
  ],
  examples: [
    "ops calendar events create --summary-file ./summary.txt --start 2026-06-10T15:00:00Z --end 2026-06-10T15:30:00Z",
    "ops calendar events create --summary-file ./summary.txt --start 2026-06-11T17:00:00Z --end 2026-06-11T18:00:00Z --attendees a@x.com,b@y.com --calendar primary",
    'ops calendar events create --summary-file ./summary.txt --start 2026-06-21T10:30:00 --end 2026-06-21T11:30:00 --timezone America/Denver --recurrence "FREQ=WEEKLY;BYDAY=SU"',
    "ops calendar events create --summary-file ./summary.txt --start 2026-07-08 --end 2026-07-09 (all-day, single day; --end is exclusive)",
    "ops calendar events create --summary-file ./summary.txt --start 2026-07-08 --end 2026-07-13 (all-day span, July 8-12)",
  ],
}

export default async function calendarEventsCreate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const attendeesRaw = parsed.string("--attendees")
  const recurrence = parsed.repeated("--recurrence")
  const input: EventInput = {
    calendarId: parsed.string("--calendar"),
    summary: parsed.requireString("--summary"),
    start: parsed.requireString("--start"),
    end: parsed.requireString("--end"),
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
  const event = await events.createEvent(client, input)

  process.stdout.write(`${JSON.stringify(event, null, 2)}\n`)
}
