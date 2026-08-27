
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import {
  BUSY_OBS,
  IDLE_OBS,
  NEVER,
  noProbe,
  OWN_STATE_IDLE_WITH_CHILDREN,
  THROWS,
  waitFor,
} from "./supervisor-deferred-restart-test-helpers.ts"
import {
  OBS,
  OBSERVES,
  PROBE,
  WAIT,
} from "./supervisor-deferred-restart-test-helpers-vectors.ts"

function agree(
  name: string,
  standing: { value: unknown; notice: string | null },
  ported: unknown
): void {
  const verdict = hold(name, decided("standing", standing), decided("ported", { value: ported, notice: null }))
  expect(verdict.ported).toBe(verdict.standing)
  expect(verdict.matches).toBe(true)
}

const PORTED_OBS: Record<string, unknown> = {
  IDLE_OBS,
  BUSY_OBS,
  OWN_STATE_IDLE_WITH_CHILDREN,
}

describe("the observations are the ones recorded over there", () => {
  for (const vector of OBS) {
    it(vector.name, () => {
      const ported = PORTED_OBS[vector.name]
      if (ported === undefined) throw new Error(`no fixture named ${vector.name}`)
      agree(vector.name, vector.standing, ported)
    })
  }
})

describe("the observe doubles answer what they answered over there", () => {
  it("NEVER never settles", async () => {
    const settled = await Promise.race([
      NEVER().then(() => "settled"),
      new Promise<string>((resolve) => setTimeout(() => resolve("pending"), 60)),
    ])
    const vector = OBSERVES.find((one) => one.name === "NEVER never settles")
    if (vector === undefined) throw new Error("the NEVER vector left the recording")
    agree(vector.name, vector.standing, settled)
  })

  it("THROWS rejects", async () => {
    let thrown = "NOTHING WAS THROWN"
    try {
      await THROWS()
    } catch (error) {
      thrown = String(error)
    }
    const vector = OBSERVES.find((one) => one.name === "THROWS rejects")
    if (vector === undefined) throw new Error("the THROWS vector left the recording")
    agree(vector.name, vector.standing, thrown)
  })
})

describe("noProbe answers what it answered over there", () => {
  const reach: Record<string, () => unknown | Promise<unknown>> = {
    getClaudePid: () => noProbe.getClaudePid(),
    getProxyPort: () => noProbe.getProxyPort(),
    getAgentId: () => noProbe.getAgentId(),
    keys: () => Object.keys(noProbe).sort(),
    "idleRule.preservingRestart on IDLE_OBS": async () =>
      decided("ported", await noProbe.idleRule.preservingRestart(IDLE_OBS)),
    "idleRule.preservingRestart on BUSY_OBS": async () =>
      decided("ported", await noProbe.idleRule.preservingRestart(BUSY_OBS)),
    "idleRule.pastCliff on OWN_STATE_IDLE_WITH_CHILDREN": async () =>
      decided("ported", await noProbe.idleRule.pastCliff(OWN_STATE_IDLE_WITH_CHILDREN)),
    "deferredRestartRule.constants": async () =>
      decided("ported", await noProbe.deferredRestartRule.constants()),
  }
  for (const vector of PROBE) {
    it(vector.name, async () => {
      const call = reach[vector.name]
      if (call === undefined) throw new Error(`no call for ${vector.name}`)
      agree(vector.name, vector.standing, await call())
    })
  }
})

describe("waitFor settles the way it settled over there", () => {
  for (const vector of WAIT) {
    it(vector.name, async () => {
      let calls = 0
      const predicate = (): boolean => {
        calls += 1
        return vector.turnsTrueAfter >= 0 && calls > vector.turnsTrueAfter
      }
      let outcome = "UNSETTLED"
      try {
        await waitFor(predicate, vector.timeoutMs)
        outcome = "resolved"
      } catch (error) {
        outcome = String(error)
      }
      agree(vector.name, vector.standing, outcome)
    })
  }
})
