import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { asManagerInstance, asSavedVarsInfo } from "./casts"
import type { SavedVarsInfo, SavedVarsManagerInstance } from "./types"

let migrateToMegaserverProfiles: (
  this: void,
  defaultKeyType: number | undefined,
  fromSavedVarsInfo: SavedVarsInfo,
  copyToAllServers: boolean | undefined,
  toSavedVarsInfo: SavedVarsInfo | undefined
) => unknown

let capturedProfiles: (string | undefined)[]

beforeAll(async () => {
  Reflect.set(globalThis, "ZO_SAVED_VARS_CHARACTER_NAME_KEY", 1)
  Reflect.set(globalThis, "ZO_SAVED_VARS_CHARACTER_ID_KEY", 2)
  Reflect.set(globalThis, "tostring", (v: unknown) => String(v))
  Reflect.set(globalThis, "$multi", (...args: unknown[]) => args)
  Reflect.set(globalThis, "GetWorldName", () => "NA Megaserver")
  Reflect.set(globalThis, "ZO_IsElementInNumericallyIndexedTable", (arr: unknown[], v: unknown) =>
    arr.includes(v)
  )
  Reflect.set(
    globalThis,
    "ZO_ShallowTableCopy",
    (src: Record<string, unknown>, dest: Record<string, unknown>) => {
      for (const [k, val] of Object.entries(src)) {
        dest[k] = val
      }
      return dest
    }
  )
  Reflect.set(globalThis, "getmetatable", () => undefined)
  Reflect.set(globalThis, "setmetatable", (t: unknown) => t)

  const registry = await import("./registry")
  Reflect.set(registry.LSV, "protected", {
    Debug: (): undefined => undefined,
    Migrate: (
      _keyType: unknown,
      _from: unknown,
      ...toInfos: SavedVarsInfo[]
    ): [undefined, SavedVarsManagerInstance] => {
      capturedProfiles = toInfos.map((info) => info.profile)
      return [undefined, asManagerInstance({})]
    },
  })
  Reflect.set(registry.LSV, "lib", { GetWorldNames: () => ["NA Megaserver", "EU Megaserver"] })

  const protectedMigrate = await import("./protected-migrate")
  migrateToMegaserverProfiles = protectedMigrate.MigrateToMegaserverProfiles
})

afterAll(() => {
  for (const key of [
    "ZO_SAVED_VARS_CHARACTER_NAME_KEY",
    "ZO_SAVED_VARS_CHARACTER_ID_KEY",
    "tostring",
    "$multi",
    "GetWorldName",
    "ZO_IsElementInNumericallyIndexedTable",
    "ZO_ShallowTableCopy",
    "getmetatable",
    "setmetatable",
  ]) {
    Reflect.deleteProperty(globalThis, key)
  }
})

describe("MigrateToMegaserverProfiles (positional table.insert → unshift / push)", () => {
  test("explicit destination profile is prepended to the world list (site 81 + 93)", () => {
    capturedProfiles = []
    migrateToMegaserverProfiles(
      1,
      asSavedVarsInfo({ keyType: 1 }),
      undefined,
      asSavedVarsInfo({ keyType: 1, profile: "EU Megaserver" })
    )
    expect(capturedProfiles).toEqual(["EU Megaserver", "NA Megaserver"])
  })

  test("destination profile already in the list is not duplicated", () => {
    capturedProfiles = []
    migrateToMegaserverProfiles(
      1,
      asSavedVarsInfo({ keyType: 1 }),
      undefined,
      asSavedVarsInfo({ keyType: 1, profile: "NA Megaserver" })
    )
    expect(capturedProfiles).toEqual(["NA Megaserver"])
  })
})
