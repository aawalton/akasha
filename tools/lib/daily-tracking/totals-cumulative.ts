import {
  askComposed,
  getEsoDayStrOffset,
  getEsoDayWindow,
  kebabKey,
  numberOf,
  textOf,
} from "./code-bridge.ts"
import { readNetBytesCumulative } from "./net-bytes-points.ts"
import { PERSONA_DAY_PAGE_TYPE_SLUG } from "./persona-day-points.ts"
import type { PointsSourceRowFields } from "./points-source-writer.ts"
import { startsInWindow, tallyWeightedIntervals } from "./weighted-interval-points.ts"

const SNAPSHOT_MAX_LAG_DAYS = 2

export type ComputedTotal =
  | {
      readonly state: "computed"
      readonly points: number
      readonly source: string
      readonly population: string
      readonly horizon: string
    }
  | { readonly state: "no-figure"; readonly reason: string }

export function num(value: unknown): number | undefined {
  return numberOf(value)
}

export function str(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined
}

export function strings(value: unknown): readonly string[] | undefined {
  if (!Array.isArray(value)) return undefined
  return value.filter((entry): entry is string => typeof entry === "string")
}

async function drain(
  pageTypeSlug: string,
  where: Readonly<Record<string, unknown>>
): Promise<readonly Readonly<Record<string, unknown>>[]> {
  const asked = await askComposed({
    "page-type": pageTypeSlug,
    ...(Object.keys(where).length > 0 ? { where } : {}),
  })
  if (!asked.ok) throw new Error(`\`${pageTypeSlug}\` went unread: ${asked.why}`)
  const { n, rows } = asked.answer
  if (rows.length !== n) {
    throw new Error(
      `\`${pageTypeSlug}\` answered with ${rows.length} of ${n} page(s), so a total summed from ` +
        `it would be low without anything saying so`
    )
  }
  return rows.map((row) => row.values)
}

export function datedHorizon(
  rows: readonly Readonly<Record<string, unknown>>[],
  dateKey: string
): string {
  const days = rows
    .map((r) => str(r[dateKey]))
    .filter((d): d is string => d !== undefined)
    .sort()
  const earliest = days[0]
  const latest = days[days.length - 1]
  if (earliest === undefined || latest === undefined) return "no dated row to reach back to"
  return `${earliest} through ${latest}`
}

export function esoDaysSpanning(
  rows: readonly Readonly<Record<string, unknown>>[],
  instantKey: string,
  todayStr: string
): readonly string[] {
  const instants = rows
    .map((r) => str(r[instantKey]))
    .filter((v): v is string => v !== undefined)
    .map((v) => new Date(v).getTime())
    .filter((t) => !Number.isNaN(t))
  if (instants.length === 0) return []
  const earliest = new Date(Math.min(...instants))
  const days: string[] = []
  for (let k = 0; ; k++) {
    const dayStr = getEsoDayStrOffset(getEsoDayWindow(todayStr).start, -k)
    days.push(dayStr)
    if (getEsoDayWindow(dayStr).start.getTime() <= earliest.getTime()) break
  }
  return days.reverse()
}

export function snapshotIsCurrent(
  snapshotDay: string,
  todayStr: string,
  maxLagDays: number = SNAPSHOT_MAX_LAG_DAYS
): boolean {
  const floor = getEsoDayStrOffset(getEsoDayWindow(todayStr).start, -maxLagDays)
  return snapshotDay >= floor
}

function bytesPrefixes(row: PointsSourceRowFields): readonly string[] {
  if (row.pointsPathPrefixes !== undefined && row.pointsPathPrefixes.length > 0) {
    return row.pointsPathPrefixes
  }
  return row.pointsPathPrefix === undefined || row.pointsPathPrefix === ""
    ? []
    : [row.pointsPathPrefix]
}

