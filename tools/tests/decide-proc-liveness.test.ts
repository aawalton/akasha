
import { describe, expect, it } from "bun:test"
import {
  agentsWithInFlightBackgroundTask,
  backgroundTaskCmdlinesByAgent,
  isSupervisorCmdline,
  liveAgentIdsFromProc,
  liveClaudeChildIdsFromProc,
  liveSupervisorIdsFromProc,
  type ProcLivenessEntry,
} from "../lib/decide-proc-liveness.ts"
import { rejectSelfProc } from "../lib/decide-proc-tree.ts"

const AGENT = "019f49c3-4834-7fbc-974b-2d781b3a827f"
const OTHER = "019f4785-924f-7d05-a177-2d4063f90482"
const SUPERVISOR = "bun run /code/packages/agents/supervisor/src/supervisor.ts -a aawalton"
const WRAPPER =
  "bun run /code/packages/agents/supervisor/src/spawn-headless.ts -- bun run /code/packages/agents/supervisor/src/supervisor.ts"
const CLAUDE = "claude --dangerously-skip-permissions --model opus"
const PROXY = "bun /code/packages/agents/oauth-proxy/src/main.ts"
const TMUX_SERVER =
  "/usr/bin/tmux set-option -g history-limit 50000 ; set-option -g status off ; new-session -d -s aine -c /repos -- env -u TMUX AGENT_ID=019f49c3-4834-7fbc-974b-2d781b3a827f bun run /repo/tools/lib/pty-proxy.ts -- bun run /repo/tools/run-supervisor.ts --agent-id 019f49c3-4834-7fbc-974b-2d781b3a827f"

function tree(agentId: string, base: number, startBase: number): readonly ProcLivenessEntry[] {
  return [
    { agentId, cmdline: WRAPPER, pid: base, ppid: 1, startMs: startBase },
    { agentId, cmdline: SUPERVISOR, pid: base + 1, ppid: base, startMs: startBase + 1 },
    { agentId, cmdline: CLAUDE, pid: base + 2, ppid: base + 1, startMs: startBase + 2 },
  ]
}

describe("isSupervisorCmdline", () => {
  it("the supervisor.ts process is a supervisor cmdline", () => {
    expect(isSupervisorCmdline(SUPERVISOR)).toBe(true)
  })

  it("the spawn-headless wrapper (which execs supervisor.ts) is a supervisor cmdline", () => {
    expect(isSupervisorCmdline(WRAPPER)).toBe(true)
  })

  it("a lone Claude child is NOT a supervisor cmdline — the orphan discrimination", () => {
    expect(isSupervisorCmdline(CLAUDE)).toBe(false)
  })

  it("the detached oauth-proxy is NOT a supervisor cmdline", () => {
    expect(isSupervisorCmdline(PROXY)).toBe(false)
  })

  it("a process that only NAMES a supervisor in its argv is not one — the tmux server parents every seat", () => {
    expect(isSupervisorCmdline(TMUX_SERVER)).toBe(false)
  })
})

describe("liveSupervisorIdsFromProc", () => {
  it("a full supervisor tree → the agent id is live", () => {
    expect(liveSupervisorIdsFromProc(tree(AGENT, 100, 500))).toEqual(new Set([AGENT]))
  })

  it("a lone orphan Claude child (supervisor dead) → NOT live, so a dead supervisor still reads as a crash", () => {
    const orphan: readonly ProcLivenessEntry[] = [
      { agentId: AGENT, cmdline: CLAUDE, pid: 102, ppid: 1, startMs: 500 },
    ]
    expect(liveSupervisorIdsFromProc(orphan)).toEqual(new Set())
  })

  it("the wrapper alone (supervisor.ts not yet in scan) still marks the id live", () => {
    const wrapperOnly: readonly ProcLivenessEntry[] = [
      { agentId: AGENT, cmdline: WRAPPER, pid: 100, ppid: 1, startMs: 500 },
    ]
    expect(liveSupervisorIdsFromProc(wrapperOnly)).toEqual(new Set([AGENT]))
  })

  it("a supervisor cmdline under a NON-UUID agent id is excluded (UUID gate)", () => {
    const bad: readonly ProcLivenessEntry[] = [
      { agentId: "not-a-uuid", cmdline: SUPERVISOR, pid: 200, ppid: 1, startMs: 500 },
    ]
    expect(liveSupervisorIdsFromProc(bad)).toEqual(new Set())
  })

  it("only the ids with a live supervisor are returned — a crashed sibling (claude-only) is absent", () => {
    const mixed: readonly ProcLivenessEntry[] = [
      ...tree(AGENT, 100, 500),
      { agentId: OTHER, cmdline: CLAUDE, pid: 300, ppid: 1, startMs: 900 },
    ]
    expect(liveSupervisorIdsFromProc(mixed)).toEqual(new Set([AGENT]))
  })

  it("empty scan → empty set", () => {
    expect(liveSupervisorIdsFromProc([])).toEqual(new Set())
  })
})

