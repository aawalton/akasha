
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import {
  CONSTANTS,
  DECIDE,
  JITTER,
  PRECLIFF,
  PROXY,
  WINDOWS,
} from "./supervisor-rule-test-helpers-deferred-vectors.ts"
import {
  CLASSIFY,
  CMDLINES,
  COLLAPSE,
  DECODE,
  IDLE,
  REFUSALS,
  SHUTDOWN,
  standingRefusal,
} from "./supervisor-rule-test-helpers-idle-vectors.ts"
import {
  childExitRuleDouble,
  deferredRestartRuleDouble,
  idleRuleDouble,
  preCliffRestartRuleDouble,
  proxyAdoptionRuleDouble,
  selfHealJitterRuleDouble,
  unusedChildExitRule,
  unusedIdleRule,
} from "./supervisor-rule-test-helpers.ts"

const idle = idleRuleDouble()
const childExit = childExitRuleDouble()
const jitter = selfHealJitterRuleDouble()
const proxy = proxyAdoptionRuleDouble()
const preCliff = preCliffRestartRuleDouble()
const deferred = deferredRestartRuleDouble()

function agree(name: string, standing: { value: unknown; notice: string | null }, ported: {
  value: unknown
  notice: string | null
}): void {
  const verdict = hold(name, decided("standing", standing), decided("ported", ported))
  expect(verdict.ported).toBe(verdict.standing)
  expect(verdict.matches).toBe(true)
}

const ANY_IDLE_OBS = {
  inFlight: 0,
  busyChildren: 0,
  inFlightDispatchChildren: 0,
  claudePresent: true,
}
const ANY_STATUS = { exitCode: 0, signal: null }
const ANY_EXIT_OBS = { status: ANY_STATUS, supervisorKilled: false, shuttingDown: false }

const THROWERS: Record<string, Record<string, () => unknown>> = {
  idle: {
    ignoredMcpCmdlines: () => unusedIdleRule.ignoredMcpCmdlines([]),
    preservingRestart: () => unusedIdleRule.preservingRestart(ANY_IDLE_OBS),
    pastCliff: () => unusedIdleRule.pastCliff(ANY_IDLE_OBS),
  },
  childExit: {
    decodeWaitStatus: () => unusedChildExitRule.decodeWaitStatus(0),
    collapse: () => unusedChildExitRule.collapse(ANY_STATUS),
    classify: () => unusedChildExitRule.classify(ANY_EXIT_OBS),
    shutdownWrite: () => unusedChildExitRule.shutdownWrite(null),
  },
}

describe("a throwing double refuses in the words it refused with over there", () => {
  for (const vector of REFUSALS) {
    it(vector.name, () => {
      const reach = THROWERS[vector.double]?.[vector.method]
      if (reach === undefined) throw new Error(`no call for ${vector.double}.${vector.method}`)
      let thrown = "NOTHING WAS THROWN"
      try {
        reach()
      } catch (error) {
        thrown = String(error)
      }
      expect(thrown).toBe(standingRefusal(vector.which))
    })
  }
})

describe("the idle double answers what it answered over there", () => {
  for (const vector of CMDLINES) {
    it(`ignoredMcpCmdlines, ${vector.name}`, async () => {
      agree(vector.name, vector.standing, await idle.ignoredMcpCmdlines(vector.cmdlines))
    })
  }
  for (const vector of IDLE) {
    it(`preservingRestart, ${vector.name}`, async () => {
      agree(vector.name, vector.preservingRestart, await idle.preservingRestart(vector.obs))
    })
    it(`pastCliff, ${vector.name}`, async () => {
      agree(vector.name, vector.pastCliff, await idle.pastCliff(vector.obs))
    })
  }
})

describe("the child-exit double answers what it answered over there", () => {
  for (const vector of DECODE) {
    it(`decodeWaitStatus, ${vector.name}`, async () => {
      agree(vector.name, vector.standing, await childExit.decodeWaitStatus(vector.raw))
    })
  }
  for (const vector of COLLAPSE) {
    it(`collapse, ${vector.name}`, async () => {
      agree(vector.name, vector.standing, await childExit.collapse(vector.status))
    })
  }
  for (const vector of CLASSIFY) {
    it(`classify, ${vector.name}`, async () => {
      agree(vector.name, vector.standing, await childExit.classify(vector.obs))
    })
  }
  for (const vector of SHUTDOWN) {
    it(`shutdownWrite, ${vector.name}`, async () => {
      const classification =
        vector.classification === null
          ? null
          : { ...vector.classification, stopReason: "child-crashed" as const }
      agree(vector.name, vector.standing, await childExit.shutdownWrite(classification))
    })
  }
})

describe("the jitter double answers what it answered over there", () => {
  for (const vector of JITTER) {
    it(vector.name, async () => {
      const raw = vector.rawMaxJitterMs ?? undefined
      agree(vector.name, vector.standing, await jitter(vector.randFloat, raw))
    })
  }
})

describe("the proxy-adoption double answers what it answered over there", () => {
  for (const vector of PROXY) {
    it(vector.name, async () => {
      agree(vector.name, vector.standing, await proxy(vector.input))
    })
  }
})

describe("the pre-cliff double answers what it answered over there", () => {
  for (const vector of PRECLIFF) {
    it(vector.name, async () => {
      agree(vector.name, vector.standing, await preCliff(vector.obs, vector.thresholdMs))
    })
  }
})

describe("the deferred-restart double answers what it answered over there", () => {
  it("the declared constants", async () => {
    agree("constants", CONSTANTS, await deferred.constants())
  })
  for (const vector of WINDOWS) {
    it(`windows, ${vector.name}`, async () => {
      agree(vector.name, vector.standing, {
        ...(await deferred.windows({
          maxDeferMs: vector.raw.maxDeferMs ?? undefined,
          staleWedgeMs: vector.raw.staleWedgeMs ?? undefined,
          preCliffOverrideMs: vector.raw.preCliffOverrideMs ?? undefined,
        })),
      })
    })
  }
  for (const vector of DECIDE) {
    it(`decide, ${vector.name}`, async () => {
      agree(vector.name, vector.standing, await deferred.decide(vector.state, vector.obs, vector.config))
    })
  }
})
