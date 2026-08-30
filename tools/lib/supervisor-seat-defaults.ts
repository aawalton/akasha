
import { existsSync } from "node:fs"
import { join } from "node:path"
import { SEAT_COMMAND_REL } from "../aw/init/state-seat.ts"
import { attributesOf, recordedModeOf } from "./attributes.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots"
import { onCallOf } from "./seat-on-call.ts"
import { defaultSlots } from "./seat-resolve.ts"

export type SeatMode = "interactive" | "headless"

export const AGENT_MODE_INTERACTIVE: SeatMode = "interactive"

export const AGENT_MODE_HEADLESS: SeatMode = "headless"

export interface SeatCall {
  readonly agent?: string | null
  readonly persona?: string | null
  readonly domain?: string | null
  readonly role?: string | null
  readonly project?: number | string | null
  readonly flex?: string | null
  readonly principal?: string | null
  readonly mode?: string | null
  readonly resolve?: boolean
  readonly name?: boolean
  readonly show?: boolean
  readonly default?: boolean
  readonly fromSeat?: boolean
  readonly onCall?: boolean
  readonly initiative?: string | readonly string[] | null
  readonly clear?: readonly string[] | null
  readonly token?: readonly string[] | null
}

export interface SeatCallOutcome {
  readonly code: number
  readonly stdout: string
  readonly stderr: string
}

export function seatCallIn(root: string): string | null {
  const at = join(root, SEAT_COMMAND_REL)
  return existsSync(at) ? at : null
}

function seatCallPayload(call: SeatCall): string {
  const stated: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(call)) {
    if (value === undefined || value === null) continue
    stated[key] = value
  }
  return JSON.stringify(stated)
}

export async function callSeatAt(entry: string, call: SeatCall): Promise<SeatCallOutcome> {
  const proc = Bun.spawn({
    cmd: [process.execPath, entry],
    stdin: new TextEncoder().encode(seatCallPayload(call)),
    stdout: "pipe",
    stderr: "pipe",
  })
  const [stdout, stderr, code] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ])
  return { code, stdout, stderr }
}

export function parseDefaultLines(stdout: string): Readonly<Record<string, string>> {
  const defaults: Record<string, string> = {}
  for (const line of stdout.split("\n")) {
    const at = line.indexOf("=")
    if (at <= 0) continue
    const slug = line.slice(at + 1).trim()
    if (slug !== "") defaults[line.slice(0, at).trim()] = slug
  }
  return defaults
}

export async function declaredDefaults(): Promise<Readonly<Record<string, string>>> {
  const entry = seatCallIn(rootFor(resolveRoots(), AKASHA))
  if (entry === null) return {}
  const outcome = await callSeatAt(entry, { resolve: true, default: true })
  if (outcome.code !== 0) return {}
  return parseDefaultLines(outcome.stdout)
}

export function defaultSeatCall(agentId: string, mode: SeatMode): SeatCall {
  return { agent: agentId, mode, default: true, onCall: mode === "interactive" }
}

export function seatDefaultsStand(agentId: string, mode: SeatMode): boolean {
  if (mode !== AGENT_MODE_INTERACTIVE) return false
  if (!onCallOf(agentId)) return false
  if (recordedModeOf(agentId) === null) return false
  const held = attributesOf(agentId)
  return defaultSlots(rootFor(resolveRoots(), AKASHA)).every((slot) => held[slot] !== undefined)
}

export async function stateSeatDefaults(opts: {
  readonly agentId: string
  readonly mode: SeatMode
}): Promise<void> {
  if (seatDefaultsStand(opts.agentId, opts.mode)) return
  const entry = seatCallIn(rootFor(resolveRoots(), AKASHA))
  if (entry === null) return
  try {
    await callSeatAt(entry, defaultSeatCall(opts.agentId, opts.mode))
  } catch {
  }
}
