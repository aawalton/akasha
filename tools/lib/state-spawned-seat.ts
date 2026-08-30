import { ASSIGNMENTS, ATTRIBUTES } from "./attributes.ts"
import { akashaRoot } from "../../repo/roots/roots.ts"

const SEAT_CALL_CEILING_MS = 20_000

export interface SeatStatement {
  readonly agentId: string
  readonly mode: string
  readonly principal: string | null
  readonly persona?: string
  readonly domain?: string
  readonly role?: string
  readonly flex?: string | null
  readonly initiative?: string | null
  readonly onCall?: boolean
  readonly parentName?: string | null
  readonly account?: string | null
}

async function callSeat(payload: Record<string, unknown>): Promise<string | null> {
  let proc: ReturnType<typeof Bun.spawn>
  try {
    proc = Bun.spawn({
      cmd: ["bun", `${akashaRoot()}/tools/seat-call.ts`],
      stdin: new TextEncoder().encode(JSON.stringify(payload)),
      stdout: "pipe",
      stderr: "pipe",
      env: process.env,
    })
  } catch (err) {
    return `the seat command could not be run: ${String(err)}`
  }
  const timer = setTimeout(() => {
    try {
      proc.kill(9)
    } catch {
    }
  }, SEAT_CALL_CEILING_MS)
  try {
    const code = await proc.exited
    if (code === 0) return null
    const said =
      proc.stderr instanceof ReadableStream ? (await new Response(proc.stderr).text()).trim() : ""
    return said === "" ? `the seat command exited ${code}` : said
  } catch (err) {
    return `the seat command failed: ${String(err)}`
  } finally {
    clearTimeout(timer)
  }
}

function said(value: string | number | null | undefined): string | number | null {
  return value === undefined || value === "" ? null : value
}

export async function stateSpawnedSeat(statement: SeatStatement): Promise<readonly string[]> {
  const payload: Record<string, unknown> = {
    agent: statement.agentId,
    mode: statement.mode,
    principal: statement.principal,
    flex: said(statement.flex),
    initiative: said(statement.initiative),
    ...(statement.onCall === true ? { onCall: true } : {}),
    parentName: said(statement.parentName),
    account: said(statement.account),
  }
  const held = statement as unknown as Readonly<Record<string, unknown>>
  for (const key of [...ATTRIBUTES, ...ASSIGNMENTS]) {
    if (key in payload) continue
    const slug = held[key]
    if (typeof slug !== "string" || slug === "") continue
    payload[key] = slug
  }
  const refused = await callSeat(payload)
  return refused === null ? [] : [refused]
}
