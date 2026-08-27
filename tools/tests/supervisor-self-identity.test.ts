
import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import { shape } from "../lib/shape.ts"
import { createAgentIdHandle } from "../lib/supervisor-self-identity.ts"

const SENTINEL = "sentinel-not-an-agent-id"

const envAgentId = (): string | undefined => shape.string().optional().parse(process.env.AGENT_ID)

const envOrAbsent = (): string | null => envAgentId() ?? null

let saved: string | undefined

beforeEach(() => {
  saved = envAgentId()
  process.env.AGENT_ID = SENTINEL
})

afterEach(() => {
  if (saved === undefined) delete process.env.AGENT_ID
  else process.env.AGENT_ID = saved
})

interface Trace {
  readonly id: string | null
  readonly env: string | null
  readonly threw: boolean
}

interface Scenario {
  readonly name: string
  readonly drive: () => Trace
  readonly standing: Record<string, unknown>
}

function traced(run: () => { handle: { id: string | null }; threw?: boolean }): Trace {
  const { handle, threw } = run()
  return { id: handle.id, env: envOrAbsent(), threw: threw ?? false }
}

const SCENARIOS: readonly Scenario[] = [
  {
    name: "publishes a non-null initial id to the process env",
    drive: () => traced(() => ({ handle: createAgentIdHandle("boot-id") })),
    standing: { id: "boot-id", env: "boot-id" },
  },
  {
    name: "clears an INHERITED id when this supervisor has none of its own yet",
    drive: () => traced(() => ({ handle: createAgentIdHandle(null) })),
    standing: { id: null, env: null },
  },
  {
    name: "bind publishes the id to both the handle and the process env",
    drive: () =>
      traced(() => {
        const handle = createAgentIdHandle(null)
        handle.bind("first-id")
        return { handle }
      }),
    standing: { id: "first-id", env: "first-id" },
  },
  {
    name: "a rebind rotates the env too — the stale-id case",
    drive: () =>
      traced(() => {
        const handle = createAgentIdHandle("first-id")
        handle.bind("rotated-id")
        return { handle }
      }),
    standing: { id: "rotated-id", env: "rotated-id" },
  },
  {
    name: "binding null REMOVES the env var rather than leaving the released id behind",
    drive: () =>
      traced(() => {
        const handle = createAgentIdHandle("first-id")
        handle.bind(null)
        return { handle }
      }),
    standing: { id: null, env: null },
  },
  {
    name: "refuses a direct write to .id, so the env cannot be bypassed",
    drive: () =>
      traced(() => {
        const handle = createAgentIdHandle("first-id")
        let threw = false
        try {
          Object.assign(handle, { id: "forged-id" })
        } catch {
          threw = true
        }
        return { handle, threw }
      }),
    standing: { threw: true, id: "first-id", env: "first-id" },
  },
]

function projected(trace: Trace, shapeOf: Record<string, unknown>): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(shapeOf)) picked[key] = (trace as unknown as Record<string, unknown>)[key]
  return picked
}

describe("createAgentIdHandle, held against what the code repository asserts", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, () => {
      const trace = decided("ported", { value: scenario.drive(), notice: null })
      const verdict = hold(scenario.name, scenario.standing, projected(trace, scenario.standing))
      expect(verdict.matches).toBe(true)
    })
  }

  it("compares something in every scenario, so no case passes on an empty projection", () => {
    for (const scenario of SCENARIOS) {
      expect(Object.keys(scenario.standing).length).toBeGreaterThan(0)
      for (const held of Object.values(scenario.standing)) expect(held).not.toBeUndefined()
    }
  })
})
