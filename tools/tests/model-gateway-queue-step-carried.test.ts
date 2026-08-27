import { describe, expect, it } from "bun:test"
import {
  CLIENT_STREAM_IDLE_CEILING_MS,
  decideQueueStep,
  RESET_PROBE_MARGIN_MS,
  SILENT_QUEUE_BUDGET_MS,
  TRANSIENT_HOLD_HORIZON_MS,
} from "../lib/model-gateway/queue-step.ts"

const NOW = 1_000_000

function decide(overrides: Partial<Parameters<typeof decideQueueStep>[0]> = {}) {
  return decideQueueStep({
    earliestEligibleResetMs: NOW + 5_000,
    now: NOW,
    silentElapsedMs: 0,
    silentBudgetMs: SILENT_QUEUE_BUDGET_MS,
    transientHoldHorizonMs: TRANSIENT_HOLD_HORIZON_MS,
    clientStream: true,
    ...overrides,
  })
}

describe("decideQueueStep — genuine exhaustion", () => {
  it("exhausts when no reset is computable (null), even for a stream", () => {
    expect(decide({ earliestEligibleResetMs: null, clientStream: true })).toEqual({
      kind: "exhaust",
    })
  })

  it("exhausts when the reset is beyond the transient-hold horizon (a real cap)", () => {
    expect(
      decide({ earliestEligibleResetMs: NOW + TRANSIENT_HOLD_HORIZON_MS + 1, clientStream: true })
    ).toEqual({ kind: "exhaust" })
  })
})

describe("decideQueueStep — transient wait (Phase 1, budget remaining)", () => {
  it("waits reset+margin for an imminent transient mark", () => {
    expect(decide({ earliestEligibleResetMs: NOW + 5_000, silentElapsedMs: 0 })).toEqual({
      kind: "wait",
      waitMs: 5_000 + RESET_PROBE_MARGIN_MS,
    })
  })

  it("clamps the wait to the remaining silent budget", () => {
    expect(
      decide({
        earliestEligibleResetMs: NOW + 5_000,
        silentElapsedMs: SILENT_QUEUE_BUDGET_MS - 2_000,
      })
    ).toEqual({ kind: "wait", waitMs: 2_000 })
  })

  it("floors a past-due reset to the probe margin (no busy-spin)", () => {
    expect(decide({ earliestEligibleResetMs: NOW - 10_000, silentElapsedMs: 0 })).toEqual({
      kind: "wait",
      waitMs: RESET_PROBE_MARGIN_MS,
    })
  })
})

describe("decideQueueStep — budget spent (commit vs exhaust)", () => {
  it("commits to Phase 2 for a streaming client when budget is spent", () => {
    expect(
      decide({
        earliestEligibleResetMs: NOW + 5_000,
        silentElapsedMs: SILENT_QUEUE_BUDGET_MS,
        clientStream: true,
      })
    ).toEqual({ kind: "commit" })
  })

  it("exhausts honestly for a non-streaming client when budget is spent", () => {
    expect(
      decide({
        earliestEligibleResetMs: NOW + 5_000,
        silentElapsedMs: SILENT_QUEUE_BUDGET_MS,
        clientStream: false,
      })
    ).toEqual({ kind: "exhaust" })
  })

  it("still waits (not commit) for a non-stream client while budget remains", () => {
    expect(
      decide({
        earliestEligibleResetMs: NOW + 3_000,
        silentElapsedMs: 0,
        clientStream: false,
      })
    ).toEqual({ kind: "wait", waitMs: 3_000 + RESET_PROBE_MARGIN_MS })
  })
})

describe("decideQueueStep — ceiling safety", () => {
  it("keeps the silent budget strictly under the client idle ceiling", () => {
    let elapsed = 0
    for (let i = 0; i < 100 && elapsed < SILENT_QUEUE_BUDGET_MS; i++) {
      const step = decide({ earliestEligibleResetMs: NOW, silentElapsedMs: elapsed })
      expect(step.kind).toBe("wait")
      if (step.kind === "wait") elapsed += step.waitMs
    }
    expect(elapsed).toBeLessThanOrEqual(SILENT_QUEUE_BUDGET_MS)
    expect(SILENT_QUEUE_BUDGET_MS).toBeLessThan(CLIENT_STREAM_IDLE_CEILING_MS)
  })
})
