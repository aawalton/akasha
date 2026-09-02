import type { CalendarClient } from "@akasha/google-calendar/client"

export type CalendarEvents = typeof import("@akasha/google-calendar/events")

export function calendarEvents(): Promise<CalendarEvents> {
  return import("@akasha/google-calendar/events")
}

export async function calendarClient(): Promise<CalendarClient> {
  return (await import("@akasha/google-calendar/client")).makeCalendarClient()
}

export async function calendarOAuthClient(): Promise<CalendarClient> {
  return (await import("@akasha/google-calendar/client")).makeOAuthCalendarClient()
}
