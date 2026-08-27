import "./test-eso-load-globals"

import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { getInventoryConfig } from "./inventory-config"
import { setSavedVarsInstance } from "./saved-variables-ref"
import type { InventoryConfigGlobal, SavedVariablesData } from "./types"

function asSavedVariablesData(value: unknown): SavedVariablesData {
  return value as SavedVariablesData
}

function makeEmptySavedVariables(): SavedVariablesData {
  return asSavedVariablesData({
    db: {
      locations: {},
      meta: { displayName: "", worldName: "", lastFullScan: 0 },
      currencies: { characters: {} },
    },
    sell: { version: 3, categoryRules: {}, itemRules: {} },
    sellTimestamps: {},
  })
}

let originalConfig: InventoryConfigGlobal | undefined

beforeEach(() => {
  originalConfig = globalThis.TemperInventoryConfig
  setSavedVarsInstance(makeEmptySavedVariables())
})

afterEach(() => {
  globalThis.TemperInventoryConfig = originalConfig
})

const SV_SELL = { version: 3, categoryRules: { foo: 1 }, itemRules: {} }
const SV_SELL_TIMESTAMPS = { foo: 100 }
const SV_SELL_COMPILED = { version: 3 }
const SV_LOGGING = { actionReports: "verbose" as const }
const SV_SAFETY = { confirmActions: ["destroy"] }
const SV_AUTOMATION = { characters: {}, companions: {} }
const SV_BACKPACK = { bufferSlots: 10, autoStack: true }

function populateSavedVariables(): undefined {
  setSavedVarsInstance(
    asSavedVariablesData({
      ...makeEmptySavedVariables(),
      sell: SV_SELL,
      sellTimestamps: SV_SELL_TIMESTAMPS,
      sellCompiled: SV_SELL_COMPILED,
      logging: SV_LOGGING,
      safety: SV_SAFETY,
      automation: SV_AUTOMATION,
      backpack: SV_BACKPACK,
    })
  )
}

describe("getInventoryConfig", () => {
  test("returns SavedVariables values when TemperInventoryConfig is absent", () => {
    populateSavedVariables()
    globalThis.TemperInventoryConfig = undefined

    const cfg = getInventoryConfig()
    expect(cfg.sell).toBe(SV_SELL)
    expect(cfg.sellTimestamps).toBe(SV_SELL_TIMESTAMPS)
    expect(cfg.sellCompiled).toBe(SV_SELL_COMPILED)
    expect(cfg.logging).toBe(SV_LOGGING)
    expect(cfg.safety).toBe(SV_SAFETY)
    expect(cfg.automation).toBe(SV_AUTOMATION)
    expect(cfg.backpack).toBe(SV_BACKPACK)
  })

  test("falls back to SavedVariables when version is 0 (placeholder)", () => {
    populateSavedVariables()
    globalThis.TemperInventoryConfig = {
      version: 0,
      sell: { version: 3, categoryRules: { sideFile: 1 }, itemRules: {} },
      logging: { actionReports: "minimal" },
    }

    const cfg = getInventoryConfig()
    expect(cfg.sell).toBe(SV_SELL)
    expect(cfg.logging).toBe(SV_LOGGING)
  })

  test("prefers side-file values when version > 0 and key is present", () => {
    populateSavedVariables()
    const sideSell = { version: 3, categoryRules: { sideFile: 1 }, itemRules: {} }
    const sideLogging = { actionReports: "minimal" as const }
    globalThis.TemperInventoryConfig = {
      version: 1,
      sell: sideSell,
      logging: sideLogging,
    }

    const cfg = getInventoryConfig()
    expect(cfg.sell).toBe(sideSell)
    expect(cfg.logging).toBe(sideLogging)
  })

  test("falls back to SavedVariables for keys absent from the side-file", () => {
    populateSavedVariables()
    const sideSell = { version: 3, categoryRules: { sideFile: 1 }, itemRules: {} }
    globalThis.TemperInventoryConfig = {
      version: 1,
      sell: sideSell,
    }

    const cfg = getInventoryConfig()
    expect(cfg.sell).toBe(sideSell)
    expect(cfg.sellTimestamps).toBe(SV_SELL_TIMESTAMPS)
    expect(cfg.sellCompiled).toBe(SV_SELL_COMPILED)
    expect(cfg.logging).toBe(SV_LOGGING)
    expect(cfg.safety).toBe(SV_SAFETY)
    expect(cfg.automation).toBe(SV_AUTOMATION)
    expect(cfg.backpack).toBe(SV_BACKPACK)
  })

  test("returns SavedVariables undefined for unset optional keys when side-file is absent", () => {
    globalThis.TemperInventoryConfig = undefined

    const cfg = getInventoryConfig()
    expect(cfg.sellCompiled).toBeUndefined()
    expect(cfg.logging).toBeUndefined()
    expect(cfg.safety).toBeUndefined()
    expect(cfg.automation).toBeUndefined()
    expect(cfg.backpack).toBeUndefined()
  })

  test("ignores non-object TemperInventoryConfig (defensive narrowing)", () => {
    populateSavedVariables()
    Reflect.set(globalThis, "TemperInventoryConfig", "not-an-object")

    const cfg = getInventoryConfig()
    expect(cfg.sell).toBe(SV_SELL)
    expect(cfg.logging).toBe(SV_LOGGING)
  })

  test("treats negative version as absent (defensive narrowing)", () => {
    populateSavedVariables()
    globalThis.TemperInventoryConfig = {
      version: -1,
      sell: { version: 3, categoryRules: { sideFile: 1 }, itemRules: {} },
    }

    const cfg = getInventoryConfig()
    expect(cfg.sell).toBe(SV_SELL)
  })
})
