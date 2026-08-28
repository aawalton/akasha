import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { fire, type Ran } from "./hook-shell.ts"
import {
  type HookDecision,
  type Recorded,
  recordedIn,
  soleRecordIn,
  writeCurlStub,
} from "./hook-decision-shim.ts"

export const SCRIPT = "inference-hook-block-interactive-stall.inference-hook.code.attachment.ts"

export const AGENT = "019fa471-82e6-7808-93fa-30a33698fff8"

export const SESSION = "72dec169-79dc-40ca-8a2c-6f2e599041bb"

export const SEAT = "stalling-seat"

const trees: string[] = []

function scratchTree(prefix: string): string {
  const dir = mkdtempSync(`/var/tmp/${prefix}`)
  trees.push(dir)
  return dir
}

export function releaseScratchTrees(): undefined {
  for (const dir of trees.splice(0)) rmSync(dir, { recursive: true, force: true })
  return undefined
}

export interface RunResult extends Ran {
  readonly home: string
}

export interface Payload {
  readonly stop_hook_active?: boolean
  readonly transcript_path?: string
  readonly background_tasks?: readonly { readonly status: string }[]
  readonly session_crons?: readonly unknown[]
  readonly session_id?: string
}

function akashaIn(home: string): string {
  return resolve(home, "akasha")
}

function seatsIn(home: string): string {
  return resolve(akashaIn(home), "agent", "seat")
}

export function fakeHome(mode: "interactive" | "headless" | null): string {
  const home = scratchTree("interactive-stall-home-")
  mkdirSync(seatsIn(home), { recursive: true })
  mkdirSync(resolve(akashaIn(home), "tools", "ops"), { recursive: true })
  writeFileSync(resolve(akashaIn(home), "tools", "ops", "cli.ts"), "// stub\n")
  if (mode !== null)
    writeFileSync(
      resolve(seatsIn(home), `${SEAT}.seat.md`),
      ["---", "page-type-slug: seat", `id: ${AGENT}`, `title: "${SEAT}"`, `start-mode: ${mode}`, "---", ""].join("\n")
    )
  return home
}

export function stubDecider(line: string, said: string): string {
  const dir = scratchTree("interactive-stall-bun-")
  writeFileSync(resolve(dir, "out.txt"), line === "" ? "" : `${line}\n`)
  writeFileSync(resolve(dir, "said.txt"), said === "" ? "" : `${said}\n`)
  writeFileSync(
    resolve(dir, "bun"),
    `#!/bin/sh\nd="$(dirname "$0")"\ncat >/dev/null 2>&1\ncat "$d/out.txt"\ncat "$d/said.txt" >&2\nexit 0\n`,
    { mode: 0o755 }
  )
  writeCurlStub(dir)
  return dir
}

function pathEnv(stubDir?: string, path?: string): Record<string, string> {
  if (path !== undefined) return { PATH: path }
  if (stubDir === undefined) return {}
  return { PATH: `${stubDir}:${process.env.PATH ?? ""}` }
}

export function runHook(
  payload: Payload | string,
  options: {
    readonly home: string
    readonly stubDir?: string
    readonly path?: string
    readonly agentId?: string
  }
): RunResult {
  const ran = fire(SCRIPT, {
    stdin: payload,
    env: {
      ...pathEnv(options.stubDir, options.path),
      AGENT_ID: options.agentId ?? AGENT,
      HOME: options.home,
      AKASHA_ROOT: akashaIn(options.home),
    },
  })
  return { ...ran, home: options.home }
}

export function decisionsIn(home: string): readonly HookDecision[] {
  return recordedIn(home).map((one) => one.values)
}

export function soleDecision(result: RunResult): HookDecision {
  return soleRecordIn(result.home).values
}

export function soleRecord(result: RunResult): Recorded {
  return soleRecordIn(result.home)
}
