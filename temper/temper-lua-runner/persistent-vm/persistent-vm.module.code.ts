import { resolve } from "node:path"
import {
  DONE_SENTINEL,
  normalizeValue,
  type Response,
  RUN_SENTINEL,
  responseSchema,
} from "../lua-protocol/lua-protocol.module.code.ts"

const DRIVER_PATH = resolve(import.meta.dir, "../lua-driver/lua-driver.lua-module.lua.lua")

const DEFAULT_BIN_PATH = "lua5.1"

const DEFAULT_HANDSHAKE_RETRIES = 2

const DEFAULT_HANDSHAKE_TIMEOUT_MS = 2000

const STDERR_CAPTURE_BYTES = 4096

const DIAGNOSE_WAIT_MS = 200

export type PersistentVm = {
  readonly send: (script: string) => Promise<Response>
  readonly close: () => Promise<void>
}

export type SpawnPersistentVmOptions = {
  readonly binPath?: string
  readonly driverPath?: string
  readonly handshakeRetries?: number
  readonly handshakeTimeoutMs?: number
}

type CappedBuffer = {
  readonly append: (text: string) => undefined
  readonly read: () => string
}

function createCappedBuffer(maxBytes: number): CappedBuffer {
  const chunks: string[] = []
  let total = 0
  return {
    append(text: string): undefined {
      if (text.length === 0) return undefined
      chunks.push(text)
      total += text.length
      while (total > maxBytes && chunks.length > 1) {
        const head = chunks.shift()
        if (head !== undefined) total -= head.length
      }
      const only = chunks[0]
      if (total > maxBytes && chunks.length === 1 && only !== undefined) {
        chunks[0] = only.slice(-maxBytes)
        total = only.length
      }
      return undefined
    },
    read(): string {
      return chunks.join("").slice(-maxBytes)
    },
  }
}

async function drainStderr(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  decoder: TextDecoder,
  buffer: CappedBuffer
): Promise<void> {
  while (true) {
    try {
      const chunk = await reader.read()
      if (chunk.done) return
      buffer.append(decoder.decode(chunk.value, { stream: true }))
    } catch {
      return
    }
  }
}

type StartArgs = {
  readonly binPath: string
  readonly driverPath: string
  readonly attempt: number
  readonly timeoutMs: number
}

function spawnLua(binPath: string, driverPath: string, attempt: number) {
  try {
    return Bun.spawn([binPath, driverPath], { stdin: "pipe", stdout: "pipe", stderr: "pipe" })
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    throw new Error(
      `lua-runner: spawn failed (attempt=${attempt}, binPath=${binPath}, driverPath=${driverPath}): ${why}`
    )
  }
}

async function tryStartVm(args: StartArgs): Promise<PersistentVm> {
  const { binPath, driverPath, attempt, timeoutMs } = args
  const startTime = performance.now()
  const proc = spawnLua(binPath, driverPath, attempt)

  const pid = proc.pid
  const stderrBuffer = createCappedBuffer(STDERR_CAPTURE_BYTES)
  const stderrReader = proc.stderr.getReader()
  const stderrDrained = drainStderr(stderrReader, new TextDecoder(), stderrBuffer)

  const stdoutReader = proc.stdout.getReader()
  const decoder = new TextDecoder()
  const sentinelLine = `\n${DONE_SENTINEL}\n`
  let buffer = ""
  let closed = false
  let sendCount = 0

  async function readUntilSentinel(): Promise<string> {
    while (true) {
      const at = buffer.indexOf(sentinelLine)
      if (at >= 0) {
        const payload = buffer.slice(0, at)
        buffer = buffer.slice(at + sentinelLine.length)
        return payload
      }
      const { value, done } = await stdoutReader.read()
      if (done) throw new Error("lua5.1 subprocess closed stdout before answering")
      buffer += decoder.decode(value, { stream: true })
    }
  }

  async function diagnose(stage: string): Promise<string> {
    let exitCode: number | null = null
    try {
      const waited = await Promise.race([
        proc.exited,
        new Promise<null>((keep) => setTimeout(() => keep(null), DIAGNOSE_WAIT_MS)),
      ])
      exitCode = typeof waited === "number" ? waited : null
    } catch {
      exitCode = null
    }
    try {
      await Promise.race([stderrDrained, new Promise((keep) => setTimeout(keep, DIAGNOSE_WAIT_MS))])
    } catch {}
    const stderr = stderrBuffer.read()
    const ms = Math.round(performance.now() - startTime)
    return [
      `lua-runner: ${stage}`,
      `pid=${pid}`,
      `attempt=${attempt}`,
      `binPath=${binPath}`,
      `driverPath=${driverPath}`,
      `exitCode=${String(exitCode)}`,
      `msSinceSpawn=${String(ms)}`,
      `sendCount=${String(sendCount)}`,
      `stderr=${stderr !== "" ? stderr : "(empty)"}`,
    ].join(" | ")
  }

  async function rawSend(script: string): Promise<Response> {
    sendCount += 1
    proc.stdin.write(`${script}\n${RUN_SENTINEL}\n`)
    proc.stdin.flush()
    const raw = await readUntilSentinel()
    const parsed: unknown = JSON.parse(raw)
    const answer = responseSchema.parse(parsed)
    if (answer.ok) return { ok: true, value: normalizeValue(answer.value) }
    return answer
  }

  async function killProc(): Promise<void> {
    try {
      proc.kill()
    } catch {}
    try {
      await proc.exited
    } catch {}
    stderrReader.cancel().catch(() => undefined)
  }

  try {
    const handshake = rawSend("return 1")
    const deadline = new Promise<never>((_keep, refuse) =>
      setTimeout(
        () => refuse(new Error(`handshake timed out after ${String(timeoutMs)}ms`)),
        timeoutMs
      )
    )
    const answer = await Promise.race([handshake, deadline])
    if (!answer.ok) throw new Error(`handshake answered not ok: ${answer.error}`)
    if (answer.value !== 1) {
      throw new Error(`handshake answered ${JSON.stringify(answer.value)} rather than 1`)
    }
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    await killProc()
    throw new Error(await diagnose(`handshake failed: ${why}`))
  }

  return {
    async send(script: string): Promise<Response> {
      if (closed) throw new Error("this lua-runner VM is closed")
      try {
        return await rawSend(script)
      } catch (thrown) {
        const why = thrown instanceof Error ? thrown.message : String(thrown)
        throw new Error(await diagnose(`send failed: ${why}`))
      }
    },
    async close(): Promise<void> {
      if (closed) return
      closed = true
      try {
        proc.stdin.end()
      } catch {}
      try {
        await proc.exited
      } catch {}
      stderrReader.cancel().catch(() => undefined)
      try {
        await stderrDrained
      } catch {}
    },
  }
}

export async function spawnPersistentVm(
  options: SpawnPersistentVmOptions = {}
): Promise<PersistentVm> {
  const binPath = options.binPath ?? DEFAULT_BIN_PATH
  const driverPath = options.driverPath ?? DRIVER_PATH
  const maxRetries = options.handshakeRetries ?? DEFAULT_HANDSHAKE_RETRIES
  const timeoutMs = options.handshakeTimeoutMs ?? DEFAULT_HANDSHAKE_TIMEOUT_MS

  let lastThrown: Error | undefined
  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    try {
      return await tryStartVm({ binPath, driverPath, attempt, timeoutMs })
    } catch (thrown) {
      lastThrown = thrown instanceof Error ? thrown : new Error(String(thrown))
    }
  }
  throw lastThrown ?? new Error("lua-runner: spawnPersistentVm ran out of attempts")
}
