import { getEsoDayStr } from "@akasha/day/eso-day"
import { z } from "zod"
import { inputError } from "../exit.ts"
import { requireMatchPositional } from "../narrow.ts"
import { mtWallToInstant } from "./mountain-times.ts"

const HOUR = z.coerce.number().int().min(0).max(23)
const MINUTE = z.coerce.number().int().min(0).max(59)

const TIME_ONLY = /^(\d{1,2}):(\d{2})$/
const TIME_ONLY_FIELDS = z.tuple([HOUR, MINUTE])
const WALL_DATETIME = /^(\d{4}-\d{2}-\d{2})[T ](\d{1,2}):(\d{2})(?::\d{2})?$/
const WALL_FIELDS = z.tuple([z.string(), HOUR, MINUTE])
const HAS_TZ = /([zZ]|[+-]\d{2}:?\d{2})$/
const DAY_ONLY = /^\d{4}-\d{2}-\d{2}$/

export function parseInstantFlag(raw: string, now: Date): Date {
  const v = raw.trim()

  if (TIME_ONLY.test(v)) {
    const [hh, mm] = requireMatchPositional(TIME_ONLY, TIME_ONLY_FIELDS, v)
    return mtWallToInstant(getEsoDayStr(now), hh, mm)
  }

  if (WALL_DATETIME.test(v)) {
    const [dayStr, hh, mm] = requireMatchPositional(WALL_DATETIME, WALL_FIELDS, v)
    return mtWallToInstant(dayStr, hh, mm)
  }

  if (HAS_TZ.test(v)) {
    const d = new Date(v)
    if (Number.isNaN(d.getTime())) throw inputError(`invalid timestamp: "${raw}"`)
    return d
  }

  throw inputError(
    `unrecognized time "${raw}" — use HH:MM, "YYYY-MM-DD HH:MM" (Mountain local), or full ISO with offset/Z`
  )
}

export function esoDayOf(instant: Date): string {
  return getEsoDayStr(instant)
}

export function parseDayFlag(raw: string): string {
  const v = raw.trim()
  if (!DAY_ONLY.test(v)) {
    throw inputError(`--day must be YYYY-MM-DD (got "${raw}")`)
  }
  return v
}
