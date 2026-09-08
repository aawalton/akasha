import { accessSync, constants, mkdirSync, readFileSync, rmdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { relayed, SERVING_MARKER } from "../run-relaying/run-relaying.module.code.ts"

export const NO_CODE = -1

const MICROS = 1_000_000

const MOUNT = "/sys/fs/cgroup"

const OWN = "/proc/self/cgroup"

const CONTROL = "cgroup.subtree_control"

const PROCS = "cgroup.procs"

const CPU = "cpu"

const STAT = "cpu.stat"

const USAGE = "usage_usec "

const POLL = 50

const SWEEPS = 20

function holding(at: string): boolean {
  try {
    accessSync(at, constants.W_OK)
    return readFileSync(join(at, CONTROL), "utf8").split(/\s+/).includes(CPU)
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
  const at = join(parent, `akasha-${String(process.pid)}-${String(Bun.nanoseconds())}`)
  try {
    mkdirSync(at)
    return at
  } catch {
    return null
  }
}

export function watching(at: string, ceiling: number): string {
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

function joined(at: string, argv: readonly string[]): readonly string[] {
  return ["sh", "-c", `echo $$ > ${join(at, PROCS)}; exec "$@"`, "sh", ...argv]
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

function swept(at: string): undefined {
  for (let held = 0; held < SWEEPS; held += 1) {
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
}

export type Held = {
  readonly code: number
  readonly signal: string | null
  readonly out: Uint8Array
  readonly err: string
  readonly cpuSeconds: number
}

export type Asked = {
  readonly cwd?: string
  readonly env?: Record<string, string | undefined>
  readonly stdin?: Uint8Array
  readonly timeout?: number
  readonly cpuCeiling?: number
}

export function spawnedHere(argv: readonly string[], asked: Asked = {}): Held {
  const ceiling = asked.cpuCeiling
  const at = ceiling === undefined ? null : budgetAt()
  const watch =
    at === null || ceiling === undefined
      ? null
      : Bun.spawn(["bun", "-e", watching(at, ceiling)], { stdout: "ignore", stderr: "ignore" })
  try {
    const done = Bun.spawnSync([...(at === null ? argv : joined(at, argv))], {
      stdout: "pipe",
      stderr: "pipe",
      ...(asked.cwd === undefined ? {} : { cwd: asked.cwd }),
      ...(asked.env === undefined ? {} : { env: asked.env }),
      ...(asked.stdin === undefined ? {} : { stdin: asked.stdin }),
      ...(asked.timeout === undefined ? {} : { timeout: asked.timeout }),
    })
    const group = at === null ? null : spentAt(at)
    return {
      code: done.exitCode ?? NO_CODE,
      signal: done.signalCode ?? null,
      out: new Uint8Array(done.stdout),
      err: done.stderr.toString(),
      cpuSeconds: group ?? Number(done.resourceUsage?.cpuTime.total ?? 0n) / MICROS,
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
    try {
      return relayed(argv, asked)
    } catch {
      relaying = false
      return spawnedHere(argv, asked)
    }
  }
  const done = spawnedHere(argv, asked)
  if (!measured && asked.cpuCeiling === undefined) {
    measured = true
    relaying = done.cpuSeconds > TOLL && process.env[SERVING_MARKER] === undefined
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
