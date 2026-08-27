import { describe, expect, it } from "bun:test"
import {
  MAX_OWNER_HOPS,
  resolveSeatBinding,
  seatBindingInArgv,
} from "../lib/memory-reaper-owner.ts"
import type { PidSnapshot } from "../lib/memory-reaper-proc-scan.ts"

const AGENT = "01a00060-a5a5-71ea-aaa5-396dea669f64"

const SESSION = "d90296c2-58c1-4dfc-925e-de95a55c2827"

const VICTIM = 3381007

const CLAUDE = 695684

const SUPERVISOR = 691406

const WRAPPER = 691386

const TMUX = 3304934

function snap(pid: number, ppid: number): PidSnapshot {
  return { pid, ppid, vmRssKb: 0, pssKb: 0, name: "bun" }
}

const FLEET: readonly PidSnapshot[] = [
  snap(VICTIM, CLAUDE),
  snap(CLAUDE, SUPERVISOR),
  snap(SUPERVISOR, WRAPPER),
  snap(WRAPPER, TMUX),
  snap(TMUX, 1),
]

const VICTIM_ARGV = ["bun", "-e", "[UNCLASSIFIED]"]

const CLAUDE_ARGV = [
  "claude",
  "--allowed-tools=Grep",
  "--dangerously-skip-permissions",
  "--system-prompt-file",
  `/tmp/agent-boot-prompt-${AGENT}.md`,
]

const SUPERVISOR_ARGV = [
  "/var/home/walton/.bun/bin/bun",
  "/var/home/walton/instructions/tools/run-supervisor.ts",
  "-a",
  "aawalton",
  "--agent-id",
  AGENT,
  "--session-id",
  SESSION,
  "--resume",
  "[UNCLASSIFIED]",
]

function readerFor(byPid: Readonly<Record<number, readonly string[]>>) {
  return (pid: number): readonly string[] | undefined => byPid[pid]
}

const LIVE_FLEET_READER = readerFor({
  [VICTIM]: VICTIM_ARGV,
  [CLAUDE]: CLAUDE_ARGV,
  [SUPERVISOR]: SUPERVISOR_ARGV,
  [WRAPPER]: SUPERVISOR_ARGV,
  [TMUX]: ["/usr/bin/tmux", "new-session"],
})

describe("seatBindingInArgv", () => {
  it("reads the agent and session a supervisor spells", () => {
    expect(seatBindingInArgv(SUPERVISOR_ARGV, SUPERVISOR, 2)).toEqual({
      agentId: AGENT,
      sessionId: SESSION,
      pid: SUPERVISOR,
      hops: 2,
    })
  })

  it("reads the equals form as readily as the spaced one", () => {
    const binding = seatBindingInArgv(["bun", `--agent-id=${AGENT}`], 5, 0)
    expect(binding?.agentId).toBe(AGENT)
    expect(binding?.sessionId).toBe(null)
  })

  it("takes no agent id from a claude process, which spells none", () => {
    expect(seatBindingInArgv(CLAUDE_ARGV, CLAUDE, 1)).toBe(null)
  })

  it("refuses a withheld value, so a redacted capture never reads as an id", () => {
    expect(seatBindingInArgv(["bun", "--agent-id", "[UNCLASSIFIED]"], 5, 0)).toBe(null)
    expect(seatBindingInArgv(["bun", "--agent-id", "[REDACTED]"], 5, 0)).toBe(null)
  })

  it("refuses anything that is not a uuid, whatever flag carried it", () => {
    expect(seatBindingInArgv(["bun", "--agent-id", "athena-ops-cli"], 5, 0)).toBe(null)
    expect(seatBindingInArgv(["bun", "--agent-id"], 5, 0)).toBe(null)
  })

  it("keeps the agent id when only the session is withheld", () => {
    const argv = ["bun", "--agent-id", AGENT, "--session-id", "[UNCLASSIFIED]"]
    expect(seatBindingInArgv(argv, 5, 0)?.sessionId).toBe(null)
  })
})

describe("resolveSeatBinding", () => {
  it("names the seat two hops above a runaway that spells nothing itself", () => {
    expect(resolveSeatBinding(VICTIM, FLEET, LIVE_FLEET_READER)).toEqual({
      agentId: AGENT,
      sessionId: SESSION,
      pid: SUPERVISOR,
      hops: 2,
    })
  })

  it("answers at hop zero when the victim is the supervisor itself", () => {
    const binding = resolveSeatBinding(SUPERVISOR, FLEET, LIVE_FLEET_READER)
    expect(binding?.hops).toBe(0)
    expect(binding?.pid).toBe(SUPERVISOR)
  })

  it("names nobody when no process on the chain spells an agent", () => {
    const reader = readerFor({
      [VICTIM]: VICTIM_ARGV,
      [CLAUDE]: CLAUDE_ARGV,
      [SUPERVISOR]: ["bun", "run-supervisor.ts"],
      [WRAPPER]: ["bun", "pty-proxy.ts"],
      [TMUX]: ["/usr/bin/tmux", "new-session"],
    })
    expect(resolveSeatBinding(VICTIM, FLEET, reader)).toBe(null)
  })

  it("names nobody when the chain reaches nothing it can read", () => {
    expect(resolveSeatBinding(VICTIM, FLEET, () => undefined)).toBe(null)
  })

  it("terminates on a malformed chain that points back at itself", () => {
    const cycle: readonly PidSnapshot[] = [snap(10, 11), snap(11, 10)]
    expect(resolveSeatBinding(10, cycle, () => ["bun"])).toBe(null)
  })

  it("stops at pid 1 rather than reading init", () => {
    const chain: readonly PidSnapshot[] = [snap(10, 1)]
    const reader = readerFor({ 1: ["systemd", "--agent-id", AGENT] })
    expect(resolveSeatBinding(10, chain, reader)).toBe(null)
  })

  it("reaches the last hop it is allowed and refuses the one past it", () => {
    const deep: PidSnapshot[] = []
    for (let at = 0; at < MAX_OWNER_HOPS + 4; at += 1) deep.push(snap(100 + at, 101 + at))
    const atLimit = readerFor({ [100 + MAX_OWNER_HOPS - 1]: ["bun", "--agent-id", AGENT] })
    expect(resolveSeatBinding(100, deep, atLimit)?.hops).toBe(MAX_OWNER_HOPS - 1)
    const pastLimit = readerFor({ [100 + MAX_OWNER_HOPS]: ["bun", "--agent-id", AGENT] })
    expect(resolveSeatBinding(100, deep, pastLimit)).toBe(null)
  })
})
