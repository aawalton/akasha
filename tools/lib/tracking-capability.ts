import type { Page, PageAccessClient } from "./daily-tracking/tracking-types.ts"
import {
  listSessionActivities,
  normalizeSessionActivities,
  setActivityDefault,
} from "./tracking/activities.ts"
import { resolveAttributedDay } from "./tracking/day-attribution.ts"
import { buildDeleteEcho, resolveEchoedDay } from "./tracking/echoes.ts"
import {
  displayTitle,
  durationSeconds,
  fieldNum,
  fieldStr,
  fmtDuration,
  fmtMtHm,
} from "./tracking/format.ts"
import {
  parseDifficulty,
  parseSafety,
  resolveCarriedSafety,
  resolveDifficulty,
} from "./tracking/levels.ts"
import { getMountainEveningDayStr, mtWallHm } from "./tracking/mountain-times.ts"
import { getPage, getPageAccessClient, getPages } from "./tracking/pages.ts"
import {
  blockDay,
  DAILY_TRACKING_VERSION,
  ensureNoOpenSession,
  findOpenSession,
  findPriorClosedSession,
  listDaySessions,
  requireOpenSession,
  resolveOrCreateDaily,
  TRACKING_WRITER,
} from "./tracking/resolve.ts"
import { planSafetySplit } from "./tracking/safety-split.ts"
import {
  amendSession,
  closeSession,
  createSession,
  dayHolding,
  dropSession,
  SESSION_HELD_ON,
} from "./tracking/sessions.ts"
import { DAY_TURN_WORDS, MINUTE_WORDS, titleMatchesAnyWord } from "./tracking/title-words.ts"

export type { Page, PageAccessClient }

export { DAILY_TRACKING_VERSION, DAY_TURN_WORDS, MINUTE_WORDS, SESSION_HELD_ON, TRACKING_WRITER }

const format = {
  fieldStr,
  fieldNum,
  displayTitle,
  fmtMtHm,
  fmtDuration,
  durationSeconds,
}

const time = {
  parseInstantFlag: (raw: string, now: Date): Date => parseInstantFlag(raw, now),
  parseDayFlag: (raw: string): string => parseDayFlag(raw),
  esoDayOf: (instant: Date): string => esoDayOf(instant),
}

const levels = { parseSafety, parseDifficulty, resolveCarriedSafety, resolveDifficulty }

const resolve = {
  findOpenSession,
  requireOpenSession,
  ensureNoOpenSession,
  findPriorClosedSession,
  blockDay,
  resolveOrCreateDaily,
  listSessionActivities,
  normalizeSessionActivities,
  setActivityDefault,
  listDaySessions,
}

const sessions = { createSession, amendSession, dropSession, closeSession, dayHolding }

const dayAttribution = { resolveAttributedDay }

const access = { getPages, getPage }

const client = { getPageAccessClient }

const home = { mtWallHm }

const reset = { getMountainEveningDayStr }

const titleWords = { DAY_TURN_WORDS, MINUTE_WORDS }

const wordMatch = { titleMatchesAnyWord }

const deleteEchoModule = { buildDeleteEcho }

const echoedDayModule = { resolveEchoedDay }

const safetySplitModule = { planSafetySplit }

import { esoDayOf, parseDayFlag, parseInstantFlag } from "./tracking/session-time.ts"

export function trackingFormat(): Promise<typeof format> {
  return Promise.resolve(format)
}

export function trackingTime(): Promise<typeof time> {
  return Promise.resolve(time)
}

export function trackingLevels(): Promise<typeof levels> {
  return Promise.resolve(levels)
}

export function trackingResolve(): Promise<typeof resolve> {
  return Promise.resolve(resolve)
}

export function trackingSessions(): Promise<typeof sessions> {
  return Promise.resolve(sessions)
}

export function trackingDayAttribution(): Promise<typeof dayAttribution> {
  return Promise.resolve(dayAttribution)
}

export function pagesAccess(): Promise<typeof access> {
  return Promise.resolve(access)
}

export function pagesClient(): Promise<typeof client> {
  return Promise.resolve(client)
}

export function homeTimes(): Promise<typeof home> {
  return Promise.resolve(home)
}

export function resetTimes(): Promise<typeof reset> {
  return Promise.resolve(reset)
}

export function sleepTitleWords(): Promise<typeof titleWords> {
  return Promise.resolve(titleWords)
}

export function titleWordMatch(): Promise<typeof wordMatch> {
  return Promise.resolve(wordMatch)
}

export function deleteEcho(): Promise<typeof deleteEchoModule> {
  return Promise.resolve(deleteEchoModule)
}

export function echoedDay(): Promise<typeof echoedDayModule> {
  return Promise.resolve(echoedDayModule)
}

export function safetySplit(): Promise<typeof safetySplitModule> {
  return Promise.resolve(safetySplitModule)
}
