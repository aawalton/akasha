import { readFiles, writeFiles } from "@akasha/pages-query"

/**
 * A net worth reading is kept in akasha as one line on the hour page for the hour it was taken,
 * under `akasha/temper/temper-holdings/net-worth-hours`. An hour rather than a day gathers the
 * readings, and the hour is read in UTC off the instant the scan carries.
 *
 * The scan states that instant as epoch milliseconds. The hour page and the line both key off the
 * UTC ISO instant that reads back from it, so the milliseconds are turned into that instant once
 * and everything downstream reads the instant.
 */
const FOLDER = "akasha/temper/temper-holdings/net-worth-hours/pages"

export const NET_WORTH_HOUR_PAGE_TYPE_SLUG = "temper-net-worth-hour"

/** The writer the store records these commits against: a name and an address, or it refuses. */
export const NET_WORTH_HOUR_WRITER = "temper watcher <watcher@alanwalton.com>"

const HOUR_LENGTH = 13

const DAY_LENGTH = 10

export type ReadingValues = {
  readonly id: string
  readonly accountPage: string
  readonly capturedAt: string
  readonly totalValue: number
  readonly goldAmount?: number | undefined
  readonly currencyGoldValue?: number | undefined
  readonly itemValue?: number | undefined
  readonly excludedGuildBankValue?: number | undefined
}

export type Landed =
  | { readonly outcome: "landed"; readonly at: string }
  | { readonly outcome: "already"; readonly at: string }
  | { readonly outcome: "refused"; readonly why: string }

/** The instant a scan was taken at, read off the epoch milliseconds the scan states. */
export function capturedAtOf(dataTimestamp: number): string {
  return new Date(dataTimestamp).toISOString()
}

export function netWorthHourSlug(capturedAt: string): string {
  return `hour-${capturedAt.slice(0, HOUR_LENGTH).replace("T", "-")}`
}

export function netWorthHourTitle(capturedAt: string): string {
  return `${capturedAt.slice(0, DAY_LENGTH)} ${capturedAt.slice(11, HOUR_LENGTH)}:00 UTC`
}

export function netWorthHourPagePath(slug: string): string {
  return `${FOLDER}/${slug}/${slug}.${NET_WORTH_HOUR_PAGE_TYPE_SLUG}.ts`
}

export function netWorthHourLinesPath(slug: string): string {
  return `${FOLDER}/${slug}/${slug}.${NET_WORTH_HOUR_PAGE_TYPE_SLUG}.snapshots.jsonl`
}

export function exportNameFor(slug: string): string {
  const parts = slug.split("-").filter((one) => one !== "")
  const first = parts[0]
  if (first === undefined) return ""
  const rest = parts.slice(1).map((one) => one.charAt(0).toUpperCase() + one.slice(1))
  return first + rest.join("")
}

export function netWorthHourBody(capturedAt: string, id: string): string {
  const slug = netWorthHourSlug(capturedAt)
  return [
    'import type { TemperNetWorthHour } from "../../temper-net-worth-hour.page-type.ts"',
    "",
    `export const ${exportNameFor(slug)} = {`,
    `  id: ${JSON.stringify(id)},`,
    `  pageTypeSlug: ${JSON.stringify(NET_WORTH_HOUR_PAGE_TYPE_SLUG)},`,
    `  slug: ${JSON.stringify(slug)},`,
    `  title: ${JSON.stringify(netWorthHourTitle(capturedAt))},`,
    '  snapshots: "jsonl",',
    "} as const satisfies TemperNetWorthHour",
    "",
  ].join("\n")
}

/**
 * A reading states the account it was taken for and the instant it was taken at, so the key the old
 * store carried — the account and the milliseconds joined by a dash — says nothing the line does not
 * already say, and no line carries one.
 */
export function readingLine(values: ReadingValues): string {
  const out: Record<string, unknown> = {
    id: values.id,
    accountPage: values.accountPage,
    capturedAt: values.capturedAt,
    totalValue: values.totalValue,
  }
  if (values.goldAmount !== undefined) out.goldAmount = values.goldAmount
  if (values.currencyGoldValue !== undefined) out.currencyGoldValue = values.currencyGoldValue
  if (values.itemValue !== undefined) out.itemValue = values.itemValue
  if (values.excludedGuildBankValue !== undefined) {
    out.excludedGuildBankValue = values.excludedGuildBankValue
  }
  return JSON.stringify(out)
}

function instantIn(line: string): string {
  try {
    const held = JSON.parse(line) as { capturedAt?: unknown }
    return typeof held.capturedAt === "string" ? held.capturedAt : ""
  } catch {
    return ""
  }
}

function accountIn(line: string): string {
  try {
    const held = JSON.parse(line) as { accountPage?: unknown }
    return typeof held.accountPage === "string" ? held.accountPage : ""
  } catch {
    return ""
  }
}

/**
 * The hour's lines carrying this reading, ordered by the instant each was taken at. Answers null
 * where a reading for this account at this instant already stands.
 */
export function snapshotsWith(body: string | null, values: ReadingValues): string | null {
  const held = body === null ? [] : body.split("\n").filter((one) => one.trim() !== "")
  for (const one of held) {
    if (instantIn(one) === values.capturedAt && accountIn(one) === values.accountPage) return null
  }
  const put = [...held]
  let at = put.length
  while (at > 0 && instantIn(put[at - 1] ?? "") > values.capturedAt) at--
  put.splice(at, 0, readingLine(values))
  return `${put.join("\n")}\n`
}

const ATTEMPTS = 4

const PAUSE_MS = 1_500

const sleep = (ms: number): Promise<undefined> =>
  new Promise((done) => {
    setTimeout(() => {
      done(undefined)
    }, ms)
  })

/**
 * Each try reads afresh, because a try the client gave up waiting on may have landed, and a reading
 * already on the hour counts as landed rather than as a refusal.
 */
export async function landNetWorthReading(
  values: ReadingValues,
  minted: () => string
): Promise<Landed> {
  const slug = netWorthHourSlug(values.capturedAt)
  const pagePath = netWorthHourPagePath(slug)
  const linesPath = netWorthHourLinesPath(slug)
  let why = `no attempt to land a reading on ${linesPath} was made`
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    if (attempt > 1) await sleep(PAUSE_MS)
    const found = await readFiles([pagePath, linesPath])
    if (!found.ok) {
      why = found.why
      continue
    }
    const page = found.bodies.find((one) => one.path === pagePath)?.content ?? null
    const lines = found.bodies.find((one) => one.path === linesPath)?.content ?? null
    const content = snapshotsWith(lines, values)
    if (content === null) return { outcome: "already", at: found.at }
    const puts = [{ path: linesPath, content }]
    if (page === null) {
      puts.unshift({ path: pagePath, content: netWorthHourBody(values.capturedAt, minted()) })
    }
    const landed = await writeFiles(
      puts,
      NET_WORTH_HOUR_WRITER,
      `temper: a net worth reading of ${Math.round(values.totalValue)} gold at ${values.capturedAt}`,
      undefined,
      undefined,
      found.at
    )
    if (landed.ok) return { outcome: "landed", at: landed.at }
    why = landed.why
  }
  return { outcome: "refused", why: `${why} — ${ATTEMPTS} attempts were spent` }
}
