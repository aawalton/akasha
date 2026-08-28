export const summary = "Set Alan's own response (accept/decline/tentative) on an event, as JSON"

import type { CommandHelp } from "../../../ops/surface.ts"
import { calendarEvents, calendarOAuthClient } from "../../../lib/calendar-google.ts"
import { type RsvpStatus } from "@alanwalton/calendar-google/types"
import { narrowSendUpdates, SEND_UPDATES } from "../../../lib/calendar-send-updates.ts"
import { inputError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--event",
      argLabel: "<id>",
      valueShape: "token",
      required: true,
      description: "Event to RSVP to",
    },
    {
      name: "--status",
      argLabel: "<status>",
      valueShape: "token",
      required: true,
      choices: ["accepted", "declined", "tentative"],
      description: "The response to set: accepted, declined, or tentative",
    },
    {
      name: "--calendar",
      argLabel: "<id>",
      valueShape: "token",
      description: "Target calendar; optional. `primary` and unset both resolve to Alan's calendar",
    },
    {
      name: "--send-updates",
      argLabel: "<who>",
      valueShape: "token",
      choices: SEND_UPDATES,
      description: "Who to notify of the response; defaults to all (notifies the organizer)",
    },
  ],
  positionals: [
    {
      name: "event",
      required: false,
      aliasOfFlag: "--event",
      description: "Event to RSVP to",
    },
  ],
  examples: [
    "ops calendar events rsvp --event abc123 --status declined",
    "ops calendar events rsvp --event abc123 --status accepted --calendar aawalton@gmail.com",
    "ops calendar events rsvp --event abc123 --status tentative --send-updates none",
    "ops calendar events rsvp abc123 --status declined",
  ],
}

const STATUSES: readonly RsvpStatus[] = ["accepted", "declined", "tentative"]

async function narrowStatus(raw: string): Promise<RsvpStatus> {
  const match = STATUSES.find((status) => status === raw)
  if (match === undefined)
    throw inputError(`--status must be one of: ${STATUSES.join(", ")} (got: ${raw})`)
  return match
}

export default async function calendarEventsRsvp(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const client = await calendarOAuthClient()
  const events = await calendarEvents()
  const event = await events.rsvpEvent(client, {
    calendarId: parsed.string("--calendar"),
    eventId: parsed.requireString("--event"),
    status: await narrowStatus(parsed.requireString("--status")),
    sendUpdates: await narrowSendUpdates(parsed.string("--send-updates")),
  })

  process.stdout.write(`${JSON.stringify(event, null, 2)}\n`)
}
