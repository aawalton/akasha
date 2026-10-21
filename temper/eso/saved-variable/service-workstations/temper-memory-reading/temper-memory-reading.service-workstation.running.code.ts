import { statSync } from "node:fs"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import {
  gameProcess,
  type Region,
  readerOf,
  regionsOf,
  scanAfresh,
} from "akasha/command/pages/temper/eso/memory/modules/eso-process-memory/eso-process-memory.module.code.ts"
import {
  type Global,
  globalHeld,
  globalKeyOf,
  globalsFoundUntilStopped,
  searchAfresh,
} from "akasha/command/pages/temper/eso/memory/modules/hks-global-finding/hks-global-finding.module.code.ts"
import type { Reader } from "akasha/command/pages/temper/eso/memory/modules/hks-table-reading/hks-table-reading.module.code.ts"
import {
  sleptUntilStopped,
  stopsOnSignal,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/tick-sleeping/tick-sleeping.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso/path/modules/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import {
  type LandingQueue,
  landingQueueOf,
} from "akasha/temper/eso/saved-variable/modules/landing-queue/landing-queue.module.code.ts"
import {
  CHARACTERS_GLOBAL,
  capturedFrom,
  FIGHTS_GLOBAL,
  markSeen,
  type Seen,
  seenAfresh,
} from "akasha/temper/eso/saved-variable/modules/memory-capture/memory-capture.module.code.ts"
import {
  type BuildReading,
  landReadings,
} from "akasha/temper/player/character/stat/modules/build-reading-lines/build-reading-lines.module.code.ts"
import {
  type Fight,
  landFights,
} from "akasha/temper/watcher/modules/watcher-import-fights/watcher-import-fights.module.code.ts"

const EVERY_MS = 1_000

const FIND_AGAIN_MS = 60_000

const FIND_AT_MOST_MS = 15_000

type Watching = {
  readonly pid: number
  readonly read: Reader
  readonly characters: Global | null
  readonly fights: Global | null
  readonly foundAt: number
  readonly loading: boolean
}

function say(line: string): undefined {
  console.log(line)
  return undefined
}

function holding(regions: readonly Region[], at: bigint): Region | undefined {
  return regions.find((region) => at >= region.from && at < region.to)
}

type Searched = { readonly found: readonly (Global | null)[]; readonly loading: boolean }

async function searched(
  read: Reader,
  regions: readonly Region[],
  names: readonly string[],
  pass: string,
  left: ReadonlySet<string>,
  signal: AbortSignal
): Promise<Searched | null> {
  if (names.length === 0 || regions.length === 0) {
    return { found: names.map(() => null), loading: false }
  }
  const started = Date.now()
  const scan = scanAfresh()
  const searches = names.map(() => ({ ...searchAfresh(), scan }))
  const found = await globalsFoundUntilStopped(read, regions, names, searches, left, signal)
  if (found === null) {
    say(`searched ${pass}: stopped after ${scan.chunks} chunks, ${Date.now() - started} ms`)
    return null
  }
  names.forEach((name, index) => {
    const search = searches[index] ?? searchAfresh()
    const capped = search.capped ? " (cap hit)" : ""
    const outcome = found[index] === null ? "missed" : "found"
    say(
      `searched ${name} in ${pass}: ${outcome}, ` +
        `${search.copies} copies${capped}, ${search.strings} strings`
    )
  })
  const { chunks, failed, partial, unread } = scan
  say(
    `searched ${pass}: ${chunks} chunks, ${failed} failed, ${partial} partial, ` +
      `${unread} pages unread, ${Date.now() - started} ms`
  )
  const loading = searches.some(
    (search, index) => found[index] === null && search.copies > 0 && search.strings === 0
  )
  return { found, loading }
}

async function foundIn(
  read: Reader,
  regions: readonly Region[],
  hot: Set<bigint>,
  names: readonly string[],
  warmOnly: boolean,
  left: ReadonlySet<string>,
  signal: AbortSignal
): Promise<Searched | null> {
  const warm = regions.filter((region) => hot.has(region.from))
  const warmPass = `${warm.length} warm regions`
  const fromWarmSearched = await searched(read, warm, names, warmPass, left, signal)
  if (fromWarmSearched === null) return null
  const fromWarm = fromWarmSearched.found
  const missing = warmOnly ? [] : names.filter((_, index) => (fromWarm[index] ?? null) === null)
  const fromAll = await searched(read, regions, missing, `${regions.length} regions`, left, signal)
  if (fromAll === null) return null
  const found = names.map(
    (name, index) => fromWarm[index] ?? fromAll.found[missing.indexOf(name)] ?? null
  )
  for (const global of found) {
    for (const at of global === null ? [] : [global.node, global.name]) {
      const region = holding(regions, at)
      if (region !== undefined) hot.add(region.from)
    }
  }
  return { found, loading: fromAll.loading }
}

function stillHeld(read: Reader, global: Global | null | undefined): Global | null {
  return global === null || global === undefined || globalHeld(read, global) === null
    ? null
    : global
}

async function watchingOf(
  pid: number,
  hot: Set<bigint>,
  before: Watching | null,
  left: ReadonlySet<string>,
  signal: AbortSignal
): Promise<Watching | null> {
  const started = Date.now()
  const read = readerOf(pid)
  const regions = regionsOf(pid)
  const kept = before?.pid === pid ? before : null
  const keptReads =
    kept !== null &&
    stillHeld(read, kept.characters) !== null &&
    stillHeld(read, kept.fights) !== null
  const names = [CHARACTERS_GLOBAL, FIGHTS_GLOBAL]
  const warmOnly = keptReads && left.size === 0
  const searchedNow = await foundIn(read, regions, hot, names, warmOnly, left, signal)
  if (searchedNow === null) return null
  const [foundCharacters, foundFights] = searchedNow.found
  const characters = foundCharacters ?? stillHeld(read, kept?.characters)
  const fights = foundFights ?? stillHeld(read, kept?.fights)
  const found = [characters === null ? null : "characters", fights === null ? null : "fights"]
  const named = found.filter((one) => one !== null).join(" and ") || "nothing"
  say(`found ${named} in process ${pid} in ${Date.now() - started} ms`)
  return { pid, read, characters, fights, foundAt: Date.now(), loading: searchedNow.loading }
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

const LOOKS_PAST_A_WRITE = 4

const NOTHING_LEFT: ReadonlySet<string> = new Set()

function heldKeysOf(watching: Watching | null): readonly string[] {
  const held = [watching?.characters, watching?.fights]
  return held.flatMap((global) =>
    global === null || global === undefined ? [] : [globalKeyOf(global)]
  )
}

const CHARACTERS_FILE = "TemperCharacters.lua"

function charactersFileOf(): string | null {
  try {
    return savedVarsFile(CHARACTERS_FILE)
  } catch {
    return null
  }
}

function writtenAt(path: string | null): number | null {
  if (path === null) return null
  try {
    return statSync(path).mtimeMs
  } catch {
    return null
  }
}

type Queues = {
  readonly readings: LandingQueue<BuildReading>
  readonly fights: LandingQueue<Fight>
}

function lookOnce(watching: Watching, seen: Seen, looked: boolean, queues: Queues): boolean {
  const roots = {
    characters: rootOf(watching, watching.characters),
    fights: rootOf(watching, watching.fights),
  }
  const captured = capturedFrom(watching.read, roots, seen, looked)
  queues.readings.add(captured.readings)
  queues.fights.add(captured.fights)
  markSeen(seen, captured)
  return roots.fights !== null
}

const LAST_LANDING_MS = 5_000

async function landedBeforeStopping(queues: Queues): Promise<undefined> {
  const landed = Promise.all([queues.readings.drained(), queues.fights.drained()]).then(() => true)
  const late = new Promise<boolean>((resolve) => {
    setTimeout(() => resolve(false), LAST_LANDING_MS)
  })
  const inTime = await Promise.race([landed, late])
  say(
    inTime ? "stopped, with every queued landing landed" : "stopped, with a landing still running"
  )
  return undefined
}

export async function runService(): Promise<never> {
  const stopping = stopsOnSignal()
  const seen = seenAfresh()
  const queues: Queues = {
    readings: landingQueueOf((many) => landReadings(many, { report: say }), say),
    fights: landingQueueOf((many) => landFights(many, { report: say }), say),
  }
  const hot = new Set<bigint>()
  const charactersFile = charactersFileOf()
  say(`a reload is told by ${charactersFile ?? "nothing, since no saved-variables file resolves"}`)
  let writtenBefore = writtenAt(charactersFile)
  let watching: Watching | null = null
  let scannedAt = 0
  let looked = false
  let left: ReadonlySet<string> = NOTHING_LEFT
  let looksPast = 0
  for (;;) {
    try {
      const pid = gameProcess()
      const now = Date.now()
      const written = writtenAt(charactersFile)
      if (written !== null && writtenBefore !== null && written !== writtenBefore) {
        say("the saved variables were written: other globals are looked for while these still read")
        left = new Set(heldKeysOf(watching))
        looksPast = LOOKS_PAST_A_WRITE
        scannedAt = 0
      }
      if (written !== null) writtenBefore = written
      if (pid === null) watching = null
      else if (looksPast > 0 && now - scannedAt >= FIND_AT_MOST_MS) {
        looksPast -= 1
        scannedAt = now
        const next = await watchingOf(pid, hot, watching, left, stopping.signal)
        if (next === null) break
        const moved = heldKeysOf(next).some((key) => !left.has(key))
        if (moved || looksPast === 0) {
          left = NOTHING_LEFT
          looksPast = 0
        }
        watching = next
        scannedAt = Date.now()
      } else if (
        stale(watching, pid, now) &&
        (watching?.loading === true || now - scannedAt >= FIND_AT_MOST_MS)
      ) {
        scannedAt = now
        const next = await watchingOf(pid, hot, watching, NOTHING_LEFT, stopping.signal)
        if (next === null) break
        watching = next
        scannedAt = Date.now()
      }
      if (pid !== null && watching !== null) {
        looked = lookOnce(watching, seen, looked, queues) || looked
      }
    } catch (thrown) {
      const stack = thrown instanceof Error ? (thrown.stack ?? "") : ""
      console.error(`a look failed: ${saidBy(thrown)}\n${stack}`)
    }
    if (!(await sleptUntilStopped(EVERY_MS, stopping.signal))) break
  }
  await landedBeforeStopping(queues)
  process.exit(0)
}
