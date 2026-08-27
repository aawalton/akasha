import { describe, expect, test } from "bun:test"
import {
  decideFromSnapshot,
  initialWaitState,
  resolveTerminalFromSnapshot,
  TERMINAL_WITHOUT_LINK_GRACE_MS,
  type WaitSnapshot,
  type WaitState,
} from "../lib/pipeline-decide/decide-pipeline-terminal.ts"

const COMMIT = "b186fe8682e2c1a4d9f3b7c05e8a1d2f6c4b93a7"

function snapshot(
  seq: number,
  status: string,
  opts: {
    supersededBy?: number
    commitSha?: string
    workflows?: readonly { name: string; status: string }[]
  } = {}
): WaitSnapshot {
  return {
    pipeline: {
      seq,
      status,
      ...(opts.supersededBy === undefined ? {} : { supersededBy: opts.supersededBy }),
      ...(opts.commitSha === undefined ? {} : { commitSha: opts.commitSha }),
    },
    workflows: opts.workflows ?? [],
  }
}

const NOTHING: WaitSnapshot = { pipeline: null, workflows: [] }

describe("resolveTerminalFromSnapshot", () => {
  test("a pipeline still underway resolves nothing", () => {
    expect(resolveTerminalFromSnapshot(NOTHING, undefined, undefined)).toBeNull()
    expect(resolveTerminalFromSnapshot(snapshot(1, "running"), undefined, undefined)).toBeNull()
  })

  test("a terminal pipeline resolves, carrying the commit it built", () => {
    expect(
      resolveTerminalFromSnapshot(
        snapshot(42, "passed", { commitSha: COMMIT, workflows: [{ name: "deploy", status: "passed" }] }),
        undefined,
        undefined
      )
    ).toEqual({
      passed: true,
      seq: 42,
      status: "passed",
      commitSha: COMMIT,
      workflows: [{ name: "deploy", status: "passed" }],
    })
    expect(resolveTerminalFromSnapshot(snapshot(42, "failed"), undefined, undefined)?.passed).toBe(
      false
    )
    expect(resolveTerminalFromSnapshot(snapshot(42, "canceled"), undefined, undefined)?.status).toBe(
      "canceled"
    )
    expect(resolveTerminalFromSnapshot(snapshot(42, "passed"), undefined, undefined)?.commitSha).toBe(
      null
    )
  })

  test("`success` is read as `passed`, on the pipeline and on a workflow alike", () => {
    const found = resolveTerminalFromSnapshot(
      snapshot(42, "success", { workflows: [{ name: "deploy", status: "success" }] }),
      undefined,
      undefined
    )
    expect(found?.status).toBe("passed")
    expect(found?.workflows).toEqual([{ name: "deploy", status: "passed" }])
  })

  test("where a workflow set was named, it is that set that settles the answer", () => {
    const waiting = snapshot(1, "running", {
      workflows: [
        { name: "deploy", status: "passed" },
        { name: "smoke", status: "running" },
      ],
    })
    expect(resolveTerminalFromSnapshot(waiting, undefined, ["deploy", "smoke"])).toBeNull()
    expect(resolveTerminalFromSnapshot(waiting, undefined, ["deploy", "gone"])).toBeNull()

    const settled = resolveTerminalFromSnapshot(
      snapshot(42, "running", {
        workflows: [
          { name: "deploy", status: "passed" },
          { name: "smoke", status: "passed" },
          { name: "lingering", status: "running" },
        ],
      }),
      undefined,
      ["deploy", "smoke"]
    )
    expect(settled?.passed).toBe(true)
    expect(settled?.workflows).toEqual([
      { name: "deploy", status: "passed" },
      { name: "smoke", status: "passed" },
    ])
  })

  test("a pipeline that ended before the named set appeared answers for the whole pipeline", () => {
    const found = resolveTerminalFromSnapshot(
      snapshot(42, "failed", { commitSha: COMMIT, workflows: [{ name: "other", status: "failed" }] }),
      undefined,
      ["deploy"]
    )
    expect(found?.status).toBe("failed")
    expect(found?.commitSha).toBe(COMMIT)
  })

  test("an empty named set reads as none named at all", () => {
    expect(resolveTerminalFromSnapshot(snapshot(1, "running"), undefined, [])).toBeNull()
    expect(resolveTerminalFromSnapshot(snapshot(42, "passed"), undefined, [])?.seq).toBe(42)
  })

  test("where a chain was followed, the result says which pipeline the wait started on", () => {
    const found = resolveTerminalFromSnapshot(snapshot(99, "passed"), 42, undefined)
    expect(found?.seq).toBe(99)
    expect(found?.superseded_from).toBe(42)
    expect(resolveTerminalFromSnapshot(snapshot(99, "passed"), undefined, undefined)).not.toHaveProperty(
      "superseded_from"
    )
  })
})

