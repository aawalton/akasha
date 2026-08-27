import { resolve } from "node:path"
import {
  DONE_SENTINEL,
  normalizeValue,
  type Response,
  RUN_SENTINEL,
  responseSchema,
} from "./protocol"

const defaultDriverPath = resolve(import.meta.dir, "driver.lua")

export interface PersistentVm {
  readonly send: (script: string) => Promise<Response>
  readonly close: () => Promise<void>
}

export interface SpawnPersistentVmOptions {
  readonly binPath?: string
  readonly driverPath?: string
  readonly handshakeRetries?: number
  readonly handshakeTimeoutMs?: number
}

const DEFAULT_HANDSHAKE_RETRIES = 2
const DEFAULT_HANDSHAKE_TIMEOUT_MS = 2000
const STDERR_CAPTURE_BYTES = 4096

export async function spawnPersistentVm(
  options: SpawnPersistentVmOptions = {}
): Promise<PersistentVm> {
  const binPath = options.binPath ?? "lua5.1"
  const driverPath = options.driverPath ?? defaultDriverPath
  const maxRetries = options.handshakeRetries ?? DEFAULT_HANDSHAKE_RETRIES
  const timeoutMs = options.handshakeTimeoutMs ?? DEFAULT_HANDSHAKE_TIMEOUT_MS

  let lastError: Error | undefined
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await tryStartVm({ binPath, driverPath, attempt, timeoutMs })
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err))
    }
  }
  throw lastError ?? new Error("lua-runner: spawnPersistentVm exhausted retries")
}

interface StartArgs {
  readonly binPath: string
  readonly driverPath: string
  readonly attempt: number
  readonly timeoutMs: number
}

function spawnLua(binPath: string, driverPath: string, attempt: number) {
  try {
    return Bun.spawn([binPath, driverPath], {
      stdin: "pipe",
      stdout: "pipe",
      stderr: "pipe",
    })
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    throw new Error(
      `lua-runner: spawn failed (attempt=${attempt}, binPath=${binPath}, driverPath=${driverPath}): ${reason}`
    )
  }
}

async function tryStartVm(args: StartArgs): Promise<PersistentVm> {
  const { binPath, driverPath, attempt, timeoutMs } = args
  const startTime = performance.now()
  const proc = spawnLua(binPath, driverPath, attempt)

  const pid = proc.pid
  const stderrBuffer = createCappedBuffer(STDERR_CAPTURE_BYTES)
  const stderrDecoder = new TextDecoder()
  const stderrReader = proc.stderr.getReader()
  const stderrPromise = drainStderr(stderrReader, stderrDecoder, stderrBuffer)

  const stdoutReader = proc.stdout.getReader()
  const decoder = new TextDecoder()
  const sentinelLine = `\n${DONE_SENTINEL}\n`
  let buffer = ""
  let closed = false
  let sendCount = 0

  async function readUntilSentinel(): Promise<string> {
    while (true) {
      const idx = buffer.indexOf(sentinelLine)
      if (idx >= 0) {
        const payload = buffer.slice(0, idx)
        buffer = buffer.slice(idx + sentinelLine.length)
        return payload
      }
      const { value, done } = await stdoutReader.read()
      if (done) {
        throw new Error("lua5.1 subprocess closed stdout before responding")
      }
      buffer += decoder.decode(value, { stream: true })
    }
  }

  async function diagnose(stage: string): Promise<string> {
    let exitCode: number | null = null
    try {
      const exitedPromise = proc.exited
      const timeout = new Promise<null>((r) => setTimeout(() => r(null), 200))
      const result = await Promise.race([exitedPromise, timeout])
      exitCode = typeof result === "number" ? result : null
    } catch {
      exitCode = null
    }
    try {
      await Promise.race([stderrPromise, new Promise((r) => setTimeout(r, 200))])
    } catch {}
    const stderr = stderrBuffer.read()
    const ms = Math.round(performance.now() - startTime)
    return [
      `lua-runner: ${stage}`,
      `pid=${pid}`,
      `attempt=${attempt}`,
      `binPath=${binPath}`,
      `driverPath=${driverPath}`,
      `exitCode=${exitCode}`,
      `msSinceSpawn=${ms}`,
      `sendCount=${sendCount}`,
      `stderr=${stderr !== "" ? stderr : "(empty)"}`,
    ].join(" | ")
  }

  async function rawSend(script: string): Promise<Response> {
    sendCount += 1
    proc.stdin.write(`${script}\n${RUN_SENTINEL}\n`)
    proc.stdin.flush()
    const raw = await readUntilSentinel()
    const parsed: unknown = JSON.parse(raw)
    const response = responseSchema.parse(parsed)
    if (response.ok) {
      return { ok: true, value: normalizeValue(response.value) }
    }
    return response
  }

  async function killProc(): Promise<void> {
    try {
      proc.kill()
    } catch {}
    try {
      await proc.exited
    } catch {}
    try {
      stderrReader.cancel().catch(() => {})
    } catch {}
  }

  try {
    const handshake = rawSend("return 1")
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`handshake timed out after ${timeoutMs}ms`)), timeoutMs)
    )
    const result = await Promise.race([handshake, timeout])
    if (!result.ok) {
      throw new Error(`handshake response not ok: ${result.error}`)
    }
    if (result.value !== 1) {
      throw new Error(
        `handshake response value mismatch (expected 1, got ${JSON.stringify(result.value)})`
      )
    }
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    await killProc()
    const msg = await diagnose(`handshake failed: ${reason}`)
    throw new Error(msg)
  }

  return {
    async send(script: string): Promise<Response> {
      if (closed) throw new Error("lua-runner VM is closed")
      try {
        return await rawSend(script)
      } catch (err) {
        const reason = err instanceof Error ? err.message : String(err)
        const msg = await diagnose(`send failed: ${reason}`)
        throw new Error(msg)
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
      try {
        stderrReader.cancel().catch(() => {})
      } catch {}
      try {
        await stderrPromise
      } catch {}
    },
  }
}

interface CappedBuffer {
  readonly append: (s: string) => undefined
  readonly read: () => string
}

function createCappedBuffer(maxBytes: number): CappedBuffer {
  let chunks: string[] = []
  let total = 0
  return {
    append(s: string): undefined {
      if (s.length === 0) return
      chunks.push(s)
      total += s.length
      while (total > maxBytes && chunks.length > 1) {
        const head = chunks.shift()
        if (head !== undefined) total -= head.length
      }
      if (total > maxBytes && chunks.length === 1) {
        const tail = chunks[0]
        if (tail !== undefined) {
          chunks[0] = tail.slice(-maxBytes)
          total = chunks[0].length
        }
      }
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
