import { describe, expect, it } from "bun:test"

import { decideCrashAlert, decideLivenessAlert, decideWatcherLiveness } from "../lib/temper-watcher-liveness-decide.ts"

const THRESHOLD = 600_000
const COOLDOWN = 60 * 60_000

describe("decideWatcherLiveness", () => {
  it("fresh heartbeat + active unit → healthy/ok", () => {
    expect(
      decideWatcherLiveness({
        lastHealthyHeartbeatAgeMs: 30_000,
        unitActive: true,
        stalenessThresholdMs: THRESHOLD,
      })
    ).toEqual({ healthy: true, reason: "ok" })
  })

  it("fresh heartbeat + inactive unit → healthy/ok (transient restart, not yet caught)", () => {
    expect(
      decideWatcherLiveness({
        lastHealthyHeartbeatAgeMs: 5_000,
        unitActive: false,
        stalenessThresholdMs: THRESHOLD,
      })
    ).toEqual({ healthy: true, reason: "ok" })
  })

  it("stale heartbeat + active unit → unhealthy/stalled (process up, sync dead)", () => {
    expect(
      decideWatcherLiveness({
        lastHealthyHeartbeatAgeMs: 900_000,
        unitActive: true,
        stalenessThresholdMs: THRESHOLD,
      })
    ).toEqual({ healthy: false, reason: "stalled" })
  })

  it("stale heartbeat + inactive unit → unhealthy/down (the 19-day incident shape)", () => {
    expect(
      decideWatcherLiveness({
        lastHealthyHeartbeatAgeMs: 900_000,
        unitActive: false,
        stalenessThresholdMs: THRESHOLD,
      })
    ).toEqual({ healthy: false, reason: "down" })
  })

  it("no heartbeat ever (null) + inactive → unhealthy/down", () => {
    expect(
      decideWatcherLiveness({
        lastHealthyHeartbeatAgeMs: null,
        unitActive: false,
        stalenessThresholdMs: THRESHOLD,
      })
    ).toEqual({ healthy: false, reason: "down" })
  })

  it("no heartbeat ever (null) + active → unhealthy/stalled", () => {
    expect(
      decideWatcherLiveness({
        lastHealthyHeartbeatAgeMs: null,
        unitActive: true,
        stalenessThresholdMs: THRESHOLD,
      })
    ).toEqual({ healthy: false, reason: "stalled" })
  })

  it("age exactly at threshold → stale (boundary: < threshold is fresh)", () => {
    expect(
      decideWatcherLiveness({
        lastHealthyHeartbeatAgeMs: THRESHOLD,
        unitActive: true,
        stalenessThresholdMs: THRESHOLD,
      })
    ).toEqual({ healthy: false, reason: "stalled" })
  })
})

describe("decideLivenessAlert", () => {
  const now = 1_000_000_000

  it("healthy → no page, episode cleared", () => {
    expect(
      decideLivenessAlert({
        healthy: true,
        priorAlertedAtMs: null,
        nowMs: now,
        cooldownMs: COOLDOWN,
      })
    ).toEqual({ page: false, nextAlertedAtMs: null })
  })

  it("healthy after an unhealthy episode → no page, episode cleared (recovery)", () => {
    expect(
      decideLivenessAlert({
        healthy: true,
        priorAlertedAtMs: now - 10_000,
        nowMs: now,
        cooldownMs: COOLDOWN,
      })
    ).toEqual({ page: false, nextAlertedAtMs: null })
  })

  it("unhealthy, no prior alert → page on the down-edge, record now", () => {
    expect(
      decideLivenessAlert({
        healthy: false,
        priorAlertedAtMs: null,
        nowMs: now,
        cooldownMs: COOLDOWN,
      })
    ).toEqual({ page: true, nextAlertedAtMs: now })
  })

  it("unhealthy, within cooldown → suppress, keep the prior timestamp", () => {
    expect(
      decideLivenessAlert({
        healthy: false,
        priorAlertedAtMs: now - 60_000,
        nowMs: now,
        cooldownMs: COOLDOWN,
      })
    ).toEqual({ page: false, nextAlertedAtMs: now - 60_000 })
  })

  it("unhealthy, cooldown elapsed → re-page reminder, record now", () => {
    expect(
      decideLivenessAlert({
        healthy: false,
        priorAlertedAtMs: now - (COOLDOWN + 1),
        nowMs: now,
        cooldownMs: COOLDOWN,
      })
    ).toEqual({ page: true, nextAlertedAtMs: now })
  })

  it("unhealthy, exactly at cooldown boundary → re-page (>= is inclusive)", () => {
    expect(
      decideLivenessAlert({
        healthy: false,
        priorAlertedAtMs: now - COOLDOWN,
        nowMs: now,
        cooldownMs: COOLDOWN,
      })
    ).toEqual({ page: true, nextAlertedAtMs: now })
  })
})

describe("decideCrashAlert", () => {
  const COOLDOWN = 60 * 60_000
  const T0 = 1_700_000_000_000

  it("no fatal line in the log → never pages, and carries prior state forward", () => {
    expect(
      decideCrashAlert({ latestFatalMs: null, priorFatalAlertedAtMs: null, cooldownMs: COOLDOWN })
    ).toEqual({ page: false, nextFatalAlertedAtMs: null })
    expect(
      decideCrashAlert({ latestFatalMs: null, priorFatalAlertedAtMs: T0, cooldownMs: COOLDOWN })
    ).toEqual({ page: false, nextFatalAlertedAtMs: T0 })
  })

  it("first crash ever seen → pages immediately", () => {
    expect(
      decideCrashAlert({ latestFatalMs: T0, priorFatalAlertedAtMs: null, cooldownMs: COOLDOWN })
    ).toEqual({ page: true, nextFatalAlertedAtMs: T0 })
  })

  it("same crash on a later tick → stays quiet (keyed on the crash, not the tick)", () => {
    expect(
      decideCrashAlert({ latestFatalMs: T0, priorFatalAlertedAtMs: T0, cooldownMs: COOLDOWN })
    ).toEqual({ page: false, nextFatalAlertedAtMs: T0 })
  })

  it("a newer crash inside the cooldown → suppressed, so a tight loop cannot spam", () => {
    expect(
      decideCrashAlert({
        latestFatalMs: T0 + COOLDOWN - 1,
        priorFatalAlertedAtMs: T0,
        cooldownMs: COOLDOWN,
      })
    ).toEqual({ page: false, nextFatalAlertedAtMs: T0 })
  })

  it("a newer crash at or past the cooldown → re-pages and advances the mark", () => {
    expect(
      decideCrashAlert({
        latestFatalMs: T0 + COOLDOWN,
        priorFatalAlertedAtMs: T0,
        cooldownMs: COOLDOWN,
      })
    ).toEqual({ page: true, nextFatalAlertedAtMs: T0 + COOLDOWN })
  })

  it("a crash older than the one already reported → stays quiet", () => {
    expect(
      decideCrashAlert({
        latestFatalMs: T0 - 5_000,
        priorFatalAlertedAtMs: T0,
        cooldownMs: COOLDOWN,
      })
    ).toEqual({ page: false, nextFatalAlertedAtMs: T0 })
  })
})
