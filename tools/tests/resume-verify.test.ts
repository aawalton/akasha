
import { describe, expect, it } from "bun:test"
import { resumeAndVerify, type ResumeVerifyDeps } from "../lib/resume-verify.ts"
import type { SeatHandle } from "../lib/resume-seat.ts"

const AGENT = "019ee764-0000-7000-8000-000000000001"

const HANDLE: SeatHandle = {
  agentId: AGENT,
  name: "lead-12766",
  pid: 7,
  sessionId: "sid",
  status: "revived",
}

interface Arm {
  readonly transcriptMtimeMs?: number | null
  readonly reviveThrows?: string
}

function depsFor(arm: Arm, journal: string[]): ResumeVerifyDeps {
  return {
    revive: async () => {
      journal.push("revived")
      if (arm.reviveThrows !== undefined) throw new Error(arm.reviveThrows)
      return HANDLE
    },
    sampleTranscriptMtimeMs: () => arm.transcriptMtimeMs ?? null,
    sampleOwnedRowUpdatedAtMs: () => null,
    now: () => 1_000,
    sleep: async (ms) => {
      journal.push(`slept ${ms}`)
    },
  }
}

const INPUT = { agentId: AGENT, force: false, graceMs: 30_000 }

describe("reviveAndVerify", () => {
  it("a seat whose io advanced past the revive baseline reads as recovered", async () => {
    const journal: string[] = []
    const result = await resumeAndVerify(INPUT, depsFor({ transcriptMtimeMs: 1_500 }, journal))
    expect(result.verdict).toBe("advancing")
    expect(result.reviveAtMs).toBe(1_000)
    expect(result.observedIoMs).toBe(1_500)
  })

  it("a seat that is process-alive but whose io never moved reads as wedged", async () => {
    const journal: string[] = []
    const result = await resumeAndVerify(INPUT, depsFor({ transcriptMtimeMs: 800 }, journal))
    expect(result.verdict).toBe("wedged")
    expect(result.handle.name).toBe("lead-12766")
  })

  it("the baseline is taken before the revive and the sample after the grace window", async () => {
    const journal: string[] = []
    await resumeAndVerify(INPUT, depsFor({ transcriptMtimeMs: 1_500 }, journal))
    expect(journal).toEqual(["revived", "slept 30000"])
  })

  it("a revive that refuses never reaches the grace window or the verdict", async () => {
    const journal: string[] = []
    let message = ""
    try {
      await resumeAndVerify(INPUT, depsFor({ reviveThrows: "is already live" }, journal))
    } catch (err) {
      message = err instanceof Error ? err.message : String(err)
    }
    expect(message).toContain("is already live")
    expect(journal).toEqual(["revived"])
  })
})
