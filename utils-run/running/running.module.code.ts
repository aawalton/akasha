export const NO_CODE = -1

const MICROS = 1_000_000

const LIMIT = "prlimit"

function limited(argv: readonly string[], ceiling: number | undefined): readonly string[] {
  if (ceiling === undefined) return argv
  return [LIMIT, `--cpu=${String(Math.ceil(ceiling))}:`, "--", ...argv]
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

export function bytes(argv: readonly string[], asked: Asked = {}): Held {
  const done = Bun.spawnSync([...limited(argv, asked.cpuCeiling)], {
    stdout: "pipe",
    stderr: "pipe",
    ...(asked.cwd === undefined ? {} : { cwd: asked.cwd }),
    ...(asked.env === undefined ? {} : { env: asked.env }),
    ...(asked.stdin === undefined ? {} : { stdin: asked.stdin }),
    ...(asked.timeout === undefined ? {} : { timeout: asked.timeout }),
  })
  return {
    code: done.exitCode ?? NO_CODE,
    signal: done.signalCode ?? null,
    out: new Uint8Array(done.stdout),
    err: done.stderr.toString(),
    cpuSeconds: Number(done.resourceUsage?.cpuTime.total ?? 0n) / MICROS,
  }
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
