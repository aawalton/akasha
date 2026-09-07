import { expect, test } from "bun:test"
import { addonManifestOf } from "./addon-fixture-manifest.module.code.ts"

const PROBE = "TemperProbe"

test("a fixture manifest is named and titled for the addon named", () => {
  const held = addonManifestOf(PROBE)
  expect(held.name).toBe(PROBE)
  expect(held.title).toBe(PROBE)
})

test("a fixture manifest depends on nothing and saves nothing", () => {
  const held = addonManifestOf(PROBE)
  expect(held.dependsOn).toEqual([])
  expect(held.savedVariables).toEqual([])
})

test("a fixture manifest carries an api version the roster reads", () => {
  expect(addonManifestOf(PROBE).apiVersion.length).toBe(1)
})
