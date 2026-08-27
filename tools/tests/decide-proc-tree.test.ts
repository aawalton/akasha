
import { describe, expect, it } from "bun:test"
import type { ProcLivenessEntry } from "../lib/decide-proc-liveness.ts"
import {
  type ClaudeChildProc,
  claudeChildProcsByAgent,
  pickMainClaudePid,
  selectSupersededTreePids,
} from "../lib/decide-proc-tree.ts"

const AGENT = "019f49c3-4834-7fbc-974b-2d781b3a827f"
const OTHER = "019f4785-924f-7d05-a177-2d4063f90482"
const SUPERVISOR = "bun run /code/packages/agents/supervisor/src/supervisor.ts -a aawalton"
const WRAPPER =
  "bun run /code/packages/agents/supervisor/src/spawn-headless.ts -- bun run /code/packages/agents/supervisor/src/supervisor.ts"
const CLAUDE = "claude --dangerously-skip-permissions --model opus"
const PROXY = "bun /code/packages/agents/oauth-proxy/src/main.ts"
const CLI = 999_999

function tree(agentId: string, base: number, startBase: number): readonly ProcLivenessEntry[] {
  return [
    { agentId, cmdline: WRAPPER, pid: base, ppid: 1, startMs: startBase },
    { agentId, cmdline: SUPERVISOR, pid: base + 1, ppid: base, startMs: startBase + 1 },
    { agentId, cmdline: CLAUDE, pid: base + 2, ppid: base + 1, startMs: startBase + 2 },
  ]
}

describe("selectSupersededTreePids", () => {
  it("no agent processes → empty", () => {
    expect(selectSupersededTreePids([], AGENT, CLI)).toEqual([])
  })

  it("a single healthy tree is a strict no-op", () => {
    expect(selectSupersededTreePids(tree(AGENT, 100, 500), AGENT, CLI)).toEqual([])
  })

  it("two disjoint trees → reaps the older, keeps the newest by startMs", () => {
    const old = tree(AGENT, 100, 500)
    const fresh = tree(AGENT, 200, 900)
    const pids = selectSupersededTreePids([...old, ...fresh], AGENT, CLI)
    expect(pids).toEqual([100, 101, 102])
  })

  it("explicit keeperPid overrides newest-startMs (keeps the older tree)", () => {
    const old = tree(AGENT, 100, 500)
    const fresh = tree(AGENT, 200, 900)
    const pids = selectSupersededTreePids([...old, ...fresh], AGENT, CLI, 101)
    expect(pids).toEqual([200, 201, 202])
  })

  it("keeperPid absent from entries falls back to newest-startMs", () => {
    const old = tree(AGENT, 100, 500)
    const fresh = tree(AGENT, 200, 900)
    const pids = selectSupersededTreePids([...old, ...fresh], AGENT, CLI, 55_555)
    expect(pids).toEqual([100, 101, 102])
  })

  it("a single connected component with two supervisors (re-exec chain) is one tree → no-op", () => {
    const chain: readonly ProcLivenessEntry[] = [
      { agentId: AGENT, cmdline: WRAPPER, pid: 10, ppid: 1, startMs: 500 },
      { agentId: AGENT, cmdline: SUPERVISOR, pid: 11, ppid: 10, startMs: 501 },
      { agentId: AGENT, cmdline: SUPERVISOR, pid: 12, ppid: 11, startMs: 900 },
      { agentId: AGENT, cmdline: CLAUDE, pid: 13, ppid: 12, startMs: 902 },
    ]
    expect(selectSupersededTreePids(chain, AGENT, CLI)).toEqual([])
  })

  it("the detached oauth-proxy is never swept (not an agent-process cmdline)", () => {
    const old = tree(AGENT, 100, 500)
    const fresh = tree(AGENT, 200, 900)
    const proxy: ProcLivenessEntry = {
      agentId: AGENT,
      cmdline: PROXY,
      pid: 300,
      ppid: 1,
      startMs: 950,
    }
    const pids = selectSupersededTreePids([...old, ...fresh, proxy], AGENT, CLI)
    expect(pids).not.toContain(300)
    expect(pids).toEqual([100, 101, 102])
  })

  it("only the target agent's trees are considered", () => {
    const mine = tree(AGENT, 100, 500)
    const theirs = tree(OTHER, 200, 900)
    expect(selectSupersededTreePids([...mine, ...theirs], AGENT, CLI)).toEqual([])
  })

  it("the scanner's own pid is never returned", () => {
    const old = tree(AGENT, 100, 500)
    const fresh = tree(AGENT, 200, 900)
    const pids = selectSupersededTreePids([...old, ...fresh], AGENT, 101)
    expect(pids).not.toContain(101)
  })

  it("tie on newest startMs is broken deterministically (max pid kept)", () => {
    const treeLow = tree(AGENT, 100, 500)
    const treeHigh = tree(AGENT, 200, 500)
    const pids = selectSupersededTreePids([...treeLow, ...treeHigh], AGENT, CLI)
    expect(pids).toEqual([100, 101, 102])
  })
})

