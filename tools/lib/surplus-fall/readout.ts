import { askNamed, askTaking } from "@shared/pages-query"
import { askPage } from "@shared/pages-query/ask"
import { resolveReadoutGroup } from "../../../readouts/readout-resolver.ts"
import { type ReadoutScale, readoutShape } from "../../../readouts/readout-scale-shape.ts"
import { isTierColor, type Rung } from "./tier.ts"

export const DAY_ARGUMENT_TYPE = "calendar-date"

export const MEASURES_QUERY = "daily-tracking-all"

const SLEEP_KEY = "sleep-points"

const MINUTES_PER_HOUR = 60

export interface Readout {
  readonly slug: string
  readonly label: string
  readonly rungs: readonly Rung[]
  readonly querySlug: string
  readonly dayArgument: string
}

function numberIn(values: Readonly<Record<string, unknown>>, key: string): number | null {
  const held = values[key]
  if (typeof held === "number") return Number.isFinite(held) ? held : null
  if (typeof held !== "string" || held.trim() === "") return null
  const read = Number(held)
  return Number.isFinite(read) ? read : null
}

export function rungsOf(scale: ReadoutScale): readonly Rung[] {
  const shape = readoutShape(scale)
  const rungs: Rung[] = []
  for (const rung of shape.rungs) {
    if (!isTierColor(rung.color)) {
      throw new Error(
        `rungsOf: the readout scale \`${shape.slug}\` states a \`${rung.color}\` rung, and a fall is said in the five colors a tier carries`
      )
    }
    rungs.push({ at: rung.at, color: rung.color })
  }
  if (shape.direction !== "ascending") {
    throw new Error(
      `rungsOf: the readout scale \`${shape.slug}\` falls from black through blue, so a lower reading is the better one and a fall down it is a climb`
    )
  }
  return rungs
}

export async function dayArgumentOf(querySlug: string): Promise<string> {
  const asked = await askPage("page-query", querySlug)
  if (asked.outcome !== "found") throw new Error(`dayArgumentOf: ${asked.why}`)
  const takes = asked.page.values.takes
  if (takes === null || typeof takes !== "object" || Array.isArray(takes)) {
    throw new Error(
      `dayArgumentOf: the page query \`${querySlug}\` states no \`takes\`, so nothing on it says which argument the day fills`
    )
  }
  const named = Object.entries(takes as Record<string, unknown>)
    .filter(([, type]) => type === DAY_ARGUMENT_TYPE)
    .map(([name]) => name)
  const one = named[0]
  if (one === undefined || named.length > 1) {
    throw new Error(
      `dayArgumentOf: the page query \`${querySlug}\` takes ${named.length} \`${DAY_ARGUMENT_TYPE}\` arguments, and a readout holds one day`
    )
  }
  return one
}

export async function resolveOneReadout(groupSlug: string): Promise<Readout> {
  const group = await resolveReadoutGroup(groupSlug)
  const [readout, ...rest] = group.readouts
  if (readout === undefined || rest.length > 0) {
    throw new Error(
      `resolveOneReadout: the group \`${groupSlug}\` holds ${group.readouts.length} readouts, and this watches one reading rather than a strip`
    )
  }
  const querySlug = readout.querySlug
  if (querySlug === null) {
    throw new Error(
      `resolveOneReadout: the readout \`${readout.slug}\` states no \`query-slug\`, so nothing answers it`
    )
  }
  return {
    slug: readout.slug,
    label: readout.label,
    rungs: rungsOf(readout.scale),
    querySlug,
    dayArgument: await dayArgumentOf(querySlug),
  }
}

export async function readReading(readout: Readout, day: string): Promise<number | null> {
  const asked = await askTaking(readout.querySlug, { [readout.dayArgument]: day })
  if (!asked.ok) throw new Error(`readReading: \`${readout.slug}\` went unread: ${asked.why}`)
  return asked.answer.value
}

export async function readSleepHours(day: string): Promise<number | null> {
  const asked = await askNamed(MEASURES_QUERY)
  if (!asked.ok) throw new Error(`readSleepHours: ${asked.why}`)
  const rows = asked.answer.rows
  if (rows.length === 0) {
    throw new Error(
      `readSleepHours: \`${MEASURES_QUERY}\` answered with no days at all, which is a read that failed rather than a life with nothing in it`
    )
  }
  const found = rows.find((row) => row.values.date === day)
  if (found === undefined) return null
  const minutes = numberIn(found.values, SLEEP_KEY)
  return minutes === null ? null : minutes / MINUTES_PER_HOUR
}
