
import { describe, expect, it } from "bun:test"
import { isOperationalError } from "../lib/exit.ts"
import { DEFAULT_ACCOUNT } from "../lib/default-account.ts"
import type { LaunchSeatOpts, LaunchSeatResult } from "../lib/launch-seat-tmux.ts"
import { buildSupervisorCmd, launchSeatUnderTmux } from "../lib/launch-seat-tmux.ts"
import {
  liveResumeSeatDeps,
  resumeSeat,
  type MaterializeInput,
  type ResumeSeatDeps,
  type ResumeTarget,
} from "../lib/resume-seat.ts"
import { decideSpawnGuard } from "../lib/spawn-guard.ts"

const AGENT = "019ee764-0000-7000-8000-000000000001"

const TARGET: ResumeTarget = {
  name: "lead-12766",
  account: "aawalton",
  presence: "absent",
  sessionId: "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee",
}

interface Journal {
  readonly launches: LaunchSeatOpts[]
  readonly materialized: MaterializeInput[]
  readonly clearedActions: string[]
  readonly terminatedTrees: string[]
}

function fresh(): Journal {
  return {
    launches: [],
    materialized: [],
    clearedActions: [],
    terminatedTrees: [],
  }
}

interface Arm {
  readonly target?: Partial<ResumeTarget>
  readonly resolveError?: string
  readonly launchThrows?: string
}

function depsFor(journal: Journal, arm: Arm): ResumeSeatDeps {
  return {
    resolveTarget: async (agentId) =>
      arm.resolveError !== undefined
        ? { error: arm.resolveError }
        : { target: { ...TARGET, ...arm.target } satisfies ResumeTarget },
    decideGuard: decideSpawnGuard,
    materializeTranscript: async (input) => {
      journal.materialized.push(input)
      return { path: `/var/tmp/${input.sessionId}.jsonl`, downloaded: false }
    },
    clearRequestedAction: async (agentId) => {
      journal.clearedActions.push(agentId)
    },
    terminatePriorTree: async (agentId) => {
      journal.terminatedTrees.push(agentId)
      return []
    },
    launch: async (opts): Promise<LaunchSeatResult> => {
      journal.launches.push(opts)
      if (arm.launchThrows !== undefined) throw new Error(arm.launchThrows)
      return { pid: 4242 }
    },
  }
}

async function thrown(run: () => Promise<unknown>): Promise<string> {
  return (await caught(run)).message
}

async function caught(run: () => Promise<unknown>): Promise<Error> {
  try {
    await run()
  } catch (err) {
    return err instanceof Error ? err : new Error(String(err))
  }
  throw new Error("expected a refusal, and the call returned")
}

