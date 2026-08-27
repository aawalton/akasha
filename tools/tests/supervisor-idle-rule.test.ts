
import { describe, expect, it } from "bun:test"
import { hold } from "../lib/digest-harness.ts"
import {
  askIgnoredMcpCmdlines,
  askPastCliff,
  askPreservingRestart,
  readIgnoredMcpCmdlines,
  readPastCliff,
  readPreservingRestart,
} from "../lib/supervisor-idle-rule.ts"

const OBS = {
  inFlight: 0,
  busyChildren: 0,
  inFlightDispatchChildren: 0,
  claudePresent: true,
}

const unreachable = (): Promise<unknown> => {
  throw new Error("no instructions tree here")
}

function readCase(run: () => unknown): unknown {
  try {
    return { threw: false, value: run() }
  } catch {
    return { threw: true }
  }
}

async function quietly<T>(run: () => Promise<T>): Promise<T> {
  const kept = console.error
  console.error = (): undefined => undefined
  try {
    return await run()
  } finally {
    console.error = kept
  }
}

const STANDING: Record<string, unknown> = {
  "read ignoredMcpCmdlines": { threw: false, value: [true, false] },
  "read preservingRestart": { threw: false, value: { idle: false, reason: "inFlight=1" } },
  "read pastCliff": { threw: false, value: { idle: true, reason: "idle" } },
  "read preservingRestart missing busyReason": { threw: true },
  "ask ignoredMcpCmdlines unreachable": {
    value: [false, false, false],
    noticeNamesRule: true,
    noticeIsNull: false,
  },
  "ask preservingRestart unreachable": { idle: false, noticeIsNull: false },
  "ask pastCliff unreachable": { idle: false, noticeIsNull: false },
}

function held(decision: string, ported: unknown): void {
  const verdict = hold(decision, STANDING[decision], ported)
  expect(verdict.ported).toBe(verdict.standing)
  expect(verdict.matches).toBe(true)
}

describe("the ported idle rule facade answers what the code repository's answered", () => {
  it("narrows an answered payload the same way on all three reads", () => {
    held(
      "read ignoredMcpCmdlines",
      readCase(() => readIgnoredMcpCmdlines({ idleRule: { ignoredMcpCmdlines: [true, false] } }))
    )
    held(
      "read preservingRestart",
      readCase(() =>
        readPreservingRestart({ idleRule: { preservingRestart: false, busyReason: "inFlight=1" } })
      )
    )
    held(
      "read pastCliff",
      readCase(() =>
        readPastCliff({ idleRule: { preservingRestartPastCliff: true, busyReason: "idle" } })
      )
    )
  })

  it("refuses an answer missing the key it was asked for", () => {
    held(
      "read preservingRestart missing busyReason",
      readCase(() => readPreservingRestart({ idleRule: { preservingRestart: false } }))
    )
  })

  it("reads every child as work rather than dropping the tail of the scan", async () => {
    const answered = await quietly(() => askIgnoredMcpCmdlines(["a", "b", "c"], unreachable))
    held("ask ignoredMcpCmdlines unreachable", {
      value: answered.value,
      noticeNamesRule: answered.notice !== null && answered.notice.includes("idleRule"),
      noticeIsNull: answered.notice === null,
    })
  })

  it("reads BUSY on both idle predicates", async () => {
    const strict = await quietly(() => askPreservingRestart(OBS, unreachable))
    held("ask preservingRestart unreachable", {
      idle: strict.value.idle,
      noticeIsNull: strict.notice === null,
    })
    const relaxed = await quietly(() => askPastCliff(OBS, unreachable))
    held("ask pastCliff unreachable", {
      idle: relaxed.value.idle,
      noticeIsNull: relaxed.notice === null,
    })
  })
})
