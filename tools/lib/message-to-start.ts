import { type ChildProcess, spawn } from "node:child_process"
import { writeFile } from "node:fs/promises"
import type { Readable } from "node:stream"
import {
  type Recipient,
  type SeatRow,
  type Stated,
  decideRecipient,
  names,
  seatsStating,
} from "./message-to.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"
import { handlerDerives } from "./seat-answering.ts"
import { SEAT_MODE_HEADLESS } from "./seat-modes.ts"
import { REPO_ROOT } from "./supervisor-config.ts"

const PATIENCE_MS = 120_000

const OPS_BIN = "dotfiles/bin"

function reachingOps(
  env: Record<string, string | undefined>
): Record<string, string | undefined> {
  const dir = `${rootFor(resolveRoots(), AKASHA)}/${OPS_BIN}`
  const path = env.PATH ?? ""
  return path.split(":").includes(dir) ? env : { ...env, PATH: `${dir}:${path}` }
}

export interface Ran {
  readonly code: number
  readonly stdout: string
  readonly stderr: string
}

function textOf(stream: Readable | null): Promise<string> {
  if (stream === null) return Promise.resolve("")
  return new Promise((resolve) => {
    let held = ""
    stream.setEncoding("utf8")
    stream.on("data", (chunk: string) => {
      held += chunk
    })
    stream.on("end", () => resolve(held))
    stream.on("error", () => resolve(held))
  })
}

function exitOf(proc: ChildProcess): Promise<number> {
  return new Promise((resolve) => {
    proc.on("close", (code) => resolve(code ?? -1))
    proc.on("error", () => resolve(-1))
  })
}

async function run(
  argv: readonly string[],
  env: Record<string, string | undefined> = process.env
): Promise<Ran> {
  const [command, ...rest] = argv
  const proc = spawn(command ?? "", rest, {
    cwd: REPO_ROOT,
    stdio: ["ignore", "pipe", "pipe"],
    env: reachingOps(env),
  })
  const collect = Promise.all([textOf(proc.stdout), textOf(proc.stderr), exitOf(proc)])
  const settled = await Promise.race([
    collect,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), PATIENCE_MS)),
  ])
  if (settled === null) {
    proc.kill()
    void collect.catch(() => {})
    return { code: -1, stdout: "", stderr: `no answer inside ${PATIENCE_MS}ms` }
  }
  const [stdout, stderr, code] = settled
  return { code, stdout, stderr }
}

export function bootPromptFor(domain: string, role: string): string {
  return (
    `You have been started to answer for the \`${domain}\` domain as its \`${role}\`. ` +
    "A message addressed to that domain and role is waiting in your mailbox, and is the whole " +
    "reason you are running. Read it with `ops seat inbox` and act on what it asks."
  )
}

export type Started =
  | { readonly kind: "started"; readonly id: string }
  | { readonly kind: "refuse"; readonly reason: string }

export interface StartedSeat {
  readonly id: string
  readonly name: string
}

export function readStartedSeat(stdout: string): StartedSeat | null {
  for (const line of stdout.split("\n")) {
    const [id, name, startMode] = line.split("\t")
    if (startMode?.trim() !== SEAT_MODE_HEADLESS) continue
    const named = (id ?? "").trim()
    if (named === "") continue
    return { id: named, name: (name ?? "").trim() }
  }
  return null
}

export function answersToAPerson(domain: string, role: string): boolean {
  return handlerDerives(rootFor(resolveRoots(), AKASHA), role, domain).principal !== null
}

export async function startSeat(
  domain: string,
  role: string,
  senderAgentId: string | null
): Promise<Started> {
  if (senderAgentId === null && !answersToAPerson(domain, role)) {
    return {
      kind: "refuse",
      reason:
        `nothing live states domain '${domain}' and role '${role}', and the sender is no agent, so ` +
        "a seat started for it would answer to the fleet with nobody above it. Whatever needs this " +
        "work done states an agent it is done for, or the work waits for one.",
    }
  }
  const prompt = `/var/tmp/message-to-boot-${process.pid}-${Date.now()}.md`
  await writeFile(prompt, bootPromptFor(domain, role), "utf8")

  const ran = await run(
    [
      "ops",
      "seat",
      "start",
      "--start-mode",
      SEAT_MODE_HEADLESS,
      "--domain",
      domain,
      "--role",
      role,
      "--prompt-file",
      prompt,
    ],
    { ...process.env, AGENT_ID: senderAgentId ?? "" }
  )

  const started = ran.code === 0 ? readStartedSeat(ran.stdout) : null
  if (started === null) {
    const detail = (ran.stderr.trim() !== "" ? ran.stderr : ran.stdout).trim()
    return {
      kind: "refuse",
      reason:
        `nothing live states domain '${domain}' and role '${role}', and starting a seat for it ` +
        `failed (exit ${ran.code}): ${detail.slice(0, 400)}`,
    }
  }

  return { kind: "started", id: started.id }
}

export async function resumeSeat(agentId: string): Promise<Ran> {
  return await run(["ops", "seat", "resume", agentId, "--verify", "--json"])
}

const READBACK_MS = 15_000

const READBACK_STEP_MS = 250

async function readsBack(stated: Stated): Promise<Recipient> {
  const until = Date.now() + READBACK_MS
  for (;;) {
    const now = decideRecipient(stated, await seatsStating(stated, true))
    if (now.kind === "seat" || Date.now() >= until) return now
    await new Promise((resolve) => setTimeout(resolve, READBACK_STEP_MS))
  }
}

export type Reached =
  | { readonly kind: "seat"; readonly seat: SeatRow; readonly revive: boolean }
  | { readonly kind: "refuse"; readonly reason: string }

export async function reachSeat(
  stated: Stated,
  senderAgentId: string | null
): Promise<Reached> {
  const live = decideRecipient(stated, await seatsStating(stated, true))
  if (live.kind === "seat") return { kind: "seat", seat: live.seat, revive: false }

  const absent = decideRecipient(stated, await seatsStating(stated, false))
  if (absent.kind === "seat") return { kind: "seat", seat: absent.seat, revive: true }

  if (stated.kind !== "domain") {
    return {
      kind: "refuse",
      reason:
        `no seat has ever stated ${names(stated)}. A seat is dispatched onto a project by ` +
        "whoever holds it, carrying a task, so none is started from here.",
    }
  }

  const started = await startSeat(stated.domain, stated.role, senderAgentId)
  if (started.kind === "refuse") return started

  const now = await readsBack(stated)
  if (now.kind === "seat") return { kind: "seat", seat: now.seat, revive: false }

  return {
    kind: "refuse",
    reason:
      `a seat was started for ${names(stated)} and its row did not read back as stating the ` +
      `address inside ${READBACK_MS}ms, so there is nothing here to deliver to.`,
  }
}
