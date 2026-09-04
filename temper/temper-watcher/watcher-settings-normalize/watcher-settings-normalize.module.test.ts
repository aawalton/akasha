import { expect, test } from "bun:test"
import { ALL_DESTRUCTIVE_ACTIONS } from "@akasha/temper-items-core/inventory-safety-types"
import { toLoggingSettings, toSafetySettings } from "./watcher-settings-normalize.module.code.ts"

test("the game knows at least one destructive action", () => {
  expect(ALL_DESTRUCTIVE_ACTIONS.length).toBeGreaterThan(0)
})

test("a value that is no record is answered with the logging defaults", () => {
  for (const notARecord of [undefined, null, 3, "verbose", []]) {
    expect(toLoggingSettings(notARecord)).toEqual({
      actionReports: "verbose",
      perfTracing: "none",
    })
  }
})

test("a level the game wrote that is no known level falls back to verbose", () => {
  expect(toLoggingSettings({ actionReports: "chatty" }).actionReports).toBe("verbose")
})

test("each known level is kept", () => {
  for (const level of ["none", "minimal", "verbose"] as const) {
    expect(toLoggingSettings({ actionReports: level }).actionReports).toBe(level)
  }
})

test("performance tracing is none unless the game wrote minimal", () => {
  expect(toLoggingSettings({ perfTracing: "minimal" }).perfTracing).toBe("minimal")
  expect(toLoggingSettings({ perfTracing: "verbose" }).perfTracing).toBe("none")
  expect(toLoggingSettings({}).perfTracing).toBe("none")
})

test("a value that is no record is answered with the safety defaults", () => {
  const safety = toSafetySettings(undefined)
  expect(safety.confirmActions).toEqual([...ALL_DESTRUCTIVE_ACTIONS])
  expect(safety.openCooldownProtection).toBe(true)
})

test("a confirmation list that is no array is answered with the defaults", () => {
  expect(toSafetySettings({ confirmActions: "all" }).confirmActions).toEqual([
    ...ALL_DESTRUCTIVE_ACTIONS,
  ])
})

test("an action named that no longer exists is dropped", () => {
  const known = ALL_DESTRUCTIVE_ACTIONS[0]
  const safety = toSafetySettings({ confirmActions: [known, "melt-down", 7, null] })
  expect(safety.confirmActions).toEqual([known as string])
})

test("an empty confirmation list is kept rather than read as unset", () => {
  expect(toSafetySettings({ confirmActions: [] }).confirmActions).toEqual([])
})

test("open cooldown protection is on unless the game wrote it false", () => {
  expect(toSafetySettings({ confirmActions: [] }).openCooldownProtection).toBe(true)
  expect(
    toSafetySettings({ confirmActions: [], openCooldownProtection: false }).openCooldownProtection
  ).toBe(false)
  expect(
    toSafetySettings({ confirmActions: [], openCooldownProtection: 0 }).openCooldownProtection
  ).toBe(true)
})
