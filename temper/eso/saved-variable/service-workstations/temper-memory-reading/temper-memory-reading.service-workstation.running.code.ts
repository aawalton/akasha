import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import {
  gameProcess,
  type Region,
  readerOf,
  regionsOf,
} from "akasha/command/pages/temper/eso/memory/modules/eso-process-memory/eso-process-memory.module.code.ts"
import {
  type Global,
  globalFound,
  globalHeld,
  searchAfresh,
} from "akasha/command/pages/temper/eso/memory/modules/hks-global-finding/hks-global-finding.module.code.ts"
import type { Reader } from "akasha/command/pages/temper/eso/memory/modules/hks-table-reading/hks-table-reading.module.code.ts"
import {
  sleptUntilStopped,
  stopsOnSignal,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/tick-sleeping/tick-sleeping.module.code.ts"
import {
  CHARACTERS_GLOBAL,
  capturedFrom,
  FIGHTS_GLOBAL,
  markSeen,
  type Seen,
  seenAfresh,
} from "akasha/temper/eso/saved-variable/modules/memory-capture/memory-capture.module.code.ts"
import { landReadings } from "akasha/temper/player/character/stat/modules/build-reading-lines/build-reading-lines.module.code.ts"
import { landFights } from "akasha/temper/watcher/modules/watcher-import-fights/watcher-import-fights.module.code.ts"

const EVERY_MS = 1_000

const FIND_AGAIN_MS = 60_000

const FIND_AT_MOST_MS = 15_000

type Watching = {
  readonly pid: number
  readonly read: Reader
  readonly characters: Global | null
  readonly fights: Global | null
  readonly foundAt: number
}

function say(line: string): undefined {
  console.log(line)
  return undefined
}

function holding(regions: readonly Region[], at: bigint): Region | undefined {
  return regions.find((region) => at >= region.from && at < region.to)
}

function searched(
  read: Reader,
  regions: readonly Region[],
  name: string,
  pass: string
): Global | null {
  const started = Date.now()
  const search = searchAfresh()
  const found = globalFound(read, regions, name, search)
  const { chunks, failed, partial, unread } = search.scan
  const capped = search.capped ? " (cap hit)" : ""
  say(
    `searched ${name} in ${pass}: ${found === null ? "missed" : "found"}, ` +
      `${search.copies} copies${capped}, ${search.strings} strings, ` +
      `${chunks} chunks, ${failed} failed, ${partial} partial, ${unread} pages unread, ` +
      `${Date.now() - started} ms`
  )
  return found
}

function foundIn(
  read: Reader,
  regions: readonly Region[],
  hot: Set<bigint>,
  name: string
): Global | null {
  const warm = regions.filter((region) => hot.has(region.from))
  const found =
    (warm.length > 0 ? searched(read, warm, name, `${warm.length} warm regions`) : null) ??
    searched(read, regions, name, `${regions.length} regions`)
  if (found === null) return null
  for (const at of [found.node, found.name]) {
    const region = holding(regions, at)
    if (region !== undefined) hot.add(region.from)
  }
  return found
}

function stillHeld(read: Reader, global: Global | null | undefined): Global | null {
  return global === null || global === undefined || globalHeld(read, global) === null
    ? null
    : global
}

function watchingOf(pid: number, hot: Set<bigint>, before: Watching | null): Watching {
  const started = Date.now()
  const read = readerOf(pid)
  const regions = regionsOf(pid)
  const kept = before?.pid === pid ? before : null
  const characters =
    foundIn(read, regions, hot, CHARACTERS_GLOBAL) ?? stillHeld(read, kept?.characters)
  const fights = foundIn(read, regions, hot, FIGHTS_GLOBAL) ?? stillHeld(read, kept?.fights)
  const found = [characters === null ? null : "characters", fights === null ? null : "fights"]
  const named = found.filter((one) => one !== null).join(" and ") || "nothing"
  say(`found ${named} in process ${pid} in ${Date.now() - started} ms`)
  return { pid, read, characters, fights, foundAt: Date.now() }
}

function rootOf(watching: Watching, global: Global | null): bigint | null {
  return global === null ? null : (globalHeld(watching.read, global)?.value ?? null)
}

function stale(watching: Watching | null, pid: number, now: number): boolean {
  if (watching === null || watching.pid !== pid) return true
  if (now - watching.foundAt >= FIND_AGAIN_MS) return true
  return (
    rootOf(watching, watching.characters) === null || rootOf(watching, watching.fights) === null
  )
}

async function lookOnce(watching: Watching, seen: Seen, looked: boolean): Promise<boolean> {
  const roots = {
    characters: rootOf(watching, watching.characters),
    fights: rootOf(watching, watching.fights),
  }
  const captured = capturedFrom(watching.read, roots, seen, looked)
  if (captured.readings.length > 0) await landReadings(captured.readings, { report: say })
  if (captured.fights.length > 0) await landFights(captured.fights, { report: say })
  markSeen(seen, captured)
  return roots.fights !== null
}

export async function runService(): Promise<never> {
  const stopping = stopsOnSignal()
  const seen = seenAfresh()
  const hot = new Set<bigint>()
  let watching: Watching | null = null
  let scannedAt = 0
  let looked = false
  for (;;) {
    try {
      const pid = gameProcess()
      const now = Date.now()
      if (pid === null) watching = null
      else if (stale(watching, pid, now) && now - scannedAt >= FIND_AT_MOST_MS) {
        scannedAt = now
        watching = watchingOf(pid, hot, watching)
        scannedAt = Date.now()
      }
      if (pid !== null && watching !== null) {
        looked = (await lookOnce(watching, seen, looked)) || looked
      }
    } catch (thrown) {
      const stack = thrown instanceof Error ? (thrown.stack ?? "") : ""
      console.error(`a look failed: ${saidBy(thrown)}\n${stack}`)
    }
    if (!(await sleptUntilStopped(EVERY_MS, stopping.signal))) process.exit(0)
  }
}