describe("resumeSeat — the arms that only fire on a seat that has already failed", () => {
  it("a target that resolves to nothing refuses with the resolver's own words, launching nothing", async () => {
    const journal = fresh()
    const message = await thrown(() =>
      resumeSeat(
        { agentId: AGENT },
        depsFor(journal, { resolveError: "no agent matches '#12766'" })
      )
    )
    expect(message).toContain("no agent matches")
    expect(journal.launches).toHaveLength(0)
  })

  it("a row with no stable name refuses, launching nothing and leaving the row alone", async () => {
    const journal = fresh()
    const message = await thrown(() =>
      resumeSeat({ agentId: AGENT }, depsFor(journal, { target: { name: null } }))
    )
    expect(message).toContain("has no stable name")
    expect(message).toContain(AGENT)
    expect(journal.launches).toHaveLength(0)
  })

  it("a seat whose supervisor stands refuses rather than clobbering it", async () => {
    const journal = fresh()
    const message = await thrown(() =>
      resumeSeat({ agentId: AGENT }, depsFor(journal, { target: { presence: "present" } }))
    )
    expect(message).toContain("is already live")
    expect(message).toContain("ops seat stop lead-12766")
    expect(journal.launches).toHaveLength(0)
  })

  it("a seat whose process cannot be read refuses too — uncertainty is not permission", async () => {
    const journal = fresh()
    const message = await thrown(() =>
      resumeSeat({ agentId: AGENT }, depsFor(journal, { target: { presence: "unknown" } }))
    )
    expect(message).toContain("is already live")
    expect(journal.launches).toHaveLength(0)
  })

  it("a seat whose supervisor no longer stands is the seat that died, and it is brought back", async () => {
    const journal = fresh()
    const handle = await resumeSeat(
      { agentId: AGENT },
      depsFor(journal, { target: { presence: "absent" } })
    )
    expect(handle.status).toBe("revived")
    expect(journal.launches).toHaveLength(1)
  })

  it("a process that outlived its seat still reaches the launch, where tmux is what refuses", async () => {
    const journal = fresh()
    const message = await thrown(() =>
      resumeSeat(
        { agentId: AGENT },
        depsFor(journal, {
          target: { presence: "absent" },
          launchThrows:
            "refusing to launch 'lead-12766': a live tmux session already holds that name.",
        })
      )
    )
    expect(message).toContain("a live tmux session already holds that name")
    expect(journal.launches).toHaveLength(1)
  })

  it("a seat that never ran is cold-started on its boot prompt rather than refused", async () => {
    const journal = fresh()
    const handle = await resumeSeat(
      { agentId: AGENT, bootPrompt: "/handler amy" },
      depsFor(journal, { target: { sessionId: null } })
    )
    expect(handle.status).toBe("spawned")
    expect(handle.sessionId).toBeUndefined()
    expect(journal.materialized).toHaveLength(0)
    expect(journal.launches[0]?.resumeSessionId).toBeUndefined()
    expect(journal.launches[0]?.prompt).toBe("/handler amy")
  })

  it("a seat that has a session resumes it, and the boot prompt is not what drives it", async () => {
    const journal = fresh()
    const handle = await resumeSeat(
      { agentId: AGENT, bootPrompt: "/handler amy" },
      depsFor(journal, {})
    )
    expect(handle.status).toBe("revived")
    expect(handle.sessionId).toBe(TARGET.sessionId as string)
    expect(journal.materialized).toHaveLength(1)
    const materialized = journal.materialized[0] as MaterializeInput
    expect(materialized.agentId).toBe(AGENT)
    expect(materialized.sessionId).toBe(TARGET.sessionId as string)
    expect(materialized.cwd.startsWith("/")).toBe(true)
    expect(journal.launches[0]?.resumeSessionId).toBe(TARGET.sessionId as string)
    expect(journal.launches[0]?.prompt).toBe("")
  })

  it("a launch that refuses is an operational error, the exit this command declares for a failed boot", async () => {
    const journal = fresh()
    const err = await caught(() =>
      resumeSeat(
        { agentId: AGENT },
        depsFor(journal, {
          launchThrows:
            "refusing to launch 'lead-12766': a live tmux session already holds that name.",
        })
      )
    )
    expect(isOperationalError(err)).toBe(true)
    expect(err.message).toContain("a live tmux session already holds that name")
  })
})

describe("resumeSeat — what it carries into the launch", () => {
  it("carries the account the seat page states through to the launch", async () => {
    const journal = fresh()
    await resumeSeat({ agentId: AGENT }, depsFor(journal, {}))
    const launched = journal.launches[0] as LaunchSeatOpts
    expect(launched.account).toBe("aawalton")
    expect(launched.mode).toBe("headless")
  })

  it("falls back to the default account where the row carries none", async () => {
    const journal = fresh()
    await resumeSeat({ agentId: AGENT }, depsFor(journal, { target: { account: null } }))
    expect(journal.launches[0]?.account).toBe(DEFAULT_ACCOUNT)
  })
})

describe("resumeSeat — the launch it is wired to is the one standing here", () => {
  it("the live deps launch through the instructions tmux launcher, not a code-repo supervisor", async () => {
    expect((await liveResumeSeatDeps()).launch).toBe(launchSeatUnderTmux)
  })

  it("the supervisor command names this repository's run-supervisor and threads the resume", () => {
    const cmd = buildSupervisorCmd("/home/walton/instructions", {
      name: "lead-12766",
      agentId: AGENT,
      account: "aawalton",
      prompt: "",
      mode: "headless",
      resumeSessionId: TARGET.sessionId as string,
    })
    expect(cmd).toContain("/home/walton/instructions/tools/run-supervisor.ts")
    expect(cmd.join(" ")).toContain(`--session-id ${TARGET.sessionId as string} --resume`)
    expect(cmd.join(" ")).not.toContain("packages/agents/supervisor")
  })
})
