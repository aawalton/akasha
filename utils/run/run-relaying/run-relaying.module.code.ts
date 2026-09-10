import { dlopen, FFIType } from "bun:ffi"
import { closeSync, readSync, writeSync } from "node:fs"
import { resolveMappedLibc } from "../../process/libc-mapping/libc-mapping.module.code.ts"
import type { Asked, Held } from "../running/running.module.code.ts"

export const SERVING_MARKER = "AKASHA_RUN_SERVING"

const CLOEXEC = 0o2000000

const SIZES = 12

const LOST_CODE = -1

const SERVING = new URL("../run-serving/run-serving.module.code.ts", import.meta.url).pathname

const libc = dlopen(resolveMappedLibc(), {
  pipe2: { args: [FFIType.ptr, FFIType.i32], returns: FFIType.i32 },
}).symbols

export type Request = {
  readonly argv: readonly string[]
  readonly cwd?: string
  readonly envPairs?: readonly (readonly [string, string | null])[]
  readonly stdin: boolean
  readonly timeout?: number
  readonly cpuCeiling?: number
}

export type Answer = {
  readonly threw: string | null
  readonly code: number
  readonly signal: string | null
  readonly cpuSeconds: number
}

export type Frame = {
  readonly head: unknown
  readonly first: Uint8Array
  readonly second: Uint8Array
}

export function piped(): readonly [number, number] {
  const pair = new Int32Array(2)
  const made = libc.pipe2(pair, CLOEXEC)
  if (made !== 0) throw new Error(`pipe2 answered ${String(made)} rather than a pair of ends`)
  return [pair[0] ?? LOST_CODE, pair[1] ?? LOST_CODE]
}

export function framed(head: unknown, first: Uint8Array, second: Uint8Array): Uint8Array {
  const text = new TextEncoder().encode(JSON.stringify(head))
  const whole = new Uint8Array(SIZES + text.length + first.length + second.length)
  const sizes = new DataView(whole.buffer)
  sizes.setUint32(0, text.length)
  sizes.setUint32(4, first.length)
  sizes.setUint32(8, second.length)
  whole.set(text, SIZES)
  whole.set(first, SIZES + text.length)
  whole.set(second, SIZES + text.length + first.length)
  return whole
}

export function written(fd: number, whole: Uint8Array): undefined {
  let done = 0
  while (done < whole.length) done += writeSync(fd, whole, done, whole.length - done)
}

export function taken(fd: number, want: number): Uint8Array {
  const whole = new Uint8Array(want)
  let done = 0
  while (done < want) {
    const got = readSync(fd, whole, done, want - done, null)
    if (got <= 0) throw new Error(`the channel ended ${String(done)} bytes into ${String(want)}`)
    done += got
  }
  return whole
}

export function unframed(fd: number): Frame {
  const sizes = new DataView(taken(fd, SIZES).buffer)
  const head = taken(fd, sizes.getUint32(0))
  return {
    head: JSON.parse(new TextDecoder().decode(head)),
    first: taken(fd, sizes.getUint32(4)),
    second: taken(fd, sizes.getUint32(8)),
  }
}

export function requested(argv: readonly string[], asked: Asked): Request {
  const env = asked.env
  return {
    argv: [...argv],
    ...(asked.cwd === undefined ? {} : { cwd: asked.cwd }),
    ...(env === undefined
      ? {}
      : { envPairs: Object.entries(env).map(([name, value]) => [name, value ?? null] as const) }),
    stdin: asked.stdin !== undefined,
    ...(asked.timeout === undefined ? {} : { timeout: asked.timeout }),
    ...(asked.cpuCeiling === undefined ? {} : { cpuCeiling: asked.cpuCeiling }),
  }
}

export function askedOf(head: Request, stdin: Uint8Array): Asked {
  const pairs = head.envPairs
  return {
    ...(head.cwd === undefined ? {} : { cwd: head.cwd }),
    ...(pairs === undefined
      ? {}
      : { env: Object.fromEntries(pairs.map(([name, v]) => [name, v === null ? undefined : v])) }),
    ...(head.stdin ? { stdin } : {}),
    ...(head.timeout === undefined ? {} : { timeout: head.timeout }),
    ...(head.cpuCeiling === undefined ? {} : { cpuCeiling: head.cpuCeiling }),
  }
}

type Channel = {
  readonly toward: number
  readonly back: number
  readonly ender: () => void
}

let channel: Channel | null = null

let spent = 0

export function spentRelaying(): number {
  return spent
}

function started(): Channel {
  if (process.env[SERVING_MARKER] !== undefined) {
    throw new Error(`a process under ${SERVING_MARKER} starts no server of its own`)
  }
  const [askRead, askWrite] = piped()
  const [sayRead, sayWrite] = piped()
  const source = `const served = await import(${JSON.stringify(SERVING)}); served.serving()`
  const server = Bun.spawn(["bun", "-e", source], {
    stdin: askRead,
    stdout: sayWrite,
    stderr: "inherit",
    env: { ...process.env, [SERVING_MARKER]: "1" },
  })
  server.unref()
  closeSync(askRead)
  closeSync(sayWrite)
  return { toward: askWrite, back: sayRead, ender: () => server.kill() }
}

function forgotten(was: Channel): undefined {
  channel = null
  try {
    closeSync(was.toward)
  } catch {}
  try {
    closeSync(was.back)
  } catch {}
  was.ender()
}

function lostOn(raised: unknown): Held {
  return {
    code: LOST_CODE,
    signal: null,
    out: new Uint8Array(),
    err: `runner channel lost: ${raised instanceof Error ? raised.message : String(raised)}`,
    cpuSeconds: 0,
  }
}

export function relayed(argv: readonly string[], asked: Asked = {}): Held {
  channel ??= started()
  const open = channel
  let answered: Frame
  try {
    const stdin = asked.stdin ?? new Uint8Array()
    written(open.toward, framed(requested(argv, asked), stdin, new Uint8Array()))
    answered = unframed(open.back)
  } catch (raised) {
    forgotten(open)
    return lostOn(raised)
  }
  const said = answered.head as Answer
  spent += said.cpuSeconds
  if (said.threw !== null) throw new Error(said.threw)
  return {
    code: said.code,
    signal: said.signal,
    out: answered.first,
    err: new TextDecoder().decode(answered.second),
    cpuSeconds: said.cpuSeconds,
  }
}
