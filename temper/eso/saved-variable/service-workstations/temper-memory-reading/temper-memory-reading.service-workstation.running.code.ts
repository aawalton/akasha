import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import {
  gameProcess,
  readerOf,
  regionsOf,
} from "akasha/command/pages/temper/eso/memory/modules/eso-process-memory/eso-process-memory.module.code.ts"
import {
  type Global,
  globalFound,
  globalHeld,
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

const EVERY_MS = 3_000

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

function watchingOf(pid: number): Watching {
  const started = Date.now()
  const read = readerOf(pid)
  const regions = regionsOf(pid)
  const characters = globalFound(read, regions, CHARACTERS_GLOBAL)
  const fights = globalFound(read, regions, FIGHTS_GLOBAL)
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

async function lookOnce(watching: Watching, seen: Seen, looked: boolean): Promise<undefined> {
  const roots = {
    characters: rootOf(watching, watching.characters),
    fights: rootOf(watching, watching.fights),
  }
  const captured = capturedFrom(watching.read, roots, seen, looked)
  if (captured.readings.length > 0) await landReadings(captured.readings, { report: say })
  if (captured.fights.length > 0) await landFights(captured.fights, { report: say })
  markSeen(seen, captured)
  return undefined
}

export async function runService(): Promise<never> {
  const stopping = stopsOnSignal()
  const seen = seenAfresh()
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
        watching = watchingOf(pid)
      }
      if (pid !== null && watching !== null) {
        await lookOnce(watching, seen, looked)
        looked = true
      }
    } catch (thrown) {
      console.error(`a look failed: ${saidBy(thrown)}`)
    }
    if (!(await sleptUntilStopped(EVERY_MS, stopping.signal))) process.exit(0)
  }
}
