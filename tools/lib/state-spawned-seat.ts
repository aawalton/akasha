import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import {
  ASSIGNMENTS,
  ATTRIBUTES,
} from "../../akasha/seat-system/seat-attributes/seat-attributes.module.code.ts"
import { seatWhoami } from "./seat-whoami.ts"

// A SEAT'S FIRST WRITE GOES THROUGH THE WHOLE CHECK SUITE. Every seat that has never stood before
// writes a path akasha has not judged, and judging one takes as long as the repository is large:
// ember's took 57 seconds on the day this was raised, against a ceiling of 20. The ceiling is here
// to bound a hang, not to bound a write, so it stands well past any write measured rather than
// just past the last one.
const SEAT_CALL_CEILING_MS = 300_000

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

// THE SEAT CALL SHELLS OUT TO `akasha write`, SO STOPPING IT MEANS STOPPING THAT TOO. Signalling
// the spawned process alone leaves the write it is waiting on running, and an orphaned write
// commits after this call has already reported that nothing was stated — ember's landed 37 seconds
// after the caller gave up on it. `detached` makes the child lead its own group so one signal
// reaches everything it started.
function endGroup(proc: ReturnType<typeof Bun.spawn>): void {
  try {
    process.kill(-proc.pid, "SIGKILL")
    return
  } catch {}
  try {
    proc.kill(9)
  } catch {}
}

async function callSeat(payload: Record<string, unknown>, agentId: string): Promise<string | null> {
  let proc: ReturnType<typeof Bun.spawn>
  try {
    proc = Bun.spawn({
      cmd: ["bun", `${akashaRoot()}/tools/seat-call.ts`],
      stdin: new TextEncoder().encode(JSON.stringify(payload)),
      stdout: "pipe",
      stderr: "pipe",
      env: process.env,
      detached: true,
    })
  } catch (err) {
    return `the seat command could not be run: ${String(err)}`
  }
  let stopped = false
  const timer = setTimeout(() => {
    stopped = true
    endGroup(proc)
  }, SEAT_CALL_CEILING_MS)
  try {
    const code = await proc.exited
    if (code === 0) return null
    const said =
      proc.stderr instanceof ReadableStream ? (await new Response(proc.stderr).text()).trim() : ""
    // WHETHER A PAGE STANDS IS READ RATHER THAN INFERRED FROM THE EXIT CODE. A stopped call says
    // nothing about what it wrote before it was stopped, and the caller turns this answer into the
    // sentence "no page stands for this seat", which is a claim about the tree.
    if (stopped) {
      if (seatWhoami(agentId) !== null) return null
      return (
        `the seat command was stopped after ${SEAT_CALL_CEILING_MS / 1000}s and no seat page ` +
        `stands for ${agentId}`
      )
    }
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
  const refused = await callSeat(payload, statement.agentId)
  return refused === null ? [] : [refused]
}
