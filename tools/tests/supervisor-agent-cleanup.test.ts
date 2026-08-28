
import { describe, expect, it } from "bun:test"
import { type ProcessCleanupDeps, processCleanup } from "../lib/supervisor-agent-cleanup"
import type { AgentProcess } from "../lib/supervisor-types.ts"

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms))

const hangingPush = (): Promise<void> => new Promise<void>(() => undefined)

function makeProc(overrides: Partial<AgentProcess> = {}): AgentProcess {
  return {
    process_id: "test-proc",
    agent_id: "agent-1",
    user_id: "user-1",
    session_id: "session-1",
    started_at: new Date().toISOString(),
    proc: null,
    interactive: true,
    currentAccount: "aawalton",
    credentialRefreshTimer: null,
    heartbeatTimer: null,
    stopCredentialWatch: null,
    proxyLivenessMonitor: null,
    limitResumeMonitor: null,
    waitResumeMonitor: null,
    mcpConfigPath: null,
    configDir: null,
    ...overrides,
  }
}

describe("processCleanup — stop-first teardown (#14686)", () => {
  it("clears the heartbeat timer at entry so no beats fire during a hung push", async () => {
    const beats = { n: 0 }
    const heartbeatTimer = setInterval(() => {
      beats.n += 1
    }, 1)
    try {
      await sleep(20)
      const atEntry = beats.n
      expect(atEntry).toBeGreaterThan(0)

      const proc = makeProc({ heartbeatTimer })
      await processCleanup(proc, { pushCredentialFileToPage: hangingPush, pushTimeoutMs: 30 })

      const afterCleanup = beats.n
      expect(afterCleanup).toBe(atEntry)

      await sleep(30)
      expect(beats.n).toBe(afterCleanup)
    } finally {
      clearInterval(heartbeatTimer)
    }
  })

  it("bounds a hanging credential push and still resolves", async () => {
    const proc = makeProc()
    const done = processCleanup(proc, { pushCredentialFileToPage: hangingPush, pushTimeoutMs: 30 })
    const winner = await Promise.race([
      done.then(() => "done" as const),
      sleep(500).then(() => "hang" as const),
    ])
    expect(winner).toBe("done")
  })

  it("stops every monitor and watcher at entry, before the awaited push", async () => {
    const calls: Record<string, number> = {
      proxy: 0,
      limit: 0,
      wait: 0,
      credWatch: 0,
      sessionWatch: 0,
    }
    const bump =
      (key: string): (() => void) =>
      () => {
        calls[key] = (calls[key] ?? 0) + 1
      }
    const deps: ProcessCleanupDeps = {
      pushCredentialFileToPage: async () => undefined,
      pushTimeoutMs: 50,
    }
    const proc = makeProc({
      proxyLivenessMonitor: { stop: bump("proxy") },
      limitResumeMonitor: { stop: bump("limit") },
      waitResumeMonitor: { stop: bump("wait") },
      stopCredentialWatch: bump("credWatch"),
      stopSessionWatch: bump("sessionWatch"),
    })
    await processCleanup(proc, deps)
    expect(calls).toEqual({
      proxy: 1,
      limit: 1,
      wait: 1,
      credWatch: 1,
      sessionWatch: 1,
    })
  })
})
