import type {
  Landed,
  LandingDeps,
  Tried,
} from "../watcher-page-landing/watcher-page-landing.module.code.ts"
import {
  contentIn,
  insertedByInstant,
  jsonlBodyOf,
  jsonlLinesOf,
  jsonRowOf,
  landOverAttempts,
  PAGE_LANDING_WRITER,
  pageBodyFor,
  pagePathIn,
  readingFor,
  rowsPathIn,
  textIn,
  triedFrom,
  writingFor,
} from "../watcher-page-landing/watcher-page-landing.module.code.ts"

const FOLDER = "temper/temper-holdings/net-worth-hours/pages"

const ROWS_PROPERTY = "snapshots"

const HOUR_LENGTH = 13

const DAY_LENGTH = 10

const HOUR_AT = 11

export const NET_WORTH_HOUR_PAGE_TYPE_SLUG = "temper-net-worth-hour"

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

export function capturedAtOf(epochMs: number): string {
  return new Date(epochMs).toISOString()
}

export function netWorthHourSlug(capturedAt: string): string {
  return `hour-${capturedAt.slice(0, HOUR_LENGTH).replace("T", "-")}`
}

export function netWorthHourTitle(capturedAt: string): string {
  return `${capturedAt.slice(0, DAY_LENGTH)} ${capturedAt.slice(HOUR_AT, HOUR_LENGTH)}:00 UTC`
}

export function netWorthHourPagePath(slug: string): string {
  return pagePathIn(FOLDER, slug, NET_WORTH_HOUR_PAGE_TYPE_SLUG)
}

export function netWorthHourLinesPath(slug: string): string {
  return rowsPathIn(FOLDER, slug, NET_WORTH_HOUR_PAGE_TYPE_SLUG, ROWS_PROPERTY)
}

export function netWorthHourBody(capturedAt: string, id: string): string {
  return pageBodyFor(NET_WORTH_HOUR_PAGE_TYPE_SLUG, netWorthHourSlug(capturedAt), id, [
    ["title", netWorthHourTitle(capturedAt)],
    [ROWS_PROPERTY, "jsonl"],
  ])
}

export function readingLine(values: ReadingValues): string {
  return jsonRowOf([
    ["id", values.id],
    ["accountPage", values.accountPage],
    ["capturedAt", values.capturedAt],
    ["totalValue", values.totalValue],
    ["goldAmount", values.goldAmount],
    ["currencyGoldValue", values.currencyGoldValue],
    ["itemValue", values.itemValue],
    ["excludedGuildBankValue", values.excludedGuildBankValue],
  ])
}

export function snapshotsWith(body: string | null, values: ReadingValues): string | null {
  const held = jsonlLinesOf(body)
  for (const one of held) {
    const sameInstant = textIn(one, "capturedAt") === values.capturedAt
    if (sameInstant && textIn(one, "accountPage") === values.accountPage) return null
  }
  const line = readingLine(values)
  return jsonlBodyOf(insertedByInstant(held, line, "capturedAt", values.capturedAt))
}

export function netWorthCommitMessage(values: ReadingValues): string {
  const gold = Math.round(values.totalValue)
  return `temper: a net worth reading of ${gold} gold at ${values.capturedAt}`
}

export async function landNetWorthReading(
  values: ReadingValues,
  minted: () => string,
  deps: LandingDeps = {}
): Promise<Landed> {
  const read = readingFor(deps)
  const write = writingFor(deps)
  const slug = netWorthHourSlug(values.capturedAt)
  const pagePath = netWorthHourPagePath(slug)
  const linesPath = netWorthHourLinesPath(slug)
  const tryOnce = async (): Promise<Tried> => {
    const found = await read([pagePath, linesPath])
    if (!found.ok) return { outcome: "again", why: found.why }
    const content = snapshotsWith(contentIn(found.bodies, linesPath), values)
    if (content === null) return { outcome: "already", at: found.at }
    const puts = [{ path: linesPath, content }]
    if (contentIn(found.bodies, pagePath) === null) {
      puts.unshift({ path: pagePath, content: netWorthHourBody(values.capturedAt, minted()) })
    }
    const message = netWorthCommitMessage(values)
    return triedFrom(
      await write(puts, PAGE_LANDING_WRITER, message, undefined, undefined, found.at)
    )
  }
  return landOverAttempts(`no attempt to land a reading on ${linesPath} was made`, tryOnce, deps)
}
