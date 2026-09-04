export const NO_CODE = -1

export type Said = {
  readonly code: number
  readonly out: string
  readonly err: string
}

export type Held = {
  readonly code: number
  readonly out: Uint8Array
  readonly err: string
}

export type Asked = {
  readonly cwd?: string
  readonly env?: Record<string, string | undefined>
  readonly stdin?: Uint8Array
  readonly timeout?: number
}

export function bytes(argv: readonly string[], asked: Asked = {}): Held {
  const done = Bun.spawnSync([...argv], {
    stdout: "pipe",
    stderr: "pipe",
    ...(asked.cwd === undefined ? {} : { cwd: asked.cwd }),
    ...(asked.env === undefined ? {} : { env: asked.env }),
    ...(asked.stdin === undefined ? {} : { stdin: asked.stdin }),
    ...(asked.timeout === undefined ? {} : { timeout: asked.timeout }),
  })
  return {
    code: done.exitCode ?? NO_CODE,
    out: new Uint8Array(done.stdout),
    err: done.stderr.toString(),
  }
}

export function ran(argv: readonly string[], asked: Asked = {}): Said {
  const done = bytes(argv, asked)
  return { code: done.code, out: new TextDecoder().decode(done.out), err: done.err }
}

export function said(argv: readonly string[], asked: Asked = {}): string {
  const done = ran(argv, asked)
  if (done.code === 0) return done.out
  throw new Error(`\`${argv[0] ?? ""}\` exited ${String(done.code)} — ${done.err.trim()}`)
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
  if (code !== 0) throw new Error(`\`${argv[0] ?? ""}\` exited ${String(code)}`)
}
