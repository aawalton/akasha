import { describe, expect, test } from "bun:test"
import {
  computeMasterWritEnabled,
  computeMasterWritToggles,
  computeWritToggles,
  resolveWritToggle,
  type WritAutomation,
} from "./writ-toggles"

const CHAR = "char-1"

function automation(parts: {
  perChar?: Record<string, boolean>
  global?: Record<string, boolean>
}): WritAutomation {
  return {
    characters: parts.perChar === undefined ? {} : { [CHAR]: parts.perChar },
    companions: {},
    ...(parts.global === undefined ? {} : { global: { characters: parts.global } }),
  }
}

describe("resolveWritToggle", () => {
  test("returns undefined when automation is absent", () => {
    expect(resolveWritToggle(undefined, CHAR, "dailyWrits")).toBeUndefined()
  })

  test("returns undefined when neither per-char nor global has the key", () => {
    expect(resolveWritToggle(automation({}), CHAR, "dailyWritAlchemy")).toBeUndefined()
  })

  test("per-character override resolves", () => {
    const cfg = automation({ perChar: { dailyWrits: true } })
    expect(resolveWritToggle(cfg, CHAR, "dailyWrits")).toBe(true)
  })

  test("global-scope value resolves when per-char override is absent", () => {
    const cfg = automation({ global: { dailyWrits: true } })
    expect(resolveWritToggle(cfg, CHAR, "dailyWrits")).toBe(true)
  })

  test("per-character override beats global scope", () => {
    const cfg = automation({ perChar: { dailyWrits: false }, global: { dailyWrits: true } })
    expect(resolveWritToggle(cfg, CHAR, "dailyWrits")).toBe(false)
  })

  test("a different character does not pick up another char's per-char override", () => {
    const cfg = automation({ perChar: { dailyWrits: true } })
    expect(resolveWritToggle(cfg, "char-2", "dailyWrits")).toBeUndefined()
  })
})

describe("computeWritToggles defaults", () => {
  test("master defaults OFF — absent automation yields undefined", () => {
    expect(computeWritToggles(undefined, CHAR)).toBeUndefined()
  })

  test("master defaults OFF — empty automation yields undefined", () => {
    expect(computeWritToggles(automation({}), CHAR)).toBeUndefined()
  })

  test("master OFF when dailyWrits resolves to false", () => {
    expect(computeWritToggles(automation({ perChar: { dailyWrits: false } }), CHAR)).toBeUndefined()
  })

  test("master ON via per-char enables every sub-toggle by default", () => {
    const toggles = computeWritToggles(automation({ perChar: { dailyWrits: true } }), CHAR)
    expect(toggles).toEqual({
      dailyWrits: true,
      dailyWritBlacksmithing: true,
      dailyWritClothier: true,
      dailyWritWoodworking: true,
      dailyWritJewelrycrafting: true,
      dailyWritEnchanting: true,
      dailyWritAlchemy: true,
      dailyWritProvisioning: true,
      dailyWritAutoCraft: true,
    })
  })

  test("master ON via global scope enables every sub-toggle by default", () => {
    const toggles = computeWritToggles(automation({ global: { dailyWrits: true } }), CHAR)
    expect(toggles?.dailyWrits).toBe(true)
    expect(toggles?.dailyWritAutoCraft).toBe(true)
    expect(toggles?.dailyWritAlchemy).toBe(true)
  })

  test("dailyWritAutoCraft defaults ON when unset", () => {
    const toggles = computeWritToggles(automation({ perChar: { dailyWrits: true } }), CHAR)
    expect(toggles?.dailyWritAutoCraft).toBe(true)
  })

  test("a sub-toggle disabled at global scope resolves OFF when per-char absent", () => {
    const cfg = automation({ perChar: { dailyWrits: true }, global: { dailyWritAutoCraft: false } })
    const toggles = computeWritToggles(cfg, CHAR)
    expect(toggles?.dailyWritAutoCraft).toBe(false)
    expect(toggles?.dailyWritAlchemy).toBe(true)
  })

  test("per-char sub-toggle ON overrides a global OFF", () => {
    const cfg = automation({
      perChar: { dailyWrits: true, dailyWritAutoCraft: true },
      global: { dailyWritAutoCraft: false },
    })
    expect(computeWritToggles(cfg, CHAR)?.dailyWritAutoCraft).toBe(true)
  })

  test("a single disabled per-craft sub-toggle leaves the others ON", () => {
    const cfg = automation({ perChar: { dailyWrits: true, dailyWritProvisioning: false } })
    const toggles = computeWritToggles(cfg, CHAR)
    expect(toggles?.dailyWritProvisioning).toBe(false)
    expect(toggles?.dailyWritBlacksmithing).toBe(true)
    expect(toggles?.dailyWritEnchanting).toBe(true)
  })
})

describe("computeMasterWritEnabled", () => {
  test("defaults OFF — absent automation", () => {
    expect(computeMasterWritEnabled(undefined, CHAR)).toBe(false)
  })

  test("defaults OFF — empty automation", () => {
    expect(computeMasterWritEnabled(automation({}), CHAR)).toBe(false)
  })

  test("ON via per-char override", () => {
    expect(computeMasterWritEnabled(automation({ perChar: { masterWrits: true } }), CHAR)).toBe(
      true
    )
  })

  test("ON via global scope", () => {
    expect(computeMasterWritEnabled(automation({ global: { masterWrits: true } }), CHAR)).toBe(true)
  })

  test("independent of dailyWrits — dailyWrits on does not enable masterWrits", () => {
    expect(computeMasterWritEnabled(automation({ perChar: { dailyWrits: true } }), CHAR)).toBe(
      false
    )
  })
})

describe("computeMasterWritToggles defaults", () => {
  test("every per-craft sub-toggle defaults ON when unset", () => {
    expect(computeMasterWritToggles(automation({}), CHAR)).toEqual({
      masterWritBlacksmithing: true,
      masterWritClothier: true,
      masterWritWoodworking: true,
      masterWritJewelrycrafting: true,
      masterWritEnchanting: true,
      masterWritAlchemy: true,
      masterWritProvisioning: true,
    })
  })

  test("a sub-toggle disabled at global scope resolves OFF when per-char absent", () => {
    const cfg = automation({ global: { masterWritProvisioning: false } })
    const toggles = computeMasterWritToggles(cfg, CHAR)
    expect(toggles.masterWritProvisioning).toBe(false)
    expect(toggles.masterWritBlacksmithing).toBe(true)
  })

  test("per-char sub-toggle ON overrides a global OFF", () => {
    const cfg = automation({
      perChar: { masterWritAlchemy: true },
      global: { masterWritAlchemy: false },
    })
    expect(computeMasterWritToggles(cfg, CHAR).masterWritAlchemy).toBe(true)
  })

  test("a single disabled per-craft sub-toggle leaves the others ON", () => {
    const cfg = automation({ perChar: { masterWritEnchanting: false } })
    const toggles = computeMasterWritToggles(cfg, CHAR)
    expect(toggles.masterWritEnchanting).toBe(false)
    expect(toggles.masterWritBlacksmithing).toBe(true)
    expect(toggles.masterWritJewelrycrafting).toBe(true)
  })
})
