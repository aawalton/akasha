import { existsSync } from "node:fs"
import { rowAppender, type RowAppender } from "./page-rows-write.ts"
import { writePage } from "./page-write.ts"
import { whereFor } from "./page-write-where.ts"
import { type Roots } from "@akasha/pages-system/markdown-page-at"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"

const SOURCE_TYPE = "log-source"

const DAY_TYPE = "seat-log-day"

const LINES_KEY = "lines"

export type LogLine = {
  readonly "written-at": string
  readonly "agent-id"?: string | undefined
  readonly level?: string | undefined
  readonly text?: string | undefined
  readonly data?: unknown
}

export interface LogWriter {
  readonly write: (line: LogLine) => undefined
  readonly refused: () => string | null
  // A LINE IS WRITTEN AFTER THE CALL THAT WROTE IT HAS RETURNED, so whoever must not lose one waits
  // on this before going down. Nothing waits on it during normal work; that is the point of it.
  readonly flushed: () => Promise<void>
}

function titleOf(name: string): string {
  const said = name.replace(/-/g, " ")
  return `${said.slice(0, 1).toUpperCase()}${said.slice(1)}`
}

function standing(roots: Roots, pageType: string, name: string): boolean {
  const at = whereFor(roots, pageType, name)
  return at !== null && existsSync(at.path)
}

function dayNameOf(source: string, seatName: string, date: string): string {
  return `${source}-${seatName}-${date}`
}

function appenderFor(
  roots: Roots,
  source: string,
  seatName: string,
  date: string
): RowAppender | null {
  if (!standing(roots, SOURCE_TYPE, source)) {
    writePage(roots, SOURCE_TYPE, source, { title: titleOf(source), slug: source })
    if (!standing(roots, SOURCE_TYPE, source)) return null
  }
  const name = dayNameOf(source, seatName, date)
  if (!standing(roots, DAY_TYPE, name)) {
    writePage(roots, DAY_TYPE, name, {
      title: `${titleOf(source)} ${seatName} ${date}`,
      slug: name,
      "source-slug": source,
      "seat-name": seatName,
      date,
    })
    if (!standing(roots, DAY_TYPE, name)) return null
  }
  return rowAppender(roots, "log-line", name, LINES_KEY)
}

export function logWriter(
  source: string,
  seatName: string,
  roots: Roots = resolveRoots()
): LogWriter {
  let date = ""
  let appender: RowAppender | null = null
  let refused: string | null = null
  return {
    write: (line): undefined => {
      try {
        const today = line["written-at"].slice(0, 10)
        if (today !== date) {
          date = today
          appender = appenderFor(roots, source, seatName, today)
          if (appender === null) refused = `no log day could be opened for \`${seatName}\` on ${today}`
        }
        appender?.append(line)
        const said = appender?.refused() ?? null
        if (said !== null) refused = said
      } catch (err) {
        refused = err instanceof Error ? err.message : String(err)
      }
    },
    refused: () => refused,
    flushed: () => appender?.flushed() ?? Promise.resolve(),
  }
}
