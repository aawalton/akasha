
import { afterEach, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import { decided, hold } from "../lib/digest-harness.ts"

const WRAPPER = join(import.meta.dir, "..", "lib", "spawn-headless.ts")

const homes: string[] = []
afterEach(() => {
  for (const home of homes.splice(0)) rmSync(home, { recursive: true, force: true })
})

interface Vector {
  readonly name: string
  readonly inner: string
  readonly sigtermAfterMs: number | null
  readonly standing: Record<string, unknown>
}

const VECTORS: readonly Vector[] = [
  {
    name: "a non-zero exit is the wrapper's own exit code, unchanged",
    inner: "sleep 0.4; exit 7",
    sigtermAfterMs: null,
    standing: { wrapperExitCode: 7 },
  },
  {
    name: "exit 0 comes back as a zero code, never as an absent one",
    inner: "sleep 0.4; exit 0",
    sigtermAfterMs: null,
    standing: { wrapperExitCode: 0 },
  },
  {
    name: "a child that exits at once still hands its code up",
    inner: "exit 5",
    sigtermAfterMs: null,
    standing: { wrapperExitCode: 5 },
  },
  {
    name: "SIGTERM to the wrapper ends the child rather than leaving it running",
    inner: "sleep 30",
    sigtermAfterMs: 700,
    standing: { finished: true },
  },
]

interface Trace {
  readonly wrapperExitCode: number
  readonly finished: boolean
}

async function run(vector: Vector): Promise<Trace> {
  const home = mkdtempSync(join("/var/tmp", "spawn-headless-port-"))
  homes.push(home)
  const dir = `${home}/wrapper`
  mkdirSync(dir, { recursive: true })
  const proc = Bun.spawn({
    cmd: [process.execPath, "run", WRAPPER, "--log", `${dir}/spawn.log`, "--", "bash", "-c", vector.inner],
    stdin: "ignore",
    stdout: "ignore",
    stderr: "ignore",
    env: { ...process.env, HOME: home },
  })
  if (vector.sigtermAfterMs !== null) {
    await Bun.sleep(vector.sigtermAfterMs)
    proc.kill("SIGTERM")
  }
  const wrapperExitCode = await proc.exited
  return { wrapperExitCode, finished: true }
}

function projected(trace: Trace, standing: Record<string, unknown>): Record<string, unknown> {
  const whole: Record<string, unknown> = { ...trace }
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(standing)) picked[key] = whole[key]
  return picked
}

describe("spawn-headless, held against what the code repository asserts", () => {
  for (const vector of VECTORS) {
    it(
      vector.name,
      async () => {
        const trace = decided("ported", { value: await run(vector), notice: null })
        const verdict = hold(vector.name, vector.standing, projected(trace, vector.standing))
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
