import {
  envScrubArgv,
  launchModeFlags,
  scopeArgv,
  serverOptionArgv,
  supervisorEntryArgv,
} from "./tmux-launch-recipe.ts"
import { SEAT_MODE_HEADLESS } from "./seat-modes.ts"
import { resolve } from "node:path"
import { akashaRoot } from "../../repo/roots/roots.ts"

const TMUX_CALL_CEILING_MS = 10_000

const EARLY_EXIT_PROBE_MS = 200

export interface LaunchSeatOpts {
  readonly name: string
  readonly agentId: string
  readonly account: string
  readonly prompt: string
  readonly mode: string
  readonly resumeSessionId?: string
  readonly modelOverride?: string
  readonly anthropicBaseUrl?: string
  readonly anthropicAuthToken?: string
}

export interface LaunchSeatResult {
  readonly pid: number
}

export interface TmuxCall {
  readonly code: number
  readonly out: string
  readonly err: string
}

export { akashaRoot }

export function seatStartDir(): string {
  return resolve(akashaRoot(), "..")
}

export function buildSupervisorCmd(root: string, opts: LaunchSeatOpts): readonly string[] {
  const overrides = [
    ...(opts.modelOverride != null ? ["--model", opts.modelOverride] : []),
    ...(opts.anthropicBaseUrl != null ? ["--anthropic-base-url", opts.anthropicBaseUrl] : []),
    ...(opts.anthropicAuthToken != null ? ["--anthropic-auth-token", opts.anthropicAuthToken] : []),
  ]
  const resume =
    opts.resumeSessionId != null ? ["--session-id", opts.resumeSessionId, "--resume"] : []
  return [
    ...supervisorEntryArgv(root),
    ...launchModeFlags(opts.mode === SEAT_MODE_HEADLESS),
    "--agent-id",
    opts.agentId,
    "-a",
    opts.account,
    ...overrides,
    ...resume,
    ...(opts.prompt !== "" ? [opts.prompt] : []),
  ]
}

export function buildNewSessionArgs(opts: LaunchSeatOpts, cmd: readonly string[]): readonly string[] {
  return [
    "new-session",
    "-d",
    "-s",
    opts.name,
    "-c",
    seatStartDir(),
    "--",
    ...envScrubArgv(),
    `AGENT_ID=${opts.agentId}`,
    ...cmd,
  ]
}

export function buildLaunchCmd(
  newSession: readonly string[],
  scopeUnit: string | null
): readonly string[] {
  if (scopeUnit === null) return ["tmux", ...newSession]
  return [...scopeArgv(scopeUnit), "tmux", ...serverOptionArgv(), ...newSession]
}

async function runBounded(cmd: readonly string[]): Promise<TmuxCall> {
  const proc = Bun.spawn({ cmd: [...cmd], stdout: "pipe", stderr: "pipe", env: process.env })
  const timer = setTimeout(() => {
    try {
      proc.kill(9)
    } catch {
    }
  }, TMUX_CALL_CEILING_MS)
  try {
    const [out, err, code] = await Promise.all([
      new Response(proc.stdout).text(),
      new Response(proc.stderr).text(),
      proc.exited,
    ])
    return { code, out: out.trim(), err: err.trim() }
  } finally {
    clearTimeout(timer)
  }
}

async function tmux(args: readonly string[]): Promise<TmuxCall> {
  return runBounded(["tmux", ...args])
}

export async function sessionHolds(name: string): Promise<boolean> {
  return (await tmux(["has-session", "-t", `=${name}`])).code === 0
}

async function serverIsUp(): Promise<boolean> {
  return (await tmux(["list-sessions"])).code === 0
}

const INTERRUPTS = 2

const INTERRUPT_SETTLE_MS = 1_500

function shellQuoted(argv: readonly string[]): string {
  return argv.map((one) => `'${one.replaceAll("'", "'\\''")}'`).join(" ")
}

async function paneOf(name: string): Promise<string | null> {
  const listed = await tmux(["list-panes", "-t", `=${name}`, "-F", "#{pane_id}"])
  if (listed.code !== 0) return null
  const first = listed.out.split("\n")[0] ?? ""
  return first === "" ? null : first
}

