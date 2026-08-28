import { chmodSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { fire, type Ran } from "./hook-shell.ts"
import {
  type HookDecision,
  type Recorded,
  recordedIn,
  soleRecordIn,
  writeCurlStub,
} from "./hook-decision-shim.ts"

export const SCRIPT = "inference-hook-block-headless-halt.inference-hook.code.attachment.ts"

export const AGENT = "019fa471-82e6-7808-93fa-30a33698fff8"

export const SESSION = "72dec169-79dc-40ca-8a2c-6f2e599041bb"

export const SEAT = "halting-seat"

const scratch: string[] = []

function scratchTree(prefix: string): string {
  const tree = mkdtempSync(`/var/tmp/${prefix}`)
  scratch.push(tree)
  return tree
}

export function releaseScratchTrees(): undefined {
  for (const tree of scratch.splice(0)) rmSync(tree, { recursive: true, force: true })
}

export interface RunResult {
  readonly exitCode: number
  readonly stdout: string
  readonly stderr: string
  readonly home: string
}

export interface Payload {
  session_id?: string
  stop_hook_active?: boolean
  transcript_path?: string
  background_tasks?: readonly { id: string; type: string; status: string; description: string }[]
  session_crons?: readonly unknown[]
  last_assistant_message?: string
}

function akashaIn(home: string): string {
  return resolve(home, "akasha")
}

function seatsIn(home: string): string {
  return resolve(akashaIn(home), "agent", "seat")
}

export function fakeHome(withDispatcher = true): string {
  const home = scratchTree("block-headless-halt-home-")
  if (withDispatcher) {
    mkdirSync(resolve(akashaIn(home), "tools", "ops"), { recursive: true })
    writeFileSync(resolve(akashaIn(home), "tools", "ops", "cli.ts"), "// stub\n")
  }
  return home
}

export function pathWithDecider(line: string, said: string): string {
  const dir = scratchTree("block-headless-halt-bun-")
  writeFileSync(resolve(dir, "out.txt"), line === "" ? "" : `${line}\n`)
  writeFileSync(resolve(dir, "said.txt"), said === "" ? "" : `${said}\n`)
  const bin = resolve(dir, "bun")
  writeFileSync(
    bin,
    `#!/usr/bin/env bash\nd="$(dirname "$0")"\ncat >/dev/null 2>&1\n` +
      `cat "$d/out.txt"\ncat "$d/said.txt" >&2\nexit 0\n`
  )
  chmodSync(bin, 0o755)
  writeCurlStub(dir)
  return `${dir}:${process.env.PATH ?? ""}`
}

export function runHeadless(payload: Payload | string, env: Record<string, string> = {}): RunResult {
  const home = env.HOME ?? fakeHome()
  recordMode(home, "headless")
  return runHook(payload, { ...env, HOME: home })
}

export function runHook(payload: Payload | string, env: Record<string, string> = {}): RunResult {
  const home = env.HOME ?? fakeHome()
  const ran: Ran = fire(SCRIPT, {
    stdin: typeof payload === "string" ? payload : JSON.stringify(payload),
    env: {
      PATH: pathWithDecider("", ""),
      AGENT_ID: AGENT,
      ...env,
      HOME: home,
      AKASHA_ROOT: akashaIn(home),
    },
  })
  return { exitCode: ran.exitCode, stdout: ran.stdout, stderr: ran.stderr, home }
}

export function runInteractive(payload: Payload | string, env: Record<string, string> = {}): RunResult {
  const home = env.HOME ?? fakeHome()
  recordMode(home, "interactive")
  return runHook(payload, { ...env, HOME: home })
}

function recordMode(home: string, value: string): void {
  const dir = seatsIn(home)
  mkdirSync(dir, { recursive: true })
  writeFileSync(
    resolve(dir, `${SEAT}.seat.md`),
    ["---", "page-type-slug: seat", `id: ${AGENT}`, `title: "${SEAT}"`, `start-mode: ${value}`, "---", ""].join("\n")
  )
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
