import type { CalendarClient } from "@alanwalton/calendar-google/client"

export type CalendarEvents = typeof import("@alanwalton/calendar-google/events")


export function calendarEvents(): Promise<CalendarEvents> {
  return import("@alanwalton/calendar-google/events")
}

export async function calendarClient(): Promise<CalendarClient> {
  return (await import("@alanwalton/calendar-google/client")).makeCalendarClient()
}

export async function calendarOAuthClient(): Promise<CalendarClient> {
  return (await import("@alanwalton/calendar-google/client")).makeOAuthCalendarClient()
}
