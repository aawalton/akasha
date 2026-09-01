import type { CalendarClient } from "@akasha/calendar-google/client"

export type CalendarEvents = typeof import("@akasha/calendar-google/events")


export function calendarEvents(): Promise<CalendarEvents> {
  return import("@akasha/calendar-google/events")
}

export async function calendarClient(): Promise<CalendarClient> {
  return (await import("@akasha/calendar-google/client")).makeCalendarClient()
}

export async function calendarOAuthClient(): Promise<CalendarClient> {
  return (await import("@akasha/calendar-google/client")).makeOAuthCalendarClient()
}
