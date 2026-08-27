
import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import { shape } from "../lib/shape.ts"
import { buildLoopState } from "../lib/supervisor-loop-state.ts"
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
}

interface Scenario {
  readonly name: string
  readonly drive: () => Trace
  readonly standing: Record<string, unknown>
}

function loopStateWith(handle: ReturnType<typeof createAgentIdHandle>): ReturnType<typeof buildLoopState> {
  let loopAgentId: string | null = handle.id
  return buildLoopState({
    cwd: "/var/tmp/test",
    configDir: "/var/tmp/test/config",
    anthropicBaseUrl: "http://localhost:1/",
    headless: false,
    agentIdHandle: handle,
    getAgentId: () => loopAgentId,
    getSessionId: () => "session-id",
    setLoopAgentId: (id) => {
      loopAgentId = id
    },
    setLoopSessionId: () => {},
    setResume: () => {},
    setCurrentPrompt: () => {},
    setPendingUserPrompt: () => {},
    setPendingCarriedName: () => {},
  })
}

const SCENARIOS: readonly Scenario[] = [
  {
    name: "the post-exit rotation dispatcher's setAgentId reaches the process env",
    drive: () => {
      const handle = createAgentIdHandle("boot-id")
      loopStateWith(handle).setAgentId("successor-id")
      return { id: handle.id, env: envOrAbsent() }
    },
    standing: { id: "successor-id", env: "successor-id" },
  },
  {
    name: "a null agent id clears the env through the same path",
    drive: () => {
      const handle = createAgentIdHandle("boot-id")
      loopStateWith(handle).setAgentId(null)
      return { id: handle.id, env: envOrAbsent() }
    },
    standing: { env: null },
  },
]

function projected(trace: Trace, shapeOf: Record<string, unknown>): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(shapeOf)) {
    picked[key] = (trace as unknown as Record<string, unknown>)[key]
  }
  return picked
}

describe("the real rotation site publishes through the handle, as the code repository asserts", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, () => {
      const trace = decided("ported", { value: scenario.drive(), notice: null })
      expect(hold(scenario.name, scenario.standing, projected(trace, scenario.standing)).matches).toBe(true)
    })
  }

  it("compares something in every scenario, so no case passes on an empty projection", () => {
    for (const scenario of SCENARIOS) {
      expect(Object.keys(scenario.standing).length).toBeGreaterThan(0)
      for (const held of Object.values(scenario.standing)) expect(held).not.toBeUndefined()
    }
  })
})
