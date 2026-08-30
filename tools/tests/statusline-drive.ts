import { spawnSync } from "node:child_process"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { expect } from "bun:test"
import { formatSeatProcKey, readProcStartTicks } from "../lib/seat-proc-key.ts"
import { installRepos } from "./fixture.ts"

export const SCRIPT = resolve(import.meta.dir, "..", "statusline.sh")

export const SELF_AGENT_ID = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
export const OTHER_AGENT_ID = "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"

export const SLOTS = ["persona", "domain", "role"] as const
export type Slot = (typeof SLOTS)[number]

export const STATED_AT = 1_770_000_000_000

export interface Sandbox {
  readonly home: string
}

let active: Sandbox | null = null
const livePids: number[] = []

export function sandbox(): Sandbox {
  const home = mkdtempSync(resolve("/var/tmp", "statusline-"))
  mkdirSync(resolve(home, ".claude"), { recursive: true })
  installRepos(akashaDir(home))
  Bun.spawnSync(["git", "init", "-q", "-b", "main", "."], { cwd: akashaDir(home) })
  active = { home }
  return active
}

export function teardown(): void {
  for (const pid of livePids) {
    try {
      process.kill(pid)
    } catch {
    }
  }
  livePids.length = 0
  if (active !== null) {
    rmSync(active.home, { recursive: true, force: true })
    active = null
  }
}

export function spawnLivePid(): number {
  const proc = Bun.spawn(["sleep", "30"])
  livePids.push(proc.pid)
  return proc.pid
}

export function akashaDir(home: string): string {
  return resolve(home, "akasha")
}

export function seatsDir(home: string): string {
  return resolve(akashaDir(home), "agent", "seat")
}

export function writeSeatPage(home: string, agentId: string, frontmatter: readonly string[]): undefined {
  writeNamedSeatPage(home, `seat-${agentId}`, agentId, frontmatter)
}

export function writeNamedSeatPage(
  home: string,
  seatName: string,
  agentId: string,
  frontmatter: readonly string[]
): undefined {
  const dir = seatsDir(home)
  mkdirSync(dir, { recursive: true })
  writeFileSync(
    resolve(dir, `${seatName}.seat.md`),
    ["---", "page-type-slug: seat", `id: ${agentId}`, `title: "${seatName}"`, ...frontmatter, "---", ""].join("\n")
  )
}

let seated = 0

export function writeChildSeat(
  home: string,
  seatName: string,
  parentSeatName: string | null,
  procKey: string | null
): undefined {
  seated += 1
  const agentId = `00000000-0000-7000-9000-${String(seated).padStart(12, "0")}`
  writeNamedSeatPage(home, seatName, agentId, parentSeatName === null ? [] : [`principal-seat-name: ${parentSeatName}`])
  if (procKey === null) return
  writeFileSync(
    resolve(seatsDir(home), `${seatName}.seat.uncommitted.yaml`),
    `supervisor-process: "${procKey}"\n`
  )
}

export function liveProcKey(): string {
  const pid = spawnLivePid()
  return formatSeatProcKey({ pid, startTicks: readProcStartTicks(pid) ?? 0 })
}

export function writeAttributes(
  home: string,
  agentId: string,
  slugs: Partial<Record<Slot, string>>
): undefined {
  const stated: string[] = ["start-mode: headless"]
  for (const slot of SLOTS) {
    const slug = slugs[slot]
    if (slug === undefined) continue
    stated.push(`${slot}-slug: ${slug}`)
  }
  writeSeatPage(home, agentId, stated)
}

export function writeTranscript(
  home: string,
  lines: ReadonlyArray<Record<string, unknown>>
): string {
  const path = resolve(home, "transcript.jsonl")
  writeFileSync(path, `${lines.map((l) => JSON.stringify(l)).join("\n")}\n`)
  return path
}

export function assistantLine(wireId: string): Record<string, unknown> {
  return { type: "assistant", message: { model: wireId, content: [{ type: "text", text: "ok" }] } }
}

export const DEATH_LINE: Record<string, unknown> = {
  type: "assistant",
  isApiErrorMessage: true,
  apiErrorStatus: 429,
  message: { model: "<synthetic>", content: [{ type: "text", text: "limit" }] },
}

export function runStatusline(
  home: string,
  sessionId: string | null,
  agentId: string | null,
  transcriptPath: string | null = null,
  contextWindow: Record<string, unknown> | null = null
): string {
  const payload: Record<string, unknown> = { model: { id: "claude" } }
  if (sessionId !== null) payload.session_id = sessionId
  if (transcriptPath !== null) payload.transcript_path = transcriptPath
  if (contextWindow !== null) payload.context_window = contextWindow
  const env: Record<string, string> = {}
  for (const [k, v] of Object.entries(process.env)) {
    if (k === "AGENT_ID" || v === undefined) continue
    env[k] = v
  }
  env.HOME = home
  env.AKASHA_ROOT = akashaDir(home)
  if (agentId !== null) env.AGENT_ID = agentId
  const result = spawnSync("bash", [SCRIPT], {
    input: JSON.stringify(payload),
    env,
    encoding: "utf8",
  })
  expect(result.status ?? -1).toBe(0)
  return result.stdout ?? ""
}
