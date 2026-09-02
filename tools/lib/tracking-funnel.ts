import { type Dirent, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { DAILY_TRACKING, SESSION_TRACKING } from "./tracking/day-place.ts"

/**
 * The folders every reach that writes one of Alan's days is written in.
 *
 * This scanner is deliberately kept outside all three, because it spells the day page types and the
 * write verbs as literals and would otherwise be the first thing it refuses.
 */
export const FUNNEL_DIRS = ["lib/tracking", "commands/tracking", "lib/inbox-tracking"] as const

/**
 * The three files the funnel is made of, and the only ones permitted past it.
 *
 * `day-place.ts` is the funnel. `activities.ts` and `email-entry.ts` write pages that are not days,
 * so they reach the page store without deciding where a day is kept.
 */
export const ALLOWED_TO_REACH = [
  "lib/tracking/day-place.ts",
  "lib/tracking/activities.ts",
  "lib/inbox-tracking/email-entry.ts",
] as const

export const WRITE_VERBS = [
  "pageLanding",
  "patchPage",
  "rowLanding",
  "rowsLanding",
  "removeRow",
] as const

export const NAMES_THE_FUNNEL = "lib/tracking/day-place.ts"

const TS = ".ts"

const TEST_TS = ".test.ts"

const CLIENT = /import\s*\{([^}]*)\}\s*from\s*"[^"]*page-query-client\.ts"/g

export interface Bypass {
  readonly path: string
  readonly reason: string
}

export interface Reading {
  readonly scanned: readonly string[]
  readonly weighed: readonly string[]
  readonly bypasses: readonly Bypass[]
}

function filesUnder(at: string, prefix: string): readonly string[] {
  let entries: readonly Dirent[]
  try {
    entries = readdirSync(at, { withFileTypes: true })
  } catch {
    return []
  }
  const found: string[] = []
  for (const entry of entries) {
    const relPath = `${prefix}/${entry.name}`
    if (entry.isDirectory()) found.push(...filesUnder(join(at, entry.name), relPath))
    else if (entry.name.endsWith(TS)) found.push(relPath)
  }
  return found.sort()
}

export function funnelFilesIn(repoRoot: string): readonly string[] {
  const found: string[] = []
  for (const dir of FUNNEL_DIRS) found.push(...filesUnder(join(repoRoot, "tools", dir), dir))
  return found
}

function reachesAround(relPath: string, text: string): readonly Bypass[] {
  const found: Bypass[] = []
  for (const named of text.matchAll(CLIENT)) {
    for (const one of (named[1] as string).split(",").map((each) => each.trim())) {
      if (!(WRITE_VERBS as readonly string[]).includes(one)) continue
      found.push({
        path: relPath,
        reason:
          `takes \`${one}\` from \`page-query-client.ts\`, which writes the page store around ` +
          `the funnel; land the write through \`tools/${NAMES_THE_FUNNEL}\` instead`,
      })
    }
  }
  return found
}

function namesTheDayTypes(relPath: string, text: string): readonly Bypass[] {
  const found: Bypass[] = []
  for (const slug of [DAILY_TRACKING, SESSION_TRACKING]) {
    if (!text.includes(`"${slug}"`)) continue
    found.push({
      path: relPath,
      reason:
        `spells the page type \`${slug}\`, so it decides for itself where a day is kept; take ` +
        `the page type from \`tools/${NAMES_THE_FUNNEL}\` instead`,
    })
  }
  return found
}

export function readingOf(
  repoRoot: string,
  read: (relPath: string) => string = (relPath) =>
    readFileSync(join(repoRoot, "tools", relPath), "utf8")
): Reading {
  const scanned = funnelFilesIn(repoRoot)
  const weighed: string[] = []
  const bypasses: Bypass[] = []
  for (const relPath of scanned) {
    if (relPath.endsWith(TEST_TS)) continue
    weighed.push(relPath)
    const text = read(relPath)
    if (!(ALLOWED_TO_REACH as readonly string[]).includes(relPath)) {
      bypasses.push(...reachesAround(relPath, text))
    }
    if (relPath !== NAMES_THE_FUNNEL) bypasses.push(...namesTheDayTypes(relPath, text))
  }
  return { scanned, weighed, bypasses }
}