describe("claudeChildProcsByAgent", () => {
  it("retains each claude child's parent pid, keyed by agent id (main + subagent)", () => {
    const entries: readonly ProcLivenessEntry[] = [
      { agentId: AGENT, cmdline: SUPERVISOR, pid: 51, ppid: 50 },
      { agentId: AGENT, cmdline: CLAUDE, pid: 102, ppid: 51 },
      { agentId: AGENT, cmdline: CLAUDE, pid: 305, ppid: 102 },
    ]
    const byId = claudeChildProcsByAgent(entries)
    expect(byId.get(AGENT)).toEqual([
      { pid: 102, ppid: 51 },
      { pid: 305, ppid: 102 },
    ])
  })

  it("ignores non-claude bearers and malformed agent ids", () => {
    const entries: readonly ProcLivenessEntry[] = [
      { agentId: AGENT, cmdline: SUPERVISOR, pid: 51, ppid: 50 },
      { agentId: "not-a-uuid", cmdline: CLAUDE, pid: 60, ppid: 51 },
      { agentId: AGENT, cmdline: PROXY, pid: 70, ppid: 51 },
    ]
    expect(claudeChildProcsByAgent(entries).size).toBe(0)
  })
})

describe("pickMainClaudePid", () => {
  it("pins the MAIN claude (ppid === supervisorPid) over a later-started SUBAGENT", () => {
    const children: readonly ClaudeChildProc[] = [
      { pid: 102, ppid: 51 },
      { pid: 305, ppid: 102 },
    ]
    expect(pickMainClaudePid(children, 51)).toBe(102)
  })

  it("a nested sub-subagent is still excluded — only the supervisor-parented claude wins", () => {
    const children: readonly ClaudeChildProc[] = [
      { pid: 305, ppid: 102 },
      { pid: 410, ppid: 305 },
      { pid: 102, ppid: 51 },
    ]
    expect(pickMainClaudePid(children, 51)).toBe(102)
  })

  it("mid-restart: two supervisor-parented claudes → the one that started last", () => {
    const children: readonly ClaudeChildProc[] = [
      { pid: 102, ppid: 51, startMs: 1_000 },
      { pid: 480, ppid: 51, startMs: 2_000 },
    ]
    expect(pickMainClaudePid(children, 51)).toBe(480)
  })

  it("the pid counter wrapped, so the LOWER pid started later and wins", () => {
    const children: readonly ClaudeChildProc[] = [
      { pid: 1_518_070, ppid: 51, startMs: 1_000 },
      { pid: 302_101, ppid: 51, startMs: 2_000 },
    ]
    expect(pickMainClaudePid(children, 51)).toBe(302_101)
  })

  it("no start time on any child → falls back to max pid rather than guessing", () => {
    const children: readonly ClaudeChildProc[] = [
      { pid: 102, ppid: 51 },
      { pid: 480, ppid: 51 },
    ]
    expect(pickMainClaudePid(children, 51)).toBe(480)
  })

  it("supervisorPid null → falls back to newest claude child (never blind)", () => {
    const children: readonly ClaudeChildProc[] = [
      { pid: 102, ppid: 51 },
      { pid: 305, ppid: 102 },
    ]
    expect(pickMainClaudePid(children, null)).toBe(305)
  })

  it("supervisorPid matches no child (stale/recycled) → falls back to newest claude child", () => {
    const children: readonly ClaudeChildProc[] = [
      { pid: 102, ppid: 51 },
      { pid: 305, ppid: 102 },
    ]
    expect(pickMainClaudePid(children, 999)).toBe(305)
  })

  it("no live claude child → undefined", () => {
    expect(pickMainClaudePid([], 51)).toBeUndefined()
  })
})
