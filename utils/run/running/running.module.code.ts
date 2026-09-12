import {
  accessSync,
  constants,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmdirSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"
import { pidAliveOrAssumeAlive } from "akasha/utils/process/pid-signal/pid-signal.module.code.ts"
import {
  parseServingMarker,
  relayed,
  relayOpened,
  SERVING_MARKER,
} from "akasha/utils/run/run-relaying/run-relaying.module.code.ts"

export const NO_CODE = -1

const MICROS = 1_000_000

const MOUNT = "/sys/fs/cgroup"

const OWN = "/proc/self/cgroup"

const CONTROL = "cgroup.subtree_control"

const PROCS = "cgroup.procs"

const CPU = "cpu"

const MEMORY = "memory"

const STAT = "cpu.stat"

const PEAK = "memory.peak"

const HIGH = "memory.high"

const MEGA = 1_048_576

const USAGE = "usage_usec "

const POLL = 50

const SWEEPS = 20

const MADE = "akasha-"

const RUN = "run"

const TURN_ON = "+cpu +memory"

const APART = "-"

const DIGITS = /^\d+$/

function holding(at: string): boolean {
  try {
    accessSync(at, constants.W_OK)
    const held = readFileSync(join(at, CONTROL), "utf8").split(/\s+/)
    return held.includes(CPU) && held.includes(MEMORY)
  } catch {
    return false
  }
}

export function delegatedAt(own: string): string | null {
  let at = dirname(join(MOUNT, own))
  while (at.startsWith(MOUNT) && at !== MOUNT) {
    if (holding(at)) return at
    at = dirname(at)
  }
  return holding(MOUNT) ? MOUNT : null
}

export function madePid(named: string): number | null {
  if (!named.startsWith(MADE)) return null
  const rest = named.slice(MADE.length)
  const apart = rest.indexOf(APART)
  const digits = apart < 0 ? "" : rest.slice(0, apart)
  return DIGITS.test(digits) ? Number(digits) : null
}

function leftSwept(parent: string): undefined {
  let held: readonly string[] = []
  try {
    held = readdirSync(parent)
  } catch {
    return
  }
  for (const one of held) {
    const pid = madePid(one)
    if (pid === null || pidAliveOrAssumeAlive(pid)) continue
    try {
      rmdirSync(join(parent, one, RUN))
    } catch {}
    try {
      rmdirSync(join(parent, one))
    } catch {}
  }
}

function budgetAt(): string | null {
  let text = ""
  try {
    text = readFileSync(OWN, "utf8")
  } catch {
    return null
  }
  const own = text.trim().split("\n")[0]?.split(":").at(-1)
  if (own === undefined) return null
  const parent = delegatedAt(own)
  if (parent === null) return null
  leftSwept(parent)
  const at = join(parent, `${MADE}${String(process.pid)}${APART}${String(Bun.nanoseconds())}`)
  try {
    mkdirSync(at)
    writeFileSync(join(at, CONTROL), TURN_ON)
    mkdirSync(join(at, RUN))
    return at
  } catch {
    swept(at)
    return null
  }
}

function watching(at: string, ceiling: number): string {
  const cap = String(Math.round(ceiling * MICROS))
  return (
    `const fs = require("node:fs")\n` +
    `const at = ${JSON.stringify(at)}\n` +
    `for (;;) {\n` +
    `  let spent = 0\n` +
    `  try {\n` +
    `    for (const line of fs.readFileSync(at + "/${STAT}", "utf8").split("\\n"))\n` +
    `      if (line.startsWith(${JSON.stringify(USAGE)}))\n` +
    `        spent = Number(line.slice(${String(USAGE.length)}))\n` +
    `  } catch { break }\n` +
    `  if (spent > ${cap}) {\n` +
    `    try { fs.writeFileSync(at + "/cgroup.kill", "1") } catch {}\n` +
    `    break\n` +
    `  }\n` +
    `  Bun.sleepSync(${String(POLL)})\n` +
    `}\n`
  )
}

function joined(at: string, argv: readonly string[], found: string): readonly string[] {
  return ["sh", "-c", `echo $$ > ${join(at, RUN, PROCS)}; exec "$@"`, "sh", found, ...argv.slice(1)]
}

function foundFor(argv: readonly string[], asked: Asked): string | null {
  const first = argv[0]
  if (first === undefined) return null
  return Bun.which(first, asked.cwd === undefined ? {} : { cwd: asked.cwd })
}

function spentAt(at: string): number | null {
  let text = ""
  try {
    text = readFileSync(join(at, STAT), "utf8")
  } catch {
    return null
  }
  for (const line of text.split("\n"))
    if (line.startsWith(USAGE)) return Number(line.slice(USAGE.length)) / MICROS
  return null
}

function throttled(at: string, megabytes: number): undefined {
  try {
    writeFileSync(join(at, HIGH), String(Math.round(megabytes * MEGA)))
  } catch {}
}

function peakAt(at: string): number | null {
  let text = ""
  try {
    text = readFileSync(join(at, PEAK), "utf8")
  } catch {
    return null
  }
  const held = Number(text.trim())
  return Number.isFinite(held) ? held : null
}

function swept(at: string): undefined {
  for (let held = 0; held < SWEEPS; held += 1) {
    try {
      rmdirSync(join(at, RUN))
    } catch {}
    try {
      rmdirSync(at)
      return
    } catch {
      Bun.sleepSync(POLL)
    }
  }
}

export type Said = {
  readonly code: number
  readonly signal: string | null
  readonly out: string
  readonly err: string
  readonly cpuSeconds: number
  readonly peakBytes: number
  readonly peakMeasured: boolean
}

export type Held = {
  readonly code: number
  readonly signal: string | null
  readonly out: Uint8Array
  readonly err: string
  readonly cpuSeconds: number
  readonly peakBytes: number
  readonly peakMeasured: boolean
}

export type Asked = {
  readonly cwd?: string
  readonly env?: Record<string, string | undefined>
  readonly stdin?: Uint8Array
  readonly timeout?: number
  readonly cpuCeiling?: number
  readonly memoryCeiling?: number
}

export function spawnedHere(argv: readonly string[], asked: Asked = {}): Held {
  const ceiling = asked.cpuCeiling
  const held = asked.memoryCeiling
  const found = foundFor(argv, asked)
  const at = found === null ? null : budgetAt()
  if (at !== null && held !== undefined) throttled(at, held)
  const watch =
    at === null || ceiling === undefined
      ? null
      : Bun.spawn(["bun", "-e", watching(at, ceiling)], { stdout: "ignore", stderr: "ignore" })
  try {
    const named = at === null || found === null ? argv : joined(at, argv, found)
    const done = Bun.spawnSync([...named], {
      stdout: "pipe",
      stderr: "pipe",
      ...(asked.cwd === undefined ? {} : { cwd: asked.cwd }),
      ...(asked.env === undefined ? {} : { env: asked.env }),
      ...(asked.stdin === undefined ? {} : { stdin: asked.stdin }),
      ...(asked.timeout === undefined ? {} : { timeout: asked.timeout }),
    })
    const group = at === null ? null : spentAt(at)
    const peak = at === null ? null : peakAt(at)
    return {
      code: done.exitCode ?? NO_CODE,
      signal: done.signalCode ?? null,
      out: new Uint8Array(done.stdout),
      err: done.stderr.toString(),
      cpuSeconds: group ?? Number(done.resourceUsage?.cpuTime.total ?? 0n) / MICROS,
      peakBytes: peak ?? 0,
      peakMeasured: peak !== null,
    }
  } finally {
    watch?.kill()
    if (at !== null) swept(at)
  }
}

const TOLL = 0.002

let relaying = false

let measured = false

export function bytes(argv: readonly string[], asked: Asked = {}): Held {
  if (relaying) {
    if (relayOpened()) return relayed(argv, asked)
    relaying = false
    return spawnedHere(argv, asked)
  }
  const done = spawnedHere(argv, asked)
  if (!measured && asked.cpuCeiling === undefined) {
    measured = true
    relaying = done.cpuSeconds > TOLL && !parseServingMarker(process.env[SERVING_MARKER])
  }
  return done
}

export function endingOf(code: number, signal: string | null): string {
  return signal === null ? `exited ${String(code)}` : `died on ${signal}`
}

export function ran(argv: readonly string[], asked: Asked = {}): Said {
  const done = bytes(argv, asked)
  return {
    code: done.code,
    signal: done.signal,
    out: new TextDecoder().decode(done.out),
    err: done.err,
    cpuSeconds: done.cpuSeconds,
    peakBytes: done.peakBytes,
    peakMeasured: done.peakMeasured,
  }
}

export function said(argv: readonly string[], asked: Asked = {}): string {
  const done = ran(argv, asked)
  if (done.code === 0) return done.out
  throw new Error(`\`${argv[0] ?? ""}\` ${endingOf(done.code, done.signal)} — ${done.err.trim()}`)
}

export function shown(argv: readonly string[], asked: Asked = {}): undefined {
  const done = Bun.spawnSync([...argv], {
    stdout: "inherit",
    stderr: "inherit",
    ...(asked.cwd === undefined ? {} : { cwd: asked.cwd }),
    ...(asked.env === undefined ? {} : { env: asked.env }),
    ...(asked.stdin === undefined ? {} : { stdin: asked.stdin }),
    ...(asked.timeout === undefined ? {} : { timeout: asked.timeout }),
  })
  const code = done.exitCode ?? NO_CODE
  if (code !== 0) throw new Error(`\`${argv[0] ?? ""}\` ${endingOf(code, done.signalCode ?? null)}`)
}
