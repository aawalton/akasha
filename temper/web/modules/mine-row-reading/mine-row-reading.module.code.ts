import { FIRST_PART } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { partAt } from "akasha/page/modules/file-parts/page-file-parts.module.code.ts"
import {
  readFiles,
  readPages,
} from "akasha/page/query/modules/store-writing/store-writing.module.code.ts"
import {
  contentIn,
  jsonlLinesOf,
  type ReadFiles,
  type ReadPages,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"
import { MINE_PAGE_TYPE } from "akasha/temper/web/modules/mine-row-landing/mine-row-landing.module.code.ts"
import { MINE_NAME } from "akasha/temper/web/modules/mined-item-rows/mined-item-rows.module.code.ts"

const HELD = "jsonl"

const PAGE_ENDING = ".ts"

export type MineRow = Readonly<Record<string, unknown>>

export type MineReading = {
  readonly readPages: ReadPages
  readonly readFiles: ReadFiles
}

export type MineRead =
  | { readonly ok: true; readonly rows: readonly MineRow[] }
  | { readonly ok: false; readonly why: string }

const READING: MineReading = { readPages, readFiles }

type Taking = {
  readonly taken: (line: string) => MineRow | null
  readonly enough: (rows: readonly MineRow[]) => boolean
}

function rowIn(line: string): MineRow | null {
  try {
    const row: unknown = JSON.parse(line)
    return typeof row === "object" && row !== null && !Array.isArray(row) ? (row as MineRow) : null
  } catch {
    return null
  }
}

async function minePage(reading: MineReading): Promise<string | { readonly why: string }> {
  const named = `${MINE_PAGE_TYPE}/${MINE_NAME}`
  const found = await reading.readPages([{ pageTypeSlug: MINE_PAGE_TYPE, slug: MINE_NAME }])
  if (!found.ok) return { why: `\`${named}\` did not come back: ${found.why}` }
  const page = found.bodies.find((one) => one.path.endsWith(PAGE_ENDING))?.path
  return page ?? { why: `no page is at \`${named}\`` }
}

async function rowsTaken(
  property: string,
  taking: Taking,
  reading: MineReading
): Promise<MineRead> {
  const page = await minePage(reading)
  if (typeof page !== "string") return { ok: false, why: page.why }
  const rows: MineRow[] = []
  for (let part = FIRST_PART; ; part += 1) {
    const path = partAt(page, property, HELD, part)
    if (path === null)
      return { ok: false, why: `\`${page}\` has no \`${property}\` part beside it` }
    const read = await reading.readFiles([path])
    if (!read.ok) return { ok: false, why: `\`${path}\` did not come back: ${read.why}` }
    const content = contentIn(read.bodies, path)
    if (content === null) return { ok: true, rows }
    for (const line of jsonlLinesOf(content)) {
      const row = taking.taken(line)
      if (row === null) continue
      rows.push(row)
      if (taking.enough(rows)) return { ok: true, rows }
    }
  }
}

export async function mineRowsKeyed(
  property: string,
  key: string,
  keys: readonly number[],
  reading: MineReading = READING
): Promise<MineRead> {
  const wanted = new Set(keys.map(String))
  if (wanted.size === 0) return { ok: true, rows: [] }
  const keyed = new RegExp(`[{,]"${key}":(-?\\d+)[,}]`)
  return rowsTaken(
    property,
    {
      taken: (line) => {
        const held = keyed.exec(line)?.[1]
        if (held === undefined || !wanted.has(held)) return null
        const row = rowIn(line)
        return typeof row?.[key] === "number" && wanted.has(String(row[key])) ? row : null
      },
      enough: (rows) => rows.length >= wanted.size,
    },
    reading
  )
}

export async function mineRowsNamed(
  property: string,
  text: string,
  limit: number,
  reading: MineReading = READING
): Promise<MineRead> {
  const sought = text.toLowerCase()
  if (sought === "" || limit <= 0) return { ok: true, rows: [] }
  return rowsTaken(
    property,
    {
      taken: (line) => {
        if (!line.toLowerCase().includes(sought)) return null
        const row = rowIn(line)
        const name = row?.name
        return typeof name === "string" && name.toLowerCase().includes(sought) ? row : null
      },
      enough: (rows) => rows.length >= limit,
    },
    reading
  )
}