const MCP = "bun run /home/walton/code/packages/agents/messages/mcp.ts"
const SEAT: readonly ProcLivenessEntry[] = [
  { agentId: AGENT, cmdline: WRAPPER, pid: 100, ppid: 1 },
  { agentId: AGENT, cmdline: SUPERVISOR, pid: 101, ppid: 100 },
  { agentId: AGENT, cmdline: PROXY, pid: 102, ppid: 101 },
  { agentId: AGENT, cmdline: CLAUDE, pid: 103, ppid: 101 },
  { agentId: AGENT, cmdline: MCP, pid: 104, ppid: 103 },
]

const MCP_MOVED = "bun run /home/walton/instructions/tools/lib/messages-mcp.ts"
const SEAT_MOVED: readonly ProcLivenessEntry[] = [
  { agentId: AGENT, cmdline: WRAPPER, pid: 100, ppid: 1 },
  { agentId: AGENT, cmdline: SUPERVISOR, pid: 101, ppid: 100 },
  { agentId: AGENT, cmdline: PROXY, pid: 102, ppid: 101 },
  { agentId: AGENT, cmdline: CLAUDE, pid: 103, ppid: 101 },
  { agentId: AGENT, cmdline: MCP_MOVED, pid: 104, ppid: 103 },
]

const GATEWAY_MOVED = "bun /home/walton/instructions/tools/lib/model-gateway/main.ts"
const SEAT_GATEWAY_MOVED: readonly ProcLivenessEntry[] = [
  { agentId: AGENT, cmdline: WRAPPER, pid: 100, ppid: 1 },
  { agentId: AGENT, cmdline: SUPERVISOR, pid: 101, ppid: 100 },
  { agentId: AGENT, cmdline: GATEWAY_MOVED, pid: 102, ppid: 101 },
  { agentId: AGENT, cmdline: CLAUDE, pid: 103, ppid: 101 },
  { agentId: AGENT, cmdline: MCP_MOVED, pid: 104, ppid: 103 },
]

const SELF = 201
const MOUNT = "/home/walton/.claude"
const Q_BASH = `/bin/bash -c source ${MOUNT}/shell-snapshot.sh && eval 'ops seat signal'`
const Q_GREP = "grep --color=auto -a ."
const SHORT_QUERY: readonly ProcLivenessEntry[] = [
  { agentId: AGENT, cmdline: Q_BASH, pid: 200, ppid: 103 },
  { agentId: AGENT, cmdline: "ops seat signal worker-upload", pid: SELF, ppid: 200 },
  { agentId: AGENT, cmdline: "head -20", pid: 202, ppid: 200 },
]
const LONG_QUERY: readonly ProcLivenessEntry[] = [
  ...SHORT_QUERY,
  { agentId: AGENT, cmdline: Q_GREP, pid: 203, ppid: 200 },
  { agentId: AGENT, cmdline: "sed s/x/x/", pid: 204, ppid: 200 },
  { agentId: AGENT, cmdline: "awk {print}", pid: 205, ppid: 200 },
]

const BG_BASH = "/bin/bash -c rclone copy /data remote:/backups/data"
const BG_RCLONE = "rclone copy /data remote:/backups/data"
const BACKGROUND_WORK: readonly ProcLivenessEntry[] = [
  { agentId: AGENT, cmdline: BG_BASH, pid: 300, ppid: 103 },
  { agentId: AGENT, cmdline: BG_RCLONE, pid: 301, ppid: 300 },
]

const tasksSeenBy = (entries: readonly ProcLivenessEntry[]): readonly string[] =>
  backgroundTaskCmdlinesByAgent(rejectSelfProc(entries, SELF)).get(AGENT) ?? []