export async function computeEngineTotal(
  repoRoot: string,
  row: PointsSourceRowFields,
  personaSlug: string,
  todayStr: string
): Promise<ComputedTotal> {
  if (row.pointsSourceKind === "stoplights") {
    return {
      state: "no-figure",
      reason:
        "a stoplights recipe scores each day against that day's lights, and no cumulative " +
        "of it is defined or written anywhere",
    }
  }
  const aggregate = row.pointsSourceAggregate ?? ""
  if (aggregate === "bytes") {
    const prefixes = bytesPrefixes(row)
    if (prefixes.length === 0) {
      return { state: "no-figure", reason: "a bytes aggregate naming no path prefix" }
    }
    const points = await readNetBytesCumulative(repoRoot, prefixes)
    return {
      state: "computed",
      points,
      source: `readNetBytesCumulative over ${repoRoot}`,
      population: `${prefixes.length} path prefix(es): ${prefixes.join(", ")}`,
      horizon: "the clone's full commit history, unwindowed",
    }
  }

  const source = row.pointsSource ?? ""
  if (source === "") {
    return { state: "no-figure", reason: `a ${aggregate} aggregate naming no source` }
  }

  if (aggregate === "weighted") {
    const rows = await drain(source, {})
    const weightField = kebabKey(row.pointsSourceWeightField ?? "")
    const dayStrs = esoDaysSpanning(rows, "start-time", todayStr)
    let points = 0
    let rated = 0
    for (const dayStr of dayStrs) {
      const window = getEsoDayWindow(dayStr)
      const tally = tallyWeightedIntervals(
        rows.filter((r) => startsInWindow(r, window)),
        weightField
      )
      points += tally.points
      rated += tally.ratedRows
    }
    return {
      state: "computed",
      points,
      source: `tallyWeightedIntervals per ESO day, summed over ${dayStrs.length} day(s)`,
      population: `${rows.length} ${source} row(s), of which ${rated} rated and windowed`,
      horizon: datedHorizon(rows, "start-time"),
    }
  }

  const rows = await drain(source, { "persona-slug": { is: personaSlug } })
  if (aggregate === "count") {
    return {
      state: "computed",
      points: rows.length,
      source: `count of every ${source} page she owns`,
      population: `${rows.length} page(s)`,
      horizon: datedHorizon(rows, "date"),
    }
  }
  const field = kebabKey(row.pointsSourcePointField ?? "")
  if (field === "") {
    return { state: "no-figure", reason: "a sum aggregate naming no point field" }
  }
  let total = 0
  let carrying = 0
  for (const r of rows) {
    const value = numberOf(r[field])
    if (value !== undefined) carrying++
    total += value ?? 0
  }
  return {
    state: "computed",
    points: total,
    source: `sum of ${field} over every ${source} page she owns`,
    population: `${rows.length} page(s), of which ${carrying} carry ${field}`,
    horizon: datedHorizon(rows, "date"),
  }
}

export async function computeSnapshotTotal(
  personaSlug: string,
  passName: string,
  todayStr: string
): Promise<ComputedTotal> {
  const rows = await drain(PERSONA_DAY_PAGE_TYPE_SLUG, {
    "persona-slug": { is: personaSlug },
  })
  const snapshots = rows
    .map((r) => ({ day: textOf(r.date), value: numberOf(r["source-total-snapshot"]) }))
    .filter(
      (s): s is { day: string; value: number } => s.day !== undefined && s.value !== undefined
    )
    .sort((a, b) => a.day.localeCompare(b.day))
  const latest = snapshots[snapshots.length - 1]
  if (latest === undefined) {
    return {
      state: "no-figure",
      reason:
        `${passName} owns her cumulative and writes it as source-total-snapshot, and no page of ` +
        `hers carries one — so the pass has never recorded a figure here`,
    }
  }
  if (!snapshotIsCurrent(latest.day, todayStr)) {
    return {
      state: "no-figure",
      reason:
        `${passName} last recorded a cumulative on ${latest.day}, more than ` +
        `${SNAPSHOT_MAX_LAG_DAYS} day(s) before ${todayStr} — that figure records when the ` +
        "pass stopped rather than what her recipe produces now",
    }
  }
  return {
    state: "computed",
    points: latest.value,
    source: `${passName}, read from the source-total-snapshot it wrote on ${latest.day}`,
    population: `${snapshots.length} snapshot(s) across ${rows.length} day page(s)`,
    horizon: datedHorizon(rows, "date"),
  }
}
