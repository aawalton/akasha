import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { exclusively } from "akasha/files/modules/exclusive/exclusive.module.code.ts"
import { textOnDisk } from "akasha/utils/fs/modules/text-on-disk/text-on-disk.module.code.ts"
import { requireEnv } from "akasha/utils/narrow/modules/require-env/require-env.module.code.ts"
import {
  readMemInfoKb,
  resolveGbOverride,
} from "akasha/utils/system/modules/memory-guard/memory-guard.module.code.ts"

const AT = ".local/state/workstation-services/landing-admission"

const ROOM_GB = 8

const HELD_MS = 30_000

const ASKED_MS = 2_000

const WAITED_MS = 60_000

const KB_A_GB = 1_048_576

const OVER = "LANDING_MIN_FREE_MEMORY_GB"

const SAID = "landing-admission:"

const HOME = "HOME"

export function admissionAt(home: string): string {
  return join(home, AT)
}

export function admitting(
  said: string | null,
  now: number,
  availableKb: number,
  roomGb: number
): boolean {
  const took = said === null ? Number.NaN : Number(said.trim())
  const spaced = !Number.isFinite(took) || now - took >= HELD_MS
  return spaced && availableKb >= roomGb * KB_A_GB
}

export function turnTaken(home: string): boolean {
  const at = admissionAt(home)
  mkdirSync(dirname(at), { recursive: true })
  return exclusively(
    at,
    (): boolean => {
      const now = Date.now()
      const room = resolveGbOverride(OVER, ROOM_GB)
      if (!admitting(textOnDisk(at), now, readMemInfoKb().availableKb, room)) return false
      writeFileSync(at, String(now))
      return true
    },
    WAITED_MS
  )
}

export async function waitedForRoom(kind: string): Promise<undefined> {
  const home = requireEnv(HOME)
  let told = false
  while (!turnTaken(home)) {
    if (!told) {
      told = true
      const room = String(resolveGbOverride(OVER, ROOM_GB))
      process.stderr.write(`${SAID} ${kind} waits for the ${room} GB a landing starts on\n`)
    }
    await Bun.sleep(ASKED_MS)
  }
}