/**
 * Restarts a seat's supervisor inside the session it is already in.
 *
 * WHY NOT KILL THE SESSION. The supervisor is the pane's own process, so replacing it used to mean
 * killing the session and building a new one under the same name. Every client attached to the old
 * session loses it at that moment, and the seat comes back detached, somewhere other than the
 * terminal Alan was watching it in. `respawn-pane` replaces the pane's command in place: the
 * session, the window and the pane id all stand, and an attached client sees the old supervisor
 * stop and the new one start without moving.
 *
 * INTERRUPTED BEFORE IT IS REPLACED. A supervisor killed mid-turn leaves a transcript whose tool
 * call never resolved, and the next boot refuses to hydrate it — `No deferred tool marker found in
 * the resumed session`. `C-c` reaches the client rather than the supervisor and ends the turn, which
 * is what makes the session resumable. Measured: the pane's pid is unchanged by these interrupts.
 *
 * `remain-on-exit` IS TURNED ON FIRST, AND LEFT ON UNTIL THE BOOT HOLDS. A seat session is one
 * window holding one pane, so a command that exits on boot takes the pane, the window and the
 * session with it — the seat is destroyed by the act meant to cycle it. With this on, a failed boot
 * leaves a dead pane standing to be read and respawned over.
 *
 * Answers false where there is no session to respawn into, which is the caller's cue to launch one.
 */
export async function respawnSeatUnderTmux(opts: LaunchSeatOpts): Promise<boolean> {
  const name = opts.name
  if (!(await sessionHolds(name))) return false
  const pane = await paneOf(name)
  if (pane === null) return false

  await tmux(["set-option", "-t", `=${name}`, "remain-on-exit", "on"])
  for (let i = 0; i < INTERRUPTS; i += 1) {
    await tmux(["send-keys", "-t", pane, "C-c"])
    await Bun.sleep(INTERRUPT_SETTLE_MS)
  }

  const cmd = buildSupervisorCmd(akashaRoot(), opts)
  const line = shellQuoted([...envScrubArgv(), `AGENT_ID=${opts.agentId}`, ...cmd])
  const spawned = await tmux(["respawn-pane", "-k", "-t", pane, "-c", seatStartDir(), line])
  if (spawned.code !== 0) {
    throw new Error(
      `failed to respawn the supervisor for '${name}' (exit ${spawned.code}): ` +
        `${spawned.err || spawned.out}`
    )
  }

  await Bun.sleep(EARLY_EXIT_PROBE_MS)
  const dead = await tmux(["list-panes", "-t", `=${name}`, "-F", "#{pane_dead}"])
  if (dead.out.split("\n")[0] === "1") {
    throw new Error(
      `seat '${name}' exited immediately on boot, and its pane stands dead rather than taking the ` +
        `session with it — attach with \`tmux attach -t =${name}\` to read what it says`
    )
  }
  await tmux(["set-option", "-t", `=${name}`, "remain-on-exit", "off"])
  return true
}

export async function killSeatSession(name: string): Promise<boolean> {
  if (!(await sessionHolds(name))) return false
  await tmux(["kill-session", "-t", `=${name}`])
  return !(await sessionHolds(name))
}

export async function launchSeatUnderTmux(opts: LaunchSeatOpts): Promise<LaunchSeatResult> {
  const name = opts.name
  if (await sessionHolds(name)) {
    throw new Error(
      `refusing to launch '${name}': a live tmux session already holds that name. Two seats ` +
        `under one session name are one taking the other's work. Attach with \`tmux attach -t ` +
        `=${name}\` to see what is there, or kill it first.`
    )
  }

  const scopeUnit = (await serverIsUp()) ? null : `tmux-seat-${name}-${Date.now()}`
  const cmd = buildSupervisorCmd(akashaRoot(), opts)
  const launch = buildLaunchCmd(buildNewSessionArgs(opts, cmd), scopeUnit)

  const started = await runBounded(launch)
  if (started.code !== 0) {
    throw new Error(
      `failed to start tmux session '${name}' (exit ${started.code}): ${started.err || started.out}`
    )
  }

  await tmux(["set-option", "-t", name, "remain-on-exit", "off"])

  const pane = await tmux(["display-message", "-p", "-t", name, "#{pane_pid}"])
  const pid = Number.parseInt(pane.out, 10)
  if (!Number.isSafeInteger(pid) || pid <= 0) {
    throw new Error(
      `tmux session '${name}' started but reported no pane pid ('${pane.out}'), so nothing ` +
        "could be recorded for the liveness scan to read."
    )
  }

  await Bun.sleep(EARLY_EXIT_PROBE_MS)
  if (!(await sessionHolds(name))) {
    throw new Error(
      `seat '${name}' exited immediately on boot — attach with \`tmux attach -t =${name}\` ` +
        "while it is up to see what it says"
    )
  }

  return { pid }
}
