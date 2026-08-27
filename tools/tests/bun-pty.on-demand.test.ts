
import { afterAll, describe, expect, it } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { spawnPty } from "../lib/bun-pty.ts"
import { decided, hold } from "../lib/digest-harness.ts"

const OPEN = "RESULT:"
const CLOSE = ":RESULT"
const SETTLE_MS = 60
const READY_TIMEOUT_MS = 20_000
const RESULT_TIMEOUT_MS = 20_000

const scratch = mkdtempSync(join("/var/tmp", "bun-pty-passthrough-"))
afterAll(() => rmSync(scratch, { recursive: true, force: true }))

const CHILD = `
process.stdin.setRawMode(true)
process.stdin.resume()
const chunks = []
const SENTINEL = Buffer.from("<<END>>")
process.stdin.on("data", (d) => {
  chunks.push(Buffer.from(d))
  const all = Buffer.concat(chunks)
  const at = all.indexOf(SENTINEL)
  if (at >= 0) {
    process.stdout.write("RESULT:" + all.subarray(0, at).toString("hex") + ":RESULT\\n")
    process.exit(0)
  }
})
process.stdout.write("READY\\n")
`

interface ChildRun {
  write: (bytes: Uint8Array) => void
  output: () => string
  kill: () => void
  exited: Promise<number>
}

function startChild(childPath: string): ChildRun {
  let output = ""
  const proc = spawnPty(["bun", "run", childPath], {
    cwd: scratch,
    env: { ...process.env, HOME: scratch },
    terminal: {
      cols: 80,
      rows: 24,
      data: (_term, chunk) => {
        output += new TextDecoder().decode(chunk)
      },
    },
  })
  return {
    write: (bytes) => proc.terminal.write(bytes),
    output: () => output,
    kill: () => {
      try {
        proc.kill()
      } catch {
      }
    },
    exited: proc.exited,
  }
}

async function waitFor(run: ChildRun, marker: string, ms: number): Promise<void> {
  const deadline = Date.now() + ms
  while (Date.now() < deadline) {
    if (run.output().includes(marker)) return
    await new Promise((r) => setTimeout(r, 20))
  }
  throw new Error(`never saw ${marker}; output so far: ${JSON.stringify(run.output().slice(-400))}`)
}

async function roundTrip(bytes: Uint8Array): Promise<Uint8Array> {
  const childPath = join(scratch, `child-${Math.random().toString(36).slice(2)}.ts`)
  writeFileSync(childPath, CHILD)
  const run = startChild(childPath)
  try {
    await waitFor(run, "READY", READY_TIMEOUT_MS)
    await new Promise((r) => setTimeout(r, SETTLE_MS))
    run.write(bytes)
    run.write(new TextEncoder().encode("<<END>>"))
    await waitFor(run, CLOSE, RESULT_TIMEOUT_MS)
    const out = run.output()
    const start = out.indexOf(OPEN)
    const end = out.indexOf(CLOSE, start)
    if (start < 0 || end < 0) throw new Error("no RESULT frame")
    return Uint8Array.from(Buffer.from(out.slice(start + OPEN.length, end), "hex"))
  } finally {
    run.kill()
    await run.exited.catch(() => 0)
  }
}

const PLAIN = new TextEncoder().encode("ops project move-to 18468 --status checks")

const CONTROL = Uint8Array.from([
  0x1b, 0x5b, 0x41, 0x1b, 0x5b, 0x42, 0x1b, 0x5b, 0x32, 0x30, 0x30, 0x7e, 0x09, 0x7f, 0x0d,
])

const MULTIBYTE = new TextEncoder().encode("café — 日本語 🙂")

const BURST = new TextEncoder().encode(Array.from({ length: 400 }, (_, i) => `line-${i}\r`).join(""))

interface Vector {
  readonly name: string
  readonly bytes: Uint8Array
  readonly standing: Record<string, unknown>
}

const VECTORS: readonly Vector[] = [
  {
    name: "delivers a plain typed string byte for byte",
    bytes: PLAIN,
    standing: { received: Array.from(PLAIN) },
  },
  {
    name: "delivers control bytes and escape sequences unchanged",
    bytes: CONTROL,
    standing: { received: Array.from(CONTROL) },
  },
  {
    name: "delivers multi-byte UTF-8 without splitting or re-encoding it",
    bytes: MULTIBYTE,
    standing: { received: Array.from(MULTIBYTE) },
  },
  {
    name: "delivers a fast burst in order and without loss",
    bytes: BURST,
    standing: { length: BURST.length, received: Array.from(BURST) },
  },
]

function projected(received: Uint8Array, shape: Record<string, unknown>): Record<string, unknown> {
  const trace: Record<string, unknown> = {
    received: Array.from(received),
    length: received.length,
  }
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(shape)) picked[key] = trace[key]
  return picked
}

describe("spawnPty, held against what the code repository asserts", () => {
  for (const vector of VECTORS) {
    it(
      vector.name,
      async () => {
        const received = decided("ported", { value: await roundTrip(vector.bytes), notice: null })
        const verdict = hold(vector.name, vector.standing, projected(received, vector.standing))
        expect(verdict.matches).toBe(true)
      },
      60_000
    )
  }

  it("compares something in every vector, so no case passes on an empty projection", () => {
    for (const vector of VECTORS) {
      expect(Object.keys(vector.standing).length).toBeGreaterThan(0)
    }
  })
})
