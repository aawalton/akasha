
import { describe, expect, it } from "bun:test"
import { hold } from "../lib/digest-harness.ts"
import { armDeferredRestart } from "../lib/supervisor-deferred-restart.ts"
import { type Projection, runScenarios } from "./supervisor-deferred-restart-scenarios.ts"

const STANDING: Record<string, Projection> = {
  "ceiling-never-settles": {
    "fired": 1
  },
  "ceiling-throws": {
    "fired": 1
  },
  "ceiling-races-once": {
    "fired": 1
  },
  "idle-streak-beats-ceiling": {
    "fired": 1,
    "idleLogged": true
  },
  "fires-with-live-children": {
    "fired": 1
  },
  "busy-line-omits-child": {
    "namesInFlight": true,
    "namesDispatchChildren": false
  },
  "unbounded-never-fires": {
    "fired": 0
  },
  "cancel-clears-both": {
    "fired": 0
  },
  "busy-line-names-signal": {
    "namesInFlight": true,
    "saysDeferring": true
  },
  "idle-fast-path-quiet": {
    "anyBusyLine": false,
    "anyIdleLine": true
  },
  "stale-wedge-fires": {
    "fired": 1,
    "fireLineDefined": true,
    "saysStaleWedge": true,
    "saysHistory": true,
    "namesInFlight": true,
    "saysTranscriptFrozen": true
  },
  "advancing-transcript-vetoes": {
    "fired": 0
  },
  "null-transcript-never-wedges": {
    "fired": 0
  },
  "ceiling-fire-loud": {
    "fireLineDefined": true,
    "saysCeiling": true,
    "saysHistory": true,
    "namesInFlight": true
  },
  "armed-at-anchors-ceiling": {
    "fired": 1,
    "firedPromptly": true
  },
  "under-cliff-defers": {
    "fired": 0
  },
  "past-cliff-fires-loud": {
    "fired": 1,
    "overrideLineDefined": true,
    "countsOverridden": true,
    "namesFirstKid": true,
    "namesSecondKid": true
  },
  "idle-past-cliff-is-routine": {
    "fired": 1,
    "saysIdleFire": true,
    "saysOverride": false
  },
  "midturn-past-cliff-defers": {
    "fired": 0
  },
  "null-child-age-never-overrides": {
    "fired": 0
  }
}

const PORTED: Record<string, Projection> = await runScenarios(armDeferredRestart)

describe("armDeferredRestart — the ported monitor answers as the standing one did", () => {
  for (const [scenario, standing] of Object.entries(STANDING)) {
    it(scenario, () => {
      const verdict = hold(scenario, standing, PORTED[scenario])
      expect(verdict.ported).toBe(verdict.standing)
      expect(verdict.matches).toBe(true)
    })
  }

  it("drove every scenario the recording holds, and no others", () => {
    expect(Object.keys(PORTED).sort()).toEqual(Object.keys(STANDING).sort())
  })
})
