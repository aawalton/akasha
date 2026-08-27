import type { CalendarClient } from "@alanwalton/calendar-google/client"

export type CalendarGoogle = typeof import("@alanwalton/calendar-google")


export function calendarGoogle(): Promise<CalendarGoogle> {
  return import("@alanwalton/calendar-google")
}

export async function calendarClient(): Promise<CalendarClient> {
  return (await calendarGoogle()).makeCalendarClient()
}

export async function calendarOAuthClient(): Promise<CalendarClient> {
  return (await calendarGoogle()).makeOAuthCalendarClient()
}