describe("backgroundTaskCmdlinesByAgent — an answer about the AGENT, not about the observer", () => {
  it("an idle seat reads FALSE — seat infrastructure is not work in flight", () => {
    expect(agentsWithInFlightBackgroundTask(SEAT).has(AGENT)).toBe(false)
  })

  it("an idle seat queried BY ITSELF still reads FALSE", () => {
    const scan = rejectSelfProc([...SEAT, ...SHORT_QUERY], SELF)
    expect(agentsWithInFlightBackgroundTask(scan).has(AGENT)).toBe(false)
  })

  it("two queries of different pipeline length against the same seat agree", () => {
    expect(tasksSeenBy([...SEAT, ...SHORT_QUERY])).toEqual(tasksSeenBy([...SEAT, ...LONG_QUERY]))
  })

  it("a seat with genuine background work reads TRUE, and lists only that work", () => {
    expect(tasksSeenBy([...SEAT, ...LONG_QUERY, ...BACKGROUND_WORK])).toEqual([BG_BASH, BG_RCLONE])
  })

  it("a bash and a grep bearing AGENT_ID, belonging to the query, are not work", () => {
    const listed = tasksSeenBy([...SEAT, ...LONG_QUERY])
    expect(listed).not.toContain(Q_BASH)
    expect(listed).not.toContain(Q_GREP)
  })

  it("both infrastructure processes are excluded despite their differing prefixes", () => {
    const listed = tasksSeenBy([...SEAT, ...BACKGROUND_WORK])
    expect(listed).not.toContain(PROXY)
    expect(listed).not.toContain(MCP)
    expect(listed).toEqual([BG_BASH, BG_RCLONE])
  })

  it("a seat running the messages server from the instructions repo reads FALSE", () => {
    expect(agentsWithInFlightBackgroundTask(SEAT_MOVED).has(AGENT)).toBe(false)
  })

  it("the messages server at its new home is excluded from the work list", () => {
    const listed = backgroundTaskCmdlinesByAgent([...SEAT_MOVED, ...BACKGROUND_WORK]).get(AGENT) ?? []
    expect(listed).not.toContain(MCP_MOVED)
    expect(listed).toEqual([BG_BASH, BG_RCLONE])
  })

  it("a seat running the model gateway from the instructions repo reads FALSE", () => {
    expect(agentsWithInFlightBackgroundTask(SEAT_GATEWAY_MOVED).has(AGENT)).toBe(false)
  })

  it("the model gateway at its new home is excluded from the work list", () => {
    const listed =
      backgroundTaskCmdlinesByAgent([...SEAT_GATEWAY_MOVED, ...BACKGROUND_WORK]).get(AGENT) ?? []
    expect(listed).not.toContain(GATEWAY_MOVED)
    expect(listed).toEqual([BG_BASH, BG_RCLONE])
  })
})

describe("rejectSelfProc — the scanner's whole invocation, bounded at the agent process", () => {
  it("drops the querying bash and every stage of its pipeline", () => {
    const kept = rejectSelfProc([...SEAT, ...LONG_QUERY], SELF).map((e) => e.pid)
    for (const q of LONG_QUERY) expect(kept).not.toContain(q.pid)
  })

  it("the ascent stops at the claude child, so the rest of the seat survives", () => {
    const kept = rejectSelfProc([...SEAT, ...SHORT_QUERY], SELF).map((e) => e.pid)
    expect(kept).toEqual([100, 101, 102, 103, 104])
  })

  it("leaves genuine background work alone — it hangs off a different bash", () => {
    const kept = rejectSelfProc([...SEAT, ...LONG_QUERY, ...BACKGROUND_WORK], SELF).map((e) => e.pid)
    expect(kept).toContain(300)
    expect(kept).toContain(301)
  })

  it("never excludes an agent process, nor anything beneath one", () => {
    const entries: readonly ProcLivenessEntry[] = [
      ...SEAT,
      ...SHORT_QUERY,
      { agentId: OTHER, cmdline: SUPERVISOR, pid: 210, ppid: 200 },
      { agentId: OTHER, cmdline: CLAUDE, pid: 211, ppid: 210 },
    ]
    const kept = rejectSelfProc(entries, SELF)
    expect(liveAgentIdsFromProc(kept)).toEqual(liveAgentIdsFromProc(entries))
    expect(liveClaudeChildIdsFromProc(kept)).toEqual(liveClaudeChildIdsFromProc(entries))
  })

  it("when the scanner IS an agent process, only its own pid is dropped", () => {
    expect(rejectSelfProc(SEAT, 101).map((e) => e.pid)).toEqual([100, 102, 103, 104])
  })

  it("a scanner absent from the scan changes nothing", () => {
    const entries = [...SEAT, ...SHORT_QUERY]
    expect(rejectSelfProc(entries, 999_999)).toEqual(entries)
  })
})
