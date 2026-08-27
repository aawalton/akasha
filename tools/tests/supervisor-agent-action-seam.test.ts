
import { afterAll, describe, expect, it } from "bun:test"
import {
  settleIterationExit,
  wireIteration,
} from "../lib/supervisor-interactive-wire.ts"
import { getAgentActionHandler, setAgentActionHandler } from "../lib/supervisor-state.ts"

const before = getAgentActionHandler()
afterAll(() => {
  setAgentActionHandler(before)
})

const ID = "aaaaaaaa-0000-0000-0000-000000000000"
const noop = (): undefined => undefined

const proc = { pid: process.pid, kill: noop, exitStatus: () => ({ code: 0, signal: null }) }

async function drive(): Promise<Awaited<ReturnType<typeof wireIteration>>> {
  const args = {
    agentId: ID,
    proc,
    selectedAccount: "walton",
    projDir: "/var/tmp/supervisor-agent-action-seam",
    agentIdHandle: { id: ID, bind: noop },
    agentLog: { redirectTo: () => noop, getCurrentLogDir: () => "/var/tmp" },
    proxy: { port: 31337 },
    getAgentId: () => ID,
    getAgentProc: () => undefined,
    setLoopAgentId: noop,
    setLoopSessionId: noop,
    rebindDeps: {},
    startSessionWatch: () => noop,
  }
  return await wireIteration(args as unknown as Parameters<typeof wireIteration>[0])
}

describe("the agent-action seam between the beat and the iteration", () => {
  it("publishes this iteration's own handler at wire", async () => {
    setAgentActionHandler(null)
    const wiring = await drive()
    expect(getAgentActionHandler()).toBe(wiring.actionSubsystem.handleAgentAction)
    wiring.stopSessionRotatedWatch()
  })

  it("unpublishes at settle, so no beat in the gap reaches a torn-down subsystem", async () => {
    const wiring = await drive()
    await settleIterationExit(wiring, proc as unknown as Parameters<typeof settleIterationExit>[1])
    expect(getAgentActionHandler()).toBeNull()
    wiring.stopSessionRotatedWatch()
  })
})
