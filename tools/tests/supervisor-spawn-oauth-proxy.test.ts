
import { describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { readProcStartTicks, formatSeatProcKey } from "../lib/seat-proc-key.ts"
import { supervisorSocketPath } from "../lib/supervisor-log-path.ts"
import type {
  ProxyAdoptionInput,
  ProxyAdoptionRuleSource,
} from "../lib/supervisor-proxy-adoption-rule.ts"
import { spawnOrAdoptOAuthProxy } from "../lib/supervisor-spawn-oauth-proxy.ts"
import { computeSupervisorBytecodeVersion } from "../lib/supervisor-bytecode-version"

function proxyAdoptionRuleDouble(): ProxyAdoptionRuleSource {
  return (input: ProxyAdoptionInput) => {
    const decided = !input.hasLiveProxy
      ? "spawn-fresh"
      : input.versionMatches
        ? "adopt"
        : input.healthy
          ? "adopt-with-drift"
          : "spawn-fresh"
    return Promise.resolve({ value: decided as "adopt" | "adopt-with-drift" | "spawn-fresh", notice: null })
  }
}

const proxyAdoptionRule = proxyAdoptionRuleDouble()

const GONE_PROCESS = "2147483647-1"

const SEAT_NAME = "spawn-oauth-proxy-fixture"

function liveProcess(): string {
  return formatSeatProcKey({ pid: process.pid, startTicks: readProcStartTicks(process.pid) ?? 0 })
}

function standingSocketPath(agentId: string): string {
  return join(homedir(), "repos", "code", ".claude", "supervisors", agentId, "oauth-proxy.sock")
}

function freshAgentId(prefix: string): string {
  return `${prefix}-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

interface StatedProxy {
  readonly process: string
  readonly port: number
  readonly version: string
}

async function onASeatStating<T>(
  agentId: string,
  proxy: StatedProxy | null,
  use: () => Promise<T>
): Promise<T> {
  const akasha = realpathSync(mkdtempSync("/var/tmp/spawn-oauth-proxy-seat-"))
  const held = process.env.AKASHA_ROOT
  process.env.AKASHA_ROOT = akasha
  try {
    const dir = join(akasha, "agent", "seat")
    mkdirSync(dir, { recursive: true })
    writeFileSync(
      join(dir, `${SEAT_NAME}.seat.md`),
      `---\npage-type-slug: seat\nid: ${agentId}\ntitle: "${SEAT_NAME}"\n---\n`
    )
    if (proxy !== null) {
      writeFileSync(
        join(dir, `${SEAT_NAME}.seat.uncommitted.yaml`),
        `proxy-process: "${proxy.process}"\nproxy-port: ${proxy.port}\nproxy-version: "${proxy.version}"\n`
      )
    }
    return await use()
  } finally {
    if (held === undefined) delete process.env.AKASHA_ROOT
    else process.env.AKASHA_ROOT = held
    rmSync(akasha, { recursive: true, force: true })
    rmSync(join(homedir(), "repos", "code", ".claude", "supervisors", agentId), {
      recursive: true,
      force: true,
    })
  }
}

async function adoptionAnswer(
  agentId: string,
  args: { oauthProxyVersion: string; adoptedClaudePid?: number }
): Promise<{ adopted: boolean; pid: number; port: number; socketPath: string; stopIsFn: boolean }> {
  const handle = await spawnOrAdoptOAuthProxy(
    {
      agentId,
      registrationAccount: "alice",
      logDir: "/var/tmp",
      oauthProxyVersion: args.oauthProxyVersion,
      ...(args.adoptedClaudePid != null ? { adoptedClaudePid: args.adoptedClaudePid } : {}),
    },
    proxyAdoptionRule
  )
  return {
    adopted: handle.adopted,
    pid: handle.pid,
    port: handle.port,
    socketPath: handle.socketPath,
    stopIsFn: typeof handle.stop === "function",
  }
}

async function nonAdoptionAnswer(agentId: string, version: string): Promise<{ adopted: boolean }> {
  try {
    const handle = await spawnOrAdoptOAuthProxy(
      { agentId, registrationAccount: "alice", logDir: "/var/tmp", oauthProxyVersion: version },
      proxyAdoptionRule
    )
    handle.stop()
    return { adopted: handle.adopted }
  } catch {
    return { adopted: false }
  }
}

describe("computeSupervisorBytecodeVersion", () => {
  it("returns a 64-char hex string for the running entrypoint", () => {
    const v = computeSupervisorBytecodeVersion()
    expect(v).toMatch(/^[0-9a-f]{64}$|^unknown$/)
  })

  it("is stable across calls within one process", () => {
    const a = computeSupervisorBytecodeVersion()
    const b = computeSupervisorBytecodeVersion()
    expect(a).toBe(b)
  })
})

describe("spawnOrAdoptOAuthProxy adoption", () => {
  it("adopts the proxy its seat states, where that process stands and the version matches", async () => {
    const agentId = freshAgentId("test-adopt")
    const version = "test-version-abc"
    await onASeatStating(agentId, { process: liveProcess(), port: 12345, version }, async () => {
      const ported = await adoptionAnswer(agentId, { oauthProxyVersion: version })
      expect(ported).toEqual({
        adopted: true,
        pid: process.pid,
        port: 12345,
        socketPath: standingSocketPath(agentId),
        stopIsFn: true,
      })
    })
  })

  it("adopts the live proxy at the owner id A after the session rotated to B", async () => {
    const ownerAgentIdA = freshAgentId("test-adopt-owner")
    const rotatedSessionIdB = freshAgentId("test-rotated")
    const version = "test-version-rotation"
    await onASeatStating(
      ownerAgentIdA,
      { process: liveProcess(), port: 23456, version },
      async () => {
        const answer = await adoptionAnswer(ownerAgentIdA, {
          oauthProxyVersion: version,
          adoptedClaudePid: process.pid,
        })
        expect({
          adopted: answer.adopted,
          port: answer.port,
          socketPath: answer.socketPath,
          isNotRotatedSocket: answer.socketPath !== supervisorSocketPath(rotatedSessionIdB),
        }).toEqual({
          adopted: true,
          port: 23456,
          socketPath: standingSocketPath(ownerAgentIdA),
          isNotRotatedSocket: true,
        })
      }
    )
  })

  it("does not adopt a proxy its seat states whose process is gone", async () => {
    const agentId = freshAgentId("test-adopt")
    await onASeatStating(
      agentId,
      { process: GONE_PROCESS, port: 9999, version: "matching-version" },
      async () => {
        expect(await nonAdoptionAnswer(agentId, "matching-version")).toEqual({ adopted: false })
      }
    )
  })

  it("does not adopt when its seat states no proxy at all", async () => {
    const agentId = freshAgentId("test-adopt")
    await onASeatStating(agentId, null, async () => {
      expect(await nonAdoptionAnswer(agentId, "any-version")).toEqual({ adopted: false })
    })
  })
})
