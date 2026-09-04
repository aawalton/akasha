import { getEsoDayStr, getEsoDayWindow } from "@akasha/day/eso-day"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { deriverFor } from "./deriver-hold.ts"
import { DAILY_TRACKING, derivedDayOf, SESSION_TRACKING } from "./tracking/day-place.ts"

export const WAKE_DAY = "wake-day"

const SLEEP = "sleep"

export interface SleepBlock {
  readonly title: unknown
  readonly startTime: unknown
  readonly endTime: unknown
}

export function isSleepTitle(title: unknown): boolean {
  return typeof title === "string" && title.trim().toLowerCase() === SLEEP
}

export function wakeInstantFromBlocks(
  blocks: readonly SleepBlock[],
  window: { readonly start: Date; readonly end: Date }
): Date | null {
  const startMs = window.start.getTime()
  const endMs = window.end.getTime()
  let earliest: number | null = null
  for (const block of blocks) {
    if (!isSleepTitle(block.title)) continue
    if (typeof block.startTime !== "string" || typeof block.endTime !== "string") continue
    const blockStartMs = Date.parse(block.startTime)
    const blockEndMs = Date.parse(block.endTime)
    if (Number.isNaN(blockStartMs) || Number.isNaN(blockEndMs)) continue
    if (blockEndMs <= blockStartMs) continue
    if (blockEndMs < startMs || blockEndMs >= endMs) continue
    if (earliest === null || blockEndMs < earliest) earliest = blockEndMs
  }
  return earliest === null ? null : new Date(earliest)
}

function textAt(values: Readonly<Record<string, unknown>>, key: string): string | null {
  const value = values[key]
  return typeof value === "string" ? value : null
}

/**
 * The sleep sessions standing on a day, read off the deriver rather than asked for.
 *
 * This finds the day by its `date` value across every day row, not by the name its page answers
 * to, so the funnel's naming rule does not reach it. What the funnel does decide for it is whether
 * the day is somewhere this derive can see at all: `derivedDayOf` refuses for a day that has moved
 * rather than let an empty derive read as an empty day.
 */
export function sleepBlocksOn(roots: Roots, dayStr: string): readonly SleepBlock[] {
  derivedDayOf(dayStr)
  const derive = deriverFor(roots)
  const days = derive.rows(DAILY_TRACKING)
  if (days === null) return []
  let dayId: string | null = null
  for (const row of days) {
    if (textAt(row.values, "date") !== dayStr) continue
    dayId = textAt(row.values, "id")
    break
  }
  if (dayId === null) return []
  const sessions = derive.rows(SESSION_TRACKING)
  if (sessions === null) return []
  const blocks: SleepBlock[] = []
  for (const row of sessions) {
    if (textAt(row.values, DAILY_TRACKING) !== dayId) continue
    blocks.push({
      title: row.values.title,
      startTime: row.values["start-time"],
      endTime: row.values["end-time"],
    })
  }
  return blocks
}

export function wakeInstantOn(roots: Roots, dayStr: string): string {
  const window = getEsoDayWindow(dayStr)
  const woke = wakeInstantFromBlocks(sleepBlocksOn(roots, dayStr), window)
  return (woke ?? window.start).toISOString()
}

export function wokeAtOn(roots: Roots, at: number): string {
  return wakeInstantOn(roots, getEsoDayStr(new Date(at)))
}

export function dayAfter(dayStr: string): string {
  return getEsoDayStr(getEsoDayWindow(dayStr).end)
}

export function dayBefore(dayStr: string): string {
  return getEsoDayStr(new Date(getEsoDayWindow(dayStr).start.getTime() - 1))
}

export function wakeDayOf(roots: Roots, instant: Date): string {
  const day = getEsoDayStr(instant)
  const at = instant.getTime()
  if (at < Date.parse(wakeInstantOn(roots, day))) return dayBefore(day)
  const next = dayAfter(day)
  return at >= Date.parse(wakeInstantOn(roots, next)) ? next : day
}

export function wakeDayWindow(
  roots: Roots,
  dayStr: string
): { readonly from: string; readonly to: string } {
  return { from: wakeInstantOn(roots, dayStr), to: wakeInstantOn(roots, dayAfter(dayStr)) }
}

export interface Woke {
  readonly instant: string
  readonly day: string
}

export function wokeOn(roots: Roots, at: number): Woke {
  const day = wakeDayOf(roots, new Date(at))
  return { instant: wakeInstantOn(roots, day), day }
}
