
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import { guardTick } from "../lib/supervisor-guard-tick.ts"

interface Caught {
  readonly errors: readonly string[]
  readonly escaped: boolean
}

const BLIP = "getPage: HTTP 502 text/html non-JSON body"

async function guarded(tick: () => unknown): Promise<Caught> {
  const errors: string[] = []
  let escaped = false
  try {
    guardTick(tick, (e) => errors.push(e instanceof Error ? e.message : String(e)))
  } catch {
    escaped = true
  }
  await Promise.resolve()
  await Promise.resolve()
  return { errors, escaped }
}

interface Scenario {
  readonly name: string
  readonly tick: () => unknown
  readonly standing: Caught
}

const SCENARIOS: readonly Scenario[] = [
  {
    name: "routes a synchronous throw to onError and never propagates",
    tick: () => {
      throw new Error(BLIP)
    },
    standing: { errors: [BLIP], escaped: false },
  },
  {
    name: "routes an async rejection to onError without an unhandled rejection",
    tick: () => Promise.reject(new Error(BLIP)),
    standing: { errors: [BLIP], escaped: false },
  },
  {
    name: "does not call onError when the tick resolves",
    tick: () => Promise.resolve(),
    standing: { errors: [], escaped: false },
  },
  {
    name: "does not call onError for a synchronous tick that succeeds",
    tick: () => undefined,
    standing: { errors: [], escaped: false },
  },
]

describe("guardTick, held against what the code repository asserts", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, async () => {
      const caught = decided("ported", { value: await guarded(scenario.tick), notice: null })
      expect(hold(scenario.name, scenario.standing, caught).matches).toBe(true)
    })
  }
})