describe("decideFromSnapshot", () => {
  test("a snapshot holding no pipeline is ignored", () => {
    expect(decideFromSnapshot(NOTHING, initialWaitState(1000), 1000, undefined).action).toBe(
      "ignore"
    )
  })

  test("the clock restarts only when the pipeline being waited on changes", () => {
    const standing: WaitState = { ...initialWaitState(1000), lastEffectiveSeq: 10 }
    const same = decideFromSnapshot(snapshot(10, "running"), standing, 5000, undefined)
    expect(same.action).toBe("wait")
    if (same.action !== "wait") return
    expect(same.state.startTime).toBe(1000)

    const moved = decideFromSnapshot(snapshot(20, "running"), standing, 5000, undefined)
    expect(moved.action).toBe("wait")
    if (moved.action !== "wait") return
    expect(moved.state.startTime).toBe(5000)
    expect(moved.state.lastEffectiveSeq).toBe(20)
  })

  test("a replaced pipeline pointing at its replacement is followed, keeping the first hop", () => {
    const first = decideFromSnapshot(
      snapshot(10, "canceled", { supersededBy: 20 }),
      initialWaitState(1000),
      2000,
      undefined
    )
    expect(first.action).toBe("followSupersession")
    if (first.action !== "followSupersession") return
    expect(first.seq).toBe(20)
    expect(first.state.supersededFrom).toBe(10)

    const second = decideFromSnapshot(
      snapshot(20, "canceled", { supersededBy: 30 }),
      { ...initialWaitState(1000), lastEffectiveSeq: 20, supersededFrom: 10 },
      3000,
      undefined
    )
    expect(second.action).toBe("followSupersession")
    if (second.action !== "followSupersession") return
    expect(second.state.supersededFrom).toBe(10)
  })

  test("a replaced pipeline with no replacement named is waited on for one bounded grace", () => {
    const standing: WaitState = { ...initialWaitState(1000), lastEffectiveSeq: 10 }
    const first = decideFromSnapshot(snapshot(10, "canceled"), standing, 2000, undefined)
    expect(first.action).toBe("wait")
    if (first.action !== "wait") return
    expect(first.state.terminalWithoutLinkFirstSeenAt).toBe(2000)

    const waiting: WaitState = { ...standing, terminalWithoutLinkFirstSeenAt: 2000 }
    const within = decideFromSnapshot(
      snapshot(10, "canceled"),
      waiting,
      2000 + TERMINAL_WITHOUT_LINK_GRACE_MS - 1,
      undefined
    )
    expect(within.action).toBe("wait")

    const past = decideFromSnapshot(
      snapshot(10, "overtaken"),
      waiting,
      2000 + TERMINAL_WITHOUT_LINK_GRACE_MS,
      undefined
    )
    expect(past.action).toBe("resolve")
    if (past.action !== "resolve") return
    expect(past.result.status).toBe("overtaken")
    expect(past.result.passed).toBe(false)
  })

  test("a pipeline that went back to running clears the grace it had started", () => {
    const found = decideFromSnapshot(
      snapshot(10, "running"),
      { ...initialWaitState(1000), lastEffectiveSeq: 10, terminalWithoutLinkFirstSeenAt: 2000 },
      3000,
      undefined
    )
    expect(found.action).toBe("wait")
    if (found.action !== "wait") return
    expect(found.state.terminalWithoutLinkFirstSeenAt).toBeNull()
  })

  test("the state handed in is never changed", () => {
    const standing = initialWaitState(1000)
    const frozen = structuredClone(standing)
    decideFromSnapshot(snapshot(10, "running"), standing, 2000, undefined)
    expect(standing).toEqual(frozen)
  })
})
