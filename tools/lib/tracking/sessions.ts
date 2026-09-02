import type { Page } from "../daily-tracking/tracking-types.ts"
import { operationalError } from "../exit.ts"
import type { Landed } from "../page-query-client.ts"
import {
  dayOfName,
  dropSessionRow,
  landSessionRow,
  SESSION_TRACKING,
} from "./day-place.ts"
import { displayTitle, fieldStr } from "./format.ts"
import { heldRow } from "./held-row.ts"
import { getMountainEveningDayStr } from "./mountain-times.ts"
import type { PageAccessClient } from "./pages.ts"
import { resolveOrCreateDaily, TRACKING_WRITER } from "./resolve.ts"
import { esoDayOf } from "./session-time.ts"
import { titleMatchesAnyWord } from "./title-words.ts"

const HELD_SEQ = 0

export const SESSION_HELD_ON = "dailyTrackingSlug"

function landed(written: Landed, what: string): string {
  if (!written.ok) throw operationalError(`${what} did not land beside its day: ${written.why}`)
  return written.at
}

export function dayHolding(session: Page): string {
  const day = fieldStr(session, SESSION_HELD_ON)
  if (day === undefined) {
    throw operationalError(
      "this session names no day to stand beside, so there is no file to write it to"
    )
  }
  return dayOfName(day)
}

export interface NewSession {
  readonly title: string
  readonly startInstant: Date
  readonly endInstant?: Date
  readonly safety?: string
  readonly difficulty?: string
  readonly relationships?: readonly string[]
  readonly attributedDay?: string
}

export interface CreatedSession {
  readonly id: string
  readonly seq: number
  readonly dayStr: string
  readonly dailyId: string
  readonly dailyCreated: boolean
}

export async function createSession(
  sb: PageAccessClient,
  params: NewSession
): Promise<CreatedSession> {
  const dayStr = params.attributedDay ?? esoDayOf(params.startInstant)
  const daily = await resolveOrCreateDaily(sb, dayStr)
  const id = Bun.randomUUIDv7()
  const values = {
    id,
    title: params.title,
    startTime: params.startInstant.toISOString(),
    dailyTracking: daily.id,
    ...(params.endInstant !== undefined ? { endTime: params.endInstant.toISOString() } : {}),
    ...(params.safety !== undefined ? { safetyLevel: params.safety } : {}),
    ...(params.difficulty !== undefined ? { difficultyLevel: params.difficulty } : {}),
    ...(params.relationships !== undefined && params.relationships.length > 0
      ? { relationships: [...params.relationships] }
      : {}),
  }
  landed(
    await landSessionRow(
      "write-row",
      dayStr,
      await heldRow(SESSION_TRACKING, values),
      TRACKING_WRITER
    ),
    `the session "${params.title}"`
  )
  return { id, seq: HELD_SEQ, dayStr, dailyId: daily.id, dailyCreated: daily.created }
}

export async function amendSession(
  session: Page,
  set: Readonly<Record<string, unknown>>,
  movingTo?: string
): Promise<undefined> {
  const standing = dayHolding(session)
  const id = typeof session.id === "string" ? session.id : ""
  const what = `the amendment of "${displayTitle(session)}"`
  if (movingTo === undefined || movingTo === standing) {
    landed(
      await landSessionRow(
        "patch-row",
        standing,
        await heldRow(SESSION_TRACKING, { ...set, id }),
        TRACKING_WRITER
      ),
      what
    )
    return
  }
  landed(
    await landSessionRow(
      "write-row",
      movingTo,
      await heldRow(SESSION_TRACKING, { ...session, ...set, id }),
      TRACKING_WRITER
    ),
    `${what} onto ${movingTo}`
  )
  landed(
    await dropSessionRow(standing, id, TRACKING_WRITER),
    `${what} off ${standing}`
  )
}

export async function dropSession(session: Page): Promise<undefined> {
  const standing = dayHolding(session)
  const id = typeof session.id === "string" ? session.id : ""
  landed(
    await dropSessionRow(standing, id, TRACKING_WRITER),
    `taking "${displayTitle(session)}" off ${standing}`
  )
}

export async function closeSession(
  sb: PageAccessClient,
  session: Page,
  endInstant: Date,
  dayTurnWords: readonly string[]
): Promise<string | undefined> {
  const standing = dayHolding(session)
  const id = typeof session.id === "string" ? session.id : ""
  const set: Record<string, unknown> = { id, endTime: endInstant.toISOString() }
  let finalizedDay: string | undefined
  if (titleMatchesAnyWord(displayTitle(session), dayTurnWords)) {
    const bucketDay = getMountainEveningDayStr(endInstant)
    const daily = await resolveOrCreateDaily(sb, bucketDay)
    if (fieldStr(session, "dailyTracking") !== daily.id) {
      set.dailyTracking = daily.id
      finalizedDay = bucketDay
    }
  }
  if (finalizedDay === undefined || finalizedDay === standing) {
    landed(
      await landSessionRow(
        "patch-row",
        standing,
        await heldRow(SESSION_TRACKING, set),
        TRACKING_WRITER
      ),
      `the close of "${displayTitle(session)}"`
    )
    return finalizedDay
  }
  landed(
    await landSessionRow(
      "write-row",
      finalizedDay,
      await heldRow(SESSION_TRACKING, { ...session, ...set }),
      TRACKING_WRITER
    ),
    `the move of "${displayTitle(session)}" onto ${finalizedDay}`
  )
  landed(
    await dropSessionRow(standing, id, TRACKING_WRITER),
    `taking "${displayTitle(session)}" off ${standing}`
  )
  return finalizedDay
}
