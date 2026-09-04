import { afterEach, describe, expect, test } from "bun:test"
import { getPendingInvalidation } from "./catalog-side-file-config.module.code.ts"

function setConfig(value: unknown): undefined {
  Reflect.set(globalThis, "TemperCatalogConfig", value)
}

afterEach(() => {
  setConfig(undefined)
})

describe("getPendingInvalidation", () => {
  test("well-formed config with named domains → narrowed view", () => {
    setConfig({ version: 1, invalidateVersion: 3, invalidateDomains: ["recipeCatalog"] })
    expect(getPendingInvalidation()).toEqual({
      version: 1,
      invalidateVersion: 3,
      invalidateDomains: ["recipeCatalog"],
    })
  })

  test("absent invalidateDomains → normalised to empty list (the --all encoding)", () => {
    setConfig({ version: 2, invalidateVersion: 5 })
    expect(getPendingInvalidation()).toEqual({
      version: 2,
      invalidateVersion: 5,
      invalidateDomains: [],
    })
  })

  test("absent global → undefined", () => {
    setConfig(undefined)
    expect(getPendingInvalidation()).toBeUndefined()
  })

  test("non-object payload → undefined", () => {
    setConfig("corrupt")
    expect(getPendingInvalidation()).toBeUndefined()
  })

  test("missing version → undefined", () => {
    setConfig({ invalidateVersion: 3, invalidateDomains: [] })
    expect(getPendingInvalidation()).toBeUndefined()
  })

  test("non-numeric invalidateVersion → undefined", () => {
    setConfig({ version: 1, invalidateVersion: "3" })
    expect(getPendingInvalidation()).toBeUndefined()
  })

  test("placeholder version <= 0 → undefined", () => {
    setConfig({ version: 0, invalidateVersion: 3 })
    expect(getPendingInvalidation()).toBeUndefined()
  })

  test("invalidateDomains is a non-array → undefined (fail closed)", () => {
    setConfig({ version: 1, invalidateVersion: 3, invalidateDomains: "recipeCatalog" })
    expect(getPendingInvalidation()).toBeUndefined()
  })

  test("invalidateDomains is an array with a non-string element → undefined (fail closed)", () => {
    setConfig({ version: 1, invalidateVersion: 3, invalidateDomains: ["recipeCatalog", 7] })
    expect(getPendingInvalidation()).toBeUndefined()
  })

  test("invalidateDomains is an empty array → preserved (explicit --all)", () => {
    setConfig({ version: 1, invalidateVersion: 3, invalidateDomains: [] })
    expect(getPendingInvalidation()).toEqual({
      version: 1,
      invalidateVersion: 3,
      invalidateDomains: [],
    })
  })
})
